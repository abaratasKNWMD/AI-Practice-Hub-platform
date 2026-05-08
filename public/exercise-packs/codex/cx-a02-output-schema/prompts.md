# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Salida estructurada para agentes
- Contexto: Evitar respuestas bonitas pero inutiles obligando a Codex a devolver findings, severidad, evidencia y acciones en un schema estable.
- Superficie: JSON schema + evals
- Permisos: read-only
- Modelo recomendado: GPT-5.4
- Coste estimado: Medio: varias validaciones de salida

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

