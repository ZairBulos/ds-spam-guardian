import { buildSpamDetector } from "..";
import { RedisService } from "../../../core/services/redis-service";
import { RedisSpamRepository } from "../repositories";

const redis = new RedisService();
const redisRepository = new RedisSpamRepository(redis);
export const spamDetector = buildSpamDetector(redisRepository);
