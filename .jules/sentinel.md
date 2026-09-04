# Sentinel Security Journal

## 2026-03-31 - HMAC SHA-256 Webhook Signatures
**Vulnerability:** Base64 pseudo-signature was used for `X-Webhook-Signature` in `WebhookService`, allowing webhook payload forgery and tampering.
**Learning:** Prototype implementations may fall back to Base64 encoding instead of cryptographic HMAC signing.
**Prevention:** Always use HMAC-SHA256 with a secure secret key (`WEBHOOK_SECRET` or `SESSION_SECRET`) for outgoing webhook signature verification.
