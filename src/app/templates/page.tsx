"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ALL_TEMPLATES,
  filterTemplates,
  TEMPLATE_CATEGORIES,
  TemplateConfig,
} from "@/lib/templates";
import {
  Sparkles,
  Crown,
  Eye,
  FileText,
  Search,
  CheckCircle,
  ArrowRight,
  Filter,
  X,
  Zap,
} from "lucide-react";
import ResumeTemplateRenderer from "@/components/ResumeTemplateRenderer";
import TemplateMiniPreview from "@/components/TemplateMiniPreview";
import TemplateInspectionModal from "@/components/TemplateInspectionModal";

export default function PublicTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) setSelectedCategory(cat);
      const q = params.get("q");
      if (q) setSearchQuery(q);
    }
  }, []);

  const filteredTemplates = useMemo(() => {
    return filterTemplates(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#030612]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white font-bold text-xl"
            >
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                ATS Resume Builder
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/#how-it-works"
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#features"
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                Features
              </Link>
              <Link
                href="/templates"
                className="text-cyan-400 font-bold text-sm flex items-center gap-1.5"
              >
                <span>Templates</span>
                <span className="text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded-full leading-none">
                  13 PRO
                </span>
              </Link>
              <Link
                href="/#pricing"
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-600/30"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-amber-300 shadow-sm">
            <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>COMPLETE RESUME TEMPLATE DIRECTORY</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            ATS-Friendly Resume Templates
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Choose from all {ALL_TEMPLATES.length} ATS-optimized templates,
            including our{" "}
            <strong className="text-amber-300">
              13 Premium Pro Templates
            </strong>{" "}
            (Michelle Dhamar, Catherine Barnett, Chris Flims, Will Tribian, Amanda, Claire Russel, Jessica Blakely, Adam Stotch, Nick Koe, Lisa Neumann, Ivana Johnson, Melissa Ware, Veronica Cook).
          </p>
        </div>

        {/* 👑 Premium Pro Spotlight Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 text-white shadow-xl border border-amber-500/40">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-extrabold text-amber-300">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>NEW IN PRO SUBSCRIPTION</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                13 Exclusive Executive & Creative Templates
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Dual columns, slate sidebars, cyan contact banners, diamond divider
                rules, and executive portraits — formatted as machine-readable text
                for 100% ATS pass rates.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-300">
                <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> Catherine Barnett (3D Animator)
                </span>
                <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> Chris Flims (Remote PM)
                </span>
                <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> Will Tribian (Theater Actor)
                </span>
                <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> Amanda Smith (CIO Executive)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
              <button
                onClick={() => setSelectedCategory("Premium")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all"
              >
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>Filter 13 Pro Templates</span>
              </button>
              <Link
                href="/register?plan=pro"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <span>Unlock Pro Access ($12/mo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-lg">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates by role (e.g. Animator, Project Manager, CIO, Tech)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Quick jump to 2-Column & Photo templates */}
          <div className="bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-cyan-500/30 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <span className="text-cyan-200 font-medium flex items-center gap-1.5">
              <span>📑 Looking for Two-Column Sidebars & Photo CVs?</span>
              <span className="text-cyan-400 font-bold">(Templates #18–#22: Blue, Navy, Cream)</span>
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory("2-Column")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedCategory === "2-Column"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                    : "bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-cyan-500/40"
                }`}
              >
                📑 View 2-Column Sidebars
              </button>
              <button
                onClick={() => setSelectedCategory("Photo")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedCategory === "Photo"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                    : "bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-cyan-500/40"
                }`}
              >
                📷 View Photo CVs
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            {TEMPLATE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? cat.id === "Premium"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              className={`bg-slate-900 rounded-2xl border overflow-hidden hover:shadow-2xl transition-all duration-200 flex flex-col justify-between group ${
                tmpl.isPro
                  ? "border-amber-500/50 hover:border-amber-400 shadow-amber-500/10"
                  : "border-slate-800 hover:border-blue-500"
              }`}
            >
                            {/* Visual Preview */}
              <div className="relative">
                <TemplateMiniPreview template={tmpl} onPreviewClick={() => setPreviewTemplate(tmpl)} />
              </div>

              {/* Information */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border ${
                      tmpl.isPro
                        ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                        : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                    }`}>
                      Template #{String(tmpl.number || 0).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {tmpl.isPro && (
                        <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5">
                          <Crown className="w-2.5 h-2.5 fill-current" /> Pro
                        </span>
                      )}
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full">
                        ATS {tmpl.atsScore}%
                      </span>
                    </div>
                  </div>
                  <h3 className="font-extrabold text-white text-sm group-hover:text-amber-300 transition-colors">
                    {tmpl.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {tmpl.bestFor.slice(0, 2).map((b, bi) => (
                      <span
                        key={bi}
                        className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </button>
                  <Link
                    href={`/register?template=${tmpl.id}`}
                    className={`flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                      tmpl.isPro
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {tmpl.isPro ? (
                      <>
                        <Crown className="w-3 h-3 fill-current" />
                        <span>Use (Pro)</span>
                      </>
                    ) : (
                      <span>Use Template</span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Live Preview Modal */}
      {previewTemplate && (
        <TemplateInspectionModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelectTemplate={(id) => {
            window.location.href = `/register?template=${id}`;
          }}
          ctaText="Use This Template Now"
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2025 ATS Resume Builder. All templates engineered for 100% machine readability.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/templates" className="hover:text-white font-bold text-amber-300">Templates</Link>
            <Link href="/#pricing" className="hover:text-white">Pricing</Link>
            <Link href="/login" className="hover:text-white">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
