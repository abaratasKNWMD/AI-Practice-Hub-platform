# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Harness de evaluacion
- Contexto: Diseña un mini conjunto de evaluacion para medir si el agente detecta bugs, gaps de test y riesgos.
- Superficie: Evals
- Permisos: local sdk
- Modelo recomendado: Haiku judge + Sonnet worker
- Coste estimado: medio-alto: dataset + judge

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

