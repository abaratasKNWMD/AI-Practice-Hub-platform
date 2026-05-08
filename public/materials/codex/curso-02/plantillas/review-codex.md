# Rúbrica de review avanzada con Codex

## Categorías

1. Correctness: bugs, invariantes rotas, edge cases.
2. Tests: faltan tests que fallen antes del fix o cubran regresión.
3. Seguridad: auth, secretos, PII, permisos, red, dependencias.
4. Operación: logs, métricas, migraciones, rollback, performance.
5. Mantenibilidad: complejidad accidental, APIs confusas, ownership.

## Salida esperada

```text
Hallazgos:
- [Severidad] archivo:linea - problema, impacto, evidencia y fix sugerido.

No bloqueante:
- ...

Preguntas:
- ...

Decisión:
- approve | changes requested | manual check

Coste/contexto:
- bajo | medio | alto, y motivo.
```

## Reglas

- No bloquees por estilo si no hay impacto.
- No pidas refactors fuera del alcance.
- Si varios agentes detectan lo mismo, deduplica.
- Si no puedes reproducir, di qué evidencia falta.
