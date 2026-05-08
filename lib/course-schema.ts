// ═══════════════════════════════════════════════════════════════
// COURSESCRIPT ENGINE — Master Schema v1.0
// ═══════════════════════════════════════════════════════════════
// This is the single source of truth that:
//   1. The 3-agent pipeline uses to generate a course
//   2. The player uses to render it
//   3. OpenRouter LLMs read as the "contract" for output
// ═══════════════════════════════════════════════════════════════

import type { Scene } from './movie-script'

// ── Duration presets ──────────────────────────────────────────

export type DurationPreset = 5 | 10 | 15 | 20 | 30 | 60

export const DURATION_MS: Record<DurationPreset, number> = {
  5:  300_000,
  10: 600_000,
  15: 900_000,
  20: 1_200_000,
  30: 1_800_000,
  60: 3_600_000,
}

// Scene counts per duration (Analista uses this to plan)
export const SCENE_COUNT: Record<DurationPreset, number> = {
  5:  6,
  10: 10,
  15: 14,
  20: 18,
  30: 24,
  60: 48,
}

// ── Template definitions ──────────────────────────────────────

export type CourseTemplate = 'technical' | 'sales' | 'onboarding' | 'executive'

export interface TemplateDefinition {
  id: CourseTemplate
  label: string
  description: string
  // Ordered sequence of scene types the Director should follow
  // Repeated entries allowed — e.g. multiple 'concept' scenes
  sceneSequence: string[]
  // Suggested voice tone for subtitles
  voiceTone: 'pedagogical' | 'persuasive' | 'friendly' | 'authoritative'
  // Which scene types are preferred for this template
  preferredScenes: string[]
}

export const TEMPLATES: Record<CourseTemplate, TemplateDefinition> = {
  technical: {
    id: 'technical',
    label: 'Technical / AI',
    description: 'Para cursos de IA, arquitecturas, APIs y documentación técnica. Usa código, diagramas y comparativas.',
    sceneSequence: ['title', 'concept', 'linear', 'compare', 'coding', 'thinking', 'concept', 'coding', 'error', 'finale'],
    voiceTone: 'pedagogical',
    preferredScenes: ['concept', 'coding', 'compare', 'linear', 'thinking', 'error'],
  },
  sales: {
    id: 'sales',
    label: 'Sales / Demo',
    description: 'Para demos de producto, pitch comercial y casos de uso. Centra en el dolor, la solución y el CTA.',
    sceneSequence: ['title', 'concept', 'compare', 'linear', 'thinking', 'concept', 'preview', 'finale'],
    voiceTone: 'persuasive',
    preferredScenes: ['concept', 'compare', 'preview', 'linear', 'thinking'],
  },
  onboarding: {
    id: 'onboarding',
    label: 'Onboarding',
    description: 'Para incorporar usuarios o empleados. Guiado, paso a paso, con ejemplos prácticos y checklist.',
    sceneSequence: ['title', 'concept', 'linear', 'coding', 'linear', 'thinking', 'concept', 'linear', 'finale'],
    voiceTone: 'friendly',
    preferredScenes: ['linear', 'concept', 'coding', 'thinking'],
  },
  executive: {
    id: 'executive',
    label: 'Executive / C-Level',
    description: 'Para presentaciones de negocio, ROI y KPIs. Conciso, datos duros y conclusiones accionables.',
    sceneSequence: ['title', 'concept', 'compare', 'linear', 'thinking', 'compare', 'concept', 'finale'],
    voiceTone: 'authoritative',
    preferredScenes: ['concept', 'compare', 'linear', 'thinking'],
  },
}

// ── Scene type catalog (what the LLM can choose from) ─────────

// IMPORTANT: field names here MUST match exactly what the React scene components expect.
// The LLM reads these examples verbatim and generates content accordingly.
export const SCENE_TYPE_CATALOG = {
  title: {
    description: 'Opening screen with large title, subtitle and small tag label. Always the FIRST scene.',
    requiredFields: ['title', 'subtitle', 'tag'],
    example: { title: 'RAG explicado en 10 min', subtitle: 'De documentos a respuestas inteligentes', tag: 'AI / LLMs' },
  },
  concept: {
    description: 'A key concept with a tag label, title, body text (2-4 sentences), optional highlight callout, and key points list.',
    requiredFields: ['title', 'body', 'points'],
    example: { tag: 'Fundamentos', title: 'Embeddings', body: 'Los embeddings son representaciones vectoriales del significado semántico de un texto. Permiten comparar conceptos numéricamente.', highlight: 'Textos similares = vectores cercanos en el espacio', points: ['Cada token se mapea a un vector de alta dimensión', 'La distancia coseno mide similitud semántica', 'Son la base de la búsqueda semántica'] },
  },
  compare: {
    description: 'Two approaches side by side. Each side has a label, color (accent or destructive), steps with icon+text, and a total summary.',
    requiredFields: ['tag', 'left', 'right'],
    example: {
      tag: 'Comparativa',
      left: { label: 'Sin RAG', color: 'destructive', steps: [{ icon: 'AlertTriangle', text: 'El LLM no conoce tu documentación' }, { icon: 'AlertTriangle', text: 'Respuestas desactualizadas' }], total: 'Alucinaciones frecuentes' },
      right: { label: 'Con RAG', color: 'accent', steps: [{ icon: 'Check', text: 'Recupera contexto relevante en tiempo real' }, { icon: 'Check', text: 'Respuestas fundamentadas en tus datos' }], total: 'Precisión verificable' },
    },
  },
  linear: {
    description: 'Shows a Linear-style ticket/task card. Use for showing a real specification, requirement or task breakdown.',
    requiredFields: ['ticketId', 'title', 'project', 'priority', 'assignee', 'status', 'labels', 'description'],
    example: { ticketId: 'AI-042', title: 'Implementar pipeline de RAG con LlamaIndex', project: 'AI Platform', priority: 'High', assignee: 'Equipo AI', status: 'In Progress', labels: ['RAG', 'LlamaIndex', 'Backend'], description: 'Crear un pipeline de Retrieval Augmented Generation que:\n1. Ingiera documentos PDF y Markdown\n2. Genere embeddings con text-embedding-3-small\n3. Almacene en Pinecone con metadatos\n4. Responda consultas con referencias exactas' },
  },
  thinking: {
    description: 'Animated list of thoughts/steps that appear one by one, simulating AI reasoning or a planning process.',
    requiredFields: ['tag', 'title', 'thoughts'],
    example: { tag: 'Razonamiento', title: 'Planificando la arquitectura RAG...', thoughts: [{ ms: 0, text: 'Analizar requisitos del sistema', done: true }, { ms: 4000, text: 'Seleccionar vector database: Pinecone vs Weaviate', done: true }, { ms: 9000, text: 'Definir estrategia de chunking', done: false }, { ms: 15000, text: 'Diseñar API de consulta', done: false }] },
  },
  coding: {
    description: 'Code block with syntax highlighting. Shows filename, language and the actual code. Use for implementation examples.',
    requiredFields: ['filename', 'language', 'code'],
    example: { filename: 'rag_pipeline.py', language: 'python', code: 'from llama_index import VectorStoreIndex, SimpleDirectoryReader\n\n# Load and index documents\ndocuments = SimpleDirectoryReader("./docs").load_data()\nindex = VectorStoreIndex.from_documents(documents)\n\n# Query with RAG\nquery_engine = index.as_query_engine()\nresponse = query_engine.query("¿Cómo funciona el chunking?")' },
  },
  preview: {
    description: 'Shows a preview of a generated UI, dashboard or output result. Use for demos.',
    requiredFields: ['title', 'description', 'items'],
    example: { title: 'Dashboard RAG generado', description: 'Interfaz de consulta construida con v0 en 30 segundos', items: [{ label: 'Documentos indexados', value: '1,247' }, { label: 'Consultas/día', value: '8,432' }, { label: 'Precisión media', value: '94.2%' }] },
  },
  error: {
    description: 'Shows a Sentry-style error alert with stack trace, a Linear fix ticket, and the code fix. Use for debugging or pitfall scenarios.',
    requiredFields: ['tag', 'sentry', 'linearFix', 'fix'],
    example: {
      tag: 'Error en producción',
      sentry: { id: 'SENTRY-1042', title: "TypeError: Cannot read properties of undefined (reading 'length')", file: 'lib/rag-pipeline.ts', line: 87, occurrences: 1243, users: 58, first: 'hace 2 horas', trace: ["TypeError: Cannot read properties of undefined (reading 'length')", '  at chunkDocument (lib/rag-pipeline.ts:87)', '  at processUpload (app/api/ingest/route.ts:34)'], context: "const chunks = document.content.split('\\n')  // ← document puede ser undefined" },
      linearFix: { ticketId: 'AI-089', title: 'Fix: validar documento antes de chunking', description: 'Añadir guard clause en chunkDocument():\n- Verificar que document no es undefined\n- Verificar que document.content existe\n- Retornar array vacío si no hay contenido' },
      fix: '// Antes — crash si document es undefined\nconst chunks = document.content.split(\'\\n\')\n\n// Después — defensivo y seguro\nif (!document?.content) return []\nconst chunks = document.content.split(\'\\n\')',
    },
  },
  finale: {
    description: 'Closing screen. Uses a grid of summary cards (each with number, label, body) and a CTA. Always the LAST scene.',
    requiredFields: ['title', 'summary', 'cta'],
    example: {
      title: 'Lo que aprendiste hoy',
      summary: [
        { number: '01', label: 'RAG conecta LLMs con tus datos', body: 'El modelo no necesita reentrenamiento para conocer tu documentación.' },
        { number: '02', label: 'Embeddings = búsqueda semántica', body: 'Encuentra el contexto más relevante aunque no uses las palabras exactas.' },
        { number: '03', label: 'LlamaIndex abstrae la complejidad', body: 'Ingesta, chunking, indexado y consulta en menos de 20 líneas.' },
      ],
      cta: 'Empieza con LlamaIndex en 5 minutos — docs.llamaindex.ai',
    },
  },
  prompt: {
    description: 'Operational screen that types a prompt with objective, context, constraints and done criteria.',
    requiredFields: ['mode', 'title', 'prompt'],
    example: { mode: 'prompt', title: 'Prompt de rescate', prompt: 'No edites mas codigo. Explica causa probable, evidencia y siguiente experimento minimo.' },
  },
  streaming: {
    description: 'Simulated assistant response with progressive chunks. Use to show what the learner should expect.',
    requiredFields: ['mode', 'title', 'response'],
    example: { mode: 'streaming', title: 'Respuesta simulada', response: ['Analizo rutas relevantes.', 'Propongo plan de 3 pasos.', 'Cierro con evidencia.'] },
  },
  diff: {
    description: 'Diff viewer for before/after changes. Use for patches and review moments.',
    requiredFields: ['mode', 'title', 'diff'],
    example: { mode: 'diff', title: 'Diff minimo', diff: ['- cambio amplio', '+ cambio acotado con test'] },
  },
  terminal: {
    description: 'Terminal output for commands, tests, lint, build or CI feedback.',
    requiredFields: ['mode', 'title', 'terminal'],
    example: { mode: 'terminal', title: 'Tests', terminal: ['$ pnpm test', '✓ 12 passing'] },
  },
  'pr-review': {
    description: 'Pull request review screen with structured findings, severities and recommendations.',
    requiredFields: ['mode', 'title', 'review'],
    example: { mode: 'pr-review', title: 'Review', review: [{ severity: 'medium', text: 'Falta prueba de regresion.' }] },
  },
  cost: {
    description: 'Cost/token/model meter. Use before or after expensive agentic work.',
    requiredFields: ['mode', 'title', 'cost'],
    example: { mode: 'cost', title: 'Cost ledger', cost: { model: 'modelo estandar', tokens: 'medio', permission: 'readonly', stopRule: 'parar sin evidencia nueva' } },
  },
  decision: {
    description: 'Human decision overlay. Use when the learner must choose continue, stop, ask for context or escalate model.',
    requiredFields: ['mode', 'title', 'decision'],
    example: { mode: 'decision', title: 'Decision', decision: { question: 'Seguimos?', options: ['seguir', 'pedir contexto'], selected: 0 } },
  },
  pause: {
    description: 'Instructor pause screen with cue for facilitation.',
    requiredFields: ['mode', 'title', 'presenterCue'],
    example: { mode: 'pause', title: 'Pausa', presenterCue: 'Pedir al alumno que nombre evidencia y coste.' },
  },
  quiz: {
    description: 'Checkpoint quiz screen.',
    requiredFields: ['mode', 'title', 'quiz'],
    example: { mode: 'quiz', title: 'Checkpoint', quiz: { question: 'Que cierra la tarea?', answers: ['opinion', 'diff probado'], correct: 1 } },
  },
  branch: {
    description: 'Branch timeline screen for issue to PR flows.',
    requiredFields: ['mode', 'title', 'branch'],
    example: { mode: 'branch', title: 'Timeline', branch: { steps: ['Issue', 'Branch', 'Plan', 'Patch', 'PR'], active: 2 } },
  },
  risk: {
    description: 'Risk and permissions register.',
    requiredFields: ['mode', 'title', 'risk'],
    example: { mode: 'risk', title: 'Riesgos', risk: { items: ['Permisos', 'Coste', 'Calidad'], level: 'medio' } },
  },
} as const

// ── Full CourseJSON (output of the 3-agent pipeline) ──────────

export interface CourseChapter {
  id: string
  label: string
  startMs: number
}

export interface CourseJSON {
  id: string
  title: string
  description: string
  template: CourseTemplate
  durationPreset: DurationPreset
  durationMs: number
  voice: string
  author: string
  createdAt: string
  chapters: CourseChapter[]
  scenes: Scene[]
}

// ── Agent pipeline metadata (for streaming UI) ────────────────

export type AgentStage = 'analyst' | 'director' | 'writer' | 'done' | 'error'

export interface AgentStatus {
  stage: AgentStage
  message: string
  progress: number // 0-100
  detail?: string
}
