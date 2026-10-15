import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

export interface SupabaseUser {
  id: string;
  email: string;
  name: string | null;
  password?: string | null;
  created_at: string;
  last_login: string;
  plan: "free" | "pro" | string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes("placeholder") &&
      !supabaseKey.includes("placeholder")
  );
};

// Singleton admin client (bypasses RLS to manage users and plans)
export const supabaseAdmin = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

/**
 * Fetch a user from the Supabase `users` table by email.
 */
export async function getSupabaseUserByEmail(
  email: string
): Promise<SupabaseUser | null> {
  if (!isSupabaseConfigured() || !supabaseAdmin) return null;

  try {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("id, email, name, password, created_at, last_login, plan")
      .ilike("email", email.trim())
      .maybeSingle();

    if (error) {
      console.warn("Supabase getSupabaseUserByEmail warning:", error.message);
      return null;
    }
    return data as SupabaseUser | null;
  } catch (err) {
    console.warn("Supabase query error:", err);
    return null;
  }
}

/**
 * Fetch a user from the Supabase `users` table by ID.
 */
export async function getSupabaseUserById(
  id: string
): Promise<SupabaseUser | null> {
  if (!isSupabaseConfigured() || !supabaseAdmin) return null;

  try {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("id, email, name, password, created_at, last_login, plan")
      .eq("id", id)
      .maybeSingle();

    if (error) return null;
    return data as SupabaseUser | null;
  } catch {
    return null;
  }
}

/**
 * Upsert or create a user in the Supabase `users` table.
 */
export async function upsertSupabaseUser(payload: {
  id?: string;
  email: string;
  name?: string | null;
  password?: string | null;
  plan?: string;
}): Promise<SupabaseUser | null> {
  if (!isSupabaseConfigured() || !supabaseAdmin) return null;

  const now = new Date().toISOString();
  const existing = await getSupabaseUserByEmail(payload.email);

  if (existing) {
    // Update existing user's last_login and optional fields
    const updates: Record<string, any> = {
      last_login: now,
    };
    if (payload.name && !existing.name) updates.name = payload.name;
    if (payload.password) updates.password = payload.password;

    const { data, error } = await supabaseAdmin
      .from("users")
      .update(updates)
      .eq("id", existing.id)
      .select("id, email, name, created_at, last_login, plan")
      .single();

    if (error) {
      console.error("Error updating Supabase user:", error.message);
      return existing;
    }
    return data as SupabaseUser;
  }

  // Create new user in Supabase
  const insertData: Record<string, any> = {
    email: payload.email.trim().toLowerCase(),
    name: payload.name || payload.email.split("@")[0],
    created_at: now,
    last_login: now,
    plan: payload.plan || "free",
  };
  if (payload.id) insertData.id = payload.id;
  if (payload.password) insertData.password = payload.password;

  try {
    const { data, error } = await supabaseAdmin
      .from("users")
      .insert([insertData])
      .select("id, email, name, created_at, last_login, plan")
      .single();

    if (error) {
      console.error("Error inserting Supabase user:", error.message);
      return null;
    }
    return data as SupabaseUser;
  } catch (err) {
    console.error("Supabase insert exception:", err);
    return null;
  }
}

/**
 * Update the `last_login` timestamp of a user.
 */
export async function updateSupabaseUserLastLogin(
  emailOrId: string
): Promise<void> {
  if (!isSupabaseConfigured() || !supabaseAdmin) return;
  const now = new Date().toISOString();
  try {
    await supabaseAdmin
      .from("users")
      .update({ last_login: now })
      .or(`email.ilike.${emailOrId},id.eq.${emailOrId}`);
  } catch (err) {
    console.warn("Failed to update last_login in Supabase:", err);
  }
}

/**
 * Retrieve all users for the Admin dashboard.
 * Queries Supabase `users` table if configured, otherwise falls back to Prisma.
 */
export async function getAllUsersForAdmin(): Promise<SupabaseUser[]> {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("users")
        .select("id, email, name, created_at, last_login, plan")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as SupabaseUser[];
      }
    } catch (err) {
      console.warn("Supabase getAllUsers error, falling back to Prisma:", err);
    }
  }

  // Fallback to Prisma
  try {
    const prismaUsers = await prisma.user.findMany({
      orderBy: { id: "desc" },
    });
    return prismaUsers.map((u) => ({
      id: u.id,
      email: u.email || "",
      name: u.name || null,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
      plan: "free",
    }));
  } catch {
    return [];
  }
}

/**
 * Switch a user's plan between 'free' and 'pro'.
 */
export async function updateUserPlan(
  userId: string,
  newPlan: "free" | "pro"
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from("users")
        .update({ plan: newPlan })
        .eq("id", userId);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to update plan" };
    }
  }

  return { success: true };
}
