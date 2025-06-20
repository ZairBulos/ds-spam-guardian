import { SpamRepository } from "../../../core/interfaces/spam-repository";
import { ListStore } from "../../../core/contracts/storage/list-store";
import { MessageEntry } from "../../../core/types/message-entry";

export class RedisSpamRepository implements SpamRepository {
  constructor(private store: ListStore) {}

  private getKey(guildId: string, userId: string, hash: string) {
    return `message:${guildId}:${userId}:${hash}`;
  }

  async getRecentEntries(
    guildId: string,
    userId: string,
    hash: string,
    maxAgeMs: number
  ): Promise<MessageEntry[]> {
    const key = this.getKey(guildId, userId, hash);
    const entries = await this.store.getAllItems<MessageEntry>(key);
    const now = Date.now();

    return entries.filter((entry) => now - entry.timestamp <= maxAgeMs);
  }

  async saveMessageEntry(
    guildId: string,
    userId: string,
    hash: string,
    entry: MessageEntry,
    ttlSeconds: number
  ): Promise<void> {
    const key = this.getKey(guildId, userId, hash);
    await this.store.pushItem(key, entry);
    await this.store.setExpire(key, ttlSeconds);
  }
}
