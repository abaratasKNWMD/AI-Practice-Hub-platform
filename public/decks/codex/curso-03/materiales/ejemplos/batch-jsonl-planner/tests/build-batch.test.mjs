import test from "node:test";
import assert from "node:assert/strict";
import { buildBatch, makeCustomId, validateBatch } from "../src/build-batch.mjs";

test("builds stable custom ids", () => {
  assert.equal(makeCustomId("src/auth/session.js"), "src-auth-session-js");
});

test("builds valid responses batch requests", () => {
  const batch = buildBatch({
    model: "gpt-5.5",
    goal: "Plan refactor",
    acceptance: ["No behavior changes"],
    files: [{ path: "src/a.js", risk: "low", tests: ["a.test.js"] }]
  });
  assert.equal(batch[0].url, "/v1/responses");
  assert.equal(batch[0].body.model, "gpt-5.5");
});

test("rejects duplicated custom ids", () => {
  assert.throws(() => validateBatch([
    { custom_id: "x", method: "POST", url: "/v1/responses", body: { model: "gpt-5.5" } },
    { custom_id: "x", method: "POST", url: "/v1/responses", body: { model: "gpt-5.5" } }
  ]), /Duplicate/);
});
