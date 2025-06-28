import { logger } from "../../config/logger";
import { redis } from "../../config/redis-client";
import { KeyValueListStore } from "../contracts/storage/key-value-list-store";

export class RedisService implements KeyValueListStore {
  async getList<T = string>(key: string): Promise<T[]> {
    try {
      const items = await redis.lrange(key, 0, -1);
      return items.map((item) => JSON.parse(item) as T);
    } catch (err) {
      logger.error(`Redis.lrange failed ${err}`, "[REDIS]");
      return [];
    }
  }

  async pushToList<T = string>(key: string, value: T): Promise<void> {
    try {
      const data = JSON.stringify(value);
      await redis.lpush(key, data);
    } catch (err) {
      logger.error(`Redis.lpush failed ${err}`, "[REDIS]");
    }
  }

  async expire(key: string, ttlSeconds: number): Promise<void> {
    try {
      await redis.expire(key, ttlSeconds);
    } catch (err) {
      logger.error(`Redis.expire failed ${err}`, "[REDIS]");
    }
  }
}
