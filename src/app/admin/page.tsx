"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
  ArrowLeft,
  Crown,
  Database,
  Lock,
  LogOut,
  Sparkles,
} from "lucide-react";

interface UserRecord {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  last_login: string;
  plan: "free" | "pro" | string;
}

const ADMIN_EMAIL = "vinay22y95@gmail.com";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<"all" | "free" | "pro">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const isAuthorized =
    session?.user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok && data.users) {
        setUsers(data.users);
      } else {
        setNotification({
          type: "error",
          message: data.error || "Failed to load user records.",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Network error while fetching users.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (isAuthorized) {
        fetchUsers();
      } else {
        setLoading(false);
      }
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, isAuthorized]);

  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleTogglePlan = async (user: UserRecord) => {
    const nextPlan: "free" | "pro" = user.plan === "pro" ? "free" : "pro";
    setUpdatingId(user.id);

    // Optimistic UI update
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, plan: nextPlan } : u))
    );

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, plan: nextPlan }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast(
          "success",
          `Plan updated to ${nextPlan.toUpperCase()} for ${user.email}`
        );
      } else {
        // Revert on error
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, plan: user.plan } : u))
        );
        showToast("error", data.error || "Failed to update plan.");
      }
    } catch {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, plan: user.plan } : u))
      );
      showToast("error", "Network error updating plan.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.name && u.name.toLowerCase().includes(search.toLowerCase()));
      const matchesPlan =
        planFilter === "all" ? true : (u.plan || "free") === planFilter;
      return matchesSearch && matchesPlan;
    });
  }, [users, search, planFilter]);

  const proCount = users.filter((u) => u.plan === "pro").length;
  const freeCount = users.filter((u) => u.plan !== "pro").length;

  const formatDate = (isoString?: string) => {
    if (!isoString) return "Never";
    try {
      const d = new Date(isoString);
      return isNaN(d.getTime())
        ? "Recently"
        : d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
    } catch {
      return "Recently";
    }
  };

  // 1. Loading state
  if (status === "loading" || (status === "authenticated" && loading && users.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-700">
            Verifying Administrator Credentials...
          </p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated state
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            Authentication Required
          </h1>
          <p className="text-xs text-gray-600 leading-relaxed">
            The Administration portal is strictly protected. Please sign in with the administrator account (<strong>{ADMIN_EMAIL}</strong>) to continue.
          </p>
          <div className="pt-2">
            <Link
              href="/login?callbackUrl=/admin"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              Sign In to Admin Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Access Denied (Authenticated with a different email)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-red-200 p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">403 — Access Denied</h1>
          <p className="text-xs text-gray-600 leading-relaxed">
            You are currently signed in as{" "}
            <span className="font-mono font-bold text-gray-900">
              {session?.user?.email}
            </span>
            .<br />
            Access to this page is restricted strictly to{" "}
            <span className="font-bold text-blue-600">{ADMIN_EMAIL}</span>.
          </p>

          <div className="space-y-2 pt-3">
            <button
              onClick={() => signOut({ callbackUrl: "/login?callbackUrl=/admin" })}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign in as {ADMIN_EMAIL}
            </button>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-colors"
            >
              Return to User Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authorized Administrator View
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-gray-900 transition-colors flex items-center text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Dashboard
              </Link>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-gray-900 text-sm sm:text-base">
                  Administrator Portal
                </span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Super Admin
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs text-gray-500 font-mono">
                {ADMIN_EMAIL}
              </span>
              <button
                onClick={fetchUsers}
                disabled={loading}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Toast Notification */}
        {notification && (
          <div
            className={`flex items-center gap-2 p-3.5 rounded-xl text-xs font-medium border shadow-sm ${
              notification.type === "success"
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Total Users
              </p>
              <p className="text-2xl font-extrabold text-gray-900">{users.length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Pro Subscribers
              </p>
              <p className="text-2xl font-extrabold text-amber-600">{proCount}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Free Tier Users
              </p>
              <p className="text-2xl font-extrabold text-gray-700">{freeCount}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Storage Table
              </p>
              <p className="text-sm font-bold text-emerald-700">
                Supabase: public.users
              </p>
            </div>
          </div>
        </div>

        {/* Search, Filter & Controls */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[11px] font-bold text-gray-500 uppercase mr-1">
              Filter:
            </span>
            {(["all", "free", "pro"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setPlanFilter(filter)}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold capitalize transition-all ${
                  planFilter === filter
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter} {filter === "pro" ? `(${proCount})` : filter === "free" ? `(${freeCount})` : `(${users.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              User Accounts Database ({filteredUsers.length} shown)
            </h2>
            <span className="text-[11px] text-gray-500 font-mono">
              Columns: id, email, name, created_at, last_login, plan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Plan Status</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4 text-right">Switch Plan Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-gray-500 font-medium"
                    >
                      {search || planFilter !== "all"
                        ? "No users matching your filter."
                        : "No users registered yet. New signups will appear here automatically."}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const isPro = u.plan === "pro";
                    const isSelf =
                      u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

                    return (
                      <tr
                        key={u.id || u.email}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase ${
                                isPro
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {(u.name || u.email)[0]}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-gray-900">
                                  {u.name || "Unnamed User"}
                                </span>
                                {isSelf && (
                                  <span className="text-[9px] bg-purple-100 text-purple-700 font-bold px-1.5 py-0.2 rounded">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <span className="text-gray-500 font-mono text-[11px]">
                                {u.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {isPro ? (
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2.5 py-1 rounded-full text-[10px]">
                              <Crown className="w-3 h-3 text-amber-500" /> PRO
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 border border-gray-200 font-semibold px-2.5 py-1 rounded-full text-[10px]">
                              FREE
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-gray-600">
                          {formatDate(u.created_at)}
                        </td>

                        <td className="py-3.5 px-4 text-gray-600 font-mono text-[11px]">
                          {formatDate(u.last_login)}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleTogglePlan(u)}
                            disabled={updatingId === u.id}
                            className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              isPro
                                ? "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-transparent"
                                : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-sm"
                            } disabled:opacity-50`}
                          >
                            {updatingId === u.id ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : isPro ? (
                              <span>Downgrade to Free</span>
                            ) : (
                              <>
                                <Sparkles className="w-3 h-3 text-yellow-200" />
                                <span>Upgrade to Pro</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
