# Fuentes oficiales usadas para este kit

Consultadas el 06/05/2026.

- Codex best practices: `https://developers.openai.com/codex/learn/best-practices`
- AGENTS.md: `https://developers.openai.com/codex/guides/agents-md`
- Config reference: `https://developers.openai.com/codex/config-reference#configtoml`
- MCP en Codex: `https://developers.openai.com/codex/mcp`
- Skills: `https://developers.openai.com/codex/skills`
- Subagents: `https://developers.openai.com/codex/concepts/subagents`
- Approvals and security: `https://developers.openai.com/codex/agent-approvals-security`
- Model guide: `https://developers.openai.com/api/docs/guides/latest-model.md`

## Resumen operativo

- `AGENTS.md` debe cargar contexto práctico: mapa del repo, comandos, convenciones, restricciones y qué significa done.
- `config.toml` gobierna modelo, reasoning, permisos, sandbox, MCP, skills, subagentes y perfiles.
- MCP conecta Codex con herramientas y contexto externos; se debe empezar con servidores read-only y allowlists de tools.
- Las skills empaquetan workflows específicos con instrucciones, recursos y scripts opcionales.
- Los subagentes ayudan a mover exploración, triage y pruebas fuera del hilo principal, pero consumen más tokens y necesitan ownership claro.
