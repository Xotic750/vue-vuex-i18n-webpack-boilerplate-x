const postcssHTML = require('postcss-html');
const postcssURL = require('postcss-url');
const postcssSafe = require('postcss-safe-parser');
const postcssAutoprefixer = require('autoprefixer');

module.exports = {
  plugins: [postcssHTML, postcssURL, postcssSafe, postcssAutoprefixer],
};
