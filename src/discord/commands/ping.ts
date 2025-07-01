import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../core/interfaces/command";

class PingCommand implements Command {
  data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

  public async execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    await interaction.reply("Pong!");
  }
}

export default new PingCommand();
