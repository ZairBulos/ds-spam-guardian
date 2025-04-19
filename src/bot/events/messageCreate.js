const { Events } = require("discord.js");
const logger = require("@/config/logger.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    try {
      console.log(`Message from ${message.author.tag}: ${message.content}`);
    } catch (err) {
      logger.error(
        `Error processing message from ${message.author.tag}: ${err}`,
      );
    }
  },
};
