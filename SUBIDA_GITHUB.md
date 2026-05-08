# Guia de subida

## Carpeta que se sube

Subir esta carpeta completa como raiz del repositorio:

```text
AI_PRACTICE_HUB_UPLOAD_V4
```

No subir aparte:

- `node_modules`
- `.next`
- `.tmp`
- logs
- carpetas originales externas de cursos Codex

Todo lo necesario para que el hub funcione esta dentro de esta carpeta.

## Que contiene lo importante

```text
app/                         Rutas Next.js
components/                  UI del hub, player y widgets
lib/                         Schemas, loaders y generador de video
scripts/                     Build videos, QA decks, QA player, smoke, visual QA
public/content/              Catalogos de cursos, ejercicios, workshops y operaciones
public/decks/                Los 9 cursos HTML integrados
public/courses/              Videos CourseScript ya generados
public/video-blueprints/     JSON editable de videos largos
public/exercise-packs/       Packs descargables por ejercicio
public/workshop-packs/       Packs instructor de workshops
docs/auditorias/             Auditorias y planes de la plataforma
```

## Commit inicial recomendado

```text
feat: initial AI Practice Hub platform
```

Descripcion sugerida:

```text
Initial release of AI Practice Hub with Codex, Copilot and Claude tracks, integrated decks, CourseScript videos, exercise packs, workshop packs, learner progress, feedback widgets, release ops and automated QA scripts.
```

## Comandos para crear repo local

PowerShell:

```powershell
cd "C:\Users\abaratas\Desktop\CARPETA PROYECTOS\Formaciones Copilot\21 abril\AI_PRACTICE_HUB_UPLOAD_V4"
git init
git add .
git status
git commit -m "feat: initial AI Practice Hub platform"
```

## Subir a GitHub con repo ya creado

Sustituye la URL por la del repo real:

```powershell
git branch -M main
git remote add origin https://github.com/ORGANIZACION/ai-practice-hub.git
git push -u origin main
```

## Subir a GitHub usando GitHub CLI

Si tienes `gh` autenticado:

```powershell
gh repo create ORGANIZACION/ai-practice-hub --private --source . --remote origin --push
```

Para repo publico:

```powershell
gh repo create ORGANIZACION/ai-practice-hub --public --source . --remote origin --push
```

## Comandos de comprobacion tras clonar

```powershell
corepack enable
corepack pnpm install
corepack pnpm build:videos
corepack pnpm qa:decks
corepack pnpm qa:player
corepack pnpm exec tsc --noEmit
corepack pnpm lint
corepack pnpm build
corepack pnpm dev --port 3001
```

En otra terminal, con el servidor levantado:

```powershell
corepack pnpm release:smoke
corepack pnpm qa:visual
```

## Nota sobre Vercel

Para desplegar:

```powershell
corepack pnpm install
corepack pnpm build
```

Framework: Next.js.  
Build command: `corepack pnpm build`.  
Install command: `corepack pnpm install`.  
No necesita variables de entorno para funcionar en modo demo.

