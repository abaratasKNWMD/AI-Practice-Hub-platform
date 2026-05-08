const ASSETS = window.ULTRA_ASSETS || {};
const LOCAL_ASSETS = {
  swarmOrchestrator: "./assets/ultra-swarm-orchestrator.png",
  batchNightRun: "./assets/ultra-batch-night-run.png",
  distillationLab: "./assets/ultra-distillation-lab.png",
  enterpriseRag: "./assets/ultra-enterprise-rag.png",
  prJudge: "./assets/ultra-pr-judge.png",
  memeSwarmChaos: "./assets/ultra-meme-swarm-chaos.png",
  memeRagStale: "./assets/ultra-meme-rag-stale.png",
  memeTokenCost: "./assets/ultra-meme-token-cost.png",
  reflectionHumanGate: "./assets/ultra-reflection-human-gate.png",
  memeAgentDebateProtocol: "./assets/ultra-meme-agent-debate-protocol.png",
  memeSyntheticDataFactory: "./assets/ultra-meme-synthetic-data-factory.png",
  memeAstChunking: "./assets/ultra-meme-ast-chunking.png",
  reflectionJudgeCalibration: "./assets/ultra-reflection-judge-calibration.png",
};

const modules = [
  { id: "M0", title: "Apertura Codex Ultra", range: "1-5" },
  { id: "M1", title: "Swarms Codex", range: "6-16" },
  { id: "M2", title: "API-first", range: "17-27" },
  { id: "M3", title: "Datos y destilacion", range: "28-38" },
  { id: "M4", title: "Enterprise RAG", range: "39-50" },
  { id: "M5", title: "CI/CD y jueces", range: "51-59" },
  { id: "M6", title: "Gobierno y labs", range: "60-74" },
];

const sources = [
  ["Codex overview", "https://developers.openai.com/codex/overview"],
  ["Codex best practices", "https://developers.openai.com/codex/learn/best-practices"],
  ["Codex subagents", "https://developers.openai.com/codex/concepts/subagents"],
  ["Codex MCP", "https://developers.openai.com/codex/mcp"],
  ["Agents SDK", "https://developers.openai.com/api/docs/guides/agents"],
  ["Agents orchestration", "https://developers.openai.com/api/docs/guides/agents/orchestration"],
  ["OpenAI tools", "https://developers.openai.com/api/docs/guides/tools"],
  ["Evals API", "https://developers.openai.com/api/docs/guides/evals"],
  ["Embeddings", "https://developers.openai.com/api/docs/guides/embeddings"],
  ["File search", "https://developers.openai.com/api/docs/guides/tools-file-search"],
  ["Batch API", "https://developers.openai.com/api/docs/guides/batch"],
  ["Model optimization", "https://developers.openai.com/api/docs/guides/model-optimization"],
  ["GPT-5.5 guidance", "https://developers.openai.com/api/docs/guides/latest-model.md"],
  ["LangGraph handoffs", "https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs"],
  ["CrewAI docs", "https://crewai.mintlify.app/en"],
  ["Microsoft Agent Framework", "https://learn.microsoft.com/en-us/agent-framework/overview/"],
  ["GitHub Models", "https://docs.github.com/en/github-models/about-github-models"],
  ["GitHub Models REST", "https://docs.github.com/en/rest/models/inference?apiVersion=2022-11-28"],
  ["Tree-sitter", "https://tree-sitter.github.io/tree-sitter/using-parsers/"],
];

const slides = [
  {
    module: "M0",
    layout: "cover",
    kicker: "Codex Ultra Avanzado",
    title: "Swarms, APIs, RAG profundo y destilacion aplicados a Codex",
    lead: "La fase donde Codex deja de ser solo una interfaz y se convierte en sistema operativo para automatizacion de software enterprise.",
    tags: ["74 pantallas", "Codex-first", "Swarms", "CI/CD", "RAG", "Evals"],
    minutes: 3,
    note: "Deja claro desde el minuto uno que todo se explica como extension de Codex y de su forma de trabajar.",
  },
  {
    module: "M0",
    kicker: "Marco",
    title: "Esto no es salir de Codex: es ampliar Codex",
    lead: "El curso enseña como pasar de usar Codex en una sesion a diseñar sistemas donde Codex gobierna, audita o dispara agentes especializados.",
    bullets: [
      "Codex sigue siendo el punto de trabajo: repo, diffs, contexto, AGENTS.md, MCP y verificacion.",
      "Las APIs y frameworks aparecen cuando el flujo necesita escala, repeticion o integracion con negocio.",
      "El objetivo no es tener mas agentes, sino mejores contratos, trazas, gates y resultados.",
    ],
    visual: { type: "stack", items: [["Codex", "Interfaz de trabajo y control"], ["Agents SDK", "Orquestacion en codigo"], ["CI/CD", "Ejecucion repetible"], ["RAG", "Contexto enterprise"], ["Evals", "Medicion y gates"]] },
    minutes: 3,
    note: "Evita que parezca una clase de herramientas externas. Codex es el eje de decision.",
  },
  {
    module: "M0",
    kicker: "Arquitectura",
    title: "El mapa completo de la fase ultra",
    lead: "Cuatro piezas se combinan: swarms de agentes, automatizacion API-first, datos sinteticos y RAG profundo para codigo legacy.",
    bullets: [
      "Swarms: separar roles, estados y aprobaciones.",
      "API-first: ejecutar trabajo masivo fuera del IDE.",
      "Datos: crear datasets, evaluar, afinar y destilar.",
      "RAG: convertir el codebase en memoria recuperable.",
    ],
    visual: { type: "pipe", items: [["Codex", "Tarea real"], ["Swarm", "Roles"], ["API", "Escala"], ["RAG", "Contexto"], ["Eval", "Gate"]] },
    minutes: 4,
    note: "Usa esta pantalla como indice conceptual, no como lista de moda.",
  },
  {
    module: "M0",
    kicker: "Nivel",
    title: "La diferencia entre avanzado y ultra avanzado",
    lead: "Avanzado es usar bien Codex. Ultra avanzado es diseñar la infraestructura para que Codex trabaje con sistemas, equipos y politicas.",
    bullets: [
      "Avanzado: plan mode, subagentes, MCP, skills, coste y seguridad.",
      "Ultra: orquestadores externos, pipelines nocturnos, datasets, evaluaciones y RAG de codigo.",
      "El usuario ya no solo pregunta: diseña fabricas de trabajo asistido.",
    ],
    visual: { type: "compare", leftTitle: "Avanzado", left: ["Sesiones Codex", "Subagentes bajo demanda", "MCP y skills", "Review manual"], rightTitle: "Ultra", right: ["Workflows repetibles", "Swarms en CI/CD", "Datasets y evals", "Gates automaticos"] },
    minutes: 3,
    note: "Aqui puedes conectar con la web anterior: esta fase empieza donde la anterior termina.",
  },
  {
    module: "M0",
    kicker: "Principios",
    title: "Reglas de realidad para swarms Codex",
    lead: "La complejidad se gana con contratos. Sin contratos, un swarm solo multiplica ruido, coste y riesgo.",
    bullets: [
      "Cada agente debe tener ownership, entradas, salidas, permisos y criterio de parada.",
      "Cada paso debe dejar evidencia: diff, test, comentario, score, trace o artefacto.",
      "Cada automatizacion debe tener rollback, humano responsable y presupuesto.",
    ],
    visual: {
      type: "image",
      asset: "memeSwarmChaos",
      caption: "Meme visual: sin ownership, trazas y presupuesto, un swarm no escala; solo hace ruido mas rapido.",
      variant: "humor",
    },
    minutes: 4,
    note: "Pon esta regla: mas agentes no es mas madurez; mas observabilidad si. La imagen sirve para romper tension y recordar que un swarm sin contrato se convierte en trabajo paralelo sin control.",
  },
  {
    module: "M1",
    layout: "chapter",
    chapter: "1",
    kicker: "Modulo 1",
    title: "Ecosistemas multi-agente y swarms Codex",
    lead: "De subagentes dentro de Codex a sistemas orquestados con roles, memoria, gates y trazas.",
    points: ["Roles", "Manager-as-tools", "Handoffs", "LangGraph", "CrewAI", "Agent Framework", "PR swarms"],
    minutes: 2,
    note: "Este modulo debe sonar a arquitectura de software, no a fantasia de agentes.",
  },
  {
    module: "M1",
    kicker: "Transicion",
    title: "De subagentes Codex a swarms",
    lead: "Codex ya puede delegar trabajo en subagentes. El ultra avanzado decide cuando esa delegacion debe convertirse en un sistema orquestado.",
    bullets: [
      "Subagente Codex: ideal para exploracion, verificacion o trabajo paralelo acotado.",
      "Swarm externo: ideal cuando el flujo se repite, requiere estado, gates, trazas o integracion con CI/CD.",
      "El paso natural es formalizar roles y contratos antes de escribir framework.",
    ],
    visual: { type: "pipe", items: [["Codex", "Thread"], ["Subagent", "Tarea acotada"], ["Contract", "Entrada/salida"], ["Runtime", "Estado"], ["Swarm", "Repetible"]] },
    minutes: 4,
    note: "Resalta que el salto a swarm solo compensa si el flujo se repite o necesita auditoria.",
  },
  {
    module: "M1",
    kicker: "Roles",
    title: "Arquitecto, Developer, QA, Security, Orquestador",
    lead: "Un swarm de Codex debe parecerse a un equipo de software bien diseñado, no a cinco chats hablando a la vez.",
    bullets: [
      "Arquitecto: descompone, detecta riesgos y decide plan.",
      "Developer: toca codigo dentro de ownership asignado.",
      "QA: reproduce, prueba, revisa regresiones y evidencia.",
      "Security: revisa secretos, permisos, dependencias y red.",
      "Orquestador: enruta, corta bucles y decide gates.",
    ],
    visual: {
      type: "image",
      asset: "swarmOrchestrator",
      caption: "Imagen primaria: el swarm solo funciona cuando cada agente tiene ownership, evidencia y gate.",
      variant: "swarm",
    },
    minutes: 5,
    note: "Pide al grupo que piense en sus roles reales de PR y los traduzca a agentes. La imagen ayuda a evitar la idea de cinco chats sueltos: aqui hay roles, contratos y un plano de control Codex.",
  },
  {
    module: "M1",
    kicker: "Patron",
    title: "Manager-as-tools: el patron mas seguro para empezar",
    lead: "OpenAI Agents SDK documenta el patron de exponer especialistas como tools para que un manager mantenga el control de la respuesta final.",
    bullets: [
      "El manager decide que especialista invocar y sintetiza la salida.",
      "El especialista tiene una tarea estrecha: resumir, revisar, clasificar, buscar o probar.",
      "La conversacion principal no se llena con todo el razonamiento interno de cada agente.",
    ],
    visual: { type: "pipe", items: [["Manager", "Control"], ["Tool: QA", "Pruebas"], ["Tool: Sec", "Riesgo"], ["Tool: Docs", "Contexto"], ["Final", "Decision"]] },
    minutes: 4,
    note: "Es el patron que menos se descontrola para PR review y soporte tecnico.",
  },
  {
    module: "M1",
    kicker: "Handoffs",
    title: "Handoffs: cuando el especialista toma el control",
    lead: "Los handoffs tienen sentido cuando una rama del flujo necesita su propio agente, instrucciones, herramientas o politica.",
    bullets: [
      "Usalos cuando cambia el dueño real de la respuesta o del proceso.",
      "Mantener historia valida y contexto minimo es critico: si pasas todo, inflas coste y ruido.",
      "Codex puede enseñar este patron con tareas: triage -> especialista -> verificacion -> resumen.",
    ],
    visual: { type: "pipe", items: [["Triage", "Clasifica"], ["Handoff", "Cambia owner"], ["Specialist", "Ejecuta"], ["Return", "Resume"], ["Gate", "Aprueba"]] },
    minutes: 4,
    note: "Relaciona con las docs de LangGraph y OpenAI: hay que decidir quien posee la salida.",
  },
  {
    module: "M1",
    kicker: "LangGraph",
    title: "LangGraph aplicado a flujos Codex",
    lead: "LangGraph encaja cuando quieres representar el swarm como grafo de estado: nodos, rutas, condiciones y memoria.",
    bullets: [
      "Bueno para workflows donde el estado decide el siguiente agente.",
      "Permite single-agent con middleware o subgrafos multi-agente.",
      "La parte delicada es context engineering entre nodos: que historial pasa y que se filtra.",
    ],
    visual: { type: "stack", items: [["State", "active_agent, files, risk"], ["Nodes", "architect, dev, qa"], ["Edges", "route, retry, stop"], ["Memory", "trace y checkpoints"]] },
    minutes: 4,
    note: "No vendas LangGraph como requisito. Presentalo como opcion si se necesita control de grafo.",
  },
  {
    module: "M1",
    kicker: "CrewAI",
    title: "CrewAI aplicado a equipos Codex",
    lead: "CrewAI es util para explicar crews, tareas, procesos, guardrails, memoria y observabilidad alrededor de agentes colaborativos.",
    bullets: [
      "Buen encaje pedagogico para roles claros: investigador, implementador, reviewer.",
      "Procesos secuenciales o jerarquicos ayudan a evitar conversaciones caoticas.",
      "Para Codex, lo importante es que cada crew produzca artefactos revisables en el repo.",
    ],
    visual: { type: "cards", columns: 3, items: [["Agents", "Roles con tools"], ["Tasks", "Unidades de trabajo"], ["Processes", "Orden y jerarquia"], ["Memory", "Estado reutilizable"], ["Guardrails", "Validacion"], ["Observability", "Trazas"]] },
    minutes: 4,
    note: "Aplica siempre a software: cada task debe terminar en diff, test, issue, comentario o informe.",
  },
  {
    module: "M1",
    kicker: "Microsoft",
    title: "AutoGen y Microsoft Agent Framework",
    lead: "Microsoft posiciona Agent Framework como sucesor de AutoGen y Semantic Kernel para agentes y workflows multi-agente.",
    bullets: [
      "Agentes para tareas abiertas con tools y MCP.",
      "Workflows graficos cuando necesitas control explicito de orden, concurrencia, checkpointing o humano en el loop.",
      "Para entornos Microsoft/GitHub, encaja bien con Azure, GitHub Actions y politicas enterprise.",
    ],
    visual: { type: "compare", leftTitle: "Agent", left: ["Conversacional", "Tool use autonomo", "Una respuesta puede bastar"], rightTitle: "Workflow", right: ["Pasos definidos", "Varios agentes/funciones", "Checkpoints y gates"] },
    minutes: 4,
    note: "Aclara que AutoGen existe, pero el rumbo documentado por Microsoft apunta a Agent Framework.",
  },
  {
    module: "M1",
    kicker: "Debate",
    title: "Debate entre agentes: util solo con protocolo",
    lead: "Hacer que agentes 'debatan' una PR puede funcionar si hay turnos, evidencia y criterio de decision.",
    bullets: [
      "Primero: cada agente produce hallazgos independientes con referencias.",
      "Segundo: el orquestador deduplica, prioriza y pide contraargumentos.",
      "Tercero: un juez aplica rubrica y emite decision: approve, request changes o escalate.",
    ],
    visual: {
      type: "image",
      asset: "memeAgentDebateProtocol",
      caption: "Meme visual: debate sin protocolo es ruido caro; con turnos, evidencia, dedup y gate se vuelve review util.",
      variant: "humor",
    },
    minutes: 4,
    note: "Sin protocolo, el debate se vuelve teatro caro. Con protocolo, puede mejorar cobertura. Remate para la clase: no queremos agentes opinando fuerte; queremos findings trazables compitiendo con evidencia.",
  },
  {
    module: "M1",
    kicker: "CI/CD",
    title: "Swarm Codex en GitHub Actions",
    lead: "La integracion potente es lanzar un swarm en PR: leer diff, consultar RAG, ejecutar tests, revisar seguridad y comentar evidencias.",
    bullets: [
      "Trigger: pull_request, label, comentario o schedule.",
      "Inputs: diff, archivos tocados, AGENTS.md, historial de tests, reglas de equipo.",
      "Outputs: comentario estructurado, annotations, checks y artefactos JSON.",
    ],
    visual: { type: "code", lines: ["name: codex-swarm-review", "on: [pull_request]", "jobs:", "  swarm:", "    steps:", "      - checkout", "      - build context bundle", "      - run orchestrator", "      - upload findings", "      - post PR summary"] },
    minutes: 5,
    note: "No hace falta implementarlo completo en clase; basta con enseñar la arquitectura y un YAML simple.",
  },
  {
    module: "M1",
    kicker: "Antipatrones",
    title: "Cuando NO usar swarms",
    lead: "Un solo agente con herramientas suele ser mejor que cinco agentes sin contrato.",
    bullets: [
      "No uses swarm para tareas deterministas que podria resolver una funcion.",
      "No uses debate si no hay rubrica y evidencia externa.",
      "No uses agentes paralelos tocando el mismo ownership de archivos.",
      "No uses CI/CD con auto-merge si no hay gates humanos y rollback.",
    ],
    visual: { type: "matrix", items: [["Funcion simple", "No metas LLM.", "bajo"], ["Bug pequeno", "Un agente basta.", "medio"], ["PR critica", "Swarm con gates.", "alto"], ["Produccion", "Humano y rollback.", "alto"]] },
    minutes: 4,
    note: "Esta pantalla da madurez. El curso ultra tambien enseña a decir no.",
  },
  {
    module: "M2",
    layout: "chapter",
    chapter: "2",
    kicker: "Modulo 2",
    title: "Desarrollo API-first y extensibilidad extrema",
    lead: "Codex en el IDE es el taller; las APIs son la fabrica nocturna y los procesos integrados.",
    points: ["Responses API", "Batch", "GitHub Models", "VS Code extensions", "Work queues", "Observabilidad"],
    minutes: 2,
    note: "Este modulo debe conectar la experiencia Codex con automatizacion real de empresa.",
  },
  {
    module: "M2",
    kicker: "API-first",
    title: "Cuando Codex debe salir del IDE",
    lead: "Si una tarea se repite, toca cientos de archivos o debe correr sin usuario delante, pasa de sesion Codex a pipeline API-first.",
    bullets: [
      "Refactors masivos durante la noche.",
      "Generacion de tests para modulos legacy.",
      "Auditorias recurrentes de dependencia, seguridad o estilo.",
      "Construccion de datasets sinteticos desde repos privados.",
    ],
    visual: { type: "pipe", items: [["Codex", "Diseña"], ["Script", "Ejecuta"], ["API", "Escala"], ["Batch", "Abarata"], ["PR", "Revisa"]] },
    minutes: 4,
    note: "Muestra el criterio: cuando pasa de conversacion a proceso, conviene API.",
  },
  {
    module: "M2",
    kicker: "Responses",
    title: "Responses API como primitiva de agente",
    lead: "Para flujos con razonamiento, herramientas o estado multi-turn, la guia actual de OpenAI recomienda Responses API.",
    bullets: [
      "Permite herramientas, entradas multimodales, estado y respuestas estructuradas.",
      "Encaja con GPT-5.5 para workflows tool-heavy y long-running.",
      "Codex puede generar y mantener estos clientes API dentro del repo.",
    ],
    visual: { type: "code", lines: ["import OpenAI from 'openai';", "const client = new OpenAI();", "const response = await client.responses.create({", "  model: 'gpt-5.5',", "  input: taskPrompt,", "  tools: workflowTools,", "  reasoning: { effort: 'medium' }", "});"] },
    minutes: 5,
    note: "Aclara que esto no sustituye Codex: Codex ayuda a construir el sistema que llama a la API.",
  },
  {
    module: "M2",
    kicker: "Batch",
    title: "Batch API para trabajo nocturno",
    lead: "Batch es ideal para jobs asincronos: evaluaciones, clasificacion, embeddings o procesamiento masivo que no necesita respuesta inmediata.",
    bullets: [
      "La documentacion oficial habla de menor coste y ventana de 24 horas.",
      "Sirve para colas JSONL: cada linea es una peticion con custom_id.",
      "En Codex, el patron es generar el batch, revisar muestras, lanzar, recoger resultados y abrir PR.",
    ],
    visual: {
      type: "image",
      asset: "batchNightRun",
      caption: "Imagen con humor: Codex deja preparado el batch, la automatizacion trabaja de noche y los gates deciden.",
      variant: "humor",
    },
    minutes: 4,
    note: "Esta pantalla aterriza conciencia de coste: no todo debe correr sincronico. Cuenta el caso de miles de archivos procesados por la noche, pero con muestras revisadas, retries y aprobaciones antes de abrir PR.",
  },
  {
    module: "M2",
    kicker: "GitHub Models",
    title: "GitHub Models dentro del flujo Codex",
    lead: "GitHub Models aporta catalogo, prompts versionados, comparaciones, evaluadores e inferencia desde workflows de GitHub.",
    bullets: [
      "Puede usarse en GitHub Actions con credenciales GitHub cuando la organizacion lo habilita.",
      "Los prompts `.prompt.yml` hacen que las instrucciones se revisen como codigo.",
      "Para Codex, es una forma natural de ejecutar pruebas de prompts y modelos en PR.",
    ],
    visual: { type: "cards", columns: 3, items: [["Catalog", "Modelos"], ["Prompt", ".prompt.yml"], ["Compare", "Side by side"], ["Evals", "Metricas"], ["REST", "Integracion"], ["Actions", "CI/CD"]] },
    minutes: 4,
    note: "Menciona que esta en preview en GitHub Models, asi que hay que validar disponibilidad de la org.",
  },
  {
    module: "M2",
    kicker: "Extensiones",
    title: "Extensiones internas de VS Code impulsadas por Codex",
    lead: "El siguiente paso de una skill es una extension interna que encapsula workflows de IA propios del equipo.",
    bullets: [
      "Botones y comandos para tareas recurrentes: generar tests, revisar modulo, explicar arquitectura, preparar PR.",
      "La extension llama a APIs internas o OpenAI y usa el workspace activo como contexto.",
      "Codex puede crear, mantener y probar la extension como cualquier proyecto TypeScript.",
    ],
    visual: { type: "stack", items: [["Command", "VS Code palette"], ["Context", "workspace, selection, git diff"], ["API", "Responses / internal"], ["Output", "patch, panel, PR comment"]] },
    minutes: 4,
    note: "No hace falta enseñar toda la API de VS Code: enfoca en producto interno y flujo.",
  },
  {
    module: "M2",
    kicker: "Contracts",
    title: "Contratos de tool y function calling",
    lead: "La extensibilidad extrema funciona cuando cada tool tiene contrato: parametros, side effects, errores, permisos y retry safety.",
    bullets: [
      "No expongas funciones ambiguas como `do_everything`.",
      "Usa schemas estrictos y outputs estructurados.",
      "Separa tools read-only de tools con escritura o impacto externo.",
    ],
    visual: { type: "code", lines: ["tool: create_pr_comment", "input: {", "  pr_number: number,", "  severity: 'info' | 'warning' | 'blocker',", "  body: string", "}", "side_effect: writes GitHub comment", "approval: required for blocker changes"] },
    minutes: 4,
    note: "Esta es una de las ideas centrales: la tool bien descrita reduce alucinacion y riesgo.",
  },
  {
    module: "M2",
    kicker: "Work queues",
    title: "Colas de trabajo para Codex automatizado",
    lead: "Para miles de archivos, no pidas a un agente que 'lo haga todo'. Convierte el repo en unidades pequeñas, medibles y reintentarles.",
    bullets: [
      "Unidad: archivo, simbolo, paquete, endpoint, test suite o issue.",
      "Estado: pending, running, failed, needs-human, done.",
      "Artefactos: prompt usado, output, diff, tokens, error y decision.",
    ],
    visual: { type: "pipe", items: [["Split", "Unidades"], ["Queue", "Estado"], ["Worker", "API"], ["Verify", "Tests"], ["Merge", "PRs"]] },
    minutes: 4,
    note: "La cola evita una macro-tarea imposible de depurar.",
  },
  {
    module: "M2",
    kicker: "Observabilidad",
    title: "Trazas antes de autonomia",
    lead: "Un sistema API-first sin logs, uso de tokens, inputs y outputs es imposible de gobernar.",
    bullets: [
      "Registra modelo, reasoning, prompt hash, tools usadas y coste estimado.",
      "Guarda sample de entradas y salidas respetando politicas de datos.",
      "Conecta logs con PR, commit, issue o run de CI.",
    ],
    visual: { type: "cards", columns: 3, items: [["Trace", "Run completo"], ["Usage", "Tokens y coste"], ["Artifacts", "Diffs y JSON"], ["Scores", "Eval pass/fail"], ["Owner", "Responsable"], ["Rollback", "Plan B"]] },
    minutes: 4,
    note: "Subraya: si no se puede auditar, no se automatiza.",
  },
  {
    module: "M2",
    kicker: "Resiliencia",
    title: "Rate limits, retries y idempotencia",
    lead: "La automatizacion masiva debe ser aburrida: reintentos controlados, deduplicacion y outputs reproducibles.",
    bullets: [
      "Diseña custom_id estable para mapear request y resultado.",
      "Reintenta solo errores transitorios y conserva errores definitivos.",
      "Haz que cada worker pueda correr dos veces sin duplicar side effects.",
    ],
    visual: { type: "matrix", items: [["Timeout", "Retry con backoff.", "medio"], ["429", "Queue y rate control.", "medio"], ["Tool write", "Idempotencia requerida.", "alto"], ["Schema drift", "Versionar outputs.", "medio"]] },
    minutes: 3,
    note: "Esto es engineering clasico aplicado a IA. Da mucha credibilidad al curso.",
  },
  {
    module: "M2",
    kicker: "Safety",
    title: "API-first con aprobaciones Codex",
    lead: "Codex enseña la cultura de permisos: lectura, escritura, red, secretos y sistemas externos tienen niveles de riesgo.",
    bullets: [
      "Read-only para analisis y clasificacion.",
      "Workspace-write para patches con tests.",
      "External-write solo con aprobacion, trazabilidad y rollback.",
      "Prod y secretos fuera de alcance salvo politica explicita.",
    ],
    visual: { type: "matrix", items: [["Read", "Analisis seguro.", "bajo"], ["Patch", "Diff y tests.", "medio"], ["Comment", "Side effect visible.", "medio"], ["Deploy", "Gate humano.", "alto"]] },
    minutes: 4,
    note: "Une el modulo API con la mentalidad de seguridad de Codex.",
  },
  {
    module: "M3",
    layout: "chapter",
    chapter: "3",
    kicker: "Modulo 3",
    title: "Datos sinteticos y destilacion para Codex",
    lead: "Cuando el dominio de la empresa no cabe en un prompt, se convierte en datos, evals y modelos optimizados.",
    points: ["Synthetic Q/A", "Conversaciones senior/junior", "SFT", "DPO", "RFT", "SLMs", "Gobierno de datos"],
    minutes: 2,
    note: "Aclara que esta parte es avanzada de verdad: no siempre se necesita fine-tuning.",
  },
  {
    module: "M3",
    kicker: "Problema",
    title: "Cuando el modelo generico no entiende tu empresa",
    lead: "Frameworks legacy, convenciones internas, APIs privadas y arquitectura vieja pueden superar al contexto manual.",
    bullets: [
      "RAG ayuda a traer conocimiento actualizado.",
      "Fine-tuning ayuda a repetir forma, estructura, estilo o comportamiento.",
      "Destilacion ayuda a mover conocimiento operativo a modelos mas pequeños y baratos.",
    ],
    visual: { type: "compare", leftTitle: "RAG", left: ["Conocimiento externo", "Actualizable", "Citas y fuentes"], rightTitle: "Fine-tuning", right: ["Comportamiento", "Formato", "Eficiencia"] },
    minutes: 4,
    note: "Regla clara: conocimiento nuevo suele ser RAG; comportamiento repetido suele ser fine-tuning.",
  },
  {
    module: "M3",
    kicker: "Flywheel",
    title: "Data flywheel de Codex",
    lead: "Cada interaccion buena con Codex puede alimentar el sistema: prompts, diffs, reviews, tests, errores y decisiones.",
    bullets: [
      "Captura tareas reales, no ejemplos inventados sin base.",
      "Normaliza entradas y salidas: objetivo, contexto, constraints, done when.",
      "Etiqueta con resultado: aprobado, rechazado, bug, ahorro, coste.",
    ],
    visual: { type: "pipe", items: [["Codex run", "Trabajo"], ["Artifacts", "Diff/test"], ["Label", "Calidad"], ["Dataset", "JSONL"], ["Eval/train", "Mejora"]] },
    minutes: 4,
    note: "El dataset mas valioso sale del trabajo real, siempre con privacidad y permiso.",
  },
  {
    module: "M3",
    kicker: "Synthetic Q/A",
    title: "Generar pares pregunta/respuesta del codebase",
    lead: "Un modelo grande puede producir Q/A sobre arquitectura interna, pero Codex debe verificar que cada respuesta cite rutas y simbolos reales.",
    bullets: [
      "Input: archivos, docs, ADRs, tests y convenciones.",
      "Output: pregunta, respuesta, evidencia, dificultad y tags.",
      "Filtro: descartar respuestas sin fuente o con inferencias no verificadas.",
    ],
    visual: {
      type: "image",
      asset: "memeSyntheticDataFactory",
      caption: "Imagen con gracia: los datos sinteticos buenos salen de evidencia real, filtros de calidad y ejemplos que pasan limpieza.",
      variant: "data",
    },
    minutes: 5,
    note: "Insiste en evidencia. Sin rutas reales, el dataset sintetico contamina. Remate: no es una fabrica de respuestas bonitas; es una depuradora de ejemplos verificables.",
  },
  {
    module: "M3",
    kicker: "Conversaciones",
    title: "Chats sinteticos senior/junior",
    lead: "Las conversaciones sinteticas enseñan estilo de soporte interno: como un senior explica arquitectura, errores y tradeoffs a un junior.",
    bullets: [
      "Escenarios: onboarding, bug triage, migracion, review, incidente.",
      "Roles: junior pregunta, senior responde con fuentes y razonamiento resumido.",
      "Guardrail: no inventar politicas ni APIs no documentadas.",
    ],
    visual: { type: "cards", columns: 2, items: [["Junior", "No entiendo por que este test falla."], ["Senior", "Mira el contrato en auth/session.ts y este fixture."], ["Junior", "Entonces cambio el adapter?"], ["Senior", "Si, pero conserva compatibilidad con v1."]] },
    minutes: 4,
    note: "Estas conversaciones pueden alimentar asistentes internos de onboarding.",
  },
  {
    module: "M3",
    kicker: "Limpieza",
    title: "Pipeline de etiquetado y limpieza",
    lead: "El 80% del valor esta en filtrar, deduplicar y medir calidad del dataset antes de entrenar nada.",
    bullets: [
      "Detecta ejemplos duplicados, obsoletos, sin evidencia o con secretos.",
      "Separa train, validation y test antes de optimizar.",
      "Conserva version de repo, commit y fecha de generacion.",
    ],
    visual: { type: "pipe", items: [["Generate", "Sintetico"], ["Scrub", "Secretos"], ["Verify", "Fuentes"], ["Split", "Train/test"], ["Freeze", "Version"]] },
    minutes: 4,
    note: "Aqui puedes contar una verdad incomoda: entrenar con basura solo escala basura.",
  },
  {
    module: "M3",
    kicker: "Evals first",
    title: "Antes de afinar: evalua",
    lead: "OpenAI recomienda evaluar comportamientos con datasets y graders. Sin baseline no sabes si el fine-tuning ayuda.",
    bullets: [
      "Define la tarea y los criterios antes de tocar el modelo.",
      "Usa graders: string checks, schema checks, similarity o model graders segun caso.",
      "Compara base model, prompt mejorado, RAG y fine-tuned model.",
    ],
    visual: { type: "pipe", items: [["Dataset", "Casos"], ["Baseline", "Modelo base"], ["Prompt/RAG", "Mejora"], ["Fine-tune", "Optimiza"], ["Compare", "Decision"]] },
    minutes: 4,
    note: "La pregunta no es 'podemos fine-tunear'; es 'supera el baseline con coste menor'.",
  },
  {
    module: "M3",
    kicker: "Metodos",
    title: "SFT, DPO, RFT: que significa para Codex",
    lead: "OpenAI documenta varias formas de optimizar modelos. La eleccion depende de si quieres ejemplos correctos, preferencias o recompensa programable.",
    bullets: [
      "SFT: ejemplos input/output para formato, instrucciones o patrones internos.",
      "DPO: preferencias entre respuesta buena y mala para tono, foco o estilo.",
      "RFT: tareas con grader y señal numerica, especialmente razonamiento especializado.",
    ],
    visual: { type: "cards", columns: 3, items: [["SFT", "Imita ejemplos"], ["DPO", "Prefiere A sobre B"], ["RFT", "Optimiza reward"], ["RAG", "Trae conocimiento"], ["Evals", "Mide"], ["Codex", "Opera"]] },
    minutes: 5,
    note: "Evita prometer que cualquier metodo esta disponible para cualquier modelo; remite a docs actuales.",
  },
  {
    module: "M3",
    kicker: "Destilacion",
    title: "Destilar a modelos mas pequeños",
    lead: "La destilacion busca que un modelo mas pequeño, rapido y barato replique comportamientos de calidad en un dominio estrecho.",
    bullets: [
      "El teacher genera o corrige ejemplos con alta calidad.",
      "El student aprende el patron en una tarea concreta.",
      "La medida de exito es dominio + coste + latencia, no inteligencia general.",
    ],
    visual: {
      type: "image",
      asset: "distillationLab",
      caption: "Imagen de reflexion: no se afina por moda; se destila conocimiento cuando el dominio lo justifica.",
      variant: "reflection",
    },
    minutes: 5,
    note: "Aclara que 'superar al grande' solo significa en una tarea estrecha y evaluada. Usa la imagen para explicar teacher, filtros, privacidad y student especializado.",
  },
  {
    module: "M3",
    kicker: "Datos sensibles",
    title: "Gobierno de datos para repos propietarios",
    lead: "La fase ultra toca codigo privado, secretos y conocimiento empresarial: no hay dataset sin politica.",
    bullets: [
      "Eliminar secretos, tokens, PII y datos contractuales.",
      "Definir quien puede generar, revisar y usar datasets.",
      "Registrar origen, licencia, retention, region y permisos.",
    ],
    visual: { type: "matrix", items: [["Secrets", "Nunca entrenar.", "alto"], ["PII", "Minimizar o anonimizar.", "alto"], ["Codigo propietario", "Permiso y registro.", "medio"], ["Docs publicas", "Menor riesgo.", "bajo"]] },
    minutes: 4,
    note: "Esta pantalla debe sonar seria: los datasets son activos corporativos.",
  },
  {
    module: "M3",
    kicker: "Decision",
    title: "Cuando NO fine-tunear",
    lead: "Fine-tuning no es memoria magica. Muchas veces AGENTS.md, RAG, prompts, tools o evals arreglan el problema antes.",
    bullets: [
      "No fine-tunees para conocimiento que cambia cada semana.",
      "No fine-tunees si no tienes evals ni datos limpios.",
      "No fine-tunees para reemplazar una tool determinista.",
      "No fine-tunees si el problema era mal contexto.",
    ],
    visual: { type: "compare", leftTitle: "Mejor RAG/tool", left: ["Datos cambiantes", "Fuentes citables", "Acciones externas"], rightTitle: "Mejor fine-tune", right: ["Formato repetido", "Estilo estable", "Menos tokens"] },
    minutes: 4,
    note: "Esta pantalla evita hype y protege presupuesto.",
  },
  {
    module: "M4",
    layout: "chapter",
    chapter: "4",
    kicker: "Modulo 4",
    title: "Enterprise RAG profundo para Codex",
    lead: "Convertir monolitos y sistemas legacy en contexto recuperable, con estructura de codigo y no solo chunks de texto.",
    points: ["AST", "Embeddings", "Vector DB", "Hybrid search", "MCP", "Freshness", "RAG evals"],
    minutes: 2,
    note: "Este modulo es la pieza de contexto infinito que el usuario pidio.",
  },
  {
    module: "M4",
    kicker: "Problema",
    title: "El contexto perfecto no cabe en una ventana",
    lead: "Codex puede leer mucho, pero en empresas grandes el problema es seleccionar el 1% exacto del codebase en milisegundos.",
    bullets: [
      "Millones de lineas, historico, docs, tickets, ADRs, tests y ownership.",
      "El reto no es almacenar todo, sino recuperar lo que cambia la decision.",
      "RAG enterprise convierte busqueda en infraestructura de desarrollo.",
    ],
    visual: { type: "stack", items: [["Repo", "Codigo y tests"], ["Docs", "ADRs y runbooks"], ["Issues", "Contexto historico"], ["RAG", "Top-k con metadata"], ["Codex", "Patch informado"]] },
    minutes: 4,
    note: "Conecta con Codex: RAG no reemplaza al agente, lo alimenta.",
  },
  {
    module: "M4",
    kicker: "Chunking",
    title: "Por que cortar texto no basta para codigo",
    lead: "Un chunk por tamaño rompe clases, funciones, imports y contratos. Para codigo, la unidad semantica importa.",
    bullets: [
      "Una funcion partida pierde firma, tipos y llamadas.",
      "Un archivo entero mete ruido y supera limites.",
      "La estrategia correcta mezcla simbolos, dependencias y contexto local.",
    ],
    visual: { type: "compare", leftTitle: "Chunk naive", left: ["Cada 800 tokens", "Rompe sintaxis", "Poca metadata"], rightTitle: "Chunk codigo", right: ["Funcion/clase", "Imports y llamadas", "Ruta, simbolo, owner"] },
    minutes: 4,
    note: "Esta pantalla suele hacer clic en equipos con monolitos.",
  },
  {
    module: "M4",
    kicker: "AST",
    title: "AST chunking con Tree-sitter",
    lead: "Tree-sitter permite parsear codigo en arboles de sintaxis y extraer unidades como funciones, clases, metodos o bloques relevantes.",
    bullets: [
      "Parsea por lenguaje y conserva estructura.",
      "Extrae simbolos, rangos de linea, imports, exports y llamadas aproximadas.",
      "Permite chunking estable aunque cambie el formato del archivo.",
    ],
    visual: {
      type: "image",
      asset: "memeAstChunking",
      caption: "Meme visual: el AST corta por ramas semanticas; la sierra de tokens corta por donde le pilla.",
      variant: "rag",
    },
    minutes: 5,
    note: "No hace falta implementar parser completo; explica la unidad semantica. Remate: para codigo, un chunk no es un trozo de texto; es una pieza con firma, imports, callers, tests y owner.",
  },
  {
    module: "M4",
    kicker: "Code graph",
    title: "Del AST al grafo de codigo",
    lead: "Para preguntas de arquitectura, la similitud vectorial no basta: necesitas relaciones entre simbolos.",
    bullets: [
      "Call graph: quien llama a quien.",
      "Dependency graph: paquetes, imports y owners.",
      "Impact graph: que tests y modulos se ven afectados.",
    ],
    visual: {
      type: "image",
      asset: "enterpriseRag",
      caption: "Imagen primaria: el RAG profundo convierte codigo en AST, grafo, embeddings y contexto gobernado para Codex.",
      variant: "rag",
    },
    minutes: 4,
    note: "Pon ejemplo: cambiar auth/session afecta middleware, tests y docs. La imagen debe llevar la conversacion de embeddings genericos a grafo de impacto, owners y freshness.",
  },
  {
    module: "M4",
    kicker: "Embeddings",
    title: "Embeddings para busqueda semantica de codigo",
    lead: "OpenAI embeddings convierten texto en vectores para buscar por similitud. En codigo, el texto a embeber debe estar cuidadosamente construido.",
    bullets: [
      "Incluye firma, docstring, resumen, ruta, imports y ejemplos de uso.",
      "Usa metadata para filtrar por lenguaje, paquete, owner, version y tipo de simbolo.",
      "Mide coste: embeddings se facturan por tokens de entrada.",
    ],
    visual: { type: "pipe", items: [["Chunk", "Simbolo"], ["Enrich", "Metadata"], ["Embed", "Vector"], ["Store", "DB"], ["Retrieve", "Top-k"]] },
    minutes: 4,
    note: "No prometas que embedding entiende eventos recientes; para eso esta la actualizacion del indice.",
  },
  {
    module: "M4",
    kicker: "Vector DB",
    title: "Bases vectoriales en produccion",
    lead: "La vector DB no es el producto; es una capa de infraestructura con ingestion, filtros, permisos, ranking y observabilidad.",
    bullets: [
      "Indexa incrementalmente por commit o merge.",
      "Filtra por repo, branch, owner, lenguaje, sensibilidad y version.",
      "Registra consultas, resultados usados y acierto de retrieval.",
    ],
    visual: { type: "cards", columns: 3, items: [["Ingestion", "Commits"], ["Metadata", "Filtros"], ["Hybrid", "BM25 + vector"], ["Rerank", "Precision"], ["ACL", "Permisos"], ["Metrics", "Recall"]] },
    minutes: 4,
    note: "Insiste en permisos: RAG no debe saltarse ACLs del codigo.",
  },
  {
    module: "M4",
    kicker: "Hybrid",
    title: "Hybrid retrieval para Codex",
    lead: "El mejor contexto para Codex suele combinar lexical search, semantic search, graph traversal y reranking.",
    bullets: [
      "Lexical: nombres exactos, errores, simbolos, stack traces.",
      "Vector: intencion semantica y analogias.",
      "Graph: dependencias y rutas de impacto.",
      "Rerank: ordenar evidencia final para el agente.",
    ],
    visual: { type: "pipe", items: [["Query", "Bug"], ["BM25", "Exact"], ["Vector", "Semantic"], ["Graph", "Impact"], ["Rerank", "Context"]] },
    minutes: 4,
    note: "Usa un stack trace como ejemplo: lexical encuentra funcion; graph encuentra tests; vector encuentra docs.",
  },
  {
    module: "M4",
    kicker: "Codex + MCP",
    title: "Exponer el RAG a Codex via MCP",
    lead: "El RAG enterprise debe llegar a Codex como herramienta: buscar simbolos, explicar impacto, recuperar docs y devolver fuentes.",
    bullets: [
      "MCP server read-only para busqueda de codigo y docs.",
      "Tools pequeñas: search_symbol, get_callers, impact_tests, fetch_adr.",
      "Respuesta con rutas, lineas, commit, score y razon de inclusion.",
    ],
    visual: { type: "code", lines: ["tool: impact_tests", "input: { symbol: 'createInvoice' }", "output: {", "  files: ['tests/billing/invoice.test.ts'],", "  confidence: 0.82,", "  reason: 'direct caller + fixture usage'", "}"] },
    minutes: 5,
    note: "Esta es la conexion directa con Codex: el RAG se usa como tool gobernada.",
  },
  {
    module: "M4",
    kicker: "File search",
    title: "File search vs RAG propio",
    lead: "OpenAI file_search y vector stores son muy utiles cuando quieres hosted retrieval. Un RAG propio da mas control sobre AST, ACL y ranking.",
    bullets: [
      "File search: rapido para conocimiento documental y archivos soportados.",
      "RAG propio: mejor cuando necesitas AST, grafo, permisos finos o ranking especifico.",
      "En enterprise puede haber una mezcla: hosted para docs, propio para codigo.",
    ],
    visual: { type: "compare", leftTitle: "Hosted file_search", left: ["Menos infraestructura", "Vector stores", "Citas de archivos"], rightTitle: "RAG propio", right: ["AST y graph", "ACL custom", "Ranking a medida"] },
    minutes: 4,
    note: "No hay guerra de herramientas: hay tradeoffs.",
  },
  {
    module: "M4",
    kicker: "Freshness",
    title: "Freshness: el indice se pudre",
    lead: "Un RAG de codigo debe actualizarse con commits, ramas, releases y cambios de ownership.",
    bullets: [
      "Indexacion incremental en merge o schedule.",
      "Invalidacion por archivo, simbolo o paquete.",
      "Versionado para reproducir que contexto vio el agente en una PR.",
    ],
    visual: {
      type: "image",
      asset: "memeRagStale",
      caption: "Imagen con gracia: un indice RAG tambien caduca; si no refresca con commits, Codex consulta contexto congelado.",
      variant: "rag-stale",
    },
    minutes: 4,
    note: "Muy importante para auditoria: saber que version de contexto uso Codex. Usa el chiste del 'frigorifico de embeddings' para que recuerden freshness, invalidacion y versionado.",
  },
  {
    module: "M4",
    kicker: "RAG evals",
    title: "Evaluar retrieval, no solo respuestas",
    lead: "Un RAG puede fallar porque recupera mal aunque el modelo escriba bonito. Evalua retrieval por separado.",
    bullets: [
      "Recall@k: aparece el archivo correcto en los resultados?",
      "MRR: aparece pronto o perdido en la lista?",
      "Answer faithfulness: la respuesta usa fuentes recuperadas?",
      "Regression set: bugs y preguntas historicas del equipo.",
    ],
    visual: { type: "cards", columns: 2, items: [["Recall@k", "Cobertura de contexto"], ["MRR", "Ranking"], ["Faithfulness", "No inventar"], ["Latency", "Milisegundos reales"]] },
    minutes: 4,
    note: "Esto prepara la parte de jueces y CI/CD.",
  },
  {
    module: "M5",
    layout: "chapter",
    chapter: "5",
    kicker: "Modulo 5",
    title: "CI/CD, LLM-as-a-Judge y PR swarms",
    lead: "Convertir Codex en revision colaborativa automatizada, con gates medibles y humano al mando.",
    points: ["PR pipeline", "Rubricas", "Jueces", "Consensus", "Checks", "Human gates"],
    minutes: 2,
    note: "Este modulo es el puente entre arquitectura y uso diario de equipos.",
  },
  {
    module: "M5",
    kicker: "Pipeline",
    title: "PR swarm: flujo de alto nivel",
    lead: "Un PR swarm no escribe por escribir: analiza el diff, consulta contexto, ejecuta pruebas, debate hallazgos y propone decision.",
    bullets: [
      "Entrada: diff, base branch, tests, AGENTS.md, RAG y politicas.",
      "Agentes: arquitectura, QA, seguridad, docs, coste.",
      "Salida: findings deduplicados, severidad, evidencia y gate.",
    ],
    visual: { type: "pipe", items: [["Diff", "PR"], ["RAG", "Context"], ["Agents", "Review"], ["Judge", "Rubric"], ["Check", "Gate"]] },
    minutes: 4,
    note: "No permitas que el swarm apruebe sin evidencia de tests o razones claras.",
  },
  {
    module: "M5",
    kicker: "Architect",
    title: "Agente Arquitecto de PR",
    lead: "El arquitecto revisa coherencia, acoplamiento, contratos publicos y compatibilidad con decisiones previas.",
    bullets: [
      "Busca cambios que rompen boundaries o patrones del repo.",
      "Consulta ADRs, AGENTS.md y grafo de dependencias.",
      "Emite riesgos con rutas y sugerencias, no comentarios esteticos.",
    ],
    visual: { type: "cards", columns: 2, items: [["Input", "Diff + ADR + graph"], ["Checks", "Boundaries, APIs, contracts"], ["Output", "Risk findings"], ["Gate", "Block only if architectural risk"]] },
    minutes: 3,
    note: "Define que no es un linter de arquitectura; es un detector de decisiones costosas.",
  },
  {
    module: "M5",
    kicker: "QA",
    title: "Agente QA: reproduce antes de opinar",
    lead: "QA debe ejecutar o proponer pruebas relacionadas con el cambio, y distinguir fallo real de sospecha.",
    bullets: [
      "Mapea archivos tocados a tests afectados.",
      "Ejecuta tests si el entorno lo permite; si no, explica bloqueo.",
      "Propone casos edge con criterio de negocio.",
    ],
    visual: { type: "pipe", items: [["Touched", "Files"], ["Impact", "Tests"], ["Run", "Commands"], ["Edge", "Cases"], ["Report", "Evidence"]] },
    minutes: 3,
    note: "Este agente es el antidoto contra reviews llenas de opiniones sin reproduccion.",
  },
  {
    module: "M5",
    kicker: "Security",
    title: "Agente Security y compliance",
    lead: "Security mira permisos, secretos, datos sensibles, dependencias y acciones externas.",
    bullets: [
      "Detecta cambios en auth, crypto, logging, red, permisos y supply chain.",
      "Cruza con politicas del repo y dependencias actualizadas.",
      "Escala a humano si hay impacto en produccion o datos sensibles.",
    ],
    visual: { type: "matrix", items: [["Secrets", "Bloqueo inmediato.", "alto"], ["Auth", "Revision humana.", "alto"], ["Dependency", "SBOM y CVE.", "medio"], ["Logging", "PII y retention.", "medio"]] },
    minutes: 4,
    note: "No conviertas security en miedo: es un gate especializado.",
  },
  {
    module: "M5",
    kicker: "LLM judge",
    title: "LLM-as-a-Judge con rubrica",
    lead: "Un juez LLM sirve para evaluar salidas cuando la calidad es semantica, pero necesita rubrica, ejemplos y calibracion.",
    bullets: [
      "Define escala, criterios y ejemplos de pass/fail.",
      "No uses juez para sustituir tests deterministas.",
      "Evalua al juez: agreement con humanos, sesgos y drift.",
    ],
    visual: {
      type: "image",
      asset: "reflectionJudgeCalibration",
      caption: "Imagen de reflexion: un juez LLM tambien se evalua; la rubrica pesa evidencia y el humano calibra el criterio.",
      variant: "judge",
    },
    minutes: 5,
    note: "OpenAI Evals permite graders. El juez es parte del sistema, tambien se testea. Remate: si el juez no se calibra contra humanos, solo has automatizado la confianza.",
  },
  {
    module: "M5",
    kicker: "Consensus",
    title: "Protocolo de consenso",
    lead: "El consenso no es votar. Es resolver conflictos entre hallazgos con evidencia y severidad.",
    bullets: [
      "Deduplicar: varios agentes pueden ver el mismo problema.",
      "Contrastar: si QA y Arquitecto discrepan, pedir evidencia adicional.",
      "Decidir: bloquear solo hallazgos reproducibles o de alto riesgo.",
    ],
    visual: {
      type: "image",
      asset: "prJudge",
      caption: "Imagen con humor serio: varios revisores miran la misma evidencia, pero el gate humano sigue mandando.",
      variant: "judge",
    },
    minutes: 4,
    note: "El orquestador debe reducir ruido para no agotar al equipo. Aqui conviene contar que consenso no es votar: es deduplicar, desafiar con evidencia y decidir severidad.",
  },
  {
    module: "M5",
    kicker: "Checks",
    title: "Checks y annotations en GitHub",
    lead: "La salida del swarm debe integrarse donde vive el equipo: checks, comentarios, annotations y artefactos.",
    bullets: [
      "Comentario resumen para humanos.",
      "Annotations por archivo/linea cuando hay evidencia concreta.",
      "Artefacto JSON para trazabilidad y futuras evals.",
      "Status check para gate automatico o manual.",
    ],
    visual: { type: "cards", columns: 2, items: [["PR comment", "Resumen accionable"], ["Annotations", "Linea exacta"], ["Artifact", "JSON de findings"], ["Check", "pass/fail/escalate"]] },
    minutes: 3,
    note: "Evita comentarios kilométricos. Mejor hallazgos accionables y trazables.",
  },
  {
    module: "M5",
    kicker: "Human gates",
    title: "Humano al mando",
    lead: "Ultra avanzado no significa auto-merge ciego. Significa que el humano recibe mejores evidencias y menos ruido.",
    bullets: [
      "Auto-approve solo en cambios de bajo riesgo y con tests verdes.",
      "Request changes cuando hay bug reproducible o politica violada.",
      "Escalate cuando el swarm no puede decidir o toca dominio sensible.",
    ],
    visual: {
      type: "image",
      asset: "reflectionHumanGate",
      caption: "Imagen de reflexion: Codex acelera carriles, pero el humano define gates, politicas, presupuesto y escalado.",
      variant: "governance",
    },
    minutes: 4,
    note: "Esta frase debe quedar: autonomia sin gates no es madurez, es deuda. La imagen ayuda a aterrizar que el humano no revisa mas ruido; recibe mejores evidencias para decidir.",
  },
  {
    module: "M6",
    layout: "chapter",
    chapter: "6",
    kicker: "Modulo 6",
    title: "Gobierno, playbooks y labs Codex Ultra",
    lead: "Como convertir todo lo anterior en adopcion real: AGENTS.md, MCP, skills, costes, seguridad y proyectos finales.",
    points: ["Control plane", "AGENTS.md", "MCP mesh", "Skills", "Coste", "Labs", "Roadmap"],
    minutes: 2,
    note: "El cierre debe dejar al equipo con artefactos concretos.",
  },
  {
    module: "M6",
    kicker: "Control plane",
    title: "Codex como plano de control",
    lead: "Codex puede diseñar, lanzar, inspeccionar y corregir estos sistemas, pero las politicas viven en codigo y configuracion.",
    bullets: [
      "Codex diseña workflows, genera scripts, revisa trazas y depura pipelines.",
      "El repo guarda AGENTS.md, skills, configs, evals, prompts y policies.",
      "La org define modelos permitidos, datos, costes y aprobaciones.",
    ],
    visual: { type: "stack", items: [["Org", "Politicas"], ["Repo", "Playbooks"], ["Codex", "Operacion"], ["CI/CD", "Ejecucion"], ["Metrics", "Mejora"]] },
    minutes: 4,
    note: "Esta pantalla resume el mensaje del curso: Codex no es un boton, es una forma de operar.",
  },
  {
    module: "M6",
    kicker: "Material real",
    title: "Kit ultra de trabajo",
    lead: "El curso incluye prompts, plantillas, skills, labs y prototipos ejecutables para aterrizar swarms, Batch, RAG, datasets y jueces sobre Codex.",
    bullets: [
      "Prompts para PR swarms, Batch, datasets, RAG, jueces, coste y capstone.",
      "Plantillas de AGENTS.md, config.toml, contratos, schemas, GitHub Actions y rubricas.",
      "Ejemplos offline: PR swarm, Batch JSONL, dataset sintetico y RAG por simbolos.",
    ],
    visual: {
      type: "resources",
      items: [
        ["Indice", "materiales/README.md", "Ruta de uso del kit ultra."],
        ["Prompts", "materiales/prompts-ultra.md", "Encargos listos para Codex."],
        ["AGENTS", "materiales/plantillas/AGENTS.ultra.example.md", "Contrato para agentes y swarms."],
        ["Config", "materiales/plantillas/config-codex-ultra.example.toml", "Subagentes, MCP, skills y permisos."],
        ["PR swarm", "materiales/ejemplos/pr-swarm-local/README.md", "Review local con JSON de findings."],
        ["Batch", "materiales/ejemplos/batch-jsonl-planner/README.md", "JSONL validado para trabajo asincrono."],
        ["Dataset", "materiales/ejemplos/synthetic-dataset-pipeline/README.md", "Onboarding sintetico con evidencia."],
        ["Code RAG", "materiales/ejemplos/rag-ast-mini/README.md", "Indice de simbolos y tests relacionados."],
      ],
    },
    minutes: 5,
    note: "Abre al menos un README y ejecuta un npm test. Esta pantalla debe demostrar que el curso no se queda en arquitectura.",
  },
  {
    module: "M6",
    kicker: "AGENTS.md",
    title: "AGENTS.md para equipos de agentes",
    lead: "AGENTS.md debe explicar no solo como codificar, sino como deben comportarse los agentes y swarms dentro del repo.",
    bullets: [
      "Ownership: que carpetas puede tocar cada rol.",
      "Verificacion: comandos obligatorios y gates.",
      "Riesgo: rutas sensibles, datos, secretos y permisos.",
      "Formato: como reportar findings y evidencias.",
    ],
    visual: { type: "code", lines: ["# AGENTS.md", "## Swarm rules", "- Architect may inspect all files, no writes.", "- Worker owns assigned paths only.", "- QA must report commands and outputs.", "- Security findings require evidence and severity."] },
    minutes: 4,
    note: "Muestra AGENTS.md como contrato de organizacion, no como prompt decorativo.",
  },
  {
    module: "M6",
    kicker: "MCP mesh",
    title: "MCP mesh para Codex enterprise",
    lead: "MCP permite conectar Codex con RAG, GitHub, Sentry, Jira, Figma, docs internas y herramientas propias.",
    bullets: [
      "Empieza read-only y con tools pequeñas.",
      "Segmenta por dominio: code-search, incidents, docs, design, tickets.",
      "Cada servidor debe tener owner, version, logs y permisos.",
    ],
    visual: { type: "swarm", center: "Codex", nodes: [["RAG", "code"], ["GitHub", "PR"], ["Sentry", "logs"], ["Docs", "policy"], ["Jira", "issues"]] },
    minutes: 4,
    note: "El mesh no debe ser un cajon de tools; debe parecer un catalogo gobernado.",
  },
  {
    module: "M6",
    kicker: "Skills",
    title: "Skills como playbooks Codex",
    lead: "Las skills empaquetan instrucciones, scripts, referencias y assets para que los workflows ultra no dependan de memoria humana.",
    bullets: [
      "Skill de PR swarm: pasos, rubricas, formato y comandos.",
      "Skill de RAG indexing: parser, metadata, eval y refresh.",
      "Skill de dataset: scrub, generate, verify, split y publish.",
    ],
    visual: { type: "cards", columns: 3, items: [["PR swarm", "Review"], ["RAG index", "Context"], ["Dataset", "Distill"], ["Eval", "Gate"], ["Release", "Ship"], ["Incident", "Debug"]] },
    minutes: 4,
    note: "Hazlo practico: cada skill debe tener un owner y un trigger claro.",
  },
  {
    module: "M6",
    kicker: "Coste",
    title: "Modelo de coste ultra avanzado",
    lead: "Swarms, Batch, RAG, evals y fine-tuning cambian el coste: hay que presupuestar por pipeline, no por prompt.",
    bullets: [
      "Coste directo: tokens, herramientas, embeddings, storage y training.",
      "Coste indirecto: ruido en PR, revisiones humanas y mantenimiento de indices.",
      "Ahorro: menos bugs, onboarding mas rapido, refactors masivos y reviews mejores.",
    ],
    visual: {
      type: "image",
      asset: "memeTokenCost",
      caption: "Meme visual: si el pipeline mete tokens, RAG, jueces y retries sin presupuesto, el marcador se llena solo.",
      variant: "cost",
    },
    minutes: 4,
    note: "Repite: lo barato no es gastar menos tokens; es gastar donde reduce trabajo humano y riesgo. Remate para clase: el presupuesto no mata la autonomia, la hace sostenible.",
  },
  {
    module: "M6",
    kicker: "Security",
    title: "Fronteras de seguridad",
    lead: "La fase ultra cruza repos, herramientas y datos. Las fronteras deben estar antes del primer pipeline.",
    bullets: [
      "Separar entornos: local, CI, staging, produccion.",
      "Separar permisos: read, write, comment, deploy, secrets.",
      "Separar datos: codigo publico, privado, sensible, regulado.",
      "Separar modelos: experimental, aprobado, restricted.",
    ],
    visual: { type: "stack", items: [["Data", "Clasificacion"], ["Access", "RBAC"], ["Tools", "Allowlist"], ["Models", "Politica"], ["Audit", "Trazas"]] },
    minutes: 4,
    note: "Ideal para perfiles enterprise: aqui se gana confianza.",
  },
  {
    module: "M6",
    kicker: "Lab 1",
    title: "Construir un PR swarm local",
    lead: "Objetivo: que Codex cree un orquestador minimo que lea un diff y simule Architect, QA y Security con salida JSON.",
    bullets: [
      "Input: git diff y AGENTS.md.",
      "Roles: tres prompts especialistas con contrato de salida.",
      "Output: findings deduplicados, severity, evidence y decision.",
      "Verify: usar un PR fixture con bug conocido.",
    ],
    visual: { type: "pipe", items: [["Diff", "Input"], ["3 roles", "Review"], ["JSON", "Findings"], ["Judge", "Gate"], ["Comment", "PR"]] },
    minutes: 35,
    note: "Este lab puede hacerse sin llamar APIs reales si usas fixtures; luego se conecta a API.",
  },
  {
    module: "M6",
    kicker: "Lab 2",
    title: "Indexar un repo con AST + embeddings",
    lead: "Objetivo: crear un mini RAG de codigo para que Codex consulte simbolos y tests afectados.",
    bullets: [
      "Parsear archivos de un lenguaje con Tree-sitter o parser nativo.",
      "Extraer simbolos, metadata y texto enriquecido.",
      "Generar embeddings y almacenar en SQLite/vector DB simple.",
      "Exponer search_symbol como CLI o MCP mock.",
    ],
    visual: { type: "pipe", items: [["Parse", "AST"], ["Chunk", "Symbols"], ["Embed", "Vectors"], ["Search", "Top-k"], ["Codex", "Use"]] },
    minutes: 45,
    note: "Si el tiempo aprieta, simula vector DB con un JSON y centra la clase en metadata.",
  },
  {
    module: "M6",
    kicker: "Lab 3",
    title: "Dataset sintetico para onboarding Codex",
    lead: "Objetivo: generar Q/A y conversaciones senior/junior con evidencia de rutas del repo.",
    bullets: [
      "Seleccionar 20 preguntas reales de onboarding.",
      "Generar respuestas con fuentes y dificultad.",
      "Filtrar ejemplos sin evidencia.",
      "Crear eval para medir respuestas del asistente interno.",
    ],
    visual: { type: "cards", columns: 2, items: [["Q/A", "Arquitectura"], ["Chat", "Senior/junior"], ["Evidence", "Rutas reales"], ["Eval", "Baseline"]] },
    minutes: 40,
    note: "Este lab demuestra por que destilacion empieza con dataset, no con training.",
  },
  {
    module: "M6",
    kicker: "Capstone",
    title: "Proyecto final Codex Ultra",
    lead: "El capstone une todo: PR swarm + RAG de codigo + juez + comentario GitHub + notas de coste.",
    bullets: [
      "El swarm revisa una PR fixture.",
      "Consulta RAG para encontrar contexto y tests.",
      "Juez aplica rubrica y genera decision.",
      "Codex revisa el sistema, mejora prompts y documenta riesgos.",
    ],
    visual: { type: "pipe", items: [["PR", "Fixture"], ["RAG", "Context"], ["Swarm", "Roles"], ["Judge", "Gate"], ["Codex", "Improve"]] },
    minutes: 60,
    note: "El objetivo final no es que el sistema sea enorme, sino que sea completo y auditable.",
  },
  {
    module: "M6",
    kicker: "Roadmap",
    title: "Roadmap de adopcion en 60 dias",
    lead: "Un equipo no adopta Codex Ultra de golpe. Se escala por capas y con metricas.",
    bullets: [
      "Semana 1-2: AGENTS.md, prompt canvas, evals de review.",
      "Semana 3-4: PR swarm local y MCP read-only.",
      "Semana 5-6: RAG de codigo con metadata y evals.",
      "Semana 7-8: dataset sintetico, Batch jobs y piloto CI.",
    ],
    visual: { type: "stack", items: [["S1-2", "Base y politicas"], ["S3-4", "Swarm local"], ["S5-6", "RAG"], ["S7-8", "CI y datasets"]] },
    minutes: 4,
    note: "Da una ruta realista para managers y tech leads.",
  },
  {
    module: "M6",
    kicker: "Cierre",
    title: "La tesis del curso",
    lead: "Codex Ultra no va de tener mas IA. Va de convertir el desarrollo asistido en un sistema gobernado, medible y conectado al repo.",
    bullets: [
      "Swarms para distribuir criterio, no para multiplicar ruido.",
      "APIs para escala, no para saltarse revision.",
      "RAG para contexto, no para memoria magica.",
      "Evals para decidir, no para decorar dashboards.",
    ],
    visual: { type: "cards", columns: 2, items: [["Codex", "Operador"], ["Repo", "Fuente de verdad"], ["Swarm", "Equipo de agentes"], ["Evals", "Control de calidad"]] },
    minutes: 3,
    note: "Cierra con fuerza: el nuevo skill del desarrollador es diseñar sistemas de trabajo con agentes.",
  },
  {
    module: "M6",
    layout: "full",
    kicker: "Fuentes",
    title: "Fuentes oficiales para actualizar antes de impartir",
    lead: "Modelos, APIs, frameworks y disponibilidad cambian. Esta pantalla deja el curso preparado para mantenimiento.",
    bullets: [],
    visual: { type: "sources", links: sources },
    minutes: 3,
    note: "Antes de dar la clase, revisa especialmente precios, disponibilidad de modelos, preview de GitHub Models y estado de frameworks.",
  },
];

let current = 0;
let sideOpen = window.matchMedia("(min-width: 901px)").matches;
let notesOpen = false;
let motionDirection = "next";
let hasRenderedSlide = false;
let slideMotionTimer = 0;

const $ = (id) => document.getElementById(id);
const els = {
  app: document.querySelector(".app"),
  side: document.querySelector(".side"),
  modules: $("modules"),
  slide: $("slide"),
  moduleName: $("moduleName"),
  slideName: $("slideName"),
  count: $("count"),
  time: $("time"),
  fill: $("fill"),
  prev: $("prev"),
  next: $("next"),
  notes: $("notes"),
  notesContent: $("notesContent"),
  toggleSide: $("toggleSide"),
  toggleNotes: $("toggleNotes"),
  closeNotes: $("closeNotes"),
  map: $("map"),
  toggleMap: $("toggleMap"),
  toggleFullscreen: $("toggleFullscreen"),
  closeMap: $("closeMap"),
  mapGrid: $("mapGrid"),
};

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function moduleOf(id) {
  return modules.find((mod) => mod.id === id) || modules[0];
}

function bullets(items = []) {
  if (!items.length) return "";
  return `<ul class="bullets">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function chips(items = []) {
  if (!items.length) return "";
  return `<div class="chips">${items.map((item) => `<span class="chip">${esc(item)}</span>`).join("")}</div>`;
}

const moduleTeaching = {
  M0: {
    idea: "Codex Ultra no sustituye al desarrollador: convierte su criterio en sistemas repetibles, medibles y auditables.",
    example: "Ejemplo: una review que antes dependia de una persona senior se transforma en PR swarm con reglas, evidencias y gate humano.",
    watch: "Cuidado: si no hay repo, diff, tests, trazas o decision, no es arquitectura Codex; es una demo de IA.",
  },
  M1: {
    idea: "Un swarm Codex solo aporta valor si cada agente tiene rol, ownership, herramientas, salida y limite de actuacion.",
    example: "Ejemplo: Architect decide plan, Developer toca solo paths asignados, QA ejecuta tests y Security bloquea secretos o auth.",
    watch: "Cuidado: mas agentes sin protocolo multiplican coste, ruido y conflictos de archivos.",
  },
  M2: {
    idea: "API-first es pasar de una sesion manual de Codex a una fabrica de tareas repetibles con colas, logs y presupuesto.",
    example: "Ejemplo: Codex diseña un script que genera batches nocturnos para proponer tests en cientos de archivos legacy.",
    watch: "Cuidado: toda automatizacion con side effects necesita idempotencia, rollback y owner humano.",
  },
  M3: {
    idea: "La destilacion empieza con datos buenos y evals; entrenar es el ultimo paso, no el primero.",
    example: "Ejemplo: usar Codex para extraer Q/A con rutas reales del repo, limpiar secretos y medir si mejora onboarding.",
    watch: "Cuidado: un dataset sintetico sin evidencia contamina el sistema y enseña al modelo a inventar con seguridad.",
  },
  M4: {
    idea: "Enterprise RAG para Codex consiste en recuperar el contexto exacto del codebase, no en meter mas texto en el prompt.",
    example: "Ejemplo: ante un cambio en `createInvoice`, el RAG devuelve callers, tests afectados, ADRs y owner del modulo.",
    watch: "Cuidado: un indice viejo o sin permisos puede producir respuestas convincentes pero incorrectas o inseguras.",
  },
  M5: {
    idea: "LLM-as-a-Judge y PR swarms deben reducir carga del reviewer, no reemplazar pruebas deterministas ni criterio humano.",
    example: "Ejemplo: el juez solo bloquea cuando hay evidencia, severidad calibrada y una rubrica versionada.",
    watch: "Cuidado: un juez sin eval propia puede convertirse en otro modelo opinando sin control.",
  },
  M6: {
    idea: "La adopcion Codex Ultra se gobierna como plataforma: politicas, playbooks, skills, MCP, coste y auditoria.",
    example: "Ejemplo: un equipo versiona AGENTS.md, skills de PR swarm, servidor MCP read-only y datasets de eval.",
    watch: "Cuidado: escalar sin frontera de datos, modelos y permisos genera riesgo antes que productividad.",
  },
};

const titleTeaching = [
  {
    match: /Arquitecto|Desarrollador|Developer|QA|Orquestador|roles/i,
    example: "Ejemplo: Arquitecto define plan y contratos; Developer implementa; QA intenta romper; Security revisa permisos y secretos.",
    watch: "Cuidado: roles sin propiedad clara duplican trabajo y consumen tokens sin mejorar la decision.",
  },
  {
    match: /LangGraph|CrewAI|AutoGen|Agent Framework|handoff|manager/i,
    example: "Ejemplo: usar manager-as-tools para que Codex mantenga control final y llame especialistas solo en subtareas.",
    watch: "Cuidado: no metas framework si un agente con tools y buen contrato resuelve el flujo.",
  },
  {
    match: /GitHub Actions|CI\/CD|PR swarm|pull request|checks|annotations/i,
    example: "Ejemplo: un workflow de PR construye bundle de contexto, lanza reviewers especializados y publica findings JSON.",
    watch: "Cuidado: auto-approve solo para cambios de bajo riesgo, tests verdes y politica explicita.",
  },
  {
    match: /Batch|nocturno|masivo|colas|queue/i,
    example: "Ejemplo: crear un JSONL con un `custom_id` por archivo para refactors asincronos y trazables.",
    watch: "Cuidado: el orden de resultados no siempre coincide; usa IDs estables y reintentos controlados.",
  },
  {
    match: /Responses API|API-first|function|tool/i,
    example: "Ejemplo: Codex implementa un cliente Responses API con tools tipadas, salida estructurada y logs de uso.",
    watch: "Cuidado: una tool mal descrita es una puerta abierta a acciones ambiguas.",
  },
  {
    match: /synthetic|sintet|destil|fine|SFT|DPO|RFT|dataset/i,
    example: "Ejemplo: generar conversaciones senior/junior sobre arquitectura interna, pero exigir rutas reales como evidencia.",
    watch: "Cuidado: no fine-tunees para conocimiento que cambia; usa RAG cuando necesitas frescura y fuentes.",
  },
  {
    match: /security|secret|compliance|gobierno|permis|MCP/i,
    example: "Ejemplo: MCP read-only para buscar logs y docs; escritura externa solo con aprobacion y trazabilidad.",
    watch: "Cuidado: RAG, MCP y swarms deben respetar ACLs, retention y clasificacion de datos.",
  },
  {
    match: /RAG|AST|Tree-sitter|embedding|vector|chunk|retrieval/i,
    example: "Ejemplo: chunk por funcion/clase, añadir imports, callers, tests y owner antes de embeber.",
    watch: "Cuidado: cortar cada N tokens rompe semantica de codigo y empeora retrieval.",
  },
  {
    match: /eval|judge|rubrica|grader|consenso/i,
    example: "Ejemplo: evaluar findings de PR con criterios de correctness, evidence, severity y no_speculation.",
    watch: "Cuidado: evalua tambien al juez comparandolo con decisiones humanas.",
  },
];

function getTeaching(slide) {
  const base = moduleTeaching[slide.module] || moduleTeaching.M0;
  const text = `${slide.title} ${slide.kicker || ""} ${slide.lead || ""}`;
  const hint = titleTeaching.find((entry) => entry.match.test(text)) || {};
  return {
    idea: slide.teaching?.idea || hint.idea || base.idea,
    example: slide.teaching?.example || hint.example || base.example,
    watch: slide.teaching?.watch || hint.watch || base.watch,
  };
}

function renderTeaching(slide) {
  if (slide.layout === "full") return "";
  const teaching = getTeaching(slide);
  return `<div class="teaching-panel"><div class="teach"><strong>Clave Codex</strong><span>${esc(teaching.idea)}</span></div><div class="teach"><strong>Ejemplo operativo</strong><span>${esc(teaching.example)}</span></div></div>`;
}

function renderVisual(v) {
  if (!v) return `<div class="visual"></div>`;
  if (v.type === "image") {
    const src = LOCAL_ASSETS[v.asset] || ASSETS[v.asset] || "";
    const variant = v.variant ? ` visual-${esc(v.variant)}` : "";
    return `<div class="visual image-frame${variant}"><div class="image-visual"><img src="${esc(src)}" alt="${esc(v.caption || "Codex Ultra")}" /><p class="caption">${esc(v.caption || "")}</p></div></div>`;
  }
  if (v.type === "cards") {
    const cls = v.columns === 3 ? "cards three" : "cards";
    return `<div class="visual"><div class="${cls}">${v.items.map(([a, b]) => `<div class="card"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join("")}</div></div>`;
  }
  if (v.type === "pipe") {
    return `<div class="visual"><div class="pipe">${v.items.map(([a, b]) => `<div class="pipe-step"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join("")}</div></div>`;
  }
  if (v.type === "stack") {
    return `<div class="visual"><div class="stack">${v.items.map(([a, b]) => `<div class="stack-row"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div></div>`;
  }
  if (v.type === "matrix") {
    return `<div class="visual"><div class="matrix">${v.items.map(([a, b, risk]) => `<div class="matrix-card" data-risk="${esc(risk)}"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join("")}</div></div>`;
  }
  if (v.type === "compare") {
    return `<div class="visual"><div class="cards"><div class="card"><strong>${esc(v.leftTitle)}</strong><span>${v.left.map(esc).join("<br>")}</span></div><div class="card"><strong>${esc(v.rightTitle)}</strong><span>${v.right.map(esc).join("<br>")}</span></div></div></div>`;
  }
  if (v.type === "code") {
    return `<div class="visual"><pre class="code">${v.lines.map((line) => `<span>${esc(line)}</span>`).join("\n")}</pre></div>`;
  }
  if (v.type === "swarm") {
    return `<div class="visual"><div class="swarm"><div class="hub">${esc(v.center)}</div>${v.nodes.map(([a, b]) => `<div class="agent-node"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join("")}</div></div>`;
  }
  if (v.type === "sources") {
    return `<div class="visual"><div class="sources">${v.links.map(([label, url]) => `<a class="source" href="${esc(url)}" target="_blank" rel="noreferrer"><strong>${esc(label)}</strong><br>${esc(url)}</a>`).join("")}</div></div>`;
  }
  if (v.type === "resources") {
    return `<div class="visual"><div class="resources">${v.items.map(([label, href, body]) => `<a class="resource" href="${esc(href)}" target="_blank" rel="noreferrer"><em>${esc(label)}</em><strong>${esc(href.split("/").pop())}</strong><span>${esc(body)}</span></a>`).join("")}</div></div>`;
  }
  return `<div class="visual"></div>`;
}

function renderSlide(s, index) {
  const mod = moduleOf(s.module);
  if (s.layout === "cover") {
    return `<div class="slide-inner cover" style="background-image:url('${ASSETS.hero || ""}')"><div class="cover-content"><div class="kicker">${esc(s.kicker)}</div><h1>${esc(s.title)}</h1><p class="lead">${esc(s.lead)}</p>${chips(s.tags)}</div></div>`;
  }
  if (s.layout === "chapter") {
    return `<div class="slide-inner chapter"><div class="chapter-num">${esc(s.chapter)}</div><div class="chapter-copy"><div class="kicker">${esc(s.kicker)}</div><h1>${esc(s.title)}</h1><p class="lead">${esc(s.lead)}</p><div class="chapter-points">${(s.points || []).map((p) => `<span>${esc(p)}</span>`).join("")}</div></div></div>`;
  }
  const text = `${bullets(s.bullets)}${chips(s.tags)}${renderTeaching(s)}`;
  return `<div class="slide-inner"><div class="top"><div><div class="kicker">${esc(s.kicker || mod.title)}</div><h2>${esc(s.title)}</h2><p class="lead">${esc(s.lead)}</p></div><div class="num">${String(index + 1).padStart(2, "0")}</div></div><div class="body ${s.layout === "full" ? "full" : ""}">${text ? `<div class="text">${text}</div>` : ""}${renderVisual(s.visual)}</div></div>`;
}

function renderNotes(s, index) {
  const mod = moduleOf(s.module);
  const teaching = getTeaching(s);
  return `<div class="note-box"><p><strong>${esc(mod.title)} - pantalla ${index + 1}</strong></p><p>Tiempo sugerido: ${esc(s.minutes || 4)} min</p></div><ul><li>${esc(s.note || "Conecta esta pantalla con una decision practica del sistema Codex.")}</li></ul><div class="note-script"><strong>Guion de voz</strong><p>${esc(teaching.idea)}</p><p>${esc(teaching.example)}</p><p>${esc(teaching.watch)}</p></div>`;
}

function buildModules() {
  els.modules.innerHTML = modules.map((m, i) => `<button class="module-btn" type="button" data-module="${esc(m.id)}"><b>${i + 1}</b><span><strong>${esc(m.title)}</strong><span>${esc(m.range)}</span></span></button>`).join("");
  els.modules.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = slides.findIndex((s) => s.module === btn.dataset.module);
      if (idx >= 0) show(idx);
      if (window.matchMedia("(max-width: 900px)").matches) {
        sideOpen = false;
        syncChrome();
      }
    });
  });
}

function buildMap() {
  els.mapGrid.innerHTML = slides.map((s, i) => `<button class="thumb" type="button" data-index="${i}"><span>${String(i + 1).padStart(2, "0")} - ${esc(moduleOf(s.module).title)}</span><strong>${esc(s.title)}</strong></button>`).join("");
  els.mapGrid.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      show(Number(btn.dataset.index));
      closeMap();
    });
  });
}

function syncChrome() {
  els.side.classList.toggle("hidden", !sideOpen);
  els.notes.classList.toggle("hidden", !notesOpen);
  els.app.classList.toggle("no-side", !sideOpen);
  els.app.classList.toggle("notes-open", notesOpen);
  els.toggleSide.setAttribute("aria-expanded", String(sideOpen));
  els.toggleNotes.setAttribute("aria-expanded", String(notesOpen));
}

function updateNav() {
  const total = slides.length;
  const done = slides.slice(0, current + 1).reduce((sum, slide) => sum + (slide.minutes || 4), 0);
  const all = slides.reduce((sum, slide) => sum + (slide.minutes || 4), 0);
  els.count.textContent = `${current + 1} / ${total}`;
  els.time.textContent = `${done} / ${all} min`;
  els.fill.style.width = `${((current + 1) / total) * 100}%`;
  els.prev.disabled = current === 0;
  els.next.disabled = current === total - 1;
}

function updateActive() {
  const s = slides[current];
  els.moduleName.textContent = moduleOf(s.module).title;
  els.slideName.textContent = s.title;
  els.modules.querySelectorAll(".module-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.module === s.module));
  els.mapGrid.querySelectorAll(".thumb").forEach((btn) => btn.classList.toggle("active", Number(btn.dataset.index) === current));
}

function show(index) {
  const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
  if (nextIndex === current && hasRenderedSlide) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  motionDirection = nextIndex < current ? "prev" : "next";
  current = nextIndex;
  const s = slides[current];

  els.slide.classList.remove("is-transitioning", "motion-next", "motion-prev");
  els.slide.innerHTML = renderSlide(s, current);

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
  els.notesContent.innerHTML = renderNotes(s, current);
  updateActive();
  updateNav();
  const hash = `#${current + 1}`;
  if (location.hash !== hash) history.replaceState(null, "", hash);
}

function openMap() {
  els.map.classList.add("open");
  els.map.setAttribute("aria-hidden", "false");
}

function closeMap() {
  els.map.classList.remove("open");
  els.map.setAttribute("aria-hidden", "true");
}

function syncFullscreenState() {
  const isFullscreen = Boolean(document.fullscreenElement);
  els.app.classList.toggle("is-fullscreen", isFullscreen);
  els.toggleFullscreen.classList.toggle("active", isFullscreen);
  els.toggleFullscreen.title = isFullscreen ? "Salir de pantalla completa (F5)" : "Pantalla completa (F5)";
  els.toggleFullscreen.setAttribute(
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

els.prev.addEventListener("click", () => show(current - 1));
els.next.addEventListener("click", () => show(current + 1));
els.toggleSide.addEventListener("click", () => { sideOpen = !sideOpen; syncChrome(); });
els.toggleNotes.addEventListener("click", () => { notesOpen = !notesOpen; syncChrome(); });
els.closeNotes.addEventListener("click", () => { notesOpen = false; syncChrome(); });
els.toggleMap.addEventListener("click", openMap);
els.toggleFullscreen.addEventListener("click", toggleFullscreen);
els.closeMap.addEventListener("click", closeMap);
els.map.addEventListener("click", (event) => { if (event.target === els.map) closeMap(); });
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
    show(current + 1);
    return;
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    show(current - 1);
    return;
  }
  if (event.key === "Escape") closeMap();
});
window.addEventListener("hashchange", () => {
  const idx = Number(location.hash.replace("#", "")) - 1;
  if (Number.isFinite(idx)) show(idx);
});

buildModules();
buildMap();
syncChrome();
syncFullscreenState();
const start = Number(location.hash.replace("#", "")) - 1;
show(Number.isFinite(start) ? start : 0);
