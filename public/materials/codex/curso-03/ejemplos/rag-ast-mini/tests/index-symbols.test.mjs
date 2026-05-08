import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { buildIndex } from "../src/index-symbols.mjs";
import { search } from "../src/search.mjs";

const repoRoot = fileURLToPath(new URL("../fixtures/repo", import.meta.url));

test("indexes exported symbols", () => {
  const index = buildIndex(repoRoot);
  const refresh = index.chunks.find((chunk) => chunk.symbol === "refreshSession");
  assert.ok(refresh);
  assert.ok(refresh.tests.includes("tests/auth/session.test.js"));
  assert.ok(index.chunks.some((chunk) => chunk.kind === "class"));
});

test("search returns symbol chunks", () => {
  const index = buildIndex(repoRoot);
  const results = search(index, "refreshSession");
  assert.equal(results[0].symbol, "refreshSession");
});
