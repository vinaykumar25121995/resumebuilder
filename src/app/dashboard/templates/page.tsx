"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  Crown,
  Lock,
} from "lucide-react";
import ResumeTemplateRenderer, { ResumeData } from "@/components/ResumeTemplateRenderer";
import TemplateMiniPreview from "@/components/TemplateMiniPreview";
import TemplateInspectionModal from "@/components/TemplateInspectionModal";
import { convertProfileToResumeData } from "@/lib/profile-converter";

// ─── Template Card ────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  selected,
  onSelect,
  onPreview,
  onGenerate,
  isGenerating,
  resumeData,
  isProUser,
  onOpenUpgrade,
}: {
  template: TemplateConfig;
  selected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  resumeData?: ResumeData | null;
  isProUser: boolean;
  onOpenUpgrade: () => void;
}) {
  const isLocked = template.isPro && !isProUser;

  return (
    <div
      className={`bg-white rounded-2xl border-2 overflow-hidden hover:shadow-xl transition-all duration-200 flex flex-col justify-between ${
        template.isPro
          ? selected
            ? "border-amber-500 shadow-lg shadow-amber-100 ring-2 ring-amber-400/40"
            : "border-amber-400/60 hover:border-amber-500 shadow-sm"
          : selected
          ? "border-blue-600 shadow-lg shadow-blue-100"
          : "border-gray-100 hover:border-blue-200"
      }`}
    >
      {/* Clickable Header & Preview */}
      <div onClick={onSelect} className="cursor-pointer relative">
        <TemplateMiniPreview
          template={template}
          customData={resumeData}
          onPreviewClick={onPreview}
        />

        {selected && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow z-20">
            ✓ Selected
          </div>
        )}
      </div>

      {/* Info & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border ${
              template.isPro
                ? "bg-amber-50 text-amber-800 border-amber-300"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              Template #{String(template.number || 0).padStart(2, "0")}
            </span>
            <span className="flex-shrink-0 bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full border border-green-100">
              ATS {template.atsScore}%
            </span>
          </div>

          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              onClick={onSelect}
              className="font-bold text-gray-900 text-sm leading-tight cursor-pointer hover:text-blue-600 flex items-center gap-1"
            >
              {template.name}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {template.isPro && (
              <span className="text-[11px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200/60 flex items-center gap-1">
                <Crown className="w-2.5 h-2.5 text-amber-600 fill-amber-600" /> Pro Member
              </span>
            )}
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

          {isLocked ? (
            <button
              onClick={onOpenUpgrade}
              className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 transition-all shadow-md shadow-amber-500/20"
              title="Unlock this template with Pro membership"
            >
              <Lock className="w-3.5 h-3.5 text-white" />
              Unlock (Pro)
            </button>
          ) : (
            <button
              onClick={onGenerate}
              disabled={isGenerating}
              className={`flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-bold text-white transition-colors disabled:opacity-50 shadow-sm ${
                template.isPro
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              title="Automatically create resume populated from your master profile"
            >
              {isGenerating ? (
                <span className="animate-spin text-xs">⌛</span>
              ) : (
                <Zap className="w-3.5 h-3.5" />
              )}
              Auto-Generate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Templates Page ──────────────────────────────────────────────────────

export default function TemplatesPage() {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [pageFilter, setPageFilter] = useState<"all" | "one" | "two">("all");

  // Pro Subscription State
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);
  const [targetProTemplate, setTargetProTemplate] = useState<TemplateConfig | null>(null);

  // User Profile state for live data population
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userResumeData, setUserResumeData] = useState<ResumeData | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  // Full-screen Modal state
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(
    null
  );

  // Resolve user plan & Pro status
  const userPlan = (session?.user as any)?.plan || userProfile?.plan || "free";
  const userEmail = session?.user?.email || userProfile?.userEmail || "";
  const isAdmin =
    userEmail === "atsfriendlyresumes.admin@gmail.com" ||
    userEmail === "vinay22y95@gmail.com";
  const isProUser = userPlan === "pro" || userPlan === "enterprise" || isAdmin;

  useEffect(() => {
    fetchProfile();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) setSelectedCategory(cat);
      const q = params.get("q");
      if (q) setSearchQuery(q);
    }
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

  const handleUpgradeToPro = async () => {
    setUpgrading(true);
    try {
      const res = await fetch("/api/user/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUpgradeSuccess(true);
        if (updateSession) {
          await updateSession({ plan: "pro" });
        }
        setUserProfile((prev: any) => ({ ...prev, plan: "pro" }));
        setTimeout(() => {
          setUpgradeModalOpen(false);
          setUpgradeSuccess(false);
          if (targetProTemplate) {
            handleGenerateResume(targetProTemplate.id);
          }
        }, 1200);
      } else {
        alert(data.error || "Failed to activate Pro membership");
      }
    } catch (err) {
      console.error("Upgrade error:", err);
      alert("Failed to activate Pro membership. Please try again.");
    } finally {
      setUpgrading(false);
    }
  };

  const handleGenerateResume = async (templateId: string) => {
    const target = ALL_TEMPLATES.find((t) => t.id === templateId);
    if (target?.isPro && !isProUser) {
      setTargetProTemplate(target);
      setUpgradeModalOpen(true);
      return;
    }

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
              className={`inline-flex items-center text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm disabled:opacity-50 ${
                selectedTemplateConfig?.isPro && !isProUser
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {selectedTemplateConfig?.isPro && !isProUser ? (
                <>
                  <Crown className="w-4 h-4 mr-2 text-amber-200 fill-amber-200" />
                  Unlock (Pro Member Only)
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  {generatingId === selectedTemplate
                    ? "Populating Profile..."
                    : `Generate with "${selectedTemplateConfig?.name}"`}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* 👑 Premium Pro Showcase Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl border border-amber-500/30">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-extrabold text-amber-300">
              <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>PREMIUM PRO COLLECTION</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              4 Exclusive Executive & Creative Templates
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Designed as exact high-impact visual layouts: <strong className="text-amber-200">Catherine Barnett</strong> (3D Character Animator), <strong className="text-amber-200">Chris Flims</strong> (Remote PM), <strong className="text-amber-200">Will Tribian</strong> (Theater Actor), and <strong className="text-amber-200">Amanda Smith</strong> (CIO).
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-300">
              <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <CheckCircle className="w-3 h-3 text-emerald-400" /> Custom Sidebars & Badges
              </span>
              <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <CheckCircle className="w-3 h-3 text-emerald-400" /> Diamond Rules & Headshots
              </span>
              <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <CheckCircle className="w-3 h-3 text-emerald-400" /> 100% Machine-Readable Vector Text
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 flex-shrink-0">
            {isProUser ? (
              <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Pro Member Active — All 4 Unlocked</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setTargetProTemplate(null);
                  setUpgradeModalOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-lg shadow-amber-500/30 transition-all transform hover:scale-[1.02]"
              >
                <Crown className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>Upgrade to Pro ($12/mo)</span>
              </button>
            )}

            <button
              onClick={() => setSelectedCategory("Premium")}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border transition-colors ${
                selectedCategory === "Premium"
                  ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                  : "bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border-amber-500/30"
              }`}
            >
              <span>View 4 Premium Templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
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

        {/* Quick jump to 2-Column & Photo templates */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <span className="text-blue-900 font-medium flex items-center gap-1.5">
            <span>📑 Looking for Two-Column Sidebars & Photo CVs?</span>
            <span className="text-blue-600 font-bold">(Templates #45–#49: Blue, Navy, Cream)</span>
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedCategory("2-Column")}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                selectedCategory === "2-Column"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-blue-700 hover:bg-blue-100 border border-blue-200"
              }`}
            >
              📑 View 2-Column Sidebars
            </button>
            <button
              onClick={() => setSelectedCategory("Photo")}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                selectedCategory === "Photo"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-blue-700 hover:bg-blue-100 border border-blue-200"
              }`}
            >
              📷 View Photo CVs
            </button>
          </div>
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
              isProUser={isProUser}
              onOpenUpgrade={() => {
                setTargetProTemplate(tmpl);
                setUpgradeModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Live Populated Inspection Modal */}
      {previewTemplate && (
        <TemplateInspectionModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelectTemplate={(id) => handleGenerateResume(id)}
          userResumeData={userResumeData}
          isProUser={isProUser}
          onOpenUpgrade={() => {
            setTargetProTemplate(previewTemplate);
            setUpgradeModalOpen(true);
          }}
          isGenerating={generatingId === previewTemplate.id}
          ctaText={`Generate with "${previewTemplate.name}"`}
        />
      )}

      {/* Sticky Bottom Bar when a template is selected */}
      {selectedTemplate && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 z-40 border border-gray-700 animate-in fade-in slide-in-from-bottom-4">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-bold text-sm leading-tight">
                {selectedTemplateConfig?.name}
              </p>
              {selectedTemplateConfig?.isPro && (
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded font-bold">
                  PRO
                </span>
              )}
            </div>
            <p className="text-gray-400 text-xs">
              ATS Compatibility: {selectedTemplateConfig?.atsScore}%
            </p>
          </div>

          <div className="h-6 w-px bg-gray-700" />

          {selectedTemplateConfig?.isPro && !isProUser ? (
            <button
              onClick={() => {
                setTargetProTemplate(selectedTemplateConfig);
                setUpgradeModalOpen(true);
              }}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
            >
              <Crown className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
              Unlock (Pro Member Only)
            </button>
          ) : (
            <button
              onClick={() => handleGenerateResume(selectedTemplate)}
              disabled={generatingId === selectedTemplate}
              className={`text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow ${
                selectedTemplateConfig?.isPro
                  ? "bg-amber-600 hover:bg-amber-500"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              {generatingId === selectedTemplate
                ? "Generating..."
                : "Generate from My Profile"}
            </button>
          )}

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

      {/* 👑 Upgrade to Pro Modal */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl text-white">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 text-slate-950 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-slate-950/20 p-2.5 rounded-2xl border border-slate-950/20">
                  <Crown className="w-7 h-7 text-slate-950 fill-slate-950" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full">
                    Pro Membership
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-1">
                    Unlock Premium Resume Templates
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setUpgradeModalOpen(false)}
                className="text-slate-950 hover:bg-black/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <p className="text-sm text-slate-300 leading-relaxed">
                {targetProTemplate ? (
                  <>
                    <strong className="text-amber-300">{targetProTemplate.name}</strong>{" "}
                    is an exclusive Pro template. Upgrade today to unlock this template and all executive designs instantly.
                  </>
                ) : (
                  "Upgrade to Pro to unlock all 4 exclusive executive & creative templates, designed for senior professionals and creative leaders."
                )}
              </p>

              {/* Showcase the 4 Pro Templates */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 4 Premium Pro Templates Included:
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-200">
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <div>
                      <div className="font-bold">Catherine Barnett</div>
                      <div className="text-[10px] text-slate-400">3D Character Animator</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    <div>
                      <div className="font-bold">Chris Flims</div>
                      <div className="text-[10px] text-slate-400">Project Manager (Remote)</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                    <div>
                      <div className="font-bold">Will Tribian</div>
                      <div className="text-[10px] text-slate-400">Theater Actor Profile</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <div>
                      <div className="font-bold">Amanda Smith</div>
                      <div className="text-[10px] text-slate-400">Chief Information Officer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features Checklist */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Dual columns, slate sidebars, cyan banners & diamond section dividers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% ATS Friendly parsing with high-fidelity vector PDF & DOCX export</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Unlimited AI tailoring, ATS score reports, and bullet optimizer</span>
                </div>
              </div>

              {upgradeSuccess && (
                <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-200 p-3.5 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>🎉 Pro subscription unlocked successfully! Opening template...</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleUpgradeToPro}
                  disabled={upgrading || upgradeSuccess}
                  className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black py-3 px-5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {upgrading ? (
                    <>
                      <span className="animate-spin text-sm">⌛</span>
                      <span>Activating Pro Access...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 fill-slate-950 text-slate-950" />
                      <span>Activate Pro Access ($12/mo)</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setUpgradeModalOpen(false)}
                  className="px-4 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
