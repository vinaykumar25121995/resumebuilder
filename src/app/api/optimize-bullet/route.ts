import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { optimizeBulletPoints } from "@/lib/ai";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bullet, jobKeywords } = await req.json();
  if (!bullet) return NextResponse.json({ error: "Bullet point required" }, { status: 400 });

  const result = await optimizeBulletPoints(bullet, jobKeywords || []);
  return NextResponse.json(result);
}
