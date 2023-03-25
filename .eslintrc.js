const { resolve } = require('path');
module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },

  env: {
    browser: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',
    // consider disabling this class of rules if linting takes too long
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.
    'prettier',
  ],

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',
  ],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly',
  },

  // add your custom rules here
  rules: {
    'prefer-promise-reject-errors': 'off',
    'prefer-const': 'error',

    // TypeScript
    quotes: ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/explicit-function-return-type': [
      1,
      { allowExpressions: true },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 1,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/unbound-method': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-var-requires': 0,

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Sometimes you want to define a function as async because you expect it to become
    // async later on, but right now there's no await.
    'require-await': 0, // 0 = off, 1 = warn, 2 = error
  },
};
