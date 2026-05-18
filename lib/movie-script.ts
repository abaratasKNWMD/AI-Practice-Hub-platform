// THE MOVIE SCRIPT — Educational curriculum: Spec-Driven Development
// 10 minutes of structured learning. Each scene type maps to a visual component.

import { DASHBOARD_CODE_STRING } from './code-strings'

export interface Subtitle {
  text: string
  startMs: number
  endMs: number
}

export interface Chapter {
  id: string
  label: string
  startMs: number
}

export type SceneType =
  | 'title'
  | 'concept'
  | 'compare'
  | 'linear'
  | 'thinking'
  | 'coding'
  | 'preview'
  | 'error'
  | 'finale'
  | 'media-break'
  | 'prompt'
  | 'streaming'
  | 'diff'
  | 'terminal'
  | 'pr-review'
  | 'cost'
  | 'decision'
  | 'pause'
  | 'quiz'
  | 'branch'
  | 'risk'

export interface Scene {
  id: string
  name: string
  startMs: number
  endMs: number
  type: SceneType
  content?: unknown
  subtitles: Subtitle[]
  voiceover?: string[]
  screen?: {
    mode?: string
    title?: string
    visual?: string
  }
  blueprintAction?: unknown
}

// ─────────────────────────────────────────────
// TOTAL RUNTIME: 10 minutes = 600,000 ms
// ─────────────────────────────────────────────

export const MOVIE_SCRIPT: Scene[] = [

  // ══════════════════════════════════════════════════════
  // ACT 1 — EL PROBLEMA (0:00 – 1:30)
  // ══════════════════════════════════════════════════════

  {
    id: 'title',
    name: 'Intro',
    startMs: 0,
    endMs: 8000,
    type: 'title',
    content: {
      title: 'Spec-Driven Development',
      subtitle: 'De requisito a interfaz. Sin friccion.',
      tag: 'Formacion tecnica — 10 min',
    },
    subtitles: [
      { text: 'Spec-Driven Development.', startMs: 1000, endMs: 4000 },
      { text: 'Una forma diferente de construir software.', startMs: 4500, endMs: 7500 },
    ],
  },

  {
    id: 'problem-intro',
    name: 'El problema',
    startMs: 8000,
    endMs: 30000,
    type: 'concept',
    content: {
      tag: 'Act 1 — El Problema',
      title: 'Por que tardamos tanto en construir?',
      body: 'El ciclo clasico de desarrollo tiene demasiados pasos manuales.\n\nPM escribe en Notion. Disenador crea mockups en Figma. Dev lee el diseno, pregunta, implementa. Cada traduccion introduce perdida de informacion y tiempo.\n\nEl tiempo real escribiendo codigo es menos del 30% del tiempo total de un ticket.',
      highlight: 'El tiempo real de codigo es menos del 30% del tiempo total.',
      points: [
        'PM escribe requisito',
        'Disenador interpreta y mockupea',
        'Dev lee, pregunta, implementa',
        'Review, correcciones, merge',
      ],
    },
    subtitles: [
      { text: 'El ciclo clasico de desarrollo tiene un problema estructural.', startMs: 8500, endMs: 13000 },
      { text: 'Un requisito pasa por demasiadas manos antes de convertirse en codigo.', startMs: 13500, endMs: 19000 },
      { text: 'Cada traduccion manual introduce perdida de informacion.', startMs: 19500, endMs: 24000 },
      { text: 'El tiempo real escribiendo codigo: menos del 30% del total.', startMs: 24500, endMs: 29500 },
    ],
  },

  {
    id: 'old-vs-new',
    name: 'El contraste',
    startMs: 30000,
    endMs: 55000,
    type: 'compare',
    content: {
      tag: 'Desarrollo Tradicional vs Spec-Driven',
      left: {
        label: 'Desarrollo tradicional',
        color: 'destructive',
        steps: [
          { icon: 'FileText', text: 'PM escribe en Confluence' },
          { icon: 'MessageSquare', text: 'Reunion de refinamiento (1h)' },
          { icon: 'PenTool', text: 'Disenador crea mockups (1-2 dias)' },
          { icon: 'MessageSquare', text: 'Revision de diseno (1h)' },
          { icon: 'Code', text: 'Dev implementa desde 0 (2-3 dias)' },
          { icon: 'GitPullRequest', text: 'Code review + correcciones' },
          { icon: 'AlertTriangle', text: '"Esto no era lo que pedi"' },
        ],
        total: '5-7 dias por feature',
      },
      right: {
        label: 'Spec-Driven Development',
        color: 'accent',
        steps: [
          { icon: 'TicketCheck', text: 'PM escribe spec estructurado en Linear' },
          { icon: 'Zap', text: 'v0 lee el ticket directamente' },
          { icon: 'Code2', text: 'UI generada automaticamente' },
          { icon: 'Eye', text: 'Preview inmediato del resultado' },
          { icon: 'GitPullRequest', text: 'Dev revisa y ajusta detalles finos' },
        ],
        total: 'Horas por feature',
      },
    },
    subtitles: [
      { text: 'Comparemos los dos mundos.', startMs: 30500, endMs: 33000 },
      { text: 'A la izquierda: el flujo clasico. Cinco a siete dias por feature.', startMs: 33500, endMs: 39000 },
      { text: 'A la derecha: Spec-Driven. El spec SE convierte en la implementacion.', startMs: 39500, endMs: 45000 },
      { text: 'La diferencia no es de velocidad. Es de estructura mental.', startMs: 45500, endMs: 51000 },
      { text: 'El spec bien escrito ya es codigo. Solo falta ejecutarlo.', startMs: 51500, endMs: 54500 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ACT 2 — ANATOMIA DE UN SPEC (1:55 – 4:00)
  // ══════════════════════════════════════════════════════

  {
    id: 'what-is-spec',
    name: 'Que es un Spec?',
    startMs: 55000,
    endMs: 90000,
    type: 'concept',
    content: {
      tag: 'Act 2 — Anatomia de un Spec',
      title: 'Que convierte un requisito en un Spec?',
      body: 'Un requisito vago es una fuente de ambiguedad.\nUn Spec es un requisito que puede ejecutarse directamente.\n\nRequisito vago:\n  "Necesitamos un dashboard para ver las ventas"\n\nSpec ejecutable:\n  "Dashboard con grafico de barras de ventas mensuales,\n   filtro por periodo (7d/30d/90d), tabla de top 10 productos\n   por revenue, y KPI cards para: total ventas, ticket medio,\n   tasa de conversion. Datos en tiempo real via /api/analytics."\n\nUn buen Spec responde: Que datos? Que interacciones? Que limites?',
      highlight: 'Un Spec es un requisito que puede ejecutarse directamente.',
      points: [
        'Define datos concretos (no "informacion de usuario")',
        'Especifica interacciones (filtros, acciones, estados)',
        'Indica fuente de datos (/api/..., tabla DB, etc.)',
        'Describe estados edge: vacio, error, cargando',
      ],
    },
    subtitles: [
      { text: 'Que diferencia un requisito de un Spec?', startMs: 55500, endMs: 59000 },
      { text: 'Un requisito describe intencion. Un Spec describe implementacion.', startMs: 59500, endMs: 65000 },
      { text: 'La precision es la clave. Datos concretos, no abstracciones.', startMs: 65500, endMs: 71000 },
      { text: 'Un buen Spec responde: Que datos? Que interacciones? Que limites?', startMs: 71500, endMs: 78000 },
      { text: 'Si puedes leerlo y ya sabes exactamente que construir, es un Spec.', startMs: 78500, endMs: 84000 },
      { text: 'Ahora vamos a escribir uno real.', startMs: 84500, endMs: 89500 },
    ],
  },

  {
    id: 'linear-ticket',
    name: 'El ticket de Linear',
    startMs: 90000,
    endMs: 150000,
    type: 'linear',
    content: {
      ticketId: 'ECI-847',
      title: 'Dashboard de ventas — Inditex/ECI',
      project: 'ECI Platform',
      priority: 'High',
      assignee: 'v0 (AI)',
      status: 'In Progress',
      labels: ['frontend', 'dashboard', 'Q1'],
      description: '## Objetivo\nCrear un dashboard de analitica de ventas para el panel interno de ECI.\nAccesible desde /dashboard/ventas.\n\n## Datos necesarios\n- KPIs en cards superiores:\n  · Total ventas del periodo (EUR)\n  · Numero de transacciones\n  · Ticket medio (EUR)\n  · Tasa de conversion (%)\n- Grafico de lineas: evolucion de ventas por dia\n- Tabla: top 10 productos por revenue (columnas: nombre, unidades, revenue, % del total)\n- Filtro de periodo: Hoy / 7 dias / 30 dias / 90 dias\n\n## Fuente de datos\nGET /api/analytics/sales?period=30d\nRespuesta: { kpis: {...}, chart: [{date, value}], products: [...] }\n\n## Estados de UI\n- Loading: skeleton en todas las secciones\n- Error: banner con mensaje + boton reintentar\n- Empty: cuando no hay datos en el periodo\n\n## Notas de diseno\n- Usar design tokens del sistema\n- Grafico con area sombreada bajo la linea\n- Tabla paginada (10 por pagina)\n- Responsive: mobile-first, tabla con scroll horizontal en movil',
    },
    subtitles: [
      { text: 'Este es nuestro Spec real. Un ticket de Linear para ECI.', startMs: 90500, endMs: 96000 },
      { text: 'Fijate en la estructura: objetivo, datos, fuente de datos.', startMs: 96500, endMs: 103000 },
      { text: 'Especifica los estados de UI: loading, error, vacio.', startMs: 103500, endMs: 110000 },
      { text: 'La fuente de datos es concreta: endpoint, parametros, estructura.', startMs: 110500, endMs: 117000 },
      { text: 'Notas de diseno incluyen comportamiento en movil.', startMs: 117500, endMs: 124000 },
      { text: 'Este ticket ya contiene todo lo que v0 necesita para construir.', startMs: 124500, endMs: 131000 },
      { text: 'No hay ambiguedad. No hay que preguntar nada.', startMs: 131500, endMs: 137000 },
      { text: 'Asi se escribe un Spec ejecutable.', startMs: 137500, endMs: 149000 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ACT 3 — V0 INTERPRETA EL SPEC (4:00 – 5:30)
  // ══════════════════════════════════════════════════════

  {
    id: 'thinking',
    name: 'v0 lee el Spec',
    startMs: 150000,
    endMs: 200000,
    type: 'thinking',
    content: {
      tag: 'Act 3 — Interpretacion automatica',
      title: 'v0 leyendo ECI-847...',
      thoughts: [
        { ms: 0,     text: 'Leyendo ticket ECI-847...',                          done: false },
        { ms: 3000,  text: 'Objetivo: dashboard de ventas en /dashboard/ventas',  done: false },
        { ms: 7000,  text: 'Identificando componentes: KPI cards x4',             done: false },
        { ms: 11000, text: 'Identificando componentes: LineChart con area',        done: false },
        { ms: 15000, text: 'Identificando componentes: DataTable paginada',        done: false },
        { ms: 19000, text: 'Identificando componentes: FilterBar de periodos',     done: false },
        { ms: 23000, text: 'Fuente de datos: /api/analytics/sales?period=30d',     done: false },
        { ms: 27000, text: 'Estados UI: loading skeleton + error banner + empty',  done: false },
        { ms: 31000, text: 'Design tokens: primario + acento del sistema',         done: false },
        { ms: 35000, text: 'Mobile-first: tabla con scroll horizontal en movil',   done: false },
        { ms: 39000, text: 'Mapeando a: shadcn/ui + Recharts + Tailwind',          done: false },
        { ms: 43000, text: 'Plan listo. Iniciando generacion de codigo...',         done: true  },
      ],
    },
    subtitles: [
      { text: 'v0 recibe el ticket. Empieza a interpretar el Spec.', startMs: 150500, endMs: 156000 },
      { text: 'Descompone los requisitos en componentes concretos.', startMs: 156500, endMs: 163000 },
      { text: 'Identifica la fuente de datos y el contrato de la API.', startMs: 163500, endMs: 170000 },
      { text: 'Planifica los estados de UI: loading, error, empty.', startMs: 170500, endMs: 177000 },
      { text: 'Mapea los design tokens al sistema de diseno.', startMs: 177500, endMs: 184000 },
      { text: 'Todo esto ocurre en segundos. Sin una sola pregunta.', startMs: 184500, endMs: 191000 },
      { text: 'El Spec era suficientemente preciso.', startMs: 191500, endMs: 199000 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ACT 4 — GENERACION DE CODIGO (5:30 – 7:30)
  // ══════════════════════════════════════════════════════

  {
    id: 'coding-main',
    name: 'Generando codigo',
    startMs: 200000,
    endMs: 330000,
    type: 'coding',
    content: {
      tag: 'Act 4 — Generacion automatica',
      filename: 'app/dashboard/ventas/page.tsx',
      commentary: [
        { atLine: 1,   text: 'Estructura del componente principal' },
        { atLine: 15,  text: 'Hook de datos con SWR — caching automatico' },
        { atLine: 30,  text: 'Estado de loading: skeleton por seccion' },
        { atLine: 50,  text: 'KPI Cards con animacion de entrada' },
        { atLine: 75,  text: 'Recharts AreaChart con area sombreada' },
        { atLine: 110, text: 'DataTable con paginacion y sort' },
        { atLine: 145, text: 'Responsive: tabla con scroll en movil' },
      ],
      code: DASHBOARD_CODE_STRING,
    },
    subtitles: [
      { text: 'El codigo empieza a escribirse. Linea a linea.', startMs: 200500, endMs: 205000 },
      { text: 'Primero los tipos TypeScript. El Spec definia la estructura de datos.', startMs: 205500, endMs: 212000 },
      { text: 'SWR para fetching: caching automatico, revalidacion en background.', startMs: 212500, endMs: 219000 },
      { text: 'El Spec pedia loading skeleton. Aqui esta, por seccion.', startMs: 220000, endMs: 227000 },
      { text: 'El Spec pedia error banner con boton reintentar. Exactamente eso.', startMs: 228000, endMs: 235000 },
      { text: 'KPI Cards con formato de moneda espanola. El Spec especifico euros.', startMs: 236000, endMs: 243000 },
      { text: 'Recharts AreaChart con gradiente. El Spec pedia area sombreada.', startMs: 244000, endMs: 251000 },
      { text: 'Design tokens de CSS para los colores del chart. No hardcoded.', startMs: 252000, endMs: 259000 },
      { text: 'Tabla paginada. El Spec decia 10 por pagina.', startMs: 260000, endMs: 267000 },
      { text: 'Overflow-x-auto en la tabla. El Spec pedia scroll horizontal en movil.', startMs: 268000, endMs: 275000 },
      { text: 'Cada decision de codigo viene de una linea del Spec.', startMs: 276000, endMs: 283000 },
      { text: 'Esto no es magia. Es precision. El Spec era ejecutable.', startMs: 284000, endMs: 291000 },
      { text: '200 lineas de codigo limpio y production-ready.', startMs: 292000, endMs: 299000 },
      { text: 'Desde un ticket de texto.', startMs: 300000, endMs: 307000 },
      { text: 'Veamos el resultado.', startMs: 310000, endMs: 316000 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ACT 5 — EL RESULTADO (7:30 – 9:00)
  // ══════════════════════════════════════════════════════

  {
    id: 'preview',
    name: 'La UI en vivo',
    startMs: 330000,
    endMs: 450000,
    type: 'preview',
    content: {
      tag: 'Act 5 — El resultado',
    },
    subtitles: [
      { text: 'El dashboard de ECI. Funcional. Con datos. Interactivo.', startMs: 330500, endMs: 338000 },
      { text: 'KPIs, grafico, tabla. Todo lo que el Spec especifico.', startMs: 338500, endMs: 345000 },
      { text: 'Cambia el periodo. Los datos se revalidan automaticamente.', startMs: 346000, endMs: 353000 },
      { text: 'Skeleton de carga mientras espera. Error handler si falla.', startMs: 354000, endMs: 361000 },
      { text: 'Responsive. La tabla tiene scroll en movil, como el Spec indicaba.', startMs: 362000, endMs: 369000 },
      { text: 'El desarrollador ahora solo revisa y ajusta detalles finos.', startMs: 370000, endMs: 377000 },
      { text: 'No construye desde cero. Refina desde una base solida.', startMs: 378000, endMs: 385000 },
      { text: 'Ese es el cambio de paradigma.', startMs: 386000, endMs: 393000 },
      { text: 'Del developer como constructor, al developer como revisor.', startMs: 394000, endMs: 401000 },
      { text: 'Mas calidad. Menos tiempo. Menos ambiguedad.', startMs: 402000, endMs: 409000 },
      { text: 'Ahora vamos un paso mas alla.', startMs: 410000, endMs: 417000 },
      { text: 'Que pasa cuando hay un error en produccion?', startMs: 418000, endMs: 425000 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ACT 6 — SPEC-DRIVEN PARA BUGS (9:00 – 9:30)
  // ══════════════════════════════════════════════════════

  {
    id: 'error-scene',
    name: 'Error en produccion',
    startMs: 450000,
    endMs: 540000,
    type: 'error',
    content: {
      tag: 'Act 6 — El Spec como herramienta de debugging',
      sentry: {
        id: 'ECI-PROD-2291',
        title: 'TypeError: Cannot read properties of undefined (reading "totalRevenue")',
        file: 'app/dashboard/ventas/page.tsx',
        line: 112,
        occurrences: 847,
        users: 203,
        first: 'hace 2 horas',
        trace: [
          'at VentasDashboard (page.tsx:112:28)',
          'at KpiCard (page.tsx:58:14)',
          'at renderWithHooks (react-dom.development.js:14985)',
        ],
        context: 'if (data && !isLoading) {\n  // data.kpis puede ser undefined si la API devuelve {}\n  KpiCard title="Total ventas" value={fmt(data.kpis.totalRevenue)} ...',
      },
      linearFix: {
        ticketId: 'ECI-848',
        title: 'Fix: null check en data.kpis — Dashboard Ventas',
        description: '## Bug\nTypeError en VentasDashboard cuando /api/analytics/sales\ndevuelve { kpis: undefined } en vez de { kpis: null }.\n\n## Fix requerido\nAnadir optional chaining en acceso a kpis:\n  data.kpis?.totalRevenue ?? 0\n  data.kpis?.transactions ?? 0\n  data.kpis?.avgTicket ?? 0\n  data.kpis?.conversionRate ?? 0\n\nAdemas, manejar el caso data.kpis === undefined como empty state,\nno como error. Mostrar el componente Empty en lugar del ErrorBanner.\n\n## Archivos afectados\napp/dashboard/ventas/page.tsx — lineas 112-116',
      },
      fix: '// Antes (linea 112):\nKpiCard title="Total ventas" value={fmt(data.kpis.totalRevenue)}\n\n// Despues — optional chaining + fallback:\nKpiCard title="Total ventas" value={fmt(data.kpis?.totalRevenue ?? 0)}\nKpiCard title="Transacciones" value={(data.kpis?.transactions ?? 0).toLocaleString()}\nKpiCard title="Ticket medio" value={fmt(data.kpis?.avgTicket ?? 0)}\nKpiCard title="Conversion" value={(data.kpis?.conversionRate ?? 0) + "%"}\n\n// Y el empty state correcto:\n{data && !data.kpis && (\n  EmptyState mensaje="No hay datos para este periodo."\n)}',
    },
    subtitles: [
      { text: 'Error en produccion. Sentry lo detecta a los 2 minutos.', startMs: 450500, endMs: 457000 },
      { text: '847 ocurrencias. 203 usuarios afectados.', startMs: 457500, endMs: 464000 },
      { text: 'La API devuelve kpis: undefined en ciertos casos de borde.', startMs: 464500, endMs: 471000 },
      { text: 'El Spec original no especifico ese estado edge.', startMs: 471500, endMs: 478000 },
      { text: 'Leccion: un Spec completo incluye los estados de error de la API.', startMs: 478500, endMs: 485000 },
      { text: 'Se crea el ticket ECI-848 con el fix bien especificado.', startMs: 485500, endMs: 492000 },
      { text: 'Optional chaining. Fallback a cero. Empty state correcto.', startMs: 492500, endMs: 499000 },
      { text: 'El Spec del fix es tan preciso como el Spec original.', startMs: 499500, endMs: 506000 },
      { text: 'Spec-Driven no es solo para features nuevas.', startMs: 513500, endMs: 520000 },
      { text: 'Es para todo: bugs, refactors, migraciones.', startMs: 520500, endMs: 527000 },
      { text: 'El Spec es la unidad atomica de trabajo.', startMs: 527500, endMs: 534000 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ACT 7 — CIERRE (9:30 – 10:00)
  // ══════════════════════════════════════════════════════

  {
    id: 'finale',
    name: 'Cierre',
    startMs: 540000,
    endMs: 600000,
    type: 'finale',
    content: {
      title: 'Spec-Driven Development',
      summary: [
        { number: '01', label: 'El Spec es ejecutable',       body: 'No es documentacion. Es la implementacion en lenguaje natural.' },
        { number: '02', label: 'Precision > velocidad',       body: 'Un Spec bien escrito es mas rapido que cualquier shortcut.' },
        { number: '03', label: 'El dev revisa, no construye', body: 'El rol del desarrollador cambia: de implementador a revisor.' },
        { number: '04', label: 'Todo es un Spec',             body: 'Features, bugs, refactors. El flujo es siempre el mismo.' },
      ],
      cta: 'El siguiente paso: escribe tu primer Spec ejecutable.',
    },
    subtitles: [
      { text: 'Cuatro principios. Un paradigma.', startMs: 540500, endMs: 547000 },
      { text: 'El Spec no es documentacion. Es la implementacion en lenguaje natural.', startMs: 547500, endMs: 555000 },
      { text: 'La precision del Spec determina la calidad del resultado.', startMs: 555500, endMs: 563000 },
      { text: 'El rol del desarrollador no desaparece. Evoluciona.', startMs: 563500, endMs: 571000 },
      { text: 'De constructor a revisor. De implementador a arquitecto.', startMs: 571500, endMs: 579000 },
      { text: 'Spec-Driven Development.', startMs: 580000, endMs: 587000 },
      { text: 'El siguiente paso: escribe tu primer Spec ejecutable.', startMs: 587500, endMs: 597000 },
    ],
  },
]

// ─────────────────────────────────────────────
// CHAPTERS — for the navigation timeline bar
// ─────────────────────────────────────────────
export const CHAPTERS: Chapter[] = [
  { id: 'act1', label: 'El Problema',       startMs: 0 },
  { id: 'act2', label: 'Anatomia del Spec', startMs: 55000 },
  { id: 'act3', label: 'Interpretacion',    startMs: 150000 },
  { id: 'act4', label: 'Generacion',        startMs: 200000 },
  { id: 'act5', label: 'El Resultado',      startMs: 330000 },
  { id: 'act6', label: 'Debugging',         startMs: 450000 },
  { id: 'fin',  label: 'Cierre',            startMs: 540000 },
]

export const TOTAL_DURATION_MS = 600000 // 10 minutes
