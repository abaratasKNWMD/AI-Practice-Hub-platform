# Fuentes oficiales Claude Code

Este fichero es el punto de revision para mantener vivo el curso Claude. Antes de actualizar ejercicios, revisar estas paginas:

- Claude Code features: https://code.claude.com/docs/en/features-overview
- Memory y `CLAUDE.md`: https://code.claude.com/docs/en/memory
- Skills: https://code.claude.com/docs/en/skills
- Subagents: https://code.claude.com/docs/en/subagents
- Hooks: https://code.claude.com/docs/en/hooks
- MCP: https://code.claude.com/docs/en/mcp
- Plugins: https://code.claude.com/docs/en/plugins
- Costes: https://code.claude.com/docs/en/costs
- Agent SDK: https://code.claude.com/docs/en/agent-sdk/overview
- Claude Code GitHub Actions: https://docs.claude.com/en/docs/claude-code/github-actions

## Lectura operativa

Claude Code se entiende mejor como una plataforma de extension:

- `CLAUDE.md` y `.claude/rules/` aportan memoria e instrucciones persistentes.
- `.claude/skills/*/SKILL.md` empaqueta procedimientos que Claude puede cargar bajo demanda.
- `.claude/agents/*.md` define subagentes con contexto y herramientas separadas.
- `.claude/settings.json` permite hooks y preferencias de proyecto.
- `.mcp.json` conecta herramientas y recursos externos.
- Plugins empaquetan skills, agents, hooks, MCP y settings para reutilizarlos por equipo.
- Agent SDK convierte el patron Claude Code en un agente programatico para CI, producto interno o evaluaciones.

