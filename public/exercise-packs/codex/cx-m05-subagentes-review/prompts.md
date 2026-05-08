# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Subagentes para review paralela
- Contexto: Aprender a delegar trabajo no bloqueante: un agente explora tests, otro arquitectura, otro UX o seguridad.
- Superficie: subagentes Codex
- Permisos: read-only para exploradores
- Modelo recomendado: GPT-5.5 para coordinacion, GPT-5.4 para exploracion
- Coste estimado: Medio-alto: varias ramas de analisis

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

