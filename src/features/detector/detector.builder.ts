import { SpamRepository } from "../../core/interfaces/spam-repository";
import { BehaviorSpamStrategy } from "./strategies/behavior.strategy";
import { SpamDetectorContext } from "./detector.context";

export const buildSpamDetector = (
  repository: SpamRepository
): Pick<SpamDetectorContext, "isSpam"> => {
  const behaviorStrategy = new BehaviorSpamStrategy(repository);

  const context = new SpamDetectorContext();
  context.addStrategy(behaviorStrategy);

  return context;
};
