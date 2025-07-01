import { ChatInputCommandInteraction, Events } from "discord.js";
import { DiscordBot } from "../client";
import { Event } from "../../core/interfaces/event";
import { logger } from "../../config/logger";

class InteractionCreateEvent implements Event<Events.InteractionCreate> {
  public name = Events.InteractionCreate;

  public async execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const client = interaction.client as DiscordBot;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      logger.error(
        `Error executing command ${interaction.commandName}`,
        "[DISCORD]"
      );
    }
  }
}

export default new InteractionCreateEvent();
