const { Events } = require("discord.js");
const logger = require("@/config/logger");
const bot = require("@/config/bot");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setPresence(bot);
    logger.info(`Ready! Logged in as ${client.user.tag}`);
  },
};
