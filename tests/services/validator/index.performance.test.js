const spamValidator = require("@/services/validator");
const { performance } = require("perf_hooks");

describe("SpamValidator Performance", () => {
  if (!process.env.CI) {
    test("should handle thousands of messages efficiently", () => {
      const spamMessage = "$50 gift https://www.malicious-link.com";
      const cleanMessage =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris velit, molestie non accumsan et, pretium id libero.";
  
      const spamMessages = Array(100000).fill(spamMessage);
      const cleanMessages = Array(100000).fill(cleanMessage);
      const messages = [...spamMessages, ...cleanMessages];
  
      const startTime = performance.now();
      messages.forEach((message) => {
        spamValidator.isSpam(message);
      });
      const endTime = performance.now();
  
      const duration = endTime - startTime;
      console.log(`Validated ${messages.length} messages in ${duration}ms`);
  
      expect(duration).toBeLessThan(30);
    });
  }
});
