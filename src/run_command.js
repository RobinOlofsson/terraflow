const exec = require('@actions/exec')
const core = require('@actions/core')

export const run_command = (action, options) => {
  const cli_tool = process.env.TOFU_CLI_PATH

  if (!cli_tool) {
    throw new Error('TOFU_CLI_PATH is not set')
  }

  if (!['init', 'plan', 'apply'].includes(action)) {
    throw new Error(`Unknown action: ${action}`)
  }

  const exitCode = exec.exec(cli_tool, [action], options)

  if (exitCode !== 0) {
    throw new Error(`Failed to run ${action}`)
  }
}
