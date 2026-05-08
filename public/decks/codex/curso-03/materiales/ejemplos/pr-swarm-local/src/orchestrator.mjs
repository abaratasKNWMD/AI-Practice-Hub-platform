import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

export function parseDiff(diffText) {
  const files = [];
  let current = null;
  let newLine = 0;

  for (const raw of diffText.split(/\r?\n/)) {
    if (raw.startsWith("diff --git ")) {
      const match = raw.match(/ b\/(.+)$/);
      current = { file: match ? match[1] : "unknown", added: [] };
      files.push(current);
      continue;
    }

    if (!current) continue;

    if (raw.startsWith("@@")) {
      const match = raw.match(/\+(\d+)/);
      newLine = match ? Number(match[1]) : 0;
      continue;
    }

    if (raw.startsWith("+++") || raw.startsWith("---")) continue;

    if (raw.startsWith("+")) {
      current.added.push({ line: newLine || null, text: raw.slice(1) });
      newLine += 1;
      continue;
    }

    if (!raw.startsWith("-")) {
      newLine += 1;
    }
  }

  return files;
}

function finding(role, severity, file, line, title, evidence, recommendation, confidence = 0.82) {
  return { role, severity, file, line, title, evidence, recommendation, confidence };
}

export function architectPass(files) {
  const findings = [];
  const changed = files.map((entry) => entry.file);
  const hasTest = changed.some((file) => /test|spec/i.test(file));

  for (const entry of files) {
    if (/src\/auth\//.test(entry.file) && !hasTest) {
      findings.push(finding(
        "architect",
        "medium",
        entry.file,
        null,
        "Auth path changed without tests in diff",
        entry.file,
        "Require an auth regression test or a clear reason why existing coverage is enough.",
        0.74
      ));
    }
  }

  return findings;
}

export function qaPass(files) {
  const findings = [];

  for (const entry of files) {
    for (const added of entry.added) {
      if (/\bconst\s+\w+\s*=\s*load[A-Z]\w+\(/.test(added.text) && !/\bawait\b/.test(added.text)) {
        findings.push(finding(
          "qa",
          "high",
          entry.file,
          added.line,
          "Async loader is called without await",
          `+ ${added.text}`,
          "Await the async call and add a regression test for inactive users.",
          0.91
        ));
      }
    }
  }

  return findings;
}

export function securityPass(files) {
  const findings = [];

  for (const entry of files) {
    for (const added of entry.added) {
      if (/console\.(log|warn|error)/.test(added.text) && /(token|secret|password|authorization)/i.test(added.text)) {
        findings.push(finding(
          "security",
          "high",
          entry.file,
          added.line,
          "Sensitive value may be logged",
          `+ ${added.text}`,
          "Remove the log or redact the value before it reaches logs.",
          0.95
        ));
      }
    }
  }

  return findings;
}

export function judge(findings) {
  const seen = new Set();
  const deduped = [];

  for (const item of findings) {
    const key = `${item.file}:${item.title}:${item.evidence}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  const high = deduped.filter((item) => item.severity === "high").length;
  const medium = deduped.filter((item) => item.severity === "medium").length;
  const decision = high > 0 ? "changes" : medium > 0 ? "escalate" : "approve";

  return {
    decision,
    summary: `${deduped.length} finding(s): ${high} high, ${medium} medium.`,
    findings: deduped,
    human_review_required: decision !== "approve",
    residual_risk: decision === "approve" ? "No confirmed risks in offline heuristic review." : "Human reviewer should confirm evidence and remediation."
  };
}

export function runReview(diffText) {
  const files = parseDiff(diffText);
  const findings = [
    ...architectPass(files),
    ...qaPass(files),
    ...securityPass(files)
  ];
  return judge(findings);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffPath = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.join(root, "fixtures", "diff-with-bug.patch");
  const diffText = fs.readFileSync(diffPath, "utf8");
  const review = runReview(diffText);
  const outDir = path.join(root, "out");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "review.json"), `${JSON.stringify(review, null, 2)}\n`);
  console.log(JSON.stringify(review, null, 2));
}
