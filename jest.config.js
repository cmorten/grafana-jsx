module.exports = {
  testURL: "http://localhost",
  collectCoverageFrom: ["src/**/*.js"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
};
