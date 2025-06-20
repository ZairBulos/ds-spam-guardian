import { MessageEntry } from "../types/message-entry";

export interface SpamRepository {
  getRecentEntries(
    guildId: string,
    userId: string,
    hash: string,
    maxAgeMs: number
  ): Promise<MessageEntry[]>;

  saveMessageEntry(
    guildId: string,
    userId: string,
    hash: string,
    entry: MessageEntry,
    ttlSeconds: number
  ): Promise<void>;
}
