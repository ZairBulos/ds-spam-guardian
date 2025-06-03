const preprocessMessage = require("@/middlewares/preprocessMessage");
const spamValidator = require("@/services/validator");

describe("Spam Detection - Integration Test", () => {
  test("should preprocess message and detect spam correctly", () => {
    const rawMessage = "🔥 Check this <@1234> https://spam.com 100 gift !!!";

    const cleanedMessage = preprocessMessage(rawMessage);
    expect(cleanedMessage).toBe("check this 100 gift");

    const isSpam = spamValidator.isSpam(cleanedMessage);

    expect(isSpam).toBe(true);
  });

  test("should preprocess message and not detect spam when clean", () => {
    const rawMessage = "Hello @everyone! Have a nice day 😊";

    const cleanedMessage = preprocessMessage(rawMessage);
    expect(cleanedMessage).toBe("hello everyone have a nice day");

    const isSpam = spamValidator.isSpam(cleanedMessage);
    expect(isSpam).toBe(false);
  });
});
