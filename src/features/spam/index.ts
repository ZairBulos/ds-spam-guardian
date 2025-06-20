import { RedisService } from "../../core/services/redis-service";
import { RedisSpamRepository } from "./repositories";
import { BehaviorSpamStrategy } from "./strategies/behavior-spam.strategy";
import { SpamDetectorContext } from "./spam-detector.context";

export const buildSpamDetector = (): Pick<SpamDetectorContext, "isSpam"> => {
  // Dependencies
  const redis = new RedisService();
  const spamRepository = new RedisSpamRepository(redis);

  // Strategies
  const behaviorStrategy = new BehaviorSpamStrategy(spamRepository);

  // Orchestrator
  const context = new SpamDetectorContext();
  context.addStrategy(behaviorStrategy);

  return context;
};
