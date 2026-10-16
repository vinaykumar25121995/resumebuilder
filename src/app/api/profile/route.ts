import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: {
      experiences: { orderBy: { startDate: 'desc' } },
      educations: true,
      projects: true,
      skills: true,
      certifications: true,
      achievements: true,
      languages: true,
    }
  });

  if (!profile) {
    profile = await prisma.profile.create({
      data: { userId: session.user.id },
      include: { experiences: true, educations: true, projects: true, skills: true, certifications: true, achievements: true, languages: true }
    });
  }
  
  // Also get user's name and email for personal info
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  return NextResponse.json({ ...profile, userName: user?.name, userEmail: user?.email });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  
  // Find or create profile
  let profileRecord = await prisma.profile.findUnique({ where: { userId: session.user.id } });
  if (!profileRecord) {
    profileRecord = await prisma.profile.create({ data: { userId: session.user.id } });
  }
  const profileId = profileRecord.id;

  // Use a transaction for atomicity
  await prisma.$transaction(async (tx) => {
    // Update root profile fields
    await tx.profile.update({
      where: { id: profileId },
      data: {
        professionalTitle: data.professionalTitle,
        summary: data.summary,
        city: data.city,
        state: data.state,
        country: data.country,
        phone: data.phone,
        linkedinUrl: data.linkedinUrl,
        githubUrl: data.githubUrl,
        portfolioUrl: data.portfolioUrl,
        photoUrl: data.photoUrl,
        customLinks: data.customLinks ? (typeof data.customLinks === "string" ? data.customLinks : JSON.stringify(data.customLinks)) : null,
      }
    });
    
    // Also update user name if provided
    if (data.fullName) {
      await tx.user.update({ where: { id: session.user.id }, data: { name: data.fullName } });
    }

    // Replace nested experiences
    if (data.experiences !== undefined) {
      await tx.experience.deleteMany({ where: { profileId } });
      if (data.experiences.length > 0) {
        await tx.experience.createMany({
          data: data.experiences.map((exp: any) => ({
            profileId,
            company: exp.company,
            jobTitle: exp.jobTitle,
            location: exp.location || null,
            startDate: exp.startDate || null,
            endDate: exp.endDate || null,
            responsibilities: exp.responsibilities || null,
            achievements: exp.achievements || null,
            technologies: exp.technologies || null,
          }))
        });
      }
    }

    // Replace nested educations
    if (data.educations !== undefined) {
      await tx.education.deleteMany({ where: { profileId } });
      if (data.educations.length > 0) {
        await tx.education.createMany({
          data: data.educations.map((edu: any) => ({
            profileId,
            degree: edu.degree,
            institution: edu.institution,
            fieldOfStudy: edu.fieldOfStudy || null,
            startDate: edu.startDate || null,
            endDate: edu.endDate || null,
            score: edu.score || null,
            location: edu.location || null,
          }))
        });
      }
    }

    // Replace nested projects
    if (data.projects !== undefined) {
      await tx.project.deleteMany({ where: { profileId } });
      if (data.projects.length > 0) {
        await tx.project.createMany({
          data: data.projects.map((proj: any) => ({
            profileId,
            name: proj.name,
            description: proj.description || null,
            technologies: proj.technologies || null,
            results: proj.results || null,
            url: proj.url || null,
          }))
        });
      }
    }

    // Replace nested skills
    if (data.skills !== undefined) {
      await tx.skill.deleteMany({ where: { profileId } });
      if (data.skills.length > 0) {
        await tx.skill.createMany({
          data: data.skills.map((skill: any) => ({
            profileId,
            name: typeof skill === 'string' ? skill : skill.name,
            category: skill.category || null,
          }))
        });
      }
    }

    // Replace certifications
    if (data.certifications !== undefined) {
      await tx.certification.deleteMany({ where: { profileId } });
      if (data.certifications.length > 0) {
        await tx.certification.createMany({
          data: data.certifications.map((cert: any) => ({
            profileId,
            name: cert.name,
            issuer: cert.issuer,
            date: cert.date || null,
            url: cert.url || null,
          }))
        });
      }
    }
    
    // Replace achievements
    if (data.achievements !== undefined) {
      await tx.achievement.deleteMany({ where: { profileId } });
      if (data.achievements.length > 0) {
        await tx.achievement.createMany({
          data: data.achievements.map((ach: any) => ({
            profileId,
            title: ach.title,
            description: ach.description || null,
          }))
        });
      }
    }
    
    // Replace languages
    if (data.languages !== undefined) {
      await tx.language.deleteMany({ where: { profileId } });
      if (data.languages.length > 0) {
        await tx.language.createMany({
          data: data.languages.map((lang: any) => ({
            profileId,
            name: lang.name,
            proficiency: lang.proficiency || null,
          }))
        });
      }
    }
  });

  const updatedProfile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: { experiences: true, educations: true, projects: true, skills: true, certifications: true, achievements: true, languages: true }
  });
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  return NextResponse.json({ ...updatedProfile, userName: user?.name, userEmail: user?.email });
}
