const { Events } = require("discord.js");
const logger = require("@/config/logger.js");
const preprocessMessage = require("@/middlewares/preprocessMessage");
const spamValidator = require("@/services/validator");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    try {
      const cleanMessage = preprocessMessage(message.content);

      if (spamValidator.isSpam(cleanMessage)) {
        await message.delete();
        logger.info(
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
