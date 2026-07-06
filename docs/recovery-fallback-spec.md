# Minimal Recovery Fallback Spec

## Goal

Provide a lean fallback path for users blocked by lost-device and no-recovery-code conditions, without introducing new microservices.

## Primary Path

1. User attempts `/api/v1/auth/recovery-code`.
2. If no active code exists, API returns `BLOCKED_NO_RECOVERY_PATH`.
3. User submits `/api/v1/auth/recovery-fallback` with:
   - `email`
   - `idMeAssertion` (format: `idme:<email>`)
4. If assertion validates, API returns `FALLBACK_APPROVED` and issues a short-lived recovery code.
5. User completes recovery using issued code.

## Manual Review Path

Manual review is created only when automated fallback cannot recover:

- ID.me assertion invalid for known user.
- Email cannot be matched to an account.

Response status: `MANUAL_REVIEW_REQUIRED` with `caseId`.

## Security Constraints

- No hardcoded recovery credentials.
- Recovery codes are hashed, expiring, and one-time use.
- Failed recovery attempts are lockout-protected.
- Manual review queue stores hashed email only (no raw email logging).
