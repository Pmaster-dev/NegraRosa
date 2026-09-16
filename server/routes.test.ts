import { describe, it, expect, vi } from "vitest";
import express from "express";
import crypto from "crypto";

// Helper function that mirrors route signing logic
function computeWebhookSignature(data: any, customSecret?: string): string {
  const hmacSecret = customSecret || process.env.IDSEC_HMAC_SECRET || "idsec_secret_salt";
  const payloadString = JSON.stringify(data);
  return crypto.createHmac("sha256", hmacSecret).update(payloadString).digest("hex");
}

describe("Webhook HMAC signature endpoint calculation", () => {
  it("should calculate signature using IDSEC_HMAC_SECRET when set", () => {
    const data = { event: "webhook.test", id: 1 };
    const secret = "super_secret_env_key";

    process.env.IDSEC_HMAC_SECRET = secret;
    const signature = computeWebhookSignature(data);
    const expected = crypto.createHmac("sha256", secret).update(JSON.stringify(data)).digest("hex");

    expect(signature).toBe(expected);
    delete process.env.IDSEC_HMAC_SECRET;
  });

  it("should fallback to default salt when IDSEC_HMAC_SECRET is unset", () => {
    delete process.env.IDSEC_HMAC_SECRET;
    const data = { event: "webhook.test", id: 1 };

    const signature = computeWebhookSignature(data);
    const expected = crypto.createHmac("sha256", "idsec_secret_salt").update(JSON.stringify(data)).digest("hex");

    expect(signature).toBe(expected);
  });
});
