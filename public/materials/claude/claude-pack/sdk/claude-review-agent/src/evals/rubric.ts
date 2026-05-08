export const reviewRubric = `
Return JSON with:
- summary: one paragraph
- findings: array of {severity, file, issue, fix}
- tests: commands observed or missing
- cost: context/model observations
- verdict: approve | changes_requested | needs_human_review
`
