const path = require("path");

if (!process.env.BOT_TOKEN) {
  const { loadEnvFile } = require("node:process");
  const ENV_PATH = path.resolve(process.cwd(), ".env.development");
  loadEnvFile(ENV_PATH);
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  BOT_TOKEN: process.env.BOT_TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
  GUILD_ID: process.env.GUILD_ID,
  PORT: process.env.PORT,
};
