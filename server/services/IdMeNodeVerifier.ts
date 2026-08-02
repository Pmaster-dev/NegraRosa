import { createHmac, randomBytes, timingSafeEqual } from "crypto";

interface ParsedAssertion {
  email: string;
  issuedAtMs: number;
  nonce: string;
  signatureHex: string;
}

export class IdMeNodeVerifier {
  private usedNonces = new Map<string, number>();

  constructor(
    private readonly sharedSecret: string | undefined,
    private readonly maxAssertionAgeMs: number = 5 * 60 * 1000
  ) {}

  validate(assertion: string, expectedEmail: string): boolean {
    if (!this.sharedSecret) {
      return false;
    }

    const parsed = this.parse(assertion);
    if (!parsed) {
      return false;
    }

    if (parsed.email !== expectedEmail) {
      return false;
    }

    const now = Date.now();
    if (Math.abs(now - parsed.issuedAtMs) > this.maxAssertionAgeMs) {
      return false;
    }

    if (this.isNonceUsed(parsed.nonce, now)) {
      return false;
    }

    const payload = `${parsed.email}:${parsed.issuedAtMs}:${parsed.nonce}`;
    const expectedSig = createHmac("sha256", this.sharedSecret).update(payload).digest("hex");
    if (!this.safeCompareHex(expectedSig, parsed.signatureHex)) {
      return false;
    }

    this.usedNonces.set(parsed.nonce, now + this.maxAssertionAgeMs);
    return true;
  }

  private parse(assertion: string): ParsedAssertion | null {
    const parts = assertion.trim().split(":");
    if (parts.length !== 6 || parts[0] !== "idme" || parts[1] !== "v1") {
      return null;
    }

    const issuedAtMs = Number(parts[3]);
    if (!Number.isFinite(issuedAtMs) || issuedAtMs <= 0) {
      return null;
    }

    const nonce = parts[4];
    if (!/^[a-f0-9]{16,64}$/i.test(nonce)) {
      return null;
    }

    const signatureHex = parts[5];
    if (!/^[a-f0-9]{64}$/i.test(signatureHex)) {
      return null;
    }

    return {
      email: parts[2].trim().toLowerCase(),
      issuedAtMs,
      nonce: nonce.toLowerCase(),
      signatureHex: signatureHex.toLowerCase()
    };
  }

  private isNonceUsed(nonce: string, now: number): boolean {
    for (const [knownNonce, expiresAt] of this.usedNonces.entries()) {
      if (expiresAt <= now) {
        this.usedNonces.delete(knownNonce);
      }
    }
    return this.usedNonces.has(nonce);
  }

  private safeCompareHex(leftHex: string, rightHex: string): boolean {
    const left = Buffer.from(leftHex, "hex");
    const right = Buffer.from(rightHex, "hex");
    if (left.length !== right.length) {
      return false;
    }
    return timingSafeEqual(left, right);
  }

  static createAssertion(email: string, sharedSecret: string, issuedAtMs: number = Date.now()): string {
    const normalizedEmail = email.trim().toLowerCase();
    const nonce = randomBytes(12).toString("hex");
    const payload = `${normalizedEmail}:${issuedAtMs}:${nonce}`;
    const signature = createHmac("sha256", sharedSecret).update(payload).digest("hex");
    return `idme:v1:${normalizedEmail}:${issuedAtMs}:${nonce}:${signature}`;
  }
}
