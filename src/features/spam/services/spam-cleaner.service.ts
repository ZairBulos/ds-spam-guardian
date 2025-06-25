import { Collection, Guild, Message, TextBasedChannel } from "discord.js";
import { hashContent } from "../../../utils/hash";
import { logger } from "../../../config/logger";

export class SpamCleaner {
  private readonly MESSAGE_FETCH_LIMIT = 10;
  private readonly TIME_WINDOW_MS = 60_000;

  async deleteSpamMessages(message: Message): Promise<void> {
    const { guild, author, content, createdTimestamp } = message;
    if (!guild) return;

    const channels = this.getTextChannels(guild);
    const spamHash = hashContent(content);
    const deletions = [];

    for (const channel of channels.values()) {
      const channelMessages = await this.fetchMessagesFromChannel(channel);
      const userMessages = this.filterUserMessages(channelMessages, author.id);
      const spamMessages = this.filterSpamMessages(
        userMessages,
        spamHash,
        createdTimestamp
      );

      for (const spamMessage of spamMessages.values()) {
        deletions.push(
          spamMessage.delete().catch((err) => {
            logger.error(`Failed to delete message ${err}`, "[SPAM CLEANER]");
          })
        );
      }
    }

    const results = await Promise.allSettled(deletions);
    const successful = results.filter((r) => r.status === "fulfilled").length;
    logger.warn(
      `Deleted ${successful} spam messages from ${author.username} in ${guild.name}`,
      "[SPAM CLEANER]"
    );
  }

  private getTextChannels(guild: Guild): Collection<string, TextBasedChannel> {
    return guild.channels.cache.filter((channel) => channel.isTextBased());
  }

  private async fetchMessagesFromChannel(
    channel: TextBasedChannel
  ): Promise<Collection<string, Message>> {
    return await channel.messages.fetch({
      limit: this.MESSAGE_FETCH_LIMIT,
    });
  }

  private filterUserMessages(
    messages: Collection<string, Message>,
    userId: string
  ): Collection<string, Message> {
    return messages.filter((message) => message.author.id === userId);
  }

  private filterSpamMessages(
    messages: Collection<string, Message>,
    targetHash: string,
    referenceTimestamp: number
  ): Collection<string, Message> {
    return messages.filter((message) =>
      this.matchesSpamPattern(message, targetHash, referenceTimestamp)
    );
  }

  private matchesSpamPattern(
    message: Message,
    targetHash: string,
    referenceTimestamp: number
  ): boolean {
    const isSameContent = hashContent(message.content) === targetHash;
    const isWithinWindow =
      Math.abs(referenceTimestamp - message.createdTimestamp) <=
      this.TIME_WINDOW_MS;

    return isSameContent && isWithinWindow;
  }
}
