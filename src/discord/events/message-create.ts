import { Events, Message } from "discord.js";
import { Event } from "../../core/interfaces/event";
import { redisSpamDetector } from "../../features/detector";
import { clean } from "../../features/cleaner";

class MessageCreateEvent implements Event<Events.MessageCreate> {
  public name = Events.MessageCreate;

  public async execute(message: Message): Promise<void> {
    if (!message.guild) return;

    const isSpam = await redisSpamDetector.isSpam(message);
    if (isSpam) clean(message);
  }
}

export default new MessageCreateEvent();
