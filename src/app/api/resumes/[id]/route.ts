import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { id } = await params;

  const resume = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
    include: { versions: { orderBy: { createdAt: 'desc' } } }
  });

  if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(resume);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { id } = await params;
  const data = await req.json();

  // Save current as a version before updating
  const existing = await prisma.resume.findFirst({ where: { id, userId: session.user.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  
  await prisma.resumeVersion.create({
    data: {
      resumeId: id,
      content: existing.content,
      atsScore: existing.atsScore,
      matchScore: existing.matchScore,
    }
  });

  const updated = await prisma.resume.update({
    where: { id },
    data: {
      content: data.content ? JSON.stringify(data.content) : existing.content,
      atsScore: data.atsScore ?? existing.atsScore,
      matchScore: data.matchScore ?? existing.matchScore,
      template: data.template ?? existing.template,
      title: data.title ?? existing.title,
    }
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { id } = await params;

  await prisma.resume.deleteMany({ where: { id, userId: session.user.id } });
  return NextResponse.json({ success: true });
}
