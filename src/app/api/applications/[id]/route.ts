import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { id } = await params;
  const data = await req.json();

  const app = await prisma.applicationTracker.updateMany({
    where: { id, userId: session.user.id },
    data: {
      company: data.company,
      jobTitle: data.jobTitle,
      jobUrl: data.jobUrl,
      dateApplied: data.dateApplied,
      status: data.status,
      notes: data.notes,
    }
  });

  return NextResponse.json(app);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { id } = await params;
  await prisma.applicationTracker.deleteMany({ where: { id, userId: session.user.id } });
  return NextResponse.json({ success: true });
}
