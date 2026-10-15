import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import {
  getSupabaseUserByEmail,
  upsertSupabaseUser,
  updateSupabaseUserLastLogin,
  isSupabaseConfigured,
} from "@/lib/supabase";
import bcrypt from "bcryptjs";

const providers: any[] = [];

// Configure Google OAuth Provider if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

// Credentials Provider (Email & Password)
providers.push(
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      const email = credentials.email.trim().toLowerCase();

      // 1. Check Supabase `users` table first
      if (isSupabaseConfigured()) {
        try {
          const supabaseUser = await getSupabaseUserByEmail(email);
          if (supabaseUser && supabaseUser.password) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              supabaseUser.password
            );

            if (isPasswordValid) {
              await updateSupabaseUserLastLogin(supabaseUser.id);

              // Ensure Prisma user exists for resume data relations
              try {
                let pUser = await prisma.user.findUnique({ where: { email } });
                if (!pUser) {
                  pUser = await prisma.user.create({
                    data: {
                      id: supabaseUser.id,
                      email: supabaseUser.email,
                      name: supabaseUser.name,
                    },
                  });
                  await prisma.profile.create({ data: { userId: pUser.id } });
                }
              } catch (prismaErr) {
                console.warn("Prisma user sync warning:", prismaErr);
              }

              return {
                id: supabaseUser.id,
                email: supabaseUser.email,
                name: supabaseUser.name,
                plan: supabaseUser.plan || "free",
              };
            }
          }
        } catch (sbErr) {
          console.warn("Supabase auth check error:", sbErr);
        }
      }

      // 2. Fallback to Prisma database
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Sync to Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            await upsertSupabaseUser({
              id: user.id,
              email: user.email!,
              name: user.name,
              plan: "free",
            });
          } catch (syncErr) {
            console.warn("Supabase user sync error:", syncErr);
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: "free",
        };
      } catch (err) {
        console.error("Authorize error:", err);
        return null;
      }
    },
  })
);

export const authOptions: NextAuthOptions = {
  // Explicit secret ensures NextAuth never crashes with MissingSecret error in production
  secret:
    process.env.NEXTAUTH_SECRET ||
    "ats-resume-builder-super-secret-jwt-key-2025-production-32chars",
  providers,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) return false;

      const email = user.email.trim().toLowerCase();
      const name = user.name || email.split("@")[0];

      // Handle Google OAuth sign-in
      if (account?.provider === "google") {
        try {
          // Store/update user in Supabase `users` table
          if (isSupabaseConfigured()) {
            const sbResult = await upsertSupabaseUser({
              email,
              name,
              plan: "free",
            });
            if (sbResult?.user) {
              user.id = sbResult.user.id;
              (user as any).plan = sbResult.user.plan;
            }
          }

          // Ensure user and profile exist in Prisma for resume building
          try {
            let pUser = await prisma.user.findUnique({ where: { email } });
            if (!pUser) {
              pUser = await prisma.user.create({
                data: {
                  email,
                  name,
                  image: user.image || null,
                },
              });
              await prisma.profile.create({ data: { userId: pUser.id } });
            }
            user.id = pUser.id;
          } catch (prismaErr) {
            console.warn("Prisma google user sync:", prismaErr);
          }
        } catch (err) {
          console.error("Error in Google signIn callback:", err);
        }
      }

      return true;
    },

    async jwt({ token, user, trigger }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.plan = (user as any).plan || "free";
      }

      // Refresh user's plan from Supabase periodically or on update
      if (token.email && isSupabaseConfigured()) {
        try {
          const sbUser = await getSupabaseUserByEmail(token.email as string);
          if (sbUser) {
            token.plan = sbUser.plan || "free";
          }
        } catch {
          // ignore error in jwt callback
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.plan = (token.plan as string) || "free";
      }
      return session;
    },
  },
};
