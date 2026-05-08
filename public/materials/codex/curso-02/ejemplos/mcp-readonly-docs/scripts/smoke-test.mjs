import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const server = spawn(process.execPath, [join(here, "..", "server.mjs")], { stdio: ["pipe", "pipe", "pipe"] });

let buffer = Buffer.alloc(0);
const responses = new Map();

server.stdout.on("data", (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  drain();
});

function drain() {
  while (true) {
    const headerEnd = buffer.indexOf("\r\n\r\n");
    if (headerEnd === -1) return;
    const header = buffer.subarray(0, headerEnd).toString("utf8");
    const length = Number(header.match(/Content-Length:\s*(\d+)/i)?.[1]);
    const bodyStart = headerEnd + 4;
    const bodyEnd = bodyStart + length;
    if (buffer.length < bodyEnd) return;
    const message = JSON.parse(buffer.subarray(bodyStart, bodyEnd).toString("utf8"));
    buffer = buffer.subarray(bodyEnd);
    responses.set(message.id, message);
  }
}

function send(id, method, params = {}) {
  const body = Buffer.from(JSON.stringify({ jsonrpc: "2.0", id, method, params }), "utf8");
  server.stdin.write(`Content-Length: ${body.length}\r\n\r\n`);
  server.stdin.write(body);
}

function waitFor(id) {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (responses.has(id)) {
        clearInterval(timer);
        resolve(responses.get(id));
      } else if (Date.now() - started > 2000) {
        clearInterval(timer);
        reject(new Error(`Timeout esperando respuesta ${id}`));
      }
    }, 20);
  });
}

send(1, "initialize", { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "smoke-test", version: "1.0.0" } });
const init = await waitFor(1);
assert.equal(init.result.serverInfo.name, "codex-lab-readonly-docs");

send(2, "tools/list");
const list = await waitFor(2);
assert.ok(list.result.tools.some((tool) => tool.name === "search_docs"));

send(3, "tools/call", { name: "search_docs", arguments: { query: "auth" } });
const search = await waitFor(3);
assert.match(search.result.content[0].text, /auth-runbook/);

send(4, "tools/call", { name: "read_doc", arguments: { id: "ui-qa" } });
const read = await waitFor(4);
assert.match(read.result.content[0].text, /QA visual/);

server.kill();
console.log("MCP read-only docs smoke test OK");
