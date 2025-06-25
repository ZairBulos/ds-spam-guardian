import { Client, Events } from "discord.js";
import { logger } from "../../config/logger";
import { Event } from "../../core/interfaces/event";

class ReadyEvent implements Event<Events.ClientReady> {
  public name = Events.ClientReady;
  public once = true;

  public execute(client: Client): void {
    logger.info(`Ready! Logged in as ${client.user?.tag}`);
  }
}

export default new ReadyEvent();
