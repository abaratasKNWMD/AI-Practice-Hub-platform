import test from "node:test";
import assert from "node:assert/strict";
import { buildExamples, validateExamples } from "../src/build-dataset.mjs";

test("builds qa and chat examples", () => {
  const examples = buildExamples([
    { domain: "auth", owner: "id", source: "src/auth/session.js", summary: "Does auth.", question: "How?", difficulty: "easy" }
  ]);
  assert.equal(examples.length, 2);
  assert.equal(examples[0].evidence[0], "src/auth/session.js");
});

test("marks examples without evidence for human source", () => {
  const examples = buildExamples([
    { domain: "platform", owner: "core", source: "", summary: "Tribal.", question: "Why?", difficulty: "hard" }
  ]);
  assert.equal(examples[0].needs_human_source, true);
  assert.doesNotThrow(() => validateExamples(examples));
});

test("rejects potential secrets", () => {
  assert.throws(() => validateExamples([
    { id: "x", type: "qa", domain: "auth", evidence: ["a"], needs_human_source: false, answer: "token=abc" }
  ]), /Potential secret/);
});
