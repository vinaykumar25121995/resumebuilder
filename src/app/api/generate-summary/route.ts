import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateProfessionalSummary } from "@/lib/ai";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { jobAnalysis } = await req.json();

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: { experiences: true, skills: true, educations: true }
  });

  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const result = await generateProfessionalSummary(profile, jobAnalysis || {});
  return NextResponse.json(result);
}
