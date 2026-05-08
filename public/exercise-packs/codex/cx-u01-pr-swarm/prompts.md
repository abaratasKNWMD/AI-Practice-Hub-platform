# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: PR swarm con roles
- Contexto: Construir una revision de PR con roles: arquitecto, desarrollador, QA y orquestador. El foco es coordinacion, no teatralidad.
- Superficie: multi-agent orchestration
- Permisos: read-only para agentes, write solo coordinador
- Modelo recomendado: GPT-5.5
- Coste estimado: Alto: varios agentes y sintesis

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

