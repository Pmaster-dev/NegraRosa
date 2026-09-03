## 2025-05-20 - JWT Hardcoded Fallback Secret in AuthService
**Vulnerability:** In `server/services/AuthService.ts`, the `AuthService` class constructor fell back to a hardcoded string (`"negrarosa-inclusive-security-framework-secret"`) when `process.env.JWT_SECRET` was not set.
**Learning:** Hardcoded default secrets in production allow attackers to forge arbitrary JWT tokens and hijack user accounts/sessions.
**Prevention:** Enforce strict checks on startup in production environments (`NODE_ENV === "production"`) to throw an error if `JWT_SECRET` is not set, preventing startup with insecure defaults.
