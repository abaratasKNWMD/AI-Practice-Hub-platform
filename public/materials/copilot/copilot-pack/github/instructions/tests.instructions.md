---
applyTo: "**/*.{test,spec}.{ts,tsx,js,jsx},tests/**/*"
description: "Testing conventions for Copilot exercises"
---

# Test instructions

- Test behavior, not implementation details.
- Keep fixtures small and named for intent.
- Include the failing case before the fix when possible.
- Do not remove assertions to make tests pass.
- Prefer one clear regression test over broad snapshot churn.
