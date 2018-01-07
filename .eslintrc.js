/**
 * @file Manages the root configuration settings for project wide eslint.
 * @copyright Copyright (c) 2018, Graham Fairweather
 * @author Graham Fairweather <xotic750r@gmail.com>
 * @module eslint/root/configuration
 * @version 1.0.0
 * @since 0.0.1
 * @see {@link https://eslint.org} for further information.
 */

const {
  NODE_ENV,
} = process.env;

const isProduction = NODE_ENV === 'production';

/**
 * Eslint rules that differ from airbnb base.
 * @see {@link https://eslint.org/docs/rules/} rules.
 */
const customElint = {
  'global-require': 'warn',
  'max-len': ['error', 130],
  'no-debugger': isProduction ? 'error' : 'off',
  'no-param-reassign': 'warn',
  'sort-keys': 'off',
};

/**
 * Additional ESLint rules for ESLint's directive-comments.
 * @see {@link https://github.com/mysticatea/eslint-plugin-eslint-comments} plugin.
 */
const eslintComments = {
  'eslint-comments/disable-enable-pair': 'error',
  'eslint-comments/no-duplicate-disable': 'error',
  'eslint-comments/no-unlimited-disable': 'error',
  'eslint-comments/no-unused-disable': 'error',
  'eslint-comments/no-unused-enable': 'error',
  'eslint-comments/no-use': 'off',
};

/**
 * An ESlint rule plugin companion to babel-eslint.
 * @see {@link https://github.com/babel/eslint-plugin-babel} plugin.
 */
const classProperty = {
  'babel/new-cap': 'error',
  'babel/no-invalid-this': 'error',
  'babel/object-curly-spacing': 'error',
  'babel/semi': 'error',
};

/**
 * Lint the browser compatibility of your code.
 * @see {@link https://github.com/amilajack/eslint-plugin-compat} plugin.
 */
const compat = {
  'compat/compat': isProduction ? 'off' : 'warn',
};

/**
 * Helps you in tracking down problems when you are using css-modules.
 * @see {@link https://github.com/atfzl/eslint-plugin-css-modules} plugin.
 */
const cssModules = {
  'css-modules/no-undef-class': 'warn',
  'css-modules/no-unused-class': 'off',
};

/**
 * ESLint plugin to prevent use of extended native objects.
 * @see {@link https://github.com/dustinspecker/eslint-plugin-no-use-extend-native} plugin.
 */
const extendNative = {
  'no-use-extend-native/no-use-extend-native': 'error',
};


/**
 * ESLint plugin with rules that help validate proper imports.
 * @see {@link https://github.com/benmosher/eslint-plugin-import} plugin.
 */
const importExport = {
  'import/no-extraneous-dependencies': ['error', {
    devDependencies: ['**/{build,config,test}/*.js'],
  }],
};

/**
 * ESLint plugin for Jest.
 * @see {@link https://github.com/jest-community/eslint-plugin-jest} plugin.
 */
const jest = {
  'jest/no-disabled-tests': 'warn',
  'jest/no-focused-tests': 'error',
  'jest/no-identical-title': 'error',
  'jest/prefer-to-have-length': 'warn',
  'jest/valid-expect': 'error',
};

/**
 * JSDoc specific linting rules for ESLint.
 * @see {@link https://github.com/gajus/eslint-plugin-jsdoc} plugin.
 */
const jsdoc = {
  'jsdoc/check-param-names': 'warn',
  'jsdoc/check-tag-names': 'warn',
  'jsdoc/check-types': 'warn',
  'jsdoc/newline-after-description': 'warn',
  'jsdoc/require-description-complete-sentence': 'warn',
  'jsdoc/require-example': 'off',
  'jsdoc/require-hyphen-before-param-description': 'warn',
  'jsdoc/require-param': 'warn',
  'jsdoc/require-param-description': 'warn',
  'jsdoc/require-param-type': 'warn',
  'jsdoc/require-returns-description': 'warn',
  'jsdoc/require-returns-type': 'warn',
};

/**
 * ESLint rules for lodash.
 * @see {@link https://github.com/wix/eslint-plugin-lodash} plugin.
 */
const lodash = {
  'lodash/prefer-constant': 'off',
  'lodash/prefer-get': 'off',
  'lodash/prefer-includes': 'off',
  'lodash/prefer-is-nil': 'warn',
  'lodash/prefer-lodash-chain': 'off',
  'lodash/prefer-lodash-method': 'off',
  'lodash/prefer-lodash-typecheck': 'off',
  'lodash/prefer-matches': 'off',
  'lodash/prefer-noop': 'error',
  'lodash/prefer-over-quantifier': 'off',
  'lodash/prefer-some': 'off',
  'lodash/prefer-startswith': 'off',
};

/**
 * ESLint rule for suggesting that object spread properties be used.
 * @see {@link https://github.com/bryanrsmith/eslint-plugin-prefer-object-spread} plugin.
 */
const objectSpread = {
  'prefer-object-spread/prefer-object-spread': 'error',
};

/**
 * An ESLint rule for enforcing consistent ES6 class member order.
 * @see {@link https://github.com/bryanrsmith/eslint-plugin-sort-class-members} plugin.
 */
const sortClass = {
  'sort-class-members/sort-class-members': ['error', {
    accessorPairPositioning: 'getThenSet',
    order: [
      '[static-properties]',
      '[static-methods]',
      '[properties]',
      '[conventional-private-properties]',
      'constructor',
      '[methods]',
      '[conventional-private-methods]',
    ],
  }],
};

/**
 * Official ESLint plugin for Vue.js
 * @see {@link https://github.com/vuejs/eslint-plugin-vue} plugin.
 */
const vue = {
  'vue/order-in-components': 'error',
  'vue/v-bind-style': ['error', 'shorthand'],
};

/** configuration */
module.exports = {
  /**
   * @see {@link https://eslint.org/docs/user-guide/configuring#specifying-environments} env.
   */
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  /**
   * @see {@link https://eslint.org/docs/user-guide/configuring#extending-configuration-files} extends.
   */
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended',
    'plugin:lodash/recommended',
    'plugin:css-modules/recommended',
    'plugin:vue/recommended',
  ],

  /**
   * You can define global variables here.
   * @see {@link https://eslint.org/docs/user-guide/configuring#specifying-globals} globals.
   */
  globals: {
    logger: false,
  },

  /**
   * @see {@link https://eslint.org/docs/user-guide/configuring#specifying-parser-options} parserOptions.
   */
  parserOptions: {
    ecmaFeatures: {
      es6: true,
      impliedStrict: true,
    },
    ecmaVersion: 2017,
    parser: 'babel-eslint',
    sourceType: 'module',
  },

  /**
   * @see {@link https://eslint.org/docs/user-guide/configuring#configuring-plugins} plugins.
   */
  plugins: [
    'babel',
    'compat',
    'css-modules',
    'eslint-comments',
    'jest',
    'jsdoc',
    'json',
    'lodash',
    'no-use-extend-native',
    'prefer-object-spread',
    'promise',
    'sort-class-members',
    'vue',
    'html',
  ],

  /**
   * @see {@link https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy} root.
   */
  root: true,

  /**
   * @see {@link https://eslint.org/docs/user-guide/configuring#configuring-rules} rules.
   */
  rules: {
    ...customElint,
    ...compat,
    ...cssModules,
    ...extendNative,
    ...classProperty,
    ...jest,
    ...lodash,
    ...objectSpread,
    ...sortClass,
    ...jsdoc,
    ...vue,
    ...eslintComments,
    ...importExport,
  },

  /**
   * Webpack-literate module resolution plugin for eslint-plugin-import.
   * @see {@link https://www.npmjs.com/package/eslint-import-resolver-webpack} plugin.
   */
  settings: {
    'html/html-extensions': [
      '.erb',
      '.handlebars',
      '.hbs',
      '.htm',
      '.html',
      '.mustache',
      '.nunjucks',
      '.php',
      '.tag',
      '.twig',
      '.we',
    ],
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },

};
