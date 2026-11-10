import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "@/components/login-form";
export default async function LoginPage() { if (await getSession()) redirect("/dashboard"); return <main className="login-page"><section className="login-story"><div className="brand"><span className="brand-mark">P</span>Projectspace</div><div className="story-content"><h2 className="story-title">Good work starts with a clear view.</h2><p className="story-copy">Keep your projects moving, your team in sync, and the details right where you need them.</p></div><div className="story-foot">A calmer way to get work done.</div></section><section className="login-form-wrap"><LoginForm /></section></main>; }
