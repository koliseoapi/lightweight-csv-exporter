// Jest config
// See https://facebook.github.io/jest/docs/en/configuration.html
module.exports = {
  testMatch: ["<rootDir>/test/*-test.{js,ts}"],
  notify: true,
  verbose: true,
  transform: {
    "^.+\\.(js|ts)$": "babel-jest",
  },
};