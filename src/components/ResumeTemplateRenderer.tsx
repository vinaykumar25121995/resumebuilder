"use client";

import React from "react";
import { TemplateConfig } from "@/lib/templates";
import { renderFormattedText } from "@/lib/text-formatter";
import {
  Mail,
  FolderGit2,
  Phone,
  MapPin,
  Globe,
  Award,
  GraduationCap,
  Layers,
  Sparkles,
  Briefcase,
  Shield,
  BarChart3,
  Flag,
  FileText,
  Compass,
  Cpu,
  Bookmark,
  CheckCircle2,
} from "lucide-react";

function GithubIcon({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      style={style}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      style={style}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export interface SectionFontSizes {
  name?: number;           // in pt e.g. 24
  contact?: number;        // in pt e.g. 9
  summary?: number;        // in pt e.g. 10
  skills?: number;         // in pt e.g. 10
  experience?: number;     // in pt e.g. 10
  education?: number;      // in pt e.g. 10
  projects?: number;       // in pt e.g. 10
  certifications?: number; // in pt e.g. 10
  achievements?: number;   // in pt e.g. 10
  languages?: number;      // in pt e.g. 10
  sectionHeadings?: number;// in pt e.g. 12
}

export interface LineFontSizes {
  companyName?: number;    // e.g. 11pt
  jobTitle?: number;       // e.g. 10.5pt
  dates?: number;          // e.g. 9pt
  descriptions?: number;   // e.g. 9.5pt
  contactDetails?: number; // e.g. 8.5pt
  degrees?: number;        // e.g. 11pt
  institutions?: number;   // e.g. 10pt
  bullets?: number;        // e.g. 9.5pt
  skillItems?: number;     // e.g. 9.5pt
  [key: string]: number | undefined;
}

export type PageSizePreset =
  | "a4"
  | "letter"
  | "legal"
  | "a3"
  | "a5"
  | "executive"
  | "tabloid"
  | "custom";

export type PageOrientation = "portrait" | "landscape";

export interface PagePresetInfo {
  id: PageSizePreset;
  name: string;
  widthMm: number;
  heightMm: number;
  description: string;
}

export const PAGE_SIZE_PRESETS: PagePresetInfo[] = [
  {
    id: "a4",
    name: "A4",
    widthMm: 210,
    heightMm: 297,
    description: "Standard ISO (210 × 297 mm) — Default for international resumes",
  },
  {
    id: "letter",
    name: "US Letter",
    widthMm: 215.9,
    heightMm: 279.4,
    description: "Standard US (8.5 × 11 in / 216 × 279 mm) — Default for US & Canada",
  },
  {
    id: "legal",
    name: "US Legal",
    widthMm: 215.9,
    heightMm: 355.6,
    description: "US Legal (8.5 × 14 in / 216 × 356 mm) — Extended layout",
  },
  {
    id: "a3",
    name: "A3",
    widthMm: 297,
    heightMm: 420,
    description: "Large Format (297 × 420 mm) — Posters & broadsheets",
  },
  {
    id: "a5",
    name: "A5",
    widthMm: 148,
    heightMm: 210,
    description: "Compact Half-A4 (148 × 210 mm) — Pocket resumes & cards",
  },
  {
    id: "executive",
    name: "Executive",
    widthMm: 184.15,
    heightMm: 266.7,
    description: "Executive (7.25 × 10.5 in / 184 × 267 mm) — Corporate briefs",
  },
  {
    id: "tabloid",
    name: "Tabloid",
    widthMm: 279.4,
    heightMm: 431.8,
    description: "Ledger/Tabloid (11 × 17 in / 279 × 432 mm)",
  },
  {
    id: "custom",
    name: "Custom Dimensions",
    widthMm: 210,
    heightMm: 297,
    description: "Specify your own width & height in millimeters",
  },
];

export interface PageDimensions {
  preset: PageSizePreset;
  orientation: PageOrientation;
  widthMm: number;
  heightMm: number;
  width: string;
  height: string;
  label: string;
}

export function getPageDimensions(cs?: CustomStyles): PageDimensions {
  const presetId = cs?.pageSize || "a4";
  const orientation: PageOrientation = cs?.pageOrientation || "portrait";

  let baseWidthMm = 210;
  let baseHeightMm = 297;
  let presetName = "A4";

  if (presetId === "custom") {
    const customW = parseFloat(cs?.customPageWidth || "210");
    const customH = parseFloat(cs?.customPageHeight || "297");
    baseWidthMm = isNaN(customW) || customW <= 30 ? 210 : Math.round(customW * 10) / 10;
    baseHeightMm = isNaN(customH) || customH <= 30 ? 297 : Math.round(customH * 10) / 10;
    presetName = "Custom";
  } else {
    const found = PAGE_SIZE_PRESETS.find((p) => p.id === presetId) || PAGE_SIZE_PRESETS[0];
    baseWidthMm = found.widthMm;
    baseHeightMm = found.heightMm;
    presetName = found.name;
  }

  const isLandscape = orientation === "landscape";
  const finalWidthMm = isLandscape
    ? Math.max(baseWidthMm, baseHeightMm)
    : Math.min(baseWidthMm, baseHeightMm);
  const finalHeightMm = isLandscape
    ? Math.min(baseWidthMm, baseHeightMm)
    : Math.max(baseWidthMm, baseHeightMm);

  return {
    preset: presetId,
    orientation,
    widthMm: finalWidthMm,
    heightMm: finalHeightMm,
    width: `${finalWidthMm}mm`,
    height: `${finalHeightMm}mm`,
    label: `${presetName} (${finalWidthMm} × ${finalHeightMm} mm)${
      isLandscape ? " [Landscape]" : ""
    }`,
  };
}

export interface CustomStyles {
  pageSize?: PageSizePreset;
  customPageWidth?: string;
  customPageHeight?: string;
  pageOrientation?: PageOrientation;
  sectionOrder?: string[];
  hiddenSections?: string[];
  sidebarSections?: string[];
  sectionFontSizes?: SectionFontSizes;
  lineFontSizes?: LineFontSizes;
  bulletChar?: string;
  bulletColor?: string;
  bulletSize?: string;
  margin?: string; // e.g. "12mm", "18mm", "24mm"
  spacing?: string; // e.g. "8px", "14px", "20px"
  lineHeight?: string; // e.g. "1.3", "1.45", "1.6"
  fontFamily?: string;
  fontSizeScale?: number; // -1, 0, 1, 2
  nameAlign?: "left" | "center" | "right";
  headingColor?: string;
  accentColor?: string;
  showDividers?: boolean;
  dividerStyle?: string; // "1px solid", "2px solid", "1px dashed", "none"
  layoutType?: "single-column" | "two-column-left-sidebar" | "two-column-right-sidebar";
  sidebarWidth?: string; // "28%", "32%", "36%"
  sidebarBgColor?: string;
  sidebarTextColor?: string;
}

export interface ResumeData {
  personalInfo?: {
    fullName?: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    photoUrl?: string;
    customLinks?: Array<{ label: string; url: string }>;
    nameFontSize?: number;
    titleFontSize?: number;
    contactFontSize?: number;
  };
  summary?: string;
  skills?: {
    technical?: string[];
    tools?: string[];
    concepts?: string[];
    soft?: string[];
    technicalFontSize?: number;
    toolsFontSize?: number;
    conceptsFontSize?: number;
    softFontSize?: number;
  };
  experience?: Array<{
    id?: string;
    title?: string;
    company?: string;
    location?: string;
    date?: string;
    bullets?: string[];
    bulletChar?: string;
    companyFirst?: boolean;
    titleFontSize?: number;
    companyFontSize?: number;
    dateFontSize?: number;
    locationFontSize?: number;
    bulletFontSize?: number;
    bulletFontSizes?: number[];
  }>;
  projects?: Array<{
    id?: string;
    name?: string;
    description?: string;
    tech?: string;
    url?: string;
    nameFontSize?: number;
    techFontSize?: number;
    descFontSize?: number;
  }>;
  education?: Array<{
    id?: string;
    degree?: string;
    school?: string;
    field?: string;
    date?: string;
    location?: string;
    score?: string;
    bullets?: string[];
    degreeFontSize?: number;
    schoolFontSize?: number;
    dateFontSize?: number;
    scoreFontSize?: number;
  }>;
  certifications?: Array<{
    id?: string;
    name?: string;
    issuer?: string;
    date?: string;
    url?: string;
    nameFontSize?: number;
    issuerFontSize?: number;
    dateFontSize?: number;
  }>;
  achievements?: Array<{
    id?: string;
    title?: string;
    description?: string;
    titleFontSize?: number;
    descFontSize?: number;
  }>;
  languages?: Array<{
    id?: string;
    name?: string;
    proficiency?: string;
    nameFontSize?: number;
    proficiencyFontSize?: number;
  }>;
  customStyles?: CustomStyles;
}

interface ResumeTemplateRendererProps {
  data: ResumeData;
  template: TemplateConfig;
  forPrint?: boolean;
}

const ResumeTemplateRenderer = React.forwardRef<HTMLDivElement, ResumeTemplateRendererProps>(
  ({ data, template, forPrint = false }, ref) => {
    const s = template.style;
    const cs = data.customStyles || {};

    const layoutType = cs.layoutType || s.layoutType || "single-column";
    const isTwoColumn =
      layoutType === "two-column-left-sidebar" ||
      layoutType === "two-column-right-sidebar";

    const fontFamily = cs.fontFamily || s.fontFamily;
    const margin = isTwoColumn ? "0" : cs.margin || "18mm";
    const spacing = cs.spacing || s.spacing;
    const lineHeight = cs.lineHeight || "1.45";
    const nameAlign = cs.nameAlign || s.nameAlign || "left";
    const headingColor = cs.headingColor || s.headingColor;
    const accentColor = cs.accentColor || s.accentColor || headingColor;
    const showDividers =
      cs.showDividers !== undefined ? cs.showDividers : s.showDividers;
    const borderStyle = cs.dividerStyle
      ? cs.dividerStyle === "none"
        ? "none"
        : `${cs.dividerStyle} ${accentColor}`
      : s.borderStyle;
    const bulletChar = cs.bulletChar || s.bulletChar || "•";
    const bulletColor = cs.bulletColor || accentColor;

    // Font size scaling & Individual Section Font Sizes
    const scale = cs.fontSizeScale || 0;
    const parsePt = (val: string | undefined, fallback: number) => {
      if (!val) return fallback;
      const match = val.match(/(\d+(\.\d+)?)/);
      return match ? parseFloat(match[1]) : fallback;
    };
    const defaultBodyPt = Math.max(8, parsePt(s.bodyFontSize, 10) + scale);
    const defaultSectionPt = Math.max(10, parsePt(s.sectionFontSize, 12) + scale);
    const defaultNamePt = Math.max(16, parsePt(s.nameFontSize, 22) + scale * 2);

    const sfs = cs.sectionFontSizes || {};
    const lfs = cs.lineFontSizes || {};

    const getLinePt = (
      rowType: keyof LineFontSizes,
      itemOverride: number | undefined,
      fallbackPt: number
    ): number => {
      if (itemOverride !== undefined && itemOverride > 0) return itemOverride;
      if (lfs[rowType] !== undefined && lfs[rowType]! > 0) return lfs[rowType]!;
      return fallbackPt;
    };

    const namePt = getLinePt("name" as any, data.personalInfo?.nameFontSize, sfs.name !== undefined ? sfs.name : defaultNamePt);
    const contactPt = getLinePt("contactDetails", data.personalInfo?.contactFontSize, sfs.contact !== undefined ? sfs.contact : Math.max(8, defaultBodyPt - 1));
    const sectionHeadingPt = sfs.sectionHeadings !== undefined ? sfs.sectionHeadings : defaultSectionPt;

    const getSectionBodyPt = (secId: string): number => {
      if (sfs[secId as keyof SectionFontSizes] !== undefined) {
        return sfs[secId as keyof SectionFontSizes]!;
      }
      return defaultBodyPt;
    };

    const bodyPt = defaultBodyPt;
    const bodyFontSize = `${defaultBodyPt}pt`;
    const sectionFontSize = `${sectionHeadingPt}pt`;
    const nameFontSize = `${namePt}pt`;

    // Filter hidden sections and determine final rendering order
    const hidden = new Set(cs.hiddenSections || []);
    const defaultSections = [
      "summary",
      "experience",
      "education",
      "skills",
      "projects",
      "certifications",
      "achievements",
      "languages",
    ];

    const sectionOrder = (
      cs.sectionOrder || s.sectionOrder || defaultSections
    ).filter((id) => !hidden.has(id));

    // Page size & dimensions calculation
    const pageDim = getPageDimensions(cs);

    // Core container style
    const containerStyle: React.CSSProperties = {
      fontFamily,
      fontSize: bodyFontSize,
      color: "#111",
      lineHeight,
      padding: margin,
      minHeight: pageDim.height,
      width: pageDim.width,
      backgroundColor: "#fff",
      display: isTwoColumn ? "flex" : "block",
      flexDirection:
        layoutType === "two-column-right-sidebar" ? "row-reverse" : "row",
      boxSizing: "border-box",
    };

    // Sidebar styling if applicable
    const sidebarWidth = cs.sidebarWidth || s.sidebarWidth || "32%";
    const sidebarBgColor = cs.sidebarBgColor || s.sidebarBgColor || "#f8fafc";
    const sidebarTextColor = cs.sidebarTextColor || s.sidebarTextColor || "#000";

    const sidebarStyle: React.CSSProperties = {
      width: sidebarWidth,
      backgroundColor: sidebarBgColor,
      color: sidebarTextColor,
      padding: "16mm 8mm 16mm 10mm",
      minHeight: "100%",
      boxSizing: "border-box",
    };

    // Main column styling
    const mainColumnStyle: React.CSSProperties = {
      flex: 1,
      padding: isTwoColumn ? "16mm 16mm 16mm 12mm" : "0",
      boxSizing: "border-box",
    };

    // Heading styles
    const getSectionHeadingStyle = (
      isSidebar: boolean = false
    ): React.CSSProperties => ({
      fontSize: sectionFontSize,
      fontWeight: s.headingWeight as any,
      color: isSidebar
        ? sidebarTextColor || headingColor
        : headingColor,
      textTransform:
        s.headingCase === "uppercase"
          ? "uppercase"
          : s.headingCase === "capitalize"
          ? "capitalize"
          : "none",
      letterSpacing: s.headingCase === "uppercase" ? "1.5px" : "0",
      borderBottom: showDividers
        ? isSidebar
          ? `1px solid ${sidebarTextColor || borderStyle}`
          : borderStyle
        : "none",
      paddingBottom: "3px",
      marginBottom: "8px",
      marginTop: spacing,
    });

    const customLinksList =
      data.personalInfo?.customLinks?.map((cl) => `${cl.label}: ${cl.url}`) || [];
    const contactLine = [
      data.personalInfo?.location,
      data.personalInfo?.phone,
      data.personalInfo?.email,
      data.personalInfo?.linkedin,
      data.personalInfo?.github,
      data.personalInfo?.portfolio,
      ...customLinksList,
    ]
      .filter(Boolean)
      .join(isTwoColumn ? "\n" : " | ");

    const renderHeader = (isSidebar: boolean = false) => {
      if (isTwoColumn && !isSidebar) return null;

      const textColor = isSidebar
        ? sidebarTextColor || s.nameColor
        : s.nameColor;

      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(data.personalInfo?.fullName || "User") +
          "&size=256&background=random";

      return (
        <div
          style={{
            textAlign: isTwoColumn ? "left" : nameAlign,
            borderBottom: !isTwoColumn && showDividers ? borderStyle : "none",
            paddingBottom: isTwoColumn ? "0" : "12px",
            marginBottom: isTwoColumn ? "20px" : "4px",
            display: s.hasPhoto && !isTwoColumn ? "flex" : "block",
            alignItems: "center",
            gap: "20px",
            flexDirection: nameAlign === "right" ? "row-reverse" : "row",
          }}
        >
          {s.hasPhoto && (
            <div
              style={{
                width: s.photoStyle === "square" ? "95px" : "110px",
                height: s.photoStyle === "square" ? "95px" : "110px",
                borderRadius:
                  s.photoStyle === "round"
                    ? "50%"
                    : s.photoStyle === "rounded"
                    ? "10px"
                    : "0",
                overflow: "hidden",
                flexShrink: 0,
                margin: isTwoColumn ? "0 auto 14px auto" : "0",
                border: `2px solid ${accentColor || "#ccc"}`,
                backgroundColor: "#eee",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontSize: nameFontSize,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                margin: "0 0 3px 0",
                color: textColor,
                fontFamily,
                lineHeight: "1.1",
              }}
            >
              {data.personalInfo?.fullName || "Your Name"}
            </h1>
            {data.personalInfo?.title && (
              <p
                style={{
                  fontSize: `${getLinePt("jobTitle", data.personalInfo.titleFontSize, Math.max(10, Math.round(namePt * 0.5)))}pt`,
                  color: isTwoColumn ? textColor : "#4b5563",
                  margin: "3px 0 8px 0",
                  opacity: isTwoColumn ? 0.9 : 1,
                  fontWeight: 500,
                  lineHeight: "1.3",
                }}
              >
                {data.personalInfo.title}
              </p>
            )}
            {isTwoColumn ? (
              <div
                style={{
                  fontSize: `${contactPt}pt`,
                  color: textColor,
                  margin: "0",
                  lineHeight: "1.7",
                  opacity: 0.9,
                }}
              >
                {data.personalInfo?.location && (
                  <div>{data.personalInfo.location}</div>
                )}
                {data.personalInfo?.phone && (
                  <div>{data.personalInfo.phone}</div>
                )}
                {data.personalInfo?.email && (
                  <div>{data.personalInfo.email}</div>
                )}
                {data.personalInfo?.linkedin && (
                  <div>{data.personalInfo.linkedin}</div>
                )}
                {data.personalInfo?.github && (
                  <div>{data.personalInfo.github}</div>
                )}
                {data.personalInfo?.portfolio && (
                  <div>{data.personalInfo.portfolio}</div>
                )}
                {data.personalInfo?.customLinks && data.personalInfo.customLinks.map((cl, idx) => (
                  <div key={idx}>{cl.label ? cl.label + ': ' : ''}{cl.url}</div>
                ))}
              </div>
            ) : (
              contactLine && (
                <p
                  style={{
                    fontSize: `${contactPt}pt`,
                    color: "#555",
                    margin: "0",
                    lineHeight: "1.6",
                  }}
                >
                  {contactLine}
                </p>
              )
            )}
          </div>
        </div>
      );
    };

    // Render individual bullet point with custom bullet design & individual font sizes
    const renderBulletList = (
      bullets: string[] | undefined,
      isSidebar: boolean = false,
      itemBulletChar?: string,
      customFontSize?: string,
      bulletFontSizes?: number[],
      itemBulletPt?: number
    ) => {
      if (!bullets || bullets.length === 0) return null;
      const char = itemBulletChar || bulletChar;
      const defaultBulletPt = getLinePt("bullets", itemBulletPt, parsePt(customFontSize, bodyPt));

      return (
        <ul
          style={{
            margin: "4px 0 0 0",
            padding: 0,
            listStyle: "none",
          }}
        >
          {bullets.map((b, bi) => {
            const rowPt =
              bulletFontSizes?.[bi] !== undefined && bulletFontSizes[bi] > 0
                ? bulletFontSizes[bi]
                : defaultBulletPt;
            const fSize = `${rowPt}pt`;

            return (
              <li
                key={bi}
                style={{
                  fontSize: fSize,
                  margin: "3px 0",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  lineHeight: "1.35",
                  color: isSidebar ? sidebarTextColor || "#000" : "inherit",
                }}
              >
                <span
                  style={{
                    color: isSidebar ? sidebarTextColor || bulletColor : bulletColor,
                    flexShrink: 0,
                    fontWeight: "bold",
                    fontSize: char === "•" || char === "●" ? "1.2em" : "1em",
                    lineHeight: "1.3",
                  }}
                >
                  {char === "accent-dot" ? "●" : char}
                </span>
                <span style={{ flex: 1 }}>{renderFormattedText(b)}</span>
              </li>
            );
          })}
        </ul>
      );
    };

    const renderSection = (sectionId: string, isSidebar: boolean = false) => {
      const headingStyle = getSectionHeadingStyle(isSidebar);
      const textColor = isSidebar ? sidebarTextColor || "#000" : "inherit";
      const subTextColor = isSidebar ? sidebarTextColor || "#444" : "#444";
      const opacityStyle = { opacity: isSidebar ? 0.9 : 1 };

      const secBodyPt = getSectionBodyPt(sectionId);
      const secFontSize = `${secBodyPt}pt`;

      switch (sectionId) {
        case "summary":
          if (!data.summary) return null;
          return (
            <div key="summary" style={{ color: textColor }}>
              <div style={headingStyle}>Professional Summary</div>
              <p
                style={{
                  fontSize: secFontSize,
                  margin: 0,
                  lineHeight,
                  ...opacityStyle,
                }}
              >
                {renderFormattedText(data.summary)}
              </p>
            </div>
          );

        case "skills":
          if (!data.skills) return null;
          const { technical, tools, concepts, soft } = data.skills;
          if (
            !technical?.length &&
            !tools?.length &&
            !concepts?.length &&
            !soft?.length
          )
            return null;

          if (isTwoColumn && isSidebar) {
            return (
              <div key="skills" style={{ color: textColor }}>
                <div style={headingStyle}>Skills</div>
                <div
                  style={{
                    fontSize: secFontSize,
                    lineHeight: "1.6",
                    ...opacityStyle,
                  }}
                >
                  {technical?.length ? (
                    <div
                      style={{
                        marginBottom: "6px",
                        fontSize: `${getLinePt("skillItems", data.skills.technicalFontSize, secBodyPt)}pt`,
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          fontSize: `${Math.max(7, secBodyPt - 0.5)}pt`,
                        }}
                      >
                        Technical:
                      </strong>{" "}
                      {technical.join(", ")}
                    </div>
                  ) : null}
                  {tools?.length ? (
                    <div
                      style={{
                        marginBottom: "6px",
                        fontSize: `${getLinePt("skillItems", data.skills.toolsFontSize, secBodyPt)}pt`,
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          fontSize: `${Math.max(7, secBodyPt - 0.5)}pt`,
                        }}
                      >
                        Tools:
                      </strong>{" "}
                      {tools.join(", ")}
                    </div>
                  ) : null}
                  {concepts?.length ? (
                    <div
                      style={{
                        marginBottom: "6px",
                        fontSize: `${getLinePt("skillItems", data.skills.conceptsFontSize, secBodyPt)}pt`,
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          fontSize: `${Math.max(7, secBodyPt - 0.5)}pt`,
                        }}
                      >
                        Concepts:
                      </strong>{" "}
                      {concepts.join(", ")}
                    </div>
                  ) : null}
                  {soft?.length ? (
                    <div
                      style={{
                        fontSize: `${getLinePt("skillItems", data.skills.softFontSize, secBodyPt)}pt`,
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          fontSize: `${Math.max(7, secBodyPt - 0.5)}pt`,
                        }}
                      >
                        Soft Skills:
                      </strong>{" "}
                      {soft.join(", ")}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          }

          return (
            <div key="skills">
              <div style={headingStyle}>Technical & Core Skills</div>
              <div>
                {technical?.length ? (
                  <p
                    style={{
                      fontSize: `${getLinePt("skillItems", data.skills.technicalFontSize, secBodyPt)}pt`,
                      margin: "0 0 3px 0",
                    }}
                  >
                    <strong>Technical Skills:</strong> {technical.join(", ")}
                  </p>
                ) : null}
                {tools?.length ? (
                  <p
                    style={{
                      fontSize: `${getLinePt("skillItems", data.skills.toolsFontSize, secBodyPt)}pt`,
                      margin: "0 0 3px 0",
                    }}
                  >
                    <strong>Software & Tools:</strong> {tools.join(", ")}
                  </p>
                ) : null}
                {concepts?.length ? (
                  <p
                    style={{
                      fontSize: `${getLinePt("skillItems", data.skills.conceptsFontSize, secBodyPt)}pt`,
                      margin: "0 0 3px 0",
                    }}
                  >
                    <strong>Core Competencies:</strong> {concepts.join(", ")}
                  </p>
                ) : null}
                {soft?.length ? (
                  <p
                    style={{
                      fontSize: `${getLinePt("skillItems", data.skills.softFontSize, secBodyPt)}pt`,
                      margin: "0",
                    }}
                  >
                    <strong>Soft Skills:</strong> {soft.join(", ")}
                  </p>
                ) : null}
              </div>
            </div>
          );

        case "experience":
          if (!data.experience?.length) return null;
          return (
            <div key="experience" style={{ color: textColor }}>
              <div style={headingStyle}>Work Experience</div>
              {data.experience.map((exp, i) => {
                const companyPt = getLinePt("companyName", exp.companyFontSize, secBodyPt + 1);
                const titlePt = getLinePt("jobTitle", exp.titleFontSize, secBodyPt);
                const datePt = getLinePt("dates", exp.dateFontSize, secBodyPt);
                const locPt = getLinePt("descriptions", exp.locationFontSize, secBodyPt);

                return (
                  <div key={exp.id || i} style={{ marginBottom: "12px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        flexWrap: isTwoColumn && isSidebar ? "wrap" : "nowrap",
                      }}
                    >
                      <div style={{ width: isTwoColumn && isSidebar ? "100%" : "auto" }}>
                        {exp.companyFirst ? (
                          <>
                            <p
                              style={{
                                fontWeight: "bold",
                                fontSize: `${companyPt}pt`,
                                margin: "0",
                                lineHeight: "1.35",
                              }}
                            >
                              {renderFormattedText(exp.company)}
                              {exp.location ? (
                                <span
                                  style={{
                                    fontSize: `${locPt}pt`,
                                    fontWeight: "normal",
                                    color: subTextColor,
                                  }}
                                >
                                  {` — ${exp.location}`}
                                </span>
                              ) : ""}
                            </p>
                            <p
                              style={{
                                fontSize: `${titlePt}pt`,
                                color: subTextColor,
                                fontStyle: "italic",
                                margin: "1px 0",
                                lineHeight: "1.35",
                                ...opacityStyle,
                              }}
                            >
                              {renderFormattedText(exp.title)}
                            </p>
                          </>
                        ) : (
                          <>
                            <p
                              style={{
                                fontWeight: "bold",
                                fontSize: `${titlePt}pt`,
                                margin: "0",
                                lineHeight: "1.35",
                              }}
                            >
                              {renderFormattedText(exp.title)}
                            </p>
                            <p
                              style={{
                                fontSize: `${companyPt}pt`,
                                color: subTextColor,
                                fontStyle: "italic",
                                margin: "1px 0",
                                lineHeight: "1.35",
                                ...opacityStyle,
                              }}
                            >
                              {renderFormattedText(exp.company)}
                              {exp.location ? (
                                <span
                                  style={{
                                    fontSize: `${locPt}pt`,
                                    fontStyle: "normal",
                                  }}
                                >
                                  {` — ${exp.location}`}
                                </span>
                              ) : ""}
                            </p>
                          </>
                        )}
                      </div>
                      <p
                        style={{
                          fontSize: `${datePt}pt`,
                          color: subTextColor,
                          margin: isTwoColumn && isSidebar ? "2px 0 4px 0" : "0",
                          flexShrink: 0,
                          paddingLeft: isTwoColumn && isSidebar ? "0" : "8px",
                          fontWeight: 500,
                          lineHeight: "1.35",
                          ...opacityStyle,
                        }}
                      >
                        {exp.date}
                      </p>
                    </div>
                    {renderBulletList(
                      exp.bullets,
                      isSidebar,
                      exp.bulletChar,
                      secFontSize,
                      exp.bulletFontSizes,
                      exp.bulletFontSize
                    )}
                  </div>
                );
              })}
            </div>
          );

        case "projects":
          if (!data.projects?.length) return null;
          return (
            <div key="projects" style={{ color: textColor }}>
              <div style={headingStyle}>Projects</div>
              {data.projects.map((proj, i) => {
                const namePt = getLinePt("projectName" as any, proj.nameFontSize, secBodyPt + 0.5);
                const techPt = getLinePt("projectTech" as any, proj.techFontSize, secBodyPt);
                const descPt = getLinePt("descriptions", proj.descFontSize, secBodyPt);

                return (
                  <div key={proj.id || i} style={{ marginBottom: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: `${namePt}pt`,
                          margin: 0,
                          lineHeight: "1.35",
                        }}
                      >
                        {renderFormattedText(proj.name)}
                        {proj.tech && (
                          <span
                            style={{
                              fontWeight: "normal",
                              fontStyle: "italic",
                              color: subTextColor,
                              fontSize: `${techPt}pt`,
                            }}
                          >
                            {" "}
                            | {proj.tech}
                          </span>
                        )}
                      </p>
                      {proj.url && (
                        <span
                          style={{
                            fontSize: `${Math.max(7, secBodyPt - 1)}pt`,
                            color: accentColor,
                          }}
                        >
                          {proj.url}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p
                        style={{
                          fontSize: `${descPt}pt`,
                          margin: "3px 0 0 0",
                          lineHeight,
                          ...opacityStyle,
                        }}
                      >
                        {renderFormattedText(proj.description)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          );

        case "education":
          if (!data.education?.length) return null;
          return (
            <div key="education" style={{ color: textColor }}>
              <div style={headingStyle}>Education</div>
              {data.education.map((edu, i) => {
                const degreePt = getLinePt("degrees", edu.degreeFontSize, secBodyPt + 0.5);
                const schoolPt = getLinePt("institutions", edu.schoolFontSize, secBodyPt);
                const datePt = getLinePt("dates", edu.dateFontSize, secBodyPt);
                const scorePt = getLinePt("scores" as any, edu.scoreFontSize, secBodyPt);

                return (
                  <div
                    key={edu.id || i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "8px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: `${degreePt}pt`,
                          margin: 0,
                          lineHeight: "1.35",
                        }}
                      >
                        {renderFormattedText(edu.degree)}
                      </p>
                      <p
                        style={{
                          fontSize: `${schoolPt}pt`,
                          color: subTextColor,
                          margin: "1px 0",
                          lineHeight: "1.35",
                          ...opacityStyle,
                        }}
                      >
                        {renderFormattedText(edu.school)}
                        {edu.location ? `, ${edu.location}` : ""}
                        {edu.score ? (
                          <span style={{ fontSize: `${scorePt}pt` }}>
                            {` — Score: ${edu.score}`}
                          </span>
                        ) : ""}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: `${datePt}pt`,
                        color: subTextColor,
                        margin: 0,
                        fontWeight: 500,
                        lineHeight: "1.35",
                        ...opacityStyle,
                      }}
                    >
                      {edu.date}
                    </p>
                  </div>
                );
              })}
            </div>
          );

        case "certifications":
          if (!data.certifications?.length) return null;
          return (
            <div key="certifications" style={{ color: textColor }}>
              <div style={headingStyle}>Certifications</div>
              <ul
                style={{
                  margin: "4px 0 0 0",
                  padding: 0,
                  listStyle: "none",
                }}
              >
                {data.certifications.map((cert, i) => {
                  const certNamePt = getLinePt("certifications" as any, cert.nameFontSize, secBodyPt);
                  const certIssuerPt = getLinePt("descriptions", cert.issuerFontSize, Math.max(8, secBodyPt - 0.5));
                  const certDatePt = getLinePt("dates", cert.dateFontSize, Math.max(8, secBodyPt - 1));

                  return (
                    <li
                      key={cert.id || i}
                      style={{
                        fontSize: `${certNamePt}pt`,
                        margin: "3px 0",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        lineHeight: "1.35",
                      }}
                    >
                      <span
                        style={{
                          color: bulletColor,
                          fontWeight: "bold",
                        }}
                      >
                        {bulletChar === "accent-dot" ? "●" : bulletChar}
                      </span>
                      <span>
                        <strong>{renderFormattedText(cert.name)}</strong>
                        {cert.issuer ? (
                          <span style={{ fontSize: `${certIssuerPt}pt` }}>
                            {` — ${cert.issuer}`}
                          </span>
                        ) : ""}
                        {cert.date ? (
                          <span style={{ fontSize: `${certDatePt}pt`, color: subTextColor }}>
                            {` (${cert.date})`}
                          </span>
                        ) : ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );

        case "achievements":
          if (!data.achievements?.length) return null;
          return (
            <div key="achievements" style={{ color: textColor }}>
              <div style={headingStyle}>Achievements & Awards</div>
              <ul
                style={{
                  margin: "4px 0 0 0",
                  padding: 0,
                  listStyle: "none",
                }}
              >
                {data.achievements.map((ach, i) => {
                  const achTitlePt = getLinePt("achievements" as any, ach.titleFontSize, secBodyPt);
                  const achDescPt = getLinePt("descriptions", ach.descFontSize, secBodyPt);

                  return (
                    <li
                      key={ach.id || i}
                      style={{
                        fontSize: `${achTitlePt}pt`,
                        margin: "3px 0",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        lineHeight: "1.35",
                      }}
                    >
                      <span style={{ color: bulletColor, fontWeight: "bold" }}>
                        {bulletChar === "accent-dot" ? "●" : bulletChar}
                      </span>
                      <span>
                        <strong>{renderFormattedText(ach.title)}</strong>
                        {ach.description ? (
                          <span style={{ fontSize: `${achDescPt}pt` }}>
                            {`: `}
                            {renderFormattedText(ach.description)}
                          </span>
                        ) : ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );

        case "languages":
          if (!data.languages?.length) return null;
          return (
            <div key="languages" style={{ color: textColor }}>
              <div style={headingStyle}>Languages</div>
              <p style={{ fontSize: secFontSize, margin: 0, ...opacityStyle }}>
                {data.languages.map((l, li) => {
                  const langNamePt = getLinePt("languages" as any, l.nameFontSize, secBodyPt);
                  const langProfPt = getLinePt("descriptions", l.proficiencyFontSize, Math.max(8, secBodyPt - 0.5));
                  return (
                    <span key={li} style={{ fontSize: `${langNamePt}pt`, marginRight: "8px" }}>
                      <strong>{l.name}</strong>
                      {l.proficiency && (
                        <span style={{ fontSize: `${langProfPt}pt`, color: subTextColor }}>
                          {` (${l.proficiency})`}
                        </span>
                      )}
                      {li < data.languages!.length - 1 && " • "}
                    </span>
                  );
                })}
              </p>
            </div>
          );

        default:
          return null;
      }
    };

    // ─── DEDICATED PREMIUM PRO TEMPLATE RENDERERS ─────────────────────────────

    // 1. Michelle Dhamar — Healthcare Industry Volunteer
    const renderProMichelle = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80";

      const allSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
        ...(data.skills?.soft || []),
      ];

      const renderDoubleUnderlineHeader = (title: string) => (
        <div style={{ marginTop: "12px", marginBottom: "6px" }}>
          <div
            style={{
              fontSize: "10pt",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#1e293b",
              display: "inline-block",
              borderBottom: "3px double #be675e",
              paddingBottom: "2px",
              width: "100%",
            }}
          >
            {title}
          </div>
        </div>
      );

      const defaultMichelleSidebar = ["skills", "projects", "achievements", "certifications", "languages"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultMichelleSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const leftSections = orderedSections.filter(id => !sidebarSet.has(id) && id !== "summary");
      const rightSections = orderedSections.filter(id => sidebarSet.has(id) && id !== "summary");

      const renderMichelleSection = (secId: string) => {
        switch (secId) {
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderDoubleUnderlineHeader("EDUCATION")}
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  {data.education.map((edu, idx) => (
                    <div key={edu.id || idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a", lineHeight: 1.25 }}>
                        {edu.degree}
                      </div>
                      <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                      {edu.date && <div style={{ fontSize: "8pt", color: "#64748b" }}>{edu.date}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderDoubleUnderlineHeader("WORK EXPERIENCE")}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, idx) => (
                    <div key={exp.id || idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>
                        {exp.title}
                      </div>
                      <div style={{ fontSize: "8.5pt", color: "#334155" }}>{exp.company}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", margin: "1px 0 3px 0" }}>
                        <span>{exp.date}</span>
                        <span>{exp.location}</span>
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4, marginBottom: "2px" }}>
                              {renderFormattedText(b)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "skills":
            if (allSkills.length === 0) return null;
            return (
              <div key="skills">
                {renderDoubleUnderlineHeader("AREAS OF EXPERTISE")}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {allSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#e59086",
                        color: "#ffffff",
                        padding: "3px 8px",
                        borderRadius: "5px",
                        fontSize: "8pt",
                        fontWeight: "600",
                        letterSpacing: "0.2px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderDoubleUnderlineHeader("PERSONAL PROJECTS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.projects.map((proj, idx) => (
                    <div key={proj.id || idx}>
                      <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>{proj.name}</div>
                      <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                        <li style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4 }}>{proj.description}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderDoubleUnderlineHeader("ORGANIZATIONS & HONORS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {data.achievements.map((ach, idx) => (
                    <div key={ach.id || idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "8pt", color: "#64748b" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderDoubleUnderlineHeader("CERTIFICATES")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.certifications.map((cert, idx) => (
                    <div key={cert.id || idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{cert.name}</div>
                      {cert.issuer && <div style={{ fontSize: "8pt", color: "#64748b" }}>{cert.issuer}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderDoubleUnderlineHeader("LANGUAGES")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
                  {data.languages.map((l, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{l.name}</div>
                      <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{l.proficiency}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "15mm 16mm",
            boxSizing: "border-box",
            color: "#1e293b",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Top Header: 3-column layout */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "12px" }}>
            {/* Left: Name, Title & Summary */}
            <div style={{ flex: "1 1 44%", minWidth: 0 }}>
              <h1
                style={{
                  fontSize: nameFontSize || "24pt",
                  fontWeight: "700",
                  color: "#be675e",
                  letterSpacing: "-0.5px",
                  margin: "0 0 2px 0",
                  lineHeight: 1.15,
                }}
              >
                {data.personalInfo?.fullName || "Michelle Dhamar"}
              </h1>
              <p
                style={{
                  fontSize: "10.5pt",
                  fontWeight: "500",
                  color: "#8c6b67",
                  margin: "0 0 8px 0",
                }}
              >
                {data.personalInfo?.title || "Healthcare Industry Volunteer"}
              </p>
              {data.summary && !hidden.has("summary") && (
                <p
                  style={{
                    fontSize: "8.5pt",
                    color: "#334155",
                    lineHeight: 1.45,
                    margin: 0,
                    textAlign: "justify",
                  }}
                >
                  {renderFormattedText(data.summary)}
                </p>
              )}
            </div>

            {/* Center: Photo */}
            <div style={{ flex: "0 0 100px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
              <img
                src={photoUrl}
                alt={data.personalInfo?.fullName || "Profile"}
                style={{
                  width: "95px",
                  height: "115px",
                  borderRadius: "16px",
                  objectFit: "cover",
                  border: "1.5px solid #e2e8f0",
                  display: "block",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                }}
              />
            </div>

            {/* Right: Contact Information */}
            <div
              style={{
                flex: "1 1 36%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                gap: "5px",
                paddingTop: "4px",
              }}
            >
              {email && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8.5pt", color: "#334155" }}>
                  <span>{email}</span>
                  <Mail style={{ width: "12px", height: "12px", color: "#be675e", flexShrink: 0 }} />
                </div>
              )}
              {phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8.5pt", color: "#334155" }}>
                  <span>{phone}</span>
                  <Phone style={{ width: "12px", height: "12px", color: "#be675e", flexShrink: 0 }} />
                </div>
              )}
              {location && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8.5pt", color: "#334155" }}>
                  <span>{location}</span>
                  <MapPin style={{ width: "12px", height: "12px", color: "#be675e", flexShrink: 0 }} />
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8.5pt", color: "#334155" }}>
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                  <LinkedinIcon style={{ width: "12px", height: "12px", color: "#be675e", flexShrink: 0 }} />
                </div>
              )}
              {github && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8.5pt", color: "#334155" }}>
                  <span>{github.replace(/^https?:\/\//, "")}</span>
                  <GithubIcon style={{ width: "12px", height: "12px", color: "#be675e", flexShrink: 0 }} />
                </div>
              )}
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8.5pt", color: "#334155" }}>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: "12px", height: "12px", color: "#be675e", flexShrink: 0 }} />
                </div>
              )}
              {customLinks.map((cl, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8.5pt", color: "#334155" }}>
                  <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: "12px", height: "12px", color: "#be675e", flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Body: 2-Column Layout */}
          <div style={{ display: "flex", gap: "24px", marginTop: "8px" }}>
            {/* Left Column (52%) */}
            <div style={{ flex: "1 1 52%", minWidth: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {leftSections.map(secId => renderMichelleSection(secId))}
            </div>

            {/* Right Column (48%) */}
            <div style={{ flex: "1 1 48%", minWidth: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {rightSections.map(secId => renderMichelleSection(secId))}
            </div>
          </div>
        </div>
      );
    };

    // 2. Cathy Barnett — Customer Support Lead
    const renderProCatherine = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];

      const techSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
      ];
      // Only include soft skills if user actually provided them
      const softSkills = data.skills?.soft || [];

      const defaultCatherineSidebar = ["skills", "languages", "certifications"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultCatherineSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const sidebarSections = orderedSections.filter(id => sidebarSet.has(id));
      const mainSections = orderedSections.filter(id => !sidebarSet.has(id));

      const renderSidebarHeading = (title: string, icon: React.ReactNode) => (
        <div style={{ marginBottom: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
            <span style={{ fontSize: "9.5pt", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#ffffff" }}>
              {title}
            </span>
          </div>
          <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.15)", marginBottom: "6px" }} />
        </div>
      );

      const renderMainHeading = (title: string, icon: React.ReactNode) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: "2px solid #0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <span style={{ fontSize: "10.5pt", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
            {title}
          </span>
        </div>
      );

      const renderCatherineSection = (secId: string, isSidebar: boolean) => {
        switch (secId) {
          case "summary":
            if (!data.summary || !data.summary.trim()) return null;
            if (isSidebar) {
              return (
                <div key="summary">
                  {renderSidebarHeading("Summary", <Sparkles style={{ width: "10px", height: "10px", color: "#38bdf8" }} />)}
                  <p style={{ fontSize: "8pt", lineHeight: "1.45", color: "#cbd5e1", margin: 0 }}>
                    {renderFormattedText(data.summary)}
                  </p>
                </div>
              );
            }
            return (
              <div key="summary" style={{ marginBottom: "8px" }}>
                {renderMainHeading("Professional Summary", <Sparkles style={{ width: "8px", height: "8px", color: "#0f172a" }} />)}
                <p style={{ fontSize: "8.5pt", lineHeight: "1.45", color: "#334155", margin: 0 }}>
                  {renderFormattedText(data.summary)}
                </p>
              </div>
            );

          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            if (isSidebar) {
              return (
                <div key="experience">
                  {renderSidebarHeading("Experience", <Briefcase style={{ width: "10px", height: "10px", color: "#38bdf8" }} />)}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {data.experience.map((exp, i) => (
                      <div key={i}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "bold", color: "#ffffff" }}>
                          {renderFormattedText(exp.title || "")}
                        </div>
                        <div style={{ fontSize: "8pt", color: "#38bdf8" }}>{exp.company}</div>
                        <div style={{ fontSize: "7.5pt", color: "#94a3b8" }}>{exp.date}</div>
                        {renderBulletList(exp.bullets, false, "•", "7.5pt")}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key="experience">
                {renderMainHeading("Work Experience", <Briefcase style={{ width: "8px", height: "8px", color: "#0f172a" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: "10pt", fontWeight: "bold", color: "#0f172a" }}>
                          {renderFormattedText(exp.title || "")}
                        </span>
                        <span style={{ fontSize: "8pt", color: "#64748b", fontWeight: 500 }}>
                          {exp.date}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: "9pt", fontWeight: 600, color: "#0284c7" }}>
                          {renderFormattedText(exp.company || "")}
                        </span>
                        {exp.location && (
                          <span style={{ fontSize: "8pt", color: "#94a3b8" }}>{exp.location}</span>
                        )}
                      </div>
                      {renderBulletList(exp.bullets, false, "•", "8.5pt")}
                    </div>
                  ))}
                </div>
              </div>
            );

          case "education":
            if (!data.education || data.education.length === 0) return null;
            if (isSidebar) {
              return (
                <div key="education">
                  {renderSidebarHeading("Education", <GraduationCap style={{ width: "10px", height: "10px", color: "#38bdf8" }} />)}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "bold", color: "#ffffff" }}>
                          {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                        </div>
                        <div style={{ fontSize: "7.5pt", color: "#94a3b8" }}>{edu.school}</div>
                        {edu.date && <div style={{ fontSize: "7pt", color: "#64748b" }}>{edu.date}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key="education">
                {renderMainHeading("Education", <GraduationCap style={{ width: "8px", height: "8px", color: "#0f172a" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: "9.5pt", fontWeight: "bold", color: "#0f172a" }}>
                          {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                        </span>
                        <span style={{ fontSize: "8pt", color: "#64748b" }}>{edu.date}</span>
                      </div>
                      <div style={{ fontSize: "8.5pt", color: "#475569" }}>{edu.school}</div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "skills":
            if (techSkills.length === 0 && softSkills.length === 0) return null;
            if (isSidebar) {
              return (
                <div key="skills" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {techSkills.length > 0 && (
                    <div>
                      {renderSidebarHeading("Hard Skills", <Layers style={{ width: "10px", height: "10px", color: "#38bdf8" }} />)}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {techSkills.map((sk, i) => (
                          <div key={i} style={{ fontSize: "8.5pt", color: "#cbd5e1", lineHeight: "1.3" }}>
                            {sk}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {softSkills.length > 0 && (
                    <div>
                      {renderSidebarHeading("Soft Skills", <Sparkles style={{ width: "10px", height: "10px", color: "#38bdf8" }} />)}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {softSkills.map((sk, i) => (
                          <div
                            key={i}
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.12)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              borderRadius: "5px",
                              padding: "4px 8px",
                              fontSize: "8pt",
                              color: "#ffffff",
                              textAlign: "center",
                              fontWeight: 500,
                            }}
                          >
                            {sk}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <div key="skills" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {renderMainHeading("Technical & Core Skills", <Layers style={{ width: "8px", height: "8px", color: "#0f172a" }} />)}
                {techSkills.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {techSkills.map((sk, i) => (
                      <span key={i} style={{ backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "3px 8px", fontSize: "8pt", color: "#0f172a", fontWeight: 600 }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "4px" }}>
                    {softSkills.map((sk, i) => (
                      <span key={i} style={{ backgroundColor: "#e0f2fe", border: "1px solid #bae6fd", borderRadius: "4px", padding: "3px 8px", fontSize: "8pt", color: "#0369a1", fontWeight: 500 }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );

          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            if (isSidebar) {
              return (
                <div key="projects">
                  {renderSidebarHeading("Projects", <FolderGit2 style={{ width: "10px", height: "10px", color: "#38bdf8" }} />)}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {data.projects.map((proj, i) => (
                      <div key={i}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "bold", color: "#ffffff" }}>
                          {proj.name} {proj.tech ? <span style={{ fontSize: "7.5pt", color: "#38bdf8" }}>({proj.tech})</span> : null}
                        </div>
                        {proj.description && <div style={{ fontSize: "7.5pt", color: "#94a3b8" }}>{proj.description}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key="projects">
                {renderMainHeading("Key Projects", <FolderGit2 style={{ width: "8px", height: "8px", color: "#0f172a" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.projects.map((proj, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "bold", color: "#0f172a" }}>
                        {proj.name} {proj.tech ? <span style={{ fontSize: "8pt", color: "#0284c7" }}>({proj.tech})</span> : null}
                      </div>
                      {proj.description && <div style={{ fontSize: "8.5pt", color: "#334155" }}>{proj.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );

          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            if (isSidebar) {
              return (
                <div key="certifications">
                  {renderSidebarHeading("Certificates", <Award style={{ width: "10px", height: "10px", color: "#38bdf8" }} />)}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {data.certifications.map((cert, i) => (
                      <div key={i}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "bold", color: "#ffffff" }}>
                          {cert.name}
                        </div>
                        <div style={{ fontSize: "7.5pt", color: "#94a3b8" }}>
                          {cert.issuer} {cert.date ? `• ${cert.date}` : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key="certifications">
                {renderMainHeading("Certificates", <Award style={{ width: "8px", height: "8px", color: "#0f172a" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.certifications.map((cert, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9pt", fontWeight: "bold", color: "#0f172a" }}>
                        {cert.name}
                      </div>
                      <div style={{ fontSize: "8pt", color: "#64748b" }}>
                        {cert.issuer} {cert.date ? `• ${cert.date}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            if (isSidebar) {
              return (
                <div key="achievements">
                  {renderSidebarHeading("Achievements", <Sparkles style={{ width: "10px", height: "10px", color: "#38bdf8" }} />)}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {data.achievements.map((ach, i) => (
                      <div key={i}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "bold", color: "#ffffff" }}>{ach.title}</div>
                        {ach.description && <div style={{ fontSize: "7.5pt", color: "#94a3b8" }}>{ach.description}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key="achievements">
                {renderMainHeading("Achievements & Honors", <Sparkles style={{ width: "8px", height: "8px", color: "#0f172a" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9pt", fontWeight: "bold", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "8pt", color: "#64748b" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );

          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            if (isSidebar) {
              return (
                <div key="languages">
                  {renderSidebarHeading("Languages", <Globe style={{ width: "10px", height: "10px", color: "#38bdf8" }} />)}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {data.languages.map((lang, i) => (
                      <div key={i}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "bold", color: "#ffffff" }}>{lang.name}</div>
                        {lang.proficiency && (
                          <div style={{ fontSize: "7.5pt", color: "#94a3b8" }}>{lang.proficiency}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key="languages">
                {renderMainHeading("Languages", <Globe style={{ width: "8px", height: "8px", color: "#0f172a" }} />)}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
                  {data.languages.map((lang, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9pt", fontWeight: "bold", color: "#0f172a" }}>{lang.name}</div>
                      {lang.proficiency && (
                        <div style={{ fontSize: "8pt", color: "#64748b" }}>{lang.proficiency}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );

          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            display: "flex",
            boxSizing: "border-box",
            color: "#0f172a",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Left Dark Slate Sidebar */}
          <div
            style={{
              width: "32%",
              backgroundColor: "#1e293b",
              color: "#ffffff",
              padding: "14mm 6mm",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* Contact Pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {email && (
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "6px",
                    padding: "6px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "8pt",
                    color: "#f1f5f9",
                    wordBreak: "break-all",
                  }}
                >
                  <Mail style={{ width: "12px", height: "12px", color: "#38bdf8", flexShrink: 0 }} />
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "6px",
                    padding: "6px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "8pt",
                    color: "#f1f5f9",
                  }}
                >
                  <Phone style={{ width: "12px", height: "12px", color: "#38bdf8", flexShrink: 0 }} />
                  <span>{phone}</span>
                </div>
              )}
              {location && (
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "6px",
                    padding: "6px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "8pt",
                    color: "#f1f5f9",
                  }}
                >
                  <MapPin style={{ width: "12px", height: "12px", color: "#38bdf8", flexShrink: 0 }} />
                  <span>{location}</span>
                </div>
              )}
              {portfolio && (
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "6px",
                    padding: "6px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "8pt",
                    color: "#f1f5f9",
                    wordBreak: "break-all",
                  }}
                >
                  <Globe style={{ width: "12px", height: "12px", color: "#38bdf8", flexShrink: 0 }} />
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {linkedin && (
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "6px",
                    padding: "6px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "8pt",
                    color: "#f1f5f9",
                    wordBreak: "break-all",
                  }}
                >
                  <LinkedinIcon style={{ width: "12px", height: "12px", color: "#38bdf8", flexShrink: 0 }} />
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {github && (
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "6px",
                    padding: "6px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "8pt",
                    color: "#f1f5f9",
                    wordBreak: "break-all",
                  }}
                >
                  <GithubIcon style={{ width: "12px", height: "12px", color: "#38bdf8", flexShrink: 0 }} />
                  <span>{github.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {customLinks.map((cl, i) => (
                <div key={i} style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "6px", padding: "6px 8px", display: "flex", alignItems: "center", gap: "8px", fontSize: "8pt", color: "#f1f5f9", wordBreak: "break-all" }}>
                  <Globe style={{ width: "12px", height: "12px", color: "#38bdf8", flexShrink: 0 }} />
                  <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                </div>
              ))}
            </div>

            {/* Dynamic Sidebar Sections */}
            {sidebarSections.map(secId => renderCatherineSection(secId, true))}
          </div>

          {/* Right White Column */}
          <div
            style={{
              flex: 1,
              padding: "14mm 12mm 14mm 10mm",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* Header */}
            <div>
              <h1
                style={{
                  fontSize: nameFontSize || "24pt",
                  fontWeight: "800",
                  color: "#0f172a",
                  lineHeight: "1.1",
                  margin: "0 0 4px 0",
                  letterSpacing: "-0.5px",
                }}
              >
                {data.personalInfo?.fullName || "Catherine Barnett"}
              </h1>
              {data.personalInfo?.title && (
                <div
                  style={{
                    fontSize: "12pt",
                    fontWeight: 600,
                    color: "#0284c7",
                    marginBottom: "10px",
                  }}
                >
                  {data.personalInfo.title}
                </div>
              )}
            </div>

            {/* Dynamic Main Column Sections */}
            {mainSections.map(secId => renderCatherineSection(secId, false))}
          </div>
        </div>
      );
    };

    // 3. Chris Flims — Project Manager
    const renderProChrisFlims = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];

      const allSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
        ...(data.skills?.soft || []),
      ];

      const renderDiamondHeader = (title: string) => (
        <div style={{ display: "flex", alignItems: "center", margin: "14px 0 8px 0" }}>
          <span style={{ fontSize: "12pt", color: "#c84b31", marginRight: "6px", lineHeight: 1 }}>◈</span>
          <span style={{ fontSize: "10.5pt", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#1f2937", whiteSpace: "nowrap" }}>
            {title}
          </span>
          <div style={{ flex: 1, height: "1.5px", backgroundColor: "#cbd5e1", margin: "0 8px 0 10px" }} />
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#cbd5e1", flexShrink: 0 }} />
        </div>
      );

      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const renderChrisSection = (secId: string) => {
        switch (secId) {
          case "skills":
            if (allSkills.length === 0) return null;
            return (
              <div key="skills">
                {renderDiamondHeader("Areas of Expertise")}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "6px 0 10px 0" }}>
                  {allSkills.map((sk, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: "#e2e8f0",
                        border: "1px solid #94a3b8",
                        borderRadius: "3px",
                        padding: "3px 8px",
                        fontSize: "8pt",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            );
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderDiamondHeader("Work Experience")}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {data.experience.map((exp, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: "10.5pt", fontWeight: "700", color: "#0f172a" }}>
                          {renderFormattedText(exp.title || "")}
                        </span>
                        <span style={{ fontSize: "9pt", fontWeight: "700", color: "#1f2937" }}>
                          {exp.date}
                        </span>
                      </div>
                      <div style={{ fontSize: "8.5pt", fontStyle: "italic", color: "#c84b31", marginBottom: "3px" }}>
                        {renderFormattedText(exp.company || "")}
                        {exp.location ? ` - ${exp.location}` : ""}
                      </div>
                      {renderBulletList(exp.bullets, false, "•", "8.5pt")}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderDiamondHeader("Education")}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: "10pt", fontWeight: "700", color: "#0f172a" }}>
                          {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                        </span>
                        <span style={{ fontSize: "8.5pt", fontWeight: "700", color: "#1f2937" }}>
                          {edu.date}
                        </span>
                      </div>
                      <div style={{ fontSize: "8.5pt", fontStyle: "italic", color: "#c84b31" }}>
                        {edu.school} {edu.location ? `• ${edu.location}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderDiamondHeader("Key Projects")}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.projects.map((proj, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>
                        {proj.name} {proj.tech ? <span style={{ fontSize: "8pt", fontStyle: "italic", color: "#c84b31" }}> | {proj.tech}</span> : null}
                      </div>
                      {proj.description && <div style={{ fontSize: "8.5pt", color: "#4b5563", lineHeight: 1.4 }}>{proj.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderDiamondHeader("Certifications")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                  {data.certifications.map((c, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>{c.name}</div>
                      <div style={{ fontSize: "8pt", color: "#64748b" }}>{c.issuer} {c.date ? `(${c.date})` : ""}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderDiamondHeader("Achievements & Honors")}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "8pt", color: "#4b5563" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderDiamondHeader("Languages")}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {data.languages.map((l, i) => (
                    <div key={i} style={{ fontSize: "8.5pt" }}>
                      <strong style={{ color: "#0f172a" }}>{l.name}</strong> {l.proficiency ? <span style={{ color: "#64748b" }}>({l.proficiency})</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "16mm 18mm",
            boxSizing: "border-box",
            color: "#1f2937",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Header */}
          <div>
            <h1
              style={{
                fontSize: nameFontSize || "26pt",
                fontWeight: "800",
                color: "#c84b31",
                lineHeight: "1.1",
                margin: "0 0 3px 0",
                letterSpacing: "-0.5px",
              }}
            >
              {data.personalInfo?.fullName || "Chris Flims"}
            </h1>
            <div
              style={{
                fontSize: "12pt",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "8px",
              }}
            >
              {data.personalInfo?.title || "Project Manager - Remote"}
            </div>
            {data.summary && (
              <p style={{ fontSize: "8.5pt", lineHeight: "1.5", color: "#4b5563", margin: "0 0 12px 0" }}>
                {renderFormattedText(data.summary)}
              </p>
            )}

            {/* Contact Grid with Coral Icons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5px 20px",
                padding: "8px 0",
                borderBottom: "1px solid #e2e8f0",
                marginBottom: "8px",
              }}
            >
              {email && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                  <Mail style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                  <Phone style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                  <span>{phone}</span>
                </div>
              )}
              {location && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                  <MapPin style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                  <span>{location}</span>
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                  <LinkedinIcon style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {github && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                  <GithubIcon style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                  <span>{github.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                  <Globe style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {customLinks.map((cl, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                  <Globe style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                  <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Sections */}
          {orderedSections.filter(id => id !== "summary").map(secId => renderChrisSection(secId))}
        </div>
      );
    };

    // 4. Will Tribian — Theater & Creative Portfolio
    const renderProWillTribian = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80";

      const techSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
      ];
      const softSkills = data.skills?.soft || [];

      const defaultWillSidebar = ["skills", "education", "languages", "certifications", "achievements"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultWillSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const mainSections = orderedSections.filter(id => !sidebarSet.has(id) && id !== "summary");
      const sidebarSections = orderedSections.filter(id => sidebarSet.has(id) && id !== "summary");

      const renderWillSection = (secId: string, isSidebar: boolean) => {
        switch (secId) {
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Briefcase style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Work Experience
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: "9.5pt", fontWeight: "bold", color: "#0f172a" }}>
                          {renderFormattedText(exp.title || "")}
                        </span>
                        <span style={{ fontSize: "8pt", color: "#64748b" }}>{exp.date}</span>
                      </div>
                      <div style={{ fontSize: "8.5pt", fontWeight: "600", color: "#0891b2", marginBottom: "3px" }}>
                        {renderFormattedText(exp.company || "")}
                        {exp.location ? ` • ${exp.location}` : ""}
                      </div>
                      {renderBulletList(exp.bullets, isSidebar, "•", "8.5pt")}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Award style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Workshops & Projects
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.projects.map((proj, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9pt", fontWeight: "bold", color: "#0f172a" }}>{proj.name}</div>
                      {proj.description && (
                        <div style={{ fontSize: "8pt", color: "#475569", lineHeight: "1.4" }}>{proj.description}</div>
                      )}
                      {proj.tech && (
                        <div style={{ fontSize: "7.5pt", color: "#0891b2", fontStyle: "italic" }}>{proj.tech}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "skills":
            if (techSkills.length === 0 && softSkills.length === 0) return null;
            return (
              <div key="skills" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {techSkills.length > 0 && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Layers style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                      </div>
                      <span style={{ fontSize: "10.5pt", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                        Hard Skills
                      </span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {techSkills.map((sk, i) => (
                        <span key={i} style={{ backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "2px 7px", fontSize: "8pt", color: "#334155" }}>
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Sparkles style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                      </div>
                      <span style={{ fontSize: "10.5pt", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                        Soft Skills
                      </span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {softSkills.map((sk, i) => (
                        <span
                          key={i}
                          style={{
                            backgroundColor: "#e2e8f0",
                            color: "#334155",
                            borderRadius: "4px",
                            padding: "3px 8px",
                            fontSize: "8pt",
                            fontWeight: 500,
                          }}
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <GraduationCap style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Education
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9pt", fontWeight: "bold", color: "#0f172a" }}>
                        {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                      </div>
                      <div style={{ fontSize: "8pt", color: "#64748b" }}>
                        {edu.school} {edu.date ? `• ${edu.date}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Globe style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Languages
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.languages.map((l, i) => (
                    <div key={i} style={{ fontSize: "8.5pt", color: "#334155" }}>
                      <strong>{l.name}</strong> {l.proficiency ? `(${l.proficiency})` : ""}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Award style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Certifications
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.certifications.map((c, i) => (
                    <div key={i} style={{ fontSize: "8.5pt", color: "#334155" }}>
                      <strong>{c.name}</strong> {c.issuer ? `• ${c.issuer}` : ""}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sparkles style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Achievements
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, i) => (
                    <div key={i} style={{ fontSize: "8.5pt", color: "#334155" }}>
                      <strong>{ach.title}</strong> {ach.description ? `: ${ach.description}` : ""}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "12mm 14mm",
            boxSizing: "border-box",
            color: "#0f172a",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Top Header Card */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "8px" }}>
            <div
              style={{
                width: "82px",
                height: "82px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2.5px solid #0891b2",
                flexShrink: 0,
                backgroundColor: "#e2e8f0",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: nameFontSize || "24pt",
                  fontWeight: "800",
                  color: "#0f172a",
                  lineHeight: "1.1",
                  margin: "0 0 2px 0",
                }}
              >
                {data.personalInfo?.fullName || "Will Tribian"}
              </h1>
              <div
                style={{
                  fontSize: "11pt",
                  fontWeight: "600",
                  color: "#0f766e",
                  marginBottom: "6px",
                }}
              >
                {data.personalInfo?.title || "Theater Actor"}
              </div>
              {data.summary && (
                <div
                  style={{
                    backgroundColor: "#1e293b",
                    color: "#f1f5f9",
                    borderRadius: "6px",
                    padding: "7px 10px",
                    fontSize: "8pt",
                    lineHeight: "1.4",
                  }}
                >
                  {renderFormattedText(data.summary)}
                </div>
              )}
            </div>
          </div>

          {/* Full-Width Teal Banner with Contact Icons */}
          <div
            style={{
              backgroundColor: "#0891b2",
              color: "#ffffff",
              borderRadius: "4px",
              padding: "6px 12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
              margin: "8px 0 14px 0",
              fontSize: "8pt",
            }}
          >
            {email && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Mail style={{ width: "11px", height: "11px", color: "#ffffff" }} />
                <span>{email}</span>
              </div>
            )}
            {phone && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Phone style={{ width: "11px", height: "11px", color: "#ffffff" }} />
                <span>{phone}</span>
              </div>
            )}
            {location && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <MapPin style={{ width: "11px", height: "11px", color: "#ffffff" }} />
                <span>{location}</span>
              </div>
            )}
            {linkedin && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <LinkedinIcon style={{ width: "11px", height: "11px", color: "#ffffff" }} />
                <span>{linkedin.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {github && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <GithubIcon style={{ width: "11px", height: "11px", color: "#ffffff" }} />
                <span>{github.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {portfolio && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: "11px", height: "11px", color: "#ffffff" }} />
                <span>{portfolio.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {customLinks.map((cl, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: "11px", height: "11px", color: "#ffffff" }} />
                <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
              </div>
            ))}
          </div>

          {/* Dynamic 2-Column Lower Body */}
          <div style={{ display: "flex", gap: "18px" }}>
            {/* Left Column (~58%) */}
            <div style={{ flex: "1 1 58%", display: "flex", flexDirection: "column", gap: "12px" }}>
              {mainSections.map(secId => renderWillSection(secId, false))}
            </div>

            {/* Right Column (~42%) */}
            <div style={{ flex: "1 1 42%", display: "flex", flexDirection: "column", gap: "12px" }}>
              {sidebarSections.map(secId => renderWillSection(secId, true))}
            </div>
          </div>
        </div>
      );
    };

    // 5. Claire Russel — Computer Science Student
    const renderProClaire = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

      const allSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
      ];
      const softSkills = data.skills?.soft || [];

      const renderHeaderLine = (title: string) => (
        <div style={{ marginTop: "14px", marginBottom: "8px" }}>
          <div
            style={{
              fontSize: "10pt",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#1e1b4b",
              borderBottom: "1.5px solid #4c1d95",
              paddingBottom: "2px",
            }}
          >
            {title}
          </div>
        </div>
      );

      const defaultClaireSidebar = ["skills", "languages", "certifications", "achievements"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultClaireSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const sidebarSections = orderedSections.filter(id => sidebarSet.has(id) && id !== "summary");
      const mainSections = orderedSections.filter(id => !sidebarSet.has(id) && id !== "summary");

      const renderClaireSection = (secId: string, isSidebar: boolean) => {
        switch (secId) {
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderHeaderLine("EDUCATION")}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                      <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                      {edu.date && <div style={{ fontSize: "8pt", color: "#64748b" }}>{edu.date}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderHeaderLine("WORK EXPERIENCE")}
                <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                  {data.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{exp.title}</div>
                      <div style={{ fontSize: "8.5pt", color: "#4c1d95", fontWeight: "600" }}>{exp.company}</div>
                      {exp.date && <div style={{ fontSize: "8pt", color: "#64748b", margin: "1px 0" }}>{exp.date}</div>}
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4, marginBottom: "2px" }}>
                              {renderFormattedText(b)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderHeaderLine("KEY PROJECTS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.projects.map((proj, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>
                        {proj.name} {proj.tech ? <span style={{ fontSize: "8pt", color: "#4c1d95" }}>({proj.tech})</span> : null}
                      </div>
                      {proj.description && <div style={{ fontSize: "8pt", color: "#334155" }}>{proj.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "skills":
            if (allSkills.length === 0 && softSkills.length === 0) return null;
            return (
              <div key="skills" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {allSkills.length > 0 && (
                  <div>
                    {renderHeaderLine("TECHNICAL SKILLS")}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {allSkills.map((s, idx) => (
                        <span key={idx} style={{ backgroundColor: "#f3e8ff", color: "#4c1d95", padding: "2px 6px", borderRadius: "3px", fontSize: "7.5pt", fontWeight: 600 }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    {renderHeaderLine("SOFT SKILLS")}
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "8.5pt", color: "#334155" }}>
                      {softSkills.map((s, idx) => (
                        <div key={idx}>• {s}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderHeaderLine("LANGUAGES")}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {data.languages.map((l, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{l.name}</div>
                      {l.proficiency && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{l.proficiency}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderHeaderLine("CERTIFICATES")}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.certifications.map((c, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{c.name}</div>
                      {c.issuer && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{c.issuer}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderHeaderLine("ORGANIZATIONS & HONORS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "14mm 16mm",
            boxSizing: "border-box",
            color: "#1e293b",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Top Banner: Round photo + Purple Capsule */}
          <div style={{ display: "flex", alignItems: "stretch", gap: "16px", marginBottom: "14px" }}>
            <div style={{ flex: "0 0 100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={photoUrl}
                alt={data.personalInfo?.fullName || "Claire Russel"}
                style={{
                  width: "92px",
                  height: "92px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2.5px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "#4c1d95",
                borderRadius: "4px",
                padding: "14px 20px",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h1 style={{ fontSize: nameFontSize || "24pt", fontWeight: "800", margin: "0 0 2px 0", letterSpacing: "-0.5px" }}>
                {data.personalInfo?.fullName || "Claire Russel"}
              </h1>
              <p style={{ fontSize: "10.5pt", color: "#ddd6fe", fontWeight: "600", margin: "0 0 6px 0" }}>
                {data.personalInfo?.title || "Computer Science Student"}
              </p>
              {data.summary && (
                <p style={{ fontSize: "8.5pt", color: "#f3e8ff", lineHeight: 1.4, margin: 0 }}>
                  {renderFormattedText(data.summary)}
                </p>
              )}
            </div>
          </div>

          {/* Body: 2-Column (Left Sidebar / Right Main) */}
          <div style={{ display: "flex", gap: "20px" }}>
            {/* Left Sidebar */}
            <div style={{ flex: "0 0 28%", borderRight: "1px solid #e2e8f0", paddingRight: "16px" }}>
              {/* Contact with Square Icons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "8pt", color: "#334155" }}>
                {email && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", wordBreak: "break-all" }}>
                    <div style={{ width: 16, height: 16, backgroundColor: "#4c1d95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Mail style={{ width: 10, height: 10, color: "#ffffff" }} />
                    </div>
                    <span>{email}</span>
                  </div>
                )}
                {phone && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: 16, height: 16, backgroundColor: "#4c1d95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Phone style={{ width: 10, height: 10, color: "#ffffff" }} />
                    </div>
                    <span>{phone}</span>
                  </div>
                )}
                {location && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: 16, height: 16, backgroundColor: "#4c1d95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MapPin style={{ width: 10, height: 10, color: "#ffffff" }} />
                    </div>
                    <span>{location}</span>
                  </div>
                )}
                {linkedin && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", wordBreak: "break-all" }}>
                    <div style={{ width: 16, height: 16, backgroundColor: "#4c1d95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <LinkedinIcon style={{ width: 10, height: 10, color: "#ffffff" }} />
                    </div>
                    <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                  </div>
                )}
                {github && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", wordBreak: "break-all" }}>
                    <div style={{ width: 16, height: 16, backgroundColor: "#4c1d95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <GithubIcon style={{ width: 10, height: 10, color: "#ffffff" }} />
                    </div>
                    <span>{github.replace(/^https?:\/\//, "")}</span>
                  </div>
                )}
                {portfolio && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", wordBreak: "break-all" }}>
                    <div style={{ width: 16, height: 16, backgroundColor: "#4c1d95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Globe style={{ width: 10, height: 10, color: "#ffffff" }} />
                    </div>
                    <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  </div>
                )}
                {customLinks.map((cl, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px", wordBreak: "break-all" }}>
                    <div style={{ width: 16, height: 16, backgroundColor: "#4c1d95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Globe style={{ width: 10, height: 10, color: "#ffffff" }} />
                    </div>
                    <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Sidebar Sections */}
              {sidebarSections.map(secId => renderClaireSection(secId, true))}
            </div>

            {/* Right Main Column */}
            <div style={{ flex: 1 }}>
              {mainSections.map(secId => renderClaireSection(secId, false))}
            </div>
          </div>
        </div>
      );
    };

    // 6. Jessica Blakely — Game Designer
    const renderProJessica = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80";

      const hardSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
      ];
      const softSkills = data.skills?.soft || [];

      const renderGoldHeader = (title: string) => (
        <div style={{ marginTop: "14px", marginBottom: "7px" }}>
          <div
            style={{
              fontSize: "10pt",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              color: "#b8860b",
            }}
          >
            {title}
          </div>
        </div>
      );

      const defaultJessicaSidebar = ["skills", "education", "languages", "achievements"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultJessicaSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const mainSections = orderedSections.filter(id => !sidebarSet.has(id) && id !== "summary");
      const sidebarSections = orderedSections.filter(id => sidebarSet.has(id) && id !== "summary");

      const renderJessicaSection = (secId: string, isSidebar: boolean) => {
        switch (secId) {
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderGoldHeader("WORK EXPERIENCE")}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{exp.title}</div>
                      <div style={{ fontSize: "8.5pt", color: "#334155", fontWeight: "600" }}>{exp.company}</div>
                      {exp.date && <div style={{ fontSize: "8pt", color: "#b8860b", margin: "1px 0" }}>{exp.date}</div>}
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4, marginBottom: "2px" }}>
                              {renderFormattedText(b)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderGoldHeader("PROJECTS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.projects.map((proj, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>
                        {proj.name} {proj.tech ? <span style={{ fontSize: "8pt", color: "#b8860b" }}>({proj.tech})</span> : null}
                      </div>
                      {proj.description && <div style={{ fontSize: "8pt", color: "#334155" }}>{proj.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "skills":
            if (hardSkills.length === 0 && softSkills.length === 0) return null;
            return (
              <div key="skills" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {hardSkills.length > 0 && (
                  <div>
                    {renderGoldHeader("HARD SKILLS")}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {hardSkills.map((s, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: "#1e293b",
                            color: "#ffffff",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "7.5pt",
                            fontWeight: "600",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    {renderGoldHeader("SOFT SKILLS")}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {softSkills.map((s, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: "#1e293b",
                            color: "#ffffff",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "7.5pt",
                            fontWeight: "600",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderGoldHeader("EDUCATION")}
                {data.education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: "6px" }}>
                    <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                    <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                    {edu.date && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{edu.date}</div>}
                  </div>
                ))}
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderGoldHeader("CERTIFICATES")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.certifications.map((c, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{c.name}</div>
                      {c.issuer && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{c.issuer}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderGoldHeader("LANGUAGES")}
                <div style={{ display: "flex", gap: "16px", marginTop: "4px", flexWrap: "wrap" }}>
                  {data.languages.map((l, idx) => (
                    <div key={idx} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "26px",
                          backgroundColor: "#1e293b",
                          borderRadius: "4px",
                          borderTop: "4px solid #d4af37",
                          margin: "0 auto 3px auto",
                        }}
                      />
                      <div style={{ fontSize: "7.5pt", fontWeight: "700", color: "#0f172a" }}>{l.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderGoldHeader("AWARDS & HONORS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {data.achievements.map((ach, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "0",
            boxSizing: "border-box",
            color: "#1e293b",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Dark Navy Header with Gold Ring Photo */}
          <div
            style={{
              backgroundColor: "#1e293b",
              color: "#ffffff",
              padding: "16mm 16mm 10mm 16mm",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: nameFontSize || "24pt", fontWeight: "800", margin: "0 0 2px 0", letterSpacing: "-0.5px" }}>
                  {data.personalInfo?.fullName || "Jessica Blakely"}
                </h1>
                <p style={{ fontSize: "11pt", color: "#d4af37", fontWeight: "600", margin: "0 0 8px 0" }}>
                  {data.personalInfo?.title || "Game Designer"}
                </p>
                {data.summary && (
                  <p style={{ fontSize: "8.5pt", color: "#cbd5e1", lineHeight: 1.45, margin: 0 }}>
                    {renderFormattedText(data.summary)}
                  </p>
                )}
              </div>
              <div style={{ flex: "0 0 100px", display: "flex", justifyContent: "center" }}>
                <img
                  src={photoUrl}
                  alt={data.personalInfo?.fullName || "Jessica Blakely"}
                  style={{
                    width: "95px",
                    height: "95px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3.5px solid #d4af37",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  }}
                />
              </div>
            </div>

            {/* Contact Ribbon Inside Banner */}
            <div
              style={{
                borderTop: "1px solid #334155",
                marginTop: "12px",
                paddingTop: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px 20px",
                fontSize: "8pt",
                color: "#e2e8f0",
              }}
            >
              {email && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Mail style={{ width: 12, height: 12, color: "#d4af37" }} />
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Phone style={{ width: 12, height: 12, color: "#d4af37" }} />
                  <span>{phone}</span>
                </div>
              )}
              {location && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin style={{ width: 12, height: 12, color: "#d4af37" }} />
                  <span>{location}</span>
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <LinkedinIcon style={{ width: 12, height: 12, color: "#d4af37" }} />
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {github && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <GithubIcon style={{ width: 12, height: 12, color: "#d4af37" }} />
                  <span>{github.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Globe style={{ width: 12, height: 12, color: "#d4af37" }} />
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {customLinks.map((cl, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Globe style={{ width: 12, height: 12, color: "#d4af37" }} />
                  <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic 2 Columns */}
          <div style={{ padding: "8mm 16mm 14mm 16mm", display: "flex", gap: "24px" }}>
            {/* Left Column (55%) */}
            <div style={{ flex: "1 1 55%" }}>
              {mainSections.map(secId => renderJessicaSection(secId, false))}
            </div>

            {/* Right Column (45%) */}
            <div style={{ flex: "1 1 45%" }}>
              {sidebarSections.map(secId => renderJessicaSection(secId, true))}
            </div>
          </div>
        </div>
      );
    };

    // 7. Adam Stotch — Realtor
    const renderProAdam = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";

      const allSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
        ...(data.skills?.soft || []),
      ];

      const renderSimpleHeader = (title: string) => (
        <div style={{ marginTop: "14px", marginBottom: "8px" }}>
          <div
            style={{
              fontSize: "10pt",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "2px",
            }}
          >
            {title}
          </div>
        </div>
      );

      const defaultAdamSidebar = ["skills", "certifications", "languages", "achievements"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultAdamSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const mainSections = orderedSections.filter(id => !sidebarSet.has(id) && id !== "summary");
      const sidebarSections = orderedSections.filter(id => sidebarSet.has(id) && id !== "summary");

      const renderAdamSection = (secId: string, isSidebar: boolean) => {
        switch (secId) {
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderSimpleHeader("WORK EXPERIENCE")}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, idx) => (
                    <div key={idx} style={{ position: "relative", paddingLeft: "18px" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "3px",
                          width: "9px",
                          height: "9px",
                          borderRadius: "50%",
                          border: "2px solid #0f172a",
                          backgroundColor: "#ffffff",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: "4px",
                          top: "14px",
                          bottom: "-8px",
                          width: "1.5px",
                          backgroundColor: "#cbd5e1",
                        }}
                      />
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{exp.title}</div>
                      <div style={{ fontSize: "8.5pt", color: "#334155", fontWeight: "600" }}>{exp.company}</div>
                      {exp.date && <div style={{ fontSize: "7.5pt", color: "#64748b", margin: "1px 0" }}>{exp.date}</div>}
                      {exp.bullets && exp.bullets.length > 0 && (
                        <div style={{ borderLeft: "2px solid #94a3b8", paddingLeft: "8px", marginTop: "4px" }}>
                          <ul style={{ margin: 0, paddingLeft: "12px" }}>
                            {exp.bullets.map((b, bIdx) => (
                              <li key={bIdx} style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4, marginBottom: "2px" }}>
                                {renderFormattedText(b)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderSimpleHeader("EDUCATION")}
                {data.education.map((edu, idx) => (
                  <div key={idx} style={{ position: "relative", paddingLeft: "18px", marginBottom: "6px" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "3px",
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        border: "2px solid #0f172a",
                        backgroundColor: "#ffffff",
                      }}
                    />
                    <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                    <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                    {edu.date && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{edu.date}</div>}
                  </div>
                ))}
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderSimpleHeader("KEY PROJECTS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.projects.map((proj, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>
                        {proj.name} {proj.tech ? <span style={{ fontSize: "8pt", color: "#64748b" }}>({proj.tech})</span> : null}
                      </div>
                      {proj.description && <div style={{ fontSize: "8pt", color: "#334155" }}>{proj.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "skills":
            if (allSkills.length === 0) return null;
            return (
              <div key="skills">
                {renderSimpleHeader("SKILLS")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "8pt", color: "#334155" }}>
                  {allSkills.map((s, idx) => (
                    <div key={idx} style={{ padding: "2px 0" }}>• {s}</div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderSimpleHeader("CERTIFICATES")}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {data.certifications.map((c, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{c.name}</div>
                      {c.issuer && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{c.issuer}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderSimpleHeader("LANGUAGES")}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {data.languages.map((l, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "8.5pt", color: "#0f172a", fontWeight: "600" }}>{l.name}</span>
                      <span style={{ fontSize: "7.5pt", color: "#64748b" }}>{l.proficiency || ""}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderSimpleHeader("MEMBERSHIPS & HONORS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "15mm 16mm",
            boxSizing: "border-box",
            color: "#0f172a",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Top Row: Photo + Name/Title + Contact */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <img
                src={photoUrl}
                alt={data.personalInfo?.fullName || "Adam Stotch"}
                style={{
                  width: "82px",
                  height: "82px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  border: "1.5px solid #cbd5e1",
                }}
              />
              <div>
                <h1 style={{ fontSize: nameFontSize || "24pt", fontWeight: "800", margin: "0 0 2px 0", color: "#0f172a" }}>
                  {data.personalInfo?.fullName || "Adam Stotch"}
                </h1>
                <p style={{ fontSize: "11pt", color: "#475569", fontWeight: "500", margin: 0 }}>
                  {data.personalInfo?.title || "Realtor"}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", fontSize: "8.5pt", color: "#334155" }}>
              {email && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{email}</span>
                  <Mail style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{phone}</span>
                  <Phone style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {location && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{location}</span>
                  <MapPin style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                  <LinkedinIcon style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {github && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{github.replace(/^https?:\/\//, "")}</span>
                  <GithubIcon style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {customLinks.map((cl, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Full-width Summary */}
          {data.summary && (
            <p style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.45, margin: "12px 0 8px 0" }}>
              {renderFormattedText(data.summary)}
            </p>
          )}

          {/* Dynamic 2 Columns */}
          <div style={{ display: "flex", gap: "24px", marginTop: "8px" }}>
            {/* Left Column (55%) */}
            <div style={{ flex: "1 1 55%" }}>
              {mainSections.map(secId => renderAdamSection(secId, false))}
            </div>

            {/* Right Column (45%) */}
            <div style={{ flex: "1 1 45%" }}>
              {sidebarSections.map(secId => renderAdamSection(secId, true))}
            </div>
          </div>
        </div>
      );
    };

    // 8. Nick Koe — Event Photographer
    const renderProNick = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80";

      const hardSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
      ];
      const softSkills = data.skills?.soft || [];

      const renderNickHeader = (title: string) => (
        <div style={{ marginTop: "14px", marginBottom: "8px" }}>
          <div
            style={{
              fontSize: "10pt",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#0f172a",
            }}
          >
            {title}
          </div>
        </div>
      );

      const defaultNickSidebar = ["skills", "certifications", "languages", "achievements"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultNickSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const mainSections = orderedSections.filter(id => !sidebarSet.has(id) && id !== "summary");
      const sidebarSections = orderedSections.filter(id => sidebarSet.has(id) && id !== "summary");

      const renderNickSection = (secId: string, isSidebar: boolean) => {
        switch (secId) {
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderNickHeader("WORK EXPERIENCE")}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{exp.title}</div>
                      <div style={{ fontSize: "8.5pt", color: "#334155", fontWeight: "600" }}>{exp.company}</div>
                      <div style={{ fontSize: "8pt", color: "#e06d53", fontWeight: "600", margin: "1px 0" }}>
                        {exp.date} {exp.location ? `• ${exp.location}` : ""}
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4, marginBottom: "2px" }}>
                              {renderFormattedText(b)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderNickHeader("EDUCATION")}
                {data.education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: "6px" }}>
                    <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                    <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                    {edu.date && <div style={{ fontSize: "8pt", color: "#e06d53" }}>{edu.date}</div>}
                  </div>
                ))}
              </div>
            );
          case "skills":
            if (hardSkills.length === 0 && softSkills.length === 0) return null;
            return (
              <div key="skills" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {hardSkills.length > 0 && (
                  <div>
                    {renderNickHeader("HARD SKILLS")}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {hardSkills.map((s, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: "#8da9c4",
                            color: "#ffffff",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "7.5pt",
                            fontWeight: "600",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    {renderNickHeader("SOFT SKILLS")}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {softSkills.map((s, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: "#8da9c4",
                            color: "#ffffff",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "7.5pt",
                            fontWeight: "600",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderNickHeader("PORTFOLIO & PROJECTS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.projects.map((p, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{p.name}</div>
                      {p.description && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                          <li style={{ fontSize: "8pt", color: "#334155", lineHeight: 1.35 }}>{p.description}</li>
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderNickHeader("CERTIFICATES")}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {data.certifications.map((c, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{c.name}</div>
                      {c.issuer && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{c.issuer}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderNickHeader("ACHIEVEMENTS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderNickHeader("LANGUAGES")}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontSize: "8pt" }}>
                  {data.languages.map((l, idx) => (
                    <div key={idx}>
                      <strong style={{ color: "#0f172a" }}>{l.name}</strong> {l.proficiency ? <span style={{ color: "#64748b" }}>({l.proficiency})</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "14mm 16mm 14mm 12mm",
            boxSizing: "border-box",
            color: "#0f172a",
            position: "relative",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Left Margin Accent Bars */}
          <div style={{ position: "absolute", left: 0, top: "14mm", width: "8px", height: "35px", backgroundColor: "#4a6b82" }} />
          <div style={{ position: "absolute", left: 0, top: "68mm", width: "8px", height: "35px", backgroundColor: "#e06d53" }} />
          <div style={{ position: "absolute", left: 0, top: "140mm", width: "8px", height: "35px", backgroundColor: "#4a6b82" }} />
          <div style={{ position: "absolute", left: 0, top: "210mm", width: "8px", height: "35px", backgroundColor: "#e06d53" }} />

          {/* Top Header: Name/Title/Bio + Squircle Framed Photo + Contact */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", paddingLeft: "8px" }}>
            <div style={{ flex: "1 1 42%" }}>
              <h1 style={{ fontSize: nameFontSize || "24pt", fontWeight: "800", margin: "0 0 2px 0", color: "#4a6b82" }}>
                {data.personalInfo?.fullName || "Nick Koe"}
              </h1>
              <p style={{ fontSize: "11pt", color: "#e06d53", fontWeight: "600", margin: "0 0 8px 0" }}>
                {data.personalInfo?.title || "Event Photographer"}
              </p>
              {data.summary && (
                <p style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.45, margin: 0 }}>
                  {renderFormattedText(data.summary)}
                </p>
              )}
            </div>

            <div style={{ flex: "0 0 100px", display: "flex", justifyContent: "center" }}>
              <img
                src={photoUrl}
                alt={data.personalInfo?.fullName || "Nick Koe"}
                style={{
                  width: "92px",
                  height: "105px",
                  borderRadius: "24px",
                  objectFit: "cover",
                  border: "3px solid #e06d53",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                }}
              />
            </div>

            <div style={{ flex: "1 1 38%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", fontSize: "8.5pt", color: "#334155" }}>
              {email && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{email}</span>
                  <Mail style={{ width: 12, height: 12, color: "#4a6b82" }} />
                </div>
              )}
              {phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{phone}</span>
                  <Phone style={{ width: 12, height: 12, color: "#4a6b82" }} />
                </div>
              )}
              {location && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{location}</span>
                  <MapPin style={{ width: 12, height: 12, color: "#4a6b82" }} />
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                  <LinkedinIcon style={{ width: 12, height: 12, color: "#4a6b82" }} />
                </div>
              )}
              {github && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{github.replace(/^https?:\/\//, "")}</span>
                  <GithubIcon style={{ width: 12, height: 12, color: "#4a6b82" }} />
                </div>
              )}
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#4a6b82" }} />
                </div>
              )}
              {customLinks.map((cl, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#4a6b82" }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderBottom: "1px solid #cbd5e1", margin: "12px 0 10px 8px" }} />

          {/* Dynamic 2-Column Body */}
          <div style={{ display: "flex", gap: "24px", paddingLeft: "8px" }}>
            {/* Left Column (55%) */}
            <div style={{ flex: "1 1 55%" }}>
              {mainSections.map(secId => renderNickSection(secId, false))}
            </div>

            {/* Right Column (45%) */}
            <div style={{ flex: "1 1 45%" }}>
              {sidebarSections.map(secId => renderNickSection(secId, true))}
            </div>
          </div>
        </div>
      );
    };

    // 9. Lisa Neumann — Mechanical Engineer
    const renderProLisa = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];

      const techSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
      ];
      const softSkills = data.skills?.soft || [];

      const renderBlueHeader = (title: string) => (
        <div style={{ marginTop: "14px", marginBottom: "7px" }}>
          <div
            style={{
              fontSize: "10.5pt",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#1e3a5f",
              borderBottom: "1.5px solid #1e3a5f",
              paddingBottom: "2px",
            }}
          >
            {title}
          </div>
        </div>
      );

      const defaultLisaSidebar = ["skills", "certifications", "languages", "achievements"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultLisaSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const mainSections = orderedSections.filter(id => !sidebarSet.has(id) && id !== "summary");
      const sidebarSections = orderedSections.filter(id => sidebarSet.has(id) && id !== "summary");

      const renderLisaSection = (secId: string, isSidebar: boolean) => {
        switch (secId) {
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderBlueHeader("WORK EXPERIENCE")}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{exp.title}</div>
                      <div style={{ fontSize: "8.5pt", color: "#1e3a5f", fontWeight: "600" }}>{exp.company}</div>
                      {exp.date && <div style={{ fontSize: "8pt", color: "#64748b", margin: "1px 0" }}>{exp.date}</div>}
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4, marginBottom: "2px" }}>
                              {renderFormattedText(b)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderBlueHeader("EDUCATION")}
                {data.education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: "6px" }}>
                    <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                    <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                    {edu.date && <div style={{ fontSize: "8pt", color: "#64748b" }}>{edu.date}</div>}
                  </div>
                ))}
              </div>
            );
          case "skills":
            if (techSkills.length === 0 && softSkills.length === 0) return null;
            return (
              <div key="skills" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {techSkills.length > 0 && (
                  <div>
                    {renderBlueHeader("TECHNICAL SKILLS")}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {techSkills.map((sk, idx) => (
                        <span key={idx} style={{ backgroundColor: "#e2e8f0", color: "#1e3a5f", padding: "2px 7px", borderRadius: "3px", fontSize: "7.5pt", fontWeight: 600 }}>
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    {renderBlueHeader("GENERAL SKILLS")}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {softSkills.map((s, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: "#7f9db9",
                            color: "#ffffff",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "7.5pt",
                            fontWeight: "600",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderBlueHeader("PROJECTS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.projects.map((proj, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>
                        {proj.name} {proj.tech ? <span style={{ fontSize: "8pt", color: "#1e3a5f" }}>({proj.tech})</span> : null}
                      </div>
                      {proj.description && <div style={{ fontSize: "8pt", color: "#334155" }}>{proj.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderBlueHeader("CERTIFICATES")}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {data.certifications.map((c, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{c.name}</div>
                      {c.issuer && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{c.issuer}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderBlueHeader("ACHIEVEMENTS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderBlueHeader("LANGUAGES")}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.languages.map((l, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{l.name}</div>
                      {l.proficiency && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{l.proficiency}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "14mm 16mm",
            boxSizing: "border-box",
            color: "#1e293b",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Top Header */}
          <div>
            <h1 style={{ fontSize: nameFontSize || "26pt", fontWeight: "700", color: "#1e293b", margin: "0 0 2px 0", letterSpacing: "-0.5px" }}>
              {data.personalInfo?.fullName || "Lisa Neumann"}
            </h1>
            <p style={{ fontSize: "12pt", color: "#0284c7", fontWeight: "600", margin: "0 0 8px 0" }}>
              {data.personalInfo?.title || "Mechanical Engineer"}
            </p>
            {data.summary && (
              <p style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.45, margin: "0 0 10px 0" }}>
                {renderFormattedText(data.summary)}
              </p>
            )}
          </div>

          {/* Solid Steel-Blue Contact Ribbon */}
          <div
            style={{
              backgroundColor: "#1e3a5f",
              color: "#ffffff",
              padding: "7px 16px",
              borderRadius: "2px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
              fontSize: "8pt",
              marginBottom: "12px",
            }}
          >
            {email && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Mail style={{ width: 12, height: 12, color: "#93c5fd" }} />
                <span>{email}</span>
              </div>
            )}
            {phone && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Phone style={{ width: 12, height: 12, color: "#93c5fd" }} />
                <span>{phone}</span>
              </div>
            )}
            {location && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <MapPin style={{ width: 12, height: 12, color: "#93c5fd" }} />
                <span>{location}</span>
              </div>
            )}
            {linkedin && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <LinkedinIcon style={{ width: 12, height: 12, color: "#93c5fd" }} />
                <span>{linkedin.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {github && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <GithubIcon style={{ width: 12, height: 12, color: "#93c5fd" }} />
                <span>{github.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {portfolio && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: 12, height: 12, color: "#93c5fd" }} />
                <span>{portfolio.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {customLinks.map((cl, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: 12, height: 12, color: "#93c5fd" }} />
                <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
              </div>
            ))}
          </div>

          {/* Dynamic 2-Column Body */}
          <div style={{ display: "flex", gap: "24px" }}>
            {/* Left Column (55%) */}
            <div style={{ flex: "1 1 55%" }}>
              {mainSections.map(secId => renderLisaSection(secId, false))}
            </div>

            {/* Right Column (45%) */}
            <div style={{ flex: "1 1 45%" }}>
              {sidebarSections.map(secId => renderLisaSection(secId, true))}
            </div>
          </div>
        </div>
      );
    };

    // 10. Ivana Johnson — HR Professional
    const renderProIvana = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];

      const hardSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
        ...(data.skills?.soft || []),
      ];

      const renderIvanaHeader = (title: string, icon: React.ReactNode) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", marginBottom: "8px" }}>
          <div
            style={{
              width: "22px",
              height: "22px",
              backgroundColor: "#174375",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontSize: "10pt",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#1e293b",
            }}
          >
            {title}
          </span>
        </div>
      );

      const defaultIvanaSidebar = ["skills", "certifications", "education", "languages", "achievements"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultIvanaSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const mainSections = orderedSections.filter(id => !sidebarSet.has(id) && id !== "summary");
      const sidebarSections = orderedSections.filter(id => sidebarSet.has(id) && id !== "summary");

      const renderIvanaSection = (secId: string, isSidebar: boolean) => {
        switch (secId) {
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderIvanaHeader("WORK EXPERIENCE", <Briefcase style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{exp.title}</div>
                      <div style={{ fontSize: "8.5pt", color: "#174375", fontWeight: "600" }}>{exp.company}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "7.5pt", color: "#64748b", margin: "1px 0" }}>
                        <span>{exp.date}</span>
                        <span>{exp.location}</span>
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4, marginBottom: "2px" }}>
                              {renderFormattedText(b)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderIvanaHeader("EDUCATION", <GraduationCap style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.school}</div>
                      <div style={{ fontSize: "8pt", color: "#334155" }}>{edu.degree}</div>
                      {edu.date && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{edu.date}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "skills":
            if (hardSkills.length === 0) return null;
            return (
              <div key="skills">
                {renderIvanaHeader("SKILLS & COMPETENCIES", <Sparkles style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {hardSkills.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#8da9c4",
                        color: "#ffffff",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "7.5pt",
                        fontWeight: "600",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderIvanaHeader("KEY PROJECTS", <FolderGit2 style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.projects.map((proj, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>
                        {proj.name} {proj.tech ? <span style={{ fontSize: "8pt", color: "#174375" }}>({proj.tech})</span> : null}
                      </div>
                      {proj.description && <div style={{ fontSize: "8pt", color: "#334155" }}>{proj.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderIvanaHeader("CERTIFICATES", <Award style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {data.certifications.map((c, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{c.name}</div>
                      {c.issuer && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{c.issuer}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderIvanaHeader("COURSES & TRAINING", <Bookmark style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {data.achievements.map((ach, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderIvanaHeader("LANGUAGES", <Globe style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
                  {data.languages.map((l, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{l.name}</div>
                      <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{l.proficiency}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "14mm 16mm",
            boxSizing: "border-box",
            color: "#1e293b",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Deep Marine Header Card */}
          <div
            style={{
              backgroundColor: "#174375",
              borderRadius: "12px",
              padding: "16px 20px",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
              boxShadow: "0 4px 12px rgba(23, 67, 117, 0.15)",
              marginBottom: "12px",
            }}
          >
            <div style={{ flex: "1 1 58%" }}>
              <h1 style={{ fontSize: nameFontSize || "26pt", fontWeight: "800", margin: "0 0 2px 0", letterSpacing: "-0.5px" }}>
                {data.personalInfo?.fullName || "Ivana Johnson"}
              </h1>
              <p style={{ fontSize: "11.5pt", color: "#bfdbfe", fontWeight: "600", margin: "0 0 8px 0" }}>
                {data.personalInfo?.title || "HR Professional"}
              </p>
              {data.summary && (
                <p style={{ fontSize: "8.5pt", color: "#f8fafc", lineHeight: 1.45, margin: 0, opacity: 0.95 }}>
                  {renderFormattedText(data.summary)}
                </p>
              )}
            </div>

            <div style={{ flex: "1 1 38%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px", fontSize: "8pt", color: "#e2e8f0" }}>
              {email && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{email}</span>
                  <Mail style={{ width: 12, height: 12, color: "#93c5fd" }} />
                </div>
              )}
              {phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{phone}</span>
                  <Phone style={{ width: 12, height: 12, color: "#93c5fd" }} />
                </div>
              )}
              {location && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{location}</span>
                  <MapPin style={{ width: 12, height: 12, color: "#93c5fd" }} />
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                  <LinkedinIcon style={{ width: 12, height: 12, color: "#93c5fd" }} />
                </div>
              )}
              {github && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{github.replace(/^https?:\/\//, "")}</span>
                  <GithubIcon style={{ width: 12, height: 12, color: "#93c5fd" }} />
                </div>
              )}
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#93c5fd" }} />
                </div>
              )}
              {customLinks.map((cl, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#93c5fd" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic 2-Column Body */}
          <div style={{ display: "flex", gap: "24px" }}>
            {/* Left Column (55%) */}
            <div style={{ flex: "1 1 55%" }}>
              {mainSections.map(secId => renderIvanaSection(secId, false))}
            </div>

            {/* Right Column (45%) */}
            <div style={{ flex: "1 1 45%" }}>
              {sidebarSections.map(secId => renderIvanaSection(secId, true))}
            </div>
          </div>
        </div>
      );
    };

    // 11. Melissa Ware — Copywriter
    const renderProMelissa = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80";

      const allSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
        ...(data.skills?.soft || []),
      ];

      const renderMelissaHeader = (title: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", marginBottom: "8px" }}>
          <div
            style={{
              width: "18px",
              height: "18px",
              backgroundColor: "#0f172a",
              borderRadius: "3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(45deg)",
              flexShrink: 0,
            }}
          >
            <div style={{ width: "6px", height: "6px", backgroundColor: "#d4af37", borderRadius: "1px" }} />
          </div>
          <span
            style={{
              fontSize: "10pt",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#0f172a",
            }}
          >
            {title}
          </span>
        </div>
      );

      const defaultMelissaSidebar = ["skills", "projects", "certifications", "languages", "achievements"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultMelissaSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const mainSections = orderedSections.filter(id => !sidebarSet.has(id) && id !== "summary");
      const sidebarSections = orderedSections.filter(id => sidebarSet.has(id) && id !== "summary");

      const renderMelissaSection = (secId: string, isSidebar: boolean) => {
        switch (secId) {
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderMelissaHeader("WORK EXPERIENCE")}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, idx) => (
                    <div key={idx} style={{ position: "relative", paddingLeft: "16px" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "4px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          border: "2px solid #0f172a",
                          backgroundColor: "#ffffff",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: "3.5px",
                          top: "14px",
                          bottom: "-8px",
                          width: "1.5px",
                          backgroundColor: "#cbd5e1",
                        }}
                      />
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{exp.title}</div>
                      <div style={{ fontSize: "8.5pt", color: "#334155", fontWeight: "600" }}>{exp.company}</div>
                      <div style={{ fontSize: "7.5pt", color: "#64748b", margin: "1px 0" }}>
                        {exp.date} {exp.location ? `• ${exp.location}` : ""}
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4, marginBottom: "2px" }}>
                              {renderFormattedText(b)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderMelissaHeader("EDUCATION")}
                {data.education.map((edu, idx) => (
                  <div key={idx} style={{ position: "relative", paddingLeft: "16px", marginBottom: "6px" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "4px",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        border: "2px solid #0f172a",
                        backgroundColor: "#ffffff",
                      }}
                    />
                    <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                    <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                    {edu.date && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{edu.date}</div>}
                  </div>
                ))}
              </div>
            );
          case "skills":
            if (allSkills.length === 0) return null;
            return (
              <div key="skills">
                {renderMelissaHeader("GENERAL SKILLS")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", fontSize: "8pt", color: "#334155" }}>
                  {allSkills.map((s, idx) => (
                    <div key={idx} style={{ padding: "1px 0" }}>• {s}</div>
                  ))}
                </div>
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderMelissaHeader("PERSONAL PROJECTS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.projects.map((p, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{p.name}</div>
                      <p style={{ fontSize: "8pt", color: "#334155", lineHeight: 1.35, margin: "2px 0 0 0" }}>
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderMelissaHeader("CERTIFICATES")}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.certifications.map((c, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{c.name}</div>
                      {c.issuer && <div style={{ fontSize: "7pt", color: "#64748b" }}>{c.issuer}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderMelissaHeader("LANGUAGES")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px" }}>
                  {data.languages.map((l, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#d4af37" }} />
                      <div>
                        <div style={{ fontSize: "8pt", fontWeight: "700", color: "#0f172a" }}>{l.name}</div>
                        {l.proficiency && <div style={{ fontSize: "7pt", color: "#64748b" }}>{l.proficiency}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderMelissaHeader("ACHIEVEMENTS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "7pt", color: "#64748b" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "14mm 16mm",
            boxSizing: "border-box",
            color: "#0f172a",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Header Row: Navy Bio Capsule + Gold Framed Photo + Contact */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px", position: "relative" }}>
            <div
              style={{
                flex: "1 1 45%",
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                padding: "16px 20px",
                color: "#ffffff",
              }}
            >
              <h1 style={{ fontSize: nameFontSize || "24pt", fontWeight: "800", margin: "0 0 2px 0", letterSpacing: "-0.5px" }}>
                {data.personalInfo?.fullName || "Melissa Ware"}
              </h1>
              <p style={{ fontSize: "11pt", color: "#d4af37", fontWeight: "600", margin: "0 0 8px 0" }}>
                {data.personalInfo?.title || "Copywriter"}
              </p>
              {data.summary && (
                <p style={{ fontSize: "8.5pt", color: "#cbd5e1", lineHeight: 1.45, margin: 0 }}>
                  {renderFormattedText(data.summary)}
                </p>
              )}
            </div>

            <div style={{ flex: "0 0 100px", display: "flex", justifyContent: "center" }}>
              <img
                src={photoUrl}
                alt={data.personalInfo?.fullName || "Melissa Ware"}
                style={{
                  width: "95px",
                  height: "95px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #d4af37",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
            </div>

            <div style={{ flex: "1 1 35%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px", fontSize: "8pt", color: "#334155" }}>
              {email && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{email}</span>
                  <Mail style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{phone}</span>
                  <Phone style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {location && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{location}</span>
                  <MapPin style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                  <LinkedinIcon style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {github && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{github.replace(/^https?:\/\//, "")}</span>
                  <GithubIcon style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
              {customLinks.map((cl, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Golden Center Node Separator */}
          <div style={{ position: "relative", borderBottom: "1.5px solid #e2e8f0", margin: "14px 0 12px 0" }}>
            <div
              style={{
                position: "absolute",
                left: "48%",
                top: "-4px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#d4af37",
              }}
            />
          </div>

          {/* Dynamic 2-Column Body */}
          <div style={{ display: "flex", gap: "22px" }}>
            {/* Left Column (52%) */}
            <div style={{ flex: "1 1 52%" }}>
              {mainSections.map(secId => renderMelissaSection(secId, false))}
            </div>

            {/* Right Column (48%): Soft Grey Card Container */}
            <div
              style={{
                flex: "1 1 48%",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                padding: "14px 16px",
                border: "1px solid #f1f5f9",
              }}
            >
              {sidebarSections.map(secId => renderMelissaSection(secId, true))}
            </div>
          </div>
        </div>
      );
    };

    // 12. Veronica Cook — AWS Certified DevOps Engineer
    const renderProVeronica = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];

      const techSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
        ...(data.skills?.soft || []),
      ];

      const renderVeronicaHeader = (title: string, icon: React.ReactNode) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", marginBottom: "8px" }}>
          <div
            style={{
              width: "22px",
              height: "22px",
              backgroundColor: "#c85a48",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontSize: "10pt",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#1e3a5f",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>
          <div style={{ width: "50px", height: "2.5px", backgroundColor: "#c85a48", margin: "0 4px" }} />
          <div style={{ flex: 1, height: "2.5px", backgroundColor: "#1e3a5f" }} />
        </div>
      );

      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const renderVeronicaSection = (secId: string) => {
        switch (secId) {
          case "skills":
            if (techSkills.length === 0) return null;
            return (
              <div key="skills">
                {renderVeronicaHeader("TECHNICAL SKILLS", <Cpu style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {techSkills.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#64748b",
                        color: "#ffffff",
                        padding: "3px 9px",
                        borderRadius: "4px",
                        fontSize: "7.5pt",
                        fontWeight: "600",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderVeronicaHeader("WORK EXPERIENCE", <Briefcase style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{exp.title}</div>
                      <div style={{ fontSize: "8.5pt", color: "#1e3a5f", fontWeight: "600" }}>{exp.company}</div>
                      {exp.date && <div style={{ fontSize: "7.5pt", color: "#c85a48", margin: "1px 0" }}>{exp.date}</div>}
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px", listStyleType: "none" }}>
                          {exp.bullets.map((b, bIdx) => (
                            <li
                              key={bIdx}
                              style={{
                                fontSize: "8.5pt",
                                color: "#334155",
                                lineHeight: 1.4,
                                marginBottom: "2px",
                                position: "relative",
                                paddingLeft: "12px",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  top: "5px",
                                  width: "5px",
                                  height: "5px",
                                  backgroundColor: "#c85a48",
                                }}
                              />
                              {renderFormattedText(b)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderVeronicaHeader("EDUCATION", <GraduationCap style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                {data.education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: "6px" }}>
                    <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                    <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                    {edu.date && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{edu.date}</div>}
                  </div>
                ))}
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderVeronicaHeader("PROJECTS & INITIATIVES", <FolderGit2 style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.projects.map((proj, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>
                        {proj.name} {proj.tech ? <span style={{ fontSize: "8pt", color: "#c85a48", fontWeight: "600" }}>({proj.tech})</span> : null}
                      </div>
                      {proj.description && <div style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4 }}>{proj.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderVeronicaHeader("CERTIFICATIONS", <Award style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                  {data.certifications.map((c, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{c.name}</div>
                      <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{c.issuer} {c.date ? `(${c.date})` : ""}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderVeronicaHeader("ACHIEVEMENTS & HONORS", <Sparkles style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "7.5pt", color: "#334155" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderVeronicaHeader("LANGUAGES", <Globe style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {data.languages.map((l, idx) => (
                    <div key={idx} style={{ fontSize: "8.5pt" }}>
                      <strong style={{ color: "#0f172a" }}>{l.name}</strong> {l.proficiency ? <span style={{ color: "#64748b" }}>({l.proficiency})</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "14mm 16mm",
            boxSizing: "border-box",
            color: "#1e293b",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Top Header: Name/Title/Bio on Left + Floating Navy Contact Card on Right */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px", marginBottom: "10px" }}>
            <div style={{ flex: "1 1 60%" }}>
              <h1 style={{ fontSize: nameFontSize || "28pt", fontWeight: "800", color: "#1e3a5f", margin: "0 0 2px 0", letterSpacing: "-0.5px" }}>
                {data.personalInfo?.fullName || "Veronica Cook"}
              </h1>
              <p style={{ fontSize: "11.5pt", color: "#c85a48", fontWeight: "700", margin: "0 0 8px 0" }}>
                {data.personalInfo?.title || "AWS Certified DevOps Engineer"}
              </p>
              {data.summary && (
                <p style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.45, margin: 0 }}>
                  {renderFormattedText(data.summary)}
                </p>
              )}
            </div>

            {/* Floating Navy Contact Card */}
            <div
              style={{
                flex: "0 0 220px",
                backgroundColor: "#1e3a5f",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(30, 58, 95, 0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                fontSize: "7.5pt",
              }}
            >
              {email && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", wordBreak: "break-all" }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Mail style={{ width: 10, height: 10, color: "#ffffff" }} />
                  </div>
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Phone style={{ width: 10, height: 10, color: "#ffffff" }} />
                  </div>
                  <span>{phone}</span>
                </div>
              )}
              {location && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin style={{ width: 10, height: 10, color: "#ffffff" }} />
                  </div>
                  <span>{location}</span>
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", wordBreak: "break-all" }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <LinkedinIcon style={{ width: 10, height: 10, color: "#ffffff" }} />
                  </div>
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {github && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", wordBreak: "break-all" }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <GithubIcon style={{ width: 10, height: 10, color: "#ffffff" }} />
                  </div>
                  <span>{github.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", wordBreak: "break-all" }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Globe style={{ width: 10, height: 10, color: "#ffffff" }} />
                  </div>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {customLinks.map((cl, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", wordBreak: "break-all" }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Globe style={{ width: 10, height: 10, color: "#ffffff" }} />
                  </div>
                  <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Sections */}
          {orderedSections.filter(id => id !== "summary").map(secId => renderVeronicaSection(secId))}
        </div>
      );
    };

    // 13. Amanda Smith — Chief Information Officer (CIO)
    const renderProAmandaSmith = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const customLinks = data.personalInfo?.customLinks || [];
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&auto=format&fit=crop&q=80";

      const allSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
        ...(data.skills?.soft || []),
      ];

      const renderSquareHeader = (title: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
          <div
            style={{
              width: "15px",
              height: "15px",
              border: "1.5px solid #18181b",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText style={{ width: "9px", height: "9px", color: "#18181b" }} />
          </div>
          <span style={{ fontSize: "10.5pt", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#18181b" }}>
            {title}
          </span>
        </div>
      );

      const defaultAmandaSidebar = ["skills", "certifications", "languages", "achievements"];
      const userSidebar = cs.sidebarSections && cs.sidebarSections.length > 0 ? cs.sidebarSections : defaultAmandaSidebar;
      const sidebarSet = new Set(userSidebar);
      const orderedSections = (cs.sectionOrder && cs.sectionOrder.length > 0 ? cs.sectionOrder : defaultSections).filter(id => !hidden.has(id));

      const mainSections = orderedSections.filter(id => !sidebarSet.has(id) && id !== "summary");
      const sidebarSections = orderedSections.filter(id => sidebarSet.has(id) && id !== "summary");

      const renderAmandaSection = (secId: string, isSidebar: boolean) => {
        switch (secId) {
          case "experience":
            if (!data.experience || data.experience.length === 0) return null;
            return (
              <div key="experience">
                {renderSquareHeader("Work Experience")}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {data.experience.map((exp, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: "10pt", fontWeight: "bold", color: "#18181b" }}>
                          {renderFormattedText(exp.title || "")}
                        </span>
                        <span style={{ fontSize: "8pt", color: "#71717a" }}>{exp.date}</span>
                      </div>
                      <div style={{ fontSize: "8.5pt", fontStyle: "italic", color: "#52525b", marginBottom: "3px" }}>
                        {renderFormattedText(exp.company || "")}
                        {exp.location ? ` - ${exp.location}` : ""}
                      </div>
                      {renderBulletList(exp.bullets, isSidebar, "•", "8.5pt")}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "education":
            if (!data.education || data.education.length === 0) return null;
            return (
              <div key="education">
                {renderSquareHeader("Education")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "bold", color: "#18181b" }}>
                        {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                      </div>
                      <div style={{ fontSize: "8pt", color: "#71717a" }}>
                        {edu.school} {edu.date ? `• ${edu.date}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "projects":
            if (!data.projects || data.projects.length === 0) return null;
            return (
              <div key="projects">
                {renderSquareHeader("Key Projects")}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.projects.map((proj, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "bold", color: "#18181b" }}>
                        {proj.name} {proj.tech ? <span style={{ fontSize: "8pt", color: "#71717a" }}>({proj.tech})</span> : null}
                      </div>
                      {proj.description && <div style={{ fontSize: "8pt", color: "#52525b" }}>{proj.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "skills":
            if (allSkills.length === 0) return null;
            return (
              <div key="skills">
                {renderSquareHeader("General Skills")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 8px" }}>
                  {allSkills.map((sk, i) => (
                    <div key={i} style={{ fontSize: "8pt", color: "#3f3f46", fontWeight: 500 }}>
                      • {sk}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "certifications":
            if (!data.certifications || data.certifications.length === 0) return null;
            return (
              <div key="certifications">
                {renderSquareHeader("Certifications and Memberships")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {data.certifications.map((c, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "bold", color: "#18181b" }}>{c.name}</div>
                      <div style={{ fontSize: "7.5pt", color: "#71717a" }}>
                        {c.issuer} {c.date ? `(${c.date})` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "achievements":
            if (!data.achievements || data.achievements.length === 0) return null;
            return (
              <div key="achievements">
                {renderSquareHeader("Achievements & Honors")}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "bold", color: "#18181b" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "7.5pt", color: "#71717a" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "languages":
            if (!data.languages || data.languages.length === 0) return null;
            return (
              <div key="languages">
                {renderSquareHeader("Languages")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 8px" }}>
                  {data.languages.map((l, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "8.5pt", fontWeight: "bold", color: "#18181b" }}>{l.name}</div>
                      {l.proficiency && (
                        <div style={{ fontSize: "7.5pt", color: "#71717a" }}>{l.proficiency}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div
          ref={ref}
          style={{
            fontFamily: cs.fontFamily || "'Inter', Arial, sans-serif",
            width: pageDim.width,
            minHeight: pageDim.height,
            backgroundColor: "#ffffff",
            padding: "12mm 14mm",
            boxSizing: "border-box",
            color: "#18181b",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />

          {/* Top Header Card with Rounded Square Photo */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "8px" }}>
            <div
              style={{
                width: "80px",
                height: "92px",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid #cbd5e1",
                flexShrink: 0,
                backgroundColor: "#f1f5f9",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: nameFontSize || "24pt",
                  fontWeight: "800",
                  color: "#18181b",
                  lineHeight: "1.1",
                  margin: "0 0 2px 0",
                }}
              >
                {data.personalInfo?.fullName || "Amanda Smith"}
              </h1>
              <div
                style={{
                  fontSize: "12pt",
                  fontWeight: "600",
                  color: "#3f3f46",
                  marginBottom: "6px",
                }}
              >
                {data.personalInfo?.title || "Chief Information Officer (CIO)"}
              </div>
              {data.summary && (
                <p style={{ fontSize: "8.5pt", lineHeight: "1.45", color: "#52525b", margin: 0 }}>
                  {renderFormattedText(data.summary)}
                </p>
              )}
            </div>
          </div>

          {/* Full-Width Solid Dark Charcoal Contact Bar */}
          <div
            style={{
              backgroundColor: "#18181b",
              color: "#ffffff",
              borderRadius: "5px",
              padding: "7px 14px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4px 20px",
              margin: "8px 0 14px 0",
              fontSize: "8pt",
            }}
          >
            {email && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Mail style={{ width: "11px", height: "11px", color: "#a1a1aa" }} />
                <span>{email}</span>
              </div>
            )}
            {phone && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Phone style={{ width: "11px", height: "11px", color: "#a1a1aa" }} />
                <span>{phone}</span>
              </div>
            )}
            {location && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <MapPin style={{ width: "11px", height: "11px", color: "#a1a1aa" }} />
                <span>{location}</span>
              </div>
            )}
            {linkedin && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <LinkedinIcon style={{ width: "11px", height: "11px", color: "#a1a1aa" }} />
                <span>{linkedin.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {github && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <GithubIcon style={{ width: "11px", height: "11px", color: "#a1a1aa" }} />
                <span>{github.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {portfolio && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: "11px", height: "11px", color: "#a1a1aa" }} />
                <span>{portfolio.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {customLinks.map((cl, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: "11px", height: "11px", color: "#a1a1aa" }} />
                <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
              </div>
            ))}
          </div>

          {/* Dynamic 2-Column Body */}
          <div style={{ display: "flex", gap: "18px" }}>
            {/* Left Column (~55%) */}
            <div style={{ flex: "1 1 55%", display: "flex", flexDirection: "column", gap: "12px" }}>
              {mainSections.map(secId => renderAmandaSection(secId, false))}
            </div>

            {/* Right Column (~45%) */}
            <div style={{ flex: "1 1 45%", display: "flex", flexDirection: "column", gap: "12px" }}>
              {sidebarSections.map(secId => renderAmandaSection(secId, true))}
            </div>
          </div>
        </div>
      );
    };

    // Route to dedicated Pro template renderers if matched
    if (template.id === "pro-michelle") {
      return renderProMichelle();
    }
    if (template.id === "pro-catherine") {
      return renderProCatherine();
    }
    if (template.id === "pro-chris-flims") {
      return renderProChrisFlims();
    }
    if (template.id === "pro-will-tribian") {
      return renderProWillTribian();
    }
    if (template.id === "pro-amanda-smith") {
      return renderProAmandaSmith();
    }
    if (template.id === "pro-claire") {
      return renderProClaire();
    }
    if (template.id === "pro-jessica") {
      return renderProJessica();
    }
    if (template.id === "pro-adam") {
      return renderProAdam();
    }
    if (template.id === "pro-nick") {
      return renderProNick();
    }
    if (template.id === "pro-lisa") {
      return renderProLisa();
    }
    if (template.id === "pro-ivana") {
      return renderProIvana();
    }
    if (template.id === "pro-melissa") {
      return renderProMelissa();
    }
    if (template.id === "pro-veronica") {
      return renderProVeronica();
    }

    if (isTwoColumn) {
      // Sidebar sections can be configured by user or defaulted
      const configuredSidebar = cs.sidebarSections || [
        "skills",
        "certifications",
        "languages",
        "achievements",
      ];
      const sidebarSections = configuredSidebar.filter((id) =>
        sectionOrder.includes(id)
      );
      const mainSections = sectionOrder.filter(
        (id) => !sidebarSections.includes(id)
      );

      return (
        <div ref={ref} style={containerStyle}>
          {/* Dynamic @page CSS for PDF / print media dimensions */}
          <style
            dangerouslySetInnerHTML={{
              __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
            }}
          />
          {/* Sidebar */}
          <div style={sidebarStyle}>
            {renderHeader(true)}
            {sidebarSections.map((sectionId) => renderSection(sectionId, true))}
          </div>

          {/* Main Column */}
          <div style={mainColumnStyle}>
            {mainSections.map((sectionId) => renderSection(sectionId, false))}
          </div>
        </div>
      );
    }

    // Standard Single Column Render
    return (
      <div ref={ref} style={containerStyle}>
        {/* Dynamic @page CSS for PDF / print media dimensions */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@page { size: ${pageDim.width} ${pageDim.height}; margin: 0; }`,
          }}
        />
        {renderHeader(false)}
        {sectionOrder.map((sectionId) => renderSection(sectionId, false))}
      </div>
    );
  }
);

ResumeTemplateRenderer.displayName = "ResumeTemplateRenderer";

export default ResumeTemplateRenderer;
