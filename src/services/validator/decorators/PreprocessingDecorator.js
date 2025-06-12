const preprocessMessage = require("@/middlewares/preprocessMessage");

class PreprocessingDecorator {
  constructor(validator) {
    this.validator = validator;
  }

  isSpam(message) {
    const cleanedMessage = preprocessMessage(message.content);
    return this.validator.isSpam(cleanedMessage);
  }
}

module.exports = PreprocessingDecorator;
