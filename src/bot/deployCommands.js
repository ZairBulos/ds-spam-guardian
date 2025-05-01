require("module-alias/register");

const { REST, Routes } = require("discord.js");
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = require("@/config/config");
const logger = require("@/config/logger");
const loadFiles = require("@/utils/fileLoader");

const commands = [];
const commandFiles = loadFiles("bot/commands");
commandFiles.forEach(({ module, path }) => {
  if ("data" in module && "execute" in module) {
    commands.push(module.data.toJSON());
  } else {
    logger.error(
      `The command at ${path} is missing a required "data" or "execute" property.`,
    );
  }
});

const rest = new REST().setToken(BOT_TOKEN);
(async () => {
  try {
    logger.info(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    logger.info(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    logger.error(`Failed to refresh commands: ${error.message}`);
  }
})();
