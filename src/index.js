require("module-alias/register");

const { BOT_TOKEN } = require("@/config/config");
const client = require("@/bot/client");
const logger = require("@/config/logger");

client
  .login(BOT_TOKEN)
  .then(() => {
    logger.info("Bot is online!");
  })
  .catch((err) => {
    logger.error("Failed to login:", err);
  });
