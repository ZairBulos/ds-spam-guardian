import { Events, Message } from "discord.js";
import { Event } from "../../core/interfaces/event";
import { SpamCleaner } from "../../features/spam/services/spam-cleaner.service";
import { SpamCleanupLock } from "../../features/spam/services/spam-cleanup-lock.service";
import { spamDetector } from "../../features/spam/providers/spam-detector-memory.provider";
import { logger } from "../../config/logger";

const spamCleaner = new SpamCleaner();
const spamCleanupLock = new SpamCleanupLock();

class MessageCreateEvent implements Event<Events.MessageCreate> {
  public name = Events.MessageCreate;

  public async execute(message: Message): Promise<void> {
    const spamDetected = await spamDetector.isSpam(message);
    if (!spamDetected) return;

    logger.warn(
      `Detected spam from ${message.author.username} in ${message.guild?.name}: "${message.content}"`,
      "[SPAM DETECT]"
    );
    void spamCleanupLock.run(message.author.id, async () => {
      await spamCleaner.deleteSpamMessages(message);
    });
  }
}

export default new MessageCreateEvent();
