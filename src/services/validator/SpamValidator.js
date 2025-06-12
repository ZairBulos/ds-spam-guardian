class SpamValidator {
  constructor() {
    this.validators = [];
  }

  addValidator(validador) {
    this.validators.push(validador);
  }

  isSpam(message) {
    return this.validators.some((validator) => validator.isSpam(message));
  }
}

module.exports = SpamValidator;
