"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function SettingsPage() {
  const router = useRouter(); const [busy, setBusy] = useState(false);
  async function logout() { setBusy(true); try { await fetch("/api/auth/logout", { method: "POST" }); } finally { router.replace("/login"); router.refresh(); } }
  // The profile is supplied from the cookie-backed session by the authenticated shell.
  return <SettingsContent onLogout={logout} busy={busy} />;
}
function SettingsContent({ onLogout, busy }: { onLogout: () => void; busy: boolean }) {
  const [email, setEmail] = useState("");
  useEffect(() => { fetch("/api/auth/me").then((response) => response.json()).then((result: { data?: { email?: string } }) => setEmail(result.data?.email ?? "")).catch(() => setEmail("")); }, []);
  return <><header className="topline"><div><div className="eyebrow">Workspace</div><h1 className="page-title">Settings</h1></div></header><section className="panel settings-card"><div className="section-head" style={{ marginBottom: 3 }}><h2>Profile</h2></div><p className="settings-note">Your account information for this workspace.</p><div className="profile-row"><span className="profile-label">Email address</span><span className="profile-value">{email || "Loading…"}</span></div><div className="profile-row"><span className="profile-label">Workspace</span><span className="profile-value">Personal workspace</span></div><div className="profile-row"><span className="profile-label">Account type</span><span className="profile-value">Demo account</span></div><div style={{ paddingTop: 22 }}><button type="button" className="button button-danger" onClick={onLogout} disabled={busy}>{busy ? "Signing out…" : "Sign out"}</button></div></section></>;
}
