---
description: "Refactor a service without behavior drift"
mode: "agent"
tools: ["read", "search", "edit", "execute"]
---

Refactor the selected service with minimum behavior change.

Constraints:
- Preserve public API.
- Keep commits/diff reviewable.
- Add tests only where behavior is currently unprotected.
- Stop and ask if the refactor crosses module boundaries unexpectedly.

Close with before/after structure and verification.
