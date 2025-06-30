import Redis from "ioredis";
import environment from "../environments/environment";

class RedisClient {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new Redis({
        port: environment.REDIS_PORT,
        host: environment.REDIS_HOST,
      });
    }

    return this.instance;
  }
}

export const redis = RedisClient.getInstance();
