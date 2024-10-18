const github = require('@actions/github')
const stripAnsi = require('strip-ansi')

export const process_plan_output = async output => {
  const cli_result = output.toString()
  const result_rows = cli_result.split('\n')

  const start = result_rows.findIndex(row =>
    /^OpenTofu will perform the following actions:/.test(row)
  )

  const stop = result_rows.findIndex(row => /^Plan:/.test(row))

  const details = result_rows.slice(start + 1, stop)

  const result_summary = result_rows.find(line =>
    /^(No changes|Error:|Apply|Plan:)/.test(line)
  )

  const token = process.env.GITHUB_TOKEN
  const octokit = github.getOctokit(token)

  await octokit.rest.issues.createComment({
    body: stripAnsi(cli_result),
    issue_number: github.context.payload.pull_request.number,
    owner: github.context.repo.owner,
    repo: github.context.repo.repo
  })
}
