import type { Config } from "jest";

const config: Config = {
  verbose: true,
  roots: ["<rootDir>"],
  preset: "jest-expo",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node", "tsx"],
  transformIgnorePatterns: [
    "node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))",
  ],
  moduleNameMapper: {
    "^@app(.*)$": "<rootDir>/src$1",
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  modulePathIgnorePatterns: ["<rootDir>/__tests__/utils", "jest.config.ts"],
  setupFiles: ["./jest.setup.ts"],
  coverageReporters: ["text-summary", "lcov"],
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: [
    "AssetsProvider/index.tsx",
    "App.tsx",
    "BorrowBookScreen/index.tsx",
    "<rootDir>/index.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};

export default config;
