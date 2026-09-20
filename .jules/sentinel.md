## 2026-03-31 - Persistent Encryption Key Fallback in PinkSyncService
**Vulnerability:** `PinkSyncService` generated a new ephemeral random key on every call to `encryptSyncData` and `decryptSyncData` when `PINKSYNC_ENCRYPTION_KEY` environment variable was omitted. This caused encryption and decryption key mismatch, making decryption always fail with authentication tag mismatch.
**Learning:** Functions that rely on fallback keys must not generate new random bytes per invocation.
**Prevention:** Store fallback cryptographic keys as persistent instance properties during service initialization.
