module.exports = {
  collectCoverageFrom: [
    'pages/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    // glue code should be ignored:
    '!pages/_app.tsx',
    '!pages/_document.tsx',
    // generated code should also be ignored:
    '!src/client',
  ],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {},
}
