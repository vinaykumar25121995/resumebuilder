import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  getAllUsersForAdmin,
  updateUserPlan,
  upsertSupabaseUser,
  getSupabaseUserByEmail,
  getSupabaseUserById,
  deleteSupabaseUser,
} from "@/lib/supabase";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = "vinay22y95@gmail.com";

function verifyAdminSession(session: any) {
  if (!session || !session.user || !session.user.email) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized: Please sign in first" },
        { status: 401 }
      ),
    };
  }

  if (session.user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          error: `Forbidden: Admin access is strictly restricted to ${ADMIN_EMAIL}`,
        },
        { status: 403 }
      ),
    };
  }

  return { authorized: true };
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const auth = verifyAdminSession(session);
  if (!auth.authorized) return auth.response;

  try {
    const users = await getAllUsersForAdmin();
    return NextResponse.json({
      success: true,
      users,
      count: users.length,
      adminEmail: ADMIN_EMAIL,
    });
  } catch (error: any) {
    console.error("Admin API fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const auth = verifyAdminSession(session);
  if (!auth.authorized) return auth.response;

  try {
    const body = await req.json();
    const { email, name, password, plan = "free" } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required to create a user." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name?.trim() || cleanEmail.split("@")[0];
    const selectedPlan = plan === "pro" ? "pro" : "free";

    // Check if user already exists
    const existing = await getSupabaseUserByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json(
        { error: `An account with email '${cleanEmail}' already exists.` },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sbResult = await upsertSupabaseUser({
      email: cleanEmail,
      name: cleanName,
      password: hashedPassword,
      plan: selectedPlan,
    });

    if (!sbResult.user) {
      return NextResponse.json(
        { error: sbResult.error || "Failed to create user in Supabase." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: sbResult.user,
        message: `User ${cleanEmail} created successfully with ${selectedPlan.toUpperCase()} plan.`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Admin API create user error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const auth = verifyAdminSession(session);
  if (!auth.authorized) return auth.response;

  try {
    const body = await req.json();
    const { userId, plan } = body;

    if (!userId || !plan || (plan !== "free" && plan !== "pro")) {
      return NextResponse.json(
        { error: "Valid userId and plan ('free' or 'pro') are required." },
        { status: 400 }
      );
    }

    const result = await updateUserPlan(userId, plan);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update user plan." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      userId,
      plan,
      message: `User plan successfully updated to ${plan.toUpperCase()}`,
    });
  } catch (error: any) {
    console.error("Admin API patch error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const auth = verifyAdminSession(session);
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID parameter is required." },
        { status: 400 }
      );
    }

    // Do not allow deleting own primary admin account
    const targetUser = await getSupabaseUserById(userId);
    if (targetUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: "Cannot delete the primary administrator account." },
        { status: 400 }
      );
    }

    const result = await deleteSupabaseUser(userId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to delete user." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      userId,
      message: "User successfully removed from the database.",
    });
  } catch (error: any) {
    console.error("Admin API delete error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}
