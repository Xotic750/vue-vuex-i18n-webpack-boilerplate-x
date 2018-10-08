const postcssHTML = require('postcss-html');
const postcssImport = require('postcss-import');
const postcssURL = require('postcss-url');
const postcssSafe = require('postcss-safe-parser');
const postcssAutoprefixer = require('autoprefixer');

module.exports = {
  plugins: [postcssHTML, postcssImport, postcssURL, postcssSafe, postcssAutoprefixer],
};
