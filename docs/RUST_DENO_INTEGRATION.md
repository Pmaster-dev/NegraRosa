# Rust & Deno Client Integration Guide

This guide documents the native **Rust** and **Deno** client implementations for the NegraRosa Zero-Trust Security Framework & ID Sec Foundation.

---

## 1. Overview

NegraRosa exposes zero-trust cryptographic endpoints enabling external high-assurance daemons, hardware security modules (HSMs), and edge runtimes to bind securely:

- **Neural Enclave Session**: Generates entropy-seeded session tokens with Ed25519 zero-knowledge proof suites and sets `negrarosa_neural_unit` secure cookies.
- **Hardware Attestation (`sqtidevc`)**: Validates client hardware, binds client IP and platform fingerprints, and emits immutable audit logs.
- **Google Site Verification TXT**: Generates RFC-compliant DNS TXT record strings and SHA-256 URI URN proofs for Google domain verification.
- **W3C DID Documents**: Verifies decentralized identity tokens and verifiable credentials.

---

## 2. Rust Client SDK

The Rust client uses asynchronous Tokio and Reqwest with zero external heavy cryptography dependencies, verifying hashes and signatures directly.

### File Location
`examples/rust-client/src/main.rs`

### Dependencies (`Cargo.toml`)
```toml
[dependencies]
reqwest = { version = "0.12", features = ["json", "cookies"] }
tokio = { version = "1.38", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
sha2 = "0.10"
hex = "0.4"
chrono = { version = "0.4", features = ["serde"] }
```

### Running the Rust Client
```bash
cd examples/rust-client
cargo run
```

---

## 3. Deno Native Client SDK

The Deno implementation requires **zero third-party npm packages**, relying entirely on standard web standards (`fetch`, `crypto.subtle`, `TextEncoder`).

### File Location
`examples/deno-client/client.ts`

### Running the Deno Client
```bash
cd examples/deno-client
deno run --allow-net --allow-env client.ts
```

### Security Permissions
Deno enforces explicit sandboxing:
- `--allow-net`: Grants network access exclusively to the NegraRosa host.
- `--allow-env`: Reads the optional `NEGRAROSA_URL` environment variable.

---

## 4. Google & GitHub Security Standards Compliance

- **Google Webmaster / DNS TXT Verification**: All domains can be verified through `/api/v1/idsec/google-uri-txt` returning `google-site-verification` TXT values.
- **GitHub OIDC to Google Cloud**: Fully keyless deployment without stored service account keys via Workload Identity Federation (`.github/workflows/google-cloud-deploy.yml`).
- **SLSA Level 3 Provenance**: Artifacts signed and traced with OpenSSF Scorecard and SLSA generators.
- **RFC 9116 `security.txt`**: Served directly at `/.well-known/security.txt` and `/security.txt`.
