## 2026-03-03 - Webhook HMAC Signature Generation
**Vulnerability:** Webhook payloads were sent with unauthenticated pseudo-signatures using base64 encoding rather than cryptographic HMAC-SHA256 signatures, allowing spoofing and forgery.
**Learning:** Webhook delivery logic retained prototype pseudo-signing without strict env key verification or cryptographic HMAC routines.
**Prevention:** Always enforce HMAC-SHA256 signing using `crypto.createHmac` with explicit runtime checks for `WEBHOOK_SECRET` in production.
