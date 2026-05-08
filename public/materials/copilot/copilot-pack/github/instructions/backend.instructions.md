---
applyTo: "app/api/**/*.{ts,js},lib/**/*.{ts,js},server/**/*.{ts,js}"
description: "Backend conventions for Copilot exercises"
---

# Backend instructions

- Keep API contracts explicit.
- Validate inputs at boundaries.
- Return actionable errors without leaking secrets.
- Prefer existing helpers and schemas.
- Add or update focused tests when behavior changes.
- Explain migration or compatibility risk before changing shared contracts.
