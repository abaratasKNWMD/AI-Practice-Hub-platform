import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full.endsWith(".js") ? [full] : [];
  });
}

function importsOf(text) {
  return [...text.matchAll(/import\s+.*?\s+from\s+["'](.+?)["']/g)].map((match) => match[1]);
}

export function extractSymbols(filePath, repoRoot) {
  const text = fs.readFileSync(filePath, "utf8");
  const rel = path.relative(repoRoot, filePath).replace(/\\/g, "/");
  const lines = text.split(/\r?\n/);
  const imports = importsOf(text);
  const symbols = [];

  lines.forEach((line, index) => {
    const functionMatch = line.match(/export\s+(?:async\s+)?function\s+([A-Za-z0-9_]+)/);
    const classMatch = line.match(/export\s+class\s+([A-Za-z0-9_]+)/);
    const name = functionMatch?.[1] || classMatch?.[1];
    if (!name) return;

    const kind = functionMatch ? "function" : "class";
    const end = Math.min(lines.length, index + 8);
    const displayText = lines.slice(index, end).join("\n");
    symbols.push({
      id: `${rel}#${name}`,
      file: rel,
      language: "javascript",
      kind,
      symbol: name,
      range: { start: index + 1, end },
      imports,
      calls: [...displayText.matchAll(/\b([A-Za-z0-9_]+)\(/g)]
        .map((match) => match[1])
        .filter((call) => !["if", "return", name].includes(call)),
      tests: [],
      owner: rel.includes("auth") ? "identity-team" : "unknown",
      acl: "internal",
      freshness: "demo",
      risk: rel.includes("auth") ? "high" : "medium",
      embedding_text: `${kind} ${name} in ${rel}. Imports: ${imports.join(", ")}. ${displayText}`,
      display_text: displayText
    });
  });

  return symbols;
}

export function buildIndex(repoRoot) {
  const files = walk(repoRoot);
  const chunks = files.flatMap((file) => extractSymbols(file, repoRoot));
  const testFiles = files.filter((file) => /test|spec/i.test(file));

  for (const chunk of chunks) {
    const base = chunk.symbol.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`).replace(/^-/, "");
    const domain = chunk.file.split("/")[1] || "";
    chunk.tests = testFiles
      .map((file) => path.relative(repoRoot, file).replace(/\\/g, "/"))
      .filter((file) => file.toLowerCase().includes(base.toLowerCase().split("-")[0]) || (domain && file.includes(`tests/${domain}/`)));
  }

  return { generated_at: new Date(0).toISOString(), chunks };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const repoDir = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.join(root, "fixtures", "repo");
  const output = process.argv[3] ? path.resolve(process.cwd(), process.argv[3]) : path.join(root, "out", "code-index.json");
  const index = buildIndex(repoDir);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(index, null, 2)}\n`);
  console.log(`Indexed ${index.chunks.length} chunks to ${output}`);
}
