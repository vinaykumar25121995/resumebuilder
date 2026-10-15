"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  KeyRound,
  ShieldQuestion,
  Lock,
  Mail,
  Loader2,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  // Step 1: "email" | Step 2: "reset" | Step 3: "done"
  const [step, setStep] = useState<"email" | "reset">("email");

  // Form states
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState<string | null>(null);
  const [hasSecurityQuestion, setHasSecurityQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI toggles
  const [showAnswer, setShowAnswer] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Submit email to get question
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "get-question",
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "No account found with this email.");
        return;
      }

      setHasSecurityQuestion(Boolean(data.hasSecurityQuestion));
      setSecurityQuestion(data.question || null);
      setStep("reset");
    } catch {
      setError("Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit answer and new password
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (hasSecurityQuestion && !answer.trim()) {
      setError("Please provide the answer to your security question.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset-password",
          email: email.trim().toLowerCase(),
          answer: answer.trim(),
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
        return;
      }

      // Password reset successful -> redirect to login with query param
      router.push("/login?reset=true");
    } catch {
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 font-bold text-xl hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>ATS Resume Builder</span>
          </Link>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mt-2">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {step === "email" ? "Forgot Password" : "Reset Your Password"}
          </h2>
          <p className="text-xs text-gray-500">
            {step === "email"
              ? "Enter your email to verify your identity and recover your account"
              : `Recovering account for: ${email}`}
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-xs text-red-800 border border-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* ── STEP 1: ENTER EMAIL ────────────────────────────────────────── */}
        {step === "email" && (
          <form className="space-y-4" onSubmit={handleEmailSubmit}>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 p-2.5 pl-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-xl bg-blue-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Looking up account...</span>
                </>
              ) : (
                <span>Continue</span>
              )}
            </button>
          </form>
        )}

        {/* ── STEP 2: ANSWER QUESTION & SET PASSWORD ─────────────────────── */}
        {step === "reset" && (
          <form className="space-y-4" onSubmit={handleResetSubmit}>
            {hasSecurityQuestion && securityQuestion ? (
              <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <ShieldQuestion className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Your Security Question</span>
                </div>
                <p className="text-xs text-blue-800 font-medium">
                  {securityQuestion}
                </p>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1 mt-2">
                    Your Answer
                  </label>
                  <div className="relative">
                    <input
                      type={showAnswer ? "text" : "password"}
                      required
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full rounded-xl border border-gray-300 bg-white p-2.5 pr-10 text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                      aria-label={showAnswer ? "Hide answer" : "Show answer"}
                      tabIndex={-1}
                    >
                      {showAnswer ? (
                        <EyeOff className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                <span>
                  No security question was found for this account. You can set a new password directly below.
                </span>
              </div>
            )}

            {/* New Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-gray-300 p-2.5 pr-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full rounded-xl border border-gray-300 p-2.5 pr-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setError("");
                }}
                className="py-2.5 px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex justify-center items-center gap-2 rounded-xl bg-blue-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Resetting password...</span>
                  </>
                ) : (
                  <span>Set New Password</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Back to sign in */}
        <p className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-600 hover:text-blue-700 underline inline-flex items-center gap-1"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
