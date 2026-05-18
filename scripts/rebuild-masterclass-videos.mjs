import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const root = process.cwd()
const coursesDir = path.join(root, 'public', 'courses')
const docsDir = path.join(root, 'docs', 'auditorias')
const releaseDir = path.join(root, 'public', 'release-ops', 'video-iteration-100')

const sceneDurationMs = 25_000
const typeCycle = [
  'title',
  'concept',
  'compare',
  'linear',
  'prompt',
  'streaming',
  'coding',
  'diff',
  'terminal',
  'decision',
  'cost',
  'risk',
  'branch',
  'quiz',
  'thinking',
  'pr-review',
  'pause',
  'concept',
  'coding',
  'terminal',
  'decision',
  'cost',
  'quiz',
  'finale',
]

const profiles = {
  codex: {
    id: 'cx-masterclass-10m-codex-operating-system',
    title: 'Codex Masterclass 10m - Operating System',
    description: 'Masterclass intensiva para explicar Codex como sistema operativo de trabajo: superficies, AGENTS.md, modelos, permisos, coste, MCP, subagentes, PR y activacion real.',
    tag: 'Codex / Masterclass',
    name: 'Codex',
    file: 'AGENTS.md',
    command: 'pnpm test -- auth.spec.ts',
    modelFast: 'modelo rapido para leer y ubicar',
    modelStrong: 'modelo fuerte para refactor o PR complejo',
    surface: 'CLI, IDE, web y cloud task',
    finalCta: 'El alumno sale sabiendo pedir a Codex un cambio pequeno, probado, barato y defendible.',
    topics: [
      ['Codex como operador de repo', 'No es un chat paralelo: es una forma de convertir contexto en cambios verificables.'],
      ['Mapa de superficies', 'Elegir CLI, IDE, web o cloud segun friccion, riesgo y necesidad de trazabilidad.'],
      ['Arranque malo vs profesional', 'El prompt impulsivo gasta tokens; el briefing con criterio reduce vueltas.'],
      ['Ticket minimo', 'Problema, restricciones, aceptacion y evidencia antes de abrir la sesion.'],
      ['Prompt readonly', 'Primero mapa de rutas, tests y riesgos; despues permiso de editar.'],
      ['Respuesta esperada', 'Codex debe devolver hipotesis, archivos y siguiente pregunta, no un patch prematuro.'],
      ['AGENTS.md', 'Reglas estables: comandos, limites, estilo, seguridad y definicion de done.'],
      ['Diff pequeno', 'El cambio bueno se nota por lo que no toca y por el test que lo protege.'],
      ['Terminal con evidencia', 'Cada comando debe explicar que valida y que queda fuera.'],
      ['Decision de modelo', 'Subir potencia solo si la incertidumbre tecnica lo justifica.'],
      ['Cost ledger', 'Registrar modelo, permisos, iteraciones y criterio de parada.'],
      ['Permisos', 'Readonly, workspace-write y ejecucion son decisiones separadas.'],
      ['Timeline de PR', 'Issue, branch, plan, patch, tests, review y cierre.'],
      ['Checkpoint', 'El alumno distingue respuesta bonita de evidencia suficiente.'],
      ['Pensamiento operativo', 'Codex rinde cuando el humano impone orden, no cuando pide milagros.'],
      ['Review del propio diff', 'Findings con severidad, rutas y accion concreta antes de PR.'],
      ['Pausa instructor', 'Parar la demo y pedir decision, riesgo y coste en voz alta.'],
      ['MCP y contexto', 'Conectar fuentes solo si aportan senal y tienen owner.'],
      ['Subagentes', 'Explorer, developer y QA trabajan mejor con fronteras y salida cerrada.'],
      ['CI y PR swarm', 'Automatizar revision exige coste maximo, permisos minimos y firma humana.'],
      ['Go / No-Go', 'Cuando usar Codex, cuando no usarlo y cuando llevarlo a tutoria.'],
      ['Presupuesto por tarea', 'Una tarea sin limite de iteraciones no esta lista para automatizarse.'],
      ['Activacion del alumno', 'Primer reto: mapear repo, planear patch y cerrar con evidencia.'],
      ['Resumen', 'Codex funciona como metodo: contexto, plan, patch, tests, review, coste.'],
    ],
  },
  copilot: {
    id: 'cp-masterclass-10m-copilot-workbench',
    title: 'Copilot Masterclass 10m - Workbench',
    description: 'Masterclass intensiva para explicar Copilot como mesa de trabajo en VS Code: inline, Ask, Edit, Agent, instrucciones, prompt files, PR review y premium requests.',
    tag: 'GitHub Copilot / Masterclass',
    name: 'Copilot',
    file: 'copilot-instructions.md',
    command: 'pnpm test -- total.spec.ts',
    modelFast: 'modelo rapido de Copilot Chat',
    modelStrong: 'modelo avanzado para Agent o PR review complejo',
    surface: 'VS Code, GitHub, PR review y Copilot Chat',
    finalCta: 'El alumno sale sabiendo elegir Ask, Edit o Agent sin perder control de revision ni coste.',
    topics: [
      ['Copilot como mesa de trabajo', 'No es solo autocomplete: es Ask, Edit, Agent y PR review con criterio.'],
      ['Superficies en VS Code', 'Inline sugiere, Ask explica, Edit cambia, Agent coordina y PR review revisa.'],
      ['Mal uso vs buen uso', 'Aceptar sugerencias al vuelo no equivale a entregar software.'],
      ['Issue pequeno', 'Un bug de checkout permite practicar modo, contexto, test y PR.'],
      ['Prompt Ask', 'Preguntar primero donde esta el calculo y que supuesto se rompe.'],
      ['Diagnostico', 'Copilot debe ubicar ruta, supuesto y test minimo antes de editar.'],
      ['Instrucciones', 'Las reglas estables viven en copilot-instructions, no en cada prompt.'],
      ['Edit localizado', 'Seleccionar contexto reduce ruido y evita cambios multiarchivo innecesarios.'],
      ['Terminal de prueba', 'El test demuestra red -> green, no solo cobertura decorativa.'],
      ['Elegir Agent', 'Agent compensa cuando hay varias rutas y una rubrica clara.'],
      ['Premium requests', 'La autonomia tambien consume presupuesto y necesita criterio de parada.'],
      ['Permisos y contexto', 'Mas contexto no siempre es mejor; contexto irrelevante contamina la respuesta.'],
      ['Timeline de trabajo', 'Issue, Ask, Edit, Agent, Tests, Review y PR.'],
      ['Checkpoint', 'El alumno decide modo segun incertidumbre y riesgo.'],
      ['Pensamiento Copilot', 'Cambiar de modo es madurez, no indecision.'],
      ['PR review', 'Un finding util trae severidad, ruta, razon y sugerencia verificable.'],
      ['Pausa instructor', 'Antes de Agent, el grupo verbaliza alcance y stop rule.'],
      ['Prompt files', 'Prompts reutilizables para tareas repetidas y equipos grandes.'],
      ['Custom agents', 'Agentes internos con rol, herramientas, limites y salida esperada.'],
      ['GitHub workflow', 'Del commit al PR con comentario claro, checks y trazabilidad.'],
      ['Go / No-Go', 'Usar Copilot para acelerar criterio, no para saltarse revision.'],
      ['Presupuesto', 'Medir premium requests evita que la adopcion se vuelva caja negra.'],
      ['Activacion', 'Primer reto: diagnosticar bug, aplicar Edit y preparar PR.'],
      ['Resumen', 'Copilot funciona cuando cada modo tiene frontera, evidencia y review.'],
    ],
  },
  claude: {
    id: 'cl-masterclass-10m-claude-operating-model',
    title: 'Claude Masterclass 10m - Operating Model',
    description: 'Masterclass intensiva para explicar Claude como entorno de trabajo: CLAUDE.md, memoria, skills, hooks, MCP, subagentes, automatizacion y gobierno.',
    tag: 'Claude / Masterclass',
    name: 'Claude',
    file: 'CLAUDE.md',
    command: 'pnpm test -- auth.spec.ts',
    modelFast: 'modelo eficiente para clasificar y leer',
    modelStrong: 'modelo fuerte para arquitectura o automatizacion',
    surface: 'Claude Code, Projects, skills, hooks, MCP y subagentes',
    finalCta: 'El alumno sale entendiendo Claude como sistema gobernado de memoria, herramientas y automatizacion.',
    topics: [
      ['Claude como operating model', 'No es solo conversar: es memoria, contexto, skills, hooks y herramientas.'],
      ['Superficies Claude', 'Project, Claude Code, MCP, skills y subagentes tienen trabajos distintos.'],
      ['Memoria mala vs memoria util', 'Guardar todo no ayuda; guardar reglas estables reduce friccion.'],
      ['Brief de tarea', 'Separar objetivo, frontera, owner, evidencia y rollback.'],
      ['Prompt de skill', 'Una skill captura procedimiento repetible y evita reexplicar el trabajo.'],
      ['Respuesta esperada', 'Claude debe devolver pasos, riesgos y artefacto final, no entusiasmo.'],
      ['CLAUDE.md', 'Reglas locales, convenciones y comandos viven cerca del proyecto.'],
      ['Hook gobernado', 'Un hook bueno bloquea con criterio y ofrece salida, no con susto.'],
      ['Terminal y evidencia', 'Cada automatizacion necesita salida legible y rollback probado.'],
      ['Decision de modelo', 'Usar potencia segun ambiguedad, no por costumbre.'],
      ['Coste por automatizacion', 'Lo que corre en CI se multiplica si no tiene presupuesto.'],
      ['Permisos MCP', 'Inventario, scope, lectura, escritura y owner antes de conectar fuentes.'],
      ['Timeline Claude', 'Brief, CLAUDE.md, Skill, Hook, MCP, Eval y Signoff.'],
      ['Checkpoint', 'El alumno decide si esto debe ser memoria, skill, hook o MCP.'],
      ['Pensamiento Claude', 'La frontera del agente importa mas que la longitud del prompt.'],
      ['Review de automatizacion', 'Owner, rollback, logs y criterio de bloqueo antes de activar.'],
      ['Pausa instructor', 'Parar y preguntar: que pasa si esto falla a las 3 de la manana?'],
      ['Subagentes', 'Explorer, QA, security y architect tienen coste y permisos distintos.'],
      ['Evals', 'LLM-as-judge necesita rubrica, dataset y muestra negativa.'],
      ['CI controlada', 'Automatizar PRs exige label, max retries, logs y firma humana.'],
      ['Go / No-Go', 'Claude ayuda mucho cuando hay procedimiento; no sustituye ownership.'],
      ['Presupuesto', 'Contexto largo sin dieta se convierte en coste invisible.'],
      ['Activacion', 'Primer reto: convertir una rutina repetida en skill con prueba.'],
      ['Resumen', 'Claude funciona cuando memoria, tools y agentes tienen gobierno.'],
    ],
  },
}

function subtitleLines(profile, title, body, index) {
  return [
    `${profile.name}: ${title}.`,
    body,
    `Modelo recomendado: ${index % 3 === 0 ? profile.modelStrong : profile.modelFast}.`,
    `Cierre: evidencia visible y decision humana antes de avanzar.`,
  ].map(line => line.length > 132 ? `${line.slice(0, 129)}...` : line)
}

function makeSubtitles(lines, startMs, endMs) {
  const usableStart = startMs + 600
  const usableEnd = endMs - 700
  const slice = Math.floor((usableEnd - usableStart) / lines.length)
  return lines.map((text, index) => ({
    text,
    startMs: usableStart + index * slice,
    endMs: Math.min(usableEnd, usableStart + (index + 1) * slice - 250),
  }))
}

function opsContent(profile, mode, title, body, index) {
  const active = index % 7
  return {
    mode,
    vendor: profile.name.toLowerCase(),
    title,
    eyebrow: `${profile.title} / escena ${String(index + 1).padStart(2, '0')}`,
    label: body,
    presenterCue: `Relacionar ${title} con una decision real del alumno.`,
    actionLabel: mode === 'pause' ? 'Parar y debatir' : 'Mostrar artefacto',
    actionDetail: body,
    prompt: [
      `Actua como ${profile.name} en ${profile.surface}.`,
      `Objetivo: ${title}.`,
      `Contexto: ${body}.`,
      `Antes de editar, devuelve criterio de cierre, riesgo y coste esperado.`,
      `No avances si falta evidencia verificable.`,
    ].join('\n'),
    response: [
      `Lectura: ${title} se trata como decision operativa, no como teoria.`,
      `Artefacto: ${profile.file} o el prompt asociado documenta la regla estable.`,
      `Evidencia: ${profile.command} valida el cambio o deja bloqueo explicito.`,
      `Siguiente paso: aplicar solo si el humano acepta riesgo y coste.`,
    ],
    diff: [
      `diff --git a/${profile.file} b/${profile.file}`,
      `- regla implicita: ${title}`,
      `+ regla explicita: ${body}`,
      '+ done_when = "prueba, review, coste y owner visibles"',
    ],
    terminal: [
      `$ ${profile.command}`,
      `PASS ${profile.file}`,
      `checked: ${title}`,
      `model: ${index % 3 === 0 ? profile.modelStrong : profile.modelFast}`,
      'budget: dentro del limite de workshop',
    ],
    review: [
      { severity: active === 0 ? 'high' : 'note', text: `Comprobar que ${title} no se queda en recomendacion generica.` },
      { severity: 'medium', text: `Pedir evidencia: comando, diff, owner o decision documentada.` },
      { severity: 'note', text: `El instructor valida si el alumno puede repetirlo sin ayuda.` },
    ],
    cost: {
      model: index % 3 === 0 ? profile.modelStrong : profile.modelFast,
      tokens: index % 3 === 0 ? 'alto controlado' : 'bajo/medio por contexto acotado',
      permission: 'minimo permiso viable para esta escena',
      stopRule: 'Parar tras dos iteraciones sin evidencia nueva.',
    },
    decision: {
      question: `Que decision tomas sobre ${title}?`,
      options: ['seguir', 'pedir contexto', 'subir modelo', 'bloquear y llevar a tutoria'],
      selected: active % 4,
    },
    risk: {
      items: ['Coste invisible', 'Permisos excesivos', 'Contexto flojo', 'Salida no verificable', 'Owner ausente'],
      level: active < 2 ? 'bajo' : active < 5 ? 'medio' : 'alto',
    },
    branch: {
      steps: ['Brief', 'Contexto', 'Plan', 'Artefacto', 'Validacion', 'Review', 'Cierre'],
      active,
    },
    quiz: {
      question: `Que prueba que ${title} esta entendido?`,
      answers: ['Un prompt mas largo', 'Una evidencia repetible', 'Una opinion del modelo'],
      correct: 1,
    },
  }
}

function normalContent(profile, type, title, body, index) {
  if (type === 'title') {
    return {
      title: profile.title.replace(/^[^-]+ - /, ''),
      subtitle: profile.description,
      tag: profile.tag,
    }
  }
  if (type === 'concept') {
    return {
      tag: profile.tag,
      title,
      body: `${body}\n\nLa idea clave: convertir una pantalla de herramienta en un criterio repetible de trabajo. La persona no memoriza botones; aprende a decidir superficie, modelo, permiso, evidencia y cierre.`,
      highlight: `No avanzar sin evidencia visible: ${profile.file}, diff, test, coste u owner.`,
      points: [
        `Superficie: ${profile.surface}.`,
        `Modelo: ${index % 3 === 0 ? profile.modelStrong : profile.modelFast}.`,
        `Artefacto: ${profile.file}.`,
        `Validacion: ${profile.command}.`,
      ],
    }
  }
  if (type === 'compare') {
    return {
      tag: `${profile.name} / decision`,
      left: {
        label: 'Uso impulsivo',
        color: 'destructive',
        steps: [
          { icon: 'MessageSquare', text: 'Pedir resultado sin contexto ni limite.' },
          { icon: 'Code', text: 'Aceptar salida porque parece razonable.' },
          { icon: 'AlertTriangle', text: 'Descubrir tarde el coste o el riesgo.' },
        ],
        total: 'Mas vueltas y menos confianza',
      },
      right: {
        label: 'Uso profesional',
        color: 'accent',
        steps: [
          { icon: 'Eye', text: 'Elegir superficie y permiso minimo.' },
          { icon: 'FileText', text: 'Pedir plan, evidencia y criterio de cierre.' },
          { icon: 'Check', text: 'Validar con test, review o decision documentada.' },
        ],
        total: 'Menos ruido y mas transferencia',
      },
    }
  }
  if (type === 'linear') {
    return {
      ticketId: `${profile.name.slice(0, 2).toUpperCase()}-${100 + index}`,
      title,
      project: `${profile.name} Practice Hub`,
      priority: index % 3 === 0 ? 'High' : 'Medium',
      assignee: 'Participante',
      status: 'Ready for practice',
      labels: ['ai-practice', 'evidence', 'cost-aware'],
      description: `${body}\n\nEntregable: explicar decision de superficie, modelo, permiso, coste y evidencia antes de cerrar la escena.`,
    }
  }
  if (type === 'thinking') {
    return {
      tag: `${profile.name} / razonamiento operativo`,
      title,
      thoughts: [
        { ms: 0, text: 'Identificar objetivo real y restriccion principal.', done: true },
        { ms: 5_000, text: `Consultar ${profile.file} o regla estable equivalente.`, done: true },
        { ms: 10_000, text: 'Elegir modelo y permiso por riesgo.', done: true },
        { ms: 15_000, text: 'Pedir artefacto verificable, no narrativa.', done: false },
        { ms: 20_000, text: 'Cerrar con coste, owner y siguiente accion.', done: false },
      ],
    }
  }
  if (type === 'coding') {
    return {
      tag: `${profile.name} / artefacto`,
      filename: profile.file,
      code: [
        `# ${profile.file}`,
        '',
        `## Escena: ${title}`,
        `Objetivo: ${body}`,
        '',
        '## Reglas',
        '- Separar exploracion de edicion.',
        '- Usar el menor permiso viable.',
        '- Registrar modelo y coste aproximado.',
        '- Cerrar con evidencia verificable.',
        '',
        `Comando de validacion: ${profile.command}`,
      ].join('\n'),
      commentary: [
        { atLine: 3, text: 'La escena se convierte en regla operativa.' },
        { atLine: 7, text: 'Permiso minimo antes de autonomia.' },
        { atLine: 10, text: 'Sin evidencia no hay cierre.' },
      ],
    }
  }
  if (type === 'finale') {
    return {
      title: `Lo que debe quedar despues de ${profile.name}`,
      summary: [
        { number: '01', label: 'Superficie', body: `Elegir ${profile.surface} segun tarea.` },
        { number: '02', label: 'Criterio', body: 'Definir alcance, aceptacion y evidencia.' },
        { number: '03', label: 'Coste', body: 'Modelo, contexto y permiso visibles.' },
        { number: '04', label: 'Practica', body: 'Ejercicio asociado y cierre revisable.' },
      ],
      cta: profile.finalCta,
    }
  }
  return opsContent(profile, type, title, body, index)
}

function scene(profile, topic, index) {
  const [title, body] = topic
  const type = typeCycle[index]
  const startMs = index * sceneDurationMs
  const endMs = startMs + sceneDurationMs
  const voiceover = subtitleLines(profile, title, body, index)
  return {
    id: `${String(index + 1).padStart(2, '0')}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    name: title,
    startMs,
    endMs,
    type,
    content: normalContent(profile, type, title, body, index),
    subtitles: makeSubtitles(voiceover, startMs, endMs),
    voiceover,
    screen: {
      mode: type,
      title,
      visual: `${profile.name.toLowerCase()}-${type}`,
    },
  }
}

function buildCourse(profile) {
  const scenes = profile.topics.map((topic, index) => scene(profile, topic, index))
  return {
    id: profile.id,
    title: profile.title,
    description: profile.description,
    template: 'technical',
    durationPreset: 10,
    durationMs: sceneDurationMs * scenes.length,
    voice: 'es-ES-AlvaroNeural',
    author: 'AI Practice Hub',
    createdAt: '2026-05-15',
    chapters: [
      { id: 'start', label: 'Aterrizaje', startMs: scenes[0].startMs },
      { id: 'surface', label: 'Superficies', startMs: scenes[4].startMs },
      { id: 'method', label: 'Metodo', startMs: scenes[9].startMs },
      { id: 'governance', label: 'Coste y permisos', startMs: scenes[14].startMs },
      { id: 'activation', label: 'Activacion', startMs: scenes[20].startMs },
    ],
    scenes,
    generatedFrom: 'scripts/rebuild-masterclass-videos.mjs',
  }
}

async function summarize() {
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  const rows = []
  for (const file of files) {
    const course = JSON.parse(await fs.readFile(path.join(coursesDir, file), 'utf8'))
    rows.push({
      id: course.id,
      minutes: Math.round((course.durationMs / 60_000) * 10) / 10,
      scenes: course.scenes?.length ?? 0,
      avgSec: Math.round((course.durationMs / Math.max(1, course.scenes?.length ?? 1)) / 1000),
    })
  }
  return rows
}

async function main() {
  await fs.mkdir(coursesDir, { recursive: true })
  await fs.mkdir(docsDir, { recursive: true })
  await fs.mkdir(releaseDir, { recursive: true })

  const generated = []
  for (const profile of Object.values(profiles)) {
    const course = buildCourse(profile)
    await fs.writeFile(path.join(coursesDir, `${course.id}.json`), `${JSON.stringify(course, null, 2)}\n`, 'utf8')
    generated.push({ id: course.id, scenes: course.scenes.length, minutes: course.durationMs / 60_000 })
    console.log(`generated ${course.id} (${course.scenes.length} scenes)`)
  }

  const summary = await summarize()
  await fs.writeFile(path.join(releaseDir, 'video-scene-counts.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), generated, summary }, null, 2)}\n`, 'utf8')

  const targetRows = summary.filter(row =>
    row.minutes === 60 ||
    row.minutes === 30 ||
    ['cx-masterclass-10m-codex-operating-system', 'cp-masterclass-10m-copilot-workbench', 'cl-masterclass-10m-claude-operating-model'].includes(row.id)
  )
  const table = targetRows.map(row => `| \`${row.id}\` | ${row.minutes}m | ${row.scenes} | ${row.avgSec}s |`).join('\n')
  const md = `# Iteracion videos 100%\n\nFecha: ${new Date().toISOString()}\n\n## Objetivo aplicado\n\n- Videos de 60m: 120 escenas, 30s por escena.\n- Workshops de 30m: 60 escenas, 30s por escena.\n- Masterclass de 10m: 24 escenas, 25s por escena.\n- Cada escena tiene voz, subtitulos y pantalla asociada.\n- Los contenidos se orientan a decision, evidencia, permisos, modelos y coste.\n\n## Videos reconstruidos\n\n| Video | Duracion | Escenas | Media |\n| --- | ---: | ---: | ---: |\n${table}\n\n## Criterio pedagogico\n\nLa iteracion elimina las pantallas de 75 segundos. Los videos largos ahora funcionan como secuencias de trabajo: prompt, respuesta, diff, terminal, review, coste, riesgo, decision y checkpoint. Las masterclass dejan de ser 10 bloques largos y pasan a 24 pantallas de alta cadencia.\n`
  await fs.writeFile(path.join(docsDir, 'AUDITORIA_ITERACION_VIDEOS_100.md'), md, 'utf8')
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
