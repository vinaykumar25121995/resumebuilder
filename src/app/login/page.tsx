"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { Sparkles, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const registered = searchParams.get("registered");
  const reset = searchParams.get("reset");
  const authError = searchParams.get("error");

  const getErrorMessage = () => {
    if (error) return error;
    if (authError === "OAuthSignin" || authError === "OAuthCallback") {
      return "Error connecting with Google. Please try again or use email & password.";
    }
    if (authError === "Configuration") {
      return "Server configuration notice: Please ensure NEXTAUTH_SECRET and NEXTAUTH_URL are configured on Netlify.";
    }
    if (authError === "AccessDenied") {
      return "Access denied. Please check your account permissions.";
    }
    if (authError) {
      return "Authentication error. Please try signing in again.";
    }
    return null;
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setError("");
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch {
      setError("Failed to initiate Google sign-in.");
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred during sign-in.");
    } finally {
      setLoading(false);
    }
  };

  const displayedError = getErrorMessage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 font-bold text-xl hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>ATS Resume Builder</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-xs text-gray-500">
            Access your ATS-tailored resumes and application tracker
          </p>
        </div>

        {registered && (
          <div className="rounded-xl bg-green-50 p-3 text-xs text-green-800 border border-green-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>Account created successfully! Please sign in.</span>
          </div>
        )}

        {reset && (
          <div className="rounded-xl bg-green-50 p-3 text-xs text-green-800 border border-green-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>Password reset successfully! You can now sign in with your new password.</span>
          </div>
        )}

        {displayedError && (
          <div className="rounded-xl bg-red-50 p-3 text-xs text-red-800 border border-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{displayedError}</span>
          </div>
        )}

        {/* Continue with Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span>
            {googleLoading ? "Connecting to Google..." : "Continue with Google"}
          </span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-gray-200"></div>
          <span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">
            Or with email
          </span>
        </div>

        {/* Email & Password Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 p-2.5 pr-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-blue-600" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full flex justify-center items-center rounded-xl bg-blue-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in with Email"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-blue-600 hover:text-blue-700 underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
