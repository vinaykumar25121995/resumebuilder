import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { analyzeJobDescription, calculateMatchScore } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { jobDescription, jobUrl } = await req.json();
    const description = jobDescription || "";

    if (!description.trim()) {
      return NextResponse.json({ error: "Job description is required" }, { status: 400 });
    }

    const analysis = await analyzeJobDescription(description);

    // Get user profile for match score calculation
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: { skills: true, experiences: true, educations: true }
    });

    let matchData = null;
    if (profile) {
      matchData = await calculateMatchScore(profile, analysis);
    }

    const savedAnalysis = await prisma.jobAnalysis.create({
      data: {
        userId: session.user.id,
        jobTitle: analysis.jobTitle || "Unknown Title",
        company: analysis.company || "",
        description,
        extractedData: JSON.stringify({ ...analysis, matchData }),
        matchScore: matchData?.overallScore || null,
      }
    });

    return NextResponse.json({ 
      analysis: {
        ...savedAnalysis,
        parsedData: { ...analysis, matchData }
      }
    });
  } catch (error: any) {
    console.error("Error analyzing job:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze job description" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const analyses = await prisma.jobAnalysis.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true, jobTitle: true, company: true, matchScore: true, createdAt: true }
  });

  return NextResponse.json(analyses);
}
