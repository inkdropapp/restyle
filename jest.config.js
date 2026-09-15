module.exports = {
  verbose: true,
  preset: '@react-native/jest-preset',
  testMatch: ['<rootDir>/src/test/**/*.(test|spec).(ts|tsx|js)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironmentOptions: {
    customExportConditions: ['require', 'react-native'],
  },
};
