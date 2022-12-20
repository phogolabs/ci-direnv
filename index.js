const core = require('@actions/core');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const path = core.getInput('path');
    const mask = core.getInput('mask');
    const expr = core.getInput('export');

    const dotenv = require('dotenv').config({ path });
    const dotexp = require('dotenv-expand').expand(dotenv);
    const variables = {}

    core.info(`Exporting environment variables from ${path}`)
    core.setOutput('variables', variables);

    for (const name in dotexp.parsed) {
      const key = name.toLocaleLowerCase();
      const value = dotexp.parsed[name];
      // output the value
      variables[key] = value
      // export the value
      if (expr) {
        core.info(`Exporting environment variables ${name}`);
        core.exportVariable(name, value);
      }
    }

    for (const name in dotexp.parsed) {
      const value = dotexp.parsed[name];
      // mask the value
      if (mask) {
        core.info(`Masking environment variables ${name}`);
        core.setSecret(value);
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
