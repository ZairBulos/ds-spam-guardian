const preprocessMessage = require("@/middlewares/preprocessMessage");
const spamValidator = require("@/services/validator");
const { performance } = require("perf_hooks");

describe("SpamValidator - Performance", () => {
  const NUM_MESSAGES = 500000;
  const TIME_LIMIT_MS = 5000;

  const spamMessages = [
    "@everyone Steam $50 gift card giveaway! Join now: https://example.com",
    "Gift $50 Steam card! Click here: https://example.com",
    "🔥 Free nudes available!!! https://example.com",
  ];

  const cleanMessages = [
    "Mauris a pellentesque arcu. Maecenas finibus vestibulum diam eget iaculis. Phasellus orci massa, ultricies vitae odio eu, volutpat pretium ex.",
    "Mauris luctus ullamcorper bibendum. Nam ac lorem arcu. Vivamus pretium eleifend hendrerit. Sed ultrices condimentum egestas. Vivamus non massa ante. Vivamus ut dapibus tellus.",
    "Morbi auctor ligula vestibulum mi ultrices suscipit. Ut vestibulum pharetra velit, vel commodo urna gravida sed. Aliquam scelerisque eleifend molestie. Sed id nisi nisl. ",
  ];

  const messages = [];
  for (let i = 0; i < NUM_MESSAGES / 2; i++) {
    messages.push(spamMessages[i % spamMessages.length]);
    messages.push(cleanMessages[i % cleanMessages.length]);
  }

  test(`should preprocess and validate ${NUM_MESSAGES} mixed messages within ${TIME_LIMIT_MS} ms`, () => {
    const start = performance.now();

    for (let i = 0; i < NUM_MESSAGES; i++) {
      const msg = messages[i];
      const cleaned = preprocessMessage(msg);
      spamValidator.isSpam(cleaned);
    }

    const end = performance.now();

    const duration = end - start;
    console.log(
      `Processed and validated ${NUM_MESSAGES} messages in ${duration.toFixed(2)} ms`,
    );

    expect(duration).toBeLessThanOrEqual(TIME_LIMIT_MS);
  });
});
