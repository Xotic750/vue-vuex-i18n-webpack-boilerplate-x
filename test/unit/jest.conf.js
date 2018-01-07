const path = require('path');

// https://facebook.github.io/jest/docs/en/configuration.html

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),

  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
    // https://facebook.github.io/jest/docs/en/manual-mocks.html#content
    // https://facebook.github.io/jest/docs/en/webpack.html
    // '^.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/test/unit/__mocks__/fileMock.js',
    // https://github.com/keyanzhang/identity-obj-proxy
    '^.*\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
  },

  transform: {
    // https://github.com/facebook/jest/tree/master/packages/babel-jest
    '^.+\\.(js|jsx)$': 'babel-jest',
    // https://github.com/eddyerburgh/vue-jest
    '^.*\\.(vue)$': 'vue-jest',
    // https://github.com/gutenye/jest-css
    '^.*\\.(css|styl|less|sass|scss)$': 'jest-css',
    // https://github.com/gutenye/jest-file
    // '^(?!.*\\.(js|css|json)$)': 'jest-file',
  },

  // https://github.com/eddyerburgh/jest-serializer-vue
  snapshotSerializers: [
    'jest-serializer-vue',
  ],

  setupFiles: [
    '<rootDir>/test/unit/setup',
  ],

  mapCoverage: true,

  coverageDirectory: '<rootDir>/test/unit/coverage',

  collectCoverageFrom: [
    'src/**/*.{js,jsx,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**',
  ],
};
