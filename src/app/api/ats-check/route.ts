import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { runATSCheck } from "@/lib/ai";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resumeData, jobAnalysis } = await req.json();
  
  if (!resumeData) return NextResponse.json({ error: "Resume data required" }, { status: 400 });

  const result = await runATSCheck(resumeData, jobAnalysis);
  return NextResponse.json(result);
}
