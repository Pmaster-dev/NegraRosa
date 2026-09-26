# Sentinel Security Journal

## 2026-09-26 - Hardcoded Webhook HMAC Secret Removal
**Vulnerability:** Hardcoded secret salt `"idsec_secret_salt"` was used to calculate HMAC cryptographic signatures for webhook payloads in `server/routes.ts`.
**Learning:** Development placeholders or test routes often retain hardcoded secrets when copied into production route handlers.
**Prevention:** Always load HMAC secrets from `process.env` and fail securely if unconfigured rather than falling back to default hardcoded strings.
