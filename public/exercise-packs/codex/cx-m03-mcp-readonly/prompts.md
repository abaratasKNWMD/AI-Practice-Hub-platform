# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: MCP read-only con contexto externo
- Contexto: Conectar fuentes externas sin abrir puertas innecesarias. El alumno practica inventario, alcance y evidencias.
- Superficie: MCP + docs + repo
- Permisos: read-only con conectores
- Modelo recomendado: GPT-5.4
- Coste estimado: Medio: mas contexto recuperado, pocas ediciones

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

