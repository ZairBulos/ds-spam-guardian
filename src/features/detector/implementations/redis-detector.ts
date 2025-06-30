import { RedisService } from "../../../core/services/redis-service";
import { RedisSpamRepository } from "../repositories/redis.repository";
import { buildSpamDetector } from "../detector.builder";

const redis = new RedisService();
const repository = new RedisSpamRepository(redis);

export const spamDetector = buildSpamDetector(repository);
