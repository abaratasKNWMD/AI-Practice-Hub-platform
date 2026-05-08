import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const docs = JSON.parse(readFileSync(join(here, "data", "docs.json"), "utf8"));

let buffer = Buffer.alloc(0);

function send(message) {
  const body = Buffer.from(JSON.stringify(message), "utf8");
  process.stdout.write(`Content-Length: ${body.length}\r\n\r\n`);
  process.stdout.write(body);
}

function toolResult(id, text) {
  send({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } });
}

function error(id, code, message) {
  send({ jsonrpc: "2.0", id, error: { code, message } });
}

function handle(message) {
  if (!message.id && message.method?.startsWith("notifications/")) return;

  if (message.method === "initialize") {
    send({
      jsonrpc: "2.0",
      id: message.id,
      result: {
        protocolVersion: message.params?.protocolVersion || "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "codex-lab-readonly-docs", version: "1.0.0" }
      }
    });
    return;
  }

  if (message.method === "tools/list") {
    send({
      jsonrpc: "2.0",
      id: message.id,
      result: {
        tools: [
          {
            name: "search_docs",
            description: "Busca documentos locales por texto. Read-only.",
            inputSchema: {
              type: "object",
              properties: {
                query: { type: "string" },
                limit: { type: "number", minimum: 1, maximum: 5 }
              },
              required: ["query"]
            }
          },
          {
            name: "read_doc",
            description: "Lee un documento local por id. Read-only.",
            inputSchema: {
              type: "object",
              properties: { id: { type: "string" } },
              required: ["id"]
            }
          }
        ]
      }
    });
    return;
  }

  if (message.method === "tools/call") {
    const { name, arguments: args = {} } = message.params || {};

    if (name === "search_docs") {
      const query = String(args.query || "").toLowerCase();
      const limit = Math.max(1, Math.min(5, Number(args.limit) || 3));
      const matches = docs
        .filter((doc) => `${doc.title} ${doc.body}`.toLowerCase().includes(query))
        .slice(0, limit)
        .map((doc) => `- ${doc.id}: ${doc.title}`)
        .join("\n");
      toolResult(message.id, matches || "Sin resultados.");
      return;
    }

    if (name === "read_doc") {
      const doc = docs.find((item) => item.id === args.id);
      if (!doc) {
        error(message.id, -32602, `Documento no encontrado: ${args.id}`);
        return;
      }
      toolResult(message.id, `# ${doc.title}\n\n${doc.body}`);
      return;
    }

    error(message.id, -32601, `Tool desconocida: ${name}`);
    return;
  }

  error(message.id, -32601, `Metodo no soportado: ${message.method}`);
}

function drain() {
  while (true) {
    const headerEnd = buffer.indexOf("\r\n\r\n");
    if (headerEnd === -1) return;

    const header = buffer.subarray(0, headerEnd).toString("utf8");
    const match = header.match(/Content-Length:\s*(\d+)/i);
    if (!match) {
      buffer = buffer.subarray(headerEnd + 4);
      continue;
    }

    const length = Number(match[1]);
    const bodyStart = headerEnd + 4;
    const bodyEnd = bodyStart + length;
    if (buffer.length < bodyEnd) return;

    const body = buffer.subarray(bodyStart, bodyEnd).toString("utf8");
    buffer = buffer.subarray(bodyEnd);
    handle(JSON.parse(body));
  }
}

process.stdin.on("data", (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  drain();
});
