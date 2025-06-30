import { Message } from "discord.js";
import { SpamDetectorStrategy } from "../../core/interfaces/spam-detector-strategy";

export class SpamDetectorContext {
  private strategies: SpamDetectorStrategy[] = [];

  public addStrategy(strategy: SpamDetectorStrategy): void {
    this.strategies.push(strategy);
  }

  public async isSpam(message: Message): Promise<boolean> {
    for (const strategy of this.strategies) {
      const detected = await strategy.isSpam(message);
      if (detected) return true;
    }

    return false;
  }
}
