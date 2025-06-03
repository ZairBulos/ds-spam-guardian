const preprocessMessage = require("@/middlewares/preprocessMessage");

describe("Preprocess Message - Unit Tests", () => {
  test("should return empty string for null, undefined or non-string input", () => {
    expect(preprocessMessage(null)).toBe("");
    expect(preprocessMessage(undefined)).toBe("");
    expect(preprocessMessage(123)).toBe("");
    expect(preprocessMessage({})).toBe("");
  });

  test("should remove URLs", () => {
    const raw = "Check this out: https://example.com";
    const result = preprocessMessage(raw);
    expect(result).toBe("check this out");
  });

  test("should remove user mentions", () => {
    const raw = "Hello <@123456789>!";
    const result = preprocessMessage(raw);
    expect(result).toBe("hello");
  });

  test("should remove channel mentions", () => {
    const raw = "Please post in <#987654321>";
    const result = preprocessMessage(raw);
    expect(result).toBe("please post in");
  });

  test("should remove emojis", () => {
    const raw = "Great job! 😄🔥";
    const result = preprocessMessage(raw);
    expect(result).toBe("great job");
  });

  test("should remove special characters", () => {
    const raw = "Hello!!! How are you??? #$%";
    const result = preprocessMessage(raw);
    expect(result).toBe("hello how are you");
  });

  test("should normalize multiple spaces to a single space", () => {
    const raw = "This    is     spaced      text";
    const result = preprocessMessage(raw);
    expect(result).toBe("this is spaced text");
  });

  test("should convert to lowercase", () => {
    const raw = "ThIs Is A TesT";
    const result = preprocessMessage(raw);
    expect(result).toBe("this is a test");
  });

  test("should trim leading and trailing whitespace", () => {
    const raw = "   spaced text   ";
    const result = preprocessMessage(raw);
    expect(result).toBe("spaced text");
  });

  test("should handle full transformation pipeline", () => {
    const raw = "🚀 Visit <@1234> https://link.com NOW!!! 🎉";
    const result = preprocessMessage(raw);
    expect(result).toBe("visit now");
  });
});
