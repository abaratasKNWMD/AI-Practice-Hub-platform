---
name: pr-swarm-codex
description: Use when Codex needs to review a pull request or diff with multiple specialist roles, produce evidence-backed findings, and decide approve/changes/escalate.
---

# PR Swarm Codex

Use this skill for PR review workflows where a single pass is not enough and the review needs role separation.

## Workflow

1. Read `AGENTS.md` and the diff.
2. Build a scope map:
   - changed files;
   - sensitive paths;
   - tests touched or missing;
   - likely owners.
3. Run specialist passes:
   - Architect: boundaries, APIs, coupling, migrations.
   - QA: tests, regressions, reproduction.
   - Security: secrets, auth, PII, permissions, logs.
4. Deduplicate findings.
5. Apply decision gate:
   - high finding => `changes` or `escalate`;
   - medium finding => human review;
   - low/no finding + tests green => `approve` summary.
6. Return JSON plus a concise PR comment.

## Output schema

```json
{
  "decision": "approve | changes | escalate",
  "findings": [],
  "tests": [],
  "residual_risk": "",
  "human_review_required": true
}
```

## Rules

- Do not invent line numbers.
- No finding without evidence.
- Do not request changes for style-only comments.
- Separate confirmed bugs from risks.
- Mention commands actually executed.
