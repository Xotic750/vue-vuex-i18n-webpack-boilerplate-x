const path = require('path');
// const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

/**
 * The NODE_ENV environment variable.
 * @type {!Object}
 */
const {NODE_ENV} = process.env;

/**
 * The production string.
 * @type {string}
 */
const PRODUCTION = 'production';

/**
 * The development string.
 * @type {string}
 */
// const DEVELOPMENT = 'development';

const resolve = (dir) => path.join(__dirname, '..', dir);
const src = resolve('src');
const INCLUDE = [src, resolve('__tests__')];

/**
 * Shared (.js & .vue) eslint-loader options.
 * @type {!Object}
 * @see {@link https://github.com/MoOx/eslint-loader}
 */
const eslintLoader = {
  loader: 'eslint-loader',
  options: {
    emitError: true,
    emitWarning: !config.dev.showEslintErrorsInOverlay,
    failOnError: config.build.failOnLintErrors,
    failOnWarning: false,
    quiet: NODE_ENV === PRODUCTION,
  },
};

const createLintingRule = () => ({
  enforce: 'pre',
  test: /\.(js|vue)$/,
  include: INCLUDE,
  ...eslintLoader,
});

// https://github.com/babel/babel-loader
const babelLoader = {
  include: INCLUDE,
  loader: 'babel-loader',
};

/**
 * If the file is greater than the limit (in bytes) the file-loader is used by default
 * and all query parameters are passed to it.
 *
 * In development, we are unable to serve files so url encode everything.
 *
 * @type {number}
 * @see {@link https://github.com/webpack-contrib/url-loader#limit}
 */
const urlLoaderBytesLimit = NODE_ENV === PRODUCTION ? 8192 : Number.MAX_SAFE_INTEGER;

// A webpack plugin to lint your CSS/Sass code using stylelint.
// https://github.com/JaKXz/stylelint-webpack-plugin
const createLintingPlugin = () =>
  new StyleLintPlugin({
    emitErrors: config.build.failOnLintErrors,
    failOnError: false, // https://github.com/JaKXz/stylelint-webpack-plugin/issues/103
    files: ['**/*.+(css|sass|scss|less|vue)'],
    quiet: true, // https://github.com/JaKXz/stylelint-webpack-plugin/issues/61
  });

module.exports = {
  context: resolve(''),

  entry: {
    app: './src/main.js',
  },

  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
  },

  resolve: {
    extensions: ['.js', ',jsx', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      Src: src,
      RootDir: resolve(''),
    },
  },

  module: {
    rules: [
      /**
       * Extract sourceMappingURL comments from modules and offer it to webpack
       * @see {@link https://github.com/webpack-contrib/source-map-loader}
       */
      {
        enforce: 'pre',
        loader: 'source-map-loader',
        test: /\.js$/,
      },

      ...(config.dev.useEslint ? [createLintingRule()] : []),

      /**
       * vue-loader is a loader for webpack that can transform Vue components written
       * in the following format into a plain JavaScript module.
       * @type {!Object}
       * @see {@link https://vue-loader.vuejs.org/en/}
       */
      {
        test: /\.vue$/,
        loaders: [
          // https://vue-loader.vuejs.org/en/
          {
            loader: 'vue-loader',
            options: {
              ...vueLoaderConfig,
              loaders: {
                js: [babelLoader, eslintLoader],
              },
            },
          },
          // https://www.iviewui.com/docs/guide/iview-loader-en
          {
            loader: 'iview-loader',
            options: {
              prefix: false,
            },
          },
        ],
      },

      {
        test: /\.js$/,
        include: INCLUDE.concat(resolve('node_modules/webpack-dev-server/client')),
        ...babelLoader,
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: urlLoaderBytesLimit,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },

      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: urlLoaderBytesLimit,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: urlLoaderBytesLimit,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },

  node: {
    child_process: 'empty',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    tls: 'empty',
  },

  plugins: [
    new VueLoaderPlugin(),

    // Smaller lodash builds. We are not opting in to any features.
    // https://github.com/lodash/lodash-webpack-plugin}
    new LodashModuleReplacementPlugin({}),

    // A webpack plugin to lint your CSS/Sass code using stylelint.
    // https://github.com/JaKXz/stylelint-webpack-plugin
    ...(config.dev.useStylelint ? [createLintingPlugin()] : []),
  ],
};
