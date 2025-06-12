const preprocessMessage = require("@/middlewares/preprocessMessage");
const spamValidator = require("@/services/validator");

describe("Spam Detection - Integration Test", () => {
  test("should preprocess message and detect spam correctly", () => {
    const message = {
      content: "🔥 Check this <@1234> https://spam.com 100 gift !!!",
    };
    const isSpam = spamValidator.isSpam(message);
    expect(isSpam).toBe(true);
  });

  test("should preprocess message and not detect spam when clean", () => {
    const message = { content: "Hello @everyone! Have a nice day 😊" };
    const isSpam = spamValidator.isSpam(message);
    expect(isSpam).toBe(false);
  });
});
