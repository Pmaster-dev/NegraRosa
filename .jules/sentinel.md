# Sentinel Security Journal

## 2026-09-03 - Configurable HMAC Salt for Webhook Signatures
**Vulnerability:** Hardcoded secret salt `"idsec_secret_salt"` used in `server/routes.ts` for HMAC webhook payload signing.
**Learning:** Hardcoded cryptographic keys in API routes leak secrets in open source code and enable payload signature forgery.
**Prevention:** Always pull HMAC secret salts from environment variables (`IDSEC_SECRET_SALT` / `WEBHOOK_SECRET`) with non-production development fallbacks.
