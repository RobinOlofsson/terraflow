const core = require('@actions/core')
const github = require('@actions/github')
// const { wait } = require('./wait')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    if (github.context.eventName === 'pull_request') {
      core.info('something is happening in a pull request!')
      return
    }

    if (
      github.context.eventName === 'push' &&
      github.context.payload.ref === 'refs/heads/main'
    ) {
      core.info('merge to main!')
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
