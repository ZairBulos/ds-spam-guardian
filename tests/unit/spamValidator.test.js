const spamValidator = require("@/services/validator");

jest.mock("@/consts/spamPhrases", () => [/\btest spam\b/i, /\bmock phrase\b/i]);

describe("Spam Validator - Unit Tests", () => {
  test("should detect spam when message contains blacklisted phrases", () => {
    const message = "This is a test spam message.";
    expect(spamValidator.isSpam(message)).toBe(true);
  });

  test("should not detect spam for clean messages", () => {
    const message = "This is a clean message.";
    expect(spamValidator.isSpam(message)).toBe(false);
  });

  test("should handle case-insensitive spam detection", () => {
    const message = "This is a MOCK PHRASE.";
    expect(spamValidator.isSpam(message)).toBe(true);
  });
});
