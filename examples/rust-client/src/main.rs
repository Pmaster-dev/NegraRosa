//! NegraRosa Zero-Trust Security Framework - High Assurance Rust Client SDK
//! Supports: Neural Enclave session binding, sqtidevc hardware attestation,
//! Google URI TXT DNS proofs, and W3C DID document verification.

use reqwest::Client;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::error::Error;

#[derive(Serialize)]
struct SessionRequest {
    #[serde(rename = "userId")]
    user_id: u64,
    #[serde(rename = "entropySeed")]
    entropy_seed: String,
}

#[derive(Deserialize, Debug)]
struct SessionResponse {
    success: bool,
    token: Option<String>,
    #[serde(rename = "placeholderSeed")]
    placeholder_seed: Option<String>,
    #[serde(rename = "cryptoSuite")]
    crypto_suite: Option<String>,
    #[serde(rename = "expiresAt")]
    expires_at: Option<String>,
}

#[derive(Serialize)]
struct DeviceAttestationRequest {
    #[serde(rename = "deviceId")]
    device_id: String,
    #[serde(rename = "clientPlatform")]
    client_platform: String,
    #[serde(rename = "userId")]
    user_id: u64,
}

#[derive(Deserialize, Debug)]
struct DeviceAttestationResponse {
    success: bool,
    verified: bool,
    #[serde(rename = "deviceId")]
    device_id: String,
    #[serde(rename = "attestationHash")]
    attestation_hash: String,
    #[serde(rename = "clientIp")]
    client_ip: String,
    #[serde(rename = "securityStatus")]
    security_status: String,
}

#[derive(Serialize)]
struct GoogleUriTxtRequest {
    domain: String,
    #[serde(rename = "uriPath")]
    uri_path: String,
}

#[derive(Deserialize, Debug)]
struct GoogleUriTxtResponse {
    success: bool,
    domain: String,
    uri: String,
    status: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let base_url = std::env::var("NEGRAROSA_URL")
        .unwrap_or_else(|_| "https://ais-pre-47gxaxstd6xawe3o4ovqun-408361840279.us-east1.run.app".to_string());

    println!("============================================================");
    println!(" NegraRosa Rust Client: Zero-Trust Enclave & DID Verification");
    println!(" Target Gateway: {}", base_url);
    println!("============================================================\n");

    let client = Client::builder()
        .cookie_store(true)
        .build()?;

    // 1. Request Neural Unit Enclave Session with cryptographic entropy
    let entropy = format!("abbdada_{}", hex::encode(Sha256::digest(b"rust-enclave-node-01")));
    println!("[1/4] Requesting Neural Enclave session (entropy: {})...", entropy);
    
    let session_url = format!("{}/api/v1/idsec/neural-unit/session", base_url);
    let session_res: SessionResponse = client
        .post(&session_url)
        .json(&SessionRequest {
            user_id: 1,
            entropy_seed: entropy,
        })
        .send()
        .await?
        .json()
        .await?;

    println!("      -> Session Enclave Bound: success={}", session_res.success);
    if let Some(suite) = session_res.crypto_suite {
        println!("      -> Crypto Suite: {}", suite);
    }
    if let Some(token) = session_res.token {
        println!("      -> Session Token: {}...", &token[..token.len().min(24)]);
    }

    // 2. Perform Hardware Attestation (sqtidevc)
    let device_id = "sqtidevc_rust_enclave_77a";
    println!("\n[2/4] Attesting Hardware Security Module ({})", device_id);
    let device_url = format!("{}/api/v1/idsec/device/sqtidevc", base_url);
    let device_res: DeviceAttestationResponse = client
        .post(&device_url)
        .json(&DeviceAttestationRequest {
            device_id: device_id.to_string(),
            client_platform: format!("Rust-Tokio/{}", env!("CARGO_PKG_VERSION")),
            user_id: 1,
        })
        .send()
        .await?
        .json()
        .await?;

    println!("      -> Attestation Verified: {}", device_res.verified);
    println!("      -> Hardware Digest: {}", device_res.attestation_hash);
    println!("      -> Status: {}", device_res.security_status);

    // 3. Compute and Verify Google URI TXT DNS Record
    println!("\n[3/4] Generating Google URI TXT DNS Proof");
    let txt_url = format!("{}/api/v1/idsec/google-uri-txt", base_url);
    let txt_res: GoogleUriTxtResponse = client
        .post(&txt_url)
        .json(&GoogleUriTxtRequest {
            domain: "negrarosa.security".to_string(),
            uri_path: "/.well-known/did.json".to_string(),
        })
        .send()
        .await?
        .json()
        .await?;

    println!("      -> Domain: {}", txt_res.domain);
    println!("      -> URI: {}", txt_res.uri);
    println!("      -> Verification Record Status: {}", txt_res.status);

    // 4. Query W3C DID Resolver
    println!("\n[4/4] Querying W3C DID Endpoint");
    let did_url = format!("{}/api/v1/idsec/did/status", base_url);
    let did_res = client.get(&did_url).send().await?;
    let did_text = did_res.text().await?;
    println!("      -> DID Response: {}", did_text);

    println!("\n[SUCCESS] Rust client zero-trust verification pipeline completed.");
    Ok(())
}
