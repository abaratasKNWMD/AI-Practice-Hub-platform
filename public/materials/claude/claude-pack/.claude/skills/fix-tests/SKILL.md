---
description: Diagnose failing tests with a tight loop: reproduce, isolate, patch, rerun. Use when a command output shows failing tests or build errors.
---

## Procedure

1. Reproduce with the narrowest command.
2. Read the failing file and nearest production code.
3. Patch only the root cause.
4. Rerun the same command.
5. Summarize failure, fix and evidence.

If the project exposes no test command, use `scripts/run-tests.js` as a template for a local wrapper.

