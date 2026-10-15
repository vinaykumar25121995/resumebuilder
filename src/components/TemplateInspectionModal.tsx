"use client";

import React, { useState, useEffect } from "react";
import { TemplateConfig } from "@/lib/templates";
import ResumeTemplateRenderer, { ResumeData } from "@/components/ResumeTemplateRenderer";
import { getSampleResumeData } from "@/lib/sample-template-data";
import {
  X,
  Crown,
  FileText,
  Zap,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle,
  Lock,
  User,
  Sparkles,
  Layers,
} from "lucide-react";

interface TemplateInspectionModalProps {
  template: TemplateConfig | null;
  onClose: () => void;
  onSelectTemplate?: (templateId: string) => void;
  userResumeData?: ResumeData | null;
  isProUser?: boolean;
  onOpenUpgrade?: () => void;
  ctaText?: string;
  isGenerating?: boolean;
}

export default function TemplateInspectionModal({
  template,
  onClose,
  onSelectTemplate,
  userResumeData,
  isProUser = true,
  onOpenUpgrade,
  ctaText = "Use This Template",
  isGenerating = false,
}: TemplateInspectionModalProps) {
  // Preview mode toggle: "sample" (default) or "profile" (if user data available)
  const [previewMode, setPreviewMode] = useState<"sample" | "profile">("sample");
  const [zoomLevel, setZoomLevel] = useState<number>(0.95);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!template) return null;

  const sampleData = getSampleResumeData(template.id);
  const hasUserProfile = !!(userResumeData && userResumeData.personalInfo?.fullName);

  // Choose the data source based on toggle
  const activeData =
    previewMode === "profile" && hasUserProfile ? userResumeData : sampleData;

  const isLocked = template.isPro && !isProUser;

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(1.4, Math.max(0.65, Math.round((prev + delta) * 10) / 10)));
  };

  const resetZoom = () => setZoomLevel(0.95);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl h-[94vh] flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          {/* Template Identity */}
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                template.isPro
                  ? "bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-blue-600 text-white"
              }`}
            >
              {template.isPro ? <Crown className="w-5 h-5 fill-current" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Template #{String(template.number || 0).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-white text-base leading-tight">
                  {template.name}
                </h3>
                {template.isPro && (
                  <span className="text-[10px] font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5 fill-current" /> PRO
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>{template.description}</span>
                <span className="text-emerald-400 font-bold">• ATS Score: {template.atsScore}%</span>
              </p>
            </div>
          </div>

          {/* Controls: Zoom & View Mode */}
          <div className="flex items-center gap-2">
            {/* Data Source Selector (Sample vs User Profile) */}
            {hasUserProfile && (
              <div className="bg-slate-800 p-0.5 rounded-xl border border-slate-700 flex items-center text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewMode("sample")}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                    previewMode === "sample"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="View the completed fictional demonstration document"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Demonstration Layout</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("profile")}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                    previewMode === "profile"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="View how your personal profile data populates this template"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile Data</span>
                </button>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-slate-800 rounded-xl border border-slate-700 p-0.5 text-xs text-slate-300">
              <button
                type="button"
                onClick={() => handleZoom(-0.1)}
                className="p-1.5 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="px-2 py-1 font-mono font-bold hover:text-white transition-colors"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={() => handleZoom(0.1)}
                className="p-1.5 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Action CTA Button */}
            {isLocked ? (
              <button
                type="button"
                onClick={onOpenUpgrade}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 text-xs font-black px-4 py-2 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Unlock Pro Access</span>
              </button>
            ) : onSelectTemplate ? (
              <button
                type="button"
                onClick={() => onSelectTemplate(template.id)}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isGenerating ? "Preparing..." : ctaText}</span>
              </button>
            ) : null}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              title="Close Preview (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Info Sub-banner */}
        <div className="bg-slate-950/60 px-5 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" /> Fully Populated Layout Preview
            </span>
            <span>•</span>
            <span>
              All sections, headers, typography, and spacing match the downloaded document and PDF print output exactly.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <span>Scroll vertically to inspect full document</span>
          </div>
        </div>

        {/* Modal Scrollable Canvas */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-8 bg-slate-950 flex justify-center items-start">
          <div
            className="transition-transform duration-200 origin-top flex flex-col items-center"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top center",
              marginBottom: "80px",
            }}
          >
            {/* The Authentic A4 Document Canvas */}
            <div
              className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden text-slate-900 border border-slate-200"
              style={{
                width: "210mm",
                minHeight: "297mm",
                boxSizing: "border-box",
              }}
            >
              <ResumeTemplateRenderer
                template={template}
                data={activeData}
                forPrint={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
