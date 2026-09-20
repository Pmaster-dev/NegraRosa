import { describe, it, expect, beforeEach } from 'vitest';
import { PinkSyncService } from './PinkSyncService';

describe('PinkSyncService Encryption', () => {
  let service: PinkSyncService;

  beforeEach(() => {
    // Ensure PINKSYNC_ENCRYPTION_KEY is unset to test fallback instance key behavior
    delete process.env.PINKSYNC_ENCRYPTION_KEY;
    service = new PinkSyncService();
  });

  it('should encrypt and decrypt sensitive fields using instance key', async () => {
    const originalData = {
      id: '123',
      sensitiveField: 'secret-token-value',
      publicField: 'public-value'
    };

    const encryptResult = await service.encryptSyncData(originalData, ['sensitiveField']);
    expect(encryptResult.success).toBe(true);
    expect(encryptResult.encryptedFields).toContain('sensitiveField');
    expect(encryptResult.data.sensitiveField).not.toBe('secret-token-value');

    const decryptResult = await service.decryptSyncData(encryptResult.data, encryptResult.encryptedFields || []);
    expect(decryptResult.success).toBe(true);
    expect(decryptResult.data.sensitiveField).toBe('secret-token-value');
    expect(decryptResult.data.publicField).toBe('public-value');
  });
});
