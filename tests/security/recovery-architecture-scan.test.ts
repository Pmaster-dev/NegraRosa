import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const authServicePath = "/home/runner/work/NegraRosa/NegraRosa/server/services/AuthService.ts";

test("architecture scan: no demo recovery credentials remain", () => {
  const content = fs.readFileSync(authServicePath, "utf8");
  assert.equal(content.includes("test-recovery-code"), false);
  assert.equal(content.includes("demoRecoveryCode"), false);
});

test("architecture scan: recovery path has auth boundary, lockout, and ID.me validation", () => {
  const content = fs.readFileSync(authServicePath, "utf8");
  assert.match(content, /validateIdMeAssertion/);
  assert.match(content, /hashRecoveryCode/);
  assert.match(content, /LOCKED_OUT|lockout/i);
});
