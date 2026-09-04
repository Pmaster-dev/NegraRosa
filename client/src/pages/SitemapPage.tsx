import React, { useState } from "react";
import { Link } from "wouter";
import { 
  Globe, 
  FileCode, 
  Shield, 
  Key, 
  Terminal, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  FolderTree, 
  Lock, 
  Server, 
  Cpu, 
  Layers, 
  FileText, 
  CheckCircle2, 
  Code2, 
  Github,
  Download
} from "lucide-react";

export default function SitemapPage() {
  const [activeTab, setActiveTab] = useState<"sitemap" | "google-sec" | "github-sec" | "rust-sdk" | "deno-sdk">("sitemap");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const sitemapRoutes = [
    {
      category: "Core Navigation",
      items: [
        { title: "Home Dashboard", path: "/", desc: "Primary security center, trust metrics & activity stream" },
        { title: "For Organizations (Mainframe)", path: "/mainframe", desc: "Enterprise tenant administration, risk monitoring & team credentials" },
        { title: "Individual ID System", path: "/individual-id", desc: "Decentralized DID credentials, biometric & visual proof management" },
        { title: "Disaster Recovery & Stolen Phone", path: "/disaster-recovery", desc: "Unhackable zero-knowledge recovery, 1-click remote killswitch & low-cost emergency plans" },
        { title: "Pricing & Plans", path: "/pricing", desc: "Tiered subscription tiers for individual and enterprise deployments (starting at $0)" },
        { title: "Interactive Security Demo", path: "/demo", desc: "Hands-on simulation of zero-trust verification flows" },
      ]
    },
    {
      category: "Inclusive Accessibility",
      items: [
        { title: "Voice & Visual Guidance", path: "/accessibility", desc: "WCAG 2.2 AAA certified screen assistance & ASL video guides" },
        { title: "DeafAuth™ Sign & Haptic Security", path: "/accessibility#deafauth", desc: "Tactile frequency and sign-gesture zero-trust authentication" },
        { title: "ASL Security Glossary", path: "/accessibility#glossary", desc: "Visual dictionary of cryptographic & identity terminology" },
      ]
    },
    {
      category: "Developer & Integration",
      items: [
        { title: "Webhook Management", path: "/webhooks", desc: "Event dispatchers, HMAC-SHA256 signature verification & payload delivery" },
        { title: "ID Sec Status & Health", path: "/api/v1/idsec/status", desc: "Real-time health monitor for neural enclave & attestation engine", external: true },
        { title: "W3C DID Document", path: "/api/v1/idsec/did/status", desc: "W3C decentralized identifier discovery schema", external: true },
        { title: "Emergency Disaster Recovery Plans API", path: "/api/v1/idsec/emergency/plans", desc: "Low-cost & free zero-knowledge disaster and stolen phone plans endpoint", external: true },
        { title: "Google TXT Proof Generator", path: "/api/v1/idsec/google-uri-txt", desc: "DNS TXT & URI SHA-256 validation proof generator", external: true },
      ]
    },
    {
      category: "Security Standards & SEO Feeds",
      items: [
        { title: "Sitemap XML Feed", path: "/sitemap.xml", desc: "Standard XML sitemap for search crawlers & indexers", external: true },
        { title: "Robots Configuration", path: "/robots.txt", desc: "Crawler access permissions & sitemap directive", external: true },
        { title: "Security Vulnerability Policy (RFC 9116)", path: "/.well-known/security.txt", desc: "Standardized vulnerability disclosure contact & PGP encryption", external: true },
        { title: "GitHub Security Advisory Center", path: "https://github.com/NegraRosa/negrarosa-security-framework/security", desc: "Vulnerability reporting, automated alerts & patch history", external: true },
      ]
    }
  ];

  const rustCodeSnippet = `// Cargo.toml
// [dependencies]
// reqwest = { version = "0.12", features = ["json", "cookies"] }
// tokio = { version = "1.38", features = ["full"] }
// serde = { version = "1.0", features = ["derive"] }
// sha2 = "0.10"
// hex = "0.4"

use reqwest::Client;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

#[derive(Serialize)]
struct SessionReq {
    #[serde(rename = "userId")]
    user_id: u64,
    #[serde(rename = "entropySeed")]
    entropy_seed: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let base_url = "https://ais-pre-47gxaxstd6xawe3o4ovqun-408361840279.us-east1.run.app";
    let client = Client::builder().cookie_store(true).build()?;

    // 1. Request Neural Unit Enclave Session with entropy seed
    let seed = format!("abbdada_{}", hex::encode(Sha256::digest(b"rust-enclave-node-01")));
    let res = client
        .post(&format!("{}/api/v1/idsec/neural-unit/session", base_url))
        .json(&SessionReq { user_id: 1, entropy_seed: seed })
        .send().await?;

    println!("Session Created: {:?}", res.status());

    // 2. Hardware Attestation (sqtidevc)
    let attest_res = client
        .post(&format!("{}/api/v1/idsec/device/sqtidevc", base_url))
        .json(&serde_json::json!({
            "deviceId": "sqtidevc_rust_77a",
            "clientPlatform": "Rust-Tokio/Linux-x86_64",
            "userId": 1
        }))
        .send().await?;

    println!("Attestation: {}", attest_res.text().await?);
    Ok(())
}`;

  const denoCodeSnippet = `/**
 * NegraRosa Native Deno SDK (Zero External Dependencies)
 * Run: deno run --allow-net client.ts
 */

const BASE_URL = "https://ais-pre-47gxaxstd6xawe3o4ovqun-408361840279.us-east1.run.app";

// 1. Generate cryptographic entropy seed (format: abbdada_*)
const randomBytes = crypto.getRandomValues(new Uint8Array(16));
const randomHex = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
const entropySeed = \`abbdada_\${randomHex}\`;

console.log("Binding to NegraRosa Enclave with seed:", entropySeed);

// 2. Request Neural Unit Session
const sessionRes = await fetch(\`\${BASE_URL}/api/v1/idsec/neural-unit/session\`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userId: 1, entropySeed })
});

const session = await sessionRes.json();
console.log("Session verified:", session.success, "Suite:", session.cryptoSuite);

// 3. Hardware Device Profile Attestation (sqtidevc)
const deviceRes = await fetch(\`\${BASE_URL}/api/v1/idsec/device/sqtidevc\`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    deviceId: \`sqtidevc_deno_\${randomHex.substring(0, 6)}\`,
    clientPlatform: \`Deno/\${Deno.version.deno} (\${Deno.build.target})\`,
    userId: 1
  })
});

const deviceData = await deviceRes.json();
console.log("Device Attestation Status:", deviceData.securityStatus, "Digest:", deviceData.attestationHash);`;

  const googleSecSnippet = `// Google Site Verification DNS TXT Record & SHA-256 URI Proof
// Generated via NegraRosa /api/v1/idsec/google-uri-txt

{
  "domain": "negrarosa.security",
  "uriPath": "/.well-known/did.json",
  "txtRecord": {
    "type": "TXT",
    "host": "@",
    "value": "google-site-verification=nr_77a94f83bc128e4d2994f83bc128e4d2",
    "ttl": 3600
  },
  "hashProof": {
    "algorithm": "SHA-256",
    "digestHex": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "uriProofHash": "urn:sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  "status": "ACTIVE"
}

// Google Cloud Run Keyless OIDC Authentication (Workload Identity Federation)
// No stored service account keys - authenticate using ephemeral tokens:
// .github/workflows/google-cloud-deploy.yml
- name: Authenticate to Google Cloud
  uses: google-github-actions/auth@v2
  with:
    project_id: 'negrarosa-security-2026'
    workload_identity_provider: 'projects/408361840279/locations/global/workloadIdentityPools/github-pool/providers/github-provider'
    service_account: 'github-deployer@negrarosa-security-2026.iam.gserviceaccount.com'`;

  const githubSecSnippet = `# GitHub Actions SLSA Level 3 Provenance & OpenSSF Scorecard
# .github/workflows/slsa-provenance.yml

name: SLSA Level 3 Provenance
on:
  release:
    types: [created]

permissions: read-all

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      hash: \${{ steps.hash.outputs.digest }}
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - id: hash
        run: |
          tar -czf dist.tar.gz dist/
          echo "digest=$(sha256sum dist.tar.gz | cut -d ' ' -f 1)" >> "$GITHUB_OUTPUT"

  provenance:
    needs: [build]
    permissions:
      id-token: write
      contents: write
    uses: slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@v2.0.0
    with:
      base64-subjects: "\${{ needs.build.outputs.hash }}"
      upload-assets: true`;

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-border mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <FolderTree className="h-6 w-6" />
            </span>
            <h1 className="text-3xl font-bold tracking-tight">Site Map & Modern Security Hub</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Complete navigation index, canonical XML feeds, RFC 9116 security policies, 
            and official SDK integration guides for <strong>Google Zero-Trust</strong>, <strong>GitHub Actions</strong>, <strong>Rust</strong>, and <strong>Deno</strong>.
          </p>
        </div>

        {/* Action Badges */}
        <div className="flex flex-wrap gap-2">
          <a
            href="https://github.com/NegraRosa/negrarosa-security-framework"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Github className="h-4 w-4" />
            GitHub Repository
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-border bg-card hover:bg-muted transition-colors"
          >
            <Globe className="h-4 w-4 text-blue-500" />
            sitemap.xml
          </a>
          <a
            href="/.well-known/security.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-border bg-card hover:bg-muted transition-colors"
          >
            <Shield className="h-4 w-4 text-emerald-500" />
            security.txt
          </a>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex space-x-2 border-b border-border mb-8 overflow-x-auto scrollbar-thin">
        <button
          onClick={() => setActiveTab("sitemap")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === "sitemap" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FolderTree className="h-4 w-4" />
          Site Map Directory
        </button>
        <button
          onClick={() => setActiveTab("google-sec")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === "google-sec" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Globe className="h-4 w-4 text-blue-500" />
          Google Security (TXT / WIF)
        </button>
        <button
          onClick={() => setActiveTab("github-sec")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === "github-sec" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Github className="h-4 w-4" />
          GitHub Security (SLSA / Scorecard)
        </button>
        <button
          onClick={() => setActiveTab("rust-sdk")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === "rust-sdk" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Cpu className="h-4 w-4 text-orange-500" />
          Rust Client SDK
        </button>
        <button
          onClick={() => setActiveTab("deno-sdk")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === "deno-sdk" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Terminal className="h-4 w-4 text-emerald-500" />
          Deno Native Client
        </button>
      </div>

      {/* TAB 1: SITEMAP DIRECTORY */}
      {activeTab === "sitemap" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sitemapRoutes.map((section, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="group">
                      {item.external ? (
                        <a 
                          href={item.path} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-start justify-between p-2 -mx-2 rounded-md hover:bg-muted/70 transition-colors"
                        >
                          <div>
                            <div className="text-sm font-medium text-primary group-hover:underline flex items-center gap-1.5">
                              {item.title}
                              <ExternalLink className="h-3 w-3 opacity-60" />
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            {item.path.startsWith("http") ? "ext" : item.path}
                          </span>
                        </a>
                      ) : (
                        <Link 
                          href={item.path}
                          className="flex items-start justify-between p-2 -mx-2 rounded-md hover:bg-muted/70 transition-colors"
                        >
                          <div>
                            <div className="text-sm font-medium text-primary group-hover:underline">
                              {item.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            {item.path}
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Canonical Download Card */}
          <div className="bg-muted/40 border border-border rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold">Webmaster & Compliance Declarations</h3>
              <p className="text-sm text-muted-foreground">
                All feeds strictly comply with W3C XML, Google Webmaster requirements, and RFC 9116 standards.
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href="/sitemap.xml" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-xs font-semibold rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Download sitemap.xml
              </a>
              <a 
                href="/.well-known/security.txt" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-xs font-semibold rounded border border-border bg-card hover:bg-muted transition-colors inline-flex items-center gap-1.5"
              >
                <FileText className="h-3.5 w-3.5" />
                View security.txt
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GOOGLE SECURITY ARCHITECTURE */}
      {activeTab === "google-sec" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Google Domain Verification & Keyless Workload Identity Federation
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Integrates Google Site Verification TXT records, Google Identity Services (GSI) zero-trust token exchange, and keyless Cloud Run deployments.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(googleSecSnippet, "google-sec")}
                className="p-2 border border-border rounded-md hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                {copiedSection === "google-sec" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Example
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-md border bg-muted/30">
                <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">DNS Standard</div>
                <div className="text-sm font-mono font-medium">TXT @ google-site-verification</div>
                <p className="text-xs text-muted-foreground mt-1">Cryptographic proof verified via <code>/api/v1/idsec/google-uri-txt</code></p>
              </div>
              <div className="p-4 rounded-md border bg-muted/30">
                <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">Auth Protocol</div>
                <div className="text-sm font-mono font-medium">OIDC / Google GSI JWT</div>
                <p className="text-xs text-muted-foreground mt-1">Bearer token authorization without third-party cookie exposure</p>
              </div>
              <div className="p-4 rounded-md border bg-muted/30">
                <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">Cloud Deployment</div>
                <div className="text-sm font-mono font-medium">Workload Identity Pool</div>
                <p className="text-xs text-muted-foreground mt-1">Zero static service account keys; dynamic federated tokens</p>
              </div>
            </div>

            <pre className="p-4 rounded-lg bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed">
              {googleSecSnippet}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: GITHUB SECURITY ARCHITECTURE */}
      {activeTab === "github-sec" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  GitHub Security: SLSA Level 3, OpenSSF Scorecard & Dependabot
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Continuous supply-chain protection with immutable build provenance, cryptographic SARIF scanning, and zero-secret CI/CD.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(githubSecSnippet, "github-sec")}
                className="p-2 border border-border rounded-md hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                {copiedSection === "github-sec" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Example
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <a 
                href="https://github.com/NegraRosa/negrarosa-security-framework" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 rounded-md border bg-muted/30 hover:bg-muted/60 transition-colors block group"
              >
                <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">GitHub Org</div>
                <div className="text-sm font-medium group-hover:text-primary flex items-center gap-1">
                  NegraRosa / Framework
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Source repository, pull requests, and releases</p>
              </a>
              <a 
                href="https://github.com/NegraRosa/negrarosa-security-framework/security/policy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 rounded-md border bg-muted/30 hover:bg-muted/60 transition-colors block group"
              >
                <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">Policy</div>
                <div className="text-sm font-medium group-hover:text-primary flex items-center gap-1">
                  SECURITY.md
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">48h vulnerability response SLA & coordinated disclosure</p>
              </a>
              <div className="p-4 rounded-md border bg-muted/30">
                <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">SLSA Framework</div>
                <div className="text-sm font-mono font-medium">Level 3 Provenance</div>
                <p className="text-xs text-muted-foreground mt-1">Automated non-forgeable build attestations</p>
              </div>
            </div>

            <pre className="p-4 rounded-lg bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed">
              {githubSecSnippet}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 4: RUST CLIENT SDK */}
      {activeTab === "rust-sdk" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-orange-500" />
                  High-Assurance Rust Client SDK
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Native Rust daemon integration with asynchronous Tokio, Reqwest, and hardware attestation (<code>sqtidevc</code>).
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(rustCodeSnippet, "rust-sdk")}
                className="p-2 border border-border rounded-md hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                {copiedSection === "rust-sdk" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Rust Code
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-muted/40 rounded-md mb-4 text-xs flex items-center justify-between">
              <div>
                <strong>File Location:</strong> <code>examples/rust-client/src/main.rs</code>
              </div>
              <span className="text-muted-foreground font-mono">Edition 2021 | Tokio 1.38</span>
            </div>

            <pre className="p-4 rounded-lg bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed max-h-[550px]">
              {rustCodeSnippet}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 5: DENO CLIENT SDK */}
      {activeTab === "deno-sdk" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-emerald-500" />
                  Native Deno Client SDK (Zero npm Dependencies)
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Uses modern standard Web Crypto APIs (<code>crypto.subtle</code>), native TypeScript, and granular Deno security sandboxing.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(denoCodeSnippet, "deno-sdk")}
                className="p-2 border border-border rounded-md hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                {copiedSection === "deno-sdk" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Deno Code
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-muted/40 rounded-md mb-4 text-xs flex items-center justify-between">
              <div>
                <strong>Run command:</strong> <code>deno run --allow-net --allow-env client.ts</code>
              </div>
              <span className="text-muted-foreground font-mono">Deno 1.x/2.x | Zero npm bloat</span>
            </div>

            <pre className="p-4 rounded-lg bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed max-h-[550px]">
              {denoCodeSnippet}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
