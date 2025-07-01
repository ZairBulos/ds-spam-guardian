import { env } from "node:process";
import { ENV_KEYS } from "./keys";
import type { Environment } from "./types";

for (const key of ENV_KEYS) {
  if (!env[key]) throw new Error(`Missing environment variable: ${key}`);
}

const environment: Environment = {
  PRODUCTION: true,
  BOT_TOKEN: env.BOT_TOKEN!,
  BOT_CLIENT_ID: env.BOT_CLIENT_ID!,
  REDIS_PORT: Number(env.REDIS_PORT!),
  REDIS_HOST: env.REDIS_HOST!,
};

export default environment;
