const loadFiles = require("@/utils/fileLoader");
const logger = require("@/config/logger");

const loadCommands = (client) => {
  const commands = loadFiles("bot/commands");

  commands.forEach(({ path, module }) => {
    if ("data" in module && "execute" in module) {
      client.commands.set(module.data.name, module);
    } else {
      logger.error(
        `The command at ${path} is missing a required "data" or "execute" property.`,
      );
    }
  });
};

module.exports = loadCommands;
