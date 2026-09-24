## 2026-03-30 - Hardcoded HMAC Salt Security Pattern
**Vulnerability:** Found hardcoded HMAC secret `"idsec_secret_salt"` used in webhook signature generation.
**Learning:** Hardcoded fallback values for HMAC secrets allow potential signature forgery across environments if missing environment variables default silently.
**Prevention:** Always require cryptographic secrets from environment variables (`IDSEC_SECRET_SALT` or `JWT_SECRET`) and fail fast by throwing an error if absent.
