const images = window.CODEX_COURSE_ASSETS || {};
const localImages = {
  controlRoom: "./assets/codex-control-room.png",
  tokenReflection: "./assets/context-token-reflection.png",
  duckReview: "./assets/rubber-duck-review.png",
  mysteryX: "./assets/course1-meme-mystery-x.png",
  contextBuffet: "./assets/course1-meme-context-buffet.png",
  sandboxKeys: "./assets/course1-reflection-sandbox-keys.png",
  aiGps: "./assets/course1-meme-ai-gps.png",
};

const modules = [
  "Aterrizaje",
  "Contexto",
  "Workflow",
  "Operativa",
  "Practica",
];

const slides = [
  {
    module: "Aterrizaje",
    title: "Codex para desarrolladores",
    html: `
      <section class="slide hero-slide" style="--hero-img: url('${localImages.controlRoom || images.wallpaperOne || ""}')" data-number="01">
        <div>
          <p class="kicker">Curso condensado · 16:9 · con notas de facilitador</p>
          <h1>Codex para desarrolladores</h1>
          <p class="lead">De asistente de código a agente de ingeniería: contexto, flujo de trabajo, seguridad, modelos y coste.</p>
          <div class="hero-meta">
            <span>Basado en 3 cursos fuente</span>
            <span>Actualizado: 06/05/2026</span>
            <span>Orientado a usuarios con base previa</span>
          </div>
        </div>
      </section>
    `,
    notes: [
      "Abrir con una idea sencilla: Codex no es solo autocompletado. Es un agente que puede leer, editar, ejecutar comandos, revisar y continuar tareas.",
      "La nueva imagen principal ayuda a aterrizarlo: no estamos hablando de un chatbot suelto, sino de una sala de control de repo, tests, diffs, agentes y coste.",
      "La audiencia ya conoce conceptos de IA y desarrollo asistido, asi que conviene ir rapido en definiciones y detenerse mas en decisiones de uso.",
      "El objetivo de la sesion es que salgan sabiendo cuando usar Codex, como darle contexto, como controlar permisos y como mirar el coste."
    ]
  },
  {
    module: "Aterrizaje",
    title: "Que se conserva de los tres cursos",
    html: `
      <section class="slide two-col" data-number="02">
        <div>
          <p class="kicker">Mapa del contenido original</p>
          <h2>La misma base, aterrizada a Codex</h2>
          <p class="lead">Contexto del codigo, desarrollo asistido por IA y asistentes de codigo se convierten aqui en un metodo operativo.</p>
        </div>
        <div class="matrix">
          <div class="tile"><strong>Contexto</strong><p>Ventana de contexto, tokens, limites, documentacion, diagramas como codigo y contexto empresarial.</p></div>
          <div class="tile"><strong>Desarrollo asistido</strong><p>Impacto en el SDLC, tareas que mejora, nuevo rol del desarrollador y buenas practicas.</p></div>
          <div class="tile"><strong>Asistente de codigo</strong><p>De rubber duck a copiloto activo: ayuda, dependencia, calidad, naming, seguridad y supervision.</p></div>
          <div class="tile"><strong>Codex</strong><p>App, IDE, CLI, Cloud, AGENTS.md, MCP, skills, revisiones, modelos y creditos.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Contar que no se han copiado 92 slides una a una: se ha extraido la narrativa y se ha compactado para una audiencia mas senior.",
      "La novedad es que cada concepto termina en una decision concreta: que prompt escribir, que contexto dar, que permiso activar, que modelo elegir."
    ]
  },
  {
    module: "Aterrizaje",
    title: "Resultado esperado",
    html: `
      <section class="slide two-col wide-left" data-number="03">
        <div>
          <p class="kicker">Contrato de aprendizaje</p>
          <h2>Usar Codex sin perder criterio tecnico</h2>
          <p class="lead">El desarrollador no desaparece: cambia de escribir cada linea a dirigir, revisar, integrar y validar trabajo.</p>
        </div>
        <div class="flow">
          <div class="flow-step"><b>1</b><p>Elegir la superficie: App, IDE, CLI o Cloud segun riesgo, latencia y necesidad de paralelizar.</p></div>
          <div class="flow-step"><b>2</b><p>Construir contexto util: repo, errores, restricciones, docs, criterios de aceptacion.</p></div>
          <div class="flow-step"><b>3</b><p>Controlar gasto y calidad: modelos, razonamiento, compaction, tests, diff y review.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Aqui conviene invitar a pensar en Codex como un compañero tecnico al que hay que dirigir, no como una caja magica.",
      "Pregunta para el grupo: que parte de vuestro trabajo os da mas pereza repetir y cual os daria mas miedo delegar?"
    ]
  },
  {
    module: "Aterrizaje",
    title: "Codex no es solo autocompletado",
    html: `
      <section class="slide two-col" data-number="04">
        <div>
          <p class="kicker">Definicion actual</p>
          <h2>Un agente de software</h2>
          <p class="lead">Codex ayuda a escribir, entender, revisar, depurar y automatizar tareas de desarrollo sobre proyectos reales.</p>
          <div class="tag-row">
            <span class="chip">leer codigo</span><span class="chip">editar ficheros</span><span class="chip">ejecutar checks</span><span class="chip">revisar diffs</span>
          </div>
        </div>
        <div class="visual-shot">
          <img src="${images.codexApp || ""}" alt="Captura de la aplicacion Codex mostrando lista de proyectos, hilos y panel de revision" />
        </div>
      </section>
    `,
    notes: [
      "Apoyarse en la captura: hay proyecto, hilos, cambios y revision. Esa interfaz ya apunta a un ciclo de trabajo completo.",
      "Segun la documentacion oficial, Codex puede usarse en IDE, CLI, web/movil y CI/CD. No limitar la conversacion a un unico canal."
    ]
  },
  {
    module: "Aterrizaje",
    title: "Superficies de trabajo",
    html: `
      <section class="slide" data-number="05">
        <div>
          <p class="kicker">Donde vive Codex</p>
          <h2>La misma inteligencia, distintas fricciones</h2>
        </div>
        <div class="matrix three">
          <div class="tile"><strong>IDE</strong><p>Ideal para cambios acotados, contexto de archivos abiertos y feedback rapido en el editor.</p></div>
          <div class="tile"><strong>CLI</strong><p>Potente para repos, scripts, automatizacion local, slash commands y flujos reproducibles.</p></div>
          <div class="tile"><strong>App</strong><p>Buena para gestion de hilos, diffs, tareas locales, automations y experiencia visual.</p></div>
          <div class="tile"><strong>Cloud</strong><p>Permite delegar en entornos aislados, trabajar en paralelo y abrir PRs desde GitHub.</p></div>
          <div class="tile"><strong>CI/CD</strong><p>Revisiones, tareas programadas y flujos que deben dejar evidencia verificable.</p></div>
          <div class="tile"><strong>API/SDK</strong><p>Integracion cuando quieres construir un flujo propio encima de capacidades agenticas.</p></div>
        </div>
      </section>
    `,
    notes: [
      "No vender una superficie como universal. El valor esta en elegir segun tarea, sensibilidad de datos, permisos y necesidad de entorno.",
      "Ejemplo rapido: bug local reproducible en CLI o IDE; refactor grande en Cloud con PR; revision de cambios desde app."
    ]
  },
  {
    module: "Contexto",
    title: "Modulo 1",
    html: `
      <section class="slide section-slide" data-number="06">
        <div class="section-number">01</div>
        <div>
          <p class="kicker">Contexto e ingenieria del contexto</p>
          <h2>La calidad de Codex empieza antes del prompt</h2>
          <p class="lead">Archivos, errores, tests, convenciones, permisos, herramientas y memoria del hilo compiten por una ventana limitada.</p>
        </div>
      </section>
    `,
    notes: [
      "Este bloque replica el curso de Context Engineering y lo baja a Codex.",
      "Idea fuerza: mas contexto no siempre es mejor. Mejor contexto es contexto seleccionado, verificable y cercano a la tarea."
    ]
  },
  {
    module: "Contexto",
    title: "El contexto del codigo",
    html: `
      <section class="slide two-col" data-number="07">
        <div>
          <p class="kicker">Mas que la linea actual</p>
          <h2>Codex interpreta el entorno</h2>
          <p class="lead">Un cambio pequeno puede depender de nombres, imports, tests, errores, arquitectura, datos y reglas de negocio.</p>
        </div>
        <div class="orbit">
          <div class="center">Tarea Codex</div>
          <div class="node n1">Archivo actual</div>
          <div class="node n2">Tests y logs</div>
          <div class="node n3">Convenciones</div>
          <div class="node n4">Negocio</div>
          <div class="node n5">Historial del hilo</div>
        </div>
      </section>
    `,
    notes: [
      "Recupera la idea de las slides originales: el codigo no se entiende aislado.",
      "Poner un ejemplo real: cambiar un nombre de variable puede tocar API publica, migraciones, tests, docs o contratos con otros equipos."
    ]
  },
  {
    module: "Contexto",
    title: "El problema de la X",
    html: `
      <section class="slide two-col wide-left" data-number="08">
        <div>
          <p class="kicker">Sintoma clasico</p>
          <h2>Si no sabe que es X, inventara alrededor de X</h2>
          <p class="lead">La IA puede completar sintaxis; entender intencion exige contexto semantico y operacional.</p>
        </div>
        <div class="image-stack">
          <figure class="image-card meme-card">
            <img src="${localImages.mysteryX}" alt="Una gran X rodeada de pistas de contexto, tests, documentacion y reglas de negocio" />
            <figcaption>La X no es una variable: es una escena del crimen sin testigos.</figcaption>
          </figure>
          <div class="reflection-strip compact">
            <span>Nombre pobre = inferencia</span>
            <span>Tests = significado</span>
            <span>Reglas = intencion</span>
          </div>
        </div>
      </section>
    `,
    notes: [
      "No hace falta entretenerse en el ejemplo: usarlo como ancla para hablar de contexto minimo.",
      "Remate de la imagen: si X es una escena del crimen, Codex necesita pistas; el prompt aporta unas, el repo aporta muchas mas.",
      "Mensaje para desarrolladores senior: el mejor prompt no sustituye un repositorio con nombres pobres, tests debiles y docs desactualizadas."
    ]
  },
  {
    module: "Contexto",
    title: "Como Codex reune contexto",
    html: `
      <section class="slide two-col" data-number="09">
        <div>
          <p class="kicker">Loop agentico</p>
          <h2>Pregunta, inspeccion, accion, verificacion</h2>
          <p class="lead">Codex no solo recibe contexto: tambien lo busca leyendo ficheros, ejecutando comandos y observando resultados.</p>
        </div>
        <div class="flow">
          <div class="flow-step"><b>1</b><p>Recibe objetivo, contexto explicito y restricciones.</p></div>
          <div class="flow-step"><b>2</b><p>Explora repo, dependencias, tests, errores y docs relevantes.</p></div>
          <div class="flow-step"><b>3</b><p>Propone o edita, despues ejecuta checks y revisa el diff.</p></div>
          <div class="flow-step"><b>4</b><p>Resume evidencia, riesgos y siguientes pasos.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Conectar con la diferencia frente a chat generico: en Codex, la accion y la verificacion forman parte del ciclo.",
      "Advertencia: si Codex no puede ejecutar checks por permisos, dependencias o coste, debe decirlo. Esa transparencia hay que pedirla."
    ]
  },
  {
    module: "Contexto",
    title: "Ventana de contexto y tokens",
    html: `
      <section class="slide two-col visual-reflection" data-number="10">
        <div>
          <p class="kicker">Limite fisico</p>
          <h2>Todo lo util compite por la misma ventana</h2>
          <p class="lead">Prompt, archivos, salidas de comandos, historial y respuesta consumen tokens. Codex puede compactar hilos largos para seguir trabajando.</p>
        </div>
        <div class="image-stack">
          <figure class="image-card reflection-card">
            <img src="${localImages.tokenReflection}" alt="Desarrollador seleccionando capas de contexto y observando un medidor de presupuesto de tokens" />
          </figure>
          <div class="reflection-strip">
            <span>Input: contexto que entra</span>
            <span>Output: respuesta que pagas</span>
            <span>Compactar: memoria sin ruido</span>
          </div>
        </div>
      </section>
    `,
    notes: [
      "Esta slide es central para conciencia de gasto: tokens no son solo palabras del usuario, tambien herramientas y contexto acumulado.",
      "Usar la imagen como pausa de reflexion: antes de pedir mas contexto, preguntarse si cada capa aporta decision o solo volumen.",
      "Practica recomendada: usar /status para mirar contexto y token usage; usar /compact si el hilo se alarga."
    ]
  },
  {
    module: "Contexto",
    title: "Capas de contexto en Codex",
    html: `
      <section class="slide two-col wide-left" data-number="11">
        <div>
          <p class="kicker">Context engineering aplicado</p>
          <h2>Del prompt tactico al sistema de trabajo</h2>
          <p class="lead">La madurez llega cuando dejas de repetir instrucciones y conviertes contexto en activos reutilizables.</p>
        </div>
        <div class="timeline">
          <div class="timeline-row"><strong>Prompt</strong><p>Objetivo, contexto, restricciones y criterio de finalizacion.</p></div>
          <div class="timeline-row"><strong>AGENTS.md</strong><p>Reglas duraderas del repo: comandos, arquitectura, estilo y definicion de done.</p></div>
          <div class="timeline-row"><strong>Config</strong><p>Modelo, razonamiento, sandbox, permisos, MCP, perfiles y preferencias.</p></div>
          <div class="timeline-row"><strong>Skills</strong><p>Metodos repetibles: triage, release notes, migraciones, reviews.</p></div>
          <div class="timeline-row"><strong>MCP</strong><p>Herramientas y datos externos actualizados sin copiar y pegar.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Relacionarlo con las capas del curso fuente: prompt engineering es tactico; context engineering incluye sistema, herramientas y memoria.",
      "Insistir en que AGENTS.md corto y exacto suele ganar a una novela de reglas genericas."
    ]
  },
  {
    module: "Contexto",
    title: "Contexto duradero",
    html: `
      <section class="slide two-col" data-number="12">
        <div>
          <p class="kicker">No repitas lo mismo cada vez</p>
          <h2>AGENTS.md como memoria operativa del repo</h2>
          <p class="lead">Codex carga instrucciones del proyecto y las usa para construir, probar, revisar y respetar convenciones.</p>
        </div>
        <div class="terminal">
          <span class="muted"># AGENTS.md</span><br />
          - Layout del repo y carpetas criticas<br />
          - Comandos de build, test y lint<br />
          - Estilo, arquitectura y limites<br />
          - Politicas de seguridad y datos<br />
          - Que significa "done"<br /><br />
          <span class="prompt">codex</span> /init
        </div>
      </section>
    `,
    notes: [
      "Contar el patron: cuando Codex cometa el mismo error dos veces, convertir la correccion en regla del repo.",
      "No meter precios, credenciales ni secretos en AGENTS.md. Es contexto, no almacen de informacion sensible."
    ]
  },
  {
    module: "Contexto",
    title: "Contexto externo",
    html: `
      <section class="slide two-col" data-number="13">
        <div>
          <p class="kicker">MCP y conectores</p>
          <h2>Cuando el dato vive fuera del repo</h2>
          <p class="lead">Issues, PRs, calendarios, docs, tickets, logs y APIs cambian. Mejor conectar herramientas que pegar pantallazos.</p>
        </div>
        <div class="matrix">
          <div class="tile"><strong>Bueno para</strong><p>Contexto vivo, repetible, auditable y consultable por herramienta.</p></div>
          <div class="tile"><strong>Malo para</strong><p>Copiar datos sensibles sin criterio o abrir acceso a todo por comodidad.</p></div>
          <div class="tile"><strong>Regla</strong><p>Instala pocos MCP al principio: solo los que quitan un bucle manual real.</p></div>
          <div class="tile"><strong>Control</strong><p>Revisa permisos, scopes, aprobaciones y acciones destructivas.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Ejemplo: para arreglar un bug reportado en Linear/Jira/GitHub, el ticket y el PR son contexto externo. Un MCP evita pegar texto viejo.",
      "Hacer una pausa de seguridad: conectar herramientas amplifica capacidad, pero tambien responsabilidad."
    ]
  },
  {
    module: "Contexto",
    title: "Diagramas como codigo",
    html: `
      <section class="slide two-col wide-left" data-number="14">
        <div>
          <p class="kicker">DaaC</p>
          <h2>Si puede versionarse, Codex puede razonar mejor sobre ello</h2>
          <p class="lead">Arquitectura, flujos y decisiones escritas en Markdown, Mermaid, PlantUML o codigo son mas utiles que imagenes sueltas.</p>
        </div>
        <div class="terminal">
          <span class="muted">&#96;&#96;&#96;mermaid</span><br />
          graph LR<br />
          &nbsp;&nbsp;UI --&gt; API<br />
          &nbsp;&nbsp;API --&gt; DB<br />
          &nbsp;&nbsp;API --&gt; Queue<br />
          <span class="muted">&#96;&#96;&#96;</span><br /><br />
          <span class="prompt">Pide:</span> "Actualiza el diagrama al introducir cache regional."
        </div>
      </section>
    `,
    notes: [
      "Recupera el tema DaaC del curso original. Para Codex es especialmente practico porque trabaja muy bien con texto versionado.",
      "Matiz: las imagenes tambien pueden ser contexto si el modelo las soporta, pero para mantenimiento tecnico suele ganar el formato textual."
    ]
  },
  {
    module: "Workflow",
    title: "Modulo 2",
    html: `
      <section class="slide section-slide" data-number="15">
        <div class="section-number">02</div>
        <div>
          <p class="kicker">Desarrollo asistido por IA</p>
          <h2>De pedir ayuda a dirigir una tarea completa</h2>
          <p class="lead">Codex encaja en analisis, implementacion, pruebas, revision, documentacion, refactor y mantenimiento.</p>
        </div>
      </section>
    `,
    notes: [
      "Este bloque resume el segundo curso: desarrollo asistido por IA y nuevo enfoque para desarrolladores.",
      "La palabra clave aqui es workflow: no una pregunta aislada, sino una cadena de trabajo verificable."
    ]
  },
  {
    module: "Workflow",
    title: "IA en todo el ciclo",
    html: `
      <section class="slide" data-number="16">
        <div>
          <p class="kicker">SDLC aumentado</p>
          <h2>Codex puede ayudar antes y despues del codigo</h2>
        </div>
        <div class="timeline">
          <div class="timeline-row"><strong>Analisis</strong><p>Entender repo, extraer arquitectura, localizar riesgos y preparar plan.</p></div>
          <div class="timeline-row"><strong>Implementacion</strong><p>Crear cambios acotados, adaptar patrones existentes y mantener consistencia.</p></div>
          <div class="timeline-row"><strong>Pruebas</strong><p>Reproducir errores, escribir tests, ejecutar suites, explicar fallos.</p></div>
          <div class="timeline-row"><strong>Revision</strong><p>Inspeccionar diffs, buscar regresiones, edge cases y deuda accidental.</p></div>
          <div class="timeline-row"><strong>Operacion</strong><p>Logs, CI, release notes, migraciones, incidentes y mantenimiento recurrente.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Evitar centrar toda la conversacion en generar codigo. Muchas veces el mayor valor es entender, probar y revisar.",
      "Pedir ejemplos de tareas reales del equipo y clasificarlas en estas cinco fases."
    ]
  },
  {
    module: "Workflow",
    title: "Canvas de tarea",
    html: `
      <section class="slide two-col" data-number="17">
        <div>
          <p class="kicker">Prompt para usuarios con criterio</p>
          <h2>Cuatro piezas que reducen ruido</h2>
          <p class="lead">No hace falta escribir literatura. Hace falta que Codex sepa que cambiar, con que limites y como demostrar que termino.</p>
        </div>
        <div class="matrix">
          <div class="tile"><strong>Objetivo</strong><p>Que quieres construir, corregir, explicar o validar.</p></div>
          <div class="tile"><strong>Contexto</strong><p>Archivos, errores, docs, decisiones, ejemplos y rama base.</p></div>
          <div class="tile"><strong>Restricciones</strong><p>Sin refactors, sin dependencias, estilo, seguridad, compatibilidad.</p></div>
          <div class="tile"><strong>Done when</strong><p>Tests, build, comportamiento esperado, evidencia y resumen final.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Este canvas sale directamente de best practices oficiales: goal, context, constraints, done when.",
      "Ejercicio de 3 minutos: que cada persona reescriba una peticion vaga en este formato."
    ]
  },
  {
    module: "Workflow",
    title: "Ejemplo de prompt operativo",
    html: `
      <section class="slide two-col wide-left" data-number="18">
        <div>
          <p class="kicker">Menos poesia, mas contrato</p>
          <h2>Prompt que permite verificar</h2>
          <p class="lead">La diferencia no esta en sonar educado, sino en dejar claro el alcance y la prueba.</p>
        </div>
        <div class="terminal">
          Arregla el bug del login que falla al refrescar token.<br /><br />
          Contexto:<br />
          - Error: "invalid refresh grant" en auth.log<br />
          - Mira src/auth/* y tests/auth/*<br />
          - No cambies el proveedor OAuth<br /><br />
          Done when:<br />
          - Reproduce el fallo o explica por que no puedes<br />
          - Implementa el minimo cambio<br />
          - Ejecuta tests relevantes<br />
          - Resume riesgos y ficheros tocados
        </div>
      </section>
    `,
    notes: [
      "Contrastar con un prompt pobre: 'arregla el login'.",
      "Subrayar que el prompt pide reproducir y ejecutar pruebas. Eso convierte a Codex en agente verificable."
    ]
  },
  {
    module: "Workflow",
    title: "Plan mode",
    html: `
      <section class="slide two-col" data-number="19">
        <div>
          <p class="kicker">Ambiguedad controlada</p>
          <h2>Cuando no sabes pedirlo, pide que te entreviste</h2>
          <p class="lead">Para tareas grandes, usa planificacion antes de escribir codigo. Codex puede explorar, preguntar y convertir una idea borrosa en trabajo ejecutable.</p>
        </div>
        <div class="flow">
          <div class="flow-step"><b>A</b><p>Explora repo, dependencias, restricciones y riesgos.</p></div>
          <div class="flow-step"><b>B</b><p>Propone alcance, pasos y criterios de aceptacion.</p></div>
          <div class="flow-step"><b>C</b><p>Tu ajustas prioridades antes de que toque codigo.</p></div>
          <div class="flow-step"><b>D</b><p>Se implementa con una ruta acordada.</p></div>
        </div>
      </section>
    `,
    notes: [
      "En CLI, recordar /plan; en app/IDE, existe modo de planificacion segun superficie.",
      "Buen uso: migraciones, refactors, integraciones, bugs sin repro claro. Mal uso: microcambios obvios donde planificar cuesta mas que editar."
    ]
  },
  {
    module: "Workflow",
    title: "Modelos y razonamiento",
    html: `
      <section class="slide two-col wide-left" data-number="20">
        <div>
          <p class="kicker">Eleccion consciente</p>
          <h2>No todas las tareas merecen el mismo motor</h2>
          <p class="lead">La documentacion actual recomienda modelos GPT-5 recientes para Codex; GPT-5.5 es frontier para trabajo complejo y GPT-5.3-Codex aparece en tareas Cloud y review.</p>
        </div>
        <div class="model-table">
          <div class="head"><span>Uso</span><span>Modelo orientativo</span><span>Esfuerzo</span></div>
          <div><span>Edicion acotada</span><span>GPT-5.4-mini / modelo rapido disponible</span><span>low</span></div>
          <div><span>Feature con contexto</span><span>GPT-5.4 / GPT-5.5</span><span>medium-high</span></div>
          <div><span>Debug dificil</span><span>GPT-5.5</span><span>high-xhigh</span></div>
          <div><span>Cloud / review</span><span>GPT-5.3-Codex segun pricing docs</span><span>gestionado</span></div>
        </div>
      </section>
    `,
    notes: [
      "No convertir esta tabla en politica rigida: disponibilidad y precios pueden variar por plan y fecha.",
      "Regla didactica: subir modelo y reasoning cuando la incertidumbre, el coste de error o la necesidad de exploracion suben."
    ]
  },
  {
    module: "Workflow",
    title: "Conciencia de coste",
    html: `
      <section class="slide two-col" data-number="21">
        <div>
          <p class="kicker">Tokens, creditos y velocidad</p>
          <h2>Lo caro suele ser contexto gigante + salida larga</h2>
          <p class="lead">En planes con pricing por tokens, el consumo depende de input, cached input y output. Fast mode consume creditos a mayor ritmo.</p>
        </div>
        <div class="image-stack">
          <figure class="image-card meme-card">
            <img src="${localImages.contextBuffet}" alt="Robot cargando demasiados bloques de contexto mientras un desarrollador selecciona solo las piezas utiles" />
            <figcaption>Buffet de contexto: que quepa en el plato no significa que ayude a decidir.</figcaption>
          </figure>
          <div class="reflection-strip compact">
            <span>Filtra logs</span>
            <span>Compacta hilos</span>
            <span>Pide salida corta</span>
          </div>
        </div>
      </section>
    `,
    notes: [
      "Decirlo claro: el output puede ser caro, especialmente si pedimos explicaciones extensas, tablas grandes o codigo innecesario.",
      "Remate de la imagen: el buffet de contexto parece generoso, pero el plato pequeño y bien elegido suele resolver antes.",
      "Buena pauta: pedir primero diagnostico breve, luego implementacion; o pedir que localice ficheros antes de cargar toneladas de contexto.",
      "Recordar que precios exactos cambian por plan; para compras o presupuesto, mirar siempre pricing oficial."
    ]
  },
  {
    module: "Workflow",
    title: "Bucle de calidad",
    html: `
      <section class="slide two-col wide-left" data-number="22">
        <div>
          <p class="kicker">No aceptes magia sin evidencia</p>
          <h2>Generar codigo es la mitad del trabajo</h2>
          <p class="lead">La calidad aparece cuando Codex prueba, revisa y explica el riesgo residual antes de cerrar.</p>
        </div>
        <div class="flow">
          <div class="flow-step"><b>R</b><p>Reproducir fallo o declarar que no se pudo reproducir.</p></div>
          <div class="flow-step"><b>F</b><p>Fix minimo, ajustado a patrones existentes.</p></div>
          <div class="flow-step"><b>T</b><p>Tests, build, lint, typecheck o validacion manual documentada.</p></div>
          <div class="flow-step"><b>D</b><p>Diff review: bug, regresion, edge case, seguridad.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Esto replica las buenas practicas de desarrollo asistido: el humano no solo mira la respuesta, mira la evidencia.",
      "Pedir a Codex que incluya comandos ejecutados y resultado resumido, no logs interminables."
    ]
  },
  {
    module: "Operativa",
    title: "Modulo 3",
    html: `
      <section class="slide section-slide duck-section" data-number="23">
        <div class="section-number">03</div>
        <div>
          <p class="kicker">Asistente de codigo con IA</p>
          <h2>El patito de goma ahora puede abrir un PR</h2>
          <p class="lead">La ayuda sube de nivel, y por eso tambien suben dependencia, riesgos, permisos y responsabilidad de revision.</p>
        </div>
        <figure class="image-card playful-card">
          <img src="${localImages.duckReview}" alt="Patito de goma revisando un diff en una pantalla de desarrollo" />
        </figure>
      </section>
    `,
    notes: [
      "Este bloque condensa el tercer curso: asistentes de codigo, dependencia, industria y rol del desarrollador.",
      "La imagen mete humor sin bajar el nivel: el patito ya no solo escucha, ahora mira un diff; por eso hay que hablar de permisos, pruebas y supervision.",
      "El tono puede ser un poco mas provocador: si el asistente actua, necesitamos mejores barandillas."
    ]
  },
  {
    module: "Operativa",
    title: "Rubber duck aumentado",
    html: `
      <section class="slide two-col" data-number="24">
        <div>
          <p class="kicker">De oyente pasivo a par activo</p>
          <h2>Codex no solo escucha tu problema</h2>
          <p class="lead">Puede localizar codigo, formular hipotesis, ejecutar pruebas y proponer cambios. El valor humano esta en orientar y decidir.</p>
        </div>
        <div class="matrix">
          <div class="tile"><strong>Escucha</strong><p>Explana codigo, errores y arquitectura.</p></div>
          <div class="tile"><strong>Pregunta</strong><p>Detecta ambiguedades y dependencias.</p></div>
          <div class="tile"><strong>Actua</strong><p>Edita, ejecuta, compara y reintenta.</p></div>
          <div class="tile"><strong>Justifica</strong><p>Deja evidencia y riesgos para revision.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Usar la analogia del patito de goma del material original, pero elevarla: Codex cambia el equilibrio porque puede tocar el sistema.",
      "Pregunta al grupo: que no dejariais hacer nunca a un agente sin aprobacion?"
    ]
  },
  {
    module: "Operativa",
    title: "Permisos y sandbox",
    html: `
      <section class="slide two-col wide-left" data-number="25">
        <div>
          <p class="kicker">Seguridad operativa</p>
          <h2>Capacidad sin limites no es productividad</h2>
          <p class="lead">Codex combina sandbox mode y approval policy: que puede hacer tecnicamente y cuando debe pedir permiso.</p>
        </div>
        <div class="image-stack">
          <figure class="image-card reflection-card">
            <img src="${localImages.sandboxKeys}" alt="Desarrollador eligiendo llaves de permisos mientras Codex espera dentro de un sandbox de vidrio" />
            <figcaption>La llave correcta no frena a Codex: evita que la tarea acabe abriendo puertas que no tocaban.</figcaption>
          </figure>
          <div class="reflection-strip compact">
            <span>Read only para explorar</span>
            <span>Write para ejecutar</span>
            <span>Red solo con criterio</span>
          </div>
        </div>
      </section>
    `,
    notes: [
      "Segun docs, en Auto puede leer, editar y ejecutar comandos en el workspace; para fuera del workspace o red pide aprobacion.",
      "Remate de la imagen: dar llaves no es confiar mas; es escoger que puertas necesita la tarea y cuales deben seguir cerradas.",
      "Consejo: empezar con permisos por defecto y abrir solo lo necesario. Esto evita sustos y tambien reduce trabajo irrelevante."
    ]
  },
  {
    module: "Operativa",
    title: "Dependencia excesiva",
    html: `
      <section class="slide two-col" data-number="26">
        <div>
          <p class="kicker">El problema del GPS</p>
          <h2>La ayuda que no revisas te desentrena</h2>
          <p class="lead">Cuanto mas delegas, mas importante es mantener criterio: leer diffs, entender arquitectura, probar supuestos y detectar alucinaciones.</p>
        </div>
        <div class="image-stack">
          <figure class="image-card meme-card">
            <img src="${localImages.aiGps}" alt="Desarrollador siguiendo una ruta sugerida por Codex mientras revisa mapa de tests y diffs" />
            <figcaption>Codex puede darte la ruta, pero el carnet tecnico sigue siendo tuyo.</figcaption>
          </figure>
          <div class="reflection-strip compact">
            <span>Lee el diff</span>
            <span>Reproduce el fallo</span>
            <span>Explica el fix</span>
          </div>
        </div>
      </section>
    `,
    notes: [
      "Esta slide viene directamente del concepto de dependencia del curso de asistentes.",
      "Remate de la imagen: un GPS ahorra vueltas, pero si no miras la carretera acabas sin saber explicar por donde has llegado.",
      "No demonizar la herramienta: la solucion no es usar menos IA, sino usarla con rituales de verificacion."
    ]
  },
  {
    module: "Operativa",
    title: "Nuevo rol del desarrollador",
    html: `
      <section class="slide two-col wide-left" data-number="27">
        <div>
          <p class="kicker">Writer → editor → integrator</p>
          <h2>Subir en la cadena de valor</h2>
          <p class="lead">El valor se desplaza hacia decisiones tecnicas, arquitectura, producto, supervision, integracion y mejora del sistema de trabajo.</p>
        </div>
        <div class="timeline">
          <div class="timeline-row"><strong>Crafter</strong><p>Cuida detalle tecnico, legibilidad, performance y mantenibilidad.</p></div>
          <div class="timeline-row"><strong>Speeder</strong><p>Acelera loops, automatiza tareas y usa agentes para llegar antes a evidencia.</p></div>
          <div class="timeline-row"><strong>Integrator</strong><p>Conecta herramientas, contexto, personas y sistemas para que Codex trabaje mejor.</p></div>
          <div class="timeline-row"><strong>Reviewer</strong><p>Decide que entra en produccion y que debe volver al taller.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Recupera Crafters vs Speeders, pero evita presentarlo como bandos. El profesional fuerte combina ambos.",
      "Idea practica: el senior del futuro diseña el contexto de trabajo tanto como diseña codigo."
    ]
  },
  {
    module: "Operativa",
    title: "Cultura de documentacion",
    html: `
      <section class="slide two-col" data-number="28">
        <div>
          <p class="kicker">Higiene del repo</p>
          <h2>Codex amplifica la calidad de tus senales</h2>
          <p class="lead">Naming, tests, docs, errores reproducibles y arquitectura escrita son aceleradores directos para el agente.</p>
        </div>
        <div class="matrix">
          <div class="tile"><strong>Naming</strong><p>Variables, funciones y dominios expresivos reducen inferencia.</p></div>
          <div class="tile"><strong>Tests</strong><p>Permiten validar sin depender de intuicion.</p></div>
          <div class="tile"><strong>Docs vivas</strong><p>AGENTS.md, ADRs, runbooks, diagramas como codigo.</p></div>
          <div class="tile"><strong>Logs utiles</strong><p>Errores con contexto, no ruido masivo.</p></div>
        </div>
      </section>
    `,
    notes: [
      "El curso original hablaba de cultura de documentacion como game changer; con Codex lo es aun mas.",
      "La IA no corrige milagrosamente un repo opaco: puede ayudar a sanearlo, pero necesita senales."
    ]
  },
  {
    module: "Operativa",
    title: "Riesgos generales",
    html: `
      <section class="slide two-col wide-left" data-number="29">
        <div>
          <p class="kicker">No todo es productividad</p>
          <h2>Riesgos que deben estar en la conversacion</h2>
          <p class="lead">Seguridad, privacidad, propiedad intelectual, compliance, coste y transparencia no son notas al pie.</p>
        </div>
        <div class="matrix">
          <div class="tile"><strong>Datos</strong><p>Evitar secretos, credenciales, PII y codigo no autorizado en prompts o conectores.</p></div>
          <div class="tile"><strong>IP</strong><p>Respetar politicas internas y licencias de dependencias.</p></div>
          <div class="tile"><strong>Calidad</strong><p>No confundir respuesta plausible con implementacion correcta.</p></div>
          <div class="tile"><strong>Coste</strong><p>Monitorizar creditos, modelos, fast mode y contexto acumulado.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Conectar con las slides de inconvenientes del desarrollo con IA.",
      "Si la empresa tiene politica interna, este es el momento para insertarla en notas o como apendice."
    ]
  },
  {
    module: "Practica",
    title: "Antipatrones",
    html: `
      <section class="slide two-col" data-number="30">
        <div>
          <p class="kicker">Checklist de supervivencia</p>
          <h2>Errores caros y evitables</h2>
          <p class="lead">La mayoria de malos resultados nacen de alcance difuso, permisos excesivos, contexto sucio o falta de validacion.</p>
        </div>
        <div class="split-list">
          <div class="tile"><strong>No hagas</strong><p>"Arregla todo", pegar 20.000 lineas de log, pedir refactors sin tests, aceptar diff sin leer, usar hilos eternos.</p></div>
          <div class="tile"><strong>Haz</strong><p>Divide tareas, menciona archivos, pide plan cuando haya ambiguedad, usa checkpoints, ejecuta checks y compacta.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Esta slide funciona bien como debate: pedir a la audiencia que anada sus propios antipatrones.",
      "Relacionar con coste: los antipatrones gastan tokens y horas humanas."
    ]
  },
  {
    module: "Practica",
    title: "Laboratorios sugeridos",
    html: `
      <section class="slide" data-number="31">
        <div>
          <p class="kicker">Practica guiada</p>
          <h2>Tres ejercicios para aterrizar Codex</h2>
        </div>
        <div class="matrix three">
          <div class="tile"><strong>Lab 1 · Onboarding</strong><p>"Explicame este repo, rutas criticas, comandos y riesgos. No edites nada."</p></div>
          <div class="tile"><strong>Lab 2 · Bug minimo</strong><p>Dar un error real, pedir repro, fix minimo, test y resumen de evidencia.</p></div>
          <div class="tile"><strong>Lab 3 · Review</strong><p>Pedir revision del diff o rama: bugs, edge cases, seguridad y falta de tests.</p></div>
          <div class="tile"><strong>Bonus · AGENTS.md</strong><p>Generar borrador con /init y editarlo con convenciones reales.</p></div>
          <div class="tile"><strong>Bonus · MCP</strong><p>Conectar una fuente externa que quite un bucle manual frecuente.</p></div>
          <div class="tile"><strong>Bonus · Coste</strong><p>Comparar el mismo trabajo con distinto modelo, esfuerzo y formato de salida.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Si hay tiempo, hacer Lab 1 en directo con un repo cualquiera. Es seguro porque no edita.",
      "Para Lab 2, elegir un bug pequeno y reproducible. El aprendizaje esta en el bucle repro-fix-test, no en el bug.",
      "Para coste, mostrar /status antes y despues de una tarea larga.",
      "La siguiente pantalla enlaza material real para impartir estos labs sin tener que inventar ejemplos en directo."
    ]
  },
  {
    module: "Practica",
    title: "Kit real de practica",
    html: `
      <section class="slide two-col resource-slide" data-number="32">
        <div>
          <p class="kicker">Archivos conectados</p>
          <h2>Material para usar en clase</h2>
          <p class="lead">Prompts, plantillas, labs y un mini proyecto con tests para que Codex trabaje con evidencia.</p>
          <p class="small">La idea es que cada concepto termine en un archivo reutilizable: prompt, AGENTS.md, rubrica, inventario MCP o ejemplo ejecutable.</p>
        </div>
        <div class="resource-grid">
          <a class="file-card featured" href="materiales/prompts-codex.md" target="_blank" rel="noreferrer"><span>Prompts</span><strong>prompts-codex.md</strong><p>Onboarding, bugfix, review, coste y cierre de sesion.</p></a>
          <a class="file-card" href="materiales/plantillas/AGENTS.example.md" target="_blank" rel="noreferrer"><span>Plantilla</span><strong>AGENTS.example.md</strong><p>Memoria operativa corta para repos reales.</p></a>
          <a class="file-card" href="materiales/labs/lab-01-onboarding.md" target="_blank" rel="noreferrer"><span>Lab 01</span><strong>onboarding repo</strong><p>Entender sin editar: mapa, comandos, riesgos.</p></a>
          <a class="file-card" href="materiales/labs/lab-02-bug-login.md" target="_blank" rel="noreferrer"><span>Lab 02</span><strong>bug login</strong><p>Repro, fix minimo, tests y resumen de evidencia.</p></a>
          <a class="file-card" href="materiales/ejemplo-login/README.md" target="_blank" rel="noreferrer"><span>Codigo</span><strong>ejemplo-login/</strong><p>Mini proyecto Node con fallo intencional y tests.</p></a>
          <a class="file-card" href="materiales/plantillas/coste-sesion.csv" target="_blank" rel="noreferrer"><span>Coste</span><strong>coste-sesion.csv</strong><p>Registro simple para comparar contexto, modelo y resultado.</p></a>
        </div>
      </section>
    `,
    notes: [
      "Esta pantalla cambia el curso de conceptual a accionable: cada asistente puede abrir un archivo y probar.",
      "Para impartirlo, no leas todos los materiales. Elige uno: prompts para demo rapida, ejemplo-login para practica tecnica, AGENTS.md para cierre de adopcion.",
      "Explica que estos archivos tambien son un patron: cuando un equipo repite una forma de pedir trabajo, debe convertirla en plantilla o AGENTS.md."
    ]
  },
  {
    module: "Practica",
    title: "Cierre operativo",
    html: `
      <section class="slide two-col wide-left" data-number="33">
        <div>
          <p class="kicker">Chuleta de uso</p>
          <h2>Una rutina corta para trabajar mejor con Codex</h2>
          <p class="lead">Antes de delegar: acota. Durante: observa evidencia. Despues: revisa y mejora el contexto duradero.</p>
        </div>
        <div class="flow">
          <div class="flow-step"><b>1</b><p>Elige superficie, modelo y permisos segun riesgo.</p></div>
          <div class="flow-step"><b>2</b><p>Prompt con objetivo, contexto, restricciones y done when.</p></div>
          <div class="flow-step"><b>3</b><p>Pide plan si hay ambiguedad o coste de error alto.</p></div>
          <div class="flow-step"><b>4</b><p>Exige pruebas, diff review, riesgos y resumen breve.</p></div>
          <div class="flow-step"><b>5</b><p>Actualiza AGENTS.md, skill o automatizacion si el patron se repite.</p></div>
        </div>
      </section>
    `,
    notes: [
      "Cerrar con una frase: Codex no sustituye el criterio, lo multiplica cuando lo convertimos en instrucciones, tests y contexto.",
      "Pedir al grupo que elija una rutina que va a probar esta semana: /review, AGENTS.md, plan mode o control de /status."
    ]
  },
  {
    module: "Practica",
    title: "Fuentes oficiales",
    html: `
      <section class="slide two-col" data-number="34">
        <div>
          <p class="kicker">Consultado el 06/05/2026</p>
          <h2>Fuentes usadas para la capa Codex</h2>
          <p class="lead">La plataforma cambia deprisa. Para modelos, pricing y comandos, revisar documentacion oficial antes de impartir.</p>
        </div>
        <div class="source-list">
          <a href="https://developers.openai.com/codex/overview">Codex overview</a>
          <a href="https://developers.openai.com/codex/quickstart">Codex quickstart</a>
          <a href="https://developers.openai.com/codex/learn/best-practices">Codex best practices</a>
          <a href="https://developers.openai.com/codex/cli/slash-commands">Codex CLI slash commands</a>
          <a href="https://developers.openai.com/codex/pricing">Codex pricing</a>
          <a href="https://developers.openai.com/api/docs/models/gpt-5.5">GPT-5.5 model page</a>
        </div>
      </section>
    `,
    notes: [
      "Usar esta slide como disclaimer saludable: el curso tiene contenido estable, pero modelos y precios son informacion viva.",
      "Antes de impartirlo en otra fecha, actualizar esta slide y especialmente la de coste/modelos."
    ]
  }
];

let current = 0;
let motionDirection = "next";
let hasRenderedSlide = false;
let slideMotionTimer = 0;

const appShell = document.querySelector(".app-shell");
const slideFrame = document.getElementById("slideFrame");
const slideMap = document.getElementById("slideMap");
const speakerNotes = document.getElementById("speakerNotes");
const progressFill = document.getElementById("progressFill");
const slideCounter = document.getElementById("slideCounter");
const moduleTabs = document.getElementById("moduleTabs");
const mapToggle = document.getElementById("mapToggle");
const notesToggle = document.getElementById("notesToggle");
const fullscreenToggle = document.getElementById("fullscreenToggle");

function renderModuleTabs() {
  moduleTabs.innerHTML = modules
    .map((module) => `<button type="button" data-module="${module}">${module}</button>`)
    .join("");

  moduleTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-module]");
    if (!button) return;
    const index = slides.findIndex((slide) => slide.module === button.dataset.module);
    if (index >= 0) goTo(index);
  });
}

function renderMap() {
  slideMap.innerHTML = `
    <h2>Mapa</h2>
    <ol>
      ${slides
        .map(
          (slide, index) => `
            <li>
              <button type="button" data-slide="${index}">
                <span class="map-index">${String(index + 1).padStart(2, "0")} · ${slide.module}</span>
                <span class="map-title">${slide.title}</span>
              </button>
            </li>
          `
        )
        .join("")}
    </ol>
  `;

  slideMap.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-slide]");
    if (!button) return;
    goTo(Number(button.dataset.slide));
  });
}

function renderSlide() {
  const slide = slides[current];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  slideFrame.classList.remove("is-transitioning", "motion-next", "motion-prev");
  slideFrame.innerHTML = slide.html;

  if (hasRenderedSlide && !prefersReducedMotion) {
    window.clearTimeout(slideMotionTimer);
    slideFrame.classList.add(
      "is-transitioning",
      motionDirection === "prev" ? "motion-prev" : "motion-next"
    );
    slideMotionTimer = window.setTimeout(() => {
      slideFrame.classList.remove("is-transitioning", "motion-next", "motion-prev");
    }, 560);
  }

  hasRenderedSlide = true;

  speakerNotes.innerHTML = `
    <article>
      <h2>Notas del creador</h2>
      <h3>${String(current + 1).padStart(2, "0")} · ${slide.title}</h3>
      <ul>${slide.notes.map((note) => `<li>${note}</li>`).join("")}</ul>
    </article>
  `;

  progressFill.style.width = `${((current + 1) / slides.length) * 100}%`;
  slideCounter.textContent = `${current + 1} / ${slides.length}`;

  document.querySelectorAll("[data-slide]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.slide) === current);
  });
  document.querySelectorAll("[data-module]").forEach((button) => {
    button.classList.toggle("active", button.dataset.module === slide.module);
  });

  document.title = `${String(current + 1).padStart(2, "0")} · ${slide.title} | Curso Codex`;
  history.replaceState(null, "", `#${current + 1}`);
}

function goTo(index) {
  const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
  if (nextIndex === current) return;
  motionDirection = nextIndex < current ? "prev" : "next";
  current = nextIndex;
  renderSlide();
}

function next() {
  goTo(current + 1);
}

function prev() {
  goTo(current - 1);
}

document.getElementById("nextSlide").addEventListener("click", next);
document.getElementById("prevSlide").addEventListener("click", prev);

function syncPanelButtons() {
  mapToggle.setAttribute("aria-expanded", String(!appShell.classList.contains("is-map-hidden")));
  notesToggle.setAttribute("aria-expanded", String(!appShell.classList.contains("is-notes-hidden")));
}

mapToggle.addEventListener("click", () => {
  appShell.classList.toggle("is-map-hidden");
  syncPanelButtons();
});

notesToggle.addEventListener("click", () => {
  appShell.classList.toggle("is-notes-hidden");
  syncPanelButtons();
});

function syncFullscreenState() {
  const isFullscreen = Boolean(document.fullscreenElement);
  appShell.classList.toggle("is-fullscreen", isFullscreen);
  fullscreenToggle.classList.toggle("active", isFullscreen);
  fullscreenToggle.title = isFullscreen ? "Salir de pantalla completa (F5)" : "Pantalla completa (F5)";
  fullscreenToggle.setAttribute(
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

fullscreenToggle.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", syncFullscreenState);

window.addEventListener("keydown", (event) => {
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
  if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
    return;
  }
  if (event.key === "End") {
    event.preventDefault();
    goTo(slides.length - 1);
    return;
  }
  if (event.key.toLowerCase() === "n") {
    appShell.classList.toggle("is-notes-hidden");
    syncPanelButtons();
  }
  if (event.key.toLowerCase() === "m") {
    appShell.classList.toggle("is-map-hidden");
    syncPanelButtons();
  }
});

function initFromHash() {
  const value = Number(location.hash.replace("#", ""));
  if (Number.isFinite(value) && value > 0) current = Math.min(value - 1, slides.length - 1);
}

renderModuleTabs();
renderMap();
initFromHash();
syncPanelButtons();
syncFullscreenState();
renderSlide();
