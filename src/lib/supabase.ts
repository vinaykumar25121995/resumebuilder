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

function cleanEnvValue(val?: string | null): string {
  if (!val) return "";
  return val
    .trim()
    .replace(/^["'`]+|["'`]+$/g, "")
    .trim();
}

export function getSupabaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";
  return cleanEnvValue(raw).replace(/\/+$/, "");
}

export function getServiceRoleKey(): string {
  return cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getAnonKey(): string {
  return cleanEnvValue(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY
  );
}

function looksLikeSupabaseKey(key: string): boolean {
  if (!key || key.length < 20) return false;
  return (
    key.startsWith("ey") ||
    key.startsWith("sb_") ||
    key.startsWith("sbp_") ||
    key.startsWith("sbs_")
  );
}

export function getSupabaseKey(): string {
  const sKey = getServiceRoleKey();
  const aKey = getAnonKey();

  if (looksLikeSupabaseKey(sKey)) return sKey;
  if (looksLikeSupabaseKey(aKey)) return aKey;
  return sKey || aKey || "";
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

export function createSupabaseClient(key: string): SupabaseClient | null {
  const url = getSupabaseUrl();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const key = getSupabaseKey();
  if (!key) return null;
  return createSupabaseClient(key);
}

export const supabaseAdmin = getSupabaseAdmin();

function formatSupabaseError(error: any): string {
  const msg = (error?.message || "").trim();
  const lower = msg.toLowerCase();

  if (
    lower.includes("invalid api key") ||
    lower.includes("jwt") ||
    lower.includes("apikey") ||
    error?.code === "PGRST301" ||
    error?.code === "401"
  ) {
    return "Invalid Supabase API Key: The key provided in Netlify is invalid. In your Supabase Dashboard, go to Project Settings > API, click 'Reveal' on the service_role key (or copy the anon public key), and update SUPABASE_SERVICE_ROLE_KEY in Netlify Site configuration > Environment variables without quotes.";
  }

  if (lower.includes("does not exist") || error?.code === "42P01") {
    return "The Supabase 'users' table does not exist. Please run the provided SQL in your Supabase SQL Editor.";
  }

  return msg || "Supabase database error";
}

/**
 * Executes a Supabase operation with automatic fallback:
 * If service_role key returns "Invalid API key" or 401,
 * it retries with the anon public key.
 */
async function executeSupabaseOperation<T>(
  fn: (client: SupabaseClient) => Promise<{ data: T | null; error: any }>
): Promise<{ data: T | null; error: any }> {
  const sKey = getServiceRoleKey();
  const aKey = getAnonKey();

  const candidateKeys: string[] = [];
  if (looksLikeSupabaseKey(sKey)) candidateKeys.push(sKey);
  if (looksLikeSupabaseKey(aKey) && aKey !== sKey) candidateKeys.push(aKey);

  if (candidateKeys.length === 0) {
    if (sKey) candidateKeys.push(sKey);
    if (aKey && aKey !== sKey) candidateKeys.push(aKey);
  }

  if (candidateKeys.length === 0) {
    return {
      data: null,
      error: { message: "No Supabase API key found in environment variables." },
    };
  }

  let lastError: any = null;
  for (const key of candidateKeys) {
    const client = createSupabaseClient(key);
    if (!client) continue;

    try {
      const result = await fn(client);
      if (!result.error) {
        return result;
      }
      lastError = result.error;

      // Check if error is authentication-related (retry with next key if available)
      const errMsg = (result.error.message || "").toLowerCase();
      const isAuthError =
        errMsg.includes("invalid api key") ||
        errMsg.includes("jwt") ||
        errMsg.includes("apikey") ||
        result.error.code === "PGRST301" ||
        result.error.code === "401";

      if (!isAuthError) {
        return result;
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  return { data: null, error: lastError };
}

/**
 * Fetch a user from the Supabase `users` table by email.
 */
export async function getSupabaseUserByEmail(
  email: string
): Promise<SupabaseUser | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await executeSupabaseOperation(async (client) => {
      return client
        .from("users")
        .select("id, email, name, password, created_at, last_login, plan")
        .ilike("email", email.trim())
        .maybeSingle();
    });

    if (error) {
      console.warn("Supabase getSupabaseUserByEmail warning:", error.message);
      return null;
    }
    return (data as unknown as SupabaseUser) || null;
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
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await executeSupabaseOperation(async (client) => {
      return client
        .from("users")
        .select("id, email, name, password, created_at, last_login, plan")
        .eq("id", id)
        .maybeSingle();
    });

    if (error) return null;
    return (data as unknown as SupabaseUser) || null;
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
  if (!isSupabaseConfigured()) {
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
      const updates: Record<string, any> = {
        last_login: now,
      };
      if (payload.name && !existing.name) updates.name = payload.name;
      if (payload.password) updates.password = payload.password;

      const { data, error } = await executeSupabaseOperation(async (client) => {
        return client
          .from("users")
          .update(updates)
          .eq("id", existing.id)
          .select("id, email, name, created_at, last_login, plan")
          .single();
      });

      if (error) {
        console.error("Error updating Supabase user:", error.message);
        return { user: existing, error: formatSupabaseError(error) };
      }
      return { user: data as unknown as SupabaseUser };
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

    const { data, error } = await executeSupabaseOperation(async (client) => {
      return client
        .from("users")
        .insert([insertData])
        .select("id, email, name, created_at, last_login, plan")
        .single();
    });

    if (error) {
      console.error("Error inserting Supabase user:", error.message);
      return { user: null, error: formatSupabaseError(error) };
    }

    return { user: data as unknown as SupabaseUser };
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
  if (!isSupabaseConfigured()) return;
  const now = new Date().toISOString();
  try {
    await executeSupabaseOperation(async (client) => {
      return client
        .from("users")
        .update({ last_login: now })
        .or(`email.ilike.${emailOrId},id.eq.${emailOrId}`);
    });
  } catch (err) {
    console.warn("Failed to update last_login in Supabase:", err);
  }
}

/**
 * Retrieve all users for the Admin dashboard.
 */
export async function getAllUsersForAdmin(): Promise<SupabaseUser[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await executeSupabaseOperation(async (client) => {
        return client
          .from("users")
          .select("id, email, name, created_at, last_login, plan")
          .order("created_at", { ascending: false });
      });

      if (!error && data && Array.isArray(data) && data.length > 0) {
        return data as unknown as SupabaseUser[];
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
  if (isSupabaseConfigured()) {
    try {
      const { error } = await executeSupabaseOperation(async (client) => {
        return client
          .from("users")
          .update({ plan: newPlan })
          .eq("id", userId);
      });

      if (error) {
        return { success: false, error: formatSupabaseError(error) };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to update plan" };
    }
  }

  return { success: true };
}

/**
 * Delete a user from the Supabase `users` table and Prisma.
 */
export async function deleteSupabaseUser(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await executeSupabaseOperation(async (client) => {
        return client.from("users").delete().eq("id", userId);
      });

      if (error) {
        return { success: false, error: formatSupabaseError(error) };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to delete user from Supabase" };
    }
  }

  // Also clean up in Prisma if present
  try {
    await prisma.user.deleteMany({ where: { id: userId } });
  } catch (err) {
    console.warn("Prisma user delete fallback warning:", err);
  }

  return { success: true };
}
