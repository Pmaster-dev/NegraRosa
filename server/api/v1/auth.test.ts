import { describe, it, expect } from 'vitest';
import { sanitizeRedirectUrl } from './auth';

describe('sanitizeRedirectUrl', () => {
  it('allows safe relative paths', () => {
    expect(sanitizeRedirectUrl('/dashboard')).toBe('/dashboard');
    expect(sanitizeRedirectUrl('/profile?setting=1')).toBe('/profile?setting=1');
    expect(sanitizeRedirectUrl('/auth/callback')).toBe('/auth/callback');
  });

  it('defaults to /dashboard for empty or non-string inputs', () => {
    expect(sanitizeRedirectUrl()).toBe('/dashboard');
    expect(sanitizeRedirectUrl('')).toBe('/dashboard');
    expect(sanitizeRedirectUrl(null as any)).toBe('/dashboard');
    expect(sanitizeRedirectUrl(123 as any)).toBe('/dashboard');
  });

  it('blocks absolute URLs and protocol-relative URLs (open redirect attempts)', () => {
    expect(sanitizeRedirectUrl('https://evil.com')).toBe('/dashboard');
    expect(sanitizeRedirectUrl('http://attacker.com/dashboard')).toBe('/dashboard');
    expect(sanitizeRedirectUrl('//evil.com')).toBe('/dashboard');
    expect(sanitizeRedirectUrl('//evil.com/path')).toBe('/dashboard');
  });

  it('blocks backslash and tab evasion attempts', () => {
    expect(sanitizeRedirectUrl('/\\evil.com')).toBe('/dashboard');
    expect(sanitizeRedirectUrl('/\\/evil.com')).toBe('/dashboard');
    expect(sanitizeRedirectUrl('/\tevil.com')).toBe('/dashboard');
  });
});
