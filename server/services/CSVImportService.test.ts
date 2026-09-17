import { describe, it, expect, vi } from 'vitest';
import { CSVImportService } from './CSVImportService';
import { storage } from '../storage';

vi.mock('../storage', () => ({
  storage: {
    createWebhook: vi.fn().mockImplementation((data) => Promise.resolve({ ...data, createdAt: new Date(), updatedAt: new Date() })),
  },
}));

describe('CSVImportService - Security & URL Validation', () => {
  const csvService = new CSVImportService();

  it('accepts valid http and https webhook URLs', async () => {
    const validCSV = `name,url,event,userId
Valid HTTPS,https://example.com/webhook,user.registered,1
Valid HTTP,http://example.org/webhook,user.updated,1`;

    const result = await csvService.importWebhooksFromCSV(validCSV);

    expect(result.errors).toHaveLength(0);
    expect(result.imported).toHaveLength(2);
    expect(result.imported[0].url).toBe('https://example.com/webhook');
    expect(result.imported[1].url).toBe('http://example.org/webhook');
  });

  it('rejects malformed URLs and non-HTTP/HTTPS protocols', async () => {
    const maliciousCSV = `name,url,event,userId
JavaScript Scheme,javascript:alert(1),user.registered,1
File Scheme,file:///etc/passwd,user.registered,1
FTP Scheme,ftp://example.com/file,user.registered,1
Malformed URL,not_a_valid_url,user.registered,1`;

    const result = await csvService.importWebhooksFromCSV(maliciousCSV);

    expect(result.imported).toHaveLength(0);
    expect(result.errors).toHaveLength(4);
    expect(result.errors[0]).toContain('Invalid URL protocol');
    expect(result.errors[1]).toContain('Invalid URL protocol');
    expect(result.errors[2]).toContain('Invalid URL protocol');
    expect(result.errors[3]).toContain('Invalid URL format');
  });
});
