# Security rules

Apply when a change touches auth, permissions, data access, CI, hooks or external tools.

- Treat MCP servers and shell commands as capability expansion.
- Prefer read-only access for discovery and review tasks.
- Deny writes outside the repo unless explicitly requested.
- Review dependency changes and generated files.
- Block obvious secrets before they reach the transcript.

