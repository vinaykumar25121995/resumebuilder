import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { tailorResume, calculateMatchScore, runATSCheck } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { jobAnalysisId, template = "ats-two-column-blue" } = await req.json();

    if (!jobAnalysisId) {
      return NextResponse.json({ error: "Job analysis ID is required" }, { status: 400 });
    }

    const jobAnalysis = await prisma.jobAnalysis.findUnique({ where: { id: jobAnalysisId } });
    if (!jobAnalysis) return NextResponse.json({ error: "Job analysis not found" }, { status: 404 });

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: {
        experiences: true,
        educations: true,
        projects: true,
        skills: true,
        certifications: true,
        achievements: true,
        languages: true,
      }
    });

    if (!profile) return NextResponse.json({ error: "Please complete your master profile first" }, { status: 400 });
    
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });

    // Add user info to profile for AI
    const enrichedProfile = { ...profile, userName: user?.name, userEmail: user?.email };

    const parsedAnalysis = JSON.parse(jobAnalysis.extractedData);
    
    // Run AI tailoring
    const tailoredResumeData = await tailorResume(enrichedProfile, parsedAnalysis);
    
    // Calculate match score
    const matchData = await calculateMatchScore(enrichedProfile, parsedAnalysis);
    
    // Run ATS check
    const atsResult = await runATSCheck(tailoredResumeData, parsedAnalysis);
    
    // Update job analysis with match score
    await prisma.jobAnalysis.update({
      where: { id: jobAnalysisId },
      data: { matchScore: matchData.overallScore }
    });

    // Save to Resumes
    const savedResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: `${jobAnalysis.jobTitle} — ${jobAnalysis.company || 'Company'}`,
        targetJobTitle: jobAnalysis.jobTitle,
        company: jobAnalysis.company,
        jobDescription: jobAnalysis.description,
        template,
        content: JSON.stringify({ ...tailoredResumeData, matchData, atsResult }),
        atsScore: atsResult.overallScore,
        matchScore: matchData.overallScore,
      }
    });

    return NextResponse.json({ 
      resumeId: savedResume.id,
      atsScore: atsResult.overallScore,
      matchScore: matchData.overallScore
    });
  } catch (error: any) {
    console.error("Error tailoring resume:", error);
    return NextResponse.json({ error: error.message || "Failed to tailor resume" }, { status: 500 });
  }
}
