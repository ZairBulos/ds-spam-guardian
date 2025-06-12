const SPAM_PHRASES = require("@/consts/spamPhrases");

class SpamPhraseValidator {
  isSpam(message) {
    return SPAM_PHRASES.some((pattern) => pattern.test(message));
  }
}

module.exports = new SpamPhraseValidator();
