# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Debug multimodal de UI
- Contexto: Usar captura visual como evidencia para que Codex arregle un fallo de interfaz sin perseguir sintomas equivocados.
- Superficie: imagen + browser + codigo
- Permisos: workspace-write
- Modelo recomendado: GPT-5.5 multimodal
- Coste estimado: Medio: imagen, contexto UI y patch

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

