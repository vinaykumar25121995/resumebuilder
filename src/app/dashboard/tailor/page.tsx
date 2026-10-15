"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FileSearch, Target, CheckCircle, FileText } from "lucide-react";

function TailorPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") || "ats-two-column-blue";

  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const [analysisId, setAnalysisId] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription) return;
    setLoading(true);
    try {
      const res = await fetch("/api/analyze-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysis(JSON.parse(data.analysis.extractedData));
        setAnalysisId(data.analysis.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTailor = async () => {
    if (!analysisId) return;
    setLoading(true);
    try {
       const res = await fetch("/api/tailor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobAnalysisId: analysisId, template: templateParam })
       });
       const data = await res.json();
       if (data.resumeId) {
          router.push(`/dashboard/editor/${data.resumeId}`);
       }
    } catch(err) {
       console.error(err);
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tailor Your Resume</h2>
        <p className="text-gray-600 mb-6">Paste the job description below. Our AI will analyze the requirements and match them against your master profile.</p>

        <textarea
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || !jobDescription}
            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Job Description"}
          </button>
        </div>
      </div>

      {analysis && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Job Analysis Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-500 uppercase">Target Role</span>
                <p className="text-xl font-bold text-gray-900">{analysis.jobTitle}</p>
                <p className="text-md text-gray-600">{analysis.company}</p>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-500 uppercase">Priority Keywords</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {analysis.priorityKeywords?.map((kw: string, i: number) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-sm font-semibold text-gray-500 uppercase">Technical Skills Required</span>
                <ul className="mt-2 space-y-1">
                  {analysis.technicalSkills?.slice(0, 5).map((skill: string, i: number) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-500 uppercase">Soft Skills</span>
                <ul className="mt-2 space-y-1">
                  {analysis.softSkills?.slice(0, 5).map((skill: string, i: number) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-gray-400 mr-2" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end space-x-4">
             <button
              onClick={handleTailor}
              className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate Tailored Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TailorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading Tailor page...</div>}>
      <TailorPageContent />
    </Suspense>
  );
}
