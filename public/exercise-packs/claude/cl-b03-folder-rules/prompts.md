# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Rules por carpeta
- Contexto: Divide reglas globales en instrucciones especificas para frontend, backend, tests y seguridad.
- Superficie: .claude/rules
- Permisos: write project rules
- Modelo recomendado: Sonnet
- Coste estimado: bajo-medio: edicion de 4 rules

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

