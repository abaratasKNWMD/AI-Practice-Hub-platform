# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Mapa express del repositorio
- Contexto: El alumno pide a Codex que entienda una base de codigo antes de tocar nada. El objetivo es salir con un mapa fiable de carpetas, puntos de entrada, tests y riesgos.
- Superficie: CLI + editor
- Permisos: read-only
- Modelo recomendado: GPT-5.4 Mini
- Coste estimado: Bajo: 1 exploracion corta, sin reintentos largos

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

