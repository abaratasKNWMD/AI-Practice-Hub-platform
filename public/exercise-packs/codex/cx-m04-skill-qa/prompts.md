# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Skill QA visual
- Contexto: Convertir un checklist de QA visual en una skill reusable para que Codex verifique pantallas antes de cerrar.
- Superficie: skills + browser verification
- Permisos: workspace-write
- Modelo recomendado: GPT-5.4
- Coste estimado: Medio: una implementacion y una verificacion visual

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

