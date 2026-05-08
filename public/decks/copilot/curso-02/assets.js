window.COPILOT_DECK = {
  meta: {
    title: "GitHub Copilot: Funcionalidades Básicas",
    subtitle: "Curso web basado en knm-github-copilot-3-feature-basic.v1.2.pptx",
    source: "PPT Funcionalidades Básicas V1.2",
  },
  modules: [
    { id: "completion", label: "01 Completion" },
    { id: "chat", label: "02 Chat" },
    { id: "context", label: "03 Contexto" },
    { id: "cli", label: "04 CLI" },
    { id: "smart", label: "05 Smart Actions" },
    { id: "review", label: "06 Reviews" },
  ],
  slides: [
    {
      module: "completion",
      type: "hero",
      title: "Copilot: funcionalidades básicas",
      subtitle: "El curso donde Copilot deja de ser instalación y empieza a ser flujo diario: completado, chat, contexto, CLI, Smart Actions y revisión.",
      pills: ["Basado en PPT V1.2", "82 slides condensadas", "VS Code como superficie principal"],
      source: "PPT slides 1-3",
      notes: [
        "Abrir recordando que Core explicaba la herramienta; este curso explica el uso diario.",
        "La idea no es conocer todos los botones, sino elegir la superficie correcta para cada tarea.",
      ],
      image: {
        src: "./images/feature-flow-hero.svg",
        alt: "Flujo diario de Copilot con completion, chat, contexto, CLI, smart actions y review.",
        caption: "El curso aterriza Copilot como flujo: elegir superficie, dar contexto, actuar y revisar.",
      },
    },
    {
      module: "completion",
      type: "full",
      title: "Indice de trabajo",
      body: "El PPT original recorre seis bloques: completado de código, Copilot Chat, CLI, Smart Actions, soporte a Pull Request, Copilot en Code Reviews y próximos pasos.",
      cards: [
        ["Completion", "Sugerencias en tiempo real, comentarios y atajos."],
        ["Chat", "Ask, Plan, Agent, contexto, sesiones y vistas."],
        ["Contexto", "Participantes, slash commands y variables."],
        ["CLI + Smart Actions", "Copilot fuera del panel de chat y acciones proactivas."],
      ],
      source: "PPT slide 2",
      notes: [
        "Usar esta slide para explicar que ya estamos en el terreno práctico.",
        "El alumno debe salir sabiendo cuándo usar inline, chat, CLI o review.",
      ],
    },
    {
      module: "completion",
      type: "full",
      title: "Qué es code completion",
      body: "El completado de código predice y sugiere código mientras el desarrollador escribe. Puede completar líneas, funciones, fragmentos y código a partir de comentarios o nombres claros.",
      cards: [
        ["Tiempo real", "Aparece mientras escribes, sin romper el flujo."],
        ["Contextual", "Usa el fichero, los símbolos, nombres y contexto abierto."],
        ["Comentarios", "Un comentario concreto puede convertirse en implementación."],
        ["Revisión", "Aceptar no es delegar responsabilidad: hay que leer."],
      ],
      image: {
        src: "./images/completion-ghost.svg",
        alt: "Editor con ghost text de Copilot generado a partir de comentario, nombre y test.",
        caption: "Completion parece magia, pero la calidad sube cuando el archivo deja señales verificables.",
      },
      source: "PPT slide 5",
      notes: [
        "No vender completion como generador perfecto. Es acelerador de escritura.",
        "Ejemplo útil: escribir primero el nombre de función y un comentario de comportamiento.",
      ],
    },
    {
      module: "completion",
      type: "vscode",
      title: "Magia controlada",
      body: "La magia del autocompletado aparece cuando hay intención visible: nombre de función, tipos, tests o comentario. Sin esas señales, Copilot rellena huecos con más incertidumbre.",
      code: [
        "// Return true when the user can access a premium feature",
        "function canUsePremiumFeature(user, plan) {",
        "  if (!user || !plan) return false",
        "  // ghost text: check role, plan status and expiration",
        "}",
      ],
      source: "PPT slides 6, 12-14",
      notes: [
        "Mostrar que un comentario bueno no es largo: es específico.",
        "Pedir que comparen comentario vago frente a comentario verificable.",
      ],
    },
    {
      module: "completion",
      type: "full",
      title: "Meme: ghost text no es contrato",
      body: "La sugerencia inline aparece integrada en el editor, pero sigue siendo una hipótesis. Antes de aceptar hay que leer, entender y comprobar que encaja con el comportamiento esperado.",
      image: {
        src: "./images/meme-ghost-contract.svg",
        alt: "Meme sobre ghost text de Copilot como sugerencia que debe revisarse antes de aceptar.",
        caption: "Que el texto aparezca gris y elegante no lo convierte en verdad.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Usar esta slide para cortar el reflejo de aceptar por velocidad.",
        "Ejemplo: una función de impuestos parece obvia hasta que aparecen países, redondeos y exenciones.",
      ],
    },
    {
      module: "completion",
      type: "full",
      title: "Tipos de completion",
      body: "El PPT distingue varios ejemplos: autocompletado en línea, desde comentario y con varias sugerencias. La competencia clave es saber navegar alternativas y no aceptar la primera por reflejo.",
      cards: [
        ["Inline", "Sugerencia inmediata en el cursor."],
        ["Comment to code", "Convierte intención escrita en implementación."],
        ["Varias sugerencias", "Permite comparar alternativas."],
        ["Configuración", "Habilitar, deshabilitar y ajustar según lenguaje o fichero."],
      ],
      source: "PPT slides 7, 11-14",
      notes: [
        "Conectar con ejercicios cp-b02 y cp-b03.",
        "Truco: si varias sugerencias son malas, mejora contexto antes de seguir ciclando.",
      ],
    },
    {
      module: "completion",
      type: "compare",
      title: "Atajos: útiles, pero frágiles",
      body: "Los atajos de teclado aceleran mucho, pero pueden chocar con otros atajos del sistema, extensiones o configuraciones corporativas.",
      leftTitle: "Problema típico",
      rightTitle: "Práctica sana",
      left: ["No funciona Tab", "Conflicto con otra extensión", "El alumno cambia diez cosas a la vez", "Nadie sabe qué atajo ganó"],
      right: ["Probar poco a poco", "Documentar cambios", "Usar Command Palette si hay duda", "No bloquear el curso por atajos"],
      image: {
        src: "./images/shortcut-conflict.svg",
        alt: "Imagen humorística sobre conflictos de atajos de teclado en Copilot.",
        caption: "Mini meme operativo: si Tab se pelea con media máquina, se resuelve sin secuestrar el workshop.",
      },
      source: "PPT slides 9-10",
      notes: [
        "Esta slide ahorra mucho tiempo en talleres reales.",
        "No discutir atajos personalizados durante 20 minutos: resolver con alternativa.",
      ],
    },
    {
      module: "completion",
      type: "full",
      title: "Meme: deja de ciclar con Tab",
      body: "Cuando varias sugerencias son malas, el problema probablemente no está en la tecla. Cambia el contexto: abre el test, escribe un comentario mejor, nombra la función o reduce el alcance.",
      image: {
        src: "./images/meme-tab-loop.svg",
        alt: "Meme sobre ciclar sugerencias con Tab sin mejorar contexto.",
        caption: "Cambiar de sugerencia sin cambiar de señales es dar vueltas.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Pedir al alumno que diga qué señal añadiría antes de seguir probando sugerencias.",
        "Conectar con el ejercicio de comment-to-code.",
      ],
    },
    {
      module: "chat",
      type: "hero",
      title: "Copilot Chat",
      subtitle: "El salto de completar código a conversar con el workspace: explicar, corregir, generar, debatir arquitectura y preparar cambios.",
      pills: ["Ask", "Plan", "Agent", "Permisos", "Modelo"],
      source: "PPT slides 15-18",
      notes: [
        "Transición: completion acelera dedos; chat acelera razonamiento y navegación.",
      ],
      image: {
        src: "./images/chat-cockpit.svg",
        alt: "Cabina de Copilot Chat con Ask, Plan, Agent, modelo, permisos y contexto.",
        caption: "Chat no empieza con el prompt: empieza eligiendo modo, permisos, modelo y contexto.",
      },
    },
    {
      module: "chat",
      type: "full",
      title: "Qué es Copilot Chat",
      body: "Una funcionalidad conversacional dentro del editor para resolver dudas, generar código, explicar fragmentos, corregir errores y debatir decisiones técnicas en lenguaje natural.",
      cards: [
        ["Preguntar", "Comprender código, errores y alternativas."],
        ["Editar", "Proponer cambios controlados."],
        ["Generar", "Crear código, tests o documentación."],
        ["Debatir", "Comparar estrategias y riesgos."],
      ],
      source: "PPT slide 17",
      notes: [
        "Insistir en que chat no es solo 'hazme esto'. También es herramienta de pensamiento.",
      ],
    },
    {
      module: "chat",
      type: "full",
      title: "Desde dónde se usa",
      body: "Copilot Chat puede aparecer como panel, inline chat, editor chat, vistas específicas o experiencias integradas en PRs y GitHub. Cada vista tiene su fricción y su alcance.",
      cards: [
        ["Panel", "Conversación amplia con contexto y controles."],
        ["Inline", "Edición localizada sobre selección o fichero."],
        ["Editor", "Trabajo más integrado en el flujo de código."],
        ["PR/GitHub", "Revisión, descripción y colaboración."],
      ],
      source: "PPT slides 19-20, 33-34",
      notes: [
        "El modo visual cambia con versiones de VS Code. Enseñar concepto, no pixel exacto.",
      ],
    },
    {
      module: "chat",
      type: "full",
      title: "Configurar una sesión de Chat",
      body: "Una sesión queda definida por tipo de sesión, modo de agente, nivel de permisos, modelo, herramientas y contexto extra. Ahí está la diferencia entre preguntar y delegar.",
      cards: [
        ["Tipo de sesión", "Local, segundo plano o cloud según disponibilidad."],
        ["Modo", "Ask, Plan, Agent o modos custom."],
        ["Permisos", "Autonomía para aprobar herramientas."],
        ["Modelo", "Calidad, coste y capacidad de razonamiento."],
      ],
      image: {
        src: "./images/chat-cockpit.svg",
        alt: "Panel de configuración de una sesión de Copilot Chat.",
        caption: "Una tarea sencilla y una refactorización multiarchivo no merecen la misma sesión.",
      },
      source: "PPT slides 21-28",
      notes: [
        "Esta es probablemente la slide más importante del bloque Chat.",
        "Pedir que expliquen qué cambiarían para una tarea sencilla vs una refactorización multiarchivo.",
      ],
    },
    {
      module: "chat",
      type: "compare",
      title: "Ask, Plan y Agent",
      body: "Cada modo sirve para una cosa. Usar Agent para dudas simples aumenta coste y riesgo; usar Ask para editar archivos crea frustración.",
      leftTitle: "Modo mal elegido",
      rightTitle: "Modo correcto",
      left: ["Agent para explicar una función", "Ask esperando cambios en archivos", "Plan sin criterio de cierre", "Permisos amplios por comodidad"],
      right: ["Ask para entender", "Plan para diseñar antes de tocar", "Agent para tareas multiarchivo", "Permisos mínimos y revisión"],
      source: "PPT slides 21, 23-25",
      notes: [
        "Conectar directamente con el microvideo cp-basic-02-ask-edit-agent.",
      ],
    },
    {
      module: "chat",
      type: "full",
      title: "Meme: Ask, Plan y Agent no son estados de ánimo",
      body: "Ask, Plan y Agent definen contratos distintos. Ask ayuda a entender, Plan ordena antes de tocar y Agent actúa con más autonomía. Usarlos por impulso aumenta coste o frustración.",
      image: {
        src: "./images/meme-chat-modes.svg",
        alt: "Meme visual con Ask, Plan y Agent como contratos de trabajo distintos.",
        caption: "Elegir modo es decidir cuánto contexto, coste, permiso y riesgo aceptas.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Funciona bien como pregunta al grupo: qué modo usarías para cada tarea?",
        "La respuesta importante no es memorizar, sino justificar por riesgo y alcance.",
      ],
    },
    {
      module: "chat",
      type: "full",
      title: "Añadir contexto al prompt",
      body: "Copilot puede recibir contexto por texto, visión, fichero activo, selección, participantes, variables de chat o herramientas. Ser ordenado con el contexto es un premio.",
      cards: [
        ["Texto", "Explicar objetivo, restricciones y done."],
        ["Visión", "Capturas, UI o mockups cuando aplique."],
        ["Implícito", "Fichero activo, selección, nombres y tests abiertos."],
        ["Explícito", "@participantes, #variables y archivos concretos."],
      ],
      image: {
        src: "./images/context-router.svg",
        alt: "Router visual de contexto con participantes, slash commands y variables.",
        caption: "El buen prompt señala el camino: texto, selección, participante, comando y variable cuando aportan valor.",
      },
      source: "PPT slides 29-30",
      notes: [
        "Frase clave: no abras todo; abre solo lo que aporta.",
      ],
    },
    {
      module: "chat",
      type: "vscode",
      title: "Prompt básico de Chat",
      body: "El PPT muestra un ejemplo de API Node/Express. La lección no es Express: es pedir una salida concreta con criterios visibles.",
      code: [
        "Prompt:",
        "Crea un API básico en Node.js con Express.",
        "- Endpoint GET / que responda 'Hola mundo desde mi API'",
        "- Muestra por consola el puerto al arrancar",
        "- Incluye instrucciones para ejecutarlo localmente",
      ],
      source: "PPT slides 33-34",
      notes: [
        "Mostrar cómo mejorar el prompt: versión de Node, estructura de archivos y test mínimo.",
      ],
    },
    {
      module: "chat",
      type: "full",
      title: "Gestión y debug de sesiones",
      body: "Las sesiones tienen ciclo de vida. Se pueden eliminar, depurar o revisar detalles de peticiones y respuestas. Eliminar sesiones puede ser irreversible.",
      cards: [
        ["Historial", "Útil para continuidad, peligroso si acumula ruido."],
        ["Borrado", "Acción irreversible según entorno."],
        ["Debug view", "Permite inspeccionar detalles de peticiones y respuestas."],
        ["Extras", "Algunas funcionalidades vienen deshabilitadas por defecto."],
      ],
      source: "PPT slides 35-37",
      notes: [
        "Muy importante para soporte: saber mirar qué está pasando antes de decir 'no funciona'.",
      ],
    },
    {
      module: "chat",
      type: "full",
      title: "Mejorar la conversación",
      body: "Una conversación buena con Copilot tiene intención, contexto, restricciones y validación. La herramienta es conversacional, pero el trabajo sigue siendo ingeniería.",
      checklist: [
        "Explica el objetivo antes de pedir código.",
        "Incluye archivos, selección o tests relevantes.",
        "Pide plan si el cambio tiene riesgo.",
        "Cierra con diff, test o comprobación.",
        "Limpia sesiones si el contexto se ensucia.",
      ],
      source: "PPT slides 38-40",
      notes: [
        "Esta slide prepara el salto a funcionalidades avanzadas sin correr demasiado.",
      ],
    },
    {
      module: "chat",
      type: "full",
      title: "Meme: una sesión vieja también pesa",
      body: "El historial puede ayudar, pero también puede arrastrar decisiones antiguas, archivos irrelevantes y objetivos mezclados. A veces la mejor optimización es empezar limpio.",
      image: {
        src: "./images/meme-session-backpack.svg",
        alt: "Meme sobre una sesión de chat vieja cargando contexto innecesario.",
        caption: "Si la conversación ya parece mochila, limpia o reinicia antes de pedir precisión.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Conectar con debug de sesiones y con higiene de contexto.",
        "Ejemplo práctico: una sesión que empezó con login y termina intentando arreglar pagos.",
      ],
    },
    {
      module: "context",
      type: "hero",
      title: "Participantes, slash commands y variables",
      subtitle: "El contexto se puede invocar. Aquí Copilot deja de ser una caja de texto y empieza a tener referencias estructuradas.",
      pills: ["@workspace", "@vscode", "@terminal", "/explain", "#file", "#codebase"],
      source: "PPT slides 41-50",
      notes: [
        "Transición: si Chat es conversación, esta sección enseña a darle coordenadas.",
      ],
      image: {
        src: "./images/context-router.svg",
        alt: "Diagrama de @participantes, slash commands y variables hacia Copilot Chat.",
        caption: "Aquí Copilot deja de recibir frases sueltas y empieza a recibir referencias estructuradas.",
      },
    },
    {
      module: "context",
      type: "full",
      title: "Participantes",
      body: "Un participante representa una entidad o ámbito del entorno de desarrollo. Se invoca con @ y ayuda a especificar el contexto de la pregunta.",
      cards: [
        ["@workspace", "Responde usando el proyecto abierto."],
        ["@vscode", "Ayuda sobre el propio IDE."],
        ["@terminal", "Contexto relacionado con terminal."],
        ["Roles", "Cada participante enfoca la respuesta en un ámbito."],
      ],
      source: "PPT slides 42-44",
      notes: [
        "Importante: @workspace no es 'todo lo sabe'. Es una señal de contexto.",
      ],
    },
    {
      module: "context",
      type: "full",
      title: "Slash commands",
      body: "Los slash commands son atajos para invocar funciones específicas sin escribir instrucciones largas. Funcionan como aceleradores de intención.",
      cards: [
        ["/help", "Ayuda con comandos disponibles."],
        ["/explain", "Explica el código activo o seleccionado."],
        ["/tests", "Genera pruebas unitarias."],
        ["/fix", "Analiza problemas y propone correcciones."],
      ],
      source: "PPT slides 45-47",
      notes: [
        "Los comandos cambian por versión. Enseñar el patrón, no memorizar una lista cerrada.",
      ],
    },
    {
      module: "context",
      type: "full",
      title: "Variables de Chat",
      body: "Las variables de chat referencian elementos del entorno: editor, terminal, ficheros, carpetas o codebase. Mejoran precisión porque evitan ambigüedad.",
      cards: [
        ["#editor", "Código visible en el editor activo."],
        ["#terminalLastCommand", "Último comando ejecutado."],
        ["#file", "Archivo específico del workspace."],
        ["#codebase", "Contexto amplio del espacio de trabajo."],
      ],
      source: "PPT slides 48-50",
      notes: [
        "Conectar con context engineering: no basta con pedir, hay que señalar.",
      ],
    },
    {
      module: "context",
      type: "compare",
      title: "Contexto explícito vs ruido",
      body: "Más contexto no siempre es mejor. El buen contexto reduce incertidumbre; el ruido hace que Copilot mezcle señales.",
      leftTitle: "Ruido",
      rightTitle: "Contexto útil",
      left: ["Muchos archivos abiertos sin relación", "Prompts largos sin estructura", "Variables usadas por costumbre", "Sesiones viejas arrastradas"],
      right: ["Archivo exacto", "Selección relevante", "Test relacionado", "Variable o participante adecuado"],
      source: "PPT slides 29-30, 42-50",
      notes: [
        "Esta idea es transversal a toda la plataforma.",
      ],
    },
    {
      module: "context",
      type: "full",
      title: "Meme: contexto no es buffet libre",
      body: "Dar más contexto no siempre mejora la respuesta. El buen contexto es el que reduce incertidumbre sobre la tarea: archivo exacto, selección relevante, test relacionado y criterio de cierre.",
      image: {
        src: "./images/meme-context-buffet.svg",
        alt: "Meme sobre no añadir contexto irrelevante como si fuera buffet libre.",
        caption: "Mucho contexto puede ser ruido con traje técnico.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Pedir al grupo que quite contexto de un prompt cargado y lo deje en cuatro piezas útiles.",
        "Esta slide refuerza @, / y # como herramientas quirúrgicas.",
      ],
    },
    {
      module: "cli",
      type: "hero",
      title: "GitHub Copilot CLI",
      subtitle: "Copilot también puede salir del editor. Pero cuando entra en terminal, el modelo de seguridad importa el doble.",
      pills: ["CLI", "Directorio de confianza", "Tools", "/usage", "/context", "/compact"],
      source: "PPT slides 51-52",
      notes: [
        "Avisar: esta sección depende mucho del estado actual del producto y políticas corporativas.",
      ],
      image: {
        src: "./images/cli-trust-boundary.svg",
        alt: "Frontera de confianza para GitHub Copilot CLI.",
        caption: "Cuando Copilot entra en terminal, permisos y carpeta de trabajo importan el doble.",
      },
    },
    {
      module: "cli",
      type: "full",
      title: "Qué es Copilot CLI",
      body: "Una capacidad para llevar inteligencia de Copilot a la línea de comandos: preguntar, asistir en comandos, explicar, depurar, interactuar con GitHub y manipular archivos o control de versiones.",
      cards: [
        ["Terminal", "Ayuda sobre comandos y errores."],
        ["GitHub", "Interacción con issues, PRs o repos según configuración."],
        ["Archivos", "Puede leer o modificar si tiene permisos."],
        ["Seguridad", "Su autonomía exige controles explícitos."],
      ],
      source: "PPT slides 52-57",
      notes: [
        "Recalcar que CLI no es más básico que VS Code: puede tener más riesgo.",
      ],
    },
    {
      module: "cli",
      type: "compare",
      title: "Modelo de confianza",
      body: "El CLI está diseñado con capacidad agéntica. Por eso el PPT dedica varias slides al directorio de confianza y al control de herramientas.",
      leftTitle: "Uso peligroso",
      rightTitle: "Uso gobernado",
      left: ["Ejecutar en cualquier carpeta", "allow-all-tools sin revisar", "No entender herramientas", "Compactar tarde"],
      right: ["Directorio de confianza", "Permisos por herramienta", "deny/allow explícito", "/usage, /context y /compact"],
      image: {
        src: "./images/cli-trust-boundary.svg",
        alt: "Modelo de confianza para herramientas y directorio seguro en Copilot CLI.",
        caption: "La autonomía agéntica necesita frontera: carpeta, tools permitidas y revisión antes de actuar.",
      },
      source: "PPT slides 58-64",
      notes: [
        "Esto conecta con Codex/Claude: toda IA agéntica necesita frontera.",
      ],
    },
    {
      module: "cli",
      type: "full",
      title: "Meme: en terminal sí hay botón rojo",
      body: "En CLI, una respuesta puede convertirse en acción real sobre archivos, comandos o herramientas. Por eso la pausa antes de permitir una tool no es burocracia: es seguridad.",
      image: {
        src: "./images/meme-cli-red-button.svg",
        alt: "Meme sobre pausar antes de permitir acciones de Copilot CLI.",
        caption: "En terminal, leer antes de permitir no es opcional.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "No enseñar miedo, enseñar frontera.",
        "Pedir siempre: qué directorio, qué tool, qué permisos y cómo se revierte?",
      ],
    },
    {
      module: "cli",
      type: "vscode",
      title: "Comandos de contexto en CLI",
      body: "El PPT menciona comandos de gestión de contexto como `/usage`, `/context` y `/compact`. Son hábitos de operación, no curiosidades.",
      code: [
        "$ copilot",
        "/usage      # estadisticas de la sesion",
        "/context    # overview del uso de tokens",
        "/compact    # comprime historico de conversacion",
      ],
      image: {
        src: "./images/cli-context-commands.svg",
        alt: "Dashboard de comandos /usage, /context y /compact en Copilot CLI.",
        caption: "Medir y compactar contexto es higiene operativa: evita que la sesión se convierta en ruido caro.",
      },
      source: "PPT slide 64",
      notes: [
        "Mensaje clave: saber limpiar y medir contexto es parte de ser buen usuario.",
      ],
    },
    {
      module: "smart",
      type: "hero",
      title: "Smart Actions",
      subtitle: "Sugerencias proactivas en el flujo de trabajo: refactorizar, generar tests, completar funciones, resumir PRs y preparar documentación.",
      pills: ["Quick actions", "PR summaries", "Context-aware"],
      source: "PPT slides 68-71",
      notes: [
        "Transición: de pedir explícitamente a recibir acciones sugeridas.",
      ],
      image: {
        src: "./images/smart-actions.svg",
        alt: "Panel de Smart Actions para refactor, tests, documentación y PR summaries.",
        caption: "Smart Actions son intervenciones acotadas: menos ceremonia que Agent, más foco que un prompt genérico.",
      },
    },
    {
      module: "smart",
      type: "full",
      title: "Qué es una Smart Action",
      body: "Una sugerencia proactiva basada en el contexto del código actual. Se integra de forma no intrusiva y aparece en puntos donde puede ahorrar fricción.",
      cards: [
        ["Refactor", "Proponer reorganización de código."],
        ["Tests", "Generar pruebas desde selección o función."],
        ["Completar", "Cerrar implementación pendiente."],
        ["Adaptativa", "Depende de lenguaje, entorno y contexto."],
      ],
      source: "PPT slides 70-72",
      notes: [
        "No confundir con Agent mode. Smart Action puede ser mucho más acotada.",
      ],
    },
    {
      module: "smart",
      type: "full",
      title: "Meme: Smart Action no es Agent disfrazado",
      body: "Una Smart Action tiene gracia porque es pequeña, contextual y revisable. Si empieza a necesitar plan largo, herramientas amplias y múltiples archivos, probablemente ya no es una Smart Action.",
      image: {
        src: "./images/meme-smart-action-vending.svg",
        alt: "Meme de Smart Actions como acciones pequeñas y acotadas.",
        caption: "Acción pequeña, valor rápido, diff revisable.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Usar para separar quick actions de flujos agénticos.",
        "Ejemplos buenos: generar test de selección, explicar función, preparar resumen de PR.",
      ],
    },
    {
      module: "smart",
      type: "full",
      title: "Pull Request summaries",
      body: "Copilot puede ayudar a generar descripciones de PR completas y claras, ahorrando tiempo y mejorando documentación del cambio.",
      cards: [
        ["Resumen", "Qué cambió y por qué."],
        ["Impacto", "Áreas tocadas y riesgos."],
        ["Testing", "Qué se verificó."],
        ["Review", "Facilita que la revisión empiece mejor."],
      ],
      image: {
        src: "./images/pr-summary-board.svg",
        alt: "Tablero de Pull Request summary con cambio, impacto, testing y foco de review.",
        caption: "Un resumen de PR bueno no maquilla el cambio: lo hace revisable antes.",
      },
      source: "PPT slides 73-75",
      notes: [
        "Reforzar que el resumen automático debe revisarse. Un PR mal descrito sigue siendo responsabilidad humana.",
      ],
    },
    {
      module: "smart",
      type: "full",
      title: "Meme: PR summary no es marketing",
      body: "Un resumen de PR no debe sonar bonito: debe ayudar a revisar. Qué cambió, por qué, qué impacto tiene, qué riesgos abre y qué se ha probado.",
      image: {
        src: "./images/meme-pr-summary-marketing.svg",
        alt: "Meme que compara un PR summary tipo marketing con un resumen revisable.",
        caption: "Un PR bien resumido ahorra tiempo al reviewer; uno bonito solo retrasa las preguntas.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Pedir al alumno convertir un resumen vago en un checklist revisable.",
        "Conectar con accountability: Copilot lo redacta, el autor lo firma.",
      ],
    },
    {
      module: "review",
      type: "hero",
      title: "Copilot en Code Reviews",
      subtitle: "Analizar cambios, detectar errores, sugerir mejoras y generar comentarios técnicos desde IDE o PR.",
      pills: ["Inline comments", "Apply change", "Security", "Quality"],
      source: "PPT slides 76-79",
      notes: [
        "Cierre del contenido funcional: revisar con IA no significa aprobar con IA.",
      ],
      image: {
        src: "./images/review-lens.svg",
        alt: "Lupa de revisión asistida por Copilot sobre un diff.",
        caption: "Copilot en review debe ser lupa, no sello: evidencia, severidad, sugerencia y verificación.",
      },
    },
    {
      module: "review",
      type: "full",
      title: "Qué aporta en revisión",
      body: "Copilot puede generar comentarios, sugerencias y análisis sobre cambios. Sirve para acelerar la lectura, no para sustituir el criterio del reviewer.",
      cards: [
        ["Comentarios", "Explican posibles mejoras o problemas."],
        ["Aplicar cambios", "Correcciones con un clic cuando el alcance es claro."],
        ["Seguridad", "Puede señalar patrones de riesgo."],
        ["Calidad", "Ayuda a detectar legibilidad, tests o edge cases."],
      ],
      source: "PPT slides 77-78",
      notes: [
        "Enseñar a revisar el comentario de Copilot como revisarías el de una persona junior.",
      ],
    },
    {
      module: "review",
      type: "compare",
      title: "Review responsable",
      body: "La revisión asistida por IA es valiosa cuando produce hallazgos accionables, con severidad, evidencia y sugerencia concreta.",
      leftTitle: "Mal review",
      rightTitle: "Buen review",
      left: ["Comentarios vagos", "No mirar diff completo", "Aplicar cambios sin entender", "Confundir sugerencia con verdad"],
      right: ["Findings concretos", "Archivo y razón", "Riesgo y severidad", "Verificación posterior"],
      image: {
        src: "./images/review-lens.svg",
        alt: "Review responsable con evidencia, riesgo, severidad y verificación.",
        caption: "Un comentario de Copilot vale cuando ayuda a decidir, no cuando solo suena convincente.",
      },
      source: "PPT slides 77-79",
      notes: [
        "Esta slide enlaza con CP3, donde el code review se vuelve una pieza avanzada.",
      ],
    },
    {
      module: "review",
      type: "full",
      title: "Meme: review asistido no es sello de aprobado",
      body: "Copilot puede señalar riesgos, sugerir mejoras y acelerar lectura. Pero un comentario asistido solo vale si trae evidencia, severidad, razón y verificación posterior.",
      image: {
        src: "./images/meme-review-stamp.svg",
        alt: "Meme sobre no tratar el review de Copilot como sello de aprobado.",
        caption: "La IA puede enfocar la lupa. El aprobado sigue necesitando criterio humano.",
      },
      source: "Slide nueva de reflexion",
      notes: [
        "Este cierre prepara el salto al curso avanzado.",
        "Pedir al grupo diferenciar comentario vago, finding accionable y bloqueo real.",
      ],
    },
    {
      module: "review",
      type: "timeline",
      title: "La ruta después de este curso",
      body: "El PPT cierra mostrando que esto es solo la base: después vienen instrucciones personalizadas, prompt files, custom agents y MCPs.",
      steps: [
        "Dominar completion y chat básico.",
        "Usar contexto explícito con @, / y #.",
        "Aplicar CLI y Smart Actions con seguridad.",
        "Entrenar revisión de PRs.",
        "Pasar a instructions, prompts, custom agents y MCP.",
      ],
      source: "PPT slides 80-81",
      notes: [
        "No dejar que el alumno salte a MCP si no sabe usar contexto y review.",
      ],
    },
    {
      module: "review",
      type: "full",
      title: "Cierre",
      body: "Funcionalidades básicas no significa poco importantes. Completion, Chat, contexto, CLI, Smart Actions y Review son el núcleo que determina si Copilot ayuda de verdad o solo genera ruido rápido.",
      checklist: [
        "Practica completion con comentarios verificables.",
        "Usa Ask, Plan y Agent con criterio.",
        "Añade contexto con @, / y # cuando aporte valor.",
        "Controla permisos y contexto en CLI.",
        "Revisa PRs con evidencia y responsabilidad humana.",
      ],
      source: "Síntesis del curso",
      notes: [
        "Cerrar llevando al alumno a los ejercicios CP2: refactor, tests, docs, instructions y prompt files.",
      ],
    },
,
{
      module: "review",
      type: "full",
      title: "Router Ask/Edit/Agent",
      body: "La decision depende de alcance, riesgo y permiso.",
      image: {
            src: "./images/diagram-ask-edit-agent-router.svg",
            alt: "Router Ask/Edit/Agent",
            caption: "La decision depende de alcance, riesgo y permiso."
      },
      source: "Sprint Visual Excellence - diagram",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "review",
      type: "full",
      title: "Stack de senales de contexto",
      body: "Archivo, seleccion, test, variable y participante.",
      image: {
            src: "./images/diagram-context-signal-stack.svg",
            alt: "Stack de senales de contexto",
            caption: "Archivo, seleccion, test, variable y participante."
      },
      source: "Sprint Visual Excellence - diagram",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "review",
      type: "full",
      title: "Escalera de permisos CLI",
      body: "Leer, explicar, sugerir, ejecutar y escribir no son lo mismo.",
      image: {
            src: "./images/diagram-cli-permission-ladder.svg",
            alt: "Escalera de permisos CLI",
            caption: "Leer, explicar, sugerir, ejecutar y escribir no son lo mismo."
      },
      source: "Sprint Visual Excellence - diagram",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "review",
      type: "full",
      title: "Flujo Smart Action",
      body: "Detectar contexto, proponer accion, revisar diff y cerrar.",
      image: {
            src: "./images/diagram-smart-action-flow.svg",
            alt: "Flujo Smart Action",
            caption: "Detectar contexto, proponer accion, revisar diff y cerrar."
      },
      source: "Sprint Visual Excellence - diagram",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
},
{
      module: "review",
      type: "full",
      title: "Loop de review con evidencia",
      body: "Finding, severidad, ruta, sugerencia y verificacion.",
      image: {
            src: "./images/diagram-review-evidence-loop.svg",
            alt: "Loop de review con evidencia",
            caption: "Finding, severidad, ruta, sugerencia y verificacion."
      },
      source: "Sprint Visual Excellence - diagram",
      notes: [
            "Usar esta slide para provocar criterio antes de pasar a la practica.",
            "Pedir al alumno que conecte la imagen con un caso real de su equipo."
      ]
}
  ],
};
