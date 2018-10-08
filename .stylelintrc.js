/**
 * @file Manages the root configuration settings for project wide stylelint.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @module stylelint/RootDir/configuration
 * @version 1.0.0
 * @since 0.0.2
 * @see {@link https://stylelint.io/} for further information.
 */

module.exports = {
  /**
   * Extend an existing configuration.
   * @type {String|Array.<String>}
   * @see {@link https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#extends}
   */
  extends: [
    /**
     * The standard shareable config for stylelint.
     * @type {string}
     * @see {@link https://github.com/stylelint/stylelint-config-standard}
     */
    'stylelint-config-standard',
    /**
     * Turns off all rules that are unnecessary or might conflict with prettier.
     * @type {string}
     * @see {@link https://github.com/shannonmoeller/stylelint-config-prettier}
     */
    'stylelint-config-prettier',
  ],

  /**
   * @type {array}
   */
  // plugins: [], // do not include empty

  /**
   * @type {array}
   */
  // processors: [], // do not include empty

  /**
   * @type {!Object}
   */
  rules: {
    'no-empty-source': null,
    'no-missing-end-of-source-newline': null, // currently has a bug #3428
  },
};
