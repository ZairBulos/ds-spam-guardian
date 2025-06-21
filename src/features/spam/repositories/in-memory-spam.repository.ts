import { SpamRepository } from "../../../core/interfaces/spam-repository";
import { MessageEntry } from "../../../core/types/message-entry";

type TimedEntry = {
  entry: MessageEntry;
  expiresAt: number;
};

export class InMemorySpamRepository implements SpamRepository {
  private store = new Map<string, TimedEntry[]>();

  private getKey(guildId: string, userId: string, hash: string): string {
    return `message:${guildId}:${userId}:${hash}`;
  }

  async getRecentEntries(
    guildId: string,
    userId: string,
    hash: string,
    maxAgeMs: number
  ): Promise<MessageEntry[]> {
    const key = this.getKey(guildId, userId, hash);
    const entries = this.store.get(key) || [];
    const now = Date.now();

    return entries
      .filter((e) => now <= e.expiresAt && now - e.entry.timestamp <= maxAgeMs)
      .map((e) => e.entry);
  }

  async saveMessageEntry(
    guildId: string,
    userId: string,
    hash: string,
    entry: MessageEntry,
    ttlSeconds: number
  ): Promise<void> {
    const key = this.getKey(guildId, userId, hash);
    const expiresAt = Date.now() + ttlSeconds * 1000;

    const current = this.store.get(key) || [];
    const validEntries = current.filter((e) => Date.now() < e.expiresAt);
    validEntries.unshift({ entry, expiresAt });

    this.store.set(key, validEntries);
  }

  clear(): void {
    this.store.clear();
  }
}
