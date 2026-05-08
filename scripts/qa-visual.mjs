import { spawn } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const root = process.cwd()
const baseUrl = (process.env.BASE_URL ?? 'http://localhost:3001').replace(/\/$/, '')
const releaseOpsPath = path.join(root, 'public', 'content', 'operations', 'release-ops.json')
const screenshotDir = path.join(root, 'public', 'release-ops', 'qa', 'screenshots')
const reportPath = path.join(root, 'public', 'release-ops', 'qa', 'latest-visual-qa.json')

const viewports = {
  desktop: { width: 1440, height: 900, mobile: false },
  mobile: { width: 390, height: 844, mobile: true }
}

const browserCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/microsoft-edge'
].filter(Boolean)

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    if (await exists(candidate)) return candidate
  }
  return null
}

function safeName(value) {
  return value.replace(/[^a-z0-9-]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()
}

async function waitForDevToolsPort(userDataDir, browser) {
  const portFile = path.join(userDataDir, 'DevToolsActivePort')
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (browser.exitCode !== null) {
      throw new Error(`Browser exited early with code ${browser.exitCode}`)
    }
    if (await exists(portFile)) {
      const [port] = (await fs.readFile(portFile, 'utf8')).trim().split(/\r?\n/)
      return Number(port)
    }
    await delay(100)
  }
  throw new Error('Timed out waiting for DevToolsActivePort')
}

class CdpClient {
  constructor(ws) {
    this.ws = ws
    this.nextId = 1
    this.pending = new Map()
    this.listeners = new Map()
    ws.onmessage = event => {
      const message = JSON.parse(event.data)
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id)
        this.pending.delete(message.id)
        if (message.error) reject(new Error(message.error.message))
        else resolve(message.result ?? {})
        return
      }
      const listeners = this.listeners.get(message.method)
      if (listeners) {
        for (const listener of listeners.splice(0)) listener(message.params ?? {})
      }
    }
  }

  send(method, params = {}) {
    const id = this.nextId
    this.nextId += 1
    const payload = JSON.stringify({ id, method, params })
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(payload)
    })
  }

  once(method, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeoutMs)
      const listener = params => {
        clearTimeout(timeout)
        resolve(params)
      }
      const listeners = this.listeners.get(method) ?? []
      listeners.push(listener)
      this.listeners.set(method, listeners)
    })
  }
}

async function openCdpClient(port) {
  const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then(response => response.json())
  const page = targets.find(target => target.type === 'page')
  if (!page?.webSocketDebuggerUrl) throw new Error('No page target found')

  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.onopen = resolve
    ws.onerror = reject
  })
  return new CdpClient(ws)
}

async function waitForUsefulRender(client, targetPath) {
  const isPlayer = targetPath.startsWith('/player/')
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const result = await client.send('Runtime.evaluate', {
      expression: "({ text: document.body?.innerText || '', ready: document.readyState, width: document.documentElement.scrollWidth })",
      returnByValue: true
    })
    const value = result.result?.value
    const text = value?.text ?? ''
    const hasText = text.trim().length > 40
    const stillLoading = isPlayer && text.includes('Cargando curso')
    if (value?.ready === 'complete' && hasText && !stillLoading) return value
    await delay(300)
  }
  return null
}

async function capture(browserPath, target, viewportName) {
  const viewport = viewports[viewportName]
  const fileName = `${safeName(target.id)}-${viewportName}.png`
  const output = path.join(screenshotDir, fileName)
  const url = `${baseUrl}${target.path}`
  const userDataDir = path.join(root, '.tmp', `qa-visual-${process.pid}-${safeName(target.id)}-${viewportName}`)

  await fs.mkdir(userDataDir, { recursive: true })

  const browser = spawn(browserPath, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--disable-extensions',
    '--remote-debugging-port=0',
    `--user-data-dir=${userDataDir}`,
    'about:blank'
  ], { stdio: ['ignore', 'ignore', 'pipe'] })

  const startedAt = Date.now()
  let stderr = ''
  browser.stderr.on('data', chunk => {
    stderr += chunk.toString()
  })

  try {
    const port = await waitForDevToolsPort(userDataDir, browser)
    const client = await openCdpClient(port)
    await client.send('Page.enable')
    await client.send('Runtime.enable')
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.mobile
    })
    await client.send('Emulation.setVisibleSize', {
      width: viewport.width,
      height: viewport.height
    })

    const load = client.once('Page.loadEventFired', 15000).catch(() => null)
    await client.send('Page.navigate', { url })
    await load
    await waitForUsefulRender(client, target.path)
    await delay(300)

    const screenshot = await client.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false
    })
    await fs.writeFile(output, Buffer.from(screenshot.data, 'base64'))
    await client.send('Browser.close').catch(() => null)
  } finally {
    if (browser.exitCode === null) browser.kill()
  }

  const okFile = await exists(output)
  const bytes = okFile ? (await fs.stat(output)).size : 0

  return {
    id: target.id,
    path: target.path,
    viewport: viewportName,
    width: viewport.width,
    height: viewport.height,
    output: `/release-ops/qa/screenshots/${fileName}`,
    ok: bytes > 10000,
    bytes,
    ms: Date.now() - startedAt,
    stderr: stderr.trim().slice(0, 500)
  }
}

async function main() {
  const releaseOps = JSON.parse(await fs.readFile(releaseOpsPath, 'utf8'))
  const browserPath = await findBrowser()
  await fs.mkdir(screenshotDir, { recursive: true })

  if (!browserPath) {
    const report = {
      generatedAt: new Date().toISOString(),
      status: 'skipped',
      reason: 'Chrome or Edge not found in standard locations.',
      targets: releaseOps.visualTargets
    }
    await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
    console.log('visual QA skipped: Chrome or Edge not found')
    return
  }

  const results = []
  for (const target of releaseOps.visualTargets) {
    for (const viewportName of target.viewports) {
      results.push(await capture(browserPath, target, viewportName))
    }
  }

  const failed = results.filter(result => !result.ok)
  const report = {
    baseUrl,
    browserPath,
    generatedAt: new Date().toISOString(),
    status: failed.length ? 'failed' : 'passed',
    results
  }

  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  for (const result of results) {
    const label = result.ok ? 'OK' : 'FAIL'
    console.log(`${label} ${result.viewport} ${result.path} -> ${result.output} (${result.bytes} bytes)`)
  }

  if (failed.length) {
    console.error(`visual QA failed: ${failed.length} screenshot(s) failed`)
    process.exit(1)
  }

  console.log(`visual QA passed: ${results.length} screenshots`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
