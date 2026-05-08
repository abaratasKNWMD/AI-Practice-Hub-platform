# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Review de diff con evidencia
- Contexto: Usar Codex como reviewer para detectar riesgos reales, no para opinar sobre estilo sin contexto.
- Superficie: git diff + chat Codex
- Permisos: read-only
- Modelo recomendado: GPT-5.4
- Coste estimado: Bajo: una revision enfocada

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

