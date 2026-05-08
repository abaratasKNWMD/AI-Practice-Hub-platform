const ASSETS = window.COURSE_ASSETS || {};
const LOCAL_ASSETS = {
  potentePlatform: "./assets/potente-codex-platform.png",
  multimodalReflection: "./assets/potente-multimodal-reflection.png",
  agentStandup: "./assets/potente-agent-standup.png",
  governanceConsole: "./assets/potente-governance-console.png",
  contextOverload: "./assets/potente-context-overload.png",
  memeContextSuitcase: "./assets/potente-meme-context-suitcase.png",
  memeTokenBlender: "./assets/potente-meme-token-blender.png",
  reflectionHumanGovernance: "./assets/potente-reflection-human-governance.png",
  mcpToolHub: "./assets/potente-mcp-tool-hub.png",
  labsWorkshop: "./assets/potente-labs-workshop.png",
  memeReasoningLever: "./assets/potente-meme-reasoning-lever.png",
  memePlanBeforePatch: "./assets/potente-meme-plan-before-patch.png",
  memeHandoffBaton: "./assets/potente-meme-handoff-baton.png",
  reflectionPromptInjection: "./assets/potente-reflection-prompt-injection.png",
};

const modules = [
  { id: "M0", title: "Arranque", range: "1-8" },
  { id: "M1", title: "Plataforma Codex", range: "9-17" },
  { id: "M2", title: "GPT-5.5 multimodal", range: "18-26" },
  { id: "M3", title: "Contexto y prompting", range: "27-35" },
  { id: "M4", title: "Tools, MCP y skills", range: "36-44" },
  { id: "M5", title: "Agentes y workflows", range: "45-53" },
  { id: "M6", title: "Coste, seguridad y gobierno", range: "54-62" },
  { id: "M7", title: "Labs y adopcion", range: "63-73" },
];

const sourceLinks = [
  ["Codex overview", "https://developers.openai.com/codex/overview"],
  ["Codex quickstart", "https://developers.openai.com/codex/quickstart"],
  ["Codex prompting", "https://developers.openai.com/codex/prompting"],
  ["Codex best practices", "https://developers.openai.com/codex/learn/best-practices"],
  ["Codex subagents", "https://developers.openai.com/codex/concepts/subagents"],
  ["Codex MCP", "https://developers.openai.com/codex/mcp"],
  ["Codex skills", "https://developers.openai.com/codex/skills"],
  ["Approvals and security", "https://developers.openai.com/codex/agent-approvals-security"],
  ["Codex pricing", "https://developers.openai.com/codex/pricing"],
  ["Fast mode", "https://developers.openai.com/codex/speed#fast-mode"],
  ["Config reference", "https://developers.openai.com/codex/config-reference#configtoml"],
  ["GPT-5.5 model docs", "https://developers.openai.com/api/docs/models/gpt-5.5"],
  ["Latest model guide", "https://developers.openai.com/api/docs/guides/latest-model.md"],
  ["Codex automations", "https://developers.openai.com/codex/app/automations"],
];

const slides = [
  {
    module: "M0",
    layout: "cover",
    asset: "potentePlatform",
    kicker: "Curso potente potente",
    title: "Codex: plataforma, agentes y GPT-5.5 para desarrollo real",
    lead: "Una web-deck avanzada para aterrizar Codex desde cero operativo hasta workflows de equipo, con foco en contexto, coste, permisos, modelos, MCP, skills y agentes.",
    chips: ["73 pantallas", "Notas de creador", "16:9", "Assets embebidos", "Clase avanzada"],
    minutes: 3,
    notes: [
      "Arranca dejando claro que esto no es una demo de chat: es una forma de organizar el trabajo de desarrollo alrededor de Codex.",
      "La imagen principal debe leerse como plataforma: repo, agentes, diffs, coste, herramientas y supervision humana en la misma escena.",
    ],
  },
  {
    module: "M0",
    kicker: "Mapa",
    title: "De tres cursos Copilot a un sistema Codex",
    lead: "El contenido nuevo se reorganiza en una ruta mas densa: plataforma, funciones basicas, personalizacion avanzada y operacion de agentes.",
    bullets: [
      "Core: planes, instalacion, modelos, herramientas, permisos y gestion.",
      "Feature basic: asistencia de codigo, chat, CLI, contexto, acciones y revision.",
      "Advanced: instrucciones, agentes, prompt files, MCP, workflows y estandarizacion.",
    ],
    visual: {
      type: "pipeline",
      items: [
        ["Copilot 2", "Fundamentos y administracion"],
        ["Copilot 3", "Uso diario y productividad"],
        ["Copilot 4", "Personalizacion y MCP"],
        ["Codex", "Agente de desarrollo completo"],
      ],
    },
    minutes: 2,
    notes: ["Explica que no se traduce palabra por palabra: se conserva el objetivo pedagogico y se adapta a la potencia real de Codex."],
  },
  {
    module: "M0",
    kicker: "Material base",
    title: "Que cubre esta version",
    lead: "La formacion conserva los temas de los 246 slides nuevos, pero los compacta para usuarios que ya entienden IA y quieren operar con criterio.",
    bullets: [
      "Diferencias entre asistentes, planes, instalacion, settings y politicas.",
      "Prompting, contexto, imagenes, sesiones, CLI, permisos, acciones y revision.",
      "Instrucciones, agentes custom, plantillas, MCP, herramientas externas y seguridad.",
    ],
    visual: {
      type: "cards",
      columns: 3,
      items: [
        ["83 slides", "knm-github-copilot-2-core.v1.2.pptx"],
        ["82 slides", "knm-github-copilot-3-feature-basic.v1.2.pptx"],
        ["81 slides", "knm-github-copilot-4-feature-advance-phase-1.v1.2.pptx"],
      ],
    },
    minutes: 2,
    notes: ["Usa esta pantalla para dar legitimidad al curso: viene de mucho material, pero filtrado para Codex."],
  },
  {
    module: "M0",
    kicker: "Traduccion mental",
    title: "Lo que cambia al pasar a Codex",
    lead: "Copilot enseña asistencia dentro del editor. Codex lleva esa idea a un agente que lee, edita, ejecuta, revisa y puede coordinar herramientas.",
    bullets: [
      "Autocomplete pasa a ser solo una parte del sistema de trabajo.",
      "El chat se convierte en una conversacion con estado, herramientas y evidencias.",
      "La personalizacion deja de ser cosmetica: AGENTS.md, skills, MCP y configuracion gobiernan comportamiento.",
    ],
    visual: {
      type: "compare",
      leftTitle: "Asistente clasico",
      left: ["Sugerencias locales", "Chat puntual", "Contexto manual", "Pocas acciones externas"],
      rightTitle: "Codex",
      right: ["Agente con herramientas", "Plan, ejecucion y review", "Contexto vivo del repo", "MCP, skills y automatizaciones"],
    },
    minutes: 3,
    notes: ["No critiques Copilot: presentalo como escalon. La clave es que Codex requiere mas criterio operativo."],
  },
  {
    module: "M0",
    kicker: "Idea fuerza",
    title: "Codex es un bucle de trabajo, no una caja de texto",
    lead: "La potencia aparece cuando el usuario deja de pedir respuestas sueltas y empieza a encargar trabajo verificable.",
    bullets: [
      "El modelo razona, pide contexto, llama herramientas y edita archivos.",
      "La sesion acumula decisiones, pruebas, errores, diffs y restricciones.",
      "El resultado se evalua por evidencias: tests, build, revision, estado de git y criterios de aceptacion.",
    ],
    visual: {
      type: "pipeline",
      items: [
        ["Pedir", "Objetivo y limites"],
        ["Explorar", "Repo, docs, errores"],
        ["Editar", "Parche acotado"],
        ["Verificar", "Tests y review"],
        ["Cerrar", "Resumen y siguientes pasos"],
      ],
    },
    minutes: 3,
    notes: ["Introduce el lenguaje que repetiras todo el curso: objetivo, contexto, restricciones y done when."],
  },
  {
    module: "M0",
    kicker: "Ruta",
    title: "La progresion de dominio",
    lead: "La clase avanza desde operacion basica hasta diseno de sistemas de agentes para equipos.",
    bullets: [
      "Primero se domina el entorno: apps, CLI, IDE, cloud, permisos y modelos.",
      "Despues se aprende a dirigir: prompts, contexto, plan mode, review y compaction.",
      "Por ultimo se escala: MCP, skills, automations, subagentes, gobierno y coste.",
    ],
    visual: {
      type: "ladder",
      items: [
        ["1", "Usar Codex sin romper el flujo"],
        ["2", "Dar contexto de calidad y pedir outputs verificables"],
        ["3", "Conectar herramientas internas y automatizar"],
        ["4", "Gobernar coste, seguridad y adopcion de equipo"],
      ],
    },
    minutes: 2,
    notes: ["Marca que la progresion no es tecnologica solamente; tambien es madurez de trabajo."],
  },
  {
    module: "M0",
    kicker: "Stack",
    title: "El mapa de potencia de Codex",
    lead: "Para explicar Codex sin perder a nadie, conviene verlo como capas que se refuerzan entre si.",
    bullets: [
      "Modelo: GPT-5.5 y familia de modelos con esfuerzos de razonamiento.",
      "Entorno: App, IDE, CLI y Cloud, cada uno con tradeoffs.",
      "Extensiones: tools, MCP, skills, AGENTS.md, automations y subagentes.",
    ],
    visual: {
      type: "stack",
      items: [
        ["Outcome", "Tarea real, criterio de aceptacion y evidencia"],
        ["Agent", "Planifica, ejecuta, usa herramientas y revisa"],
        ["Context", "Repo, archivos, imagenes, logs, docs y conversacion"],
        ["Controls", "Permisos, sandbox, modelos, coste y politicas"],
        ["Extensions", "MCP, skills, plugins, automations y subagentes"],
      ],
    },
    minutes: 3,
    notes: ["Si el grupo viene de Copilot, esta capa ayuda: no es una feature, es una arquitectura de trabajo."],
  },
  {
    module: "M0",
    kicker: "Contrato de aula",
    title: "Como se debe impartir este curso",
    lead: "La audiencia sabe mas, asi que la formacion tiene menos relleno y mas decisiones reales.",
    bullets: [
      "Cada concepto debe aterrizar en una decision: modelo, permiso, contexto, herramienta o coste.",
      "No basta con una demo bonita: cada bloque termina en un patron reutilizable.",
      "La sesion debe mantener conciencia de gasto y de riesgo operativo.",
    ],
    visual: {
      type: "cards",
      columns: 3,
      items: [
        ["Mostrar", "Una pantalla o flujo real"],
        ["Nombrar", "La decision tecnica que hay detras"],
        ["Practicar", "Una tarea que deje evidencia"],
      ],
    },
    minutes: 2,
    notes: ["Este slide es para el formador: no conviertas la clase en catalogo de botones; convierte cada boton en criterio."],
  },
  {
    module: "M1",
    layout: "chapter",
    chapter: "1",
    kicker: "Modulo 1",
    title: "Plataforma Codex",
    lead: "Que es, donde vive, como se instala y que controles debe conocer cualquier usuario avanzado.",
    points: ["Superficies", "Instalacion", "Configuracion", "Slash commands", "Primer workflow"],
    minutes: 2,
    notes: ["Abre el modulo con una promesa concreta: al terminar, nadie confundira Codex con un chat generico."],
  },
  {
    module: "M1",
    kicker: "Definicion",
    title: "Que es Codex",
    lead: "Codex es el agente de programacion de OpenAI para escribir, entender, revisar, depurar y automatizar tareas de desarrollo.",
    bullets: [
      "Puede trabajar con archivos del proyecto, terminal, herramientas conectadas y contexto de la sesion.",
      "Esta integrado con planes de ChatGPT y tambien puede usarse mediante API key en flujos locales.",
      "Su valor no es solo generar codigo: es cerrar tareas con verificaciones.",
    ],
    visual: {
      type: "image",
      asset: "app",
      caption: "Imagen oficial de la app Codex embebida en el curso.",
    },
    minutes: 3,
    notes: ["Define Codex con verbos de trabajo: escribir, entender, revisar, depurar, automatizar. Eso ayuda mas que listar funciones."],
  },
  {
    module: "M1",
    kicker: "Superficies",
    title: "Cuatro formas de usar Codex",
    lead: "La misma mentalidad agentica aparece en varias superficies. Elegir bien evita friccion.",
    bullets: [
      "App de escritorio: buena para trabajo local y sesiones largas.",
      "IDE extension: natural para VS Code, Cursor, Windsurf y entornos compatibles.",
      "CLI: excelente para repos, automatizacion, servidores y usuarios tecnicos.",
      "Cloud: util para delegar tareas en entornos aislados y revisar despues.",
    ],
    visual: {
      type: "cards",
      columns: 2,
      items: [
        ["App", "Sesiones locales con UI dedicada"],
        ["IDE", "Contexto de editor y archivos abiertos"],
        ["CLI", "Terminal, scripts y control fino"],
        ["Cloud", "Tareas delegadas en contenedor aislado"],
      ],
    },
    minutes: 3,
    notes: ["Pregunta al grupo donde trabaja hoy: editor, terminal, navegador o cloud. Luego conecta cada perfil con una superficie."],
  },
  {
    module: "M1",
    kicker: "Setup",
    title: "Instalacion y arranque rapido",
    lead: "El curso debe incluir los caminos oficiales para que una persona pueda probar Codex sin depender de la demo.",
    bullets: [
      "CLI: instalacion via npm o Homebrew, segun entorno.",
      "IDE: extension en editores compatibles y Agent mode como modo de trabajo.",
      "Cloud: acceso desde ChatGPT cuando aplica al plan.",
    ],
    visual: {
      type: "terminal",
      lines: [
        { text: "$ npm install -g @openai/codex", className: "ok" },
        { text: "$ codex", className: "ok" },
        { text: "# alternativa macOS", className: "muted" },
        { text: "$ brew install codex" },
        { text: "# en IDE: instalar extension Codex y abrir el proyecto" },
      ],
    },
    minutes: 3,
    notes: ["No te quedes en la instalacion. Haz que el asistente abra un repo real y ejecute una tarea pequena."],
  },
  {
    module: "M1",
    kicker: "Confianza",
    title: "Proyecto, directorio y trust model",
    lead: "Codex opera dentro de un espacio de trabajo. Entender que puede leer, escribir y ejecutar es parte del onboarding.",
    bullets: [
      "El directorio del proyecto define el contexto operativo principal.",
      "La confianza se expresa con sandbox, aprobaciones y politicas de red.",
      "En equipos conviene documentar que se permite hacer sin aprobacion y que requiere revision humana.",
    ],
    visual: {
      type: "matrix",
      items: [
        ["Leer", "Analizar archivos, logs y docs del repo.", "bajo"],
        ["Editar", "Aplicar parches dentro del workspace.", "medio"],
        ["Ejecutar", "Lanzar tests, builds y scripts.", "medio"],
        ["Red", "Salir a internet o servicios externos.", "alto"],
      ],
    },
    minutes: 4,
    notes: ["Esta pantalla crea conciencia de seguridad sin meter miedo: Codex es potente porque puede actuar."],
  },
  {
    module: "M1",
    kicker: "Config",
    title: "Configuracion por capas",
    lead: "La configuracion no es un detalle tecnico: decide modelo, razonamiento, permisos, red, tools, MCP y comportamiento.",
    bullets: [
      "Global: preferencias del usuario y defaults de trabajo.",
      "Proyecto: reglas compartidas, MCP de repo y limites concretos.",
      "Sesion: comandos slash y decisiones puntuales mientras se trabaja.",
    ],
    visual: {
      type: "stack",
      items: [
        ["Sesion", "/model, /permissions, /compact, /review"],
        ["Proyecto", ".codex/config.toml y AGENTS.md"],
        ["Usuario", "~/.codex/config.toml"],
        ["Organizacion", "Politicas, planes, modelos permitidos"],
      ],
    },
    minutes: 3,
    notes: ["Relaciona esto con settings.json de VS Code en los cursos base: aqui el equivalente es mas amplio y mas operativo."],
  },
  {
    module: "M1",
    kicker: "Identidad",
    title: "ChatGPT plan, API key y modo de uso",
    lead: "No todos los usuarios entran por el mismo camino. El origen de autenticacion afecta creditos, disponibilidad y facturacion.",
    bullets: [
      "Con ChatGPT se aprovechan planes Plus, Pro, Business, Edu o Enterprise cuando estan habilitados.",
      "Con API key se factura via API y algunos beneficios de plan pueden no aplicar igual.",
      "El curso debe ensenar a comprobar estado, modelo activo y consumo antes de tareas grandes.",
    ],
    visual: {
      type: "compare",
      leftTitle: "ChatGPT sign-in",
      left: ["Creditos de plan", "App, IDE, CLI y cloud segun disponibilidad", "Fast mode en superficies soportadas"],
      rightTitle: "API key",
      right: ["Facturacion API", "Buen encaje para automatizacion", "Control por proyecto y entorno"],
    },
    minutes: 3,
    notes: ["Esta distincion evita sorpresas de gasto. No prometas disponibilidad universal: valida siempre plan y entorno."],
  },
  {
    module: "M1",
    kicker: "Comandos",
    title: "Slash commands que hay que memorizar",
    lead: "Los comandos slash son el panel de control rapido de Codex durante una sesion.",
    bullets: [
      "/plan cambia a planificacion antes de ejecutar.",
      "/permissions ajusta sandbox y aprobaciones.",
      "/model y /fast cambian rendimiento y coste.",
      "/compact, /resume y /fork ayudan a gobernar conversaciones largas.",
    ],
    visual: {
      type: "terminal",
      lines: [
        { text: "/status        ver entorno, modelo y estado", className: "ok" },
        { text: "/model         elegir modelo" },
        { text: "/plan          pensar antes de tocar archivos" },
        { text: "/permissions   controlar acciones" },
        { text: "/review        revisar cambios" },
        { text: "/mcp           ver servidores MCP" },
        { text: "/compact       resumir contexto largo" },
      ],
    },
    minutes: 3,
    notes: ["Haz una mini demo de /status y /permissions. Son los dos comandos que mas madurez dan al usuario."],
  },
  {
    module: "M1",
    kicker: "Primer workflow",
    title: "Un flujo Codex completo en cinco movimientos",
    lead: "El usuario avanzado debe aprender una rutina repetible que funcione en repos reales.",
    bullets: [
      "Entrar con objetivo y criterios de salida.",
      "Dejar que Codex explore antes de editar.",
      "Pedir cambios acotados y revisar diff.",
      "Ejecutar verificacion y cerrar con evidencia.",
    ],
    visual: {
      type: "pipeline",
      items: [
        ["1 Objetivo", "Que hay que lograr"],
        ["2 Contexto", "Archivos y restricciones"],
        ["3 Plan", "Pasos y riesgos"],
        ["4 Patch", "Edicion minima viable"],
        ["5 Verify", "Tests, build, review"],
      ],
    },
    minutes: 4,
    notes: ["Este patron aparece despues en los labs. Si el grupo lo interioriza, el resto del curso encaja."],
  },
  {
    module: "M2",
    layout: "chapter",
    chapter: "2",
    kicker: "Modulo 2",
    title: "GPT-5.5 multimodal",
    lead: "Como elegir modelo, razonamiento y herramientas sin quemar tokens ni perder calidad.",
    points: ["GPT-5.5", "Reasoning effort", "Imagenes", "Tools", "Modelo adecuado"],
    minutes: 2,
    notes: ["Presenta GPT-5.5 como motor de trabajos dificiles, no como default automatico para todo."],
  },
  {
    module: "M2",
    kicker: "Modelo frontier",
    title: "GPT-5.5 en una frase",
    lead: "GPT-5.5 es el modelo frontier mas nuevo para trabajo profesional complejo, especialmente cuando hay codigo, herramientas y contexto largo.",
    bullets: [
      "Mejora razonamiento eficiente y precision en uso de herramientas.",
      "Funciona bien en tareas de coding agent, asistentes grounded y retrieval con contexto largo.",
      "Admite razonamiento configurable: none, low, medium, high y xhigh segun superficie y API.",
    ],
    visual: {
      type: "cards",
      columns: 3,
      items: [
        ["Coding", "Planificar, editar, verificar y explicar"],
        ["Tools", "Llamadas precisas a herramientas hospedadas o externas"],
        ["Long context", "Mantener especificaciones, repo y evidencia"],
      ],
    },
    minutes: 4,
    notes: ["Di explicitamente que el mejor modelo no siempre es el mas rentable para cada subtarea."],
  },
  {
    module: "M2",
    kicker: "Familia",
    title: "No todo tiene que ir con el modelo mas grande",
    lead: "Una operacion madura usa modelos como recursos: potencia cuando hace falta, velocidad y coste bajo cuando la tarea es ligera.",
    bullets: [
      "GPT-5.5: tareas complejas, especificaciones largas, agentes exigentes y depuracion dificil.",
      "GPT-5.4: buena opcion general si se quiere equilibrio.",
      "GPT-5.4-mini: exploracion ligera, resumentes, tareas rapidas o coste contenido.",
      "GPT-5.3-Codex: flujos de coding donde este habilitado y tenga encaje.",
    ],
    visual: {
      type: "matrix",
      items: [
        ["Maxima dificultad", "GPT-5.5 con high o xhigh.", "alto"],
        ["Trabajo diario", "GPT-5.4 o GPT-5.5 medium.", "medio"],
        ["Lectura rapida", "GPT-5.4-mini para ahorrar.", "bajo"],
        ["Review concreta", "Modelo de review configurado.", "medio"],
      ],
    },
    minutes: 4,
    notes: ["Conecta con los cursos base sobre cuotas: aqui la habilidad es elegir modelo con intencion."],
  },
  {
    module: "M2",
    kicker: "Reasoning",
    title: "Reasoning effort: la palanca invisible",
    lead: "El esfuerzo de razonamiento controla cuanto piensa el modelo antes de responder o actuar.",
    bullets: [
      "Low: cambios bien definidos, tareas repetitivas o lectura ligera.",
      "Medium: default razonable para trabajo cotidiano.",
      "High: debugging, arquitectura, migraciones o ambiguedad real.",
      "Xhigh: tareas largas, agenticas y de alto riesgo donde el coste se justifica.",
    ],
    visual: {
      type: "image",
      asset: "memeReasoningLever",
      caption: "Imagen con gracia: la palanca de reasoning no se sube por orgullo; se ajusta segun riesgo, ambiguedad y coste de error.",
      variant: "humor",
    },
    minutes: 4,
    notes: [
      "Pide ejemplos al grupo y clasificalos en vivo. Es una forma simple de crear criterio de coste.",
      "Remate de la imagen: una tarea pequena no necesita reactor nuclear; una migracion critica si merece mas pensamiento.",
    ],
  },
  {
    module: "M2",
    kicker: "Multimodal",
    title: "Multimodalidad: no solo texto",
    lead: "Codex puede usar imagenes, capturas, disenos, errores visuales y referencias de UI como parte del contexto.",
    bullets: [
      "Las imagenes sirven para depurar frontends, contrastar implementacion con diseno y explicar errores visuales.",
      "GPT-5.5 conserva mas detalle por defecto en entradas de imagen, segun la guia oficial de modelos recientes.",
      "La clave es describir que debe extraer de la imagen: layout, fallo, texto, estado, contraste o comportamiento.",
    ],
    visual: {
      type: "image",
      asset: "multimodalReflection",
      caption: "Imagen de reflexion: captura, codigo, tests y diseno compiten por atencion y tokens.",
      variant: "reflection",
    },
    minutes: 4,
    notes: [
      "Trae una captura real si puedes. La multimodalidad se entiende al verla resolver un bug de interfaz.",
      "Usa la imagen para insistir en que una captura sola no es briefing: hay que decir que mirar, que no tocar y como verificar.",
    ],
  },
  {
    module: "M2",
    kicker: "Vision aplicada",
    title: "Como pedir trabajo con imagenes",
    lead: "Una imagen sin instruccion consume contexto y puede dispersar. Una imagen con criterio acelera mucho.",
    bullets: [
      "Nombra la fuente: captura de produccion, Figma, error visual, dashboard o consola.",
      "Indica que no debe cambiar: responsive, color, copy, jerarquia, accesibilidad o flujo.",
      "Pide evidencia: screenshot, canvas check, test visual o comparacion antes/despues.",
    ],
    visual: {
      type: "cards",
      columns: 2,
      items: [
        ["Mal prompt", "Arregla esta pantalla."],
        ["Buen prompt", "Compara esta captura con el componente Header.tsx y corrige alineacion sin cambiar copy."],
        ["Mal contexto", "Solo imagen, sin repo ni ruta."],
        ["Buen contexto", "Imagen + archivos + criterio + verificacion."],
      ],
    },
    minutes: 3,
    notes: ["Subraya que la imagen no sustituye el contexto tecnico. Es una pieza mas del brief."],
  },
  {
    module: "M2",
    kicker: "Tools",
    title: "GPT-5.5 y el menu de herramientas",
    lead: "El modelo puede coordinar herramientas como busqueda, archivos, shell, patch, skills, MCP, computer use e image generation cuando la superficie lo permite.",
    bullets: [
      "En Codex, lo importante es la combinacion modelo + herramienta + permiso.",
      "Una tool reduce alucinacion cuando trae datos reales o ejecuta verificacion.",
      "Cada tool tiene coste, latencia y riesgo; no se activan por capricho.",
    ],
    visual: {
      type: "cards",
      columns: 3,
      items: [
        ["apply_patch", "Editar archivos con diff controlado"],
        ["hosted shell", "Ejecutar pruebas y comandos"],
        ["MCP", "Conectar servicios y contexto externo"],
        ["skills", "Cargar procedimientos expertos"],
        ["file search", "Recuperar documentos"],
        ["computer use", "Operar interfaces cuando aplica"],
      ],
    },
    minutes: 4,
    notes: ["Esta es una buena pantalla para separar modelo de producto: la inteligencia sola no basta; necesita herramientas bien gobernadas."],
  },
  {
    module: "M2",
    kicker: "Contexto largo",
    title: "Contexto largo no significa barra libre",
    lead: "GPT-5.5 esta pensado para contextos largos, pero el gasto crece con tokens, herramientas, razonamiento y conversaciones acumuladas.",
    bullets: [
      "Prompt caching premia colocar instrucciones estables al principio y datos variables al final.",
      "Las conversaciones largas necesitan compaction para evitar ruido y perdida de foco.",
      "Para prompts muy grandes, la documentacion oficial avisa de multiplicadores de coste en GPT-5.5.",
    ],
    visual: {
      type: "cost",
      items: [
        ["Instrucciones estables", 30, "cacheables"],
        ["Repo y docs", 62, "utiles si se citan"],
        ["Logs grandes", 78, "filtrar antes"],
        ["Imagenes sin criterio", 88, "caras y ruidosas"],
      ],
    },
    minutes: 4,
    notes: ["Vuelve a la idea de conciencia de gasto: contexto es presupuesto. Hay que invertirlo donde reduce incertidumbre."],
  },
  {
    module: "M2",
    kicker: "Decision",
    title: "Regla practica para elegir modelo",
    lead: "El usuario experto no pregunta solo 'cual es mejor', pregunta 'que coste tiene acertar y que coste tiene equivocarse'.",
    bullets: [
      "Si toca dinero, seguridad, arquitectura o migracion: sube modelo y reasoning.",
      "Si es exploracion, resumen o busqueda mecanica: baja modelo o divide.",
      "Si hay muchas herramientas o contexto cruzado: prioriza GPT-5.5 por coordinacion.",
    ],
    visual: {
      type: "pipeline",
      items: [
        ["Riesgo", "Bajo, medio, alto"],
        ["Contexto", "Corto o largo"],
        ["Herramientas", "Ninguna, pocas, muchas"],
        ["Verificacion", "Manual o automatica"],
        ["Modelo", "Elegir con criterio"],
      ],
    },
    minutes: 3,
    notes: ["Haz que el grupo clasifique tres tareas de su dia a dia. Es mas util que memorizar una tabla."],
  },
  {
    module: "M3",
    layout: "chapter",
    chapter: "3",
    kicker: "Modulo 3",
    title: "Contexto y prompting",
    lead: "Como hablar con Codex para que actue como agente de desarrollo y no como generador de ocurrencias.",
    points: ["Brief", "Archivos", "Imagenes", "Plan mode", "Review loop"],
    minutes: 2,
    notes: ["Este modulo es el corazon pedagogico: si mejora el prompt, mejora todo el sistema."],
  },
  {
    module: "M3",
    kicker: "Context engineering",
    title: "Contexto no es escribir mas",
    lead: "Context engineering es seleccionar la informacion que cambia la decision del agente.",
    bullets: [
      "Archivos correctos valen mas que parrafos genericos.",
      "Un error reproducible vale mas que una descripcion vaga.",
      "Un criterio de aceptacion claro vale mas que 'hazlo mejor'.",
    ],
    visual: {
      type: "cards",
      columns: 3,
      items: [
        ["Relevancia", "Lo que afecta al cambio"],
        ["Evidencia", "Logs, tests, screenshots, diffs"],
        ["Restricciones", "Lo que no debe tocarse"],
      ],
    },
    minutes: 3,
    notes: ["Usa ejemplos del repo real: una ruta concreta suele ser mejor que explicar toda la aplicacion."],
  },
  {
    module: "M3",
    kicker: "Brief minimo",
    title: "El canvas de prompt para Codex",
    lead: "Las mejores instrucciones tienen cuatro piezas. La documentacion oficial las resume como Goal, Context, Constraints y Done when.",
    bullets: [
      "Goal: que hay que conseguir en lenguaje de negocio o tecnico.",
      "Context: archivos, errores, decisiones anteriores, imagenes o docs.",
      "Constraints: limites de alcance, estilo, seguridad, compatibilidad y coste.",
      "Done when: tests, build, diff, screenshot, review o estado final.",
    ],
    visual: {
      type: "cards",
      columns: 2,
      items: [
        ["Goal", "Implementa busqueda por estado en la tabla de pedidos."],
        ["Context", "Mira OrdersTable.tsx, useOrders.ts y este error de consola."],
        ["Constraints", "No cambies API publica ni estilos globales."],
        ["Done when", "Tests pasan y el filtro funciona en desktop y mobile."],
      ],
    },
    minutes: 4,
    notes: ["Esta diapositiva debe convertirse en habito. Puedes pedir que todos reformulen un prompt malo usando este canvas."],
  },
  {
    module: "M3",
    kicker: "Referencias",
    title: "Archivos abiertos, menciones y contexto implicito",
    lead: "Codex puede recibir contexto desde seleccion, archivos abiertos, referencias explicitas, imagenes y herramientas.",
    bullets: [
      "En IDE, archivos abiertos y seleccion ayudan a orientar la tarea.",
      "En CLI, usa referencias claras a rutas y pide que explore antes de editar.",
      "En sesiones largas, resume decisiones y evita mezclar objetivos incompatibles.",
    ],
    visual: {
      type: "pipeline",
      items: [
        ["Seleccion", "Fragmento concreto"],
        ["Rutas", "Archivos relevantes"],
        ["Imagen", "UI o error visual"],
        ["Docs", "Reglas externas"],
        ["Prompt", "Objetivo final"],
      ],
    },
    minutes: 3,
    notes: ["Conecta con variables y participantes de Copilot: aqui el equivalente practico es dar referencias explicitas y controladas."],
  },
  {
    module: "M3",
    kicker: "Exploracion",
    title: "Indexar mentalmente antes de editar",
    lead: "Una mala sesion empieza editando demasiado pronto. Una buena sesion empieza entendiendo la forma del repo.",
    bullets: [
      "Pide a Codex que localice puntos de entrada, tests, convenciones y riesgos.",
      "Haz que cite rutas concretas antes de proponer cambios.",
      "Si el repo es grande, divide por dominio: frontend, backend, datos, CI, seguridad.",
    ],
    visual: {
      type: "lab",
      items: [
        ["Paso 1", "Encuentra archivos responsables de la pantalla o feature."],
        ["Paso 2", "Resume dependencias y contratos publicos."],
        ["Paso 3", "Propone plan con archivos a tocar y pruebas."],
        ["Paso 4", "Edita solo despues del OK o cuando el encargo lo permita."],
      ],
    },
    minutes: 4,
    notes: ["Si el usuario pide ir rapido, explica que una exploracion corta ahorra iteraciones caras."],
  },
  {
    module: "M3",
    kicker: "Sesiones",
    title: "Gestionar conversaciones largas",
    lead: "La conversacion tambien es un recurso. Si se llena de ruido, el agente pierde precision y gasta mas.",
    bullets: [
      "/compact conserva lo importante y reduce historia acumulada.",
      "/resume permite volver a hilos anteriores sin reconstruir todo.",
      "/fork crea una rama conversacional para explorar sin contaminar la linea principal.",
    ],
    visual: {
      type: "stack",
      items: [
        ["Thread", "Historia completa de trabajo"],
        ["Compact", "Resumen operacional para seguir"],
        ["Fork", "Exploracion alternativa"],
        ["Resume", "Continuidad entre sesiones"],
      ],
    },
    minutes: 3,
    notes: ["Menciona context rot de forma sencilla: mas historia no siempre significa mas inteligencia."],
  },
  {
    module: "M3",
    kicker: "Plan mode",
    title: "Plan antes de parche",
    lead: "Plan mode es el freno inteligente para tareas ambiguas, grandes o con riesgo.",
    bullets: [
      "Permite acordar alcance antes de tocar archivos.",
      "Hace visibles supuestos, riesgos, archivos y pruebas.",
      "Reduce cambios innecesarios y facilita delegar o partir tareas.",
    ],
    visual: {
      type: "image",
      asset: "memePlanBeforePatch",
      caption: "Meme visual: antes de poner el parche gigante, Codex debe mirar el mapa, el alcance y la verificacion.",
      variant: "humor",
    },
    minutes: 3,
    notes: [
      "Recomienda plan mode cuando haya arquitectura, migracion o duda. Para tareas triviales puede ser excesivo.",
      "Remate de la imagen: el parche rapido calma la ansiedad, pero el plan evita tres vueltas de diff.",
    ],
  },
  {
    module: "M3",
    kicker: "Review loop",
    title: "El cierre no es la respuesta, es la evidencia",
    lead: "Codex debe terminar mostrando que el cambio funciona o explicando que no pudo verificar.",
    bullets: [
      "Diff acotado: que se toco y por que.",
      "Verificacion: tests, build, linter, screenshot o reproduccion manual.",
      "Riesgo residual: que queda sin cubrir y que revisaria un humano.",
    ],
    visual: {
      type: "pipeline",
      items: [
        ["Diff", "Cambios visibles"],
        ["Test", "Ejecucion real"],
        ["Review", "Bugs y riesgos"],
        ["Summary", "Cierre accionable"],
      ],
    },
    minutes: 3,
    notes: ["Entrena al usuario a pedir 'no me digas que esta; muestrame evidencia'. Esto cambia el nivel del curso."],
  },
  {
    module: "M3",
    kicker: "Antipatrones",
    title: "Errores de contexto que salen caros",
    lead: "Muchos problemas atribuidos al modelo son en realidad problemas de encargo.",
    bullets: [
      "Pedir 'refactoriza todo' sin alcance ni tests.",
      "Pegar logs enormes sin filtrar el error relevante.",
      "Mezclar bugs, features y decisiones de producto en una sola sesion.",
      "No declarar restricciones de seguridad, estilo o compatibilidad.",
    ],
    visual: {
      type: "image",
      asset: "memeContextSuitcase",
      caption: "Meme visual: una nota precisa gana a una maleta de contexto sin filtrar.",
      variant: "humor",
    },
    minutes: 3,
    notes: [
      "No lo plantees como culpa del usuario. Plantealo como una tecnica que se aprende.",
      "Usa la imagen para hacer reir un poco: el problema no es que Codex sea caro, es pedirle que encuentre una aguja dentro de una mudanza entera.",
      "Remate posible: 'Codex puede con la maleta, pero tu presupuesto prefiere la nota amarilla'.",
    ],
  },
  {
    module: "M4",
    layout: "chapter",
    chapter: "4",
    kicker: "Modulo 4",
    title: "Tools, MCP y skills",
    lead: "Como extender Codex con herramientas, instrucciones reutilizables y contexto empresarial.",
    points: ["Tools", "MCP", "Skills", "AGENTS.md", "Plantillas"],
    minutes: 2,
    notes: ["Este modulo traduce la personalizacion avanzada de los cursos base al mundo Codex."],
  },
  {
    module: "M4",
    kicker: "Tool",
    title: "Que es una herramienta para Codex",
    lead: "Una tool es una capacidad que el agente puede invocar para observar, actuar o verificar.",
    bullets: [
      "Leer archivos, buscar docs, ejecutar tests, editar con patch o consultar un sistema externo.",
      "La tool aporta verdad operacional: no solo opinion del modelo.",
      "La gobernanza decide cuando se puede usar y con que aprobaciones.",
    ],
    visual: {
      type: "pipeline",
      items: [
        ["Modelo", "Decide que necesita"],
        ["Tool", "Obtiene dato o actua"],
        ["Resultado", "Vuelve al contexto"],
        ["Siguiente paso", "Razonamiento informado"],
      ],
    },
    minutes: 3,
    notes: ["Usa una frase simple: las tools son los sentidos y manos del agente."],
  },
  {
    module: "M4",
    kicker: "MCP",
    title: "MCP: el enchufe de herramientas y contexto",
    lead: "Model Context Protocol permite conectar Codex con servidores que exponen herramientas, recursos y flujos externos.",
    bullets: [
      "Puede funcionar por STDIO o HTTP streamable con autenticacion.",
      "Se configura globalmente o por proyecto en config.toml.",
      "Ejemplos utiles: docs internas, GitHub, Sentry, Figma, navegadores, bases de conocimiento o catalogos Docker.",
    ],
    visual: {
      type: "image",
      asset: "mcpToolHub",
      caption: "Imagen primaria: MCP convierte sistemas externos en herramientas gobernadas para Codex.",
      variant: "mcp",
    },
    minutes: 4,
    notes: [
      "Conecta con los ejemplos de Atlassian y Docker del curso base: MCP es el patron, no una integracion puntual.",
      "Explica que el valor no es enchufar por enchufar: el valor esta en permisos, contexto fiable y trazabilidad de cada herramienta.",
    ],
  },
  {
    module: "M4",
    kicker: "Config MCP",
    title: "Como se ve un MCP en configuracion",
    lead: "El formador debe mostrar una configuracion real, aunque sea minima, para que deje de parecer magia.",
    bullets: [
      "Define comando, argumentos, variables de entorno y timeouts.",
      "Limita tools con enabled_tools o disabled_tools si hace falta.",
      "Documenta para que sirve y que datos puede exponer.",
    ],
    visual: {
      type: "terminal",
      lines: [
        { text: "[mcp_servers.docs]", className: "ok" },
        { text: 'command = "npx"' },
        { text: 'args = ["-y", "some-docs-mcp"]' },
        { text: 'startup_timeout_sec = 20' },
        { text: 'tool_timeout_sec = 60' },
        { text: 'enabled_tools = ["search", "fetch"]', className: "warn" },
      ],
    },
    minutes: 4,
    notes: ["Aclara que el snippet es didactico. En una empresa hay secretos, permisos y revision de seguridad."],
  },
  {
    module: "M4",
    kicker: "Skills",
    title: "Skills: conocimiento empaquetado",
    lead: "Una skill guarda instrucciones, scripts, referencias y assets para tareas repetibles.",
    bullets: [
      "Codex carga primero nombre, descripcion y ruta; despues abre SKILL.md solo si aplica.",
      "Sirve para workflows especializados: docs, presentaciones, testing, release notes, estilos internos.",
      "Puede vivir en repo, usuario, admin o plugin segun alcance.",
    ],
    visual: {
      type: "cards",
      columns: 2,
      items: [
        ["SKILL.md", "Instrucciones concretas y triggers"],
        ["scripts", "Automatizacion reutilizable"],
        ["references", "Docs largas bajo demanda"],
        ["assets", "Plantillas e imagenes"],
      ],
    },
    minutes: 4,
    notes: ["Diferencia skill de prompt file: la skill puede incluir procedimiento y recursos, no solo texto reusable."],
  },
  {
    module: "M4",
    kicker: "AGENTS.md",
    title: "AGENTS.md: la memoria operacional del repo",
    lead: "AGENTS.md permite dar instrucciones persistentes al agente sobre como trabajar en el proyecto.",
    bullets: [
      "Convenciones de testing, estilo, estructura, comandos y criterios de PR.",
      "Puede existir a distintos niveles para aplicar reglas segun carpeta.",
      "Debe ser concreto, actualizado y verificable: menos filosofia, mas instrucciones accionables.",
    ],
    visual: {
      type: "stack",
      items: [
        ["Repo", "Reglas generales del proyecto"],
        ["Frontend", "Design system, accesibilidad, screenshots"],
        ["Backend", "Migraciones, contratos, pruebas"],
        ["Docs", "Estilo, formato, fuentes"],
      ],
    },
    minutes: 4,
    notes: ["Relaciona AGENTS.md con custom instructions de los cursos base: aqui se vuelve versionable y compartible."],
  },
  {
    module: "M4",
    kicker: "Prompt files",
    title: "Plantillas de prompt y workflows",
    lead: "Las plantillas convierten buenas instrucciones en habitos compartidos.",
    bullets: [
      "Sirven para repeticion: review de PR, bug triage, migracion, release notes, documentacion.",
      "Deben incluir variables, herramientas esperadas, nivel de detalle y criterios de salida.",
      "El objetivo es que el equipo no reinvente el prompt cada dia.",
    ],
    visual: {
      type: "cards",
      columns: 3,
      items: [
        ["Bug triage", "Reproducir, aislar, patch, test"],
        ["PR review", "Riesgos, regresiones, tests faltantes"],
        ["Migration", "Plan, fases, compatibilidad"],
        ["Docs", "Fuente, resumen, ejemplos"],
        ["Release", "Cambios, impacto, rollback"],
        ["Onboarding", "Mapa de repo y comandos"],
      ],
    },
    minutes: 3,
    notes: ["Puedes proponer que cada equipo salga con tres plantillas: bug, review y feature."],
  },
  {
    module: "M4",
    kicker: "Hosted tools",
    title: "Herramientas hospedadas y externas",
    lead: "Codex puede apoyarse en herramientas hospedadas por la plataforma y en herramientas externas expuestas por MCP.",
    bullets: [
      "Hosted shell y apply_patch son esenciales para el ciclo de codigo.",
      "Web search y file search aportan grounding cuando se usan con fuentes adecuadas.",
      "Computer use e image generation pertenecen a flujos mas especificos y deben justificarse.",
    ],
    visual: {
      type: "cards",
      columns: 3,
      items: [
        ["Shell", "Pruebas, build, inspeccion"],
        ["Patch", "Edicion controlada"],
        ["Search", "Docs actuales y fuentes"],
        ["File search", "Conocimiento documental"],
        ["Computer use", "Interfaces visuales"],
        ["Image generation", "Assets y material visual"],
      ],
    },
    minutes: 3,
    notes: ["Insiste en que no todas las herramientas son para todos los cursos. Aqui queremos criterio."],
  },
  {
    module: "M4",
    kicker: "Diseno",
    title: "Herramientas con permisos bien pensados",
    lead: "Una herramienta poderosa mal delimitada convierte una demo en riesgo operacional.",
    bullets: [
      "Minimiza alcance: expone solo las operaciones necesarias.",
      "Separa lectura, escritura, acciones destructivas y red.",
      "Registra evidencia: que se consulto, que se cambio y con que autorizacion.",
    ],
    visual: {
      type: "matrix",
      items: [
        ["Read-only", "Ideal para docs, issues y contexto.", "bajo"],
        ["Workspace write", "Bueno para codigo con tests.", "medio"],
        ["External write", "Requiere aprobacion y trazabilidad.", "alto"],
        ["Secrets/network", "Debe tener politica explicita.", "alto"],
      ],
    },
    minutes: 4,
    notes: ["Este slide es perfecto para perfiles de seguridad o platform engineering."],
  },
  {
    module: "M5",
    layout: "chapter",
    chapter: "5",
    kicker: "Modulo 5",
    title: "Agentes y workflows",
    lead: "Como usar Codex para coordinar trabajo, paralelizar exploracion y convertir tareas en sistemas repetibles.",
    points: ["Bucle agentico", "Local vs cloud", "Subagentes", "Automations", "PR review"],
    minutes: 2,
    notes: ["A partir de aqui el usuario deja de pensar en prompts y empieza a pensar en operacion."],
  },
  {
    module: "M5",
    kicker: "Bucle interno",
    title: "Como trabaja un agente Codex",
    lead: "Codex alterna razonamiento, lectura de contexto, uso de herramientas, edicion y verificacion.",
    bullets: [
      "Cada accion deja rastro en la sesion: comandos, errores, patches y resultados.",
      "El agente puede descubrir que necesita mas contexto antes de responder.",
      "El usuario dirige prioridad, alcance, permisos y criterio de finalizacion.",
    ],
    visual: {
      type: "pipeline",
      items: [
        ["Think", "Razonar"],
        ["Read", "Inspeccionar"],
        ["Act", "Tool o patch"],
        ["Check", "Verificar"],
        ["Report", "Cerrar"],
      ],
    },
    minutes: 3,
    notes: ["Explica que un buen usuario no micromaneja cada linea, pero si controla la direccion y la evidencia."],
  },
  {
    module: "M5",
    kicker: "Entornos",
    title: "Local, IDE, CLI y Cloud no son lo mismo",
    lead: "El workflow cambia segun donde vive el agente y que acceso tiene.",
    bullets: [
      "Local: acceso directo a workspace y entorno del usuario.",
      "IDE: contexto de editor, seleccion y feedback visual rapido.",
      "CLI: potente para usuarios tecnicos, scripts y automatizacion.",
      "Cloud: delegacion en contenedores aislados con setup controlado.",
    ],
    visual: {
      type: "compare",
      leftTitle: "Local / IDE / CLI",
      left: ["Rapido para iterar", "Ve el workspace", "Depende del entorno local"],
      rightTitle: "Cloud",
      right: ["Aislamiento", "Delegacion asincrona", "Setup y secretos con reglas claras"],
    },
    minutes: 4,
    notes: ["No vendas cloud como sustituto universal. Presentalo como otra herramienta de delegacion."],
  },
  {
    module: "M5",
    kicker: "Subagentes",
    title: "Paralelizar sin romper el contexto",
    lead: "Los subagentes permiten separar investigaciones o tareas acotadas en paralelo, evitando contaminar la conversacion principal.",
    bullets: [
      "Son utiles para exploracion read-heavy, analisis de logs, tests o preguntas independientes.",
      "Consumen mas tokens y deben usarse con subtareas concretas.",
      "No conviene delegar el trabajo que bloquea el siguiente paso inmediato.",
    ],
    visual: {
      type: "image",
      asset: "agentStandup",
      caption: "Imagen con humor: muchos agentes sin ownership claro discuten; el orquestador convierte ruido en checklist.",
      variant: "humor",
    },
    minutes: 4,
    notes: [
      "Da un ejemplo: mientras el agente principal implementa, otro puede revisar logs o buscar docs. Pero solo si el usuario lo pide.",
      "La imagen hace gracia, pero el mensaje es serio: si no hay ownership, stop condition y merge de hallazgos, paralelizar solo multiplica ruido.",
    ],
  },
  {
    module: "M5",
    kicker: "Especialistas",
    title: "Handoffs entre agentes especialistas",
    lead: "Igual que en los cursos base se hablaba de agentes personalizados, en Codex conviene definir roles operativos claros.",
    bullets: [
      "Explorer: responder preguntas concretas del codebase.",
      "Worker: modificar archivos dentro de un alcance asignado.",
      "Reviewer: buscar regresiones, riesgos y tests faltantes.",
    ],
    visual: {
      type: "image",
      asset: "memeHandoffBaton",
      caption: "Meme visual: un buen handoff pasa el testigo correcto, no toda la maleta de contexto.",
      variant: "humor",
    },
    minutes: 3,
    notes: [
      "Recalca que el rol no es teatro. Sirve para controlar ownership, conflicto y coste.",
      "Remate de la imagen: handoff no es reenviar el chat entero; es pasar objetivo, evidencia, limites y salida esperada.",
    ],
  },
  {
    module: "M5",
    kicker: "Automations",
    title: "Automatizaciones: Codex recurrente",
    lead: "Las automations permiten ejecutar tareas recurrentes en segundo plano con prompts probados.",
    bullets: [
      "Sirven para revisiones periodicas, actualizacion de docs, checks de salud o briefs recurrentes.",
      "Deben probarse manualmente antes de programarse.",
      "Heredan implicaciones de sandbox, permisos y acceso al proyecto.",
    ],
    visual: {
      type: "image",
      asset: "automations",
      caption: "Imagen oficial de Codex automations.",
    },
    minutes: 4,
    notes: ["Plantea automatizaciones como 'procedimientos que ya funcionan', no como prompts experimentales programados."],
  },
  {
    module: "M5",
    kicker: "Version control",
    title: "Checkpoints, worktrees y ramas",
    lead: "El control de versiones es el cinturon de seguridad de los agentes.",
    bullets: [
      "Usa git para aislar trabajo, revisar diffs y revertir con criterio humano.",
      "Cloud y tareas paralelas encajan mejor con ramas o worktrees bien nombrados.",
      "Pedir resumen de cambios no sustituye revisar el diff.",
    ],
    visual: {
      type: "cards",
      columns: 3,
      items: [
        ["Checkpoint", "Estado conocido antes de cambios"],
        ["Branch", "Aislar una tarea"],
        ["Worktree", "Paralelizar sin pisarse"],
        ["Diff", "Revision real"],
        ["Commit", "Cierre intencional"],
        ["PR", "Control de calidad"],
      ],
    },
    minutes: 3,
    notes: ["Este slide aterriza la potencia: cuanto mas capaz el agente, mas importa el control de cambios."],
  },
  {
    module: "M5",
    kicker: "Debug",
    title: "Debug agentico",
    lead: "Depurar con Codex no es pedir una causa probable: es hacer que reproduzca, aisle, cambie y verifique.",
    bullets: [
      "Empieza por reproduccion: comando, input, captura o test fallido.",
      "Pide hipotesis con evidencias, no conjeturas largas.",
      "Cierra con una prueba que falle antes y pase despues cuando sea posible.",
    ],
    visual: {
      type: "ladder",
      items: [
        ["Repro", "El fallo existe y se puede ver"],
        ["Trace", "Rutas, logs y contratos"],
        ["Hypothesis", "Causa probable con evidencia"],
        ["Patch", "Cambio minimo"],
        ["Verify", "Test o comprobacion"],
      ],
    },
    minutes: 4,
    notes: ["Esta pantalla conecta con code assistance basica, pero sube el nivel a investigacion verificable."],
  },
  {
    module: "M5",
    kicker: "Review",
    title: "PR review con Codex",
    lead: "La revision asistida vale cuando prioriza bugs, riesgos, regresiones y tests faltantes.",
    bullets: [
      "Pide hallazgos ordenados por severidad y con referencias de archivo.",
      "Incluye contexto de negocio, areas sensibles y convenciones del repo.",
      "Diferencia resumen de cambios de revision critica.",
    ],
    visual: {
      type: "pipeline",
      items: [
        ["Diff", "Cambios del PR"],
        ["Rules", "AGENTS.md y guia"],
        ["Risk", "Bugs y regresiones"],
        ["Tests", "Cobertura faltante"],
        ["Action", "Comentarios o patch"],
      ],
    },
    minutes: 4,
    notes: ["Di que una buena review no aplaude el codigo: busca lo que puede fallar."],
  },
  {
    module: "M6",
    layout: "chapter",
    chapter: "6",
    kicker: "Modulo 6",
    title: "Coste, seguridad y gobierno",
    lead: "La potencia de Codex solo escala si el equipo entiende tokens, creditos, sandbox, aprobaciones y politicas.",
    points: ["Sandbox", "Approvals", "Red", "Coste", "Gobierno"],
    minutes: 2,
    notes: ["Presenta este bloque como habilitador, no como burocracia."],
  },
  {
    module: "M6",
    kicker: "Riesgo",
    title: "Modelo de riesgo operativo",
    lead: "Toda accion de Codex debe poder clasificarse por impacto y reversibilidad.",
    bullets: [
      "Leer suele ser bajo riesgo, salvo secretos o datos sensibles.",
      "Escribir en workspace es razonable con git y tests.",
      "Red, secretos, produccion y acciones externas elevan el riesgo.",
    ],
    visual: {
      type: "matrix",
      items: [
        ["Leer codigo", "Bajo riesgo si no hay datos sensibles.", "bajo"],
        ["Editar repo", "Medio: requiere diff y tests.", "medio"],
        ["Instalar dependencias", "Medio/alto: cadena de suministro.", "medio"],
        ["Tocar sistemas externos", "Alto: requiere aprobacion.", "alto"],
      ],
    },
    minutes: 3,
    notes: ["Haz que el grupo clasifique tareas reales. Es una forma muy efectiva de interiorizar permisos."],
  },
  {
    module: "M6",
    kicker: "Sandbox",
    title: "Sandbox modes",
    lead: "El sandbox define donde puede actuar Codex. Es una decision de seguridad y productividad.",
    bullets: [
      "Read-only para chat, analisis o planificacion.",
      "Workspace-write para editar dentro del proyecto.",
      "Full access solo cuando el entorno y el riesgo estan claros.",
    ],
    visual: {
      type: "cards",
      columns: 3,
      items: [
        ["Read-only", "Observa y propone"],
        ["Workspace-write", "Edita el repo"],
        ["Full access", "Acceso amplio, riesgo alto"],
      ],
    },
    minutes: 3,
    notes: ["Enseña a cambiar permisos en vivo. Es mas pedagogico que describirlos."],
  },
  {
    module: "M6",
    kicker: "Approvals",
    title: "Approval policy",
    lead: "Las aprobaciones determinan cuando Codex debe pedir permiso antes de ejecutar una accion.",
    bullets: [
      "on-request permite avanzar y pedir escalado cuando hace falta.",
      "never puede ser util en automatizacion controlada, pero exige mucha confianza.",
      "untrusted o read-only encaja en exploracion y entornos sensibles.",
    ],
    visual: {
      type: "ladder",
      items: [
        ["Read-only", "Maxima contencion"],
        ["Ask", "Permiso antes de acciones sensibles"],
        ["Auto", "Avanza dentro de limites"],
        ["Never", "Solo en entornos preparados"],
      ],
    },
    minutes: 3,
    notes: ["Evita dogmas. El permiso correcto depende del entorno, no de la valentia del usuario."],
  },
  {
    module: "M6",
    kicker: "Red",
    title: "Network, secretos y prompt injection",
    lead: "La red amplifica poder y riesgo. La documentacion oficial recomienda cautela especial con internet y fuentes no confiables.",
    bullets: [
      "La red puede traer docs actuales, pero tambien instrucciones maliciosas o irrelevantes.",
      "Los secretos deben limitarse, auditarse y no estar disponibles durante ejecucion si no hacen falta.",
      "Las rutas protegidas como .git, .agents o .codex merecen politicas claras.",
    ],
    visual: {
      type: "image",
      asset: "reflectionPromptInjection",
      caption: "Imagen de reflexion: una fuente externa puede traer datos utiles o instrucciones hostiles; Codex necesita frontera y aprobacion.",
      variant: "security",
    },
    minutes: 4,
    notes: [
      "Explica prompt injection como instrucciones hostiles escondidas en contenido externo.",
      "Remate de la imagen: si una nota viene de fuera, no le das las llaves de secretos y produccion por simpatia.",
    ],
  },
  {
    module: "M6",
    kicker: "Tokens",
    title: "Conciencia de gasto en tokens",
    lead: "El coste no viene solo del mensaje: contexto, razonamiento, herramientas, imagenes y output tambien cuentan.",
    bullets: [
      "Subir modelo y razonamiento puede ser correcto si evita horas humanas o bugs caros.",
      "Dividir tareas reduce contexto y facilita usar modelos mas baratos en subtareas.",
      "Filtrar logs, screenshots y docs antes de pasarlos ahorra tokens y mejora precision.",
    ],
    teaching: {
      example: "Ejemplo: empezar con diagnostico breve y modelo equilibrado; subir a GPT-5.5/high si el fallo es ambiguo, caro o afecta produccion.",
      watch: "Cuidado: screenshots, logs extensos y herramientas repetidas pueden disparar contexto sin mejorar la decision.",
    },
    visual: {
      type: "image",
      asset: "memeTokenBlender",
      caption: "Meme visual: si metes todo en la batidora, luego no preguntes por que sube el marcador.",
      variant: "humor",
    },
    minutes: 4,
    notes: [
      "Esta es una de las pantallas clave que pidio el usuario: no ocultes que la potencia cuesta.",
      "Usa la imagen para recordar que coste no es castigo: es una senal para decidir mejor que contexto entra y que se queda fuera.",
      "Remate posible: 'El modelo no esta caro; lo caro era mandarle el cajon entero de la cocina'.",
    ],
  },
  {
    module: "M6",
    kicker: "Creditos",
    title: "Creditos, precios y fast mode",
    lead: "Codex usa creditos o pricing API segun modo. Fast mode acelera modelos soportados, pero consume mas.",
    bullets: [
      "La pagina oficial de pricing publica equivalencias por modelo y tipo de token.",
      "Fast mode acelera GPT-5.5 y GPT-5.4 en superficies soportadas, con multiplicador de consumo.",
      "El usuario debe consultar /status y configuracion antes de tareas largas.",
    ],
    visual: {
      type: "cards",
      columns: 2,
      items: [
        ["GPT-5.5", "Maxima potencia, mayor coste relativo"],
        ["GPT-5.4", "Equilibrio para trabajo general"],
        ["GPT-5.4-mini", "Mas barato para subtareas ligeras"],
        ["Fast mode", "Velocidad a cambio de mas consumo"],
      ],
    },
    minutes: 4,
    notes: ["No metas numeros que puedan cambiar sin avisar. En clase, abre la pagina oficial de pricing si hay dudas."],
  },
  {
    module: "M6",
    kicker: "Presupuesto",
    title: "Como presupuestar una tarea agentica",
    lead: "Antes de lanzar una tarea grande, conviene estimar riesgo, contexto, herramientas, verificacion y modelo.",
    bullets: [
      "Si no hay criterio de salida, no hay presupuesto fiable.",
      "Si el contexto es enorme, divide por fases y compacta.",
      "Si la verificacion es automatica, puedes permitir mas autonomia.",
    ],
    visual: {
      type: "pipeline",
      items: [
        ["Scope", "Que entra y que no"],
        ["Context", "Rutas y datos"],
        ["Model", "Potencia necesaria"],
        ["Tools", "Acciones permitidas"],
        ["Verify", "Como se cierra"],
      ],
    },
    minutes: 3,
    notes: ["Esta pantalla convierte token awareness en un proceso practico para equipos."],
  },
  {
    module: "M6",
    kicker: "Gobierno",
    title: "Politicas de equipo para usar Codex",
    lead: "La adopcion madura necesita reglas compartidas, no heroicidad individual.",
    bullets: [
      "Modelos permitidos por tipo de tarea y sensibilidad.",
      "Permisos por repositorio y acciones que requieren aprobacion.",
      "AGENTS.md, skills y plantillas versionadas.",
      "Metrica de exito: tiempo ahorrado, bugs evitados, calidad de PR y coste controlado.",
    ],
    visual: {
      type: "image",
      asset: "reflectionHumanGovernance",
      caption: "Imagen de reflexion: los agentes aceleran, pero el humano define carriles, gates y criterio.",
      variant: "governance",
    },
    minutes: 4,
    notes: ["Cierra el modulo mostrando que gobierno bien hecho aumenta velocidad porque reduce dudas."],
  },
  {
    module: "M7",
    layout: "chapter",
    chapter: "7",
    kicker: "Modulo 7",
    title: "Labs y adopcion",
    lead: "Practicas para que la clase salga sabiendo operar Codex y no solo hablar de el.",
    points: ["Onboarding", "Multimodal", "MCP", "Skills", "Capstone"],
    minutes: 2,
    notes: ["Este modulo debe ser muy practico. Cada lab deja un artefacto reutilizable."],
  },
  {
    module: "M7",
    kicker: "Material real",
    title: "Kit potente de trabajo",
    lead: "El curso incluye prompts, plantillas, labs, una skill y ejemplos ejecutables para practicar Codex como plataforma.",
    bullets: [
      "Prompts para modelo, multimodalidad, MCP, subagentes, coste y cierre.",
      "Plantillas de AGENTS.md, config.toml, handoffs, review, MCP y coste.",
      "Ejemplos: auditor de sesión, MCP read-only local y UI debug multimodal.",
    ],
    visual: {
      type: "resources",
      items: [
        ["Prompts", "materiales/prompts-potentes.md", "Encargos avanzados listos para clase."],
        ["Modelo", "materiales/plantillas/decision-modelo.md", "Matriz de coste, reasoning y permisos."],
        ["Config", "materiales/plantillas/config-codex.example.toml", "Modelo, sandbox, MCP y subagentes."],
        ["MCP lab", "materiales/ejemplos/mcp-readonly-docs/README.md", "Servidor local read-only con smoke test."],
        ["Cost audit", "materiales/ejemplos/session-cost-audit/README.md", "Script para auditar tokens, tools e imágenes."],
        ["Skill", "materiales/skills/qa-visual-codex/SKILL.md", "Workflow de QA visual reutilizable."],
      ],
    },
    minutes: 5,
    notes: [
      "Esta pantalla es el puente entre teoria y adopcion. Abre al menos un archivo en directo.",
      "Para una demo corta, usa prompts-potentes.md. Para una demo tecnica, ejecuta el smoke test MCP o el auditor de coste.",
      "Remarca que cada archivo es un patron de trabajo: cuando algo funciona, debe vivir fuera del chat.",
    ],
  },
  {
    module: "M7",
    kicker: "Lab 1",
    title: "Onboarding de repo en 20 minutos",
    lead: "Objetivo: que Codex entienda el proyecto y deje un mapa operacional para nuevos contribuidores.",
    bullets: [
      "Pedir exploracion read-only del repo.",
      "Identificar comandos de test, build y desarrollo.",
      "Proponer AGENTS.md inicial con reglas verificables.",
    ],
    visual: {
      type: "lab",
      items: [
        ["Input", "Repo real o sample con tests"],
        ["Prompt", "Goal, Context, Constraints, Done when"],
        ["Output", "Mapa de arquitectura + comandos"],
        ["Check", "Ejecutar al menos un comando real"],
      ],
    },
    minutes: 20,
    notes: ["Ideal para abrir parte practica. Genera confianza porque Codex demuestra que entiende el repo."],
  },
  {
    module: "M7",
    kicker: "Lab 2",
    title: "Debug multimodal de UI",
    lead: "Objetivo: usar captura o mockup para corregir una diferencia visual con evidencia.",
    bullets: [
      "Adjuntar captura y nombrar que debe observar.",
      "Referenciar componente y estilos relevantes.",
      "Pedir screenshot o verificacion visual despues del cambio.",
    ],
    visual: {
      type: "lab",
      items: [
        ["Input", "Captura de fallo o mockup"],
        ["Context", "Componente, CSS y ruta"],
        ["Patch", "Cambio visual acotado"],
        ["Evidence", "Screenshot o inspeccion"],
      ],
    },
    minutes: 25,
    notes: ["Este lab aterriza GPT-5.5 multimodal. Evita cambios esteticos amplios; busca un bug concreto."],
  },
  {
    module: "M7",
    kicker: "Lab 3",
    title: "MCP empresarial minimo",
    lead: "Objetivo: conectar una fuente externa de conocimiento o herramientas y usarla con permisos claros.",
    bullets: [
      "Elegir un MCP de bajo riesgo: docs, issues, Sentry read-only o similar.",
      "Configurar server con timeout y tools limitadas.",
      "Pedir a Codex que cite que consulto y como influyo en la decision.",
    ],
    visual: {
      type: "lab",
      items: [
        ["Server", "MCP read-only"],
        ["Config", "config.toml de proyecto"],
        ["Task", "Consulta con evidencia"],
        ["Policy", "Documento de uso permitido"],
      ],
    },
    minutes: 30,
    notes: ["Si no hay credenciales empresariales, usa OpenAI Docs MCP o un servidor local de ejemplo."],
  },
  {
    module: "M7",
    kicker: "Lab 4",
    title: "Skill del equipo",
    lead: "Objetivo: empaquetar un workflow repetible para que Codex lo invoque cuando toque.",
    bullets: [
      "Definir una tarea estrecha: review frontend, release notes, migracion DB, QA visual.",
      "Escribir SKILL.md con triggers, pasos y criterios de salida.",
      "Agregar scripts o referencias solo si reducen trabajo real.",
    ],
    visual: {
      type: "lab",
      items: [
        ["Scope", "Una tarea, no un manual entero"],
        ["Trigger", "Cuando se debe usar"],
        ["Workflow", "Pasos imperativos"],
        ["Verify", "Como saber si funciono"],
      ],
    },
    minutes: 30,
    notes: ["La skill debe ser pequena. Si intenta cubrir todo, Codex la cargara poco o la aplicara mal."],
  },
  {
    module: "M7",
    kicker: "Facilitador",
    title: "Checklist para impartirlo con fuerza",
    lead: "La experiencia funciona cuando cada bloque alterna concepto, demo, decision y practica.",
    bullets: [
      "Prepara un repo de ejemplo con tests y un bug realista.",
      "Ten una cuenta con Codex operativo, modelo y permisos revisados.",
      "Abre pricing y docs oficiales para resolver dudas actuales.",
      "Mide tiempo de cada lab y corta el alcance antes de que se disperse.",
    ],
    visual: {
      type: "cards",
      columns: 2,
      items: [
        ["Antes", "Repo, permisos, modelos, fuentes"],
        ["Durante", "Prompt canvas y evidencia"],
        ["Despues", "Plantillas, AGENTS.md, skill"],
        ["Riesgos", "Coste, red, secretos, contexto largo"],
      ],
    },
    minutes: 4,
    notes: ["Esta es una nota para ti: si la clase se alarga, conserva labs y reduce teoria repetida."],
  },
  {
    module: "M7",
    kicker: "Plantilla",
    title: "Prompt operativo base",
    lead: "Esta plantilla condensa la forma de pedir trabajo serio a Codex.",
    bullets: [
      "Sirve para CLI, IDE o app, adaptando rutas y permisos.",
      "Incluye desde el principio verificacion y limites de alcance.",
      "Evita delegar decisiones de producto que debe tomar una persona.",
    ],
    visual: {
      type: "terminal",
      lines: [
        { text: "Goal: <resultado concreto>", className: "ok" },
        { text: "Context: <rutas, error, captura, docs, decisiones previas>" },
        { text: "Constraints: <no tocar, compatibilidad, seguridad, coste>" },
        { text: "Plan first if ambiguous. Edit only files needed." },
        { text: "Done when: <tests/build/screenshot/review/diff summary>", className: "warn" },
      ],
    },
    minutes: 4,
    notes: ["Haz que los asistentes se lleven esta plantilla. Es el puente entre clase y uso diario."],
  },
  {
    module: "M7",
    kicker: "Capstone",
    title: "Proyecto final: una feature real con agente",
    lead: "La evaluacion final debe combinar contexto, modelo, permisos, tool use, coste y revision.",
    bullets: [
      "Escoger una feature pequena pero no trivial.",
      "Elegir modelo y reasoning explicando por que.",
      "Usar al menos una herramienta de verificacion.",
      "Cerrar con diff, tests y nota de coste/riesgo.",
    ],
    visual: {
      type: "image",
      asset: "labsWorkshop",
      caption: "Imagen primaria de practica: una feature completa deja plan, patch, tests, PR y decision de coste.",
      variant: "primary",
    },
    minutes: 45,
    notes: [
      "El capstone no necesita ser grande. Debe ser completo. Esa es la diferencia.",
      "Pide a cada grupo que justifique modelo, esfuerzo de razonamiento, permisos y evidencia. Ese cierre convierte el taller en habito.",
    ],
  },
  {
    module: "M7",
    kicker: "30 dias",
    title: "Plan de adopcion para un equipo",
    lead: "La plataforma aterriza cuando hay una secuencia ligera de adopcion, no un dia aislado de inspiracion.",
    bullets: [
      "Semana 1: setup, permisos y prompt canvas.",
      "Semana 2: AGENTS.md y plantillas de review/bug.",
      "Semana 3: MCP read-only y primer skill.",
      "Semana 4: automations, metrica de coste y retrospectiva.",
    ],
    visual: {
      type: "ladder",
      items: [
        ["S1", "Operar Codex con seguridad"],
        ["S2", "Estandarizar instrucciones"],
        ["S3", "Conectar contexto externo"],
        ["S4", "Medir, ajustar y escalar"],
      ],
    },
    minutes: 4,
    notes: ["Este cierre es util para managers: no se adopta Codex instalando una app; se adopta cambiando rutinas."],
  },
  {
    module: "M7",
    kicker: "Reflexion",
    title: "El coste oculto del contexto sin dieta",
    lead: "Cuando se mete todo en la conversacion, Codex parece menos preciso y mas caro. La solucion no es apagarlo: es alimentar mejor la tarea.",
    bullets: [
      "Antes de subir modelo, reduce contexto irrelevante.",
      "Antes de repetir prompt, mira si falta evidencia concreta.",
      "Antes de pedir una migracion completa, divide por frontera tecnica.",
    ],
    visual: {
      type: "image",
      asset: "contextOverload",
      caption: "Imagen de reflexion: el contexto infinito no es madurez; es falta de criterio de seleccion.",
      variant: "reflection",
    },
    minutes: 4,
    notes: [
      "Usa esta imagen para frenar el habito de adjuntar repos enteros. El ahorro de tokens empieza por saber que no hace falta cargar.",
      "Pregunta practica: que tres ficheros serian evidencia suficiente para resolver el bug del ultimo sprint?",
    ],
  },
  {
    module: "M7",
    kicker: "Gobierno",
    title: "Consola minima de gobierno Codex",
    lead: "Si queremos escalar Codex en un equipo, hay que mirar permisos, coste, owners, MCP activos, modelos usados y evidencia de cierre.",
    bullets: [
      "Permisos por tipo de tarea: lectura, patch, comandos, red y secretos.",
      "Coste por practica: modelo, razonamiento, contexto, retries y herramientas.",
      "Calidad por cierre: tests, diff revisado, owner humano y decision documentada.",
    ],
    visual: {
      type: "image",
      asset: "governanceConsole",
      caption: "Diagrama operativo: la consola que evita que Codex se convierta en una caja negra de automatizacion.",
      variant: "primary",
    },
    minutes: 5,
    notes: [
      "Esta pantalla sirve para managers y tech leads. No es burocracia: es lo que permite dar autonomia sin perder trazabilidad.",
      "Conecta con la plataforma: progreso, feedback, versiones de contenido y revision trimestral.",
    ],
  },
  {
    module: "M7",
    layout: "full",
    kicker: "Fuentes",
    title: "Fuentes oficiales y cierre",
    lead: "Contenido basado en los tres cursos nuevos y contrastado con documentacion oficial de OpenAI. Actualiza modelos, precios y disponibilidad antes de impartir.",
    bullets: [],
    visual: {
      type: "sources",
      links: sourceLinks,
    },
    minutes: 3,
    notes: ["Termina invitando a convertir el curso en playbook vivo de la organizacion."],
  },
];

let current = 0;
let railOpen = window.matchMedia("(min-width: 981px)").matches;
let notesOpen = false;
let motionDirection = "next";
let hasRenderedSlide = false;
let slideMotionTimer = 0;

const els = {
  shell: document.querySelector(".shell"),
  slide: document.getElementById("slide"),
  moduleList: document.getElementById("moduleList"),
  modulePill: document.getElementById("modulePill"),
  slideTitle: document.getElementById("slideTitle"),
  counter: document.getElementById("counter"),
  timeHint: document.getElementById("timeHint"),
  progressFill: document.getElementById("progressFill"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  notesBtn: document.getElementById("notesBtn"),
  closeNotes: document.getElementById("closeNotes"),
  notesPanel: document.getElementById("notesPanel"),
  notesBody: document.getElementById("notesBody"),
  toggleRail: document.getElementById("toggleRail"),
  rail: document.querySelector(".rail"),
  overview: document.getElementById("overview"),
  overviewBtn: document.getElementById("overviewBtn"),
  closeOverview: document.getElementById("closeOverview"),
  overviewGrid: document.getElementById("overviewGrid"),
  fullscreenBtn: document.getElementById("fullscreenBtn"),
};

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getModule(id) {
  return modules.find((module) => module.id === id) || modules[0];
}

function renderBullets(items = []) {
  if (!items.length) return "";
  return `<ul class="bullet-list">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function renderTags(items = []) {
  if (!items.length) return "";
  return `<div class="tags">${items.map((item) => `<span class="tag">${esc(item)}</span>`).join("")}</div>`;
}

const moduleTeaching = {
  M0: {
    decision: "que problema real queremos resolver con Codex y como se medira el resultado",
    example: "Ejemplo: convertir una peticion vaga como 'mejora esta app' en objetivo, contexto, restricciones y evidencia.",
    watch: "Cuidado: si la clase se queda en botones, la gente no aprende a dirigir trabajo agentico.",
  },
  M1: {
    decision: "que superficie de Codex usar, con que configuracion y con que nivel de confianza",
    example: "Ejemplo: usar IDE para un cambio visual, CLI para un refactor con tests y Cloud para una tarea delegada.",
    watch: "Cuidado: instalar Codex no equivale a gobernarlo; revisa modelo, permisos, red y directorio.",
  },
  M2: {
    decision: "que modelo, razonamiento y modalidad compensan para la tarea",
    example: "Ejemplo: GPT-5.5 high para una migracion delicada; un modelo mas ligero para resumir findings.",
    watch: "Cuidado: mas contexto y mas razonamiento no siempre significan mejor resultado; tambien suben coste y latencia.",
  },
  M3: {
    decision: "que contexto necesita el agente para actuar sin adivinar",
    example: "Ejemplo: pasar captura, ruta del componente, error de consola y done when antes de pedir un patch.",
    watch: "Cuidado: un prompt largo con informacion irrelevante puede ser peor que un prompt corto con rutas exactas.",
  },
  M4: {
    decision: "que herramientas, MCP, skills o instrucciones deben formar parte del flujo",
    example: "Ejemplo: un MCP read-only de Sentry para traer errores reales antes de tocar codigo.",
    watch: "Cuidado: cada tool nueva amplia superficie de riesgo; define permisos, owner y side effects.",
  },
  M5: {
    decision: "como dividir trabajo entre planificacion, ejecucion, verificacion y revision",
    example: "Ejemplo: Arquitecto explora, Worker modifica una zona concreta y Reviewer busca regresiones.",
    watch: "Cuidado: paralelizar sin ownership claro crea conflictos, mas tokens y peores diffs.",
  },
  M6: {
    decision: "que nivel de autonomia es aceptable segun coste, seguridad y reversibilidad",
    example: "Ejemplo: read-only para diagnostico; workspace-write para patches con tests; aprobacion humana para red o produccion.",
    watch: "Cuidado: el gasto invisible aparece en conversaciones largas, imagenes sin criterio y herramientas repetidas.",
  },
  M7: {
    decision: "que artefacto reutilizable queda despues de cada practica",
    example: "Ejemplo: terminar un lab con AGENTS.md, una skill, un prompt operativo o una rubrica de review.",
    watch: "Cuidado: una demo que no deja playbook se olvida al dia siguiente.",
  },
};

const titleTeaching = [
  {
    match: /MCP/i,
    example: "Ejemplo: conectar Codex a docs internas, issues o logs sin pegar manualmente todo el contexto.",
    watch: "Cuidado: empieza read-only y limita tools antes de permitir escrituras.",
  },
  {
    match: /GPT-5\.5|modelo|reasoning/i,
    example: "Ejemplo: subir reasoning solo cuando una eval o el riesgo de la tarea lo justifique.",
    watch: "Cuidado: no conviertas GPT-5.5 en default para tareas mecanicas si un modelo menor basta.",
  },
  {
    match: /multimodal|imagen|captura|vision/i,
    example: "Ejemplo: pedir que compare una captura con el componente y verifique el cambio con screenshot.",
    watch: "Cuidado: una imagen sin instrucciones claras consume contexto y puede dispersar la solucion.",
  },
  {
    match: /sandbox|approval|permis|red|secret/i,
    example: "Ejemplo: diagnostico en read-only, patch en workspace-write y red solo con razon explicita.",
    watch: "Cuidado: los permisos son parte del diseno del workflow, no un popup molesto.",
  },
  {
    match: /coste|token|credito|fast|precio/i,
    example: "Ejemplo: dividir una tarea grande en exploracion barata y ejecucion potente solo donde aporte valor.",
    watch: "Cuidado: fast mode y contexto largo pueden ser utiles, pero deben verse en el presupuesto.",
  },
  {
    match: /review|PR|QA|test/i,
    example: "Ejemplo: pedir hallazgos con ruta, severidad, prueba ejecutada y riesgo residual.",
    watch: "Cuidado: una review que solo resume el diff no protege de regresiones.",
  },
  {
    match: /AGENTS|skill|plantilla|prompt file/i,
    example: "Ejemplo: convertir una buena sesion de bug triage en una skill o plantilla versionada.",
    watch: "Cuidado: si la instruccion no es concreta y verificable, el agente la aplicara de forma irregular.",
  },
  {
    match: /automation|automatiz/i,
    example: "Ejemplo: programar un barrido diario solo despues de probar el prompt manualmente en varias muestras.",
    watch: "Cuidado: automatizar un prompt inmaduro multiplica errores en silencio.",
  },
];

function getTeaching(slide) {
  const base = moduleTeaching[slide.module] || moduleTeaching.M0;
  const text = `${slide.title} ${slide.kicker || ""} ${slide.lead || ""}`;
  const hint = titleTeaching.find((item) => item.match.test(text)) || {};
  return {
    idea: slide.teaching?.idea || `Decision que debe quedar clara: ${base.decision}.`,
    example: slide.teaching?.example || hint.example || base.example,
    watch: slide.teaching?.watch || hint.watch || base.watch,
  };
}

function renderTeaching(slide) {
  if (slide.layout === "full") return "";
  const teaching = getTeaching(slide);
  const rows = [["Idea clave", teaching.idea], ["Ejemplo para contar", teaching.example]];
  return `<div class="teaching-grid">${rows.map(([label, body]) => `<div class="teaching-card"><strong>${esc(label)}</strong><span>${esc(body)}</span></div>`).join("")}</div>`;
}

function renderVisual(visual) {
  if (!visual) {
    return `<div class="visual"><div class="card-grid">${["Objetivo", "Contexto", "Restricciones", "Evidencia"].map((x) => `<div class="mini-card accent-teal"><strong>${x}</strong><span>Completar antes de pedir ejecucion.</span></div>`).join("")}</div></div>`;
  }

  if (visual.type === "image") {
    const src = LOCAL_ASSETS[visual.asset] || ASSETS[visual.asset] || "";
    const variant = visual.variant ? ` visual-${esc(visual.variant)}` : "";
    return `<div class="visual image-frame${variant}"><div class="image-visual"><img src="${src}" alt="${esc(visual.caption || "Codex")}" /><p class="caption">${esc(visual.caption || "")}</p></div></div>`;
  }

  if (visual.type === "pipeline") {
    return `<div class="visual"><div class="pipeline">${visual.items.map(([title, body]) => `<div class="pipe-item"><strong>${esc(title)}</strong><span>${esc(body)}</span></div>`).join("")}</div></div>`;
  }

  if (visual.type === "cards") {
    const cls = visual.columns === 3 ? "card-grid three" : "card-grid";
    const accents = ["accent-teal", "accent-amber", "accent-blue", "accent-coral"];
    return `<div class="visual"><div class="${cls}">${visual.items.map(([title, body], index) => `<div class="mini-card ${accents[index % accents.length]}"><strong>${esc(title)}</strong><span>${esc(body)}</span></div>`).join("")}</div></div>`;
  }

  if (visual.type === "stack") {
    return `<div class="visual"><div class="stack">${visual.items.map(([title, body]) => `<div class="stack-item"><em>${esc(title)}</em><span>${esc(body)}</span></div>`).join("")}</div></div>`;
  }

  if (visual.type === "matrix") {
    return `<div class="visual"><div class="matrix">${visual.items.map(([title, body, level]) => `<div class="matrix-card" data-level="${esc(level)}"><strong>${esc(title)}</strong><span>${esc(body)}</span></div>`).join("")}</div></div>`;
  }

  if (visual.type === "terminal") {
    return `<div class="visual"><pre class="terminal">${visual.lines.map((line) => {
      const entry = typeof line === "string" ? { text: line } : line;
      return `<span class="${esc(entry.className || "")}">${esc(entry.text)}</span>`;
    }).join("")}</pre></div>`;
  }

  if (visual.type === "cost") {
    return `<div class="visual"><div class="cost-bars">${visual.items.map(([label, value, text]) => `<div class="cost-row"><strong>${esc(label)}</strong><div class="cost-track"><span style="width:${Math.max(2, Math.min(100, Number(value) || 0))}%"></span></div><small>${esc(text)}</small></div>`).join("")}</div></div>`;
  }

  if (visual.type === "compare") {
    return `<div class="visual"><div class="compare"><div class="compare-col"><h3>${esc(visual.leftTitle)}</h3><ul>${visual.left.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div><div class="compare-col"><h3>${esc(visual.rightTitle)}</h3><ul>${visual.right.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div></div></div>`;
  }

  if (visual.type === "ladder") {
    return `<div class="visual"><div class="ladder">${visual.items.map(([step, body]) => `<div class="ladder-step"><b>${esc(step)}</b><div>${esc(body)}</div></div>`).join("")}</div></div>`;
  }

  if (visual.type === "lab") {
    return `<div class="visual"><div class="lab">${visual.items.map(([step, body]) => `<div class="lab-card"><em>${esc(step)}</em><span>${esc(body)}</span></div>`).join("")}</div></div>`;
  }

  if (visual.type === "resources") {
    return `<div class="visual"><div class="resource-grid">${visual.items.map(([label, href, body]) => `<a class="resource-card" href="${esc(href)}" target="_blank" rel="noreferrer"><em>${esc(label)}</em><strong>${esc(href.split("/").pop())}</strong><span>${esc(body)}</span></a>`).join("")}</div></div>`;
  }

  if (visual.type === "sources") {
    return `<div class="visual"><div class="sources">${visual.links.map(([label, url]) => `<a class="source-link" href="${esc(url)}" target="_blank" rel="noreferrer">${esc(label)}<br>${esc(url)}</a>`).join("")}</div></div>`;
  }

  return `<div class="visual"></div>`;
}

function renderSlide(slide, index) {
  const module = getModule(slide.module);

  if (slide.layout === "cover") {
    const bg = LOCAL_ASSETS[slide.asset] || ASSETS[slide.asset] || "";
    return `
      <div class="slide-inner cover" style="background-image:url('${bg}')">
        <div>
          <div class="kicker">${esc(slide.kicker)}</div>
          <h1>${esc(slide.title)}</h1>
          <p class="lead">${esc(slide.lead)}</p>
        </div>
        <div class="cover-band">${(slide.chips || []).map((chip) => `<span>${esc(chip)}</span>`).join("")}</div>
      </div>
    `;
  }

  if (slide.layout === "chapter") {
    return `
      <div class="slide-inner chapter">
        <div class="chapter-num">${esc(slide.chapter)}</div>
        <div class="chapter-copy">
          <div class="kicker">${esc(slide.kicker)}</div>
          <h1>${esc(slide.title)}</h1>
          <p class="lead">${esc(slide.lead)}</p>
          <div class="chapter-list">${(slide.points || []).map((point) => `<span>${esc(point)}</span>`).join("")}</div>
        </div>
      </div>
    `;
  }

  const textHtml = `${renderBullets(slide.bullets)}${renderTags(slide.tags)}${renderTeaching(slide)}`;

  return `
    <div class="slide-inner">
      <div class="slide-top">
        <div>
          <div class="kicker">${esc(slide.kicker || module.title)}</div>
          <h2>${esc(slide.title)}</h2>
          <p class="lead">${esc(slide.lead)}</p>
        </div>
        <div class="slide-number">${String(index + 1).padStart(2, "0")}</div>
      </div>
      <div class="content-grid ${slide.layout === "full" ? "full" : ""} ${textHtml ? "" : "visual-only"}">
        ${textHtml ? `<div class="text-block">${textHtml}</div>` : ""}
        ${renderVisual(slide.visual)}
      </div>
    </div>
  `;
}

function renderNotes(slide, index) {
  const module = getModule(slide.module);
  const notes = slide.notes || ["Relaciona esta pantalla con una practica o decision concreta antes de avanzar."];
  const teaching = getTeaching(slide);
  return `
    <div class="note-box">
      <p><strong>${esc(module.title)} - pantalla ${index + 1}</strong></p>
      <p>Tiempo sugerido: ${esc(slide.minutes || 3)} min</p>
    </div>
    <ul>${notes.map((note) => `<li>${esc(note)}</li>`).join("")}</ul>
    <div class="note-script">
      <strong>Guion rapido</strong>
      <p>${esc(teaching.idea)}</p>
      <p>${esc(teaching.example)}</p>
      <p>${esc(teaching.watch)}</p>
    </div>
  `;
}

function buildModuleList() {
  els.moduleList.innerHTML = modules.map((module, index) => `
    <button class="module-btn" type="button" data-module="${esc(module.id)}">
      <span class="module-num">${index + 1}</span>
      <span><strong>${esc(module.title)}</strong><span>${esc(module.range)}</span></span>
    </button>
  `).join("");

  els.moduleList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = slides.findIndex((slide) => slide.module === button.dataset.module);
      if (index >= 0) show(index);
      if (window.matchMedia("(max-width: 980px)").matches) {
        railOpen = false;
        syncPanels();
      }
    });
  });
}

function buildOverview() {
  els.overviewGrid.innerHTML = slides.map((slide, index) => `
    <button class="thumb" type="button" data-index="${index}">
      <span>${String(index + 1).padStart(2, "0")} - ${esc(getModule(slide.module).title)}</span>
      <strong>${esc(slide.title)}</strong>
    </button>
  `).join("");

  els.overviewGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      show(Number(button.dataset.index));
      closeOverview();
    });
  });
}

function updateActiveModule() {
  const slide = slides[current];
  const module = getModule(slide.module);
  els.modulePill.textContent = module.title;
  els.slideTitle.textContent = slide.title;

  els.moduleList.querySelectorAll(".module-btn").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.module === slide.module);
  });

  els.overviewGrid.querySelectorAll(".thumb").forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.index) === current);
  });
}

function updateProgress() {
  const total = slides.length;
  const minutesDone = slides.slice(0, current + 1).reduce((sum, slide) => sum + (slide.minutes || 3), 0);
  const minutesTotal = slides.reduce((sum, slide) => sum + (slide.minutes || 3), 0);
  els.counter.textContent = `${current + 1} / ${total}`;
  els.timeHint.textContent = `${minutesDone} / ${minutesTotal} min`;
  els.progressFill.style.width = `${((current + 1) / total) * 100}%`;
  els.prevBtn.disabled = current === 0;
  els.nextBtn.disabled = current === total - 1;
}

function show(index) {
  const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
  if (nextIndex === current && hasRenderedSlide) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  motionDirection = nextIndex < current ? "prev" : "next";
  current = nextIndex;
  const slide = slides[current];

  els.slide.classList.remove("is-transitioning", "motion-next", "motion-prev");
  els.slide.innerHTML = renderSlide(slide, current);

  if (hasRenderedSlide && !prefersReducedMotion) {
    window.clearTimeout(slideMotionTimer);
    els.slide.classList.add(
      "is-transitioning",
      motionDirection === "prev" ? "motion-prev" : "motion-next"
    );
    slideMotionTimer = window.setTimeout(() => {
      els.slide.classList.remove("is-transitioning", "motion-next", "motion-prev");
    }, 560);
  }

  hasRenderedSlide = true;
  els.notesBody.innerHTML = renderNotes(slide, current);
  updateActiveModule();
  updateProgress();
  const hash = `#${current + 1}`;
  if (location.hash !== hash) history.replaceState(null, "", hash);
}

function next() {
  show(current + 1);
}

function prev() {
  show(current - 1);
}

function syncPanels() {
  els.rail.classList.toggle("is-hidden", !railOpen);
  els.notesPanel.classList.toggle("is-hidden", !notesOpen);
  els.shell.classList.toggle("no-rail", !railOpen);
  els.shell.classList.toggle("no-notes", !notesOpen);
  els.toggleRail.setAttribute("aria-expanded", String(railOpen));
  els.notesBtn.setAttribute("aria-expanded", String(notesOpen));
}

function openOverview() {
  els.overview.classList.add("is-open");
  els.overview.setAttribute("aria-hidden", "false");
}

function closeOverview() {
  els.overview.classList.remove("is-open");
  els.overview.setAttribute("aria-hidden", "true");
}

function syncFullscreenState() {
  const isFullscreen = Boolean(document.fullscreenElement);
  els.shell.classList.toggle("is-fullscreen", isFullscreen);
  els.fullscreenBtn.classList.toggle("is-active", isFullscreen);
  els.fullscreenBtn.title = isFullscreen ? "Salir de pantalla completa (F5)" : "Pantalla completa (F5)";
  els.fullscreenBtn.setAttribute(
    "aria-label",
    isFullscreen ? "Salir de pantalla completa (F5)" : "Pantalla completa (F5)"
  );
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.warn("No se pudo cambiar a pantalla completa", error);
  }
}

els.prevBtn.addEventListener("click", prev);
els.nextBtn.addEventListener("click", next);
els.notesBtn.addEventListener("click", () => {
  notesOpen = !notesOpen;
  syncPanels();
});
els.closeNotes.addEventListener("click", () => {
  notesOpen = false;
  syncPanels();
});
els.toggleRail.addEventListener("click", () => {
  railOpen = !railOpen;
  syncPanels();
});
els.overviewBtn.addEventListener("click", openOverview);
els.closeOverview.addEventListener("click", closeOverview);
els.fullscreenBtn.addEventListener("click", toggleFullscreen);
els.overview.addEventListener("click", (event) => {
  if (event.target === els.overview) closeOverview();
});
document.addEventListener("fullscreenchange", syncFullscreenState);

document.addEventListener("keydown", (event) => {
  if (event.key === "F5") {
    event.preventDefault();
    toggleFullscreen();
    return;
  }
  if (event.target.closest("button, a, input, textarea")) return;
  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    next();
    return;
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    prev();
    return;
  }
  if (event.key === "Escape") closeOverview();
});

window.addEventListener("hashchange", () => {
  const index = Number(location.hash.replace("#", "")) - 1;
  if (Number.isFinite(index)) show(index);
});

buildModuleList();
buildOverview();
syncPanels();
syncFullscreenState();

const initialIndex = Number(location.hash.replace("#", "")) - 1;
show(Number.isFinite(initialIndex) ? initialIndex : 0);
