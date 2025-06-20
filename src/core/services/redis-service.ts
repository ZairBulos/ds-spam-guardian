import { RedisClient } from "../../config/redis-client";
import { KeyValueStore } from "../contracts/storage/key-value-store";
import { ListStore } from "../contracts/storage/list-store";

export class RedisService implements KeyValueStore, ListStore {
  private redis = RedisClient.getInstance();

  async get<T = string>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (err) {
      console.error(`Redis.get failed [${key}]`, err);
      return null;
    }
  }

  async set<T = string>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    try {
      const data = JSON.stringify(value);
      ttlSeconds
        ? await this.redis.set(key, data, "EX", ttlSeconds)
        : await this.redis.set(key, data);
    } catch (err) {
      console.error(`Redis.set failed [${key}]`, err);
    }
  }

  async getAllItems<T = string>(key: string): Promise<T[]> {
    try {
      const items = await this.redis.lrange(key, 0, -1);
      return items.map((item) => JSON.parse(item) as T);
    } catch (err) {
      console.error(`Redis.lrange failed [${key}]`, err);
      return [];
    }
  }

  async pushItem<T = string>(key: string, value: T): Promise<void> {
    try {
      const data = JSON.stringify(value);
      await this.redis.lpush(key, data);
    } catch (err) {
      console.error(`Redis.lpush failed [${key}]`, err);
    }
  }

  async setExpire(key: string, ttlSeconds: number): Promise<void> {
    try {
      await this.redis.expire(key, ttlSeconds);
    } catch (err) {
      console.error(`Redis.expire failed [${key}]`, err);
    }
  }
}
