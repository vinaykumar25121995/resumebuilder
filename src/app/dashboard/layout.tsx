"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, User, Briefcase, Settings, LogOut, LayoutTemplate, Sparkles, FileUp } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Sparkles },
  { name: 'My Profile', href: '/dashboard/profile', icon: User },
  { name: 'Import Resume', href: '/dashboard/import', icon: FileUp },
  { name: 'Resumes', href: '/dashboard/resumes', icon: FileText },
  { name: 'Job Analysis', href: '/dashboard/jobs', icon: Briefcase },
  { name: 'Templates', href: '/dashboard/templates', icon: LayoutTemplate },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-blue-600">ATS Builder</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-blue-700" : "text-gray-400")} />
                  {item.name}
                </Link>
              );
            })}

            {/* Admin Portal Link exclusively for vinay22y95@gmail.com */}
            {session?.user?.email?.toLowerCase() === "vinay22y95@gmail.com" && (
              <div className="pt-2 mt-2 border-t border-gray-100">
                <Link
                  href="/admin"
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-bold rounded-md transition-colors",
                    pathname === "/admin"
                      ? "bg-purple-100 text-purple-800"
                      : "text-purple-700 bg-purple-50/70 hover:bg-purple-100"
                  )}
                >
                  <span className="mr-3 text-base">🛡️</span>
                  Admin Portal
                </Link>
              </div>
            )}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {session?.user?.name || "User"}
                </p>
                {session?.user?.plan === "pro" ? (
                  <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded uppercase">
                    PRO
                  </span>
                ) : (
                  <span className="text-[9px] bg-gray-100 text-gray-600 font-medium px-1.5 py-0.2 rounded uppercase">
                    FREE
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-4 flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 w-full"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
