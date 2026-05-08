# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Ask, Edit y Agent: tres velocidades
- Contexto: Aprender a elegir Ask para entender, Edit para cambios acotados y Agent para tareas multiarchivo.
- Superficie: Copilot Chat VS Code
- Permisos: read-only -> workspace-write
- Modelo recomendado: Modelo incluido para Ask/Edit; escalar solo si hay ambiguedad
- Coste estimado: Bajo/medio segun modo y modelo

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

