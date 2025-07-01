import { APIApplicationCommand, REST, Routes } from "discord.js";
import { commands } from "../commands";
import { logger } from "../../config/logger";
import environment from "../../environments/environment";

const { PRODUCTION, BOT_TOKEN, BOT_CLIENT_ID, BOT_GUILD_ID } = environment;

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

(async () => {
  try {
    const body = commands.map((cmd) => cmd.data.toJSON());

    const route = PRODUCTION
      ? Routes.applicationCommands(BOT_CLIENT_ID)
      : Routes.applicationGuildCommands(BOT_CLIENT_ID, BOT_GUILD_ID!);

    const data = (await rest.put(route, { body })) as APIApplicationCommand[];

    logger.info(
      `Successfully reloaded (${data.length}) application (/) commands.`,
      "[DISCORD]"
    );
  } catch (err) {
    logger.error(`Failed to refresh commands ${err}`, "[DISCORD]");
  }
})();
