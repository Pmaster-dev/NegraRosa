import { describe, it, expect } from 'vitest';
import { WebsiteVerificationService } from './WebsiteVerificationService';

describe('WebsiteVerificationService - SSRF Protection', () => {
  const service = new WebsiteVerificationService();

  it('should reject requests to loopback addresses (localhost, 127.0.0.1)', async () => {
    const localhostResult = await service.verifyWebsite('http://localhost:3000');
    expect(localhostResult.success).toBe(false);
    expect(localhostResult.message).toContain('private network address is not allowed');

    const loopbackResult = await service.verifyWebsite('http://127.0.0.1');
    expect(loopbackResult.success).toBe(false);
    expect(loopbackResult.message).toContain('private network address is not allowed');
  });

  it('should reject requests to AWS metadata endpoint (169.254.169.254)', async () => {
    const awsMetadataResult = await service.verifyWebsite('http://169.254.169.254/latest/meta-data/');
    expect(awsMetadataResult.success).toBe(false);
    expect(awsMetadataResult.message).toContain('private network address is not allowed');
  });

  it('should reject requests to private IP ranges (10.x.x.x, 192.168.x.x, 172.16.x.x)', async () => {
    const result10 = await service.verifyWebsite('http://10.0.0.1');
    expect(result10.success).toBe(false);

    const result192 = await service.verifyWebsite('http://192.168.1.1');
    expect(result192.success).toBe(false);

    const result172 = await service.verifyWebsite('http://172.16.0.1');
    expect(result172.success).toBe(false);
  });

  it('should reject requests with internal domain extensions (.local, .internal)', async () => {
    const localDomain = await service.verifyWebsite('http://my-service.local');
    expect(localDomain.success).toBe(false);
    expect(localDomain.message).toContain('private network address is not allowed');
  });
});
