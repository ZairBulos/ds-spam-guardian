import { Client, Collection, GatewayIntentBits } from "discord.js";
import { loadCommands } from "./handlers/load-commands";
import { loadEvents } from "./handlers/load-events";
import { Command } from "../core/interfaces/command";
import { logger } from "../config/logger";

export class DiscordBot extends Client {
  public commands: Collection<string, Command> = new Collection();

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  public async start(token: string): Promise<void> {
    try {
      loadEvents(this);
      loadCommands(this);
      await this.login(token);
    } catch (err) {
      logger.error(`Falided to login ${err}`, "[DISCORD]");
    }
  }
}

export const client = new DiscordBot();
