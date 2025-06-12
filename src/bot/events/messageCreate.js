const { Events } = require("discord.js");
const logger = require("@/config/logger.js");
const spamValidator = require("@/services/validator");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    try {
      if (spamValidator.isSpam(message)) {
        await message.delete();
        logger.warn(
          `Spam detected from ${message.author.tag}: ${message.content}`,
        );
      }
    } catch (err) {
      logger.error(
        `Error processing message from ${message.author.tag}: ${err}`,
      );
    }
  },
};
