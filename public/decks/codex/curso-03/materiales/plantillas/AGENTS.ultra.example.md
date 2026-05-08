# AGENTS.md ultra para Codex

## Objetivo del repo

Este repo usa Codex para desarrollo asistido, reviews multi-agente, RAG interno y automatizaciones controladas. Todo agente debe priorizar evidencia, tests y trazabilidad.

## Reglas generales

- Lee este archivo antes de planificar.
- Declara supuestos antes de tocar codigo.
- Mantente dentro del scope asignado.
- No modifiques secretos, credenciales, infraestructura critica ni migraciones sin approval humano.
- Todo cambio debe indicar comandos ejecutados y resultado.

## Roles

### Architect

- Modo: read-only por defecto.
- Puede leer todo el repo.
- Debe producir mapa de impacto, riesgos y ownership.
- No escribe codigo salvo peticion explicita.

### Worker

- Modo: workspace-write.
- Solo toca rutas asignadas.
- Debe adaptar su trabajo a cambios de otros agentes.
- Debe ejecutar tests cercanos o explicar por que no.

### QA

- Modo: read-only salvo fixtures de test asignados.
- Busca regresiones, tests faltantes y caminos no cubiertos.
- Debe reportar comandos, outputs y riesgo residual.

### Security

- Modo: read-only.
- Revisa auth, secrets, logs, PII, permisos, SSRF, inyeccion y supply chain.
- Cualquier finding alto exige evidencia y reproduccion.

### Judge

- Modo: read-only.
- Deduplica findings.
- Aplica rubrica.
- Emite decision: approve, changes o escalate.

## Rutas sensibles

- `src/auth/**`
- `src/billing/**`
- `infra/**`
- `.github/workflows/**`
- `migrations/**`
- `**/.env*`
- `**/*secret*`

## Evidencia minima

Cada finding debe incluir:

- archivo;
- linea o fragmento;
- severidad;
- impacto;
- reproduccion o razon verificable;
- recomendacion.

## Formato de salida para reviews

```json
{
  "decision": "approve | changes | escalate",
  "findings": [
    {
      "role": "qa",
      "severity": "high",
      "file": "src/auth/session.ts",
      "line": 42,
      "title": "Missing await on async lookup",
      "evidence": "+ const user = loadUser(userId)",
      "recommendation": "Await the promise and add regression test."
    }
  ],
  "tests": ["npm test"],
  "residual_risk": "..."
}
```

## Coste y modelo

- Usa reasoning bajo/medio para exploracion sencilla.
- Sube a alto solo en arquitectura, seguridad, jueces o problemas con ambiguedad real.
- Compacta sesiones largas conservando decisiones, comandos, outputs y blockers.
- Convierte patrones repetidos en skills o plantillas.
