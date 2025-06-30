import { Message } from "discord.js";
import { SpamCleaner } from "./cleaner";
import { SpamCleanupLock } from "./cleanup-lock";

export const buildSpamCleaner = (lock: SpamCleanupLock) => {
  const cleaner = new SpamCleaner();

  return {
    clean: (message: Message): void => {
      const guildId = message.guild!.id;
      const userId = message.author.id;

      void lock.run(guildId, userId, async () => {
        await cleaner.clean(message);
      });
    },
  };
};
