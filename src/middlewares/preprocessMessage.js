module.exports = (message) => {
  if (!message || typeof message !== "string") return "";

  return message
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "") // Remove URLs
    .replace(/[\u{1F300}-\u{1F6FF}]/gu, "") // Remove emojis
    .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, " ") // Remove extra whitespaces
    .trim();
};
