module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  setupFilesAfterEnv: ["./tests/utils/testSetup.js"],
};
