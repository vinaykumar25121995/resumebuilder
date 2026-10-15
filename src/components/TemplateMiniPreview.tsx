"use client";

import React from "react";
import { TemplateConfig } from "@/lib/templates";
import { ResumeData } from "@/components/ResumeTemplateRenderer";
import ResumeTemplateRenderer from "@/components/ResumeTemplateRenderer";
import { getSampleResumeData } from "@/lib/sample-template-data";
import { Eye, Crown } from "lucide-react";

interface TemplateMiniPreviewProps {
  template: TemplateConfig;
  customData?: ResumeData | null;
  heightClass?: string; // e.g. "h-56", "h-64", "h-72"
  onPreviewClick?: () => void;
  scale?: number;
}

/**
 * Renders the actual, fully populated ResumeTemplateRenderer component in miniature
 * for template selection galleries.
 * Guarantees 100% fidelity to the actual finished document layout, fonts, colors, and styling.
 */
export default function TemplateMiniPreview({
  template,
  customData,
  heightClass = "h-60",
  onPreviewClick,
  scale = 0.31,
}: TemplateMiniPreviewProps) {
  // Always use the rich, authentic demonstration data for the template unless custom data with personal info is passed
  const data =
    customData && customData.personalInfo?.fullName
      ? customData
      : getSampleResumeData(template.id);

  return (
    <div
      className={`relative w-full ${heightClass} bg-slate-900/10 dark:bg-slate-950/40 overflow-hidden flex items-start justify-center select-none border-b border-slate-200/60 dark:border-slate-800 group`}
    >
      {/* Centered scaled canvas of the actual A4 template */}
      <div
        className="transform-gpu transition-transform duration-300 group-hover:scale-[0.32]"
        style={{
          width: "210mm",
          minHeight: "297mm",
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          pointerEvents: "none",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
          flexShrink: 0,
        }}
      >
        <ResumeTemplateRenderer template={template} data={data} />
      </div>

      {/* Subtle bottom fade gradient to suggest document continues */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />

      {/* Hover Inspection Overlay */}
      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[1px]">
        {onPreviewClick ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreviewClick();
            }}
            className="inline-flex items-center gap-1.5 bg-white text-slate-900 px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-lg hover:bg-slate-100 transition-all transform hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>Inspect Full Preview</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 bg-white/90 text-slate-900 px-3 py-1 rounded-lg text-xs font-bold shadow">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>Click to Preview</span>
          </div>
        )}
      </div>

      {/* Pro Badge */}
      {template.isPro && (
        <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-amber-300/40 z-10 pointer-events-none">
          <Crown className="w-3 h-3 text-amber-200 fill-amber-200" />
          <span>PRO</span>
        </div>
      )}

      {/* Template Number Badge */}
      <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md text-cyan-300 text-[10px] font-mono font-black px-2 py-0.5 rounded shadow border border-cyan-500/30 z-10 pointer-events-none">
        #{String(template.number || 0).padStart(2, "0")}
      </div>
    </div>
  );
}
