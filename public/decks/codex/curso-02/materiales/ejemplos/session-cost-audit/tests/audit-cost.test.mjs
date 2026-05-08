import assert from "node:assert/strict";
import { test } from "node:test";
import { auditSession } from "../audit-cost.mjs";

test("classifies lightweight sessions as low cost", () => {
  const report = auditSession({
    subagents: 0,
    handoffs: false,
    turns: [{ inputTokens: 400, outputTokens: 200, toolCalls: 1, images: 0, largeLogs: 0 }]
  });

  assert.equal(report.level, "bajo");
});

test("flags image and log heavy sessions", () => {
  const report = auditSession({
    subagents: 0,
    handoffs: false,
    turns: [{ inputTokens: 5000, outputTokens: 2000, toolCalls: 8, images: 3, largeLogs: 2 }]
  });

  assert.equal(report.level, "alto");
  assert.ok(report.recommendations.some((item) => item.includes("logs")));
  assert.ok(report.recommendations.some((item) => item.includes("capturas")));
});
