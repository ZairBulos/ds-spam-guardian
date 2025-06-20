import { Event } from "../../core/interfaces/event";
import { Client, Events } from "discord.js";

class ReadyEvent implements Event<Events.ClientReady> {
  public name = Events.ClientReady;
  public once = true;

  public execute(client: Client): void {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
  }
}

export default new ReadyEvent();
