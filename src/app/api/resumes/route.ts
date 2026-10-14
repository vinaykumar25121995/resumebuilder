import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertProfileToResumeData } from "@/lib/profile-converter";
import { runATSCheck } from "@/lib/ai";
import { getTemplateById } from "@/lib/templates";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      targetJobTitle: true,
      company: true,
      atsScore: true,
      matchScore: true,
      template: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(resumes);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { templateId = "ats-classic", title } = body;

    // Fetch user and profile with all nested models
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: {
        experiences: { orderBy: { startDate: "desc" } },
        educations: true,
        projects: true,
        skills: true,
        certifications: true,
        achievements: true,
        languages: true,
      },
    });

    // Convert profile to ResumeData format
    const resumeData = convertProfileToResumeData(profile, user);

    // Calculate ATS score
    const atsResult = await runATSCheck(resumeData, null);

    const templateConfig = getTemplateById(templateId);
    const templateName = templateConfig?.name || "Professional";
    const resumeTitle = title || `${profile?.professionalTitle || user?.name || "My"} Resume (${templateName})`;

    // Create the resume in the database
    const createdResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: resumeTitle,
        targetJobTitle: profile?.professionalTitle || "General",
        company: "General Application",
        template: templateId,
        content: JSON.stringify(resumeData),
        atsScore: atsResult.overallScore,
      },
    });

    return NextResponse.json({
      success: true,
      resumeId: createdResume.id,
      resume: createdResume,
    });
  } catch (error: any) {
    console.error("Error creating resume from profile:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create resume from profile" },
      { status: 500 }
    );
  }
}
