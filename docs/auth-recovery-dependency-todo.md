# Auth/Recovery Dependency TODO (Lean)

## External Dependencies Inventory

- `jsonwebtoken` — session token generation/verification.
- `paseto` — token model target for hardened auth paths.
- `passport` / `passport-local` — local strategy support.
- `@anthropic-ai/sdk` / `openai` — not in recovery critical path.
- `@neondatabase/serverless`, `drizzle-orm` — persistence layer dependencies.

## External Identity / Partner Surface

- ID.me fallback (primary external recovery proof path).
- Civic/Auth0 integrations remain optional and out-of-path for this recovery flow.

## Architecture-Level Scan Checks

- Auth boundaries: ensure auth-required routes retain token checks.
- Token/session handling: reject hardcoded secrets and hardcoded recovery credentials.
- Webhook/integration validation: require signature/assertion validation before trust.
- PII redaction: avoid raw email/recovery code leakage in logs and review queues.

## Dependency Actions

- [ ] Run `npm audit` and triage high/critical vulnerabilities.
- [ ] Pin or upgrade risky auth/recovery-adjacent packages first.
- [ ] Keep recovery integration surface minimal (ID.me first, defer Rust/Java split).

## Staged PR Slices

1. Recovery hardening core (code validation + lockout + fallback endpoint).
2. Recovery tests (unit/API/e2e) + architecture scan checks.
3. Dependency hardening pass (audit, pinning, and follow-up fixes).
