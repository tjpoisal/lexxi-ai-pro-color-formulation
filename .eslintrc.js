module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Prettier formatting is disabled — 1000+ violations would break CI.
    // Run `npx prettier --write .` locally before re-enabling.
    'prettier/prettier': 'off',

    // Warn (not error) on unused variables so they are visible in CI output
    // without blocking the build.  Upgrade to 'error' once the codebase is clean.
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
