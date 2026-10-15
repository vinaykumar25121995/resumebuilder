import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user?.id;
    if (!userId) {
      return NextResponse.json({
        resumesCount: 0,
        jobsAnalyzed: 0,
        profileCompletion: 40,
        avgAtsScore: 0,
        highestMatch: 0,
        recentResumes: [],
      });
    }

    let resumesCount = 0;
    let jobsAnalyzed = 0;
    let recentResumes: any[] = [];
    let profile: any = null;
    let allResumes: any[] = [];

    try {
      [resumesCount, jobsAnalyzed, recentResumes, profile, allResumes] =
        await Promise.all([
          prisma.resume.count({ where: { userId } }),
          prisma.jobAnalysis.count({ where: { userId } }),
          prisma.resume.findMany({
            where: { userId },
            orderBy: { updatedAt: "desc" },
            take: 5,
            select: {
              id: true,
              title: true,
              targetJobTitle: true,
              company: true,
              atsScore: true,
              matchScore: true,
              updatedAt: true,
            },
          }),
          prisma.profile.findUnique({
            where: { userId },
            include: {
              experiences: true,
              educations: true,
              projects: true,
              skills: true,
              certifications: true,
              achievements: true,
              languages: true,
            },
          }),
          prisma.resume.findMany({
            where: { userId },
            select: { atsScore: true, matchScore: true },
          }),
        ]);
    } catch (dbErr) {
      console.warn("Prisma dashboard query error caught gracefully:", dbErr);
    }

    // Calculate profile completion
    let completion = 25; // Base completion for having an account
    if (session.user?.name) completion += 10;
    if (session.user?.email) completion += 10;
    if (profile) {
      if (profile.professionalTitle) completion += 10;
      if (profile.summary && profile.summary.length > 50) completion += 15;
      if (profile.phone) completion += 5;
      if (profile.city) completion += 5;
      if (profile.educations?.length > 0) completion += 10;
      if (profile.experiences?.length > 0) completion += 10;
      if (profile.skills?.length > 0) completion += 10;
      if (profile.projects?.length > 0) completion += 10;
    }

    // Calculate average ATS score
    const avgAts =
      allResumes.length > 0
        ? Math.round(
            allResumes.reduce((a, r) => a + (r.atsScore || 0), 0) /
              allResumes.length
          )
        : 0;
    const highestMatch =
      allResumes.length > 0
        ? Math.max(...allResumes.map((r) => r.matchScore || 0))
        : 0;

    return NextResponse.json({
      resumesCount,
      jobsAnalyzed,
      profileCompletion: Math.min(100, completion),
      avgAtsScore: avgAts,
      highestMatch,
      recentResumes,
    });
  } catch (error: any) {
    console.error("Dashboard API handler caught error:", error);
    return NextResponse.json({
      resumesCount: 0,
      jobsAnalyzed: 0,
      profileCompletion: 40,
      avgAtsScore: 0,
      highestMatch: 0,
      recentResumes: [],
    });
  }
}
