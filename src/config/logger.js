const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { NODE_ENV } = require("./config");

const errorFilter = format((info) => (info.level === "error" ? info : false));
const warnFilter = format((info) => (info.level === "warn" ? info : false));

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    new DailyRotateFile({
      auditFile: "logs/error-audit.json",
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      level: "error",
      format: format.combine(errorFilter()),
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      auditFile: "logs/warn-audit.json",
      filename: "logs/warn-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      level: "warn",
      format: format.combine(warnFilter()),
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

if (NODE_ENV !== "production") {
  logger.add(new transports.Console());
}

module.exports = logger;
