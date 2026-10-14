"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, MoreVertical, Edit, Trash2, Download, Search, Briefcase, Zap, Sparkles } from "lucide-react";

export default function ResumesPage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await fetch("/api/resumes");
      if (res.ok) {
        const data = await res.json();
        setResumes(data);
      }
    } catch (error) {
      console.error("Failed to fetch resumes", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (res.ok) fetchResumes();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your tailored resumes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/templates" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm text-sm">
            <Zap className="w-4 h-4" /> Auto-Generate from Profile
          </Link>
          <Link href="/dashboard/tailor" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm text-sm">
            <Sparkles className="w-4 h-4" /> Tailor for Job
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search resumes by job title or company..." 
          className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : resumes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center">
          <FileText className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No resumes yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm">You haven't generated any resumes yet. Auto-generate a resume in seconds from your Master Profile, or tailor one for a specific job.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard/templates" className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> Auto-Generate from Profile
            </Link>
            <Link href="/dashboard/tailor" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Tailor for a Job
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume: any) => (
            <div key={resume.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="p-5 border-b border-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-bold text-gray-900 truncate" title={resume.title}>{resume.title}</h3>
                    <p className="text-sm text-gray-500 truncate flex items-center gap-1 mt-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {resume.company || "Unknown Company"}
                    </p>
                  </div>
                  <div className="relative dropdown-container">
                    <button className="text-gray-400 hover:text-gray-600" onClick={(e) => {
                      const menu = e.currentTarget.nextElementSibling;
                      menu?.classList.toggle('hidden');
                    }}>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-10 py-1">
                      <Link href={`/dashboard/editor/${resume.id}`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Edit className="w-4 h-4 mr-2" /> Edit Resume
                      </Link>
                      <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                      </button>
                      <button onClick={() => deleteResume(resume.id)} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1 flex justify-between">
                      ATS Score <span>{resume.atsScore}%</span>
                    </p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${resume.atsScore || 0}%` }}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1 flex justify-between">
                      Match Score <span>{resume.matchScore}%</span>
                    </p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${resume.matchScore || 0}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex items-center justify-between text-xs text-gray-500 mt-auto">
                <span>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                <Link href={`/dashboard/editor/${resume.id}`} className="font-medium text-blue-600 hover:text-blue-700">Open Editor</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
