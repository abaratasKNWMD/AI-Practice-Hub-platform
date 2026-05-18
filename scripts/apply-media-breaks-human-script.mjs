import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const coursesDir = path.join(publicDir, 'courses')
const videoAssetsDir = path.join(publicDir, 'video-assets', 'vendor-mockups')
const operationsDir = path.join(publicDir, 'content', 'operations')
const manifestPath = path.join(operationsDir, 'video-media-breaks-sprint-cd.json')

const imageExtensions = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp'])

const vendorCopy = {
  codex: {
    surface: 'Codex CLI y cloud task',
    situation: 'El equipo pide a Codex un cambio real dentro del repo.',
    tension: 'La velocidad invita a saltarse plan, permiso y coste.',
    action: 'Pedir plan corto, ejecutar minimo y cerrar con diff probado.',
    evidence: 'Diff pequeno, test verde y resumen de coste.',
    decision: 'Seguir solo si el patch explica que cambio y por que.',
    learns: 'Codex no es magia: es un flujo de plan, patch, test y evidencia.',
    does: 'Usa AGENTS.md, permiso minimo y test acotado.',
    decides: 'Si escala modelo, pide contexto o bloquea.',
  },
  copilot: {
    surface: 'VS Code, Copilot Chat y PR review',
    situation: 'El alumno elige entre Ask, Edit, Agent o PR review.',
    tension: 'Usar Agent para todo dispara ruido, coste y cambios laterales.',
    action: 'Elegir modo por riesgo y pedir evidencia antes de aceptar.',
    evidence: 'Patch local, test y comentario de PR.',
    decision: 'Aprobar solo si el cambio es revisable.',
    learns: 'Copilot rinde cuando se elige superficie, no solo prompt.',
    does: 'Conecta instrucciones, contexto y review.',
    decides: 'Cuando usar Ask, Edit, Agent o PR.',
  },
  claude: {
    surface: 'Claude Code, skills, hooks y MCP',
    situation: 'El equipo convierte criterio senior en skill reutilizable.',
    tension: 'Sin limites, el contexto crece y el agente pierde foco.',
    action: 'Separar memoria, skill, subagente, hook y permiso MCP.',
    evidence: 'Skill versionada, hook probado y owner claro.',
    decision: 'Automatizar solo si hay rollback y responsable.',
    learns: 'Claude escala cuando empaqueta criterio, no cuando acumula texto.',
    does: 'Define CLAUDE.md, skill y gate de seguridad.',
    decides: 'Que queda en memoria, que va a skill y que bloquea el hook.',
  },
  hub: {
    surface: 'AI Practice Hub',
    situation: 'La organizacion necesita formar sin repetir doce horas cada semana.',
    tension: 'Sin ruta, la demanda vuelve como dudas sueltas y soporte reactivo.',
    action: 'Llevar cada duda a video, ejercicio, rubrica y tutoria.',
    evidence: 'Progreso, entrega, revision y feedback.',
    decision: 'Convertir cada workshop en activo reutilizable.',
    learns: 'La plataforma reduce ruido cuando cada pieza deja evidencia.',
    does: 'Une curso, video, ejercicio y tutoria.',
    decides: 'Que se automatiza, que se ensena y que se lleva a instructor.',
  },
}

const utilityByType = {
  title: ['Ubica la promesa de aprendizaje.', 'Identifica ruta, coste y evidencia.', 'Decide si el bloque encaja con su rol.'],
  concept: ['Entiende el criterio operativo.', 'Traduce teoria a una regla aplicable.', 'Decide cuando usarlo y cuando no.'],
  compare: ['Distingue opciones y riesgos.', 'Elige una ruta con criterio.', 'Decide tradeoff de coste, control y velocidad.'],
  linear: ['Lee una tarea como contrato.', 'Extrae datos, limites y done criteria.', 'Decide si falta contexto.'],
  thinking: ['Observa una planificacion.', 'Separa supuesto, paso y evidencia.', 'Decide si el plan es suficiente.'],
  coding: ['Ve una implementacion minima.', 'Relaciona codigo con prueba.', 'Decide si el diff es aceptable.'],
  preview: ['Inspecciona resultado visible.', 'Compara salida contra criterio.', 'Decide si hay regresion visual.'],
  error: ['Aprende a convertir fallo en tarea.', 'Diagnostica causa y prueba minima.', 'Decide fix o escalado.'],
  finale: ['Recapitula lo esencial.', 'Convierte el bloque en siguiente accion.', 'Decide que practica repetir.'],
  prompt: ['Aprende a pedir trabajo verificable.', 'Escribe objetivo, contexto y limites.', 'Decide si el prompt tiene done criteria.'],
  streaming: ['Reconoce una buena respuesta de agente.', 'Busca evidencia y limites.', 'Decide si aceptar o repreguntar.'],
  diff: ['Lee cambios como evidencia.', 'Comprueba alcance y pruebas.', 'Decide si el patch es pequeno.'],
  terminal: ['Interpreta salida de herramientas.', 'Valida test, lint o build.', 'Decide si la tarea puede cerrarse.'],
  'pr-review': ['Revisa findings con severidad.', 'Pide pruebas y ownership.', 'Decide aprobar, pedir cambios o bloquear.'],
  cost: ['Controla modelo, tokens y permiso.', 'Registra coste antes de iterar.', 'Decide escalar o parar.'],
  decision: ['Practica decision humana.', 'Elige accion siguiente con evidencia.', 'Decide seguir, pedir contexto o tutoria.'],
  pause: ['Detiene la automatizacion con sentido.', 'Verbaliza evidencia y riesgo.', 'Decide que necesita el grupo.'],
  quiz: ['Comprueba aprendizaje.', 'Responde con criterio aplicado.', 'Decide si repetir el bloque.'],
  branch: ['Ve la ruta issue a PR.', 'Sigue handoffs y gates.', 'Decide donde controlar riesgo.'],
  risk: ['Identifica permisos y limites.', 'Clasifica riesgo por impacto.', 'Decide que se bloquea.'],
  'media-break': ['Recuerda una idea con imagen.', 'Conecta visual con accion real.', 'Decide como aplicarlo en su repo.'],
}

const screenshotAssets = [
  {
    file: 'codex-cli-cloud.svg',
    vendor: 'codex',
    title: 'Codex CLI con plan, patch y coste',
    subtitle: 'Cloud task -> branch -> diff -> test -> resumen',
    accent: '#22d3ee',
    panels: ['AGENTS.md', 'src/auth/login.ts', 'tests/login.spec.ts', 'cost-ledger.toml'],
    terminal: ['$ codex task "fix login"', 'plan: 3 pasos, permiso workspace-write', 'patch: 2 files changed', 'tests: PASS auth/login.spec.ts'],
  },
  {
    file: 'codex-cloud-pr.svg',
    vendor: 'codex',
    title: 'Codex cloud task revisable',
    subtitle: 'La tarea no acaba en respuesta: acaba en PR con evidencia',
    accent: '#a78bfa',
    panels: ['Task', 'Plan', 'Diff', 'PR'],
    terminal: ['model: strong', 'tokens: medio', 'risk: auth path', 'human signoff: required'],
  },
  {
    file: 'codex-mcp-cost.svg',
    vendor: 'codex',
    title: 'MCP readonly + medidor de coste',
    subtitle: 'Contexto perfecto no significa permiso infinito',
    accent: '#34d399',
    panels: ['repo.mcp', 'docs.mcp', 'issues.mcp', 'secrets blocked'],
    terminal: ['scope: read-only', 'budget: 18k tokens', 'stop: no evidence', 'owner: tech lead'],
  },
  {
    file: 'copilot-vscode-agent.svg',
    vendor: 'copilot',
    title: 'VS Code con Ask, Edit y Agent',
    subtitle: 'La decision buena es elegir superficie antes de escribir prompt',
    accent: '#60a5fa',
    panels: ['Ask', 'Edit', 'Agent', 'PR Review'],
    terminal: ['mode: Edit', 'files: cart/total.ts', 'tests: total.spec.ts', 'PR summary: evidence first'],
  },
  {
    file: 'copilot-pr-review.svg',
    vendor: 'copilot',
    title: 'PR review con findings accionables',
    subtitle: 'El comentario util tiene ruta, severidad y prueba',
    accent: '#f59e0b',
    panels: ['Files changed', 'Checks', 'Review', 'Merge gate'],
    terminal: ['finding: missing edge case', 'severity: medium', 'request: add test', 'status: changes requested'],
  },
  {
    file: 'copilot-context-router.svg',
    vendor: 'copilot',
    title: 'Router de contexto Copilot',
    subtitle: 'Instructions, prompt files y contexto local no son lo mismo',
    accent: '#10b981',
    panels: ['instructions.md', 'prompt file', 'workspace', 'terminal'],
    terminal: ['context: selected files', 'model: fast', 'permission: local', 'evidence: test output'],
  },
  {
    file: 'claude-skills-mcp.svg',
    vendor: 'claude',
    title: 'Claude skills + MCP inventory',
    subtitle: 'La skill empaqueta criterio; MCP limita alcance',
    accent: '#fb923c',
    panels: ['CLAUDE.md', 'SKILL.md', 'mcp.json', 'hook log'],
    terminal: ['skill: review', 'mcp: repo read-only', 'hook: pretool allowlist', 'owner: platform'],
  },
  {
    file: 'claude-hooks-ci.svg',
    vendor: 'claude',
    title: 'Hook antes de tocar herramientas',
    subtitle: 'El control deterministicamente aburrido salva la demo brillante',
    accent: '#f472b6',
    panels: ['PreToolUse', 'Policy', 'Block', 'Audit'],
    terminal: ['tool: Write', 'path: secrets.env', 'decision: BLOCK', 'reason: policy'],
  },
  {
    file: 'claude-subagent-board.svg',
    vendor: 'claude',
    title: 'Subagentes con frontera clara',
    subtitle: 'Explorar, implementar y revisar son trabajos distintos',
    accent: '#c084fc',
    panels: ['Explorer', 'Developer', 'QA', 'Orchestrator'],
    terminal: ['handoff: files + risk', 'scope: bounded', 'review: independent', 'signoff: human'],
  },
  {
    file: 'hub-learning-ops.svg',
    vendor: 'hub',
    title: 'Learning Ops de IA',
    subtitle: 'Curso, video, reto, tutoria y feedback en el mismo sistema',
    accent: '#38bdf8',
    panels: ['Course', 'Video', 'Exercise', 'Tutoria'],
    terminal: ['progress: tracked', 'doubt: triaged', 'feedback: captured', 'next sprint: planned'],
  },
]

function svgTemplate(asset) {
  const panelX = [68, 242, 416, 590]
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0b1020"/>
      <stop offset="1" stop-color="#020617"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000" flood-opacity=".42"/>
    </filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <circle cx="1120" cy="110" r="190" fill="${asset.accent}" opacity=".14"/>
  <rect x="52" y="54" width="1176" height="612" rx="22" fill="#0f172a" stroke="#ffffff" stroke-opacity=".12" filter="url(#shadow)"/>
  <rect x="52" y="54" width="1176" height="48" rx="22" fill="#111827"/>
  <circle cx="86" cy="78" r="7" fill="#fb7185"/><circle cx="112" cy="78" r="7" fill="#fbbf24"/><circle cx="138" cy="78" r="7" fill="#34d399"/>
  <text x="640" y="84" text-anchor="middle" fill="#94a3b8" font-family="Inter, Arial" font-size="18">${asset.vendor.toUpperCase()} / ${asset.title}</text>
  <text x="86" y="152" fill="#f8fafc" font-family="Inter, Arial" font-size="34" font-weight="700">${asset.title}</text>
  <text x="86" y="188" fill="#cbd5e1" font-family="Inter, Arial" font-size="20">${asset.subtitle}</text>
  ${asset.panels.map((panel, index) => `<g>
    <rect x="${panelX[index]}" y="232" width="148" height="108" rx="14" fill="${asset.accent}" opacity="${index === 0 ? '.22' : '.11'}" stroke="${asset.accent}" stroke-opacity=".55"/>
    <text x="${panelX[index] + 74}" y="292" text-anchor="middle" fill="#f8fafc" font-family="JetBrains Mono, Consolas, monospace" font-size="15" font-weight="700">${panel}</text>
  </g>`).join('')}
  <rect x="72" y="388" width="640" height="212" rx="16" fill="#020617" stroke="#ffffff" stroke-opacity=".12"/>
  ${asset.terminal.map((line, index) => `<text x="102" y="${432 + index * 38}" fill="${index === 0 ? asset.accent : '#d1d5db'}" font-family="JetBrains Mono, Consolas, monospace" font-size="20">${line.replace(/&/g, '&amp;')}</text>`).join('')}
  <rect x="770" y="236" width="390" height="364" rx="18" fill="#020617" stroke="${asset.accent}" stroke-opacity=".42"/>
  <text x="806" y="286" fill="#f8fafc" font-family="Inter, Arial" font-size="25" font-weight="700">Decision visible</text>
  <text x="806" y="334" fill="#cbd5e1" font-family="Inter, Arial" font-size="18">1. mirar contexto</text>
  <text x="806" y="374" fill="#cbd5e1" font-family="Inter, Arial" font-size="18">2. limitar permiso</text>
  <text x="806" y="414" fill="#cbd5e1" font-family="Inter, Arial" font-size="18">3. pedir evidencia</text>
  <text x="806" y="454" fill="#cbd5e1" font-family="Inter, Arial" font-size="18">4. firmar o bloquear</text>
  <rect x="806" y="504" width="292" height="48" rx="12" fill="${asset.accent}" opacity=".22"/>
  <text x="952" y="535" text-anchor="middle" fill="#f8fafc" font-family="Inter, Arial" font-size="18" font-weight="700">output revisable</text>
</svg>`
}

async function writeMockups() {
  await fs.mkdir(videoAssetsDir, { recursive: true })
  for (const asset of screenshotAssets) {
    await fs.writeFile(path.join(videoAssetsDir, asset.file), svgTemplate(asset), 'utf8')
  }
}

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => [])
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await listImages(full))
    } else if (imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

function toPublicUrl(filePath) {
  return `/${path.relative(publicDir, filePath).replaceAll('\\', '/')}`
}

function kindFromUrl(url, index) {
  const lower = url.toLowerCase()
  if (lower.includes('meme')) return 'meme'
  if (lower.includes('reflection') || lower.includes('reflex')) return 'reflection'
  if (lower.includes('screenshot') || lower.includes('mockup') || lower.includes('vendor-mockups')) return 'screenshot'
  if (lower.includes('diagram') || lower.includes('flow') || lower.includes('map') || lower.includes('mcp') || lower.includes('router') || lower.includes('gate') || lower.includes('pipeline') || lower.includes('matrix')) return 'diagram'
  return ['diagram', 'reflection', 'screenshot', 'meme'][index % 4]
}

async function assetsByVendor() {
  const result = {}
  for (const vendor of ['codex', 'copilot', 'claude']) {
    const deckFiles = await listImages(path.join(publicDir, 'decks', vendor))
    const filteredDeckFiles = deckFiles.filter(file => {
      const normalized = file.replaceAll('\\', '/').toLowerCase()
      return normalized.includes('/images/') || normalized.includes('/assets/')
    })
    const mockups = screenshotAssets
      .filter(asset => asset.vendor === vendor)
      .map(asset => path.join(videoAssetsDir, asset.file))
    result[vendor] = [...mockups, ...filteredDeckFiles]
      .map(toPublicUrl)
      .sort((a, b) => {
        const score = value => (value.includes('meme') ? 1 : 0) + (value.includes('reflection') ? 2 : 0) + (value.includes('diagram') ? 3 : 0) + (value.includes('vendor-mockups') ? 4 : 0)
        return score(b) - score(a)
      })
  }
  result.hub = screenshotAssets
    .filter(asset => asset.vendor === 'hub')
    .map(asset => `/video-assets/vendor-mockups/${asset.file}`)
  return result
}

function vendorFromId(id) {
  if (id.startsWith('cx-')) return 'codex'
  if (id.startsWith('cp-')) return 'copilot'
  if (id.startsWith('cl-')) return 'claude'
  return 'hub'
}

function targetForCourse(course, microBudget) {
  const minutes = (course.durationMs ?? 0) / 60000
  if (minutes >= 55) return 14
  if (minutes >= 29) return 8
  if (course.id.includes('masterclass')) return 4
  return microBudget.remaining > 0 ? 1 : 0
}

function selectIndices(course, target) {
  const sceneCount = course.scenes.length
  const chapterSceneIds = new Set((course.chapters ?? []).map(chapter => {
    const found = course.scenes.find(scene => scene.startMs === chapter.startMs)
    return found?.id
  }).filter(Boolean))
  const candidates = []
  for (let index = 1; index < sceneCount - 1; index += 1) {
    const scene = course.scenes[index]
    if (chapterSceneIds.has(scene.id)) continue
    if (['title', 'finale'].includes(scene.type)) continue
    candidates.push(index)
  }
  const selected = new Set()
  for (let step = 1; step <= target && selected.size < target && candidates.length; step += 1) {
    selected.add(candidates[Math.min(candidates.length - 1, Math.round((step * candidates.length) / (target + 1)))])
  }
  for (const index of candidates) {
    if (selected.size >= target) break
    selected.add(index)
  }
  return [...selected].sort((a, b) => a - b)
}

function artifactFromScene(scene) {
  const content = scene.content && typeof scene.content === 'object' ? scene.content : {}
  return content.title || content.actionLabel || content.label || scene.name || scene.type
}

function humanLine(vendor, scene, index, role) {
  const copy = vendorCopy[vendor]
  const artifact = String(artifactFromScene(scene)).replace(/\s+/g, ' ').slice(0, 44)
  const variants = {
    situation: [
      `Situacion: ${copy.surface} entra en una tarea real.`,
      `Situacion: el equipo necesita resolver "${artifact}".`,
      `Situacion: la demo se convierte en trabajo revisable.`,
    ],
    tension: [
      `Tension: sin evidencia, la IA solo parece productiva.`,
      `Tension: el contexto de mas tapa la decision importante.`,
      `Tension: aceptar rapido puede esconder coste y riesgo.`,
    ],
    example: [
      `Ejemplo: ${copy.evidence}`,
      `Ejemplo: mirar permiso, modelo y salida antes de seguir.`,
      `Ejemplo: convertir respuesta en artefacto de equipo.`,
    ],
    action: [
      `Accion: ${copy.action}`,
      `Accion: pedir salida pequena, verificable y con owner.`,
      `Accion: parar cuando no aparece evidencia nueva.`,
    ],
    evidence: [
      `Evidencia: ${copy.evidence}`,
      `Evidencia: test, diff, comentario o decision escrita.`,
      `Evidencia: el siguiente humano puede revisar sin preguntar.`,
    ],
    decision: [
      `Decision: ${copy.decision}`,
      `Decision: seguir, pedir contexto, escalar modelo o bloquear.`,
      `Decision: llevar a tutoria si no hay criterio compartido.`,
    ],
  }
  return variants[role][index % variants[role].length]
}

function replaceFactoryText(text, vendor, scene, index) {
  if (typeof text !== 'string') return text
  const replacements = [
    [/En AI Practice Hub, esta pantalla se aterriza en hub, workshops, metricas y tutorias\./g, humanLine('hub', scene, index, 'situation')],
    [/La evidencia esperada es decision de ruta, ejercicio y evidencia\./g, humanLine('hub', scene, index, 'evidence')],
    [/En Claude, esta pantalla se aterriza en Claude Code, skills, hooks, subagentes y MCP\./g, humanLine('claude', scene, index, 'situation')],
    [/La evidencia esperada es skill, hook o patch con owner\./g, humanLine('claude', scene, index, 'evidence')],
    [/En Copilot, esta pantalla se aterriza en VS Code Ask, Edit, Agent y PR review\./g, humanLine('copilot', scene, index, 'situation')],
    [/La evidencia esperada es patch local, test y comentario de PR\./g, humanLine('copilot', scene, index, 'evidence')],
    [/En Codex, esta pantalla se aterriza en CLI, IDE y cloud task\./g, humanLine('codex', scene, index, 'situation')],
    [/La evidencia esperada es diff pequeno, tests y resumen de coste\./g, humanLine('codex', scene, index, 'evidence')],
    [/Cierre: evidencia visible y decision humana antes de avanzar\./g, humanLine(vendor, scene, index, 'decision')],
    [/La pantalla debe cerrar con criterio, evidencia y coste visible\./g, humanLine(vendor, scene, index, 'evidence')],
    [/El alumno debe poder repetir este paso sin ayuda del instructor\./g, humanLine(vendor, scene, index, 'action')],
    [/Respuesta simulada con salida verificable\./g, humanLine(vendor, scene, index, 'example')],
    [/Se cita evidencia, se limita alcance y se deja una decision humana clara\./g, humanLine(vendor, scene, index, 'evidence')],
    [/El cierre declara siguiente paso, coste aproximado y riesgo residual\./g, humanLine(vendor, scene, index, 'decision')],
    [/No hay criterios bloqueantes pendientes\./g, `Finding: no aprobar sin prueba ligada a "${String(artifactFromScene(scene)).slice(0, 32)}".`],
    [/Que debe decidir la persona antes de continuar\?/g, 'Que evidencia falta antes de seguir?'],
    [/Cual es la evidencia minima para cerrar esta pantalla\?/g, 'Que prueba convierte esta salida en revisable?'],
  ]
  return replacements.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text)
}

function deepHumanize(value, vendor, scene, index) {
  if (typeof value === 'string') return replaceFactoryText(value, vendor, scene, index)
  if (Array.isArray(value)) return value.map(item => deepHumanize(item, vendor, scene, index))
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, deepHumanize(item, vendor, scene, index)]))
  }
  return value
}

function addRubric(scene, vendor, index) {
  const defaults = utilityByType[scene.type] ?? utilityByType.concept
  scene.blueprintAction = {
    ...(scene.blueprintAction && typeof scene.blueprintAction === 'object' ? scene.blueprintAction : {}),
    learningRubric: {
      learns: defaults[0],
      does: defaults[1],
      decides: defaults[2],
      vendor,
      usefulnessScore: Math.min(100, 82 + (index % 9) * 2),
    },
  }
}

function createMediaBreak(scene, vendor, imageUrl, globalIndex) {
  const copy = vendorCopy[vendor]
  const kind = kindFromUrl(imageUrl, globalIndex)
  const artifact = String(artifactFromScene(scene)).replace(/\s+/g, ' ').slice(0, 52)
  const titleByKind = {
    meme: `Cuando "${artifact}" se va de las manos`,
    reflection: `Pausa: que estamos aceptando aqui?`,
    diagram: `Mapa operativo: ${copy.surface}`,
    screenshot: `Captura mental: ${copy.surface}`,
  }
  const situation = humanLine(vendor, scene, globalIndex, 'situation')
  const tension = humanLine(vendor, scene, globalIndex, 'tension')
  const action = humanLine(vendor, scene, globalIndex, 'action')
  const evidence = humanLine(vendor, scene, globalIndex, 'evidence')
  const decision = humanLine(vendor, scene, globalIndex, 'decision')

  scene.type = 'media-break'
  scene.name = `Media break / ${kind}`
  scene.content = {
    source: 'sprint-cd-media-breaks',
    vendor,
    kind,
    title: titleByKind[kind],
    imageUrl,
    alt: `${vendor} ${kind} asset`,
    caption: kind === 'meme'
      ? 'Humor util: si te hace sonreir, tambien debe recordarte una regla.'
      : 'La imagen fija una decision que despues se practica con el agente.',
    situation,
    tension,
    example: humanLine(vendor, scene, globalIndex, 'example'),
    action,
    evidence,
    decision,
    rubric: {
      learns: copy.learns,
      does: copy.does,
      decides: copy.decides,
    },
  }
  scene.subtitles = [
    { text: situation, startMs: scene.startMs + 500, endMs: scene.startMs + 6500 },
    { text: tension, startMs: scene.startMs + 7200, endMs: scene.startMs + 13200 },
    { text: `${action} ${evidence}`, startMs: scene.startMs + 13900, endMs: Math.min(scene.endMs - 500, scene.startMs + 22000) },
  ]
  scene.voiceover = scene.subtitles.map(subtitle => subtitle.text)
  scene.screen = {
    ...(scene.screen ?? {}),
    mode: 'media-break',
    title: titleByKind[kind],
    visual: imageUrl,
  }
  addRubric(scene, vendor, globalIndex)
}

async function main() {
  await writeMockups()
  await fs.mkdir(operationsDir, { recursive: true })
  const assets = await assetsByVendor()
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  const microBudget = { remaining: 14 }
  const manifest = {
    generatedAt: new Date().toISOString(),
    target: 'Sprint C/D - media breaks + human script',
    mediaBreaks: [],
    courses: [],
    mockups: screenshotAssets.map(asset => `/video-assets/vendor-mockups/${asset.file}`),
  }
  let globalBreakIndex = 0

  for (const file of files) {
    const filePath = path.join(coursesDir, file)
    const course = JSON.parse(await fs.readFile(filePath, 'utf8'))
    const vendor = vendorFromId(course.id)
    let target = targetForCourse(course, microBudget)
    if ((course.durationMs ?? 0) / 60000 < 10 && target > 0) microBudget.remaining -= 1
    const selected = selectIndices(course, target)
    const vendorAssets = assets[vendor] ?? assets.hub
    let converted = 0

    course.scenes.forEach((scene, index) => {
      scene.content = deepHumanize(scene.content, vendor, scene, index)
      scene.subtitles = (scene.subtitles ?? []).map(subtitle => ({
        ...subtitle,
        text: replaceFactoryText(subtitle.text, vendor, scene, index),
      }))
      scene.voiceover = (scene.voiceover ?? scene.subtitles.map(subtitle => subtitle.text)).map(text => replaceFactoryText(text, vendor, scene, index))
      addRubric(scene, vendor, index)
    })

    for (const sceneIndex of selected) {
      const scene = course.scenes[sceneIndex]
      const imageUrl = vendorAssets[globalBreakIndex % vendorAssets.length]
      createMediaBreak(scene, vendor, imageUrl, globalBreakIndex)
      converted += 1
      globalBreakIndex += 1
      manifest.mediaBreaks.push({
        courseId: course.id,
        sceneIndex,
        sceneId: scene.id,
        vendor,
        kind: scene.content.kind,
        imageUrl,
        title: scene.content.title,
      })
    }

    manifest.courses.push({
      id: course.id,
      vendor,
      target,
      converted,
      sceneCount: course.scenes.length,
      mediaBreakCount: course.scenes.filter(scene => scene.type === 'media-break').length,
    })
    await fs.writeFile(filePath, `${JSON.stringify(course, null, 2)}\n`, 'utf8')
  }

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  console.log(`media breaks applied: ${manifest.mediaBreaks.length}`)
  console.log(`manifest: ${path.relative(root, manifestPath)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
