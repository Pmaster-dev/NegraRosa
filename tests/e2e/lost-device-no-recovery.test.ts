import test from "node:test";
import assert from "node:assert/strict";
import { AuthService } from "../../server/services/AuthService";

test("lost-device/no-recovery user can recover via ID.me fallback", async () => {
  const authService = new AuthService();
  const userId = 1;

  // Simulate existing biometric profile before device loss.
  await authService.biometricAuth(userId, "old-face-template");

  const blocked = await authService.recoveryCodeAuth("test@example.com", "missing-code");
  assert.equal(blocked.success, false);
  assert.equal(blocked.status, "BLOCKED_NO_RECOVERY_PATH");

  const fallback = await authService.requestRecoveryFallback("test@example.com", "idme:test@example.com");
  assert.equal(fallback.success, true);
  assert.ok(fallback.data?.recoveryCode);

  const recovered = await authService.recoverAccount(fallback.data.recoveryCode, "new-face-template");
  assert.equal(recovered.success, true);
  assert.equal(recovered.userId, userId);

  const biometricLogin = await authService.authenticateWithBiometrics("new-face-template");
  assert.equal(biometricLogin.success, true);
  assert.equal(biometricLogin.userId, userId);
});
