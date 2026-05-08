import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

export function makeCustomId(filePath) {
  return filePath.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}

export function buildRequest(task, file) {
  return {
    custom_id: `refactor-${makeCustomId(file.path)}`,
    method: "POST",
    url: "/v1/responses",
    body: {
      model: task.model,
      reasoning: { effort: task.reasoning_effort || "medium" },
      input: [
        {
          role: "developer",
          content: "You are Codex planning a safe enterprise refactor. Return JSON only."
        },
        {
          role: "user",
          content: [
            `Goal: ${task.goal}`,
            `File: ${file.path}`,
            `Risk: ${file.risk}`,
            `Tests: ${file.tests.join(", ")}`,
            `Acceptance: ${task.acceptance.join(" | ")}`,
            "Return: {file, risk, plan[], tests[], blockers[], human_review_required}"
          ].join("\n")
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "refactor_plan",
          schema: {
            type: "object",
            properties: {
              file: { type: "string" },
              risk: { type: "string" },
              plan: { type: "array", items: { type: "string" } },
              tests: { type: "array", items: { type: "string" } },
              blockers: { type: "array", items: { type: "string" } },
              human_review_required: { type: "boolean" }
            },
            required: ["file", "risk", "plan", "tests", "blockers", "human_review_required"],
            additionalProperties: false
          }
        }
      }
    }
  };
}

export function buildBatch(task) {
  const requests = task.files.map((file) => buildRequest(task, file));
  validateBatch(requests);
  return requests;
}

export function validateBatch(requests) {
  const ids = new Set();
  const models = new Set();

  for (const request of requests) {
    if (!request.custom_id) throw new Error("Missing custom_id");
    if (ids.has(request.custom_id)) throw new Error(`Duplicate custom_id: ${request.custom_id}`);
    ids.add(request.custom_id);

    if (request.method !== "POST") throw new Error("Batch requests must be POST");
    if (request.url !== "/v1/responses") throw new Error("This planner targets /v1/responses only");
    if (!request.body?.model) throw new Error("Missing model");
    models.add(request.body.model);
  }

  if (models.size !== 1) throw new Error("A batch file should use one model for this course exercise");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const input = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.join(root, "tasks", "refactor-tasks.json");
  const output = process.argv[3] ? path.resolve(process.cwd(), process.argv[3]) : path.join(root, "out", "refactor.batch.jsonl");
  const task = JSON.parse(fs.readFileSync(input, "utf8"));
  const lines = buildBatch(task).map((request) => JSON.stringify(request));
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${lines.join("\n")}\n`);
  console.log(`Wrote ${lines.length} requests to ${output}`);
}
