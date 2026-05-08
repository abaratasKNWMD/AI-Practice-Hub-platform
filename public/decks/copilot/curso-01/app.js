(function () {
  const deck = window.COPILOT_DECK || window.COPILOT_CORE_DECK;
  const state = {
    index: 0,
    mapOpen: true,
    notesOpen: true,
  };

  const slideFrame = document.getElementById("slideFrame");
  const slideMap = document.getElementById("slideMap");
  const speakerNotes = document.getElementById("speakerNotes");
  const progressFill = document.getElementById("progressFill");
  const slideCounter = document.getElementById("slideCounter");
  const moduleTabs = document.getElementById("moduleTabs");

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function currentSlide() {
    return deck.slides[state.index];
  }

  function goTo(index) {
    state.index = Math.max(0, Math.min(deck.slides.length - 1, index));
    render();
  }

  function moduleName(id) {
    return deck.modules.find((module) => module.id === id)?.label || id;
  }

  function renderModules() {
    moduleTabs.innerHTML = deck.modules
      .map((module) => {
        const firstIndex = deck.slides.findIndex((slide) => slide.module === module.id);
        const active = currentSlide().module === module.id ? " is-active" : "";
        return `<button type="button" class="module-tab${active}" data-index="${firstIndex}">${escapeHtml(module.label)}</button>`;
      })
      .join("");
  }

  function renderMap() {
    slideMap.innerHTML = deck.slides
      .map((slide, index) => {
        const active = index === state.index ? " is-active" : "";
        return `
          <button type="button" class="map-item${active}" data-index="${index}">
            <span class="map-number">${String(index + 1).padStart(2, "0")}</span>
            <span>
              <span class="map-title">${escapeHtml(slide.title)}</span>
              <span class="map-module">${escapeHtml(moduleName(slide.module))}</span>
            </span>
          </button>
        `;
      })
      .join("");
  }

  function renderNotes() {
    const slide = currentSlide();
    const notes = slide.notes || [];
    speakerNotes.innerHTML = `
      <h2>Notas del creador</h2>
      ${notes.map((note) => `<p>${escapeHtml(note)}</p>`).join("")}
      <p class="source">Fuente: ${escapeHtml(slide.source || deck.meta.source)}</p>
    `;
  }

  function label(slide) {
    return `<span class="section-label">${escapeHtml(moduleName(slide.module))}</span>`;
  }

  function pills(items = []) {
    if (!items.length) return "";
    return `<div class="pill-row">${items.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join("")}</div>`;
  }

  function cards(items = []) {
    if (!items.length) return "";
    return `
      <div class="card-grid">
        ${items.map(([title, body]) => `
          <article class="card">
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(body)}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  function imageVisual(slide) {
    const image = slide.image;
    if (!image?.src) return "";
    return `
      <figure class="visual-image">
        <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt || slide.title)}" loading="lazy" />
        ${image.caption ? `<figcaption>${escapeHtml(image.caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  function checklist(items = []) {
    if (!items.length) return "";
    return `<ul class="list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function metrics(items = []) {
    return `
      <div class="metric-grid">
        ${items.map(([value, title, body]) => `
          <article class="metric">
            <span class="value">${escapeHtml(value)}</span>
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(body)}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  function timeline(items = []) {
    return `
      <div class="timeline">
        ${items.map((item) => `
          <article class="timeline-item">
            <div class="check-card">
              <strong>${escapeHtml(item)}</strong>
              <p>Checkpoint de aprendizaje y practica.</p>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function compare(slide) {
    return `
      <div class="compare-grid">
        <article class="compare-card warn">
          <h3>${escapeHtml(slide.leftTitle)}</h3>
          ${checklist(slide.left)}
        </article>
        <article class="compare-card good">
          <h3>${escapeHtml(slide.rightTitle)}</h3>
          ${checklist(slide.right)}
        </article>
      </div>
    `;
  }

  function vscode(slide) {
    const code = slide.code || [
      "const task = {",
      "  mode: 'Ask / Edit / Agent',",
      "  context: 'workspace + instructions',",
      "  doneWhen: 'diff reviewed + tests run'",
      "}",
    ];
    return `
      <div class="vscode">
        <div class="window-bar">
          <div class="traffic"><span></span><span></span><span></span></div>
          <span class="window-title">vscode · github.copilot.core</span>
        </div>
        <div class="code-body">
          <div class="activity"><span>AI</span><span>G</span><span>R</span><span>T</span></div>
          <pre>${code.map((line, index) => {
            const cls = index === 1 ? "ghost" : index % 3 === 0 ? "blue" : "";
            return `<span class="${cls}">${escapeHtml(line)}</span>`;
          }).join("\n")}</pre>
        </div>
      </div>
    `;
  }

  function visualFor(slide) {
    if (slide.image) return imageVisual(slide);
    if (slide.visual?.kind === "vscode" || slide.type === "vscode") return vscode(slide);
    if (slide.type === "compare") return compare(slide);
    if (slide.metrics) return metrics(slide.metrics);
    if (slide.steps) return timeline(slide.steps);
    if (slide.checklist) return checklist(slide.checklist);
    if (slide.cards) return cards(slide.cards);
    return cards([["Idea clave", slide.body || slide.subtitle || "Practica guiada para activar Copilot con criterio."]]);
  }

  function renderSlide() {
    const slide = currentSlide();
    const body = slide.body ? `<p class="body">${escapeHtml(slide.body)}</p>` : "";
    const subtitle = slide.subtitle ? `<p class="subtitle">${escapeHtml(slide.subtitle)}</p>` : "";

    if (slide.type === "hero") {
      slideFrame.innerHTML = `
        <article class="slide hero">
          <div>
            ${label(slide)}
            <h1>${escapeHtml(slide.title)}</h1>
            ${subtitle}
            ${pills(slide.pills)}
          </div>
          ${imageVisual(slide)}
        </article>
      `;
      return;
    }

    if (slide.type === "full") {
      slideFrame.innerHTML = `
        <article class="slide full">
          <div>
            ${label(slide)}
            <h2>${escapeHtml(slide.title)}</h2>
            ${body}
          </div>
          ${visualFor(slide)}
        </article>
      `;
      return;
    }

    slideFrame.innerHTML = `
      <article class="slide ${escapeHtml(slide.type || "")}">
        <div class="slide-left">
          ${label(slide)}
          <h2>${escapeHtml(slide.title)}</h2>
          ${body}
        </div>
        <div class="slide-right">
          ${visualFor(slide)}
        </div>
      </article>
    `;
  }

  function renderProgress() {
    const pct = ((state.index + 1) / deck.slides.length) * 100;
    progressFill.style.width = `${pct}%`;
    slideCounter.textContent = `${state.index + 1} / ${deck.slides.length}`;
  }

  function render() {
    renderModules();
    renderMap();
    renderNotes();
    renderSlide();
    renderProgress();
  }

  document.getElementById("prevSlide").addEventListener("click", () => goTo(state.index - 1));
  document.getElementById("nextSlide").addEventListener("click", () => goTo(state.index + 1));
  document.getElementById("mapToggle").addEventListener("click", () => {
    state.mapOpen = !state.mapOpen;
    slideMap.classList.toggle("is-collapsed", !state.mapOpen);
  });
  document.getElementById("notesToggle").addEventListener("click", () => {
    state.notesOpen = !state.notesOpen;
    speakerNotes.classList.toggle("is-collapsed", !state.notesOpen);
  });
  document.getElementById("fullscreenToggle").addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-index]");
    if (!target) return;
    goTo(Number(target.dataset.index));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      goTo(state.index + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      goTo(state.index - 1);
    }
    if (event.key === "Home") goTo(0);
    if (event.key === "End") goTo(deck.slides.length - 1);
    if (event.key === "F5") {
      event.preventDefault();
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }
  });

  render();
})();
