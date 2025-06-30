import { Message } from "discord.js";
import { SpamDetectorStrategy } from "../../../core/interfaces/spam-detector-strategy";
import { SpamRepository } from "../../../core/interfaces/spam-repository";
import { MessageEntry } from "../../../core/types/message-entry";
import { hashContent } from "../../../utils/hash";

export class BehaviorSpamStrategy implements SpamDetectorStrategy {
  private readonly TTL_SECONDS = 10;
  private readonly MAX_AGE_MS = 10_000;
  private readonly MIN_CHANNELS = 3;

  constructor(private repository: SpamRepository) {}

  public async isSpam(message: Message): Promise<boolean> {
    const { guildId, userId, hash, entry } = this.getEntry(message);
    await this.saveEntry(guildId, userId, hash, entry);

    const entries = await this.getEntries(guildId, userId, hash);
    const uniqueChannels = this.getUniqueChannels(entries);

    return uniqueChannels.size >= this.MIN_CHANNELS;
  }

  private getEntry(message: Message): {
    guildId: string;
    userId: string;
    hash: string;
    entry: MessageEntry;
  } {
    const { id, content, createdTimestamp, channelId, guild, author } = message;

    return {
      guildId: guild!.id,
      userId: author.id,
      hash: hashContent(content),
      entry: {
        id,
        channelId,
        timestamp: createdTimestamp,
      },
    };
  }

  private async saveEntry(
    guildId: string,
    userId: string,
    hash: string,
    entry: MessageEntry
  ): Promise<void> {
    await this.repository.saveMessageEntry(
      guildId,
      userId,
      hash,
      entry,
      this.TTL_SECONDS
    );
  }

  private async getEntries(
    guildId: string,
    userId: string,
    hash: string
  ): Promise<MessageEntry[]> {
    return await this.repository.getRecentEntries(
      guildId,
      userId,
      hash,
      this.MAX_AGE_MS
    );
  }

  private getUniqueChannels(entries: MessageEntry[]): Set<string> {
    return new Set(entries.map((entry) => entry.channelId));
  }
}
