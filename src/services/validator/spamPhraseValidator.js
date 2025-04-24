const SPAM_PHRASES = require("@/consts/spamPhrases");

module.exports = (message) => {
  return SPAM_PHRASES.some((pattern) => pattern.test(message));
};
