# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Rama, commit y PR sin bloquear la tutoria
- Contexto: El alumno practica el minimo Git necesario para que Copilot no se convierta en una clase de ramas, forks y PRs.
- Superficie: GitHub + VS Code
- Permisos: local demo
- Modelo recomendado: Modelo incluido / Ask
- Coste estimado: Muy bajo: sin premium requests si se trabaja con docs y comandos

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

