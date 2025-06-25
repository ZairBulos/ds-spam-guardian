import { Client, GatewayIntentBits } from "discord.js";
import { loadEvents } from "./handlers/load-events";
import { logger } from "../config/logger";

export class DiscordBot extends Client {
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
      loadEvents(this as Client);
      await this.login(token);
    } catch (err) {
      logger.error(`Falided to login ${err}`);
    }
  }
}

export const client = new DiscordBot();
