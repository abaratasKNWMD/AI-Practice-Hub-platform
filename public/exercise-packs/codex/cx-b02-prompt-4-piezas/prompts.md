# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Prompt de cuatro piezas
- Contexto: Transformar una peticion vaga en un briefing accionable: objetivo, contexto, restricciones y criterio de aceptacion.
- Superficie: chat Codex
- Permisos: read-only
- Modelo recomendado: GPT-5.4 Mini
- Coste estimado: Muy bajo: una iteracion de prompt y una revision

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

