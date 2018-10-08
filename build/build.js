require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rimraf = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

rimraf(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (errorRm) => {
  if (errorRm) {
    throw errorRm;
  }

  webpack(webpackConfig, (errorWebpack, stats) => {
    spinner.stop();

    if (errorWebpack) {
      throw errorWebpack;
    }

    process.stdout.write(
      `${stats.toString({
        colors: true,
        modules: false,
        /*
         * If you are using ts-loader, setting children to true will make TypeScript
         * errors show up during build.
         */
        children: false,
        chunks: false,
        chunkModules: false,
      })}\n\n`,
    );

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
    const part1 = '  Tip: built files are meant to be served over an HTTP server.';
    const part2 = "  Opening index.html over file:// won't work.";
    console.log(chalk.yellow(`${part1}\n${part2}\n`));
  });
});
