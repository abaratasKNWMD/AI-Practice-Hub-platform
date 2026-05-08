# GitHub Copilot instructions

Target path: `.github/copilot-instructions.md`

## Stack

- Use the repository conventions already present.
- Prefer small, reviewable changes.
- Cite files and commands when explaining a change.

## Workflow

1. Read the relevant files before proposing code.
2. If the task touches more than one module, propose a short plan.
3. Keep the diff focused on the requested behavior.
4. Run the most relevant test, lint or build command.
5. If verification cannot run, explain the exact blocker.

## Security

- Never expose secrets, tokens or `.env` values.
- Do not add dependencies without explaining why.
- Do not weaken authentication, authorization or validation to make a test pass.

## Review style

- Prioritize correctness, security, accessibility, performance and maintainability.
- Avoid style-only comments unless they affect readability or team conventions.
- Respond in Spanish for training repositories.

## Done when

- Root cause or implementation intent is clear.
- The diff is small enough to review.
- Verification evidence is included.
