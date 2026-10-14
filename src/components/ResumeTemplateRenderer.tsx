"use client";

import React from "react";
import { TemplateConfig } from "@/lib/templates";
import { renderFormattedText } from "@/lib/text-formatter";

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
