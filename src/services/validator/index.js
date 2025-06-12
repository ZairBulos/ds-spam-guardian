const SpamValidator = require("./SpamValidator");
const SpamPhraseValidator = require("./SpamPhraseValidator");
const PreprocessingDecorator = require("./decorators/PreprocessingDecorator");

const spamValidator = new SpamValidator();

const decoratedSpamPhraseValidator = new PreprocessingDecorator(SpamPhraseValidator);

spamValidator.addValidator(decoratedSpamPhraseValidator);

module.exports = spamValidator;
