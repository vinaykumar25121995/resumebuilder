import { NextResponse } from "next/server";
import {
  getSupabaseUserByEmail,
  updateUserPassword,
  isSupabaseConfigured,
} from "@/lib/supabase";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, answer, newPassword } = body;

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // ─────────────────────────────────────────────────────────────
    // ACTION 1: GET SECURITY QUESTION FOR THIS EMAIL
    // ─────────────────────────────────────────────────────────────
    if (action === "get-question") {
      let user = null;

      if (isSupabaseConfigured()) {
        try {
          user = await getSupabaseUserByEmail(cleanEmail);
        } catch (err) {
          console.warn("Supabase lookup error during forgot password:", err);
        }
      }

      // Check Prisma fallback if not found in Supabase
      if (!user) {
        try {
          const prismaUser = await prisma.user.findUnique({
            where: { email: cleanEmail },
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
          console.warn("Prisma fallback error during forgot password:", err);
        }
      }

      if (!user) {
        return NextResponse.json(
          { error: "No account found registered with this email address." },
          { status: 404 }
        );
      }

      const hasQuestion = Boolean(
        user.security_question && user.security_question.trim().length > 0
      );

      return NextResponse.json({
        success: true,
        email: cleanEmail,
        hasSecurityQuestion: hasQuestion,
        question: hasQuestion ? user.security_question : null,
      });
    }

    // ─────────────────────────────────────────────────────────────
    // ACTION 2: VERIFY ANSWER AND RESET PASSWORD
    // ─────────────────────────────────────────────────────────────
    if (action === "reset-password") {
      if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
        return NextResponse.json(
          { error: "New password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      let user = null;
      if (isSupabaseConfigured()) {
        try {
          user = await getSupabaseUserByEmail(cleanEmail);
        } catch (err) {
          console.warn("Supabase lookup error during reset:", err);
        }
      }

      if (!user) {
        try {
          const prismaUser = await prisma.user.findUnique({
            where: { email: cleanEmail },
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
          console.warn("Prisma fallback lookup error during reset:", err);
        }
      }

      if (!user) {
        return NextResponse.json(
          { error: "No account found registered with this email address." },
          { status: 404 }
        );
      }

      // If user has a security question & answer configured, verify the answer
      if (user.security_answer) {
        if (!answer || typeof answer !== "string" || !answer.trim()) {
          return NextResponse.json(
            { error: "Please provide the answer to your security question." },
            { status: 400 }
          );
        }

        const normalizedInputAnswer = answer.trim().toLowerCase();
        let isCorrect = false;

        // Try bcrypt compare first (if stored as hash)
        try {
          if (user.security_answer.startsWith("$2a$") || user.security_answer.startsWith("$2b$")) {
            isCorrect = await bcrypt.compare(normalizedInputAnswer, user.security_answer);
          }
        } catch {
          isCorrect = false;
        }

        // Fallback: check direct string equality if not hashed or legacy
        if (!isCorrect) {
          if (user.security_answer.trim().toLowerCase() === normalizedInputAnswer) {
            isCorrect = true;
          }
        }

        if (!isCorrect) {
          return NextResponse.json(
            { error: "Incorrect security answer. Please check your answer and try again." },
            { status: 400 }
          );
        }
      }

      // Hash the new password
      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password in Supabase and Prisma
      const result = await updateUserPassword(cleanEmail, newHashedPassword);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Failed to update password. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your password has been successfully reset.",
      });
    }

    return NextResponse.json(
      { error: "Invalid action. Supported actions: 'get-question', 'reset-password'." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
