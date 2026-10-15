"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  Activity,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Plus,
  Upload,
  User,
  LayoutTemplate,
} from "lucide-react";

interface DashboardData {
  resumesCount: number;
  jobsAnalyzed: number;
  profileCompletion: number;
  avgAtsScore: number;
  highestMatch: number;
  recentResumes: Array<{
    id: string;
    title: string;
    targetJobTitle: string;
    company: string;
    atsScore: number;
    matchScore: number;
    updatedAt: string;
  }>;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<DashboardData>({
    resumesCount: 0,
    jobsAnalyzed: 0,
    profileCompletion: 60,
    avgAtsScore: 0,
    highestMatch: 0,
    recentResumes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.warn("Could not load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    if (status === "authenticated") {
      fetchStats();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const userName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "User";
  const userEmail = session?.user?.email || "";
  const isAdmin = userEmail.toLowerCase() === "vinay22y95@gmail.com";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATS Resume Optimizer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {userName}!
          </h1>
          <p className="text-blue-100 text-sm mt-1 max-w-xl">
            Build once, tailor for every job application, and bypass Applicant Tracking Systems with ease.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/tailor"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Tailor New Resume
          </Link>
          <Link
            href="/dashboard/import"
            className="inline-flex items-center gap-2 bg-blue-700/60 hover:bg-blue-700 text-white border border-blue-400/30 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import PDF
          </Link>
        </div>
      </div>

      {/* Admin Notice if logged in as vinay22y95@gmail.com */}
      {isAdmin && (
        <div className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
              🛡️
            </div>
            <div>
              <h2 className="text-sm font-bold text-purple-900">
                Administrator Access Active
              </h2>
              <p className="text-xs text-purple-700">
                You have administrative privileges to manage user plans and accounts.
              </p>
            </div>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            Open Admin Portal
          </Link>
        </div>
      )}

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Profile Completion */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Master Profile
              </span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-3xl font-black text-gray-900">
              {loading ? "--" : `${data.profileCompletion}%`}
            </p>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${data.profileCompletion}%` }}
              ></div>
            </div>
            <Link
              href="/dashboard/profile"
              className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              Complete profile <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Total Resumes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Tailored Resumes
              </span>
              <FileText className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-3xl font-black text-gray-900">
              {loading ? "--" : data.resumesCount}
            </p>
          </div>
          <Link
            href="/dashboard/resumes"
            className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            View all resumes <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Jobs Analyzed */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Jobs Analyzed
              </span>
              <Briefcase className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-3xl font-black text-gray-900">
              {loading ? "--" : data.jobsAnalyzed}
            </p>
          </div>
          <Link
            href="/dashboard/jobs"
            className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            View job analyses <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Avg ATS Score */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Avg ATS Score
              </span>
              <Activity className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl font-black text-gray-900">
              {loading ? "--" : data.avgAtsScore ? `${data.avgAtsScore}%` : "Ready"}
            </p>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Based on ATS compatibility checks
          </p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/dashboard/tailor"
            className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Tailor for a Job</h3>
            <p className="text-xs text-gray-500">
              Paste any job description to generate an ATS-optimized resume.
            </p>
          </Link>

          <Link
            href="/dashboard/profile"
            className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <User className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Master Profile</h3>
            <p className="text-xs text-gray-500">
              Update your experiences, skills, education, and credentials once.
            </p>
          </Link>

          <Link
            href="/dashboard/templates"
            className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Browse Templates</h3>
            <p className="text-xs text-gray-500">
              Explore 20+ proven, recruiter-approved ATS formats.
            </p>
          </Link>
        </div>
      </div>

      {/* Recent Resumes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">Recent Resumes</h2>
          <Link
            href="/dashboard/resumes"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            View All
          </Link>
        </div>
        <div className="p-6">
          {data.recentResumes && data.recentResumes.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {data.recentResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">
                      {resume.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {resume.targetJobTitle}{" "}
                      {resume.company ? `• ${resume.company}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {resume.atsScore ? (
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                        ATS {resume.atsScore}%
                      </span>
                    ) : null}
                    <Link
                      href={`/dashboard/editor/${resume.id}`}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">
                No resumes tailored yet
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Start by tailoring your master profile for your next job application.
              </p>
              <Link
                href="/dashboard/tailor"
                className="mt-4 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Create your first resume
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
