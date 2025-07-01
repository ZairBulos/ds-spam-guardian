import { DiscordBot } from "../client";
import { loadFiles } from "../../utils/load-files";
import { Command } from "../../core/interfaces/command";

export const loadCommands = (client: DiscordBot) => {
  const commandFiles = loadFiles<Command>("discord/commands");
  commandFiles
    .filter(({ module }) => module !== undefined)
    .forEach(({ module }) => {
      if ("data" in module && "execute" in module) {
        client.commands.set(module.data.name, module);
      }
    });
};
