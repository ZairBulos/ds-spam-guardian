import { env, loadEnvFile } from "node:process";
import { ENV_KEYS } from "./keys";
import type { Environment } from "./types";

loadEnvFile();

for (const key of ENV_KEYS) {
  if (!env[key]) throw new Error(`Missing environment variable: ${key}`);
}

const environment: Environment = {
  BOT_TOKEN: env.BOT_TOKEN!,
  REDIS_PORT: Number(env.REDIS_PORT!),
  REDIS_HOST: env.REDIS_HOST!,
};

export default environment;
