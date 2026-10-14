import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FileText, Briefcase, Activity, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // Fetch some stats
  const resumesCount = await prisma.resume.count({ where: { userId: session.user.id } });
  const jobsAnalyzed = await prisma.jobAnalysis.count({ where: { userId: session.user.id } });
  
  // Assume a dummy profile completion for now
  const profileCompletion = 85;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {session.user.name}</h1>
        <Link href="/dashboard/tailor" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
          + Tailor New Resume
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 text-gray-500 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">Profile Completion</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{profileCompletion}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${profileCompletion}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 text-gray-500 mb-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Total Resumes</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{resumesCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 text-gray-500 mb-2">
            <Briefcase className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Jobs Analyzed</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{jobsAnalyzed}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 text-gray-500 mb-2">
            <Activity className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium">Avg ATS Score</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">88%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">Recent Resumes</h3>
        </div>
        <div className="p-6 text-center text-gray-500">
          <p>No tailored resumes yet.</p>
          <Link href="/dashboard/tailor" className="text-blue-600 hover:underline mt-2 inline-block">Create your first job-tailored resume</Link>
        </div>
      </div>
    </div>
  );
}
