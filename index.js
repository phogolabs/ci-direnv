const core = require('@actions/core');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const path = core.getInput('path');
    const mask = core.getInput('mask-variables');

    const dotenv = require('dotenv').config({ path });
    const dotexp = require('dotenv-expand').expand(dotenv);
    const variables = {}

    core.info(`Exporting environment variables from ${path}`)
    core.setOutput('variables', variables);

    for (const name in dotexp.parsed) {
      const key = name.toLocaleLowerCase();
      const value = dotexp.parsed[name];

      core.info(`Exporting environment variables ${name}`);
      // export the value
      variables[key] = value
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
