import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getAllUsersForAdmin, updateUserPlan } from "@/lib/supabase";

const ADMIN_EMAIL = "vinay22y95@gmail.com";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(
      { error: "Unauthorized: Please sign in first" },
      { status: 401 }
    );
  }

  if (session.user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return NextResponse.json(
      {
        error: `Forbidden: Admin access is strictly restricted to ${ADMIN_EMAIL}`,
      },
      { status: 403 }
    );
  }

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

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(
      { error: "Unauthorized: Please sign in first" },
      { status: 401 }
    );
  }

  if (session.user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return NextResponse.json(
      {
        error: `Forbidden: Admin access is strictly restricted to ${ADMIN_EMAIL}`,
      },
      { status: 403 }
    );
  }

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
