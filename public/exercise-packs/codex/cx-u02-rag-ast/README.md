# Enterprise RAG con AST

Vendor: codex
Curso: Codex Ultra
Duracion: 90 min
Superficie: AST parsers + embeddings
Modelo recomendado: GPT-5.5 para diseno, embeddings para indice
Permisos: read-only sobre codigo fuente
Coste estimado: Alto inicial, bajo por consulta si se cachea

## Objetivo

Disenar un indice de codigo que no corte texto a ciegas, sino por unidades semanticas: funciones, clases, rutas y exports.

## Tareas

1. Elegir estrategia de chunking por lenguaje.
2. Definir metadatos por chunk.
3. Crear consultas de prueba.
4. Evaluar si el contexto recuperado permite responder con evidencia.

## Evidencia esperada

- Prompt inicial usado.
- Resultado o diff producido.
- Validacion ejecutada o bloqueo documentado.
- Coste/modelo/permisos registrados.
- Nota final para tutoria si queda duda.

## Archivos del pack

- `prompts.md`
- `rescue-prompts.md`
- `solution-guide.md`
- `expected.diff`
- `rubric.md`
- `self-assessment.md`
- `instructor-mode.md`
- `validator.mjs`
- `mock-data/input.json`
- `pr-simulated/PR.md`
- `starter/README.md`

