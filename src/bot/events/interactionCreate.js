const { Events } = require("discord.js");
const logger = require("@/config/logger");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      logger.error(
        `Error executing command ${interaction.commandName}: ${err}`,
      );
    }
  },
};
