const loadFiles = require("@/utils/fileLoader");

const loadCommands = (client) => {
  const commands = loadFiles("bot/commands");

  commands.forEach(({ path, module }) => {
    if ("data" in module && "execute" in module) {
      client.commands.set(module.data.name, module);
    } else {
      logger.warn(
        `The command at ${path} is missing a required "data" or "execute" property.`,
      );
    }
  });
};

module.exports = loadCommands;
