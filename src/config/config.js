const dotenv = require("dotenv");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: path.join(__dirname, `../../.env.${NODE_ENV}`) });

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
  GUILD_ID: process.env.GUILD_ID,
};
