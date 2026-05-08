# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Mapa de superficies Claude Code
- Contexto: Construye un mapa de que parte del trabajo pertenece a memoria, skills, subagentes, hooks, MCP, plugins y SDK.
- Superficie: Claude Code CLI
- Permisos: read-only
- Modelo recomendado: Sonnet
- Coste estimado: bajo: solo lectura y resumen

Devuelve:

1. Archivos o fuentes que revisarias.
2. Plan de 3 pasos.
3. Riesgos.
4. Criterio de terminado.

## Prompt 2 - Ejecucion acotada

Ejecuta solo el plan aprobado. No cambies comportamiento no relacionado. Cierra con:

- resumen del cambio
- evidencia
- checks ejecutados
- coste/modelo/permisos usados

