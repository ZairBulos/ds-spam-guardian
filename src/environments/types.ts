export type Environment = {
  PRODUCTION?: boolean;
  BOT_TOKEN: string;
  BOT_CLIENT_ID: string;
  BOT_GUILD_ID?: string;
  REDIS_PORT: number;
  REDIS_HOST: string;
};
