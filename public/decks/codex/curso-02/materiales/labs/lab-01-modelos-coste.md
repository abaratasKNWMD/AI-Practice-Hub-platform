# Lab 01: modelo, reasoning y coste antes de actuar

## Objetivo

Que el asistente aprenda a decidir modelo, reasoning, herramientas y permisos antes de pedir un cambio.

## Material

- `../plantillas/decision-modelo.md`
- `../prompts-potentes.md`
- `../ejemplos/session-cost-audit/`

## Ejercicio

1. El facilitador propone tres tareas:
   - leer un repo y resumirlo;
   - arreglar un bug ambiguo;
   - revisar una PR de seguridad.
2. Cada grupo rellena la matriz.
3. Se compara la decisión: modelo, reasoning, sandbox, tools y coste.
4. Se ejecuta `node audit-cost.mjs sessions/sample-session.json` en el ejemplo de auditoría.

## Cierre

La pregunta importante no es "cuál es el mejor modelo", sino "cuánta inteligencia, contexto y autonomía justifica esta tarea".
