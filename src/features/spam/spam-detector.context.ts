import { SpamDetectorStrategy } from "../../core/interfaces/spam-detector-strategy";
import { Message } from "discord.js";

export class SpamDetectorContext {
  private strategies: SpamDetectorStrategy[] = [];

  addStrategy(strategy: SpamDetectorStrategy): void {
    this.strategies.push(strategy);
  }

  async isSpam(message: Message): Promise<boolean> {
    for (const strategy of this.strategies) {
      const detected = await strategy.isSpam(message);
      if (detected) return true;
    }

    return false;
  }
}
