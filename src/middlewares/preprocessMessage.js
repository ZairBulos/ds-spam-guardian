const emojiRegex = require("emoji-regex");

// Precompile regexes
const URL_REGEX = /https?:\/\/\S+/g;
const MENTION_REGEX = /<@!?\d+>/g;
const CHANNEL_REGEX = /<#\d+>/g;
const EMOJI_REGEX = emojiRegex();

module.exports = (message) => {
  if (!message || typeof message !== "string") return "";

  return message
    .replace(URL_REGEX, "")
    .replace(MENTION_REGEX, "")
    .replace(CHANNEL_REGEX, "")
    .replace(EMOJI_REGEX, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();
};
