# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: GitHub Action con Codex reviewer
- Contexto: Disenar una action que revise PRs con contexto, limite de coste y salida estructurada.
- Superficie: GitHub Actions + Codex
- Permisos: CI read-only + comment
- Modelo recomendado: GPT-5.4
- Coste estimado: Medio-alto: ejecucion por PR

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

