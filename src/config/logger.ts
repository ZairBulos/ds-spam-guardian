import winston, { format, transports } from "winston";

class Logger {
  private static instance: Logger;
  private readonly logger: winston.Logger;

  private constructor() {
    const options = this.getOptions();
    this.logger = winston.createLogger(options);
  }

  public static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger();
    }

    return this.instance;
  }

  public info(message: string, prefix?: string): void {
    this.logger.info(this.formatMessage(message, prefix));
  }

  public warn(message: string, prefix?: string): void {
    this.logger.warn(this.formatMessage(message, prefix));
  }

  public error(message: string, prefix?: string): void {
    this.logger.error(this.formatMessage(message, prefix));
  }

  private formatMessage(message: string, prefix?: string): string {
    return prefix ? `${prefix} ${message}` : message;
  }

  private getOptions(): winston.LoggerOptions {
    return {
      level: "info",
      format: format.combine(
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.printf(
          ({ timestamp, level, message }) =>
            `[${timestamp}] [${level.toUpperCase()}]: ${message}`
        )
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          level: "info",
          filename: "logs/info.log",
          format: format.combine(this.levelFilter("info")),
        }),
        new transports.File({
          level: "warn",
          filename: "logs/warn.log",
          format: format.combine(this.levelFilter("warn")),
        }),
        new transports.File({
          level: "error",
          filename: "logs/error.log",
          format: format.combine(this.levelFilter("error")),
        }),
      ],
    };
  }

  private levelFilter(level: string): winston.Logform.Format {
    return format((info) => (info.level === level ? info : false))();
  }
}

export const logger = Logger.getInstance();
