const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');
const packageConfig = require('../package.json');

exports.assetsPath = (_path) => {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = (options = {}) => {
  // Extract CSS when that option is specified
  // (which is the case during production build)
  /**
   * Adds CSS to the DOM by injecting a <style> tag.
   * @type {!Object}
   * @see {@link https://webpack.js.org/loaders/style-loader/}
   */
  const styleLoader = options.extract
    ? MiniCssExtractPlugin.loader
    : {
        loader: 'style-loader',
        options: {
          singleton: true,
          sourceMap: options.sourceMap,
        },
      };

  /**
   * The css-loader interprets @import and url() like import/require() and will resolve them.
   * Also consider: https://webpack.js.org/loaders/css-loader/#extract
   * @type {!Object}
   * @see {@link https://webpack.js.org/loaders/css-loader/}
   */
  const cssLoader = {
    loader: 'css-loader',
    options: {
      camelCase: true,
      sourceMap: options.sourceMap,
    },
  };

  /**
   * Transforming styles with JS plugins.
   * @type {!Object}
   * @see {@link https://github.com/postcss/postcss#usage/}
   */
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };

  // generate loader string to be used with extract text plugin
  const generateLoaders = (loader, loaderOptions) => {
    const loaders = options.usePostCSS ? [styleLoader, cssLoader, postcssLoader] : [styleLoader, cssLoader];

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: {
          ...loaderOptions,
          ...{
            sourceMap: options.sourceMap,
          },
        },
      });
    }

    return ['vue-style-loader', ...loaders];
  };

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', {
      strictMath: true,
    }),
    sass: generateLoaders('sass', {
      indentedSyntax: true,
    }),
    scss: generateLoaders('sass'),
    styl: generateLoaders('stylus'),
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = (options) => {
  const loaders = exports.cssLoaders(options);

  return Object.keys(loaders)
    .filter((extension) => extension !== 'postcss')
    .map((extension) => ({
      test: new RegExp(`\\.(${extension})(\\?\\S*)?$`),
      loaders: loaders[extension],
    }));
};

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') {
      return;
    }

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: `${severity}: ${error.name}`,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png'),
    });
  };
};
