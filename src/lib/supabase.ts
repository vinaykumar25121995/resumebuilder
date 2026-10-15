import { createClient, SupabaseClient } from "@supabase/supabase-js";
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

export function getSupabaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ""
  );
}

export function getSupabaseKey(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ""
  );
}

export const isSupabaseConfigured = (): boolean => {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  return Boolean(
    url &&
      key &&
      !url.includes("placeholder") &&
      !key.includes("placeholder")
  );
};

let _cachedClient: SupabaseClient | null = null;
let _cachedUrl = "";
let _cachedKey = "";

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();

  if (!url || !key || url.includes("placeholder") || key.includes("placeholder")) {
    return null;
  }

  if (_cachedClient && _cachedUrl === url && _cachedKey === key) {
    return _cachedClient;
  }

  _cachedUrl = url;
  _cachedKey = key;
  _cachedClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _cachedClient;
}

export const supabaseAdmin = getSupabaseAdmin();

/**
 * Fetch a user from the Supabase `users` table by email.
 */
export async function getSupabaseUserByEmail(
  email: string
): Promise<SupabaseUser | null> {
  const admin = getSupabaseAdmin();
  if (!admin) return null;

  try {
    const { data, error } = await admin
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
  const admin = getSupabaseAdmin();
  if (!admin) return null;

  try {
    const { data, error } = await admin
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
}): Promise<{ user: SupabaseUser | null; error?: string }> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return {
      user: null,
      error:
        "Supabase credentials not configured. Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify environment variables.",
    };
  }

  const now = new Date().toISOString();
  const cleanEmail = payload.email.trim().toLowerCase();

  try {
    const existing = await getSupabaseUserByEmail(cleanEmail);

    if (existing) {
      // Update existing user's last_login and optional fields
      const updates: Record<string, any> = {
        last_login: now,
      };
      if (payload.name && !existing.name) updates.name = payload.name;
      if (payload.password) updates.password = payload.password;

      const { data, error } = await admin
        .from("users")
        .update(updates)
        .eq("id", existing.id)
        .select("id, email, name, created_at, last_login, plan")
        .single();

      if (error) {
        console.error("Error updating Supabase user:", error.message);
        return { user: existing, error: error.message };
      }
      return { user: data as SupabaseUser };
    }

    // Insert new user in Supabase
    const insertData: Record<string, any> = {
      email: cleanEmail,
      name: payload.name || cleanEmail.split("@")[0],
      created_at: now,
      last_login: now,
      plan: payload.plan || "free",
    };
    if (payload.id) insertData.id = payload.id;
    if (payload.password) insertData.password = payload.password;

    const { data, error } = await admin
      .from("users")
      .insert([insertData])
      .select("id, email, name, created_at, last_login, plan")
      .single();

    if (error) {
      console.error("Error inserting Supabase user:", error.message);
      let userFriendlyMsg = error.message;
      if (error.message.includes("does not exist") || (error as any).code === "42P01") {
        userFriendlyMsg =
          "The Supabase 'users' table does not exist. Please run the provided SQL in your Supabase SQL Editor.";
      } else if (
        error.message.includes("JWT") ||
        (error as any).code === "PGRST301" ||
        error.message.includes("apikey")
      ) {
        userFriendlyMsg =
          "Invalid Supabase API key. Please check SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in Netlify.";
      }
      return { user: null, error: userFriendlyMsg };
    }

    return { user: data as SupabaseUser };
  } catch (err: any) {
    console.error("Supabase insert exception:", err);
    return {
      user: null,
      error: err?.message || "Failed to communicate with Supabase",
    };
  }
}

/**
 * Update the `last_login` timestamp of a user.
 */
export async function updateSupabaseUserLastLogin(
  emailOrId: string
): Promise<void> {
  const admin = getSupabaseAdmin();
  if (!admin) return;
  const now = new Date().toISOString();
  try {
    await admin
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
  const admin = getSupabaseAdmin();
  if (admin) {
    try {
      const { data, error } = await admin
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
  const admin = getSupabaseAdmin();
  if (admin) {
    try {
      const { error } = await admin
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
