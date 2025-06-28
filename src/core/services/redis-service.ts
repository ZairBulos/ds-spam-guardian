import { logger } from "../../config/logger";
import { redis } from "../../config/redis-client";
import { KeyValueStore } from "../contracts/storage/key-value-store";
import { KeyValueListStore } from "../contracts/storage/key-value-list-store";

export class RedisService implements KeyValueStore, KeyValueListStore {
  async get<T = string>(key: string): Promise<T | null> {
    try {
      const value = await redis.get(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (err) {
      logger.error(`Redis.get failed ${err}`, "[REDIS]");
      return null;
    }
  }

  async set<T = string>(
    key: string,
    value: T,
    ttlSeconds?: number
  ): Promise<void> {
    try {
      const data = JSON.stringify(value);
      ttlSeconds
        ? await redis.set(key, data, "EX", ttlSeconds)
        : await redis.set(key, data);
    } catch (err) {
      logger.error(`Redis.set failed ${err}`, "[REDIS]");
    }
  }

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
