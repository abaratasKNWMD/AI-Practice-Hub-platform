# Kit practico del Curso 1: Codex para desarrolladores

Este paquete convierte las slides en trabajo de aula. La idea es que el facilitador no tenga que improvisar prompts ni ejemplos: cada bloque tiene un archivo listo para abrir, copiar o adaptar.

## Como usarlo

1. Empieza por `prompts-codex.md` para mostrar el formato de encargo.
2. Usa `labs/lab-01-onboarding.md` para una practica segura sin ediciones.
3. Usa `labs/lab-02-bug-login.md` con `ejemplo-login/` para practicar repro, fix minimo y tests.
4. Usa `labs/lab-03-review.md` para convertir Codex en revisor tecnico.
5. Lleva las plantillas de `plantillas/` al repo real del equipo cuando un patron se repita.

## Archivos clave

- `prompts-codex.md`: prompts listos para onboarding, bugfix, review, coste y cierre.
- `plantillas/AGENTS.example.md`: base de AGENTS.md corta y operativa.
- `plantillas/tarea-codex.md`: brief reusable para pedir trabajo a Codex.
- `plantillas/revision-pr.md`: instrucciones de review que se pueden referenciar desde AGENTS.md.
- `plantillas/mcp-inventory.md`: ficha para decidir que conectores MCP merecen la pena.
- `plantillas/coste-sesion.csv`: registro simple para tomar conciencia de coste.
- `ejemplo-login/`: mini proyecto Node con un bug intencional y tests.

## Regla de oro

El material no esta pensado para demostrar que Codex "acierta siempre". Esta pensado para entrenar criterio: dar contexto, acotar permisos, pedir evidencia, revisar diffs y convertir aprendizajes repetidos en archivos duraderos.
