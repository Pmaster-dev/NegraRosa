import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import crypto from 'crypto';
import { webhookService, WebhookPayload } from './WebhookService';

describe('WebhookService', () => {
  const originalSecret = process.env.WEBHOOK_SECRET;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    process.env.WEBHOOK_SECRET = 'test_webhook_secret_12345';
  });

  afterEach(() => {
    if (originalSecret !== undefined) {
      process.env.WEBHOOK_SECRET = originalSecret;
    } else {
      delete process.env.WEBHOOK_SECRET;
    }
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('generateSignature', () => {
    it('should generate a valid HMAC-SHA256 signature header', () => {
      const payload: WebhookPayload = {
        id: 'payload-123',
        webhookId: 'webhook-456',
        event: 'user.verification.complete',
        data: { userId: 1, status: 'VERIFIED' },
      };

      const signature = webhookService.generateSignature(payload);

      expect(signature).toMatch(/^t=\d+,v1=[a-f0-9]{64}$/);

      // Extract timestamp and v1 signature from header
      const parts = signature.split(',');
      const timestamp = parts[0].replace('t=', '');
      const receivedHmac = parts[1].replace('v1=', '');

      // Verify HMAC calculation matches
      const expectedHmac = crypto
        .createHmac('sha256', process.env.WEBHOOK_SECRET!)
        .update(`${timestamp}.${JSON.stringify(payload)}`)
        .digest('hex');

      expect(receivedHmac).toBe(expectedHmac);
    });

    it('should generate different signatures for different payloads', () => {
      const payload1: WebhookPayload = {
        id: 'payload-1',
        webhookId: 'webhook-1',
        event: 'user.verification.complete',
        data: { test: 1 },
      };

      const payload2: WebhookPayload = {
        id: 'payload-2',
        webhookId: 'webhook-1',
        event: 'user.verification.complete',
        data: { test: 2 },
      };

      const sig1 = webhookService.generateSignature(payload1);
      const sig2 = webhookService.generateSignature(payload2);

      const hmac1 = sig1.split(',v1=')[1];
      const hmac2 = sig2.split(',v1=')[1];

      expect(hmac1).not.toBe(hmac2);
    });

    it('should throw an error if WEBHOOK_SECRET is not set in production environment', () => {
      delete process.env.WEBHOOK_SECRET;
      process.env.NODE_ENV = 'production';

      const payload: WebhookPayload = {
        id: 'payload-1',
        webhookId: 'webhook-1',
        event: 'test',
        data: {},
      };

      expect(() => webhookService.generateSignature(payload)).toThrow(
        'WEBHOOK_SECRET environment variable is required in production'
      );
    });
  });
});
