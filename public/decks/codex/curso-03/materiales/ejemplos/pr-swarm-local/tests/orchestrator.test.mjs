import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { runReview, parseDiff } from "../src/orchestrator.mjs";

const diff = fs.readFileSync(new URL("../fixtures/diff-with-bug.patch", import.meta.url), "utf8");

test("parses added lines with file names", () => {
  const files = parseDiff(diff);
  assert.equal(files[0].file, "src/auth/session.js");
  assert.ok(files[0].added.some((line) => line.text.includes("console.log")));
});

test("detects high risk findings and requests changes", () => {
  const review = runReview(diff);
  assert.equal(review.decision, "changes");
  assert.ok(review.findings.some((finding) => finding.title.includes("without await")));
  assert.ok(review.findings.some((finding) => finding.title.includes("Sensitive value")));
});
