# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Selector de modelo y coste
- Contexto: Aprender a elegir modelo por riesgo, no por ego: rapido para tareas mecanicas, fuerte para arquitectura, multimodal para UI.
- Superficie: model picker + cost log
- Permisos: read-only
- Modelo recomendado: GPT-5.4 Mini, GPT-5.4, GPT-5.5
- Coste estimado: Variable: se compara barato, medio y premium

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

