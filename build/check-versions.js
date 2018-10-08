const chalk = require('chalk');
const semver = require('semver');
const shell = require('shelljs');
const packageConfig = require('../package.json');

const exec = (cmd) =>
  require('child_process')
    .execSync(cmd)
    .toString()
    .trim();

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node,
  },
];

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm,
  });
}

module.exports = () => {
  const warnings = versionRequirements.reduce((accumulator, mod) => {
    if (semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      return accumulator;
    }

    return [...accumulator, `${mod.name}: ${chalk.red(mod.currentVersion)} should be ${chalk.green(mod.versionRequirement)}`];
  }, []);

  if (warnings.length) {
    console.log('/n%s/n', chalk.yellow('To use this template, you must update following to modules:'));

    warnings.forEach((warning) => console.log(`  ${warning}`));

    console.log();
    process.exit(1);
  }
};
