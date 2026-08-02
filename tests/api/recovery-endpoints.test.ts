import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { AddressInfo } from "node:net";
import authRouter from "../../server/api/v1/auth";
import { IdMeNodeVerifier } from "../../server/services/IdMeNodeVerifier";

const testSecret = "test-idme-node-shared-secret";

function signedAssertion(email: string): string {
  return IdMeNodeVerifier.createAssertion(email, testSecret);
}

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use("/api/v1/auth", authRouter);

  const server = await new Promise<import("node:http").Server>((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });

  const port = (server.address() as AddressInfo).port;
  return { server, baseUrl: `http://127.0.0.1:${port}` };
}

test("recovery API exposes blocked and fallback statuses", async (t) => {
  process.env.IDME_NODE_SHARED_SECRET = testSecret;
  const { server, baseUrl } = await startServer();
  t.after(() => server.close());

  const blocked = await fetch(`${baseUrl}/api/v1/auth/recovery-code`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", recoveryCode: "bad-code" })
  });
  assert.equal(blocked.status, 401);
  const blockedBody = await blocked.json();
  assert.equal(blockedBody.status, "BLOCKED_NO_RECOVERY_PATH");

  const needsIdMe = await fetch(`${baseUrl}/api/v1/auth/recovery-fallback`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "test@example.com" })
  });
  assert.equal(needsIdMe.status, 401);
  const idMeBody = await needsIdMe.json();
  assert.equal(idMeBody.status, "IDME_REQUIRED");

  const manual = await fetch(`${baseUrl}/api/v1/auth/recovery-fallback`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", idMeAssertion: signedAssertion("other@example.com") })
  });
  assert.equal(manual.status, 202);
  const manualBody = await manual.json();
  assert.equal(manualBody.status, "MANUAL_REVIEW_REQUIRED");
  assert.ok(manualBody.data?.caseId);
});
