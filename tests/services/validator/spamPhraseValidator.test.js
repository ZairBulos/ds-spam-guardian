const spamPhraseValidator = require("@/services/validator/spamPhraseValidator");

describe("spamPhraseValidator", () => {
  test("should detect spam phrases", () => {
    expect(spamPhraseValidator("$50 gift https://www.malicious-link.com")).toBe(
      true,
    );
    expect(
      spamPhraseValidator(
        "@everyone steam gift 100$ - https://www.malicious-link.com",
      ),
    ).toBe(true);
    expect(
      spamPhraseValidator("free nudes https://www.malicious-link.com"),
    ).toBe(true);
  });

  test("should handle case insensitivity", () => {
    expect(spamPhraseValidator("GET YOUT 100 GIFT NOW!")).toBe(true);
    expect(spamPhraseValidator("STEAM GIFT 50 IS HERE")).toBe(true);
    expect(spamPhraseValidator("FREE NUDES AVAILABLE")).toBe(true);
  });

  test("should not detect spam in clean messages", () => {
    expect(spamPhraseValidator("This game costs $50 on Steam")).toBe(false);
    expect(
      spamPhraseValidator(
        "Nudes are not allowed in this server, please follow the rules",
      ),
    ).toBe(false);
  });

  test("should handle empty or null messages", () => {
    expect(spamPhraseValidator("")).toBe(false);
    expect(spamPhraseValidator(null)).toBe(false);
    expect(spamPhraseValidator(undefined)).toBe(false);
  });
});
