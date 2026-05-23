module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.{js,ts,tsx}', '**/*.{spec,test}.{js,ts,tsx}'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-reanimated)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  passWithNoTests: true,
};
