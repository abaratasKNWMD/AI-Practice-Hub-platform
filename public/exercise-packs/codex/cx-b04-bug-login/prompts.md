# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Bug login con plan antes de patch
- Contexto: Resolver un bug acotado de login sin saltarse la disciplina: reproducir, aislar, proponer plan, editar y verificar.
- Superficie: CLI + tests
- Permisos: workspace-write
- Modelo recomendado: GPT-5.4
- Coste estimado: Medio-bajo: exploracion, patch y tests

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

