module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
