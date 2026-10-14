import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const applications = await prisma.applicationTracker.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(applications);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  const app = await prisma.applicationTracker.create({
    data: {
      userId: session.user.id,
      company: data.company,
      jobTitle: data.jobTitle,
      jobUrl: data.jobUrl || null,
      dateApplied: data.dateApplied || null,
      resumeId: data.resumeId || null,
      atsScore: data.atsScore || null,
      status: data.status || 'Saved',
      notes: data.notes || null,
    }
  });

  return NextResponse.json(app);
}
