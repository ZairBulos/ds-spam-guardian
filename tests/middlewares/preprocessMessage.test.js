const preprocessMessage = require("@/middlewares/preprocessMessage");

describe("preprocessMessage", () => {
  test("should return an empty string for null or undefined input", () => {
    expect(preprocessMessage(null)).toBe("");
    expect(preprocessMessage(undefined)).toBe("");
  });
  
  test("should convert message to lowercase", () => {
    expect(preprocessMessage("HELLO WORLD")).toBe("hello world");
  });

  test("should remove URLs", () => {
    expect(preprocessMessage("Check this out: https://example.com")).toBe("check this out");
  });

  test("should remove emojis", () => {
    expect(preprocessMessage("Hello 😊")).toBe("hello");
  });

  test("should remove special characters", () => {
    expect(preprocessMessage("Hello, World!")).toBe("hello world");
  });

  test("should remove extra whitespaces", () => {
    expect(preprocessMessage("   Hello    World   ")).toBe("hello world");
  });

  test("should handle a combination of transformations", () => {
    const input = "  Hello 😊! Visit https://example.com for more info.   ";
    const expected = "hello visit for more info";
    expect(preprocessMessage(input)).toBe(expected);
  });
});
