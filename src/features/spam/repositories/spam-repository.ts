import { KeyValueListStore } from "../../../core/contracts/storage/key-value-list-store";
import { SpamRepository } from "../../../core/interfaces/spam-repository";
import { MessageEntry } from "../../../core/types/message-entry";

export class RedisSpamRepository implements SpamRepository {
  constructor(private store: KeyValueListStore) {}

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
    const entries = await this.store.getList<MessageEntry>(key);
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
    await this.store.pushToList(key, entry);
    await this.store.expire(key, ttlSeconds);
  }
}
