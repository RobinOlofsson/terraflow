const github = require('@actions/github')

export const process_plan_output = async output => {
  const cli_result = output.toString()
  const result_rows = cli_result.split('\n')

  const start = result_rows.indexOf(
    'OpenTofu will perform the following actions'
  )
  const stop = result_rows.indexOf('Plan:')

  const details = result_rows.slice(start, stop)

  const result_summary = cli_result
    .split('\n')
    .reverse()
    .find(line => /^(No changes|Error:|Apply|Plan:)/.test(line))

  await github.rest.issues.createComment({
    body: ```
    ${details.join('\n')}
    *Summary*
    ${result_summary}
    ```,
    issue_number: github.context.issue.number,
    owner: github.context.repo.owner,
    repo: github.context.repo.repo
  })
}
