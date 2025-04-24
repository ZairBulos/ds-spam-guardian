const spamValidator = require("@/services/validator");

describe("SpamValidatorIT", () => {
  test("should detect spam using registered validators", () => {
    expect(
      spamValidator.isSpam("$50 gift https://www.malicious-link.com"),
    ).toBe(true);
    expect(
      spamValidator.isSpam(
        "@everyone steam gift 100$ - https://www.malicious-link.com",
      ),
    ).toBe(true);
    expect(
      spamValidator.isSpam("free nudes https://www.malicious-link.com"),
    ).toBe(true);
  });

  test("should handle case insensitivity", () => {
    expect(spamValidator.isSpam("GET YOUR 100 GIFT NOW!")).toBe(true);
    expect(spamValidator.isSpam("STEAM GIFT 50 IS HERE")).toBe(true);
    expect(spamValidator.isSpam("FREE NUDES AVAILABLE")).toBe(true);
  });

  test("should not detect spam in clean messages", () => {
    expect(spamValidator.isSpam("This game costs $50 on Steam")).toBe(false);
    expect(
      spamValidator.isSpam(
        "Nudes are not allowed in this server, please follow the rules",
      ),
    ).toBe(false);
  });

  test("should handle empty or null messages", () => {
    expect(spamValidator.isSpam("")).toBe(false);
    expect(spamValidator.isSpam(null)).toBe(false);
    expect(spamValidator.isSpam(undefined)).toBe(false);
  });
});
