import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { activities, overview } from "@/lib/data";
export async function GET() {
  if (!await getSession()) return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Oturum açmanız gerekiyor." } }, { status: 401 });
  return NextResponse.json({ data: { summary: overview, activities } });
}
