"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ApiError = { error?: { message?: string } };
export default function LoginForm() {
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false); const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setBusy(true);
    const form = new FormData(event.currentTarget); const email = String(form.get("email") ?? "").trim(); const password = String(form.get("password") ?? "");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) { setError("Geçerli bir e-posta ve parola girin."); setBusy(false); return; }
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const result = await response.json() as ApiError;
      if (!response.ok) { setError(result.error?.message ?? "Giriş yapılamadı. Tekrar deneyin."); setBusy(false); return; }
      router.replace("/dashboard"); router.refresh();
    } catch { setError("Sunucuya ulaşılamadı. Bağlantınızı kontrol edin."); setBusy(false); }
  }
  return <form className="login-form" onSubmit={submit} noValidate><h1>Welcome back</h1><p className="login-subtitle">Sign in to your Projectspace account.</p>{error && <p className="error-note" role="alert">{error}</p>}<label className="field"><span>Email address</span><input type="email" name="email" autoComplete="username" placeholder="you@company.com" required /></label><label className="field"><span>Password</span><input type="password" name="password" autoComplete="current-password" placeholder="Enter your password" required /></label><button className="button button-dark login-submit" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button><p className="form-help">Use the demo email and password set in your <code>.env.local</code> file.</p></form>;
}
