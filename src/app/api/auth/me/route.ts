import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Oturum açmanız gerekiyor." } }, { status: 401 });
  return NextResponse.json({ data: { email: session.email } });
}
