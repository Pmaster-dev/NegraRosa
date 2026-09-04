/**
 * NegraRosa Zero-Trust Security Framework - Native Deno Client SDK
 * Uses zero external npm dependencies, standard Web Crypto APIs, and Deno runtime security.
 * 
 * Run with:
 *   deno run --allow-net --allow-env client.ts
 */

const BASE_URL = Deno.env.get("NEGRAROSA_URL") || 
  "https://ais-pre-47gxaxstd6xawe3o4ovqun-408361840279.us-east1.run.app";

console.log("============================================================");
console.log(" NegraRosa Deno Client: Zero-Trust Enclave & DID Verification");
console.log(" Target Gateway:", BASE_URL);
console.log(" Deno Version:", Deno.version.deno);
console.log("============================================================\n");

// Helper: Compute SHA-256 using standard Web Crypto API
async function sha256Hex(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function runZeroTrustFlow() {
  // 1. Generate cryptographic entropy seed (format: abbdada_*)
  const randomBytes = crypto.getRandomValues(new Uint8Array(16));
  const randomHex = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  const entropySeed = `abbdada_${randomHex}`;
  
  console.log(`[1/4] Requesting Neural Unit Enclave session (seed: ${entropySeed})...`);
  const sessionRes = await fetch(`${BASE_URL}/api/v1/idsec/neural-unit/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      entropySeed
    })
  });

  if (!sessionRes.ok) {
    throw new Error(`Session request failed: ${sessionRes.statusText}`);
  }

  const sessionData = await sessionRes.json();
  console.log("      -> Enclave Session Bound:", sessionData.success);
  console.log("      -> Crypto Suite:", sessionData.cryptoSuite);
  console.log("      -> Token:", sessionData.token?.substring(0, 24) + "...");
  
  // Extract session cookie if present
  const setCookie = sessionRes.headers.get("set-cookie");
  const cookieHeader = setCookie ? { "Cookie": setCookie.split(';')[0] } : {};

  // 2. Perform Hardware Attestation (sqtidevc)
  const deviceId = `sqtidevc_deno_${randomHex.substring(0, 6)}`;
  console.log(`\n[2/4] Attesting Hardware Device Profile (${deviceId})...`);
  
  const deviceRes = await fetch(`${BASE_URL}/api/v1/idsec/device/sqtidevc`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...cookieHeader
    },
    body: JSON.stringify({
      deviceId,
      clientPlatform: `Deno/${Deno.version.deno} (${Deno.build.target})`,
      userId: 1
    })
  });

  const deviceData = await deviceRes.json();
  console.log("      -> Hardware Attestation Verified:", deviceData.verified);
  console.log("      -> Digest Hash:", deviceData.attestationHash);
  console.log("      -> Security Status:", deviceData.securityStatus);

  // 3. Google Site Verification & DNS TXT Proof Generation
  console.log("\n[3/4] Requesting Google URI TXT DNS Proof Record...");
  const txtRes = await fetch(`${BASE_URL}/api/v1/idsec/google-uri-txt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      domain: "negrarosa.security",
      uriPath: "/.well-known/did.json"
    })
  });

  const txtData = await txtRes.json();
  console.log("      -> Domain:", txtData.domain);
  console.log("      -> TXT Record:", txtData.txtRecord?.value);
  console.log("      -> Proof Hash:", txtData.hashProof?.uriProofHash);

  // 4. Query Root Status & Verification Engine
  console.log("\n[4/4] Verifying Core ID Sec Service State...");
  const statusRes = await fetch(`${BASE_URL}/api/v1/idsec/status`);
  const statusData = await statusRes.json();
  console.log("      -> Engine Status:", statusData.status);
  console.log("      -> Neural Enclave Active:", statusData.components?.neuralEnclave);
  console.log("      -> Device Attestation Module:", statusData.components?.sqtidevcAttestation);

  console.log("\n[SUCCESS] Deno native zero-trust verification pipeline completed.");
}

if (import.meta.main) {
  runZeroTrustFlow().catch((err) => {
    console.error("Pipeline failed:", err);
    Deno.exit(1);
  });
}
