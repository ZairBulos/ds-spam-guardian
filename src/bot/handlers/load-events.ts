import { Event } from "../../core/interfaces/event.interface";
import { loadFiles } from "../../utils/load-files";
import { Client } from "discord.js";

export const loadEvents = (client: Client): void => {
  const eventFiles = loadFiles<Event>("bot/events");
  eventFiles.forEach(({ module }) => {
    const listener = (...args: Parameters<typeof module.execute>) => {
      module.execute(...args);
    };

    if (module.once) {
      client.once(module.name, listener);
    } else {
      client.on(module.name, listener);
    }
  });
};
