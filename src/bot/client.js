const { Client, GatewayIntentBits, Collection } = require("discord.js");
loadCommands = require("./handlers/loadCommands");
loadEvents = require("./handlers/loadEvents");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
loadCommands(client);
loadEvents(client);

module.exports = client;
