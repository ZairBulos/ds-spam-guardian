import { Message } from "discord.js";

export interface SpamDetectorStrategy {
  isSpam(message: Message): Promise<boolean>;
}
