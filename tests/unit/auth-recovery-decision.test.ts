import test from "node:test";
import assert from "node:assert/strict";
import { AuthService } from "../../server/services/AuthService";
import { IdMeNodeVerifier } from "../../server/services/IdMeNodeVerifier";

const testSecret = "test-idme-node-shared-secret";

function signedAssertion(email: string): string {
  return IdMeNodeVerifier.createAssertion(email, testSecret);
}

test("requires ID.me when no recovery code exists", async () => {
  process.env.IDME_NODE_SHARED_SECRET = testSecret;
  const authService = new AuthService();

  const result = await authService.recoveryCodeAuth("test@example.com", "invalid-code");
  assert.equal(result.success, false);
  assert.equal(result.status, "BLOCKED_NO_RECOVERY_PATH");
});

test("approves fallback with valid ID.me assertion and authenticates with issued code", async () => {
  process.env.IDME_NODE_SHARED_SECRET = testSecret;
  const authService = new AuthService();

  const fallback = await authService.requestRecoveryFallback("test@example.com", signedAssertion("test@example.com"));
  assert.equal(fallback.success, true);
  assert.equal(fallback.status, "FALLBACK_APPROVED");
  assert.ok(fallback.data?.recoveryCode);

  const auth = await authService.recoveryCodeAuth("test@example.com", fallback.data.recoveryCode);
  assert.equal(auth.success, true);
  assert.equal(auth.data?.status, "RECOVERY_AUTHENTICATED");
});

test("locks recovery flow after repeated invalid attempts", async () => {
  process.env.IDME_NODE_SHARED_SECRET = testSecret;
  const authService = new AuthService();
  await authService.requestRecoveryFallback("test@example.com", signedAssertion("test@example.com"));

  await authService.recoveryCodeAuth("test@example.com", "wrong-1");
  await authService.recoveryCodeAuth("test@example.com", "wrong-2");
  await authService.recoveryCodeAuth("test@example.com", "wrong-3");
  const locked = await authService.recoveryCodeAuth("test@example.com", "wrong-4");

  assert.equal(locked.success, false);
  assert.equal(locked.status, "LOCKED_OUT");
});
