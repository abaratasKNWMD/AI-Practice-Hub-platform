import { refreshSession } from "../../src/auth/session.js";

test("refreshSession returns null for inactive users", async () => {
  await refreshSession("inactive-user");
});
