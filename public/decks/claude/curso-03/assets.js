window.CLAUDE_DECK = {
  meta: {
    title: "Claude Advanced Automation",
    subtitle: "Hooks, plugins, GitHub Actions y guardrails para equipos",
    source: "Claude Code hooks, plugins, GitHub Actions + Auditoria Vendor Claude",
  },
  modules: [
    { id: "intro", label: "01 Automatizacion" },
    { id: "hooks", label: "02 Hooks" },
    { id: "plugins", label: "03 Plugins" },
    { id: "actions", label: "04 GitHub Actions" },
    { id: "workshops", label: "05 Workshops" },
  ],
  slides: [
    {
      module: "intro",
      type: "hero",
      title: "Claude Advanced Automation",
      subtitle: "Automatizacion con control: hooks deterministicos, plugins distribuibles, GitHub Actions y PR guardrails.",
      pills: ["Curso 3 Claude", "6h", "Hooks + Plugins + CI/CD"],
      image: {
        src: "./images/advanced-hero.svg",
        alt: "Vista de automatizacion avanzada Claude con hooks, plugins y GitHub Actions.",
        caption: "Advanced no significa autonomia sin freno. Significa flujos repetibles con controles visibles.",
      },
      source: "Auditoria Vendor Claude CL3",
      notes: [
        "Abrir separando automatizacion de abandono: el humano sigue siendo responsable.",
        "Recordar que el curso 2 ya preparo skills y subagentes; ahora los distribuimos y controlamos.",
      ],
    },
    {
      module: "intro",
      type: "compare",
      title: "Automatizacion gobernada",
      body: "Este curso no busca que Claude haga mas cosas sin preguntar. Busca que haga lo correcto dentro de carriles definidos.",
      leftTitle: "Mala automatizacion",
      rightTitle: "Buena automatizacion",
      left: ["Hooks que nadie entiende", "Plugins sin owner", "Actions con write-all", "PR comments ruidosos"],
      right: ["Hooks deterministicos", "Plugins versionados", "Permisos minimos", "Rubrica y coste medidos"],
      source: "Claude Code hooks + GitHub Actions",
      notes: [
        "En empresa, lo automatico necesita trazabilidad.",
        "El objetivo es crear confianza operativa, no demos espectaculares.",
      ],
    },
    {
      module: "intro",
      type: "full",
      title: "Arquitectura del curso",
      body: "Las piezas se apilan: hooks controlan el loop, plugins distribuyen capacidades, Actions llevan el flujo a PRs y el gobierno decide cuando activar.",
      image: {
        src: "./images/automation-map.svg",
        alt: "Mapa del curso Claude Advanced Automation.",
        caption: "Hooks controlan eventos. Plugins empaquetan practicas. Actions ejecutan en CI/CD.",
      },
      source: "Auditoria Vendor Claude",
      notes: [
        "Usar esta slide como mapa de navegacion.",
        "Si el equipo no tiene skills/subagentes basicos, volver al curso 2.",
      ],
    },
    {
      module: "hooks",
      type: "full",
      title: "Hooks: determinismo en el loop",
      body: "Un hook ejecuta una comprobacion o accion en eventos del ciclo de Claude. Sirve para bloquear, auditar, recordar o validar.",
      image: {
        src: "./images/hooks-timeline.svg",
        alt: "Timeline de hooks Claude.",
        caption: "Los hooks son puntos de control. No sustituyen razonamiento: lo acotan.",
      },
      source: "Claude Code hooks",
      notes: [
        "Poner ejemplo inmediato: bloquear secretos antes de escribir.",
        "No vender hooks como IA. Son scripts deterministicos en momentos concretos.",
      ],
    },
    {
      module: "hooks",
      type: "full",
      title: "PreToolUse",
      body: "PreToolUse es la barrera antes de una accion. Es ideal para bloquear secretos, comandos peligrosos o escrituras fuera de scope.",
      image: {
        src: "./images/pretool-gate.svg",
        alt: "Hook PreToolUse bloqueando una accion peligrosa.",
        caption: "Antes de actuar, el hook pregunta: esta operacion pertenece al carril permitido?",
      },
      source: "Claude Code hooks",
      notes: [
        "Este es el hook mas facil de entender para perfiles enterprise.",
        "Ejemplo: si path incluye .env, bloquear y explicar.",
      ],
    },
    {
      module: "hooks",
      type: "code",
      title: "Hook anti secretos",
      body: "El ejemplo minimo: detectar rutas o patrones sensibles y fallar claro.",
      code: [
        "export function validateToolUse(event) {",
        "  const text = JSON.stringify(event).toLowerCase();",
        "  const blocked = ['.env', 'secret', 'token', 'private_key'];",
        "  if (blocked.some(pattern => text.includes(pattern))) {",
        "    return { allow: false, reason: 'Possible secret access blocked' };",
        "  }",
        "  return { allow: true };",
        "}",
      ],
      source: "Material cl-hook-block-secrets",
      notes: [
        "El codigo es conceptual, el pack tiene scripts reales.",
        "Insistir en mensajes de error utiles: bloquear sin explicar genera bypass.",
      ],
    },
    {
      module: "hooks",
      type: "full",
      title: "Contrato de payload",
      body: "Un hook avanzado debe tratar cada tool call como contrato: input estable, decision explicita y output que el sistema pueda interpretar.",
      image: {
        src: "./images/hook-payload-contract.svg",
        alt: "Contrato de payload para hooks Claude.",
        caption: "Si el contrato no se puede probar, el hook no esta listo para rollout.",
      },
      source: "Claude Code hooks + Sprint 03 assets",
      notes: [
        "Explicar que el hook no deberia depender de texto ambiguo.",
        "La salida debe poder auditarse: allow, block o ask con razon clara.",
      ],
    },
    {
      module: "hooks",
      type: "full",
      title: "Audit log de hooks",
      body: "La automatizacion enterprise necesita trazabilidad: timestamp, hook, target, decision, owner, coste y checks asociados.",
      image: {
        src: "./images/hook-audit-log.svg",
        alt: "Audit log de hooks Claude.",
        caption: "Sin log, la automatizacion solo es una historia bonita.",
      },
      source: "Claude Code hooks + governance",
      notes: [
        "Esta slide cambia la conversacion de demo a operacion.",
        "Pedir al grupo que diga que campos añadiria por compliance.",
      ],
    },
    {
      module: "hooks",
      type: "full",
      title: "PostToolUse y Stop",
      body: "PostToolUse valida despues de una tool call. Stop puede exigir evidencia antes de cerrar una tarea.",
      image: {
        src: "./images/stop-hook.svg",
        alt: "Hook Stop exigiendo verificacion.",
        caption: "El cierre no es 'ya esta'. El cierre es diff, check y riesgo pendiente.",
      },
      source: "Claude Code hooks",
      notes: [
        "Conectar con el curso 1: handoff y verificacion.",
        "Los hooks no obligan a todos los cambios a tener el mismo test; obligan a declarar evidencia.",
      ],
    },
    {
      module: "hooks",
      type: "full",
      title: "SubagentStart y SubagentStop",
      body: "Los hooks de subagente permiten preparar contexto o recoger salida cuando delegamos trabajo a roles especializados.",
      cards: [
        ["SubagentStart", "Inyectar reglas de seguridad o rubrica del rol."],
        ["SubagentStop", "Recoger findings, riesgos y resumen usable."],
        ["Uso bueno", "Controlar formato y evidencia de un QA reviewer."],
        ["Uso malo", "Meter logica opaca que nadie puede depurar."],
      ],
      source: "Claude Code hooks + subagents",
      notes: [
        "No convertir hooks de subagente en magia invisible.",
        "Ideal para asegurar handoff consistente.",
      ],
    },
    {
      module: "hooks",
      type: "full",
      title: "Meme: piloto automatico no es copiloto dormido",
      body: "Automatizar sin verificacion es solo cerrar los ojos con mas pasos.",
      image: {
        src: "./images/meme-autopilot.svg",
        alt: "Meme sobre automatizacion sin verificacion.",
        caption: "Un buen hook no reemplaza criterio: lo recuerda cuando hay prisa.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Pausa divertida con mensaje serio.",
        "Usar para recordar que los guardrails son parte del producto.",
      ],
    },
    {
      module: "plugins",
      type: "full",
      title: "Plugins: distribuir practica",
      body: "Un plugin permite empaquetar skills, agents, hooks, MCP y configuracion para que un equipo instale una forma de trabajar.",
      image: {
        src: "./images/plugin-package.svg",
        alt: "Plugin Claude empaquetando skills, agents, hooks y MCP.",
        caption: "Plugin = practica versionada, instalable y con owner.",
      },
      source: "Claude Code plugins",
      notes: [
        "Plugin no es solo extension. Es una unidad de adopcion.",
        "Ejemplo del curso: team-review plugin.",
      ],
    },
    {
      module: "plugins",
      type: "code",
      title: "Manifest de plugin",
      body: "El manifest debe explicar identidad, version y componentes. Sin manifest claro, no hay adopcion seria.",
      code: [
        "{",
        "  \"name\": \"team-review\",",
        "  \"version\": \"0.1.0\",",
        "  \"description\": \"Review workflow with skill, QA agent and hooks\",",
        "  \"skills\": [\"skills/review-pr\"],",
        "  \"agents\": [\"agents/qa-reviewer.md\"],",
        "  \"hooks\": [\"hooks/hooks.json\"]",
        "}",
      ],
      source: "Claude Code plugins",
      notes: [
        "El pack ya tiene manifest y componentes.",
        "Hablar de versionado: cambiar un hook afecta al equipo.",
      ],
    },
    {
      module: "plugins",
      type: "full",
      title: "Plugin team-review",
      body: "El plugin de ejemplo agrupa una skill de review, un subagente QA y hooks de seguridad/verificacion.",
      cards: [
        ["Skill", "review-pr con rubrica y salida estable."],
        ["Agent", "qa-reviewer con severidad y checks."],
        ["Hook", "block-secrets y require-tests."],
        ["MCP", "Opcional, readonly y documentado."],
      ],
      source: "Material cl-plugin-team-manifest",
      notes: [
        "Esto es potente porque reduce friccion de adopcion.",
        "La version 0.1.0 debe ser piloto, no rollout masivo.",
      ],
    },
    {
      module: "plugins",
      type: "full",
      title: "Owner, version y compatibilidad",
      body: "Un plugin sin owner se convierte en deuda. Cada version debe tener changelog, alcance y criterio de rollback.",
      checklist: [
        "Quien mantiene el plugin.",
        "Que equipos lo pueden instalar.",
        "Que permisos introduce.",
        "Que version esta aprobada.",
        "Como se revierte si rompe flujo.",
      ],
      source: "Claude Code plugins",
      notes: [
        "Esta slide es muy enterprise.",
        "No hace falta resolver todo ahora, pero si abrir la conversacion.",
      ],
    },
    {
      module: "plugins",
      type: "full",
      title: "Marketplace interno",
      body: "Cuando un plugin afecta a varios equipos, necesita catalogo: aprobado, piloto o bloqueado; owner, version, permisos y rollback.",
      image: {
        src: "./images/plugin-marketplace-internal.svg",
        alt: "Marketplace interno de plugins Claude.",
        caption: "Un plugin sin owner no se instala: se investiga.",
      },
      source: "Claude Code plugins + operating model",
      notes: [
        "Esto aterriza la adopcion a empresa.",
        "No se trata de subir archivos a una carpeta compartida, sino de operar producto interno.",
      ],
    },
    {
      module: "plugins",
      type: "full",
      title: "Rollout por anillos",
      body: "El despliegue sano empieza en sandbox, pasa por piloto, luego equipo y solo despues organizacion completa.",
      image: {
        src: "./images/plugin-rollout-ring.svg",
        alt: "Rollout por anillos para plugins Claude.",
        caption: "Cada anillo añade evidencia: tests, owner, changelog, coste y soporte.",
      },
      source: "Plugin governance",
      notes: [
        "Evitar que el curso venda instalacion masiva de golpe.",
        "Pedir que cada equipo defina su anillo piloto.",
      ],
    },
    {
      module: "actions",
      type: "full",
      title: "Claude en GitHub Actions",
      body: "CI/CD permite llevar Claude a PRs, pero con triggers, permisos y presupuesto muy definidos.",
      image: {
        src: "./images/github-action-pipeline.svg",
        alt: "Pipeline de Claude en GitHub Actions.",
        caption: "La Action lee el contexto necesario, aplica rubrica y deja comentario accionable.",
      },
      source: "Claude Code GitHub Actions",
      notes: [
        "Insistir: no hay aprobacion automatica final.",
        "El primer piloto deberia ser read-only + comentario.",
      ],
    },
    {
      module: "actions",
      type: "full",
      title: "Permisos minimos",
      body: "La Action debe pedir solo lo que necesita. read-all y write-all por comodidad son el olor a riesgo mas comun.",
      image: {
        src: "./images/pr-guardrails.svg",
        alt: "Guardrails para PR automation.",
        caption: "Trigger, actor, label, permisos y presupuesto antes de invocar Claude.",
      },
      source: "GitHub Actions security + Claude Code GitHub Actions",
      notes: [
        "Recordar que estamos en repos de empresa.",
        "Si la Action comenta PRs, ese permiso debe estar claro y justificado.",
      ],
    },
    {
      module: "actions",
      type: "code",
      title: "Trigger conservador",
      body: "Un trigger inicial puede limitarse a label, actor autorizado y PRs no draft.",
      code: [
        "on:",
        "  pull_request:",
        "    types: [opened, synchronize, labeled]",
        "",
        "permissions:",
        "  contents: read",
        "  pull-requests: write",
        "",
        "jobs:",
        "  claude_review:",
        "    if: contains(github.event.pull_request.labels.*.name, 'claude-review')",
      ],
      source: "Claude Code GitHub Actions",
      notes: [
        "Mostrar que el trigger es parte del producto.",
        "No todo PR debe disparar gasto ni automatizacion.",
      ],
    },
    {
      module: "actions",
      type: "full",
      title: "Secrets lane y OIDC",
      body: "La Action no debe recibir secretos por comodidad ni pasarlos al prompt. OIDC y credenciales temporales reducen exposicion y mejoran auditoria.",
      image: {
        src: "./images/oidc-secrets-lane.svg",
        alt: "Carril de secretos y OIDC para GitHub Actions.",
        caption: "No poner secretos en contexto. No pasar secretos por prompt. No loggear secretos.",
      },
      source: "GitHub Actions security + Claude automation",
      notes: [
        "No entrar en implementacion profunda de OIDC si el grupo no lo necesita.",
        "El punto pedagogico es separar secretos de contexto LLM.",
      ],
    },
    {
      module: "actions",
      type: "full",
      title: "Comentario de PR accionable",
      body: "El comentario debe priorizar findings, severidad, evidencia y siguiente accion. Si solo resume, aporta poco.",
      cards: [
        ["Findings", "Bug/riesgo con ruta y linea cuando sea posible."],
        ["Severidad", "Bloqueante, alto, medio, bajo o test gap."],
        ["Evidencia", "Diff, check o razonamiento verificable."],
        ["Decision", "Humano aprueba, rechaza o pide cambio."],
      ],
      source: "Claude Code GitHub Actions + review rubric",
      notes: [
        "Aqui reutilizar la rubrica del curso 2.",
        "El comentario debe ayudar al reviewer, no competir con el reviewer.",
      ],
    },
    {
      module: "actions",
      type: "full",
      title: "Contrato JSON de review",
      body: "El comentario humano puede ser narrativo, pero la salida del sistema debe ser estructurada para filtrar findings, medir severidad y auditar decisiones.",
      image: {
        src: "./images/pr-json-contract.svg",
        alt: "Contrato JSON de review de PR.",
        caption: "Texto libre para humanos. JSON estable para sistemas.",
      },
      source: "LLM-as-reviewer + structured outputs",
      notes: [
        "Conectar con el curso Agent SDK Enterprise.",
        "La review que no se puede parsear no se puede mejorar sistematicamente.",
      ],
    },
    {
      module: "actions",
      type: "full",
      title: "Coste en CI",
      body: "En CI el coste escala por PR, reintentos, labels y ruido. Hay que medirlo como parte del pipeline.",
      image: {
        src: "./images/ci-cost-meter.svg",
        alt: "Medidor de coste en CI con Claude.",
        caption: "Una Action sin presupuesto es un bucle de gasto esperando una label mal puesta.",
      },
      source: "Claude Code costs",
      notes: [
        "Coste en CI es mas peligroso porque corre en segundo plano.",
        "Registrar modelo, tokens, PR, reintentos y duracion.",
      ],
    },
    {
      module: "actions",
      type: "full",
      title: "Budget por workflow",
      body: "El presupuesto debe estar cerca del YAML: coste por PR, reintentos maximos, modelo permitido, trigger y criterio de parada.",
      image: {
        src: "./images/cost-budget-ci.svg",
        alt: "Budget de coste para CI con Claude.",
        caption: "Si no hay limite por PR, no hay piloto: hay experimento contable.",
      },
      source: "Claude Code costs + CI governance",
      notes: [
        "Esta slide sirve para responsables de plataforma.",
        "Poner ejemplo: label mal puesta que dispara 50 reviews en una mañana.",
      ],
    },
    {
      module: "actions",
      type: "full",
      title: "Meme: la tragaperras del CI",
      body: "Cuando Claude corre en cada push sin label, sin limite y sin owner, el pipeline deja de ser ayuda y empieza a ser sorpresa presupuestaria.",
      image: {
        src: "./images/meme-ci-slot-machine.svg",
        alt: "Meme sobre CI sin presupuesto comportandose como tragaperras.",
        caption: "La automatizacion que no mira presupuesto tambien automatiza sorpresas.",
      },
      source: "Slide nueva de humor con criterio",
      notes: [
        "Usar como respiro antes del bloque de workshops.",
        "La broma debe cerrar con accion: label, budget y max retries.",
      ],
    },
    {
      module: "workshops",
      type: "full",
      title: "Workshop 1: hook anti secretos",
      body: "Simulamos una escritura que intenta tocar `.env` y verificamos que el hook bloquea con mensaje claro.",
      steps: ["Payload limpio", "Payload con secreto", "Bloqueo claro", "Excepcion documentada", "Registro de decision"],
      source: "Ejercicio cl-a01-hook-block-secrets",
      notes: [
        "Formato ideal de microvideo de 10 minutos.",
        "Mostrar pantalla de terminal, payload y resultado.",
      ],
    },
    {
      module: "workshops",
      type: "full",
      title: "Workshop largo: memory to hook",
      body: "El Sprint 02 ya deja un video de 30 minutos que conecta memoria, contexto, skill, subagente, MCP readonly y hook anti secretos.",
      cards: [
        ["Video", "/player/cl-workshop-30m-memory-to-hook"],
        ["Inicio", "CLAUDE.md minimo + /context."],
        ["Operacion", "Skill fix-tests + explorer read-only."],
        ["Control", "Hook anti secretos probado."],
      ],
      source: "VideoBlueprint cl-workshop-30m-memory-to-hook",
      notes: [
        "Este slide sirve como puente entre deck y video largo.",
        "El curso avanzado ya no es solo slides: tiene workshop reproducible.",
      ],
    },
    {
      module: "workshops",
      type: "full",
      title: "Workshop 2: plugin team-review",
      body: "Empaquetamos skill, QA agent y hooks en un plugin instalable, con version y owner.",
      checklist: [
        "Manifest valido.",
        "Skill review-pr incluida.",
        "QA reviewer incluido.",
        "Hooks incluidos.",
        "README de instalacion y rollback.",
      ],
      source: "Ejercicio cl-a03-plugin-team-review",
      notes: [
        "Este workshop es ideal para equipos internos.",
        "La salida es un paquete que se puede convertir en piloto real.",
      ],
    },
    {
      module: "workshops",
      type: "full",
      title: "Workshop 3: Action de review",
      body: "Diseñamos una GitHub Action read-only-first que comenta PRs con rubrica, coste y responsabilidad humana.",
      steps: ["Trigger por label", "Permisos minimos", "Rubrica", "Comentario accionable", "Cost report"],
      source: "Ejercicio cl-a04-github-action",
      notes: [
        "No hace falta ejecutar contra un repo real en clase si no hay permisos.",
        "Se puede simular con un diff local y el YAML explicado.",
      ],
    },
    {
      module: "workshops",
      type: "full",
      title: "Criterio de aprobado",
      body: "El curso se aprueba cuando la automatizacion es explicable, reversible y barata de operar.",
      checklist: [
        "Hooks con proposito y mensajes claros.",
        "Plugin con owner, version y rollback.",
        "Action con permisos minimos.",
        "PR comments accionables.",
        "Cost report por ejecucion.",
      ],
      source: "Auditoria Vendor Claude",
      notes: [
        "Cierre de madurez: no vale solo que funcione en demo.",
        "Tiene que poder vivir en un equipo real.",
      ],
    },
    {
      module: "workshops",
      type: "full",
      title: "Checklist de rollout real",
      body: "Antes de activar automatizacion para un equipo completo, necesitamos evidencia minima de seguridad, coste, soporte y rollback.",
      checklist: [
        "Hook probado con caso bloqueado y caso permitido.",
        "Plugin versionado y owner visible.",
        "Action con label, permisos minimos y max retries.",
        "Salida JSON validada contra schema.",
        "Cost report revisado tras piloto.",
      ],
      source: "Sprint 03 hardening",
      notes: [
        "Esta es la slide que transforma entusiasmo en piloto real.",
        "Si falta un punto, no se cancela: se baja a sandbox/piloto.",
      ],
    },
    {
      module: "workshops",
      type: "code",
      title: "Policy as code",
      body: "El cierre maduro del curso es convertir decisiones en archivos versionados: budgets, triggers, hooks y owners.",
      code: [
        "automation_policy:",
        "  pr_review:",
        "    trigger: label:claude-review",
        "    max_retries: 2",
        "    max_cost_eur: 0.40",
        "    output_schema: review-findings.v1.json",
        "    human_owner: platform-ai",
        "    rollback: remove label + disable workflow",
      ],
      source: "Sprint 03 rollout policy",
      notes: [
        "Esto conecta con platform engineering.",
        "La politica no es legalismo: es una forma de que el sistema se mantenga.",
      ],
    },
    {
      module: "workshops",
      type: "full",
      title: "Capstone CL3",
      body: "El capstone junta todo: hook anti secretos, plugin team-review, Action por label, salida JSON y cost report en un PR simulado.",
      steps: [
        "Preparar diff de PR.",
        "Activar label claude-review.",
        "Ejecutar review read-only.",
        "Validar JSON de findings.",
        "Emitir cost report y decision humana.",
      ],
      source: "Capstone Claude Advanced Automation",
      notes: [
        "Este capstone deberia ser el ejercicio final antes de Agent SDK Enterprise.",
        "La salida ideal es una demo que el equipo pueda enseñar a seguridad/plataforma.",
      ],
    },
    {
      module: "workshops",
      type: "hero",
      title: "Automatizar es hacer el criterio repetible",
      subtitle: "Hooks para controlar, plugins para distribuir, Actions para escalar y coste para decidir. El siguiente salto es Agent SDK Enterprise.",
      pills: ["Siguiente: Agent SDK", "Evals", "JSON contracts", "Governance"],
      image: {
        src: "./images/advanced-hero.svg",
        alt: "Cierre de Claude Advanced Automation.",
        caption: "Curso 3 deja preparada la entrada a agentes programaticos y evaluacion.",
      },
      source: "Cierre del curso",
      notes: [
        "Cerrar conectando con el cuarto curso enterprise.",
        "La frase final: si no se puede auditar, no esta listo para escalar.",
      ],
    },
,
{
      module: "workshops",
      type: "full",
      title: "Automatizar no es abdicar",
      body: "Cada accion automatica necesita owner, evidencia y rollback.",
      image: {
            src: "./images/reflection-automation-accountability.svg",
            alt: "Automatizar no es abdicar",
            caption: "Cada accion automatica necesita owner, evidencia y rollback."
      },
      source: "Sprint Visual Excellence - reflection",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "workshops",
      type: "full",
      title: "Firma humana final",
      body: "Claude propone, el sistema registra, el humano decide.",
      image: {
            src: "./images/reflection-human-signoff.svg",
            alt: "Firma humana final",
            caption: "Claude propone, el sistema registra, el humano decide."
      },
      source: "Sprint Visual Excellence - reflection",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "workshops",
      type: "full",
      title: "El coste tambien deja sombra",
      body: "Lo que corre en CI se multiplica si no tiene presupuesto.",
      image: {
            src: "./images/reflection-cost-shadow.svg",
            alt: "El coste tambien deja sombra",
            caption: "Lo que corre en CI se multiplica si no tiene presupuesto."
      },
      source: "Sprint Visual Excellence - reflection",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "workshops",
      type: "full",
      title: "Rollback antes de rollout",
      body: "Si no puedes volver atras, no estas listo para escalar.",
      image: {
            src: "./images/reflection-rollback-map.svg",
            alt: "Rollback antes de rollout",
            caption: "Si no puedes volver atras, no estas listo para escalar."
      },
      source: "Sprint Visual Excellence - reflection",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "workshops",
      type: "full",
      title: "Hook no es boton de panico",
      body: "Un hook bueno bloquea con criterio, no por susto.",
      image: {
            src: "./images/meme-hook-panic-button.svg",
            alt: "Hook no es boton de panico",
            caption: "Un hook bueno bloquea con criterio, no por susto."
      },
      source: "Sprint Visual Excellence - meme",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "workshops",
      type: "full",
      title: "Plugin maleta sin owner",
      body: "Si nadie lo mantiene, no es plugin: es equipaje abandonado.",
      image: {
            src: "./images/meme-plugin-suitcase.svg",
            alt: "Plugin maleta sin owner",
            caption: "Si nadie lo mantiene, no es plugin: es equipaje abandonado."
      },
      source: "Sprint Visual Excellence - meme",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "workshops",
      type: "full",
      title: "No lances Actions como confeti",
      body: "Cada workflow nuevo tambien trae coste, soporte y ruido.",
      image: {
            src: "./images/meme-action-confetti.svg",
            alt: "No lances Actions como confeti",
            caption: "Cada workflow nuevo tambien trae coste, soporte y ruido."
      },
      source: "Sprint Visual Excellence - meme",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
}
  ],
};
