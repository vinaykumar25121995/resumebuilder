"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Bell,
  Lock,
  Key,
  Save,
  Eye,
  EyeOff,
  ShieldQuestion,
  CheckCircle,
  AlertCircle,
  Loader2,
  HelpCircle,
} from "lucide-react";
import { SECURITY_QUESTIONS } from "@/lib/constants";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("account");

  // Password tab state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Security question state
  const [currentSecurityQuestion, setCurrentSecurityQuestion] = useState<string | null>(null);
  const [hasSecurityQuestion, setHasSecurityQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(SECURITY_QUESTIONS[0]);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [showSecurityAnswer, setShowSecurityAnswer] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [questionNotice, setQuestionNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const tabs = [
    { id: "account", label: "Account Profile", icon: User },
    { id: "security", label: "Security & Recovery", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API Integrations", icon: Key },
  ];

  // Fetch current user security preferences
  useEffect(() => {
    if (activeTab === "security") {
      fetchSecurityStatus();
    }
  }, [activeTab]);

  const fetchSecurityStatus = async () => {
    try {
      const res = await fetch("/api/user/security");
      if (res.ok) {
        const data = await res.json();
        setHasSecurityQuestion(Boolean(data.hasSecurityQuestion));
        if (data.securityQuestion) {
          setCurrentSecurityQuestion(data.securityQuestion);
          setSelectedQuestion(data.securityQuestion);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch security settings:", err);
    }
  };

  // Handle password update
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordNotice(null);

    if (!newPassword || newPassword.length < 6) {
      setPasswordNotice({
        type: "error",
        message: "New password must be at least 6 characters long.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordNotice({
        type: "error",
        message: "New passwords do not match. Please re-enter.",
      });
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch("/api/user/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "password",
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPasswordNotice({
          type: "success",
          message: data.message || "Password updated successfully!",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordNotice({
          type: "error",
          message: data.error || "Failed to update password.",
        });
      }
    } catch {
      setPasswordNotice({
        type: "error",
        message: "Network error updating password. Please try again.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Handle security question update
  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuestionNotice(null);

    if (!securityAnswer.trim()) {
      setQuestionNotice({
        type: "error",
        message: "Please enter an answer for your security question.",
      });
      return;
    }

    setQuestionLoading(true);

    try {
      const res = await fetch("/api/user/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "security-question",
          securityQuestion: selectedQuestion,
          securityAnswer: securityAnswer.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setQuestionNotice({
          type: "success",
          message:
            data.message || "Security question & recovery answer updated successfully!",
        });
        setCurrentSecurityQuestion(selectedQuestion);
        setHasSecurityQuestion(true);
        setSecurityAnswer("");
      } else {
        setQuestionNotice({
          type: "error",
          message: data.error || "Failed to update security question.",
        });
      }
    } catch {
      setQuestionNotice({
        type: "error",
        message: "Network error updating security question. Please try again.",
      });
    } finally {
      setQuestionLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account preferences, recovery options, and credentials.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <tab.icon
                  className={`w-5 h-5 mr-3 ${
                    activeTab === tab.id ? "text-blue-700" : "text-gray-400"
                  }`}
                />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "account" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Account Profile</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update your basic account information.
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      User Account
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue={session?.user?.name || ""}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={session?.user?.email || ""}
                      disabled
                      className="w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email address cannot be changed.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              {/* SECTION A: SECURITY QUESTION RECOVERY */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <ShieldQuestion className="w-5 h-5 text-blue-600" />
                      Security Question & Recovery
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Configure the question used to verify your identity if you ever forget your password.
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      hasSecurityQuestion
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {hasSecurityQuestion ? "Configured" : "Not Set"}
                  </span>
                </div>

                <form onSubmit={handleQuestionSubmit} className="p-6 space-y-5">
                  {questionNotice && (
                    <div
                      className={`rounded-xl p-3 text-xs border flex items-center gap-2 ${
                        questionNotice.type === "success"
                          ? "bg-green-50 text-green-800 border-green-200"
                          : "bg-red-50 text-red-800 border-red-200"
                      }`}
                    >
                      {questionNotice.type === "success" ? (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      )}
                      <span>{questionNotice.message}</span>
                    </div>
                  )}

                  {currentSecurityQuestion && (
                    <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl">
                      <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wide block mb-1">
                        Active Recovery Question:
                      </span>
                      <p className="text-xs text-blue-800 font-semibold">
                        {currentSecurityQuestion}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Select Question
                    </label>
                    <select
                      value={selectedQuestion}
                      onChange={(e) => setSelectedQuestion(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-xs text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {SECURITY_QUESTIONS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Secret Answer
                    </label>
                    <div className="relative">
                      <input
                        type={showSecurityAnswer ? "text" : "password"}
                        required
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        placeholder="Enter your confidential answer (case-insensitive)"
                        className="w-full rounded-xl border border-gray-300 p-2.5 pr-10 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecurityAnswer(!showSecurityAnswer)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                        aria-label={showSecurityAnswer ? "Hide answer" : "Show answer"}
                        tabIndex={-1}
                      >
                        {showSecurityAnswer ? (
                          <EyeOff className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Your answer will be securely encrypted. Answers are verified without case sensitivity.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={questionLoading}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-xs disabled:opacity-50"
                    >
                      {questionLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving Question...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Security Question</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* SECTION B: CHANGE PASSWORD */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-gray-700" />
                    Change Account Password
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Update the password associated with your account credentials.
                  </p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
                  {passwordNotice && (
                    <div
                      className={`rounded-xl p-3 text-xs border flex items-center gap-2 ${
                        passwordNotice.type === "success"
                          ? "bg-green-50 text-green-800 border-green-200"
                          : "bg-red-50 text-red-800 border-red-200"
                      }`}
                    >
                      {passwordNotice.type === "success" ? (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      )}
                      <span>{passwordNotice.message}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Current Password
                    </label>
                    <div className="relative max-w-md">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-gray-300 p-2.5 pr-10 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                        aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      New Password
                    </label>
                    <div className="relative max-w-md">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full rounded-xl border border-gray-300 p-2.5 pr-10 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
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

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative max-w-md">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-type new password"
                        className="w-full rounded-xl border border-gray-300 p-2.5 pr-10 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
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

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-xs disabled:opacity-50"
                    >
                      {passwordLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <span>Update Password</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {(activeTab === "notifications" || activeTab === "api") && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-500 text-sm">
                This settings panel is currently under development.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
