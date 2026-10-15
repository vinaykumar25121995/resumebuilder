"use client";

import React from "react";
import { TemplateConfig } from "@/lib/templates";
import { renderFormattedText } from "@/lib/text-formatter";
import {
  Mail,
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

    const contactLine = [
      data.personalInfo?.location,
      data.personalInfo?.phone,
      data.personalInfo?.email,
      data.personalInfo?.linkedin,
      data.personalInfo?.github,
      data.personalInfo?.portfolio,
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

    // 1. Catherine Barnett — 3D Character Animator
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
            </div>
          </div>
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
