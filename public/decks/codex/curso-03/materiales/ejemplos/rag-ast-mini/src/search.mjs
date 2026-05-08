import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

export function search(index, query, limit = 5) {
  const q = query.toLowerCase();
  return index.chunks
    .map((chunk) => {
      const haystack = `${chunk.symbol} ${chunk.file} ${chunk.embedding_text}`.toLowerCase();
      const score = haystack.includes(q) ? 1 : q.split(/\W+/).filter(Boolean).reduce((sum, part) => sum + (haystack.includes(part) ? 0.2 : 0), 0);
      return { score, chunk };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.chunk);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const indexPath = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.join(root, "out", "code-index.json");
  const query = process.argv.slice(3).join(" ") || "refreshSession";
  const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  console.log(JSON.stringify(search(index, query), null, 2));
}
