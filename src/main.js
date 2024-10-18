const core = require('@actions/core')
const github = require('@actions/github')
const { run_command } = require('./run_command')
const { process_plan_output } = require('./parse_output')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    if (github.context.eventName === 'pull_request') {
      core.info('something is happening in a pull request!')

      await run_command('init', {})

      run_command('plan', {
        listeners: {
          stdout: process_plan_output,
          stderr: process_plan_output
        },
        ignoreReturnCode: true
      })

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
