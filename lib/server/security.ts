import crypto from "crypto";

// Secret salt for HMAC hashing and signing
const HMAC_SECRET = process.env.AUTH_HMAC_SECRET || "sas_bhopal_hmac_secret_key_1989_permanent";

// Rate limiting in-memory bucket: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(ip: string, maxRequests = 25, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((time) => now - time < windowMs);

  if (validTimestamps.length >= maxRequests) {
    rateLimitMap.set(ip, validTimestamps);
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export function sanitizeInput(input: string | undefined | null): string {
  if (!input) return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Strip control characters
    .trim();
}

export const sanitizeText = sanitizeInput;

export function hashSecret(secret: string): string {
  return crypto.createHmac("sha256", HMAC_SECRET).update(secret.trim()).digest("hex");
}

export function verifySecret(secret: string, hashed: string): boolean {
  const testHash = hashSecret(secret);
  return crypto.timingSafeEqual(Buffer.from(testHash), Buffer.from(hashed));
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  // Indian 10-digit mobile or standard 10-11 digit landline
  return /^(?:91)?[6-9]\d{9}$/.test(cleaned) || /^0\d{10}$/.test(cleaned);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function generateToken(payload: object): string {
  const jsonStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(jsonStr).toString("base64url");
  const signature = crypto.createHmac("sha256", HMAC_SECRET).update(base64Payload).digest("base64url");
  return `${base64Payload}.${signature}`;
}

export function verifyToken<T>(token: string): T | null {
  try {
    const [base64Payload, signature] = token.split(".");
    if (!base64Payload || !signature) return null;

    const expectedSig = crypto.createHmac("sha256", HMAC_SECRET).update(base64Payload).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const jsonStr = Buffer.from(base64Payload, "base64url").toString("utf8");
    return JSON.parse(jsonStr) as T;
  } catch {
    return null;
  }
}
