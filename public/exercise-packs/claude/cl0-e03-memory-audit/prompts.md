# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Auditoria memoria vs instrucciones
- Contexto: Dado un listado de reglas de equipo, decide que va a CLAUDE.md, rules, skills o memoria local.
- Superficie: Memory
- Permisos: read-only
- Modelo recomendado: Haiku
- Coste estimado: bajo: clasificacion

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

