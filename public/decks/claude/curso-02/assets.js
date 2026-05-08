window.CLAUDE_DECK = {
  meta: {
    title: "Claude Operator",
    subtitle: "Skills, subagentes, MCP y coste para operar Claude Code como plataforma",
    source: "Claude Code docs + Auditoria Vendor Claude",
  },
  modules: [
    { id: "operator", label: "01 Operar Claude" },
    { id: "skills", label: "02 Skills" },
    { id: "agents", label: "03 Subagentes" },
    { id: "mcp", label: "04 MCP y coste" },
    { id: "labs", label: "05 Labs" },
  ],
  slides: [
    {
      module: "operator",
      type: "hero",
      title: "Claude Operator",
      subtitle: "Pasamos de usar Claude a construir un sistema de trabajo: skills, subagentes, MCP, modelos por tarea y control de contexto.",
      pills: ["Curso 2 Claude", "5h", "Skills + Agents + MCP"],
      image: {
        src: "./images/operator-hero.svg",
        alt: "Sala de control Claude Operator con skills, subagentes y MCP.",
        caption: "Operator no es mas prompt. Es convertir repeticion en sistema.",
      },
      source: "Auditoria Vendor Claude CL2",
      notes: [
        "Abrir diciendo que aqui empieza la plataforma real.",
        "El curso anterior ensena higiene. Este convierte esa higiene en piezas reutilizables.",
      ],
    },
    {
      module: "operator",
      type: "full",
      title: "De usuario a operador",
      body: "Un usuario pide tareas. Un operador diseña memoria, skills, subagentes, permisos y coste para que el equipo repita buen trabajo.",
      metrics: [
        ["1", "Skill", "Un procedimiento repetido se vuelve invocable."],
        ["2", "Subagente", "Un rol especializado trabaja con contexto separado."],
        ["3", "MCP", "Una herramienta externa entra con permisos e inventario."],
      ],
      source: "Claude Code features",
      notes: [
        "Esta slide es el cambio mental del curso.",
        "Ejemplo: resumir cambios no deberia ser un prompt escrito diez veces; debe ser una skill.",
      ],
    },
    {
      module: "operator",
      type: "compare",
      title: "No todo va a CLAUDE.md",
      body: "El primer error de operador es meter todo en memoria. El segundo es crear agentes para todo. La gracia esta en elegir la capa.",
      leftTitle: "Sobrecarga",
      rightTitle: "Diseño por capa",
      left: ["CLAUDE.md con procedimientos largos", "Prompts copiados en chats", "Subagentes sin rol real", "MCPs activados por curiosidad"],
      right: ["Memoria corta", "Skills para workflows", "Agentes para roles", "MCP solo con owner y scope"],
      source: "Claude Code memory + skills + MCP",
      notes: [
        "Repetir: el objetivo es reducir ruido de contexto.",
        "Un componente existe porque reduce repeticion o riesgo, no porque suena avanzado.",
      ],
    },
    {
      module: "operator",
      type: "full",
      title: "Mapa de piezas Operator",
      body: "Estas piezas trabajan juntas, pero cada una tiene una responsabilidad concreta.",
      image: {
        src: "./images/operator-map.svg",
        alt: "Mapa de piezas Claude Operator.",
        caption: "Memory dice que somos. Skills dicen como hacemos. Agents separan roles. MCP trae herramientas.",
      },
      source: "Claude Code docs",
      notes: [
        "Explicar con un caso: PR review de equipo.",
        "CLAUDE.md da normas, skill ejecuta checklist, QA agent revisa riesgos, MCP lee PR si procede.",
      ],
    },
    {
      module: "skills",
      type: "full",
      title: "Skills: cuando crear una",
      body: "Una skill merece existir cuando una tarea se repite, tiene pasos, necesita referencias o debe producir una salida consistente.",
      cards: [
        ["Crear", "review-pr, summarize-changes, fix-tests, generate-docs."],
        ["No crear", "Preguntas puntuales o decisiones que cambian cada vez."],
        ["Gana", "Menos prompt manual, mas calidad repetible."],
        ["Riesgo", "Demasiadas skills sin owner ni version."],
      ],
      source: "Claude Code skills",
      notes: [
        "La pregunta clave: esto se repetira en mas de tres sesiones?",
        "Skill no es una carpeta bonita; es una decision de producto interno.",
      ],
    },
    {
      module: "skills",
      type: "full",
      title: "Anatomia de una skill",
      body: "Una skill combina metadata, instrucciones, referencias y scripts. La descripcion es importantisima porque ayuda a decidir cuando cargarla.",
      image: {
        src: "./images/skill-anatomy.svg",
        alt: "Anatomia de un SKILL.md de Claude.",
        caption: "El frontmatter decide identidad. El cuerpo decide comportamiento. Los adjuntos evitan cargar todo siempre.",
      },
      source: "Claude Code skills",
      notes: [
        "Mostrar que description no es marketing, es activacion.",
        "Si una skill se activa cuando no toca, probablemente su description es mala.",
      ],
    },
    {
      module: "skills",
      type: "code",
      title: "Frontmatter minimo",
      body: "El frontmatter debe ser corto, especifico y facil de auditar.",
      code: [
        "---",
        "name: summarize-changes",
        "description: Use when the user asks for a concise summary of local code changes, risks, checks and commit message.",
        "allowed-tools: Read, Grep, Bash(git diff:*)",
        "---",
        "",
        "Produce:",
        "1. changed files",
        "2. behavioral summary",
        "3. risks",
        "4. checks run or missing",
        "5. commit message",
      ],
      source: "Claude Code skills",
      notes: [
        "Este snippet se puede enseñar casi tal cual.",
        "La allowed-tools tiene que ser conservadora y coherente con la tarea.",
      ],
    },
    {
      module: "skills",
      type: "full",
      title: "Dynamic context con cuidado",
      body: "Una skill puede apoyarse en comandos o referencias, pero cada carga extra debe justificar la decision que desbloquea.",
      image: {
        src: "./images/dynamic-context.svg",
        alt: "Dynamic context en una skill Claude.",
        caption: "Dynamic context es potente: trae estado real. Tambien puede traer ruido si no se acota.",
      },
      source: "Claude Code skills",
      notes: [
        "Ejemplo: git diff para summarize-changes tiene sentido.",
        "Ejemplo negativo: cargar todo el repo para escribir un commit message.",
      ],
    },
    {
      module: "skills",
      type: "full",
      title: "References y scripts",
      body: "Las referencias permiten mantener rubricas, ejemplos y comandos fuera del prompt principal. Los scripts estandarizan acciones repetibles.",
      cards: [
        ["references/", "Rubricas, ejemplos, guias de estilo y criterios de severidad."],
        ["scripts/", "Wrappers de test, validaciones y transformaciones mecanicas."],
        ["beneficio", "La skill carga lo que necesita cuando lo necesita."],
        ["cuidado", "No conviertas references en un segundo CLAUDE.md gigante."],
      ],
      source: "Claude Code skills",
      notes: [
        "Aqui conectar con materiales existentes: summarize-changes y fix-tests.",
        "La skill buena reduce texto duplicado y mejora salidas.",
      ],
    },
    {
      module: "skills",
      type: "full",
      title: "Meme: skills como confeti",
      body: "Crear una skill por cada ocurrencia de la vida diaria no es plataforma: es desorden con carpetas.",
      image: {
        src: "./images/meme-skill-confetti.svg",
        alt: "Meme sobre crear demasiadas skills sin criterio.",
        caption: "Una skill necesita owner, descripcion clara, salida esperada y razon de existir.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Usarla para frenar entusiasmo excesivo.",
        "Pregunta de aula: que skills de verdad merecen vivir en vuestro equipo?",
      ],
    },
    {
      module: "skills",
      type: "full",
      title: "Lab 1: summarize-changes",
      body: "El alumno convierte un prompt repetido en una skill de resumen de cambios, con rubrica y salida consistente.",
      checklist: [
        "Leer diff de forma acotada.",
        "Separar cambio funcional, riesgo y ruido.",
        "Generar commit message sobrio.",
        "Declarar checks ejecutados o faltantes.",
      ],
      source: "Ejercicio cl-o01-skill-summarize",
      notes: [
        "Este es el primer laboratorio central del curso.",
        "Si hay poco tiempo, priorizar este sobre skills mas sofisticadas.",
      ],
    },
    {
      module: "skills",
      type: "full",
      title: "Lab 2: fix-tests",
      body: "La skill fix-tests enseña el orden correcto: reproducir, aislar, parchear, reejecutar y cerrar con evidencia.",
      steps: ["Reproducir fallo", "Localizar causa", "Patch minimo", "Reejecutar check", "Resumen verificable"],
      source: "Ejercicio cl-o02-skill-fix-tests",
      notes: [
        "Insistir en no mezclar fix de test con refactor de arquitectura.",
        "El valor esta en evitar el impulso de editar antes de reproducir.",
      ],
    },
    {
      module: "agents",
      type: "full",
      title: "Subagentes: separar roles",
      body: "Un subagente tiene prompt, herramientas, modelo y contexto propio. Sirve para aislar exploracion, QA, seguridad o arquitectura.",
      image: {
        src: "./images/subagent-team.svg",
        alt: "Equipo de subagentes Claude.",
        caption: "Subagente bueno: rol claro, herramientas minimas, salida esperada y handoff al hilo principal.",
      },
      source: "Claude Code subagents",
      notes: [
        "No llamarlo swarm todavia. Aqui es especializacion disciplinada.",
        "El beneficio clave es aislamiento de contexto y criterio por rol.",
      ],
    },
    {
      module: "agents",
      type: "code",
      title: "Anatomia de subagente",
      body: "La descripcion decide cuando usarlo. Las herramientas y modelo controlan coste y riesgo.",
      code: [
        "---",
        "name: explorer",
        "description: Use for read-only repository exploration before planning changes.",
        "model: haiku",
        "tools: Read, Grep, Glob",
        "---",
        "",
        "Return:",
        "- relevant files",
        "- architecture notes",
        "- risks",
        "- questions before editing",
      ],
      source: "Claude Code subagents",
      notes: [
        "Explorer es el ejemplo perfecto para ahorro: barato, read-only, util.",
        "No debe editar ni ejecutar comandos destructivos.",
      ],
    },
    {
      module: "agents",
      type: "full",
      title: "Explorer read-only",
      body: "El explorer lee estructura y devuelve rutas utiles. Evita que el hilo principal cargue medio repo antes de decidir.",
      image: {
        src: "./images/explorer-readonly.svg",
        alt: "Subagente explorer leyendo repositorio en modo solo lectura.",
        caption: "Explorer no implementa. Explorer reduce incertidumbre antes del plan.",
      },
      source: "Ejercicio cl-o03-subagent-explorer",
      notes: [
        "Poner ejemplo de login: explorer localiza auth, routes y tests sin editar nada.",
        "La salida debe ser accionable: rutas, riesgos, preguntas.",
      ],
    },
    {
      module: "agents",
      type: "full",
      title: "QA reviewer",
      body: "El QA reviewer revisa un diff con foco en regresiones, tests faltantes y severidad. No sustituye al humano, prepara mejor la decision.",
      image: {
        src: "./images/qa-reviewer.svg",
        alt: "Subagente QA reviewer revisando un diff.",
        caption: "QA bueno: findings primero, severidad clara, checks recomendados.",
      },
      source: "Ejercicio cl-o04-subagent-qa",
      notes: [
        "Conectar con cultura de review: findings, riesgos y test gaps.",
        "Evitar que el agente devuelva aprobaciones blandas.",
      ],
    },
    {
      module: "agents",
      type: "compare",
      title: "Agente real vs teatro",
      body: "No hace falta crear un agente para cada sombrero imaginario. Hace falta separar trabajos que de verdad requieren prompt, herramientas o modelo diferente.",
      leftTitle: "Teatro",
      rightTitle: "Operacion",
      left: ["planner, coder, reviewer para una tarea trivial", "Todos con las mismas tools", "Sin salida esperada", "Coste oculto"],
      right: ["Explorer read-only", "QA con rubrica", "Security con permisos minimos", "Architect solo en cambios complejos"],
      source: "Claude Code subagents",
      notes: [
        "Esta slide ahorra mucha fantasia improductiva.",
        "El objetivo no es tener muchos agentes; es tener buenos limites.",
      ],
    },
    {
      module: "agents",
      type: "full",
      title: "Modelo por subagente",
      body: "La seleccion de modelo por subagente permite ahorrar sin bajar calidad: lectura barata, implementacion solida, arquitectura con mas potencia.",
      image: {
        src: "./images/model-per-agent.svg",
        alt: "Routing de modelos por subagente Claude.",
        caption: "El modelo se elige por rol: explorer barato, QA consistente, architect potente cuando compensa.",
      },
      source: "Claude Code costs + subagents",
      notes: [
        "Evitar versionitis: enseñar criterio, no nombre exacto de modelo.",
        "La politica de coste debe estar por escrito en materiales.",
      ],
    },
    {
      module: "agents",
      type: "full",
      title: "Handoff entre agentes",
      body: "Cada subagente debe devolver una salida que el hilo principal pueda usar sin releer todo: rutas, hallazgos, riesgos y recomendacion.",
      cards: [
        ["Explorer", "Rutas relevantes y dudas antes de editar."],
        ["QA", "Findings con severidad y checks."],
        ["Security", "Riesgos de permisos, secretos y datos."],
        ["Architect", "Decision tecnica, tradeoffs y plan de migracion."],
      ],
      source: "Claude Code subagents",
      notes: [
        "Handoff es la clave para no perder el valor del subagente.",
        "Si el subagente devuelve prosa bonita pero no accionable, falla.",
      ],
    },
    {
      module: "mcp",
      type: "full",
      title: "MCP: contexto externo gobernado",
      body: "MCP conecta Claude con herramientas externas. En empresa, primero se enseña como inventario de riesgo y despues como superpoder.",
      image: {
        src: "./images/mcp-bridge.svg",
        alt: "Puente MCP entre Claude y herramientas externas.",
        caption: "MCP no es memoria. Es una conexion a capacidades externas que debe tener scope, owner y permisos.",
      },
      source: "Claude Code MCP",
      notes: [
        "No entrar en detalles de todos los servidores; enseñar criterio.",
        "Readonly primero es la regla de oro.",
      ],
    },
    {
      module: "mcp",
      type: "full",
      title: "Scopes MCP",
      body: "Local, project y user no son detalles tecnicos: cambian quien comparte la conexion y que riesgo introduce.",
      image: {
        src: "./images/mcp-scopes.svg",
        alt: "Scopes MCP local project user.",
        caption: "Project MCP se versiona con el equipo. User MCP es personal. Local evita compartir configuracion sensible.",
      },
      source: "Claude Code MCP",
      notes: [
        "Relacionarlo con .mcp.json del pack.",
        "No todos los MCP deben acabar en proyecto.",
      ],
    },
    {
      module: "mcp",
      type: "code",
      title: ".mcp.json compartido",
      body: "Un MCP compartido debe documentar comando, variables y riesgo. El archivo no debe contener secretos.",
      code: [
        "{",
        "  \"mcpServers\": {",
        "    \"docs-readonly\": {",
        "      \"command\": \"node\",",
        "      \"args\": [\"./tools/mcp/docs-server.js\"],",
        "      \"env\": { \"DOCS_ROOT\": \"./docs\" }",
        "    }",
        "  }",
        "}",
      ],
      source: "Claude Code MCP",
      notes: [
        "Recalcar: ejemplos sin secretos.",
        "La configuracion real debe ir con owner y politica de permisos.",
      ],
    },
    {
      module: "mcp",
      type: "full",
      title: "Inventario de riesgo MCP",
      body: "Cada servidor MCP necesita una ficha: proposito, datos expuestos, permisos, variables, coste de contexto, owner y criterio de activacion.",
      image: {
        src: "./images/mcp-risk-inventory.svg",
        alt: "Inventario de riesgo MCP.",
        caption: "Sin inventario, MCP se vuelve invisible. Y lo invisible acaba costando.",
      },
      source: "Auditoria Vendor Claude",
      notes: [
        "Esta es una slide de gobierno, muy importante para Generali/empresa.",
        "Sirve para convertir entusiasmo tecnico en politica operable.",
      ],
    },
    {
      module: "mcp",
      type: "full",
      title: "Context overhead",
      body: "MCP, skills y subagentes pueden mejorar contexto, pero tambien pueden cargarlo. /context es el cuadro de mando del operador.",
      image: {
        src: "./images/context-overhead.svg",
        alt: "Medidor de overhead de contexto en Claude Operator.",
        caption: "Activar mas cosas no siempre mejora la respuesta. A veces solo ensancha la factura.",
      },
      source: "Claude Code costs + /context",
      notes: [
        "Hacer demostracion: comparar pregunta con y sin MCP activado.",
        "Preguntar: que fuente de contexto realmente desbloqueaba la decision?",
      ],
    },
    {
      module: "mcp",
      type: "full",
      title: "Routing de coste Operator",
      body: "Coste no es solo modelo. Es contexto, herramientas, subagentes, reintentos y tiempo de humano revisando ruido.",
      cards: [
        ["Bajo", "Explorer read-only, resumen, clasificacion."],
        ["Medio", "Bugfix con patch y test, QA reviewer."],
        ["Alto", "Arquitectura ambigua, migracion multi-modulo."],
        ["Reducir", "Scope pequeno, /context, skills buenas, handoff claro."],
      ],
      source: "Claude Code costs",
      notes: [
        "Esta slide conecta todas las piezas.",
        "Un buen operator sabe gastar mas cuando compensa y menos cuando no.",
      ],
    },
    {
      module: "labs",
      type: "full",
      title: "Secuencia de labs",
      body: "El curso se practica como una ruta incremental: primero skill, luego subagente, luego MCP y finalmente coste.",
      steps: [
        "CL-O01 summarize-changes",
        "CL-O02 fix-tests",
        "CL-O03 explorer read-only",
        "CL-O04 QA reviewer",
        "CL-O05 MCP project",
        "CL-O06 model routing",
      ],
      source: "AI Practice Hub Claude exercises",
      notes: [
        "No venderlo como ejercicios sueltos. Es una progresion.",
        "Cada lab produce un archivo reutilizable del pack.",
      ],
    },
    {
      module: "labs",
      type: "full",
      title: "Workshop simulado: crear una skill",
      body: "El alumno parte de un prompt repetido, lo convierte en SKILL.md, añade rubrica y prueba activacion sobre un diff.",
      checklist: [
        "Prompt repetido identificado.",
        "Description especifica.",
        "Allowed tools minimas.",
        "Salida esperada con formato estable.",
        "Prueba y ajuste tras primer uso.",
      ],
      source: "Workshop Claude Operator",
      notes: [
        "Esto puede convertirse luego en microvideo interactivo.",
        "La demo debe mostrar como cambia el output al mejorar description.",
      ],
    },
    {
      module: "labs",
      type: "full",
      title: "Loop fix-tests",
      body: "El operador no solo crea una skill: prueba si mejora el loop real de diagnostico, patch, test y handoff.",
      image: {
        src: "./images/fix-tests-loop.svg",
        alt: "Loop de fix-tests con Claude.",
        caption: "Una skill buena reduce vueltas. Una skill decorativa solo cambia donde vive el prompt.",
      },
      source: "Material cl-skill-fix-tests",
      notes: [
        "Usar esta slide para que el alumno compare salida antes/despues de la skill.",
        "La pregunta es si reduce rework, no si suena elegante.",
      ],
    },
    {
      module: "labs",
      type: "full",
      title: "Stack Operator completo",
      body: "El curso 2 debe terminar con una composicion clara: memoria minima, skills bajo demanda, subagentes acotados, MCP inventariado y coste visible.",
      image: {
        src: "./images/operator-stack.svg",
        alt: "Stack completo de Claude Operator.",
        caption: "Operator es una pila de decisiones, no una carpeta llena de artefactos.",
      },
      source: "Claude Operator assets Sprint 03",
      notes: [
        "Esta slide resume el curso con una imagen de arquitectura.",
        "Pedir que cada equipo marque que capas estan listas y cuales no.",
      ],
    },
    {
      module: "labs",
      type: "full",
      title: "Meme: agente real vs teatro",
      body: "Si un subagente tiene el mismo prompt, las mismas herramientas y la misma salida que el agente principal, probablemente solo le hemos puesto sombrero.",
      image: {
        src: "./images/meme-agent-theater.svg",
        alt: "Meme sobre subagentes teatrales sin rol real.",
        caption: "Un rol sin herramientas acotadas y criterio de salida no es agente: es cosplay operativo.",
      },
      source: "Slide nueva de humor con criterio",
      notes: [
        "Pausa comica para reforzar calidad de subagentes.",
        "Pedir ejemplo: que herramienta quitarias al security reviewer?",
      ],
    },
    {
      module: "labs",
      type: "full",
      title: "Meme: el enchufe universal MCP",
      body: "Cuando todo problema se resuelve instalando otro MCP, el contexto crece y la responsabilidad se diluye.",
      image: {
        src: "./images/meme-mcp-universal-plug.svg",
        alt: "Meme sobre instalar MCPs como enchufe universal.",
        caption: "Antes de conectar: owner, datos, permisos, coste y decision que desbloquea.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Conectar con inventario MCP.",
        "La broma tiene que acabar en checklist: no instalar por curiosidad.",
      ],
    },
    {
      module: "labs",
      type: "full",
      title: "Workshop largo conectado",
      body: "Sprint 02 añade el video de 30 minutos `cl-workshop-30m-memory-to-hook`, que parte de esta base Operator y la lleva a hook avanzado.",
      cards: [
        ["Entrada", "CLAUDE.md, /context y skill."],
        ["Operacion", "Subagente explorer y MCP readonly."],
        ["Salida", "Hook anti secretos probado."],
        ["Uso", "Puente perfecto hacia curso 3."],
      ],
      source: "VideoBlueprint cl-workshop-30m-memory-to-hook",
      notes: [
        "Esta slide ayuda a insertar video largo dentro del flujo del curso.",
        "Recomendar verlo tras terminar labs Operator.",
      ],
    },
    {
      module: "labs",
      type: "full",
      title: "Criterio de aprobado",
      body: "Este curso no se aprueba por tener carpetas .claude llenas. Se aprueba cuando esas carpetas reducen repeticion, riesgo y coste.",
      checklist: [
        "Cada skill tiene owner y caso de uso.",
        "Cada subagente tiene rol y herramientas acotadas.",
        "Cada MCP tiene inventario.",
        "Cada tarea larga usa /context y handoff.",
        "Cada decision de modelo tiene motivo.",
      ],
      source: "Auditoria Vendor Claude",
      notes: [
        "Cierre exigente: producir artefactos no basta.",
        "La pregunta final es: esto ayuda al equipo mañana?",
      ],
    },
    {
      module: "labs",
      type: "hero",
      title: "Operator convierte buenas practicas en sistema",
      subtitle: "Skills para workflows, subagentes para roles, MCP con inventario y coste medido. Ahora si estamos listos para hooks, plugins y CI/CD.",
      pills: ["Siguiente: Advanced Automation", "Hooks", "Plugins", "GitHub Actions"],
      image: {
        src: "./images/operator-hero.svg",
        alt: "Cierre de Claude Operator.",
        caption: "Curso 2 deja preparado el terreno para automatizacion gobernada.",
      },
      source: "Cierre del curso",
      notes: [
        "Conectar con el tercer curso: los hooks y plugins solo tienen sentido si antes hay buenas piezas.",
        "Mandar a los labs como prerrequisito real.",
      ],
    },
,
{
      module: "labs",
      type: "full",
      title: "Dieta de contexto",
      body: "Menos contexto inutil, mas senales que desbloquean decision.",
      image: {
            src: "./images/reflection-context-diet.svg",
            alt: "Dieta de contexto",
            caption: "Menos contexto inutil, mas senales que desbloquean decision."
      },
      source: "Sprint Visual Excellence - reflection",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "labs",
      type: "full",
      title: "Skill con owner",
      body: "Una skill sin mantenimiento envejece como una regla olvidada.",
      image: {
            src: "./images/reflection-skill-ownership.svg",
            alt: "Skill con owner",
            caption: "Una skill sin mantenimiento envejece como una regla olvidada."
      },
      source: "Sprint Visual Excellence - reflection",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "labs",
      type: "full",
      title: "Frontera del subagente",
      body: "Delegar bien empieza diciendo que no puede hacer.",
      image: {
            src: "./images/reflection-agent-boundary.svg",
            alt: "Frontera del subagente",
            caption: "Delegar bien empieza diciendo que no puede hacer."
      },
      source: "Sprint Visual Excellence - reflection",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "labs",
      type: "full",
      title: "Lifecycle de una skill",
      body: "Detectar repeticion, escribir, probar, versionar y retirar.",
      image: {
            src: "./images/diagram-skill-lifecycle.svg",
            alt: "Lifecycle de una skill",
            caption: "Detectar repeticion, escribir, probar, versionar y retirar."
      },
      source: "Sprint Visual Excellence - diagram",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "labs",
      type: "full",
      title: "Routing de subagentes",
      body: "Explorer, QA, Security y Architect no comparten coste ni permisos.",
      image: {
            src: "./images/diagram-subagent-routing.svg",
            alt: "Routing de subagentes",
            caption: "Explorer, QA, Security y Architect no comparten coste ni permisos."
      },
      source: "Sprint Visual Excellence - diagram",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "labs",
      type: "full",
      title: "Loop MCP gobernado",
      body: "Inventario, scope, permiso, evidencia, coste y revision.",
      image: {
            src: "./images/diagram-mcp-governance-loop.svg",
            alt: "Loop MCP gobernado",
            caption: "Inventario, scope, permiso, evidencia, coste y revision."
      },
      source: "Sprint Visual Excellence - diagram",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
}
  ],
};
