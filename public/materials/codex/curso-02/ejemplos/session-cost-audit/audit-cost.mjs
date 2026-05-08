import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export function auditSession(session) {
  const totals = session.turns.reduce(
    (acc, turn) => {
      acc.inputTokens += turn.inputTokens || 0;
      acc.outputTokens += turn.outputTokens || 0;
      acc.toolCalls += turn.toolCalls || 0;
      acc.images += turn.images || 0;
      acc.largeLogs += turn.largeLogs || 0;
      return acc;
    },
    { inputTokens: 0, outputTokens: 0, toolCalls: 0, images: 0, largeLogs: 0 }
  );

  const pressure =
    totals.inputTokens / 2000 +
    totals.outputTokens / 3000 +
    totals.toolCalls * 0.8 +
    totals.images * 1.4 +
    totals.largeLogs * 1.8;

  const level = pressure >= 10 ? "alto" : pressure >= 5 ? "medio" : "bajo";
  const recommendations = [];

  if (totals.largeLogs > 0) recommendations.push("Filtrar logs antes de pegarlos o pedir a Codex que busque el fragmento relevante.");
  if (totals.images > 1) recommendations.push("Agrupar capturas y señalar qué debe observar el modelo.");
  if (totals.toolCalls > 8) recommendations.push("Revisar si hubo herramientas repetidas o exploración sin plan.");
  if (session.subagents > 0 && !session.handoffs) recommendations.push("Usar handoffs resumidos para que el hilo principal no herede ruido.");
  if (!recommendations.length) recommendations.push("La sesión parece bien acotada; documenta el prompt si el patrón se repetirá.");

  return { totals, level, recommendations };
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Uso: node audit-cost.mjs <session.json>");
    process.exit(1);
  }

  const session = JSON.parse(await readFile(file, "utf8"));
  const report = auditSession(session);
  console.log(JSON.stringify(report, null, 2));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
