# Dataset card

## Nombre

`codex-onboarding-synthetic-v1`

## Objetivo

Entrenar o evaluar asistentes internos que explican arquitectura del repo con evidencia verificable.

## Fuentes permitidas

- Codigo fuente versionado.
- Documentacion interna aprobada.
- ADRs.
- Tests.
- Runbooks.

## Fuentes prohibidas

- Secretos.
- Tokens.
- Datos personales.
- Logs con PII.
- Conversaciones privadas.
- Incidentes no anonimizados.

## Campos obligatorios

- `id`
- `question`
- `answer`
- `evidence[]`
- `difficulty`
- `domain`
- `owner`
- `expires_at`
- `needs_human_source`

## Reglas de calidad

- Cada respuesta debe citar al menos una ruta real.
- Si la respuesta depende de conocimiento tribal, marcar `needs_human_source: true`.
- Cada ejemplo debe poder convertirse en eval.
- Versionar prompts de generacion y filtros de limpieza.

## Uso recomendado

1. Generar dataset pequeno.
2. Revisar manualmente una muestra.
3. Crear eval baseline.
4. Solo despues decidir si RAG, SFT, DPO o RFT tiene sentido.
