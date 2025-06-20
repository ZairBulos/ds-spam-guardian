import { ClientEvents } from "discord.js";

export interface Event<K extends keyof ClientEvents = keyof ClientEvents> {
  name: string;
  once?: boolean;
  execute(...args: ClientEvents[K]): void | Promise<void>;
}
