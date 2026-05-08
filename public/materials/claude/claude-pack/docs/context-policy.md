# Context policy

Claude Code is powerful because it can read and act, but every feature has context cost.

## Default policy

- Start with repository map and target files only.
- Do not paste large logs; save them to a file and ask Claude to inspect the relevant part.
- Run `/context` before enabling more MCP servers.
- Use path-scoped rules for package-specific instructions.
- Use skills for repeatable procedures.
- Use subagents when separation of context is useful.

## Anti-patterns

- One giant `CLAUDE.md` that contains every process.
- Always-on MCP servers with broad tool lists.
- Asking the main thread to do research, implementation and QA in the same context when agents could split the work.

