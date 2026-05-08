# MCP Inventory for Copilot

| MCP | Mode | Owner | Data touched | Allowed use | Forbidden use |
|---|---|---|---|---|---|
| GitHub | read-only first | Platform | issues, PRs, repo metadata | understand work items | write to production repos without approval |
| Docs mock | read-only | Training | internal docs sample | answer architecture questions | expose confidential docs |
| Postgres mock | read-only | Training | sample DB | SQL practice | connect to real production DB |
| Browser/local | controlled | Training | localhost | UI verification | external browsing without need |

Default for workshops: read-only. Escalate only with owner, reason and expiry.
