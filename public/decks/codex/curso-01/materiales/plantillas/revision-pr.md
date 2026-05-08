# Rubrica de review para Codex

Usar esta guia cuando se pida `/review` o una revision manual de diff.

## Prioridades

1. Correctness: bugs, edge cases, estados imposibles, errores de concurrencia.
2. Seguridad: secretos, permisos, inyeccion, auth, PII, dependencias.
3. Tests: casos relevantes no cubiertos o tests que no prueban el bug real.
4. Regresiones: cambios de contrato, compatibilidad, performance o migraciones.
5. Mantenibilidad: complejidad que dificulta operar el sistema.

## Formato de salida

```text
Hallazgos:
- [Severidad] archivo:linea - problema concreto, impacto y evidencia.

Preguntas abiertas:
- ...

Decision:
- approve | changes requested | needs manual check
```

## Reglas

- No mezclar preferencias de estilo con bugs.
- No pedir refactors fuera del alcance.
- Si falta contexto, preguntarlo.
- Si un hallazgo no tiene evidencia, marcarlo como sospecha y no bloquear.
