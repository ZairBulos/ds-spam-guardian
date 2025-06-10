const http = require("http");
const logger = require("@/config/logger");
const { PORT } = require("@/config/config");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Bot is running!");
  }
});

server.listen(PORT, () => {
  logger.info(`HTTP server listening on port ${PORT}`);
});
