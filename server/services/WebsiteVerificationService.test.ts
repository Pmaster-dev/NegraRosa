import { describe, it, expect } from 'vitest';
import { WebsiteVerificationService } from './WebsiteVerificationService';

describe('WebsiteVerificationService SSRF Protection', () => {
  const service = new WebsiteVerificationService();

  it('should reject local IP addresses and loopback URLs', async () => {
    const localhostResult = await service.verifyWebsite('http://localhost:5000');
    expect(localhostResult.success).toBe(false);
    expect(localhostResult.message).toContain('restricted website URL');

    const ipResult = await service.verifyWebsite('http://127.0.0.1/admin');
    expect(ipResult.success).toBe(false);
    expect(ipResult.message).toContain('restricted website URL');
  });

  it('should reject AWS cloud metadata endpoint', async () => {
    const metadataResult = await service.verifyWebsite('http://169.254.169.254/latest/meta-data/');
    expect(metadataResult.success).toBe(false);
    expect(metadataResult.message).toContain('restricted website URL');
  });

  it('should reject private network IP ranges', async () => {
    const privateIp10 = await service.verifyWebsite('http://10.0.0.1');
    expect(privateIp10.success).toBe(false);

    const privateIp192 = await service.verifyWebsite('http://192.168.1.1');
    expect(privateIp192.success).toBe(false);
  });
});
