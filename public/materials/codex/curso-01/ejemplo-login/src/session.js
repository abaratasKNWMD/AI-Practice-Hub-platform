const REFRESH_SKEW_MS = 30_000;

export function shouldRefreshSession(session, nowMs = Date.now()) {
  if (!session || !session.refreshToken || !session.expiresAt) {
    return false;
  }

  // Bug intencional para el lab: expiresAt llega en segundos Unix.
  return session.expiresAt - nowMs <= REFRESH_SKEW_MS;
}

export function authHeader(session) {
  if (!session?.accessToken) {
    return {};
  }

  return { Authorization: `Bearer ${session.accessToken}` };
}
