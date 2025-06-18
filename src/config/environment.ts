import { env, loadEnvFile } from "node:process";

loadEnvFile();

const environment: Record<string, string> = {
  BOT_TOKEN: "",
};

Object.entries(environment).forEach(([key, value]) => {
  if (env[key]) {
    environment[key] = env[key] as string;
  } else throw new Error(`Missing environment variable: ${key}`);
});

export default environment;
