# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Primer CLAUDE.md util
- Contexto: Partiendo de la plantilla, reduce el CLAUDE.md a una version de equipo que quepa en una pagina y evite instrucciones vagas.
- Superficie: CLAUDE.md
- Permisos: write project memory
- Modelo recomendado: Sonnet
- Coste estimado: bajo: un fichero y revision

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

