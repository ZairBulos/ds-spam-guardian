const { Events } = require("discord.js");
const logger = require("@/config/logger.js");
const preprocessMessage = require("@/middlewares/preprocessMessage");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    try {
      const cleanMessage = preprocessMessage(message.content);
      console.log(`Message from ${message.author.tag}: ${cleanMessage}`);
    } catch (err) {
      logger.error(
        `Error processing message from ${message.author.tag}: ${err}`,
      );
    }
  },
};
