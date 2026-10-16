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
              {data.summary && (
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
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8.5pt", color: "#334155" }}>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: "12px", height: "12px", color: "#be675e", flexShrink: 0 }} />
                </div>
              )}
            </div>
          </div>

          {/* Body: 2-Column Layout */}
          <div style={{ display: "flex", gap: "24px", marginTop: "8px" }}>
            {/* Left Column (52%): Education & Work Experience */}
            <div style={{ flex: "1 1 52%", minWidth: 0 }}>
              {/* EDUCATION */}
              {data.education && data.education.length > 0 && (
                <div>
                  {renderDoubleUnderlineHeader("EDUCATION")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    {data.education.map((edu, idx) => (
                      <div key={edu.id || idx}>
                        <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a", lineHeight: 1.25 }}>
                          {edu.degree}
                        </div>
                        <div style={{ fontSize: "8.5pt", color: "#334155" }}>
                          {edu.school}
                        </div>
                        {edu.date && (
                          <div style={{ fontSize: "8pt", color: "#64748b" }}>
                            {edu.date}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WORK EXPERIENCE */}
              {data.experience && data.experience.length > 0 && (
                <div>
                  {renderDoubleUnderlineHeader("WORK EXPERIENCE")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {data.experience.map((exp, idx) => (
                      <div key={exp.id || idx}>
                        <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>
                          {exp.title}
                        </div>
                        <div style={{ fontSize: "8.5pt", color: "#334155" }}>
                          {exp.company}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "8pt",
                            color: "#64748b",
                            margin: "1px 0 3px 0",
                          }}
                        >
                          <span>{exp.date}</span>
                          <span>{exp.location}</span>
                        </div>
                        <div
                          style={{
                            fontSize: "7.5pt",
                            color: "#475569",
                            fontStyle: "italic",
                            marginBottom: "3px",
                          }}
                        >
                          Clinical Care & Patient Interaction
                        </div>
                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                            {exp.bullets.map((b, bIdx) => (
                              <li
                                key={bIdx}
                                style={{
                                  fontSize: "8.5pt",
                                  color: "#334155",
                                  lineHeight: 1.4,
                                  marginBottom: "2px",
                                }}
                              >
                                {renderFormattedText(b)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (48%): Areas of Expertise, Projects, Organizations, Certificates, Languages */}
            <div style={{ flex: "1 1 48%", minWidth: 0 }}>
              {/* AREAS OF EXPERTISE */}
              <div>
                {renderDoubleUnderlineHeader("AREAS OF EXPERTISE")}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {(allSkills.length > 0
                    ? allSkills.slice(0, 8)
                    : [
                        "Time Management",
                        "Strong Interpersonal Skills",
                        "Reception & Patient Fronting",
                        "Records Maintenance",
                        "First Aid & Patient Care",
                        "Teamwork & Collaboration",
                        "Inventory Management",
                      ]
                  ).map((skill, idx) => (
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

              {/* PERSONAL PROJECTS */}
              {data.projects && data.projects.length > 0 && (
                <div>
                  {renderDoubleUnderlineHeader("PERSONAL PROJECTS")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {data.projects.map((proj, idx) => (
                      <div key={proj.id || idx}>
                        <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>
                          {proj.name}
                        </div>
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                          <li style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4 }}>
                            {proj.description}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ORGANIZATIONS */}
              {data.achievements && data.achievements.length > 0 && (
                <div>
                  {renderDoubleUnderlineHeader("ORGANIZATIONS")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {data.achievements.map((ach, idx) => (
                      <div key={ach.id || idx}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>
                          {ach.title}
                        </div>
                        {ach.description && (
                          <div style={{ fontSize: "8pt", color: "#64748b" }}>
                            {ach.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CERTIFICATES */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
                  {renderDoubleUnderlineHeader("CERTIFICATES")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {data.certifications.map((cert, idx) => (
                      <div key={cert.id || idx}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>
                          {cert.name}
                        </div>
                        {cert.issuer && (
                          <div style={{ fontSize: "8pt", color: "#64748b" }}>
                            {cert.issuer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LANGUAGES */}
              {data.languages && data.languages.length > 0 && (
                <div>
                  {renderDoubleUnderlineHeader("LANGUAGES")}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "6px 12px",
                    }}
                  >
                    {data.languages.map((lang, idx) => (
                      <div key={lang.id || idx}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>
                          {lang.name}
                        </div>
                        <div style={{ fontSize: "7.5pt", color: "#64748b" }}>
                          {lang.proficiency}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    // 2. Catherine Barnett — 3D Character Animator
    const renderProCatherine = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;

      const techSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
      ];
      const softSkills = data.skills?.soft?.length
        ? data.skills.soft
        : [
            "Attention to Detail",
            "Collaboration",
            "Time Management",
            "Leadership",
            "Problem Solving",
          ];

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
              gap: "16px",
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
                  <span>{portfolio}</span>
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
                  <span>{linkedin}</span>
                </div>
              )}
              {data.personalInfo?.customLinks && data.personalInfo.customLinks.map((cl, i) => (
                <div key={i} style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "6px", padding: "6px 8px", display: "flex", alignItems: "center", gap: "8px", fontSize: "8pt", color: "#f1f5f9", wordBreak: "break-all" }}>
                  <Globe style={{ width: "12px", height: "12px", color: "#38bdf8", flexShrink: 0 }} />
                  <span><strong>{cl.label}:</strong> {cl.url}</span>
                </div>
              ))}
            </div>

            {/* HARD SKILLS */}
            {techSkills.length > 0 && (
              <div>
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
                    }}
                  >
                    <Layers style={{ width: "10px", height: "10px", color: "#38bdf8" }} />
                  </div>
                  <span style={{ fontSize: "9.5pt", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Hard Skills
                  </span>
                </div>
                <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.15)", marginBottom: "8px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {techSkills.map((sk, i) => (
                    <div key={i} style={{ fontSize: "8.5pt", color: "#cbd5e1", lineHeight: "1.3" }}>
                      {sk}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SOFT SKILLS */}
            {softSkills.length > 0 && (
              <div>
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
                    }}
                  >
                    <Sparkles style={{ width: "10px", height: "10px", color: "#38bdf8" }} />
                  </div>
                  <span style={{ fontSize: "9.5pt", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Soft Skills
                  </span>
                </div>
                <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.15)", marginBottom: "8px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
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

            {/* LANGUAGES */}
            {data.languages && data.languages.length > 0 && (
              <div>
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
                    }}
                  >
                    <Globe style={{ width: "10px", height: "10px", color: "#38bdf8" }} />
                  </div>
                  <span style={{ fontSize: "9.5pt", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Languages
                  </span>
                </div>
                <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.15)", marginBottom: "8px" }} />
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
            )}
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
              {data.summary && (
                <div style={{ marginTop: "4px" }}>
                  <div
                    style={{
                      fontSize: "8.5pt",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#0f172a",
                      marginBottom: "3px",
                    }}
                  >
                    Professional Summary
                  </div>
                  <p style={{ fontSize: "8.5pt", lineHeight: "1.45", color: "#334155", margin: 0 }}>
                    {renderFormattedText(data.summary)}
                  </p>
                </div>
              )}
            </div>

            {/* Work Experience */}
            {data.experience && data.experience.length > 0 && (
              <div>
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
                    }}
                  >
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#0f172a" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Work Experience
                  </span>
                </div>
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
            )}

            {/* Certificates */}
            {data.certifications && data.certifications.length > 0 && (
              <div>
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
                    }}
                  >
                    <Award style={{ width: "9px", height: "9px", color: "#0f172a" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Certificates
                  </span>
                </div>
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
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <div>
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
                    }}
                  >
                    <GraduationCap style={{ width: "9px", height: "9px", color: "#0f172a" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Education
                  </span>
                </div>
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
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid #0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FolderGit2 style={{ width: "9px", height: "9px", color: "#0f172a" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Key Projects
                  </span>
                </div>
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
            )}

            {/* Achievements */}
            {data.achievements && data.achievements.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid #0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sparkles style={{ width: "9px", height: "9px", color: "#0f172a" }} />
                  </div>
                  <span style={{ fontSize: "10.5pt", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a" }}>
                    Achievements & Honors
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {data.achievements.map((ach, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "9pt", fontWeight: "bold", color: "#0f172a" }}>{ach.title}</div>
                      {ach.description && <div style={{ fontSize: "8pt", color: "#64748b" }}>{ach.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    // 2. Chris Flims — Project Manager Remote
    const renderProChrisFlims = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;

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
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                <Flag style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                <span>Project Management</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                <BarChart3 style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                <span>Risk Analysis & Reporting</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                <Shield style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                <span>Cross-functional Governance</span>
              </div>
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
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                  <Globe style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                  <span>{portfolio}</span>
                </div>
              )}
              {location && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                  <MapPin style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                  <span>{location}</span>
                </div>
              )}
              {data.personalInfo?.customLinks && data.personalInfo.customLinks.map((cl, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "8pt", color: "#374151" }}>
                  <Globe style={{ width: "12px", height: "12px", color: "#c84b31", flexShrink: 0 }} />
                  <span><strong>{cl.label}:</strong> {cl.url}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AREAS OF EXPERTISE */}
          {allSkills.length > 0 && (
            <div>
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
          )}

          {/* WORK EXPERIENCE */}
          {data.experience && data.experience.length > 0 && (
            <div>
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
          )}

          {/* EDUCATION */}
          {data.education && data.education.length > 0 && (
            <div>
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
          )}

          {/* KEY PROJECTS */}
          {data.projects && data.projects.length > 0 && (
            <div>
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
          )}

          {/* CERTIFICATIONS */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
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
          )}

          {/* ACHIEVEMENTS */}
          {data.achievements && data.achievements.length > 0 && (
            <div>
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
          )}

          {/* LANGUAGES */}
          {data.languages && data.languages.length > 0 && (
            <div>
              {renderDiamondHeader("Languages")}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {data.languages.map((l, i) => (
                  <div key={i} style={{ fontSize: "8.5pt" }}>
                    <strong style={{ color: "#0f172a" }}>{l.name}</strong> {l.proficiency ? <span style={{ color: "#64748b" }}>({l.proficiency})</span> : null}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };

    // 3. Will Tribian — Theater & Creative Portfolio
    const renderProWillTribian = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80";

      const techSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
        ...(data.skills?.concepts || []),
      ];
      const softSkills = data.skills?.soft?.length
        ? data.skills.soft
        : ["Improvisation", "Vocal Expression", "Physicality", "Stage Presence", "Dialects"];

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

          {/* Full-Width Teal Banner */}
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
            {portfolio && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: "11px", height: "11px", color: "#ffffff" }} />
                <span>{portfolio}</span>
              </div>
            )}
            {data.personalInfo?.customLinks && data.personalInfo.customLinks.map((cl, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: "11px", height: "11px", color: "#ffffff" }} />
                <span><strong>{cl.label}:</strong> {cl.url}</span>
              </div>
            ))}
          </div>

          {/* 2-Column Lower Body */}
          <div style={{ display: "flex", gap: "18px" }}>
            {/* Left Column (~58%) */}
            <div style={{ flex: "1 1 58%", display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* WORK EXPERIENCE */}
              {data.experience && data.experience.length > 0 && (
                <div>
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
                        {renderBulletList(exp.bullets, false, "•", "8.5pt")}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WORKSHOPS & TRAINING CAMPS / PROJECTS */}
              {data.projects && data.projects.length > 0 && (
                <div>
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
              )}
            </div>

            {/* Right Column (~42%) */}
            <div style={{ flex: "1 1 42%", display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* HARD SKILLS */}
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {techSkills.map((sk, i) => (
                      <div key={i} style={{ fontSize: "8.5pt", color: "#334155" }}>
                        {sk}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SOFT SKILLS */}
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

              {/* EDUCATION */}
              {data.education && data.education.length > 0 && (
                <div>
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
              )}

              {/* LANGUAGES */}
              {data.languages && data.languages.length > 0 && (
                <div>
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
              )}

              {/* CERTIFICATIONS */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
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
              )}

              {/* ACHIEVEMENTS */}
              {data.achievements && data.achievements.length > 0 && (
                <div>
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
              )}
            </div>
          </div>
        </div>
      );
    };


    // 6. Claire Russel — Computer Science Student
    const renderProClaire = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

      const softSkills = data.skills?.soft?.length
        ? data.skills.soft
        : ["Global Thinking", "Leadership", "Creativity", "Teamwork", "Adaptability"];

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

          {/* Body: 2-Column (Left 28%, Right 72%) */}
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
                      <Globe style={{ width: 10, height: 10, color: "#ffffff" }} />
                    </div>
                    <span>{github.replace(/^https?:\/\//, "")}</span>
                  </div>
                )}
                {portfolio && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", wordBreak: "break-all" }}>
                    <div style={{ width: 16, height: 16, backgroundColor: "#4c1d95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Sparkles style={{ width: 10, height: 10, color: "#ffffff" }} />
                    </div>
                    <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  </div>
                )}
                {data.personalInfo?.customLinks && data.personalInfo.customLinks.map((cl, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px", wordBreak: "break-all" }}>
                    <div style={{ width: 16, height: 16, backgroundColor: "#4c1d95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Globe style={{ width: 10, height: 10, color: "#ffffff" }} />
                    </div>
                    <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                  </div>
                ))}
              </div>

              {/* SOFT SKILLS */}
              <div style={{ marginTop: "14px" }}>
                <div style={{ fontSize: "9.5pt", fontWeight: "800", textTransform: "uppercase", color: "#1e1b4b", borderBottom: "1.5px solid #4c1d95", paddingBottom: "2px", marginBottom: "6px" }}>
                  SOFT SKILLS
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "8.5pt", color: "#334155" }}>
                  {softSkills.map((s, idx) => (
                    <div key={idx}>{s}</div>
                  ))}
                </div>
              </div>

              {/* LANGUAGES */}
              {data.languages && data.languages.length > 0 && (
                <div style={{ marginTop: "14px" }}>
                  <div style={{ fontSize: "9.5pt", fontWeight: "800", textTransform: "uppercase", color: "#1e1b4b", borderBottom: "1.5px solid #4c1d95", paddingBottom: "2px", marginBottom: "6px" }}>
                    LANGUAGES
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {data.languages.map((l, idx) => (
                      <div key={idx}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{l.name}</div>
                        <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{l.proficiency}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INTERESTS */}
              <div style={{ marginTop: "14px" }}>
                <div style={{ fontSize: "9.5pt", fontWeight: "800", textTransform: "uppercase", color: "#1e1b4b", borderBottom: "1.5px solid #4c1d95", paddingBottom: "2px", marginBottom: "6px" }}>
                  INTERESTS
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {["Emerging Technologies", "Algorithms and Competitive Programming", "Outdoor Activities and Photography"].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        border: "1px solid #94a3b8",
                        borderRadius: "4px",
                        padding: "3px 6px",
                        fontSize: "7.5pt",
                        color: "#334155",
                        lineHeight: 1.25,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Main Column */}
            <div style={{ flex: 1 }}>
              {/* EDUCATION */}
              {data.education && data.education.length > 0 && (
                <div>
                  {renderHeaderLine("EDUCATION")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {data.education.map((edu, idx) => (
                      <div key={idx}>
                        <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                        <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                        {edu.date && <div style={{ fontSize: "8pt", color: "#64748b" }}>{edu.date}</div>}
                        {edu.bullets && edu.bullets.length > 0 && (
                          <div style={{ marginTop: "4px" }}>
                            <div style={{ fontSize: "8pt", fontWeight: "600", color: "#475569" }}>Advised Coursework & Core Focus:</div>
                            <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px", fontSize: "8pt", color: "#334155" }}>
                              {edu.bullets.map((b, bIdx) => (
                                <li key={bIdx}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VOLUNTEER / WORK EXPERIENCE */}
              {data.experience && data.experience.length > 0 && (
                <div>
                  {renderHeaderLine("VOLUNTEER & TECHNICAL EXPERIENCE")}
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
              )}

              {/* KEY PROJECTS */}
              {data.projects && data.projects.length > 0 && (
                <div>
                  {renderHeaderLine("KEY PROJECTS")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {data.projects.map((proj, idx) => (
                      <div key={idx}>
                        <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>
                          {proj.name} {proj.tech ? <span style={{ fontSize: "8pt", color: "#8da9c4" }}>({proj.tech})</span> : null}
                        </div>
                        {proj.description && <div style={{ fontSize: "8pt", color: "#334155" }}>{proj.description}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ORGANIZATIONS */}
              {data.achievements && data.achievements.length > 0 && (
                <div>
                  {renderHeaderLine("ORGANIZATIONS")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {data.achievements.map((ach, idx) => (
                      <div key={idx}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                        {ach.description && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{ach.description}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CERTIFICATES */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
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
              )}

              {/* PROJECTS */}
              {data.projects && data.projects.length > 0 && (
                <div>
                  {renderHeaderLine("PROJECTS")}
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
              )}
            </div>
          </div>
        </div>
      );
    };

    // 7. Jessica Blakely — Game Designer
    const renderProJessica = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80";

      const hardSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
      ];
      const softSkills = data.skills?.soft?.length
        ? data.skills.soft
        : ["Teamwork", "Pioneering", "Creative Writing", "Player Psychology", "Deadline Driven"];

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
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Globe style={{ width: 12, height: 12, color: "#d4af37" }} />
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <LinkedinIcon style={{ width: 12, height: 12, color: "#d4af37" }} />
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Body: 2 Columns */}
          <div style={{ padding: "8mm 16mm 14mm 16mm", display: "flex", gap: "24px" }}>
            {/* Left Column (55%): Experience & Certificates */}
            <div style={{ flex: "1 1 55%" }}>
              {data.experience && data.experience.length > 0 && (
                <div>
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
              )}

              {data.certifications && data.certifications.length > 0 && (
                <div>
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
              )}
            </div>

            {/* Right Column (45%): Skills, Education, Awards, Languages */}
            <div style={{ flex: "1 1 45%" }}>
              {/* HARD SKILLS */}
              <div>
                {renderGoldHeader("HARD SKILLS")}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {(hardSkills.length > 0
                    ? hardSkills.slice(0, 10)
                    : ["Unreal Engine", "Blueprints", "Game Systems", "Map Drafting", "Level Testing", "3D Blocking", "Level Design"]
                  ).map((s, idx) => (
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

              {/* SOFT SKILLS */}
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

              {/* EDUCATION */}
              {data.education && data.education.length > 0 && (
                <div>
                  {renderGoldHeader("EDUCATION")}
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                      <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                      {edu.date && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{edu.date}</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* AWARDS */}
              {data.achievements && data.achievements.length > 0 && (
                <div>
                  {renderGoldHeader("AWARDS")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {data.achievements.map((ach, idx) => (
                      <div key={idx}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                        {ach.description && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{ach.description}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LANGUAGES */}
              {data.languages && data.languages.length > 0 && (
                <div>
                  {renderGoldHeader("LANGUAGES")}
                  <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
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
              )}
            </div>
          </div>
        </div>
      );
    };

    // 8. Adam Stotch — Realtor
    const renderProAdam = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";

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
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
            </div>
          </div>

          {/* Full-width Summary */}
          {data.summary && (
            <p style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.45, margin: "12px 0 8px 0" }}>
              {renderFormattedText(data.summary)}
            </p>
          )}

          {/* 2 Columns */}
          <div style={{ display: "flex", gap: "24px", marginTop: "8px" }}>
            {/* Left Column (55%): Experience with Timeline Node Glyphs & Inset Brackets */}
            <div style={{ flex: "1 1 55%" }}>
              {data.experience && data.experience.length > 0 && (
                <div>
                  {renderSimpleHeader("WORK EXPERIENCE")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {data.experience.map((exp, idx) => (
                      <div key={idx} style={{ position: "relative", paddingLeft: "18px" }}>
                        {/* Circle node & vertical line */}
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

                        {/* Inset bracket container */}
                        {exp.bullets && exp.bullets.length > 0 && (
                          <div
                            style={{
                              borderLeft: "2px solid #94a3b8",
                              paddingLeft: "8px",
                              marginTop: "4px",
                            }}
                          >
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
              )}

              {/* EDUCATION */}
              {data.education && data.education.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  {renderSimpleHeader("EDUCATION")}
                  {data.education.map((edu, idx) => (
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
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                      <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                      {edu.date && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{edu.date}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column (45%): Skills Grid, Certifications, Memberships, Languages (Dots), Interests */}
            <div style={{ flex: "1 1 45%" }}>
              {/* SKILLS */}
              <div>
                {renderSimpleHeader("SKILLS")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "8pt", color: "#334155" }}>
                  {[
                    "Market & Price Analysis", "Property Management",
                    "Property Manager Software", "MLS Database",
                    "Negotiation", "Written & Oral Comm.",
                    "Organization", "Networking"
                  ].map((s, idx) => (
                    <div key={idx} style={{ padding: "2px 0" }}>{s}</div>
                  ))}
                </div>
              </div>

              {/* CERTIFICATES */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
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
              )}

              {/* MEMBERSHIPS */}
              {data.achievements && data.achievements.length > 0 && (
                <div>
                  {renderSimpleHeader("MEMBERSHIPS")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {data.achievements.map((ach, idx) => (
                      <div key={idx}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{ach.title}</div>
                        {ach.description && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{ach.description}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LANGUAGES: Dot Rating Matrix */}
              {data.languages && data.languages.length > 0 && (
                <div>
                  {renderSimpleHeader("LANGUAGES")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {data.languages.map((l, idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "8.5pt", color: "#0f172a", fontWeight: "600" }}>{l.name}</span>
                        <div style={{ display: "flex", gap: "4px" }}>
                          {[1, 2, 3, 4, 5].map((dot) => {
                            const isFilled = dot <= (l.name === "English" || l.name === "Spanish" ? 5 : l.name === "French" ? 4 : 3);
                            return (
                              <div
                                key={dot}
                                style={{
                                  width: "7px",
                                  height: "7px",
                                  borderRadius: "50%",
                                  backgroundColor: isFilled ? "#475569" : "#cbd5e1",
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INTERESTS & HOBBIES */}
              <div style={{ marginTop: "12px" }}>
                {renderSimpleHeader("INTERESTS & HOBBIES")}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {["Photography", "Community Involvement", "Learning Languages", "Blogging"].map((item, idx) => (
                    <span
                      key={idx}
                      style={{
                        border: "1px solid #94a3b8",
                        borderRadius: "12px",
                        padding: "3px 8px",
                        fontSize: "7.5pt",
                        color: "#334155",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    // 9. Nick Koe — Event Photographer
    const renderProNick = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80";

      const hardSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
      ];
      const softSkills = data.skills?.soft?.length
        ? data.skills.soft
        : ["Creativity", "Attention to Detail", "Adaptability"];

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
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#4a6b82" }} />
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{linkedin.replace(/^https?:\/\//, "")}</span>
                  <LinkedinIcon style={{ width: 12, height: 12, color: "#4a6b82" }} />
                </div>
              )}
            </div>
          </div>

          <div style={{ borderBottom: "1px solid #cbd5e1", margin: "12px 0 10px 8px" }} />

          {/* 2-Column Body */}
          <div style={{ display: "flex", gap: "24px", paddingLeft: "8px" }}>
            {/* Left Column (55%) */}
            <div style={{ flex: "1 1 55%" }}>
              {data.experience && data.experience.length > 0 && (
                <div>
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
              )}

              {data.education && data.education.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  {renderNickHeader("EDUCATION")}
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                      <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                      {edu.date && <div style={{ fontSize: "8pt", color: "#e06d53" }}>{edu.date}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column (45%) */}
            <div style={{ flex: "1 1 45%" }}>
              {/* HARD SKILLS */}
              <div>
                {renderNickHeader("HARD SKILLS")}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {(hardSkills.length > 0
                    ? hardSkills.slice(0, 9)
                    : ["Composition", "Lighting", "Photo Editing", "Color Correction", "Candid Photography", "Adobe Photoshop", "Adobe Lightroom", "Capture One Pro"]
                  ).map((s, idx) => (
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

              {/* SOFT SKILLS */}
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

              {/* PORTFOLIO / PROJECTS */}
              {data.projects && data.projects.length > 0 && (
                <div>
                  {renderNickHeader("PORTFOLIO")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {data.projects.map((p, idx) => (
                      <div key={idx}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{p.name}</div>
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "14px" }}>
                          <li style={{ fontSize: "8pt", color: "#334155", lineHeight: 1.35 }}>{p.description}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CERTIFICATES */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
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
              )}

              {/* ACHIEVEMENTS */}
              {data.achievements && data.achievements.length > 0 && (
                <div>
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
              )}

              {/* LANGUAGES */}
              {data.languages && data.languages.length > 0 && (
                <div>
                  {renderNickHeader("LANGUAGES")}
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontSize: "8pt" }}>
                    {data.languages.map((l, idx) => (
                      <div key={idx}>
                        <strong style={{ color: "#0f172a" }}>{l.name}</strong> {l.proficiency ? <span style={{ color: "#64748b" }}>({l.proficiency})</span> : null}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    // 10. Lisa Neumann — Mechanical Engineer
    const renderProLisa = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const linkedin = data.personalInfo?.linkedin;

      const softSkills = data.skills?.soft?.length
        ? data.skills.soft
        : ["Time Management", "Mathematics", "Technical Documentation", "Leadership", "Communication", "Project Management"];

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
          </div>

          {/* 2-Column Body */}
          <div style={{ display: "flex", gap: "24px" }}>
            {/* Left Column (55%): Experience & Education */}
            <div style={{ flex: "1 1 55%" }}>
              {data.experience && data.experience.length > 0 && (
                <div>
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
              )}

              {data.education && data.education.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  {renderBlueHeader("EDUCATION")}
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                      <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                      {edu.date && <div style={{ fontSize: "8pt", color: "#64748b" }}>{edu.date}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column (45%): Technical Skills, General Skills, Certifications, Languages */}
            <div style={{ flex: "1 1 45%" }}>
              {/* TECHNICAL SKILLS */}
              <div>
                {renderBlueHeader("TECHNICAL SKILLS")}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "8pt" }}>
                  <div>
                    <div style={{ fontWeight: "700", color: "#0f172a" }}>Computer-aided Design</div>
                    <div style={{ color: "#475569" }}>Autodesk Revit, BIM, Energy Modeling Programs, AutoCAD</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", color: "#0f172a" }}>Computing</div>
                    <div style={{ color: "#475569" }}>MS Office Advanced, Intermediate Python & MATLAB</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", color: "#0f172a" }}>Legal & Codes</div>
                    <div style={{ color: "#475569" }}>City of Philadelphia Building Codes, ASHRAE Standards</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", color: "#0f172a" }}>Project Management</div>
                    <div style={{ color: "#475569" }}>Scrum, Agile Methodology, Master Tech, Trello</div>
                  </div>
                </div>
              </div>

              {/* GENERAL SKILLS */}
              <div style={{ marginTop: "12px" }}>
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

              {/* CERTIFICATES */}
              {data.certifications && data.certifications.length > 0 && (
                <div style={{ marginTop: "12px" }}>
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
              )}

              {/* ACHIEVEMENTS */}
              {data.achievements && data.achievements.length > 0 && (
                <div style={{ marginTop: "12px" }}>
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
              )}

              {/* LANGUAGES */}
              {data.languages && data.languages.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  {renderBlueHeader("LANGUAGES")}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {data.languages.map((l, idx) => (
                      <div key={idx}>
                        <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#0f172a" }}>{l.name}</div>
                        <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{l.proficiency}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };


    // 11. Ivana Johnson — HR Professional
    const renderProIvana = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;

      const hardSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
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
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#93c5fd" }} />
                </div>
              )}
            </div>
          </div>

          {/* 2-Column Body */}
          <div style={{ display: "flex", gap: "24px" }}>
            {/* Left Column (55%): Work Experience */}
            <div style={{ flex: "1 1 55%" }}>
              {data.experience && data.experience.length > 0 && (
                <div>
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
              )}
            </div>

            {/* Right Column (45%): Skills, Courses, Certificates, Education, Languages */}
            <div style={{ flex: "1 1 45%" }}>
              {/* SKILLS & COMPETENCIES */}
              <div>
                {renderIvanaHeader("SKILLS & COMPETENCIES", <Sparkles style={{ width: 12, height: 12, color: "#ffffff" }} />)}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {(hardSkills.length > 0
                    ? hardSkills.slice(0, 10)
                    : ["HRIS", "Intake Analysis", "Onboarding", "Skill Coaching", "Programs Evaluation", "SAP HR", "Data Analysis", "Labor Law Compliance"]
                  ).map((s, idx) => (
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

              {/* COURSES & TRAINING / ACHIEVEMENTS */}
              {data.achievements && data.achievements.length > 0 && (
                <div>
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
              )}

              {/* CERTIFICATES */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
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
              )}

              {/* EDUCATION */}
              {data.education && data.education.length > 0 && (
                <div>
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
              )}

              {/* LANGUAGES */}
              {data.languages && data.languages.length > 0 && (
                <div>
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
              )}
            </div>
          </div>
        </div>
      );
    };

    // 12. Melissa Ware — Copywriter
    const renderProMelissa = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const photoUrl =
        data.personalInfo?.photoUrl ||
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80";

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
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                  <Globe style={{ width: 12, height: 12, color: "#0f172a" }} />
                </div>
              )}
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

          {/* 2-Column Body */}
          <div style={{ display: "flex", gap: "22px" }}>
            {/* Left Column (52%): Work Experience & Education with Timeline Rule */}
            <div style={{ flex: "1 1 52%" }}>
              {data.experience && data.experience.length > 0 && (
                <div>
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
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "7.5pt", color: "#64748b", margin: "1px 0" }}>
                          <span>{exp.date}</span>
                          <span style={{ color: "#d4af37", fontWeight: "700" }}>2 Achievements</span>
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
              )}

              {data.education && data.education.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  {renderMelissaHeader("EDUCATION")}
                  {data.education.map((edu, idx) => (
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
                      <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                      <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                      {edu.date && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{edu.date}</div>}
                    </div>
                  ))}
                </div>
              )}
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
              {/* GENERAL SKILLS */}
              <div>
                {renderMelissaHeader("GENERAL SKILLS")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", fontSize: "8pt", color: "#334155" }}>
                  {[
                    "Copywriting", "Establishing Tone",
                    "Identifying Audience", "WordPress",
                    "SEO", "Digital Marketing",
                    "Attention to Detail", "Time-management",
                    "Creative Writing", "Editing"
                  ].map((s, idx) => (
                    <div key={idx} style={{ padding: "1px 0" }}>{s}</div>
                  ))}
                </div>
              </div>

              {/* PERSONAL PROJECTS */}
              {data.projects && data.projects.length > 0 && (
                <div>
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
              )}

              {/* CERTIFICATES */}
              {data.certifications && data.certifications.length > 0 && (
                <div style={{ marginTop: "12px" }}>
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
              )}

              {/* ACHIEVEMENTS */}
              {data.achievements && data.achievements.length > 0 && (
                <div style={{ marginTop: "12px" }}>
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
              )}

              {/* LANGUAGES: Radial Circular Gauge Meters */}
              {data.languages && data.languages.length > 0 && (
                <div>
                  {renderMelissaHeader("LANGUAGES")}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px" }}>
                    {data.languages.map((l, idx) => {
                      const percent = l.name === "English" || l.name === "Spanish" ? 100 : l.name === "German" ? 65 : 45;
                      const strokeDash = 2 * Math.PI * 10;
                      const strokeOffset = strokeDash - (percent / 100) * strokeDash;

                      return (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
                            <circle cx="12" cy="12" r="10" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="#0f172a"
                              strokeWidth="2.5"
                              fill="none"
                              strokeDasharray={strokeDash}
                              strokeDashoffset={strokeOffset}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div>
                            <div style={{ fontSize: "8pt", fontWeight: "700", color: "#0f172a" }}>{l.name}</div>
                            <div style={{ fontSize: "7pt", color: "#64748b" }}>{l.proficiency}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* INTERESTS */}
              <div style={{ marginTop: "12px" }}>
                {renderMelissaHeader("INTERESTS")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", fontSize: "7.5pt", color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Sparkles style={{ width: 11, height: 11, color: "#d4af37" }} />
                    <span>Renewable Energy</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Layers style={{ width: 11, height: 11, color: "#d4af37" }} />
                    <span>Calligraphy</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Globe style={{ width: 11, height: 11, color: "#d4af37" }} />
                    <span>Gardening</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Compass style={{ width: 11, height: 11, color: "#d4af37" }} />
                    <span>Astronomy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    // 13. Veronica Cook — AWS Certified DevOps Engineer
    const renderProVeronica = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
      const linkedin = data.personalInfo?.linkedin;
      const github = data.personalInfo?.github;

      const techSkills = [
        ...(data.skills?.technical || []),
        ...(data.skills?.tools || []),
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
                    <Globe style={{ width: 10, height: 10, color: "#ffffff" }} />
                  </div>
                  <span>{github.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {portfolio && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", wordBreak: "break-all" }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Sparkles style={{ width: 10, height: 10, color: "#ffffff" }} />
                  </div>
                  <span>{portfolio.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {data.personalInfo?.customLinks && data.personalInfo.customLinks.map((cl, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", wordBreak: "break-all" }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Globe style={{ width: 10, height: 10, color: "#ffffff" }} />
                  </div>
                  <span><strong>{cl.label}:</strong> {cl.url.replace(/^https?:\/\//, "")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 1. TECHNICAL SKILLS: Full-width blue-gray pill badges */}
          <div>
            {renderVeronicaHeader("TECHNICAL SKILLS", <Cpu style={{ width: 12, height: 12, color: "#ffffff" }} />)}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {(techSkills.length > 0
                ? techSkills.slice(0, 14)
                : ["Python", "CI/CD", "Deployment", "Programming", "Linux/BASH", "Docker/Swarm", "Kubernetes", "Jenkins", "Terraform / IaC", "Cloud Infrastructure", "GCP", "AWS", "Scrum", "Agile"]
              ).map((s, idx) => (
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

          {/* 2. WORK EXPERIENCE: Full-width with square terracotta bullet markers */}
          {data.experience && data.experience.length > 0 && (
            <div>
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
          )}

          {/* 3. EDUCATION */}
          {data.education && data.education.length > 0 && (
            <div>
              {renderVeronicaHeader("EDUCATION", <GraduationCap style={{ width: 12, height: 12, color: "#ffffff" }} />)}
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#0f172a" }}>{edu.degree}</div>
                  <div style={{ fontSize: "8.5pt", color: "#334155" }}>{edu.school}</div>
                  {edu.date && <div style={{ fontSize: "7.5pt", color: "#64748b" }}>{edu.date}</div>}
                </div>
              ))}
            </div>
          )}

          {/* 4. PROJECTS */}
          {data.projects && data.projects.length > 0 && (
            <div>
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
          )}

          {/* 5. CERTIFICATIONS */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
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
          )}

          {/* 6. ACHIEVEMENTS */}
          {data.achievements && data.achievements.length > 0 && (
            <div>
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
          )}

          {/* 7. LANGUAGES */}
          {data.languages && data.languages.length > 0 && (
            <div>
              {renderVeronicaHeader("LANGUAGES", <Globe style={{ width: 12, height: 12, color: "#ffffff" }} />)}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {data.languages.map((l, idx) => (
                  <div key={idx} style={{ fontSize: "8.5pt" }}>
                    <strong style={{ color: "#0f172a" }}>{l.name}</strong> {l.proficiency ? <span style={{ color: "#64748b" }}>({l.proficiency})</span> : null}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };

    // 4. Amanda Smith — Chief Information Officer (CIO)
    const renderProAmandaSmith = () => {
      const email = data.personalInfo?.email;
      const phone = data.personalInfo?.phone;
      const location = data.personalInfo?.location;
      const portfolio = data.personalInfo?.portfolio;
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
            {portfolio && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: "11px", height: "11px", color: "#a1a1aa" }} />
                <span>{portfolio}</span>
              </div>
            )}
            {data.personalInfo?.customLinks && data.personalInfo.customLinks.map((cl, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: "11px", height: "11px", color: "#a1a1aa" }} />
                <span><strong>{cl.label}:</strong> {cl.url}</span>
              </div>
            ))}
          </div>

          {/* 2-Column Body */}
          <div style={{ display: "flex", gap: "18px" }}>
            {/* Left Column (~55%) */}
            <div style={{ flex: "1 1 55%", display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* WORK EXPERIENCE */}
              {data.experience && data.experience.length > 0 && (
                <div>
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
                        {renderBulletList(exp.bullets, false, "•", "8.5pt")}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EDUCATION */}
              {data.education && data.education.length > 0 && (
                <div>
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
              )}

              {/* PROJECTS */}
              {data.projects && data.projects.length > 0 && (
                <div>
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
              )}
            </div>

            {/* Right Column (~45%) */}
            <div style={{ flex: "1 1 45%", display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* GENERAL SKILLS in 2-Columns */}
              {allSkills.length > 0 && (
                <div>
                  {renderSquareHeader("General Skills")}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 8px" }}>
                    {allSkills.map((sk, i) => (
                      <div key={i} style={{ fontSize: "8pt", color: "#3f3f46", fontWeight: 500 }}>
                        {sk}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CERTIFICATIONS AND MEMBERSHIPS */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
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
              )}

              {/* ACHIEVEMENTS */}
              {data.achievements && data.achievements.length > 0 && (
                <div>
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
              )}

              {/* LANGUAGES */}
              {data.languages && data.languages.length > 0 && (
                <div>
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
              )}

              {/* INTERESTS */}
              <div>
                {renderSquareHeader("Interests")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "8pt", color: "#3f3f46" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Cpu style={{ width: "11px", height: "11px", color: "#18181b" }} />
                    <span>AI / Deep Tech</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Compass style={{ width: "11px", height: "11px", color: "#18181b" }} />
                    <span>Chess & Strategy</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Sparkles style={{ width: "11px", height: "11px", color: "#18181b" }} />
                    <span>Hiking & Outdoors</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Layers style={{ width: "11px", height: "11px", color: "#18181b" }} />
                    <span>Renewable Energy</span>
                  </div>
                </div>
              </div>
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
