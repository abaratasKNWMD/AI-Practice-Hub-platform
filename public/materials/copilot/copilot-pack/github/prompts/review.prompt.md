---
description: "Review current changes with actionable findings"
mode: "ask"
tools: ["read", "search"]
---

Review the current diff.

Prioritize:
1. Correctness bugs.
2. Security or data exposure.
3. Missing tests for changed behavior.
4. Performance or accessibility regressions.

Return findings first, ordered by severity.
Include file paths, line references when possible, and one concrete fix suggestion.
