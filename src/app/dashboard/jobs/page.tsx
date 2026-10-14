"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, Building, ExternalLink, Calendar, Search } from "lucide-react";

export default function JobsPage() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const res = await fetch("/api/analyze-job");
        if (res.ok) {
          const data = await res.json();
          setAnalyses(data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyses();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Analysis History</h1>
          <p className="text-sm text-gray-500 mt-1">Jobs you've previously analyzed against your profile.</p>
        </div>
        <Link href="/dashboard/tailor" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Analyze New Job
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search jobs..." 
          className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : analyses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center">
          <Briefcase className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No jobs analyzed yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm">Analyze a job description to extract keywords and see how well your profile matches the role.</p>
          <Link href="/dashboard/tailor" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700">
            Analyze a Job
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase font-medium border-b border-gray-100">
                  <th className="px-6 py-4">Job Title & Company</th>
                  <th className="px-6 py-4">Match Score</th>
                  <th className="px-6 py-4">Date Analyzed</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {analyses.map((job: any) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 mb-1">{job.jobTitle}</div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Building className="w-3.5 h-3.5 mr-1" />
                        {job.company || "Unknown Company"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              (job.matchScore || 0) >= 80 ? 'bg-green-500' : (job.matchScore || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${job.matchScore || 0}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-gray-700">{job.matchScore || 0}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 flex items-center mt-2 gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/tailor?jobId=${job.id}`} className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                        Re-tailor Resume
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
