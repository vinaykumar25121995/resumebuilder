import { prisma } from "@/lib/prisma";
import {
  getSupabaseUserByEmail,
  upsertSupabaseUser,
  isSupabaseConfigured,
} from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, securityQuestion, securityAnswer } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name?.trim() || cleanEmail.split("@")[0];

    // 1. Check if user already exists in Supabase
    if (isSupabaseConfigured()) {
      try {
        const existingSb = await getSupabaseUserByEmail(cleanEmail);
        if (existingSb) {
          return NextResponse.json(
            { error: "An account with this email already exists" },
            { status: 400 }
          );
        }
      } catch (e) {
        console.warn("Supabase check error:", e);
      }
    }

    // 2. Check if user exists in Prisma (if available)
    try {
      const existingPrisma = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
      if (existingPrisma) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 400 }
        );
      }
    } catch (e) {
      console.warn("Prisma user lookup warning:", e);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let hashedSecurityAnswer: string | null = null;
    if (securityAnswer && typeof securityAnswer === "string" && securityAnswer.trim().length > 0) {
      hashedSecurityAnswer = await bcrypt.hash(securityAnswer.trim().toLowerCase(), 10);
    }

    // 3. Store in Supabase `users` table
    let createdUserId: string | null = null;
    let supabaseError: string | null = null;

    if (isSupabaseConfigured()) {
      const sbResult = await upsertSupabaseUser({
        email: cleanEmail,
        name: cleanName,
        password: hashedPassword,
        plan: "free",
        security_question: securityQuestion ? String(securityQuestion) : null,
        security_answer: hashedSecurityAnswer,
      });
      if (sbResult.user) {
        createdUserId = sbResult.user.id;
      } else if (sbResult.error) {
        supabaseError = sbResult.error;
      }
    }

    // 4. Also attempt to sync to Prisma in background (never block registration if it fails)
    let prismaSuccess = false;
    try {
      const user = await prisma.user.create({
        data: {
          id: createdUserId || undefined,
          name: cleanName,
          email: cleanEmail,
          password: hashedPassword,
        },
      });
      prismaSuccess = true;

      // Automatically create empty profile
      await prisma.profile.create({
        data: {
          userId: user.id,
        },
      });
    } catch (prismaErr) {
      console.warn("Prisma user creation warning:", prismaErr);
    }

    // 5. If user was created in Supabase OR in Prisma, registration succeeded!
    if (createdUserId || prismaSuccess) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    // 6. If neither succeeded, return an actionable, clear error message
    if (supabaseError) {
      return NextResponse.json(
        { error: supabaseError },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Database configuration missing: Please ensure your Supabase credentials (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are configured in Netlify > Site configuration > Environment variables.",
      },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create account" },
      { status: 500 }
    );
  }
}
