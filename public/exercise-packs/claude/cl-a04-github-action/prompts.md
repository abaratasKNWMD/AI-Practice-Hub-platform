# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Claude en GitHub Actions
- Contexto: Diseña una Action que invoque Claude para revisar PRs con permisos minimos.
- Superficie: GitHub Actions
- Permisos: CI read + PR comment
- Modelo recomendado: Sonnet
- Coste estimado: medio-alto: CI + tokens + reintentos

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

