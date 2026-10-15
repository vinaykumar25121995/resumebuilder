import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { updateUserPlan, isSupabaseConfigured, getSupabaseUserByEmail } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const requestedPlan = body.plan === "free" ? "free" : "pro";

    // Update in Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const sbUser = await getSupabaseUserByEmail(session.user.email);
        if (sbUser) {
          await updateUserPlan(sbUser.id, requestedPlan);
        }
      } catch (sbErr) {
        console.warn("Supabase plan update error:", sbErr);
      }
    }

    return NextResponse.json({
      success: true,
      plan: requestedPlan,
      message:
        requestedPlan === "pro"
          ? "Successfully unlocked Pro Subscription!"
          : "Plan switched to free.",
    });
  } catch (error: any) {
    console.error("Upgrade error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update subscription" },
      { status: 500 }
    );
  }
}
