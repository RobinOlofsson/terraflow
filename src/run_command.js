const exec = require('@actions/exec')
const core = require('@actions/core')

export const run_command = async (action, options) => {
  if (!process.env.TOFU_CLI_PATH) {
    throw new Error('TOFU_CLI_PATH is not set')
  }

  if (!['init', 'plan', 'apply'].includes(action)) {
    throw new Error(`Unknown action: ${action}`)
  }

  const exitCode = await exec.exec('tofu', [action], options)
  if (exitCode !== 0) {
    throw new Error(`Failed to run ${action}`)
  }
}
