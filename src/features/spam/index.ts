import { SpamRepository } from "../../core/interfaces/spam-repository";
import { BehaviorSpamStrategy } from "./strategies/behavior-spam.strategy";
import { SpamDetectorContext } from "./spam-detector.context";

export const buildSpamDetector = (
  spamRepository: SpamRepository
): Pick<SpamDetectorContext, "isSpam"> => {
  const behaviorStrategy = new BehaviorSpamStrategy(spamRepository);

  const context = new SpamDetectorContext();
  context.addStrategy(behaviorStrategy);

  return context;
};
