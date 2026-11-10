import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE_NAME = "project_dashboard_session";
const MAX_AGE = 60 * 60 * 24 * 7;
export type Session = { email: string; expiresAt: number };

function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET must contain at least 32 characters.");
  return value;
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createSession(email: string): { token: string; maxAge: number } {
  const payload = Buffer.from(JSON.stringify({ email, expiresAt: Date.now() + MAX_AGE * 1000 } satisfies Session)).toString("base64url");
  return { token: `${payload}.${sign(payload)}`, maxAge: MAX_AGE };
}

export function readSession(token?: string): Session | null {
  if (!token) return null;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;
  try {
    const expected = Buffer.from(sign(payload));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Session;
    if (typeof session.email !== "string" || typeof session.expiresAt !== "number" || session.expiresAt < Date.now()) return null;
    return session;
  } catch { return null; }
}

export async function getSession(): Promise<Session | null> {
  return readSession((await cookies()).get(COOKIE_NAME)?.value);
}

export function validDemoCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.DEMO_EMAIL;
  const expectedPassword = process.env.DEMO_PASSWORD;
  if (!expectedEmail || !expectedPassword) return false;
  const a = Buffer.from(email.trim().toLowerCase());
  const b = Buffer.from(expectedEmail.trim().toLowerCase());
  const c = Buffer.from(password);
  const d = Buffer.from(expectedPassword);
  return a.length === b.length && c.length === d.length && timingSafeEqual(a, b) && timingSafeEqual(c, d);
}
