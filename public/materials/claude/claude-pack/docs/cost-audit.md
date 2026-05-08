# Claude cost audit

Use this sheet at the end of every advanced lab.

| Item | Value |
| --- | --- |
| Task | |
| Model | Sonnet / Opus / Haiku |
| Context source | CLAUDE.md / rules / files / MCP / pasted output |
| Tools used | |
| `/usage` snapshot | |
| `/context` snapshot | |
| Rework loops | |
| Could this be a skill? | yes / no |
| Could this be a subagent? | yes / no |
| Next reduction | |

## Rules of thumb

- Clear context between unrelated tasks.
- Prefer CLI tools over MCP when the MCP server adds too much context.
- Put repeated procedures in skills instead of re-prompting.
- Use Haiku for cheap subagent summaries, Sonnet for main coding, Opus for high-risk reasoning.

