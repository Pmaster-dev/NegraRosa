# Recovery Gap Matrix (Lost Device / No Recovery Path)

## Current Auth Flows

| Flow | Lost device | No backup / no recovery code | Locked out + no alternate factor | Notes |
|---|---|---|---|---|
| `biometric` | Hard failure | Hard failure | Hard failure | Device loss blocks face capture path. |
| `nft` | Partial | Hard failure | Hard failure | Requires wallet continuity and token proof. |
| `recovery_code` | Pass when code exists | Hard failure | Hard failure | Now lockout-protected and code-expiry enforced. |
| `idme_fallback` | Pass | Pass | Partial | Automates fallback when valid ID.me assertion is provided. |
| `manual_review_queue` | Pass (human path) | Pass (human path) | Pass (human path) | Used only when automation fails. |

## Hard Failure Triggers To Track

- No active recovery code for user account.
- Repeated invalid recovery submissions (lockout window).
- Missing or invalid ID.me assertion for fallback automation.

## Status Signals

- `BLOCKED_NO_RECOVERY_PATH`
- `LOCKED_OUT`
- `IDME_REQUIRED`
- `MANUAL_REVIEW_REQUIRED`
- `FALLBACK_APPROVED`
- `RECOVERY_AUTHENTICATED`
