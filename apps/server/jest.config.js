/** @type {import('jest').Config} */
const config = {
  verbose: true,
  coverageReporters: ['html', 'text'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    'constants.ts',
    'app.module.ts',
    'main.express.ts',
    'main.ts',
    '.*module.ts',
  ],
};

module.exports = config;
