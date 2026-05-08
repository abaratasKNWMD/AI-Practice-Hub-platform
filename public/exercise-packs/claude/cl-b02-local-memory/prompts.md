# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: CLAUDE.local.md sin contaminar el repo
- Contexto: Crea una memoria local ejemplo para preferencias personales y asegura que no se versiona.
- Superficie: Local memory
- Permisos: local-only
- Modelo recomendado: Haiku
- Coste estimado: bajo

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

