"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ALL_TEMPLATES,
  filterTemplates,
  TEMPLATE_CATEGORIES,
  TemplateConfig,
} from "@/lib/templates";
import {
  Search,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Filter,
  UserCheck,
  Eye,
  Zap,
  X,
  FileText,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import ResumeTemplateRenderer, { ResumeData } from "@/components/ResumeTemplateRenderer";
import { convertProfileToResumeData } from "@/lib/profile-converter";

// ─── Miniature Preview Card ───────────────────────────────────────────────────

function TemplatePreview({
  template,
  resumeData,
}: {
  template: TemplateConfig;
  resumeData?: ResumeData | null;
}) {
  const s = template.style;
  const accentHex = s.headingColor === "var(--accent)" ? "#2563eb" : s.headingColor;
  const isTwoColumn =
    s.layoutType === "two-column-left-sidebar" ||
    s.layoutType === "two-column-right-sidebar";

  const name = resumeData?.personalInfo?.fullName || "John Doe";
  const title = resumeData?.personalInfo?.title || "Data Analyst";
  const location = resumeData?.personalInfo?.location || "Mumbai, India";
  const email = resumeData?.personalInfo?.email || "john@email.com";
  const skillsText =
    resumeData?.skills?.technical?.slice(0, 4).join(", ") ||
    "SQL, Python, Tableau, Excel";

  return (
    <div
      className="w-full h-44 bg-gray-50 border-b border-gray-100 flex items-center justify-center overflow-hidden"
      style={{ fontFamily: s.fontFamily }}
    >
      <div
        className="bg-white shadow-md rounded-sm overflow-hidden flex"
        style={{
          width: "130px",
          height: "168px",
          fontSize: "4px",
          lineHeight: "1.4",
          flexDirection:
            s.layoutType === "two-column-right-sidebar" ? "row-reverse" : "row",
        }}
      >
        {isTwoColumn ? (
          <>
            <div
              style={{
                width: s.sidebarWidth || "32%",
                backgroundColor: s.sidebarBgColor || "#f8fafc",
                color: s.sidebarTextColor || "#000",
                padding: "8px 4px",
              }}
            >
              {s.hasPhoto && (
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius:
                      s.photoStyle === "round"
                        ? "50%"
                        : s.photoStyle === "rounded"
                        ? "4px"
                        : "0",
                    backgroundColor: "#cbd5e1",
                    margin: "0 auto 6px auto",
                    border: `1px solid ${s.accentColor || "#fff"}`,
                  }}
                />
              )}
              <div style={{ textAlign: "left", marginBottom: "6px" }}>
                <div
                  style={{
                    fontSize: "5.5px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    lineHeight: "1.1",
                    color: s.sidebarTextColor || accentHex,
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: "3.5px", opacity: 0.9 }}>{title}</div>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <div
                  style={{
                    fontSize: "4px",
                    fontWeight: "bold",
                    borderBottom: `0.5px solid ${s.sidebarTextColor || accentHex}`,
                    marginBottom: "2px",
                    color: s.sidebarTextColor || accentHex,
                  }}
                >
                  Contact
                </div>
                <div style={{ fontSize: "3px", opacity: 0.8, lineHeight: "1.4" }}>
                  {location}
                  <br />
                  {email}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "4px",
                    fontWeight: "bold",
                    borderBottom: `0.5px solid ${s.sidebarTextColor || accentHex}`,
                    marginBottom: "2px",
                    color: s.sidebarTextColor || accentHex,
                  }}
                >
                  Skills
                </div>
                <div style={{ fontSize: "3px", opacity: 0.8, lineHeight: "1.4" }}>
                  {skillsText}
                </div>
              </div>
            </div>
            <div style={{ flex: 1, padding: "8px 6px" }}>
              <div style={{ marginBottom: "5px" }}>
                <div
                  style={{
                    fontSize: "4px",
                    fontWeight: "bold",
                    textTransform:
                      s.headingCase === "uppercase" ? "uppercase" : "none",
                    color: accentHex,
                    borderBottom: s.showDividers
                      ? `0.5px solid ${accentHex}`
                      : "none",
                    marginBottom: "2px",
                  }}
                >
                  Summary
                </div>
                <div style={{ fontSize: "3px", color: "#555", lineHeight: "1.3" }}>
                  {resumeData?.summary
                    ? resumeData.summary.slice(0, 65) + "..."
                    : "Experienced professional with proven domain track record."}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "4px",
                    fontWeight: "bold",
                    textTransform:
                      s.headingCase === "uppercase" ? "uppercase" : "none",
                    color: accentHex,
                    borderBottom: s.showDividers
                      ? `0.5px solid ${accentHex}`
                      : "none",
                    marginBottom: "2px",
                  }}
                >
                  Experience
                </div>
                <div style={{ fontSize: "3.5px", fontWeight: "bold", color: "#333" }}>
                  {resumeData?.experience?.[0]?.title || "Senior Analyst"}
                </div>
                <div
                  style={{
                    fontSize: "3px",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
                  {resumeData?.experience?.[0]?.company || "ABC Tech"} | 2022 – Present
                </div>
                <div style={{ fontSize: "3px", color: "#555", marginTop: "1px" }}>
                  {s.bulletChar} Spearheaded business analytics & reporting
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: "8px", width: "100%" }}>
            <div
              style={{
                textAlign: s.nameAlign,
                borderBottom: s.showDividers
                  ? `1.5px solid ${accentHex}`
                  : "none",
                paddingBottom: "4px",
                marginBottom: "4px",
                display: s.hasPhoto ? "flex" : "block",
                alignItems: "center",
                gap: "6px",
                flexDirection: s.nameAlign === "right" ? "row-reverse" : "row",
              }}
            >
              {s.hasPhoto && (
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius:
                      s.photoStyle === "round"
                        ? "50%"
                        : s.photoStyle === "rounded"
                        ? "3px"
                        : "0",
                    backgroundColor: "#cbd5e1",
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "6.5px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: accentHex,
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: "4px", color: "#888" }}>{title}</div>
                <div
                  style={{
                    fontSize: "3px",
                    color: "#aaa",
                    marginTop: "1px",
                  }}
                >
                  {location} | {email}
                </div>
              </div>
            </div>
            <div style={{ marginBottom: "4px" }}>
              <div
                style={{
                  fontSize: "4px",
                  fontWeight: "bold",
                  textTransform:
                    s.headingCase === "uppercase" ? "uppercase" : "none",
                  color: accentHex,
                  borderBottom: s.showDividers
                    ? `0.5px solid ${accentHex}`
                    : "none",
                  paddingBottom: "1px",
                  marginBottom: "2px",
                }}
              >
                Summary
              </div>
              <div style={{ fontSize: "3px", color: "#555", lineHeight: "1.3" }}>
                {resumeData?.summary
                  ? resumeData.summary.slice(0, 60) + "..."
                  : "Experienced professional with proven track record in technology."}
              </div>
            </div>
            <div style={{ marginBottom: "4px" }}>
              <div
                style={{
                  fontSize: "4px",
                  fontWeight: "bold",
                  textTransform:
                    s.headingCase === "uppercase" ? "uppercase" : "none",
                  color: accentHex,
                  borderBottom: s.showDividers
                    ? `0.5px solid ${accentHex}`
                    : "none",
                  paddingBottom: "1px",
                  marginBottom: "2px",
                }}
              >
                Skills
              </div>
              <div style={{ fontSize: "3px", color: "#555" }}>{skillsText}</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "4px",
                  fontWeight: "bold",
                  textTransform:
                    s.headingCase === "uppercase" ? "uppercase" : "none",
                  color: accentHex,
                  borderBottom: s.showDividers
                    ? `0.5px solid ${accentHex}`
                    : "none",
                  paddingBottom: "1px",
                  marginBottom: "2px",
                }}
              >
                Experience
              </div>
              <div>
                <div style={{ fontSize: "3.5px", fontWeight: "bold", color: "#333" }}>
                  {resumeData?.experience?.[0]?.title || "Lead Specialist"}
                </div>
                <div
                  style={{
                    fontSize: "3px",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
                  {resumeData?.experience?.[0]?.company || "ABC Tech"} | 2022 – Present
                </div>
                <div style={{ fontSize: "3px", color: "#555", marginTop: "1px" }}>
                  {s.bulletChar} Drove cross-functional project deliverables
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Template Card ────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  selected,
  onSelect,
  onPreview,
  onGenerate,
  isGenerating,
  resumeData,
}: {
  template: TemplateConfig;
  selected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  resumeData?: ResumeData | null;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border-2 overflow-hidden hover:shadow-xl transition-all duration-200 flex flex-col justify-between ${
        selected
          ? "border-blue-600 shadow-lg shadow-blue-100"
          : "border-gray-100 hover:border-blue-200"
      }`}
    >
      {/* Clickable Header & Preview */}
      <div onClick={onSelect} className="cursor-pointer relative">
        <TemplatePreview template={template} resumeData={resumeData} />
        {selected && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow">
            ✓ Selected
          </div>
        )}
      </div>

      {/* Info & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              onClick={onSelect}
              className="font-bold text-gray-900 text-sm leading-tight cursor-pointer hover:text-blue-600"
            >
              {template.name}
            </h3>
            <span className="flex-shrink-0 bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full border border-green-100">
              ATS {template.atsScore}%
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {template.category.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {cat}
              </span>
            ))}
            {template.style.layoutType?.includes("two-column") && (
              <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                2-Column
              </span>
            )}
            {template.style.hasPhoto && (
              <span className="text-[11px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                Photo
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
            {template.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
          <button
            onClick={onPreview}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
            title="Preview with your real profile data"
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>

          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
            title="Automatically create resume populated from your master profile"
          >
            {isGenerating ? (
              <span className="animate-spin text-xs">⌛</span>
            ) : (
              <Zap className="w-3.5 h-3.5" />
            )}
            Auto-Generate
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Templates Page ──────────────────────────────────────────────────────

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [pageFilter, setPageFilter] = useState<"all" | "one" | "two">("all");

  // User Profile state for live data population
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userResumeData, setUserResumeData] = useState<ResumeData | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  // Full-screen Modal state
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(
    null
  );

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setUserProfile(data);
        const rData = convertProfileToResumeData(data, {
          name: data.userName,
          email: data.userEmail,
        });
        setUserResumeData(rData);
      }
    } catch (err) {
      console.error("Failed to load profile for templates", err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleGenerateResume = async (templateId: string) => {
    setGeneratingId(templateId);
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      const data = await res.json();
      if (data.resumeId) {
        router.push(`/dashboard/editor/${data.resumeId}`);
      } else {
        alert(
          "Could not generate resume: " +
            (data.error || "Please ensure your profile is saved.")
        );
      }
    } catch (err) {
      console.error("Error creating resume:", err);
      alert("An error occurred while generating your resume.");
    } finally {
      setGeneratingId(null);
    }
  };

  const filteredTemplates = useMemo(() => {
    let results = filterTemplates(selectedCategory, searchQuery);
    if (pageFilter !== "all") {
      results = results.filter(
        (t) => t.pageSupport === pageFilter || t.pageSupport === "both"
      );
    }
    return results;
  }, [selectedCategory, searchQuery, pageFilter]);

  const selectedTemplateConfig = ALL_TEMPLATES.find(
    (t) => t.id === selectedTemplate
  );

  const hasCompleteProfile =
    userProfile?.experiences?.length > 0 ||
    userProfile?.skills?.length > 0 ||
    userProfile?.educations?.length > 0;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            ATS-Friendly Resume Templates
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {ALL_TEMPLATES.length} ATS-optimized templates. Pick any template to{" "}
            <strong>instantly populate</strong> with your saved profile.
          </p>
        </div>

        {selectedTemplate && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleGenerateResume(selectedTemplate)}
              disabled={generatingId === selectedTemplate}
              className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
            >
              <Zap className="w-4 h-4 mr-2" />
              {generatingId === selectedTemplate
                ? "Populating Profile..."
                : `Generate with "${selectedTemplateConfig?.name}"`}
            </button>
          </div>
        )}
      </div>

      {/* Profile Auto-Sync Status Banner */}
      <div
        className={`rounded-xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm ${
          hasCompleteProfile
            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
            : "bg-amber-50 border-amber-200 text-amber-900"
        }`}
      >
        <div className="flex items-center gap-3">
          {hasCompleteProfile ? (
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
              <UserCheck className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
          <div>
            <div className="font-bold text-sm flex items-center gap-2">
              {hasCompleteProfile ? (
                <>
                  <span>Master Profile Connected:</span>
                  <span className="font-extrabold underline">
                    {userProfile?.userName || "Your Profile"}
                  </span>
                  {userProfile?.professionalTitle && (
                    <span className="text-xs bg-emerald-200/70 px-2 py-0.5 rounded-full font-medium">
                      {userProfile.professionalTitle}
                    </span>
                  )}
                </>
              ) : (
                <span>Master Profile Needs Information</span>
              )}
            </div>
            <p className="text-xs mt-0.5 opacity-90">
              {hasCompleteProfile
                ? `Loaded ${userProfile?.experiences?.length || 0} work experiences, ${
                    userProfile?.skills?.length || 0
                  } skills, and ${
                    userProfile?.educations?.length || 0
                  } education records. Clicking "Auto-Generate" automatically fills all details for you!`
                : "Your profile is empty or partial. You can import your existing PDF/DOCX resume in 1 click or edit your profile."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/dashboard/profile"
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              hasCompleteProfile
                ? "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                : "bg-amber-600 text-white border-amber-600 hover:bg-amber-700"
            }`}
          >
            Edit Profile
          </Link>
          <Link
            href="/dashboard/import"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Import CV
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates by name, role (e.g. Data Analyst, Engineer), or style..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Page filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-600 font-medium">Pages:</span>
          {(["all", "one", "two"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPageFilter(p)}
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                pageFilter === p
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p === "all" ? "All" : p === "one" ? "1 Page" : "2 Pages"}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400">
            {filteredTemplates.length} templates
          </span>
        </div>
      </div>

      {/* Template Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-gray-500">
            No templates found matching your search. Try a different category or search term.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setPageFilter("all");
            }}
            className="mt-4 text-blue-600 text-sm font-semibold hover:text-blue-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTemplates.map((tmpl) => (
            <TemplateCard
              key={tmpl.id}
              template={tmpl}
              selected={selectedTemplate === tmpl.id}
              onSelect={() =>
                setSelectedTemplate(
                  selectedTemplate === tmpl.id ? null : tmpl.id
                )
              }
              onPreview={() => setPreviewTemplate(tmpl)}
              onGenerate={() => handleGenerateResume(tmpl.id)}
              isGenerating={generatingId === tmpl.id}
              resumeData={userResumeData}
            />
          ))}
        </div>
      )}

      {/* Live Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-gray-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white p-2 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    {previewTemplate.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Live preview populated with your Master Profile data • ATS Score:{" "}
                    <span className="text-green-600 font-bold">
                      {previewTemplate.atsScore}%
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGenerateResume(previewTemplate.id)}
                  disabled={generatingId === previewTemplate.id}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Zap className="w-4 h-4" />
                  {generatingId === previewTemplate.id
                    ? "Generating..."
                    : "Generate Resume Now"}
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: A4 Paper Preview */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-100 flex justify-center">
              <div
                className="bg-white shadow-lg rounded-sm"
                style={{ width: "210mm", minHeight: "297mm" }}
              >
                <ResumeTemplateRenderer
                  template={previewTemplate}
                  data={
                    userResumeData || {
                      personalInfo: {
                        fullName: "Your Name",
                        title: "Professional Title",
                      },
                    }
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar when a template is selected */}
      {selectedTemplate && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 z-40 border border-gray-700 animate-in fade-in slide-in-from-bottom-4">
          <div>
            <p className="font-bold text-sm leading-tight">
              {selectedTemplateConfig?.name}
            </p>
            <p className="text-gray-400 text-xs">
              ATS Compatibility: {selectedTemplateConfig?.atsScore}%
            </p>
          </div>

          <div className="h-6 w-px bg-gray-700" />

          <button
            onClick={() => handleGenerateResume(selectedTemplate)}
            disabled={generatingId === selectedTemplate}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow"
          >
            <Zap className="w-3.5 h-3.5" />
            {generatingId === selectedTemplate
              ? "Generating..."
              : "Generate from My Profile"}
          </button>

          <button
            onClick={() => {
              if (selectedTemplateConfig) setPreviewTemplate(selectedTemplateConfig);
            }}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>

          <Link
            href={`/dashboard/tailor?template=${selectedTemplate}`}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Tailor for Job
          </Link>

          <button
            onClick={() => setSelectedTemplate(null)}
            className="text-gray-400 hover:text-white text-xs ml-1 p-1"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
