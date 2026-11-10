import { NextResponse } from "next/server";
import { COOKIE_NAME, createSession, validDemoCredentials } from "@/lib/auth";

type LoginBody = { email?: unknown; password?: unknown };
export async function POST(request: Request) {
  let body: LoginBody;
  try { body = await request.json() as LoginBody; } catch { return NextResponse.json({ error: { code: "INVALID_JSON", message: "Geçerli bir JSON isteği gönderin." } }, { status: 400 }); }
  if (typeof body.email !== "string" || typeof body.password !== "string" || !body.email.trim() || !body.password) {
    return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "E-posta ve parola zorunludur." } }, { status: 400 });
  }
  if (!process.env.DEMO_EMAIL || !process.env.DEMO_PASSWORD || !process.env.SESSION_SECRET) {
    return NextResponse.json({ error: { code: "SERVER_CONFIG", message: "Demo giriş bilgileri sunucuda ayarlanmamış." } }, { status: 500 });
  }
  if (!validDemoCredentials(body.email, body.password)) {
    return NextResponse.json({ error: { code: "INVALID_CREDENTIALS", message: "E-posta veya parola hatalı." } }, { status: 401 });
  }
  try {
    const session = createSession(body.email.trim().toLowerCase());
    const response = NextResponse.json({ data: { email: body.email.trim().toLowerCase() } });
    response.cookies.set(COOKIE_NAME, session.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: session.maxAge });
    return response;
  } catch { return NextResponse.json({ error: { code: "SERVER_CONFIG", message: "Oturum güvenliği yapılandırması geçersiz." } }, { status: 500 }); }
}
