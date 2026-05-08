---
description: Summarize current repository changes, flag risks, and propose a commit message. Use when the user asks what changed, wants a review before commit, or needs a handoff summary.
---

## Current changes

!`git diff --stat`

!`git diff --name-only`

## Instructions

Return:

1. A short human summary.
2. Main files touched.
3. Risks or missing checks.
4. Suggested commit message.

Use `references/review-rubric.md` when the change includes business logic, security, tests or UI.

