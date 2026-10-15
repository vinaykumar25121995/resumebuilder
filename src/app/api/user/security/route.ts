import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  getSupabaseUserByEmail,
  updateUserPassword,
  updateUserSecurityQuestion,
  isSupabaseConfigured,
} from "@/lib/supabase";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email.toLowerCase().trim();
  let user = null;

  if (isSupabaseConfigured()) {
    try {
      user = await getSupabaseUserByEmail(email);
    } catch (err) {
      console.warn("Supabase security fetch error:", err);
    }
  }

  if (!user) {
    try {
      const prismaUser = await prisma.user.findUnique({
        where: { email },
      });
      if (prismaUser) {
        user = {
          id: prismaUser.id,
          email: prismaUser.email,
          name: prismaUser.name,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          plan: "free",
          security_question: null,
          security_answer: null,
        };
      }
    } catch (err) {
      console.warn("Prisma security fetch error:", err);
    }
  }

  return NextResponse.json({
    email,
    hasSecurityQuestion: Boolean(user?.security_question),
    securityQuestion: user?.security_question || null,
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email.toLowerCase().trim();

  try {
    const body = await req.json();
    const { type } = body;

    // ─────────────────────────────────────────────────────────────
    // 1. UPDATE PASSWORD
    // ─────────────────────────────────────────────────────────────
    if (type === "password") {
      const { currentPassword, newPassword } = body;

      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: "New password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      // Check current password
      let user = null;
      if (isSupabaseConfigured()) {
        user = await getSupabaseUserByEmail(email);
      }
      if (!user) {
        user = await prisma.user.findUnique({ where: { email } });
      }

      if (user && user.password) {
        const isMatch = await bcrypt.compare(currentPassword || "", user.password);
        if (!isMatch) {
          return NextResponse.json(
            { error: "Current password is incorrect." },
            { status: 400 }
          );
        }
      }

      const newHashed = await bcrypt.hash(newPassword, 10);
      const updateResult = await updateUserPassword(email, newHashed);

      if (!updateResult.success) {
        return NextResponse.json(
          { error: updateResult.error || "Failed to update password." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Password updated successfully.",
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 2. UPDATE SECURITY QUESTION
    // ─────────────────────────────────────────────────────────────
    if (type === "security-question") {
      const { securityQuestion, securityAnswer } = body;

      if (!securityQuestion || typeof securityQuestion !== "string") {
        return NextResponse.json(
          { error: "Please select a valid security question." },
          { status: 400 }
        );
      }

      if (!securityAnswer || typeof securityAnswer !== "string" || !securityAnswer.trim()) {
        return NextResponse.json(
          { error: "Please provide an answer to the security question." },
          { status: 400 }
        );
      }

      const hashedAnswer = await bcrypt.hash(
        securityAnswer.trim().toLowerCase(),
        10
      );

      const updateResult = await updateUserSecurityQuestion(
        email,
        securityQuestion.trim(),
        hashedAnswer
      );

      if (!updateResult.success) {
        return NextResponse.json(
          { error: updateResult.error || "Failed to update security question." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Security question and recovery answer updated successfully.",
      });
    }

    return NextResponse.json(
      { error: "Invalid type. Must be 'password' or 'security-question'." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("User security settings error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
