import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { projects } from "@/lib/data";
export async function GET(request: Request) {
  if (!await getSession()) return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Oturum açmanız gerekiyor." } }, { status: 401 });
  const query = new URL(request.url).searchParams.get("q")?.trim().toLowerCase() ?? "";
  const filtered = projects.filter((project) => [project.name, project.client, project.id, project.status].some((value) => value.toLowerCase().includes(query)));
  return NextResponse.json({ data: filtered });
}
