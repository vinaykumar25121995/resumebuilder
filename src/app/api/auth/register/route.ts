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
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name?.trim() || cleanEmail.split("@")[0];

    // Check if user exists in Supabase
    if (isSupabaseConfigured()) {
      const existingSb = await getSupabaseUserByEmail(cleanEmail);
      if (existingSb) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 400 }
        );
      }
    }

    // Check if user exists in Prisma
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
      // Prisma error (e.g. SQLite readonly on serverless) shouldn't block registration if Supabase works
      console.warn("Prisma user lookup warning:", e);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Store in Supabase `users` table
    let createdUserId: string | null = null;
    if (isSupabaseConfigured()) {
      const sbUser = await upsertSupabaseUser({
        email: cleanEmail,
        name: cleanName,
        password: hashedPassword,
        plan: "free",
      });
      if (sbUser) {
        createdUserId = sbUser.id;
      }
    }

    // 2. Store in Prisma database
    try {
      const user = await prisma.user.create({
        data: {
          id: createdUserId || undefined,
          name: cleanName,
          email: cleanEmail,
          password: hashedPassword,
        },
      });

      // Automatically create empty profile
      await prisma.profile.create({
        data: {
          userId: user.id,
        },
      });
    } catch (prismaErr) {
      console.warn("Prisma user creation warning:", prismaErr);
      // If Supabase creation succeeded, registration is still a success
      if (!createdUserId) {
        throw prismaErr;
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create account" },
      { status: 500 }
    );
  }
}
