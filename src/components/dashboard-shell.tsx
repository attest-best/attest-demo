"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

const items = [{ href: "/dashboard", label: "Overview", icon: "▦" }, { href: "/dashboard/projects", label: "Projects", icon: "◇" }, { href: "/dashboard/settings", label: "Settings", icon: "⚙" }];
export default function DashboardShell({ email, children }: { email: string; children: ReactNode }) {
  const pathname = usePathname(); const router = useRouter(); const [loggingOut, setLoggingOut] = useState(false);
  async function logout() { setLoggingOut(true); try { await fetch("/api/auth/logout", { method: "POST" }); } finally { router.replace("/login"); router.refresh(); } }
  return <div className="shell"><aside className="sidebar"><Link href="/dashboard" className="brand" style={{ textDecoration: "none" }}><span className="brand-mark">P</span>Projectspace</Link><p className="nav-label">WORKSPACE</p><nav aria-label="Main navigation">{items.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${pathname === item.href ? "active" : ""}`} aria-current={pathname === item.href ? "page" : undefined}><span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}</Link>)}</nav><div className="workspace"><span className="avatar">{email.slice(0, 1).toUpperCase()}</span><div className="workspace-copy"><strong>{email.split("@")[0]}</strong><span>Personal workspace</span></div><button aria-label="Sign out" title="Sign out" className="button" onClick={logout} disabled={loggingOut} style={{ padding: "6px 8px" }}>↗</button></div></aside><main className="main">{children}</main></div>;
}
