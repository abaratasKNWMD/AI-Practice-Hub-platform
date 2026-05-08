import assert from "node:assert/strict";
import { test } from "node:test";
import { authHeader, shouldRefreshSession } from "../src/session.js";

const NOW_MS = Date.UTC(2026, 4, 6, 10, 0, 0);

function session(expiresInMs) {
  return {
    accessToken: "access-token",
    refreshToken: "refresh-token",
    expiresAt: Math.floor((NOW_MS + expiresInMs) / 1000),
  };
}

test("does not refresh when token expires in more than 30 seconds", () => {
  assert.equal(shouldRefreshSession(session(90_000), NOW_MS), false);
});

test("refreshes when token is inside the 30 second safety window", () => {
  assert.equal(shouldRefreshSession(session(20_000), NOW_MS), true);
});

test("does not refresh sessions without refresh token", () => {
  assert.equal(
    shouldRefreshSession({ accessToken: "access", expiresAt: Math.floor((NOW_MS + 20_000) / 1000) }, NOW_MS),
    false
  );
});

test("builds authorization header", () => {
  assert.deepEqual(authHeader({ accessToken: "abc" }), { Authorization: "Bearer abc" });
});
