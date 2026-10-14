import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [resumesCount, jobsAnalyzed, recentResumes, profile] = await Promise.all([
    prisma.resume.count({ where: { userId: session.user.id } }),
    prisma.jobAnalysis.count({ where: { userId: session.user.id } }),
    prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, targetJobTitle: true, company: true, atsScore: true, matchScore: true, updatedAt: true }
    }),
    prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: { experiences: true, educations: true, projects: true, skills: true, certifications: true, achievements: true, languages: true }
    })
  ]);

  // Calculate profile completion
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  let completion = 0;
  if (user?.name) completion += 10;
  if (user?.email) completion += 5;
  if (profile) {
    if (profile.professionalTitle) completion += 10;
    if (profile.summary && profile.summary.length > 50) completion += 15;
    if (profile.phone) completion += 5;
    if (profile.city) completion += 5;
    if (profile.educations.length > 0) completion += 15;
    if (profile.experiences.length > 0) completion += 15;
    if (profile.skills.length > 0) completion += 10;
    if (profile.projects.length > 0) completion += 10;
  }

  // Calculate average ATS score
  const allResumes = await prisma.resume.findMany({ where: { userId: session.user.id }, select: { atsScore: true, matchScore: true } });
  const avgAts = allResumes.length > 0 ? Math.round(allResumes.reduce((a, r) => a + (r.atsScore || 0), 0) / allResumes.length) : 0;
  const highestMatch = allResumes.length > 0 ? Math.max(...allResumes.map(r => r.matchScore || 0)) : 0;

  return NextResponse.json({
    resumesCount,
    jobsAnalyzed,
    profileCompletion: Math.min(100, completion),
    avgAtsScore: avgAts,
    highestMatch,
    recentResumes,
  });
}
