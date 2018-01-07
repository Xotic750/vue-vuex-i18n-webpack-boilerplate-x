const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// If the file is greater than the limit (in bytes) the file-loader is used by default
// and all query parameters are passed to it.
// https://github.com/webpack-contrib/url-loader
const urlLoaderBytesLimit = 8192;

const resolve = dir => path.join(__dirname, '..', dir);

// https://github.com/github/fetch
// https://github.com/webpack-contrib/imports-loader
// https://github.com/webpack-contrib/exports-loader
// https://webpack.js.org/guides/migrating/#automatic-loader-module-name-extension-removed
const WHATWG_FETCH = 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch';

// https://github.com/MoOx/eslint-loader
const eslintLoader = {
  loader: 'eslint-loader',
  enforce: 'pre',
  options: {
    emitError: true,
    emitWarning: !config.dev.showEslintErrorsInOverlay,
    failOnError: true,
    failOnWarning: false,
    formatter: require('eslint-friendly-formatter'),
    quiet: true,
  },
};

const createLintingRule = () => ({
  test: /\.(js|vue|json)$/,
  include: [resolve('src'), resolve('test')],
  ...eslintLoader,
});

// https://github.com/babel/babel-loader
const babelLoader = {
  loader: 'babel-loader',
  options: {
    plugins: ['lodash'],
    presets: [['env', {
      modules: false,
      targets: {
        node: 8,
      },
    }]],
  },
};

// A webpack plugin to lint your CSS/Sass code using stylelint.
// https://github.com/JaKXz/stylelint-webpack-plugin
const createLintingPlugin = () => new StyleLintPlugin({
  emitErrors: true,
  failOnError: false, // https://github.com/JaKXz/stylelint-webpack-plugin/issues/103
  files: ['**/{src,test}/*.+(css|sass|scss|less|vue)'],
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
      '@': resolve('src'),
      '~': resolve(''),
    },
  },

  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),

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
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
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
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },

  plugins: [
    // https://webpack.js.org/plugins/provide-plugin/
    new webpack.ProvidePlugin({
      fetch: WHATWG_FETCH,
      'window.fetch': WHATWG_FETCH,
    }),

    // Smaller lodash builds. We are not opting in to any features.
    // https://github.com/lodash/lodash-webpack-plugin}
    new LodashModuleReplacementPlugin({}),

    // A webpack plugin to lint your CSS/Sass code using stylelint.
    // https://github.com/JaKXz/stylelint-webpack-plugin
    ...(config.dev.useStylelint ? [createLintingPlugin()] : []),
  ],

};
