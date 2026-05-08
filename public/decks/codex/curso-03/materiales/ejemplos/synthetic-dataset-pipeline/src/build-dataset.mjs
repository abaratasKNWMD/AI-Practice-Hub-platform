import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

export function buildExamples(records) {
  return records.flatMap((record, index) => {
    const evidence = record.source ? [record.source] : [];
    const needsHuman = evidence.length === 0;
    const base = {
      id: `onboarding-${String(index + 1).padStart(3, "0")}`,
      domain: record.domain,
      owner: record.owner,
      difficulty: record.difficulty,
      evidence,
      needs_human_source: needsHuman,
      expires_at: "2026-12-31"
    };

    const answer = needsHuman
      ? "This answer needs a human source before it can be used for training or evals."
      : `${record.summary} Evidence: ${record.source}`;

    return [
      {
        ...base,
        type: "qa",
        question: record.question,
        answer
      },
      {
        ...base,
        id: `${base.id}-chat`,
        type: "senior_junior_chat",
        messages: [
          { role: "junior", content: record.question },
          { role: "senior", content: answer }
        ]
      }
    ];
  });
}

export function validateExamples(examples) {
  for (const item of examples) {
    if (!item.id || !item.type || !item.domain) throw new Error("Missing required dataset fields");
    if (!item.needs_human_source && item.evidence.length === 0) {
      throw new Error(`Example ${item.id} has no evidence`);
    }
    const payload = JSON.stringify(item);
    if (/api[_-]?key|secret|token=/i.test(payload)) {
      throw new Error(`Potential secret in ${item.id}`);
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const input = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.join(root, "data", "evidence.json");
  const output = process.argv[3] ? path.resolve(process.cwd(), process.argv[3]) : path.join(root, "out", "onboarding.jsonl");
  const records = JSON.parse(fs.readFileSync(input, "utf8"));
  const examples = buildExamples(records);
  validateExamples(examples);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${examples.map((item) => JSON.stringify(item)).join("\n")}\n`);
  console.log(`Wrote ${examples.length} dataset rows to ${output}`);
}
