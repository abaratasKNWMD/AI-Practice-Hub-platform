# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: LLM-as-a-Judge y evals
- Contexto: Construir una suite de evaluacion donde un modelo juez puntua codigo, respuesta y evidencias de otro agente.
- Superficie: eval harness + rubrics
- Permisos: read-only
- Modelo recomendado: GPT-5.5 juez, GPT-5.4 candidato
- Coste estimado: Alto si no se muestrea; medio con suite corta

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

