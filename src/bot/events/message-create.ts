import { Events, Message } from "discord.js";
import { Event } from "../../core/interfaces/event";
import { buildSpamDetector } from "../../features/spam";

const spamDetector = buildSpamDetector();

class MessageCreateEvent implements Event<Events.MessageCreate> {
  public name = Events.MessageCreate;

  public async execute(message: Message): Promise<void> {
    const spamDetected = await spamDetector.isSpam(message);
    if (spamDetected) {
      console.warn(`[SPAM DETECTED] ${message.author.tag}: ${message.content}`);
    }
  }
}

export default new MessageCreateEvent();
