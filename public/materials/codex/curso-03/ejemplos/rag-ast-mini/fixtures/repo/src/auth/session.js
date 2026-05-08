import { loadUser, createSession } from "./store.js";

export async function refreshSession(userId) {
  const user = await loadUser(userId);
  if (!user.isActive) {
    return null;
  }
  return createSession(user.id);
}

export class SessionPolicy {
  canRefresh(user) {
    return Boolean(user && user.isActive);
  }
}
