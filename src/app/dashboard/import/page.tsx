"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Upload, FileText, CheckCircle, AlertCircle, AlertTriangle,
  Loader, ArrowLeft, ArrowRight, Trash2, Plus, ChevronRight,
  FileUp, RefreshCw, Eye
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExtractedProfile {
  personalInfo: {
    fullName: string; email: string; phone: string;
    city: string; state: string; country: string;
    linkedinUrl: string; githubUrl: string; portfolioUrl: string;
    otherLinks: string[]; confidence: string;
  };
  summary: string;
  experiences: any[];
  educations: any[];
  projects: any[];
  skills: any[];
  certifications: any[];
  achievements: any[];
  languages: any[];
  qualityScore: number;
  warnings: string[];
}

// ─── Progress Steps ───────────────────────────────────────────────────────────

const EXTRACTION_STEPS = [
  "Reading document",
  "Extracting text",
  "Detecting sections",
  "Identifying personal information",
  "Extracting education",
  "Extracting work experience",
  "Extracting projects",
  "Extracting skills",
  "Extracting certifications",
  "Building your master profile",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressStep({ label, done, active }: { label: string; done: boolean; active: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-sm transition-all ${done ? "text-green-600" : active ? "text-blue-600 font-medium" : "text-gray-400"}`}>
      {done ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> :
       active ? <Loader className="w-4 h-4 animate-spin flex-shrink-0" /> :
       <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />}
      {label}
    </div>
  );
}

function ConfidenceBadge({ confidence }: { confidence: string }) {
  const map: Record<string, { text: string; cls: string }> = {
    HIGH: { text: "High confidence", cls: "bg-green-50 text-green-700 border-green-100" },
    MEDIUM: { text: "Review recommended", cls: "bg-yellow-50 text-yellow-700 border-yellow-100" },
    LOW: { text: "⚠ Low confidence — please verify", cls: "bg-orange-50 text-orange-700 border-orange-100" },
  };
  const config = map[confidence] || map["MEDIUM"];
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${config.cls}`}>{config.text}</span>
  );
}

function EditableField({
  label, value, onChange, multiline = false, type = "text"
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {multiline ? (
        <textarea
          className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ImportResumePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [step, setStep] = useState<"upload" | "extracting" | "review" | "saving">("upload");
  const [progressStep, setProgressStep] = useState(0);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [qualityScore, setQualityScore] = useState(0);
  const [extracted, setExtracted] = useState<ExtractedProfile | null>(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [saving, setSaving] = useState(false);

  // ─── File upload handler ──────────────────────────────────────────────────

  const handleFile = useCallback(async (file: File) => {
    if (!file) return;

    const name = file.name.toLowerCase();
    if (!name.endsWith(".pdf") && !name.endsWith(".docx") && !name.endsWith(".doc")) {
      setError("Unsupported format. Please upload a PDF or DOCX file.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError("File too large. Maximum size is 15MB.");
      return;
    }

    setError("");
    setFileName(file.name);
    setStep("extracting");
    setProgressStep(0);

    // Animate progress steps
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setProgressStep(current);
      if (current >= EXTRACTION_STEPS.length - 1) clearInterval(timer);
    }, 600);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/import-resume", {
        method: "POST",
        body: formData,
      });

      clearInterval(timer);
      setProgressStep(EXTRACTION_STEPS.length);

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to process resume.");
        setStep("upload");
        return;
      }

      setExtracted(data.extracted);
      setQualityScore(data.qualityScore || 0);
      setTimeout(() => setStep("review"), 500);
    } catch (err) {
      clearInterval(timer);
      setError("An error occurred. Please try again.");
      setStep("upload");
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // ─── Profile field updaters ───────────────────────────────────────────────

  const updatePersonal = (field: string, value: string) => {
    if (!extracted) return;
    setExtracted({ ...extracted, personalInfo: { ...extracted.personalInfo, [field]: value } });
  };

  const updateSummary = (value: string) => {
    if (!extracted) return;
    setExtracted({ ...extracted, summary: value });
  };

  const updateExperience = (i: number, field: string, value: string) => {
    if (!extracted) return;
    const arr = [...extracted.experiences];
    arr[i] = { ...arr[i], [field]: value };
    setExtracted({ ...extracted, experiences: arr });
  };

  const removeExperience = (i: number) => {
    if (!extracted) return;
    setExtracted({ ...extracted, experiences: extracted.experiences.filter((_, idx) => idx !== i) });
  };

  const updateEducation = (i: number, field: string, value: string) => {
    if (!extracted) return;
    const arr = [...extracted.educations];
    arr[i] = { ...arr[i], [field]: value };
    setExtracted({ ...extracted, educations: arr });
  };

  const removeEducation = (i: number) => {
    if (!extracted) return;
    setExtracted({ ...extracted, educations: extracted.educations.filter((_, idx) => idx !== i) });
  };

  const updateProject = (i: number, field: string, value: string) => {
    if (!extracted) return;
    const arr = [...extracted.projects];
    arr[i] = { ...arr[i], [field]: value };
    setExtracted({ ...extracted, projects: arr });
  };

  const removeProject = (i: number) => {
    if (!extracted) return;
    setExtracted({ ...extracted, projects: extracted.projects.filter((_, idx) => idx !== i) });
  };

  const removeSkill = (i: number) => {
    if (!extracted) return;
    setExtracted({ ...extracted, skills: extracted.skills.filter((_, idx) => idx !== i) });
  };

  const removeCert = (i: number) => {
    if (!extracted) return;
    setExtracted({ ...extracted, certifications: extracted.certifications.filter((_, idx) => idx !== i) });
  };

  // ─── Save to profile ──────────────────────────────────────────────────────

  const handleSaveToProfile = async () => {
    if (!extracted) return;
    setSaving(true);
    setStep("saving");

    try {
      // First get existing profile to detect conflicts
      const existingRes = await fetch("/api/profile");
      const existingProfile = await existingRes.json();

      // Build the profile payload
      const profilePayload: Record<string, any> = {};

      // Personal info — only update if field is empty in existing profile
      const p = extracted.personalInfo;
      if (p.fullName && !existingProfile.userName) profilePayload.fullName = p.fullName;
      else if (p.fullName) profilePayload.fullName = p.fullName; // Always use imported name
      if (p.phone) profilePayload.phone = p.phone;
      if (p.city) profilePayload.city = p.city;
      if (p.state) profilePayload.state = p.state;
      if (p.country) profilePayload.country = p.country;
      if (p.linkedinUrl) profilePayload.linkedinUrl = p.linkedinUrl;
      if (p.githubUrl) profilePayload.githubUrl = p.githubUrl;
      if (p.portfolioUrl) profilePayload.portfolioUrl = p.portfolioUrl;
      if (extracted.summary) profilePayload.summary = extracted.summary;

      // Merge arrays — add new items to existing
      const existingExpCompanies = (existingProfile.experiences || []).map((e: any) => e.company?.toLowerCase());
      const newExps = extracted.experiences.filter((exp) =>
        !existingExpCompanies.includes(exp.company?.toLowerCase())
      );
      profilePayload.experiences = [
        ...(existingProfile.experiences || []),
        ...newExps.map((exp) => ({
          company: exp.company || "",
          jobTitle: exp.jobTitle || "",
          location: exp.location || "",
          startDate: exp.startDate || "",
          endDate: exp.endDate || "",
          responsibilities: exp.responsibilities || "",
          technologies: exp.technologies || "",
        })),
      ];

      const existingEduInstitutions = (existingProfile.educations || []).map((e: any) => e.institution?.toLowerCase());
      const newEdus = extracted.educations.filter((edu) =>
        !existingEduInstitutions.includes(edu.institution?.toLowerCase())
      );
      profilePayload.educations = [
        ...(existingProfile.educations || []),
        ...newEdus.map((edu) => ({
          degree: edu.degree || "",
          institution: edu.institution || "",
          fieldOfStudy: edu.fieldOfStudy || "",
          startDate: edu.startDate || "",
          endDate: edu.endDate || "",
          score: edu.score || "",
          location: edu.location || "",
        })),
      ];

      const existingProjectNames = (existingProfile.projects || []).map((p: any) => p.name?.toLowerCase());
      const newProjs = extracted.projects.filter((proj) =>
        !existingProjectNames.includes(proj.name?.toLowerCase())
      );
      profilePayload.projects = [
        ...(existingProfile.projects || []),
        ...newProjs.map((proj) => ({
          name: proj.name || "",
          description: proj.description || "",
          technologies: proj.technologies || "",
          results: proj.results || "",
          url: proj.url || "",
        })),
      ];

      // Merge skills — deduplicate
      const existingSkillNames = (existingProfile.skills || []).map((s: any) =>
        (typeof s === "string" ? s : s.name)?.toLowerCase()
      );
      const newSkills = extracted.skills.filter((skill) => {
        const skillName = (typeof skill === "string" ? skill : skill.name)?.toLowerCase();
        return !existingSkillNames.includes(skillName);
      });
      profilePayload.skills = [
        ...(existingProfile.skills || []),
        ...newSkills.map((skill) => ({
          name: typeof skill === "string" ? skill : skill.name,
          category: skill.category || "Technical",
        })),
      ];

      const existingCertNames = (existingProfile.certifications || []).map((c: any) => c.name?.toLowerCase());
      const newCerts = extracted.certifications.filter((cert) =>
        !existingCertNames.includes(cert.name?.toLowerCase())
      );
      profilePayload.certifications = [
        ...(existingProfile.certifications || []),
        ...newCerts.map((cert) => ({
          name: cert.name || "",
          issuer: cert.issuer || "",
          date: cert.date || "",
          url: cert.url || "",
        })),
      ];

      profilePayload.achievements = [
        ...(existingProfile.achievements || []),
        ...extracted.achievements.map((ach) => ({ title: ach.title || "", description: ach.description || "" })),
      ];

      profilePayload.languages = [
        ...(existingProfile.languages || []),
        ...extracted.languages.map((lang) => ({ name: lang.name || "", proficiency: lang.proficiency || "" })),
      ];

      const saveRes = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profilePayload),
      });

      if (saveRes.ok) {
        router.push("/dashboard/profile?imported=true");
      } else {
        setError("Failed to save profile. Please try again.");
        setStep("review");
        setSaving(false);
      }
    } catch (err) {
      setError("An error occurred while saving. Please try again.");
      setStep("review");
      setSaving(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/profile" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Existing Resume</h1>
          <p className="text-gray-600 text-sm mt-0.5">
            Upload your current resume and we'll automatically build your master profile.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{error}</p>
            <button onClick={() => setError("")} className="text-xs text-red-600 underline mt-1">Dismiss</button>
          </div>
        </div>
      )}

      {/* ─── STEP 1: Upload ─────────────────────────────────────────────────── */}
      {step === "upload" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">📄</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Already have a resume?</h2>
            <p className="text-gray-600 mb-8">
              Upload it and we'll automatically extract your information into your master profile.
            </p>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all ${
                dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
              }`}
            >
              <FileUp className={`w-12 h-12 mx-auto mb-4 ${dragging ? "text-blue-500" : "text-gray-400"}`} />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {dragging ? "Drop your resume here" : "Drag & Drop PDF or DOCX Here"}
              </p>
              <p className="text-gray-500 text-sm mb-6">or</p>
              <button
                type="button"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse & Upload Resume
              </button>
              <p className="text-xs text-gray-400 mt-4">Supported: PDF, DOCX · Max size: 15MB</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>

          {/* Info box */}
          <div className="bg-blue-50 border-t border-blue-100 p-5">
            <h3 className="font-semibold text-blue-900 text-sm mb-2">What gets extracted?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-blue-800">
              {["Contact Information", "Professional Summary", "Work Experience", "Education", "Projects", "Skills", "Certifications", "Achievements", "Languages"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── STEP 2: Extracting ──────────────────────────────────────────────── */}
      {step === "extracting" && (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Analyzing your resume...</h2>
            <p className="text-gray-500 text-sm mt-1">{fileName}</p>
          </div>

          <div className="max-w-sm mx-auto space-y-3">
            {EXTRACTION_STEPS.map((s, i) => (
              <ProgressStep
                key={i}
                label={s}
                done={i < progressStep}
                active={i === progressStep}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─── STEP 3: Review ──────────────────────────────────────────────────── */}
      {step === "review" && extracted && (
        <>
          {/* Quality Score */}
          <div className={`rounded-xl border p-5 ${
            qualityScore >= 80 ? "bg-green-50 border-green-100" :
            qualityScore >= 60 ? "bg-yellow-50 border-yellow-100" :
            "bg-orange-50 border-orange-100"
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-2xl font-bold ${
                  qualityScore >= 80 ? "text-green-700" :
                  qualityScore >= 60 ? "text-yellow-700" : "text-orange-700"
                }`}>{qualityScore}% Extraction Quality</p>
                <p className={`text-sm mt-1 ${
                  qualityScore >= 80 ? "text-green-600" :
                  qualityScore >= 60 ? "text-yellow-600" : "text-orange-600"
                }`}>
                  {qualityScore >= 80 ? "Excellent extraction. Review and confirm below." :
                   qualityScore >= 60 ? "Good extraction. A few fields may need review." :
                   "Partial extraction. Please review all fields carefully before saving."}
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Contact", ok: !!(extracted.personalInfo.email || extracted.personalInfo.phone) },
                    { label: "Education", ok: extracted.educations.length > 0 },
                    { label: "Experience", ok: extracted.experiences.length > 0 },
                    { label: "Skills", ok: extracted.skills.length > 0 },
                    { label: "Projects", ok: extracted.projects.length > 0 },
                  ].map(({ label, ok }) => (
                    <span key={label} className={`text-xs px-2 py-1 rounded-full border font-medium ${
                      ok ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"
                    }`}>
                      {ok ? "✓" : "?"} {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {extracted.warnings?.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Review Required
              </p>
              <ul className="space-y-1">
                {extracted.warnings.map((w, i) => (
                  <li key={i} className="text-xs text-yellow-700">• {w}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 p-5 bg-gray-50">
              <h2 className="font-bold text-gray-900">Review Your Imported Profile</h2>
              <p className="text-sm text-gray-600 mt-1">
                Every field is editable. Correct any extraction errors before saving to your master profile.
              </p>
            </div>

            {/* Section Nav */}
            <div className="border-b border-gray-100 px-5 py-2 flex gap-1 overflow-x-auto bg-white">
              {[
                { id: "personal", label: "Personal" },
                { id: "experience", label: `Experience (${extracted.experiences.length})` },
                { id: "education", label: `Education (${extracted.educations.length})` },
                { id: "skills", label: `Skills (${extracted.skills.length})` },
                { id: "projects", label: `Projects (${extracted.projects.length})` },
                { id: "certifications", label: `Certs (${extracted.certifications.length})` },
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium whitespace-nowrap flex-shrink-0 ${
                    activeSection === sec.id ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* Personal Info */}
              {activeSection === "personal" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Personal Information</h3>
                    <ConfidenceBadge confidence={extracted.personalInfo.confidence || "MEDIUM"} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EditableField label="Full Name *" value={extracted.personalInfo.fullName} onChange={(v) => updatePersonal("fullName", v)} />
                    <EditableField label="Email" value={extracted.personalInfo.email} onChange={(v) => updatePersonal("email", v)} type="email" />
                    <EditableField label="Phone" value={extracted.personalInfo.phone} onChange={(v) => updatePersonal("phone", v)} />
                    <EditableField label="City" value={extracted.personalInfo.city} onChange={(v) => updatePersonal("city", v)} />
                    <EditableField label="State" value={extracted.personalInfo.state} onChange={(v) => updatePersonal("state", v)} />
                    <EditableField label="Country" value={extracted.personalInfo.country} onChange={(v) => updatePersonal("country", v)} />
                    <EditableField label="LinkedIn URL" value={extracted.personalInfo.linkedinUrl} onChange={(v) => updatePersonal("linkedinUrl", v)} />
                    <EditableField label="GitHub URL" value={extracted.personalInfo.githubUrl} onChange={(v) => updatePersonal("githubUrl", v)} />
                    <div className="md:col-span-2">
                      <EditableField label="Portfolio / Website URL" value={extracted.personalInfo.portfolioUrl} onChange={(v) => updatePersonal("portfolioUrl", v)} />
                    </div>
                    <div className="md:col-span-2">
                      <EditableField label="Professional Summary" value={extracted.summary} onChange={updateSummary} multiline />
                    </div>
                  </div>
                </div>
              )}

              {/* Experience */}
              {activeSection === "experience" && (
                <div className="space-y-4">
                  {extracted.experiences.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-6">No work experience detected.</p>
                  ) : extracted.experiences.map((exp, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-4 relative">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 text-sm">{exp.jobTitle || "Experience"} @ {exp.company}</h4>
                        <div className="flex items-center gap-2">
                          {exp.confidence && <ConfidenceBadge confidence={exp.confidence} />}
                          <button onClick={() => removeExperience(i)} className="text-gray-300 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <EditableField label="Job Title" value={exp.jobTitle || ""} onChange={(v) => updateExperience(i, "jobTitle", v)} />
                        <EditableField label="Company" value={exp.company || ""} onChange={(v) => updateExperience(i, "company", v)} />
                        <EditableField label="Location" value={exp.location || ""} onChange={(v) => updateExperience(i, "location", v)} />
                        <div className="grid grid-cols-2 gap-2">
                          <EditableField label="Start Date" value={exp.startDate || ""} onChange={(v) => updateExperience(i, "startDate", v)} />
                          <EditableField label="End Date" value={exp.endDate || ""} onChange={(v) => updateExperience(i, "endDate", v)} />
                        </div>
                        <div className="md:col-span-2">
                          <EditableField label="Responsibilities" value={exp.responsibilities || ""} onChange={(v) => updateExperience(i, "responsibilities", v)} multiline />
                        </div>
                        <div className="md:col-span-2">
                          <EditableField label="Technologies Used" value={exp.technologies || ""} onChange={(v) => updateExperience(i, "technologies", v)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {activeSection === "education" && (
                <div className="space-y-4">
                  {extracted.educations.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-6">No education detected.</p>
                  ) : extracted.educations.map((edu, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-4 relative">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 text-sm">{edu.degree} — {edu.institution}</h4>
                        <div className="flex items-center gap-2">
                          {edu.confidence && <ConfidenceBadge confidence={edu.confidence} />}
                          <button onClick={() => removeEducation(i)} className="text-gray-300 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <EditableField label="Degree" value={edu.degree || ""} onChange={(v) => updateEducation(i, "degree", v)} />
                        <EditableField label="Institution" value={edu.institution || ""} onChange={(v) => updateEducation(i, "institution", v)} />
                        <EditableField label="Field of Study" value={edu.fieldOfStudy || ""} onChange={(v) => updateEducation(i, "fieldOfStudy", v)} />
                        <EditableField label="GPA / Score / Percentage" value={edu.score || ""} onChange={(v) => updateEducation(i, "score", v)} />
                        <EditableField label="Start Year" value={edu.startDate || ""} onChange={(v) => updateEducation(i, "startDate", v)} />
                        <EditableField label="End Year" value={edu.endDate || ""} onChange={(v) => updateEducation(i, "endDate", v)} />
                        <EditableField label="Location" value={edu.location || ""} onChange={(v) => updateEducation(i, "location", v)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {activeSection === "skills" && (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    {extracted.skills.length} skills detected (including from experience and project descriptions).
                    Click × to remove any incorrect ones.
                  </p>
                  {extracted.skills.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-6">No skills detected.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {extracted.skills.map((skill, i) => (
                        <span key={i} className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm border border-blue-100">
                          {typeof skill === "string" ? skill : skill.name}
                          <button onClick={() => removeSkill(i)} className="ml-2 text-blue-400 hover:text-red-500">×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Projects */}
              {activeSection === "projects" && (
                <div className="space-y-4">
                  {extracted.projects.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-6">No projects detected.</p>
                  ) : extracted.projects.map((proj, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-4 relative">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 text-sm">{proj.name || "Project"}</h4>
                        <div className="flex items-center gap-2">
                          {proj.confidence && <ConfidenceBadge confidence={proj.confidence} />}
                          <button onClick={() => removeProject(i)} className="text-gray-300 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <EditableField label="Project Name" value={proj.name || ""} onChange={(v) => updateProject(i, "name", v)} />
                        <EditableField label="Technologies" value={proj.technologies || ""} onChange={(v) => updateProject(i, "technologies", v)} />
                        <div className="md:col-span-2">
                          <EditableField label="Description" value={proj.description || ""} onChange={(v) => updateProject(i, "description", v)} multiline />
                        </div>
                        <EditableField label="Results / Impact" value={proj.results || ""} onChange={(v) => updateProject(i, "results", v)} />
                        <EditableField label="Project URL" value={proj.url || ""} onChange={(v) => updateProject(i, "url", v)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {activeSection === "certifications" && (
                <div className="space-y-3">
                  {extracted.certifications.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-6">No certifications detected.</p>
                  ) : extracted.certifications.map((cert, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-4 relative">
                      <button onClick={() => removeCert(i)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                        <EditableField label="Certification Name" value={cert.name || ""} onChange={(v) => { const arr = [...extracted.certifications]; arr[i].name = v; setExtracted({ ...extracted, certifications: arr }); }} />
                        <EditableField label="Issuing Organization" value={cert.issuer || ""} onChange={(v) => { const arr = [...extracted.certifications]; arr[i].issuer = v; setExtracted({ ...extracted, certifications: arr }); }} />
                        <EditableField label="Date" value={cert.date || ""} onChange={(v) => { const arr = [...extracted.certifications]; arr[i].date = v; setExtracted({ ...extracted, certifications: arr }); }} />
                        <EditableField label="Credential URL" value={cert.url || ""} onChange={(v) => { const arr = [...extracted.certifications]; arr[i].url = v; setExtracted({ ...extracted, certifications: arr }); }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="border-t border-gray-100 p-6 flex flex-col sm:flex-row gap-3 justify-between">
              <button
                onClick={() => { setStep("upload"); setExtracted(null); setError(""); }}
                className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" /> Upload Different File
              </button>
              <button
                onClick={handleSaveToProfile}
                disabled={saving}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? <><Loader className="w-4 h-4 animate-spin" /> Saving...</> : <><CheckCircle className="w-4 h-4" /> Confirm & Build Master Profile</>}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ─── STEP 4: Saving ──────────────────────────────────────────────────── */}
      {step === "saving" && (
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Loader className="w-8 h-8 text-green-600 animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Building Your Master Profile...</h2>
          <p className="text-gray-500 text-sm">Merging extracted information with your profile. This will only take a moment.</p>
        </div>
      )}
    </div>
  );
}
