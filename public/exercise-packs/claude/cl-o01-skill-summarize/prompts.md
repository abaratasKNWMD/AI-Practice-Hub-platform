# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Primera skill: summarize-changes
- Contexto: Transforma un prompt repetido de resumen de cambios en una skill versionada.
- Superficie: .claude/skills
- Permisos: write skill
- Modelo recomendado: Sonnet
- Coste estimado: medio: diseño + prueba

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

