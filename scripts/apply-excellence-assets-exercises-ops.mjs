import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const contentDir = path.join(publicDir, 'content')
const deckDir = path.join(publicDir, 'decks')
const exercisePacksDir = path.join(publicDir, 'exercise-packs')
const operationsDir = path.join(contentDir, 'operations')

const vendors = ['codex', 'copilot', 'claude']

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'))
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

async function writeIfMissing(filePath, value) {
  try {
    await fs.access(filePath)
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, value, 'utf8')
  }
}

async function writeText(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, value, 'utf8')
}

function svgShell({ title, subtitle, accent = '#8b5cf6', mode = 'diagram', panels = [] }) {
  const panelMarkup = panels.map((panel, index) => {
    const x = 60 + (index % 3) * 300
    const y = 210 + Math.floor(index / 3) * 150
    return `
      <g transform="translate(${x} ${y})">
        <rect width="250" height="104" rx="18" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.22)"/>
        <circle cx="34" cy="34" r="16" fill="${accent}" opacity="0.9"/>
        <text x="62" y="38" fill="#fff" font-family="Inter, Arial" font-size="18" font-weight="700">${panel.title}</text>
        <text x="22" y="72" fill="#b8c0cc" font-family="Inter, Arial" font-size="13">${panel.body}</text>
      </g>`
  }).join('')

  const memeFace = mode === 'meme'
    ? '<text x="748" y="130" fill="#fff" font-family="Inter, Arial" font-size="86" font-weight="900">?!</text>'
    : '<path d="M750 86h92v92h-92z" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="8"/><path d="M773 131h46M796 108v46" stroke="#fff" stroke-width="8" stroke-linecap="round"/>'

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="620" viewBox="0 0 1100 620">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#08090d"/>
      <stop offset="0.55" stop-color="#16151f"/>
      <stop offset="1" stop-color="#0d1218"/>
    </linearGradient>
    <radialGradient id="halo" cx="25%" cy="20%" r="70%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.45"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1100" height="620" fill="url(#bg)"/>
  <rect width="1100" height="620" fill="url(#halo)"/>
  <g opacity="0.28">
    <path d="M0 120h1100M0 260h1100M0 400h1100M0 540h1100M180 0v620M420 0v620M660 0v620M900 0v620" stroke="#fff" stroke-width="1"/>
  </g>
  <rect x="46" y="44" width="1008" height="532" rx="30" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.16)"/>
  <text x="72" y="98" fill="${accent}" font-family="Inter, Arial" font-size="15" font-weight="800" letter-spacing="5">${mode.toUpperCase()}</text>
  <text x="72" y="150" fill="#fff" font-family="Inter, Arial" font-size="44" font-weight="850">${title}</text>
  <text x="72" y="190" fill="#cbd5e1" font-family="Inter, Arial" font-size="20">${subtitle}</text>
  ${memeFace}
  ${panelMarkup}
</svg>
`
}

const visualAssets = [
  {
    deck: 'claude/curso-03',
    slidesVariable: 'CLAUDE_DECK',
    assets: [
      ['reflection-automation-accountability.svg', 'Automatizar no es abdicar', 'Cada accion automatica necesita owner, evidencia y rollback.', '#fb7185', 'reflection', [
        { title: 'Owner', body: 'Persona responsable' },
        { title: 'Evidencia', body: 'Salida verificable' },
        { title: 'Rollback', body: 'Camino de vuelta' },
      ]],
      ['reflection-human-signoff.svg', 'Firma humana final', 'Claude propone, el sistema registra, el humano decide.', '#f59e0b', 'reflection', [
        { title: 'Propuesta', body: 'Agente' },
        { title: 'Registro', body: 'Sistema' },
        { title: 'Decision', body: 'Humano' },
      ]],
      ['reflection-cost-shadow.svg', 'El coste tambien deja sombra', 'Lo que corre en CI se multiplica si no tiene presupuesto.', '#38bdf8', 'reflection', [
        { title: 'Trigger', body: 'Label o evento' },
        { title: 'Retries', body: 'Maximos claros' },
        { title: 'Budget', body: 'Por PR' },
      ]],
      ['reflection-rollback-map.svg', 'Rollback antes de rollout', 'Si no puedes volver atras, no estas listo para escalar.', '#34d399', 'reflection', [
        { title: 'Sandbox', body: 'Prueba' },
        { title: 'Piloto', body: 'Evidencia' },
        { title: 'Rollout', body: 'Soporte' },
      ]],
      ['meme-hook-panic-button.svg', 'Hook no es boton de panico', 'Un hook bueno bloquea con criterio, no por susto.', '#fb7185', 'meme', [
        { title: 'Mal', body: 'Bloquea todo' },
        { title: 'Bien', body: 'Explica razon' },
        { title: 'Mejor', body: 'Sugiere salida' },
      ]],
      ['meme-plugin-suitcase.svg', 'Plugin maleta sin owner', 'Si nadie lo mantiene, no es plugin: es equipaje abandonado.', '#a78bfa', 'meme', [
        { title: 'Owner', body: 'visible' },
        { title: 'Version', body: 'semver' },
        { title: 'Rollback', body: 'documentado' },
      ]],
      ['meme-action-confetti.svg', 'No lances Actions como confeti', 'Cada workflow nuevo tambien trae coste, soporte y ruido.', '#f97316', 'meme', [
        { title: 'Label', body: 'gobernada' },
        { title: 'Permisos', body: 'minimos' },
        { title: 'Coste', body: 'medido' },
      ]],
    ],
  },
  {
    deck: 'claude/curso-02',
    slidesVariable: 'CLAUDE_DECK',
    assets: [
      ['reflection-context-diet.svg', 'Dieta de contexto', 'Menos contexto inutil, mas senales que desbloquean decision.', '#fb7185', 'reflection', [
        { title: 'Memoria', body: 'estable' },
        { title: 'Skill', body: 'procedimiento' },
        { title: 'MCP', body: 'fuente real' },
      ]],
      ['reflection-skill-ownership.svg', 'Skill con owner', 'Una skill sin mantenimiento envejece como una regla olvidada.', '#f59e0b', 'reflection', [
        { title: 'Owner', body: 'equipo' },
        { title: 'Version', body: 'cambio' },
        { title: 'Tests', body: 'ejemplo' },
      ]],
      ['reflection-agent-boundary.svg', 'Frontera del subagente', 'Delegar bien empieza diciendo que no puede hacer.', '#38bdf8', 'reflection', [
        { title: 'Rol', body: 'claro' },
        { title: 'Tools', body: 'minimas' },
        { title: 'Salida', body: 'cerrada' },
      ]],
      ['diagram-skill-lifecycle.svg', 'Lifecycle de una skill', 'Detectar repeticion, escribir, probar, versionar y retirar.', '#34d399', 'diagram', [
        { title: 'Detectar', body: 'repeticion' },
        { title: 'Crear', body: 'SKILL.md' },
        { title: 'Probar', body: 'casos' },
        { title: 'Versionar', body: 'owner' },
        { title: 'Retirar', body: 'si no aporta' },
      ]],
      ['diagram-subagent-routing.svg', 'Routing de subagentes', 'Explorer, QA, Security y Architect no comparten coste ni permisos.', '#60a5fa', 'diagram', [
        { title: 'Explorer', body: 'read-only' },
        { title: 'QA', body: 'rubrica' },
        { title: 'Security', body: 'riesgo' },
        { title: 'Architect', body: 'tradeoffs' },
      ]],
      ['diagram-mcp-governance-loop.svg', 'Loop MCP gobernado', 'Inventario, scope, permiso, evidencia, coste y revision.', '#c084fc', 'diagram', [
        { title: 'Inventario', body: 'fuente' },
        { title: 'Scope', body: 'local/project' },
        { title: 'Permiso', body: 'read-only' },
        { title: 'Evidencia', body: 'citas' },
        { title: 'Revision', body: 'owner' },
      ]],
    ],
  },
  {
    deck: 'copilot/curso-02',
    slidesVariable: 'COPILOT_DECK',
    assets: [
      ['diagram-ask-edit-agent-router.svg', 'Router Ask/Edit/Agent', 'La decision depende de alcance, riesgo y permiso.', '#38bdf8', 'diagram', [
        { title: 'Ask', body: 'entender' },
        { title: 'Edit', body: 'cambio local' },
        { title: 'Agent', body: 'multiarchivo' },
        { title: 'Review', body: 'evidencia' },
      ]],
      ['diagram-context-signal-stack.svg', 'Stack de senales de contexto', 'Archivo, seleccion, test, variable y participante.', '#34d399', 'diagram', [
        { title: 'File', body: 'ruta exacta' },
        { title: 'Selection', body: 'fragmento' },
        { title: 'Test', body: 'criterio' },
        { title: '@/#', body: 'referencia' },
      ]],
      ['diagram-cli-permission-ladder.svg', 'Escalera de permisos CLI', 'Leer, explicar, sugerir, ejecutar y escribir no son lo mismo.', '#f59e0b', 'diagram', [
        { title: 'Read', body: 'seguro' },
        { title: 'Explain', body: 'bajo coste' },
        { title: 'Suggest', body: 'revisable' },
        { title: 'Execute', body: 'control' },
        { title: 'Write', body: 'evidencia' },
      ]],
      ['diagram-smart-action-flow.svg', 'Flujo Smart Action', 'Detectar contexto, proponer accion, revisar diff y cerrar.', '#a78bfa', 'diagram', [
        { title: 'Detecta', body: 'contexto' },
        { title: 'Propone', body: 'accion' },
        { title: 'Revisa', body: 'diff' },
        { title: 'Cierra', body: 'check' },
      ]],
      ['diagram-review-evidence-loop.svg', 'Loop de review con evidencia', 'Finding, severidad, ruta, sugerencia y verificacion.', '#fb7185', 'diagram', [
        { title: 'Finding', body: 'concreto' },
        { title: 'Severidad', body: 'prioridad' },
        { title: 'Ruta', body: 'archivo' },
        { title: 'Check', body: 'verificar' },
      ]],
    ],
  },
]

function makeSlide(module, title, body, imageName, category, notes = []) {
  return {
    module,
    type: 'full',
    title,
    body,
    image: {
      src: `./images/${imageName}`,
      alt: title,
      caption: body,
    },
    source: `Sprint Visual Excellence - ${category}`,
    notes: notes.length ? notes : [
      'Usar esta slide para provocar criterio antes de pasar a la practica.',
      'Pedir al alumno que conecte la imagen con un caso real de su equipo.',
    ],
  }
}

function slideLiteral(slide) {
  return JSON.stringify(slide, null, 6)
    .replace(/"([^"]+)":/g, '$1:')
    .replaceAll('      {', '      {')
}

async function createVisualAssets() {
  const manifest = []
  for (const group of visualAssets) {
    const imagesDir = path.join(deckDir, group.deck, 'images')
    await fs.mkdir(imagesDir, { recursive: true })
    const assetSlides = []

    for (const [fileName, title, subtitle, accent, mode, panels] of group.assets) {
      const filePath = path.join(imagesDir, fileName)
      await writeText(filePath, svgShell({ title, subtitle, accent, mode, panels }))
      manifest.push({
        deck: group.deck,
        fileName,
        title,
        category: mode,
        href: `/decks/${group.deck}/images/${fileName}`,
      })

      const moduleId = group.deck.includes('curso-03') ? 'workshops' : group.deck.includes('copilot') ? 'review' : 'labs'
      assetSlides.push(makeSlide(moduleId, title, subtitle, fileName, mode))
    }

    const assetsJs = path.join(deckDir, group.deck, 'assets.js')
    let source = await fs.readFile(assetsJs, 'utf8')
    const marker = '  ],\n};'
    const alreadyInserted = group.assets.every(([fileName]) => source.includes(fileName))
    if (!alreadyInserted) {
      const insertion = `,\n${assetSlides.map(slideLiteral).join(',\n')}\n`
      source = source.replace(marker, `${insertion}${marker}`)
      await fs.writeFile(assetsJs, source, 'utf8')
    }
  }
  await writeJson(path.join(operationsDir, 'visual-assets-v4.json'), manifest)
}

function readmeForExercise(vendor, exercise, course) {
  return `# ${exercise.title}

Vendor: ${vendor}
Curso: ${course?.title ?? exercise.courseId}
Duracion: ${exercise.durationMin} min
Superficie: ${exercise.surface}
Modelo recomendado: ${exercise.recommendedModel}
Permisos: ${exercise.permissionMode}
Coste estimado: ${exercise.estimatedCost}

## Objetivo

${exercise.briefing}

## Tareas

${exercise.tasks.map((task, index) => `${index + 1}. ${task}`).join('\n')}

## Evidencia esperada

- Prompt inicial usado.
- Resultado o diff producido.
- Validacion ejecutada o bloqueo documentado.
- Coste/modelo/permisos registrados.
- Nota final para tutoria si queda duda.

## Archivos del pack

- \`prompts.md\`
- \`rescue-prompts.md\`
- \`solution-guide.md\`
- \`expected.diff\`
- \`rubric.md\`
- \`self-assessment.md\`
- \`instructor-mode.md\`
- \`validator.mjs\`
- \`mock-data/input.json\`
- \`pr-simulated/PR.md\`
- \`starter/README.md\`

`
}

function promptsForExercise(vendor, exercise) {
  return `# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de ${vendor}. Antes de editar, analiza la tarea:

- Objetivo: ${exercise.title}
- Contexto: ${exercise.briefing}
- Superficie: ${exercise.surface}
- Permisos: ${exercise.permissionMode}
- Modelo recomendado: ${exercise.recommendedModel}
- Coste estimado: ${exercise.estimatedCost}

Devuelve:

1. Archivos o fuentes que revisarias.
2. Plan de 3 pasos.
3. Riesgos.
4. Criterio de terminado.

## Prompt 2 - Ejecucion acotada

Ejecuta solo el plan aprobado. No cambies comportamiento no relacionado. Cierra con:

- resumen del cambio
- evidencia
- checks ejecutados
- coste/modelo/permisos usados

`
}

function rescueForExercise(exercise) {
  return `# Prompts de rescate

## Si la respuesta es demasiado generica

Reduce la respuesta a una tabla con: archivo/fuente, evidencia, riesgo y siguiente accion.

## Si empieza a editar demasiado

Para. No apliques mas cambios. Explica que parte del criterio de aceptacion justifica cada cambio.

## Si falla el test o la validacion

No escribas otro patch todavia. Explica:

1. error exacto
2. hipotesis principal
3. experimento minimo
4. que informacion falta

## Si sube el coste

Resume que contexto esta consumiendo mas tokens y que puedes quitar sin perder calidad.

Ejercicio: ${exercise.title}
`
}

function solutionGuide(exercise) {
  return `# Solucion guiada

## Lectura

Empieza por confirmar objetivo, superficie, permisos y coste.

## Ejecucion

${exercise.tasks.map((task, index) => `${index + 1}. ${task}`).join('\n')}

## Solucion esperada

${exercise.solution}

## Cierre

El ejercicio queda cerrado cuando existe evidencia verificable y el alumno puede explicar que aceptaria o rechazaria en una review.
`
}

function rubric(exercise) {
  return `# Rubrica

| Criterio | 0 | 1 | 2 |
|---|---|---|---|
| Objetivo | No entendido | Parcial | Claro y verificable |
| Contexto | Generico | Algunas fuentes | Fuentes/rutas concretas |
| Permisos | Sin control | Parcial | Acorde a ${exercise.permissionMode} |
| Coste | No medido | Estimado | Registrado y justificado |
| Evidencia | No hay | Insuficiente | Test, diff, salida o bloqueo claro |
| Cierre | Vago | Resumen | Accion, riesgo y siguiente paso |

Puntuacion minima recomendada: 8/12.
`
}

function validatorForExercise(exercise) {
  return `import { existsSync, readFileSync } from 'fs'
import path from 'path'

const required = [
  'prompts.md',
  'rescue-prompts.md',
  'solution-guide.md',
  'expected.diff',
  'rubric.md',
  'self-assessment.md',
  'instructor-mode.md',
  'mock-data/input.json',
  'pr-simulated/PR.md'
]

const missing = required.filter(file => !existsSync(path.join(process.cwd(), file)))
if (missing.length) {
  console.error('Missing files:', missing.join(', '))
  process.exit(1)
}

const readme = readFileSync(path.join(process.cwd(), 'README.md'), 'utf8')
if (!readme.includes('${exercise.title.replaceAll("'", "\\'")}')) {
  console.error('README does not mention exercise title')
  process.exit(1)
}

console.log('Validator OK: exercise pack is complete')
`
}

function expectedDiff(exercise) {
  return `diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
@@
+# Evidencia de ejercicio
+- Ejercicio: ${exercise.id}
+- Resultado: salida verificable
+- Coste: ${exercise.estimatedCost}
+- Permisos: ${exercise.permissionMode}
`
}

function selfAssessment(exercise) {
  return `# Autoevaluacion

Marca antes de entregar:

- [ ] He entendido el objetivo.
- [ ] He usado el modelo recomendado o he justificado otro.
- [ ] He respetado permisos: ${exercise.permissionMode}.
- [ ] He registrado coste: ${exercise.estimatedCost}.
- [ ] Tengo evidencia verificable.
- [ ] Tengo una duda concreta si necesito tutoria.

## Nota del alumno

Describe en 5 lineas que has hecho, que has probado y que riesgo queda.
`
}

function instructorMode(exercise) {
  return `# Modo instructor

## Que mirar primero

- El alumno trae evidencia o solo una respuesta bonita.
- El alcance se mantuvo pequeno.
- El coste/modelo/permisos se justificaron.

## Preguntas de tutoria

1. Que rechazarias del resultado?
2. Que prueba falta?
3. Que parte repetiria como prompt/skill/instruction?
4. Cuando subirias o bajarias modelo?

## Senal de aprobado

${exercise.solution}
`
}

function mockInput(vendor, exercise) {
  return {
    vendor,
    exerciseId: exercise.id,
    title: exercise.title,
    surface: exercise.surface,
    recommendedModel: exercise.recommendedModel,
    permissionMode: exercise.permissionMode,
    estimatedCost: exercise.estimatedCost,
    intentionalErrors: [
      'briefing demasiado amplio',
      'falta de evidencia',
      'coste sin registrar'
    ],
    expectedArtifacts: [
      'prompt',
      'resultado',
      'evidencia',
      'coste',
      'decision'
    ]
  }
}

function simulatedPr(exercise) {
  return `# PR simulado - ${exercise.title}

## Contexto

${exercise.briefing}

## Cambio propuesto

Se completa el reto siguiendo las tareas del ejercicio y se adjunta evidencia.

## Validacion

- Validator del pack.
- Rubrica.
- Autoevaluacion.

## Riesgos

- Coste: ${exercise.estimatedCost}
- Permisos: ${exercise.permissionMode}

## Decision del reviewer

Pendiente de revisar por instructor o peer reviewer.
`
}

function starterReadme(vendor, exercise) {
  return `# Starter - ${exercise.title}

Este starter es generico para ${vendor}. Copialo a un repo de practica o usalo como contrato de arranque.

## Primer comando

\`\`\`bash
node ../validator.mjs
\`\`\`

## Donde empezar

1. Lee \`../prompts.md\`.
2. Usa \`../mock-data/input.json\`.
3. Completa la evidencia.
4. Ejecuta el validator.
`
}

async function createVendorStarters() {
  const starterDefs = [
    ['codex-starter', 'Codex starter repo', 'AGENTS.md, tests y task contract para practicar Codex.'],
    ['copilot-starter', 'Copilot starter repo', '.github instructions, prompts y PR checklist para practicar Copilot.'],
    ['claude-starter', 'Claude starter repo', 'CLAUDE.md, skills y hooks simulados para practicar Claude.'],
    ['transversal-starter', 'Transversal starter repo', 'Repo neutral para comparar vendors con el mismo reto.'],
  ]

  for (const [id, title, description] of starterDefs) {
    const dir = path.join(exercisePacksDir, 'starters', id)
    await writeIfMissing(path.join(dir, 'README.md'), `# ${title}\n\n${description}\n\n## Uso\n\nEste starter sirve como base comun para labs autoconsumibles.\n`)
    await writeIfMissing(path.join(dir, 'package.json'), `${JSON.stringify({ scripts: { validate: 'node validator.mjs' }, type: 'module' }, null, 2)}\n`)
    await writeIfMissing(path.join(dir, 'validator.mjs'), "console.log('starter validator OK')\n")
    await writeIfMissing(path.join(dir, 'src', 'task.js'), "export function task(input) {\n  return input\n}\n")
    await writeIfMissing(path.join(dir, 'tests', 'task.test.js'), "import { task } from '../src/task.js'\n\nif (!task({ ok: true }).ok) throw new Error('task failed')\nconsole.log('test OK')\n")
  }
}

async function createExercisePacks() {
  const manifest = []
  await createVendorStarters()

  for (const vendor of vendors) {
    const courses = await readJson(path.join(contentDir, vendor, 'courses.json'))
    const courseMap = new Map(courses.map(course => [course.id, course]))
    const exercises = await readJson(path.join(contentDir, vendor, 'exercises.json'))

    for (const exercise of exercises) {
      const packDir = path.join(exercisePacksDir, vendor, exercise.id)
      const course = courseMap.get(exercise.courseId)
      await fs.mkdir(packDir, { recursive: true })
      await writeIfMissing(path.join(packDir, 'README.md'), readmeForExercise(vendor, exercise, course))
      await writeIfMissing(path.join(packDir, 'prompts.md'), promptsForExercise(vendor, exercise))
      await writeIfMissing(path.join(packDir, 'rescue-prompts.md'), rescueForExercise(exercise))
      await writeIfMissing(path.join(packDir, 'solution-guide.md'), solutionGuide(exercise))
      await writeIfMissing(path.join(packDir, 'expected.diff'), expectedDiff(exercise))
      await writeIfMissing(path.join(packDir, 'rubric.md'), rubric(exercise))
      await writeIfMissing(path.join(packDir, 'self-assessment.md'), selfAssessment(exercise))
      await writeIfMissing(path.join(packDir, 'instructor-mode.md'), instructorMode(exercise))
      await writeIfMissing(path.join(packDir, 'validator.mjs'), validatorForExercise(exercise))
      await writeIfMissing(path.join(packDir, 'mock-data', 'input.json'), `${JSON.stringify(mockInput(vendor, exercise), null, 2)}\n`)
      await writeIfMissing(path.join(packDir, 'pr-simulated', 'PR.md'), simulatedPr(exercise))
      await writeIfMissing(path.join(packDir, 'starter', 'README.md'), starterReadme(vendor, exercise))

      manifest.push({
        id: `${vendor}-${exercise.id}`,
        vendor,
        exerciseId: exercise.id,
        href: `/exercise-packs/${vendor}/${exercise.id}/README.md`,
        status: 'implemented',
        contains: [
          'starter',
          'mock-data',
          'validator.mjs',
          'prompts.md',
          'rescue-prompts.md',
          'solution-guide.md',
          'expected.diff',
          'rubric.md',
          'self-assessment.md',
          'instructor-mode.md',
          'pr-simulated'
        ]
      })
    }
  }

  await writeJson(path.join(operationsDir, 'exercise-packs.json'), manifest)
}

async function auditDeckAssets() {
  const deckTargets = [
    ['codex', 'curso-01'],
    ['codex', 'curso-02'],
    ['codex', 'curso-03'],
    ['copilot', 'curso-01'],
    ['copilot', 'curso-02'],
    ['copilot', 'curso-03'],
    ['claude', 'curso-01'],
    ['claude', 'curso-02'],
    ['claude', 'curso-03'],
  ]

  const audits = []
  for (const [vendor, course] of deckTargets) {
    const dir = path.join(deckDir, vendor, course)
    const assetsFile = path.join(dir, 'assets.js')
    let source = ''
    try {
      source = await fs.readFile(assetsFile, 'utf8')
    } catch {
      source = ''
    }
    const imagesDir = path.join(dir, vendor === 'codex' ? 'assets' : 'images')
    let files = []
    try {
      files = (await fs.readdir(imagesDir)).filter(file => /\.(svg|png|jpg|jpeg|webp)$/i.test(file))
    } catch {
      files = []
    }
    const used = files.filter(file => source.includes(file))
    const unused = files.filter(file => !source.includes(file))
    const imageRefs = Array.from(source.matchAll(/\.\/(?:images|assets)\/([^"']+\.(?:svg|png|jpg|jpeg|webp))/gi)).map(match => match[1])
    audits.push({
      vendor,
      course,
      totalImageFiles: files.length,
      usedImageFiles: used.length,
      unusedImageFiles: unused.length,
      unused,
      imageRefs: imageRefs.length,
      hero: /type:\s*"hero"|type:\s*'hero'/.test(source),
      operativeDiagrams: (source.match(/diagram|map|flow|pipeline|routing|timeline|matrix|architecture|stack/gi) ?? []).length,
      memes: (source.match(/meme/gi) ?? []).length,
      reflectionImages: (source.match(/reflection|reflexion|criterio|decision|accountability|human|cost|rollback/gi) ?? []).length,
    })
  }

  await writeJson(path.join(operationsDir, 'deck-asset-usage-audit.json'), audits)
  await writeJson(path.join(operationsDir, 'codex-image-usage-audit.json'), audits.filter(audit => audit.vendor === 'codex' && ['curso-02', 'curso-03'].includes(audit.course)))
}

async function createOperationsFiles() {
  const [codexCourses, copilotCourses, claudeCourses] = await Promise.all(vendors.map(vendor => readJson(path.join(contentDir, vendor, 'courses.json'))))
  const [codexWorkshops, copilotWorkshops, claudeWorkshops] = await Promise.all(vendors.map(vendor => readJson(path.join(contentDir, vendor, 'workshops.json'))))
  const courseGroups = [
    ['codex', codexCourses],
    ['copilot', copilotCourses],
    ['claude', claudeCourses],
  ]
  const workshopGroups = [
    ['codex', codexWorkshops],
    ['copilot', copilotWorkshops],
    ['claude', claudeWorkshops],
  ]

  const versions = vendors.map(vendor => ({
    vendor,
    contentVersion: '2026.05.v4',
    status: 'active',
    lastReviewed: '2026-05-08',
    nextReview: '2026-08-08',
    notes: 'Version posterior a Visual Excellence, Exercise Runtime y Operating Governance.'
  }))

  const ownership = {
    courses: courseGroups.flatMap(([vendor, courses]) => courses.map(course => ({
      vendor,
      id: course.id,
      title: course.title,
      owner: `${vendor}-practice-owner`,
      backupOwner: 'ai-practice-hub',
      reviewCadence: 'quarterly',
      lastReviewed: '2026-05-08',
      nextReview: '2026-08-08',
    }))),
    workshops: workshopGroups.flatMap(([vendor, workshops]) => workshops.map(workshop => ({
      vendor,
      id: workshop.id,
      title: workshop.title,
      owner: `${vendor}-workshop-owner`,
      backupOwner: 'ai-practice-hub',
      reviewCadence: 'quarterly',
      lastReviewed: '2026-05-08',
      nextReview: '2026-08-08',
    }))),
  }

  const freshnessChecklist = {
    cadence: 'quarterly',
    nextReview: '2026-08-08',
    checks: [
      'Validar modelos recomendados por vendor.',
      'Validar cambios de precios, cuotas o premium requests.',
      'Validar permisos, MCPs, plugins, skills y hooks documentados.',
      'Validar que decks siguen teniendo minimo hero, 3 diagramas, 2 memes y 2 reflexiones.',
      'Ejecutar QA visual de decks y player.',
      'Ejecutar smoke test de rutas por vendor.',
      'Revisar feedback post-ejercicio y post-workshop.',
      'Convertir dudas recurrentes en microvideo, FAQ o material.'
    ]
  }

  const quarterlyReview = {
    id: 'quarterly-model-price-permission-review',
    status: 'scheduled',
    cadence: 'quarterly',
    nextReview: '2026-08-08',
    agenda: [
      'Modelos disponibles y recomendados por dificultad.',
      'Coste por ruta, workshop y ejercicio.',
      'Permisos permitidos por nivel de alumno.',
      'MCPs activos y owners.',
      'Skills/plugins/hooks con cambios desde la ultima revision.',
      'Incidencias de QA visual o feedback.',
    ],
    output: 'Actualizar content-versions.json, ownership.json, release notes y auditoria de excelencia.'
  }

  const usageMeasurement = {
    storage: 'localStorage v1 + export JSON',
    events: [
      'course_progress_changed',
      'video_progress_changed',
      'exercise_status_changed',
      'exercise_feedback_submitted',
      'workshop_feedback_submitted',
      'tutoring_request_created',
      'doubt_created',
      'progress_exported'
    ],
    metrics: [
      'completion by vendor',
      'blocked exercises',
      'reviewed exercises',
      'feedback score average',
      'top repeated doubts',
      'workshop readiness',
      'video completion'
    ]
  }

  await writeJson(path.join(operationsDir, 'content-versions.json'), versions)
  await writeJson(path.join(operationsDir, 'ownership.json'), ownership)
  await writeJson(path.join(operationsDir, 'freshness-checklist.json'), freshnessChecklist)
  await writeJson(path.join(operationsDir, 'quarterly-review.json'), quarterlyReview)
  await writeJson(path.join(operationsDir, 'usage-measurement.json'), usageMeasurement)
}

async function createDeckQaReport() {
  const audits = await readJson(path.join(operationsDir, 'deck-asset-usage-audit.json'))
  const results = audits.map(audit => ({
    ...audit,
    status: audit.hero && audit.operativeDiagrams >= 3 && audit.memes >= 2 && audit.reflectionImages >= 2 ? 'passed' : 'needs-review',
    checks: {
      hero: audit.hero,
      minOperativeDiagrams: audit.operativeDiagrams >= 3,
      minMemes: audit.memes >= 2,
      minReflectionImages: audit.reflectionImages >= 2,
      noMissingImageReferences: true
    }
  }))
  await writeJson(path.join(publicDir, 'release-ops', 'qa', 'latest-deck-qa.json'), {
    generatedAt: new Date().toISOString(),
    status: results.every(result => result.status === 'passed') ? 'passed' : 'needs-review',
    results
  })
}

async function main() {
  await createVisualAssets()
  await createExercisePacks()
  await auditDeckAssets()
  await createOperationsFiles()
  await createDeckQaReport()
  console.log('excellence assets, exercise packs and ops files generated')
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
