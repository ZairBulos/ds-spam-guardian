const spamPhraseValidator = require("./spamPhraseValidator");

class SpamValidator {
  constructor() {
    this.validators = [];
  }

  addValidator(validador) {
    this.validators.push(validador);
  }

  isSpam(message) {
    return this.validators.some((validator) => validator(message));
  }
}

const spamValidator = new SpamValidator();
spamValidator.addValidator(spamPhraseValidator);

module.exports = spamValidator;
