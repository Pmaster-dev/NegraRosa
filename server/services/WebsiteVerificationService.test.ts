import { describe, it, expect } from 'vitest';
import { WebsiteVerificationService } from './WebsiteVerificationService';

describe('WebsiteVerificationService SSRF Protection', () => {
  const service = new WebsiteVerificationService();

  const unsafeUrls = [
    'http://127.0.0.1/admin',
    'http://localhost:5000/api/v1/users',
    'http://169.254.169.254/latest/meta-data/',
    'http://10.0.0.1/internal',
    'http://172.16.0.1/status',
    'http://192.168.1.1/config',
    'file:///etc/passwd',
    'gopher://127.0.0.1',
    'http://[fe80::1]/status',
  ];

  for (const url of unsafeUrls) {
    it(`should block SSRF attempt to unsafe URL: ${url}`, async () => {
      const result = await service.verifyWebsite(url);
      expect(result.success).toBe(false);
      expect(result.message).toContain('SSRF protection');
    });
  }
});
