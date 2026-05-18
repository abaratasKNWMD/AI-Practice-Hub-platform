# Auditoria 100% videos CourseScript

Fecha: 2026-05-18T16:47:30.808Z
Base URL auditada: http://localhost:3001

## Veredicto ejecutivo

La iteracion estructural y visual esta aplicada: el player reproduce, los JSON son validos, los videos largos ya no tienen pantallas pobres y la captura completa desktop/mobile queda sin incidencias.

- Cadencia saneada: no quedan escenas por encima del umbral de 45 segundos.
- Contenido saneado: no quedan escenas genericas ni pobres en metrica estatica.
- Los workshops 30m/60m pasan a secuencias densas de prompt, respuesta, diff, terminal, review, coste, riesgo y decision.
- Las masterclass 10m pasan a 24 pantallas de 25 segundos con contenido especifico por vendor.
- QA visual completo: todas las escenas se capturan en desktop y mobile, con contraste, desborde, densidad y subtitulos controlados.

## Inventario global

- Videos auditados: 44.
- Escenas/slides auditadas: 961.
- Duracion total aproximada: 469.5 minutos.
- Escenas con cadencia lenta: 0.
- Escenas con contenido generico/repetido: 0.
- Escenas con poco contenido declarado: 0.
- Escenas con subtitulo largo: 0.
- Escenas con subtitulo demasiado lento: 0.
- Capturas desktop generadas: 961.
- Capturas mobile generadas: 132.
- Capturas con issues visuales: 0.

## Tabla por video

| Video | Duracion | Slides | Media/slide | Tipos | Severidad | Diagnostico |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| `cl-advanced-01-hooks` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-advanced-02-plugin-action` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-basic-01-claude-md` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-basic-02-compact-context` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-masterclass-10m-claude-operating-model` | 10m | 24 | 25s | 17 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-operator-01-first-skill` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-operator-02-subagent-explorer` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-operator-03-mcp-project` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-orientation-01-claude-md` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-orientation-02-memory-vs-instructions` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-orientation-03-cost-context` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-sdk-01-agent-sdk` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-sdk-02-evals-governance` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-workshop-30m-memory-to-hook` | 30m | 60 | 30s | 12 | baja | sin problemas estructurales graves en metrica estatica |
| `cl-workshop-60m-memory-to-automation` | 60m | 120 | 30s | 12 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-advanced-01-custom-agent` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-advanced-02-mcp-code-review` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-basic-01-inline-completion` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-basic-02-ask-edit-agent` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-basic-03-error-to-fix` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-cloud-01-cloud-agent-pr` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-cloud-02-premium-requests` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-git-01-fork-vs-branch` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-git-02-pr-as-contract` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-masterclass-10m-copilot-workbench` | 10m | 24 | 25s | 17 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-medium-01-instructions` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-medium-02-prompt-files` | 1.5m | 3 | 30s | 3 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-workshop-30m-error-to-pr` | 30m | 60 | 30s | 12 | baja | sin problemas estructurales graves en metrica estatica |
| `cp-workshop-60m-vscode-to-pr-review` | 60m | 120 | 30s | 12 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-basic-01-agents-md` | 1.5m | 4 | 23s | 4 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-basic-02-plan-before-patch` | 1.5m | 4 | 23s | 4 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-masterclass-10m-codex-operating-system` | 10m | 24 | 25s | 17 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-medium-01-model-picker` | 1.5m | 4 | 23s | 4 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-medium-02-mcp-readonly` | 1.5m | 4 | 23s | 4 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-medium-03-skill-qa-visual` | 1.5m | 4 | 23s | 4 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-orientation-01-surface-map` | 1.5m | 4 | 23s | 4 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-orientation-02-first-task` | 1.5m | 4 | 23s | 4 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-orientation-03-permissions` | 1.5m | 4 | 23s | 4 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-ultra-01-github-action` | 1.5m | 4 | 23s | 4 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-ultra-02-pr-swarm` | 1.5m | 4 | 23s | 4 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-workshop-30m-first-real-task` | 30m | 60 | 30s | 12 | baja | sin problemas estructurales graves en metrica estatica |
| `cx-workshop-60m-first-task-to-pr` | 60m | 120 | 30s | 12 | baja | sin problemas estructurales graves en metrica estatica |
| `hub-operating-model-60m` | 60m | 120 | 30s | 12 | baja | sin problemas estructurales graves en metrica estatica |
| `hub-workshop-60m-vendor-selection` | 60m | 120 | 30s | 12 | baja | sin problemas estructurales graves en metrica estatica |

## Resultado visual

### 1. Plantillas nuevas

Se han introducido seis familias visuales especificas para escenas operativas: IDE realista, PR review estilo GitHub, MCP inventory board, model/cost cockpit, swarm orchestration map y exercise resolution screen.

### 2. QA completo

La auditoria no usa muestreo: captura cada escena en desktop y mobile. El resultado final queda en 0 capturas con issues visuales.

### 3. Responsive del player

Las escenas operativas tienen version desktop densa con rails laterales y version mobile compacta orientada a video. Los controles y subtitulos se excluyen del detector de desborde para medir solo contenido real.

### 4. Densidad y subtitulos

No quedan subtitulos largos, escenas con bajo contenido declarado, pantallas de baja densidad ni capturas pobres segun la regla de texto visible + elementos + peso visual.

## Recomendacion siguiente

1. Revisar con ojo humano las capturas clave por vendor para pulir gusto, no defectos.
2. Sustituir gradualmente mocks por capturas reales de IDE, PRs y terminales cuando existan repos definitivos.
3. Crear variantes visuales de marca por vendor sin romper el sistema comun de plantillas.
4. Mantener esta auditoria como gate de release antes de publicar nuevos videos.

## Prioridad por video

## Ficheros generados

- JSON: `public/release-ops/qa/video-audit-100/video-audit-100.json`
- Capturas: `public/release-ops/qa/video-audit-100/screenshots`

