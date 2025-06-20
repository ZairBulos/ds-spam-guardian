import Redis from "ioredis";
import environment from "./environment";

export class RedisClient {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new Redis({
        port: parseInt(environment.REDIS_PORT),
        host: environment.REDIS_HOST,
      });
    }

    return this.instance;
  }
}
