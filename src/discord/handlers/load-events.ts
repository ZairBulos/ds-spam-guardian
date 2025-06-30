import { Client } from "discord.js";
import { Event } from "../../core/interfaces/event";
import { loadFiles } from "../../utils/load-files";

export const loadEvents = (client: Client): void => {
  const eventFiles = loadFiles<Event>("discord/events");
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
