# Prompts ultra para Codex

Usa estos prompts como material de clase. Estan escritos para usuarios que ya saben programar y quieren operar Codex como plataforma.

## 1. Disenar un swarm de PR

```text
Quiero disenar un PR swarm para este repo.

Objetivo:
- Revisar diffs con roles Architect, QA, Security y Judge.
- Generar findings con evidencia de archivo/linea.
- Publicar una decision: approve, changes o escalate.

Contexto:
- Lee AGENTS.md si existe.
- Identifica comandos de test y build.
- Detecta rutas sensibles: auth, billing, infra, secrets, migrations.

Restricciones:
- Primero trabaja read-only.
- No propongas frameworks hasta definir contratos.
- No auto-apruebes cambios sin tests verdes y riesgo bajo.

Entregable:
- Arquitectura del swarm.
- JSON schema de findings.
- Politica de gates humanos.
- Primer backlog de implementacion.
```

## 2. Crear agentes Codex de proyecto

```text
Crea una propuesta de `.codex/agents/` para este repo.

Necesito:
- `pr_explorer`: read-only, mapea rutas afectadas.
- `reviewer`: read-only, encuentra bugs, seguridad y tests faltantes.
- `docs_researcher`: read-only, verifica APIs en docs mediante MCP.
- `worker`: write limitado al scope asignado.

Para cada agente define:
- name
- description
- developer_instructions
- model/reasoning recomendado
- sandbox y permisos
- cuando usarlo y cuando no

No escribas archivos todavia. Primero devuelve el plan y riesgos.
```

## 3. Batch API para refactor nocturno

```text
Disena un pipeline Batch para preparar un refactor masivo.

Entrada:
- Lista de archivos candidatos.
- Regla de refactor.
- Tests asociados por modulo.

Salida:
- JSONL valido para `/v1/responses`.
- `custom_id` estable por archivo.
- Prompt con contrato de salida JSON.
- Validador local que rechace requests sin modelo unico o sin criterios de aceptacion.

Coste:
- Explica que partes se cachean.
- Senala que partes deben ejecutarse en pequeno antes de lanzar el batch completo.
```

## 4. Dataset sintetico con evidencia

```text
Genera un dataset sintetico para onboarding interno de este repo.

Reglas:
- Cada ejemplo debe citar rutas reales.
- Si no hay evidencia, marca `needs_human_source`.
- Incluye pares Q/A y conversaciones senior/junior.
- Etiqueta dificultad, dominio, owner y caducidad.
- No incluyas secretos, datos personales ni tokens.

Entregable:
- Esquema JSONL.
- 10 ejemplos iniciales.
- Checklist de limpieza.
- Eval minimo para medir respuestas de un asistente interno.
```

## 5. Enterprise RAG de codigo

```text
Disena un indice RAG de codigo para Codex.

No cortes texto cada N tokens. Propone chunking semantico:
- funcion
- clase
- endpoint
- test
- ADR
- configuracion

Para cada chunk define metadata:
- file, language, symbol, kind, range
- imports, exports, callers, tests
- owner, freshness, acl, risk
- embedding_text y display_text separados

Entregable:
- Schema del chunk.
- Pipeline de ingestion incremental.
- Busquedas que debe exponer MCP.
- Evals de recall y faithfulness.
```

## 6. Juez LLM con rubrica

```text
Actua como juez de outputs generados por agentes Codex.

Evalua:
- correctness: 0-4
- evidence: 0-4
- severity_calibration: 0-4
- no_speculation: pass/fail
- actionable: pass/fail

Devuelve JSON:
{
  "score": number,
  "decision": "approve" | "changes" | "escalate",
  "reason": "...",
  "missing_evidence": [],
  "human_review_required": boolean
}

Regla:
- Si no hay evidencia verificable, no puede haber approve.
```

## 7. Auditoria de coste ultra

```text
Audita este workflow Codex Ultra.

Quiero saber:
- que pasos necesitan GPT-5.5 high/xhigh y cuales pueden usar mini/low;
- que contexto debe convertirse en prompt cacheable;
- que partes deben ir a Batch;
- que datos se deben indexar con embeddings;
- que actividad debe quedar bloqueada por approval humano;
- que metricas necesito antes de escalar.

Devuelve:
- tabla por etapa;
- presupuesto cualitativo bajo/medio/alto;
- riesgos de coste invisible;
- cambios recomendados antes de produccion.
```

## 8. Capstone

```text
Construye un prototipo local de Codex Ultra.

Incluye:
- PR swarm local que revisa un diff fixture.
- Mini RAG de codigo con indice JSON.
- Juez que aplica rubrica.
- Reporte final para PR.
- Registro de coste cualitativo.

Restricciones:
- Debe ejecutarse sin claves externas.
- Debe tener tests.
- Debe dejar README de demo.
- No uses red salvo que lo justifiques.

Terminado cuando:
- `npm test` pasa.
- Existe output JSON.
- El README explica como conectar despues a OpenAI API, GitHub Actions y MCP.
```
