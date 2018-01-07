/**
 * @file Manages the root configuration settings for project wide stylelint.
 * @copyright Copyright (c) 2018, Graham Fairweather
 * @author Graham Fairweather <xotic750@gmail.com>
 * @module stylelint/root/configuration
 * @version 1.0.0
 * @since 0.0.1
 * @see {@link https://stylelint.io/} for further information.
 */

module.exports = {
  /**
   * The standard shareable config for stylelint.
   * @type {string|array.<string>}
   * @see {@link https://github.com/stylelint/stylelint-config-standard} standard.
   */
  extends: 'stylelint-config-standard',

  /**
   * @type {array}
   */
  plugins: [],

  /**
   * @type {array}
   */
  processors: [],

  /**
   * @type {!Object}
   */
  rules: {
    // 'no-empty-source': null,
  },
};
