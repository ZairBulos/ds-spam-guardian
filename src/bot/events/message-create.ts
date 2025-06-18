import { Event } from "../../core/interfaces/event.interface";
import { Events, Message } from "discord.js";

class MessageCreateEvent implements Event<Events.MessageCreate> {
  public name = Events.MessageCreate;

  public execute(message: Message): void {
    if (message.author.bot || !message.guild) return;
    console.log(`${message.author.tag}: ${message.content}`);
  }
}

export default new MessageCreateEvent();
