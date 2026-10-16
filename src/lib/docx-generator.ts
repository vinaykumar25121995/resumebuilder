import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  PageOrientation,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ImageRun,
} from "docx";
import { ResumeData, getPageDimensions } from "@/components/ResumeTemplateRenderer";
import { repairFormattingTags, TEXT_COLORS } from "@/lib/text-formatter";

export const TEMPLATE_DEFAULT_SIDEBARS: Record<string, string[]> = {
  "pro-michelle": ["skills", "projects", "achievements", "certifications", "languages"],
  "pro-catherine": ["skills", "languages", "certifications"],
  "pro-will-tribian": ["skills", "education", "languages", "certifications", "achievements"],
  "pro-amanda-smith": ["skills", "certifications", "languages", "achievements"],
  "pro-claire": ["skills", "languages", "certifications", "achievements"],
  "pro-jessica": ["skills", "education", "languages", "achievements"],
  "pro-adam": ["skills", "certifications", "languages", "achievements"],
  "pro-nick": ["skills", "certifications", "languages", "achievements"],
  "pro-lisa": ["skills", "certifications", "languages", "achievements"],
  "pro-ivana": ["skills", "certifications", "education", "languages", "achievements"],
  "pro-melissa": ["skills", "projects", "certifications", "languages", "achievements"],
  "ats-two-column-blue": ["skills", "certifications", "languages", "achievements"],
  "ats-two-column-dark": ["skills", "certifications", "languages", "achievements"],
  "ats-two-column-cream": ["skills", "certifications", "languages", "achievements"],
  "ats-photo-sidebar": ["skills", "certifications", "languages", "achievements"],
};

/**
 * Strips leading bullets, hyphens, and whitespace to prevent double bullets.
 */
function cleanBulletText(text: string | undefined): string {
  if (!text) return "";
  return text.replace(/^[\s•●\-–—›*]+\s*/, "").trim();
}

/**
 * Safely decodes base64 or fetches HTTP images into a Uint8Array for Word ImageRun.
 */
async function resolveImageBytes(urlOrData: string | undefined): Promise<Uint8Array | null> {
  if (!urlOrData) return null;
  try {
    if (urlOrData.startsWith("data:")) {
      const base64Index = urlOrData.indexOf(";base64,");
      if (base64Index !== -1) {
        const base64Str = urlOrData.slice(base64Index + 8);
        if (typeof window !== "undefined" && typeof window.atob === "function") {
          const binaryString = window.atob(base64Str);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          return bytes;
        } else if (typeof Buffer !== "undefined") {
          return Uint8Array.from(Buffer.from(base64Str, "base64"));
        }
      }
    } else if (urlOrData.startsWith("http://") || urlOrData.startsWith("https://")) {
      const res = await fetch(urlOrData);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        return new Uint8Array(buf);
      }
    }
  } catch (err) {
    console.warn("Could not load photo for DOCX:", err);
  }
  return null;
}

/**
 * Generates an ATS-compliant, template-faithful DOCX document from ResumeData.
 * Respects 2-column layouts, template brand colors, double borders, skill pills,
 * profile photos, custom contact matrix, and rich-text formatting tags.
 */
export async function generateResumeDocxBlob(
  data: ResumeData,
  template?: any
): Promise<Blob> {
  const children: (Paragraph | Table)[] = [];
  const cs = data.customStyles || {};
  const tStyle = template?.style || {};

  // Color resolutions (stripping '#' so Word receives valid hex strings)
  const nameColorHex = (
    (cs as any).nameColor ||
    tStyle.nameColor ||
    template?.nameColor ||
    tStyle.accentColor ||
    template?.accentColor ||
    "111827"
  ).replace("#", "");

  const headingColorHex = (
    cs.headingColor ||
    tStyle.headingColor ||
    template?.headingColor ||
    tStyle.accentColor ||
    template?.accentColor ||
    "111827"
  ).replace("#", "");

  const accentHex = (
    cs.accentColor ||
    tStyle.accentColor ||
    template?.accentColor ||
    tStyle.primaryColor ||
    template?.primaryColor ||
    "2563EB"
  ).replace("#", "");

  const borderStyleStr = (
    (cs as any).borderStyle ||
    tStyle.borderStyle ||
    template?.borderStyle ||
    "1px solid #e2e8f0"
  ).toLowerCase();

  const isDoubleBorder = borderStyleStr.includes("double");
  const showDividers =
    cs.showDividers !== undefined
      ? cs.showDividers
      : tStyle.showDividers !== undefined
      ? tStyle.showDividers
      : true;

  const bulletChar =
    cs.bulletChar ||
    tStyle.bulletChar ||
    template?.bulletChar ||
    "•";

  const rawFont = (cs.fontFamily || tStyle.fontFamily || template?.fontFamily || "").toLowerCase();
  const fontName =
    rawFont.includes("serif") ||
    rawFont.includes("garamond") ||
    rawFont.includes("merriweather") ||
    rawFont.includes("times")
      ? "Georgia"
      : rawFont.includes("mono")
      ? "Consolas"
      : "Calibri";

  // Layout resolution
  const templateId = template?.id || "";
  const isMichelle = templateId === "pro-michelle";

  const layoutType =
    cs.layoutType ||
    tStyle.layoutType ||
    template?.layoutType ||
    (isMichelle ? "two-column-right-sidebar" : "single-column");

  const isTwoColumn =
    layoutType === "two-column-right-sidebar" ||
    layoutType === "two-column-left-sidebar";

  const isRightSidebar = layoutType === "two-column-right-sidebar";

  const sidebarBgHex = (
    cs.sidebarBgColor ||
    tStyle.sidebarBgColor ||
    template?.sidebarBgColor ||
    ""
  ).replace("#", "");

  const sidebarTextHex = (
    cs.sidebarTextColor ||
    tStyle.sidebarTextColor ||
    template?.sidebarTextColor ||
    "1F2937"
  ).replace("#", "");

  // Font sizes in half-points
  const sfs = cs.sectionFontSizes || {};
  const lfs = cs.lineFontSizes || {};
  const nameHalfPt = Math.round((sfs.name || (isMichelle ? 24 : 18)) * 2);
  const contactHalfPt = Math.round((sfs.contact || 9) * 2);
  const headingHalfPt = Math.round((sfs.sectionHeadings || (isMichelle ? 10.5 : 12)) * 2);
  const getSecHalfPt = (secId: string, fallbackPt = 10) =>
    Math.round(((sfs as any)[secId] || fallbackPt) * 2);

  const getLineHalfPt = (
    rowType: string,
    itemOverridePt?: number,
    fallbackHalfPt: number = 20
  ): number => {
    if (itemOverridePt !== undefined && itemOverridePt > 0) {
      return Math.round(itemOverridePt * 2);
    }
    if ((lfs as any)[rowType] !== undefined && (lfs as any)[rowType] > 0) {
      return Math.round((lfs as any)[rowType] * 2);
    }
    return fallbackHalfPt;
  };

  // Helper for section headings with double or single border
  const createSectionHeading = (title: string, isSidebar: boolean = false) => {
    const isDouble = isDoubleBorder;
    const headingColor = isSidebar && sidebarBgHex ? sidebarTextHex : headingColorHex;
    const borderBottom = showDividers
      ? {
          color: accentHex,
          space: 4,
          style: isDouble ? BorderStyle.DOUBLE : BorderStyle.SINGLE,
          size: isDouble ? 12 : 6,
        }
      : undefined;

    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: isSidebar ? 160 : 200, after: 80 },
      border: borderBottom ? { bottom: borderBottom } : undefined,
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: headingHalfPt,
          color: headingColor,
          font: fontName,
        }),
      ],
    });
  };

  // Helper to parse formatting (bold, underline, highlight, color, size) into Word TextRuns
  const createFormattedRuns = (
    text: string | undefined,
    baseOptions: {
      font: string;
      size: number;
      color?: string;
      bold?: boolean;
      italics?: boolean;
    }
  ): TextRun[] => {
    if (!text) return [];
    const cleanText = repairFormattingTags(text);
    if (
      !cleanText.includes("**") &&
      !cleanText.includes("==") &&
      !cleanText.includes("<u>") &&
      !cleanText.includes("<color:") &&
      !cleanText.includes("<size:")
    ) {
      return [new TextRun({ text: cleanText, ...baseOptions })];
    }

    const tokenRegex =
      /(\*{2,}[\s\S]+?\*{2,}|==(?:[a-zA-Z0-9#]+:)?[^=]+?==|<u>[\s\S]*?<\/u>|<color:[^>]+>[\s\S]*?<\/color>|<size:[^>]+>[\s\S]*?<\/size>)/g;
    const parts = cleanText.split(tokenRegex);
    const runs: TextRun[] = [];

    parts.forEach((part) => {
      if (!part) return;

      if (part.startsWith("**") && part.endsWith("**")) {
        runs.push(
          new TextRun({
            text: part.replace(/^\*+|\*+$/g, ""),
            ...baseOptions,
            bold: true,
          })
        );
      } else if (part.startsWith("<u>") && part.endsWith("</u>")) {
        runs.push(
          new TextRun({
            text: part.slice(3, -4),
            ...baseOptions,
            underline: {},
          })
        );
      } else if (part.startsWith("==") && part.endsWith("==")) {
        const inner = part.slice(2, -2);
        let colorKey = "yellow";
        let content = inner;
        if (inner.includes(":")) {
          const colon = inner.indexOf(":");
          colorKey = inner.slice(0, colon);
          content = inner.slice(colon + 1);
        }
        const docxHighlight =
          colorKey === "green"
            ? "green"
            : colorKey === "blue"
            ? "cyan"
            : colorKey === "purple"
            ? "magenta"
            : colorKey === "coral"
            ? "red"
            : colorKey === "white"
            ? undefined
            : "yellow";
        runs.push(
          new TextRun({
            text: content,
            ...baseOptions,
            highlight: docxHighlight as any,
          })
        );
      } else if (part.startsWith("<color:") && part.endsWith("</color>")) {
        const closing = part.indexOf(">");
        const colorVal = part.slice(7, closing);
        const content = part.slice(closing + 1, -8);
        const resolvedHex = (TEXT_COLORS[colorVal]?.hex || colorVal).replace("#", "");
        runs.push(
          new TextRun({
            text: content,
            ...baseOptions,
            color: resolvedHex,
            bold: true,
          })
        );
      } else if (part.startsWith("<size:") && part.endsWith("</size>")) {
        const closing = part.indexOf(">");
        const sizeStr = part.slice(6, closing);
        const content = part.slice(closing + 1, -7);
        const ptVal = parseFloat(sizeStr.replace("pt", ""));
        runs.push(
          new TextRun({
            text: content,
            ...baseOptions,
            size: !isNaN(ptVal) && ptVal > 0 ? Math.round(ptVal * 2) : baseOptions.size,
          })
        );
      } else {
        runs.push(new TextRun({ text: part, ...baseOptions }));
      }
    });

    return runs.length > 0 ? runs : [new TextRun({ text, ...baseOptions })];
  };

  // Profile data extraction
  const fullName = data.personalInfo?.fullName || "Your Name";
  const title = data.personalInfo?.title || "";
  const email = data.personalInfo?.email || "";
  const phone = data.personalInfo?.phone || "";
  const location = data.personalInfo?.location || "";
  const linkedin = data.personalInfo?.linkedin || "";
  const github = data.personalInfo?.github || "";
  const portfolio = data.personalInfo?.portfolio || "";
  const customLinks = data.personalInfo?.customLinks || [];

  const contactLineHalfPt = getLineHalfPt(
    "contactDetails",
    data.personalInfo?.contactFontSize,
    contactHalfPt
  );

  // Load photo if available
  const photoUrl =
    data.personalInfo?.photoUrl ||
    (isMichelle && !data.personalInfo?.photoUrl
      ? "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"
      : undefined);
  const photoBytes = await resolveImageBytes(photoUrl);

  // ─── 1. Top Header Construction ───────────────────────────────────────────
  if (isMichelle) {
    // 3-Column Top Header for Michelle Dhamar Healthcare Layout
    const leftHeaderParas: Paragraph[] = [
      new Paragraph({
        spacing: { before: 0, after: 30 },
        children: [
          new TextRun({
            text: fullName,
            bold: true,
            size: nameHalfPt,
            font: fontName,
            color: nameColorHex,
          }),
        ],
      }),
    ];

    if (title) {
      leftHeaderParas.push(
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [
            new TextRun({
              text: title,
              size: getLineHalfPt("jobTitle", data.personalInfo?.titleFontSize, 21),
              font: fontName,
              color: "8C6B67",
              bold: true,
            }),
          ],
        })
      );
    }

    if (data.summary && !cs.hiddenSections?.includes("summary")) {
      leftHeaderParas.push(
        new Paragraph({
          spacing: { before: 20, after: 40 },
          children: createFormattedRuns(data.summary, {
            size: Math.max(16, getSecHalfPt("summary", 9.5) - 1),
            font: fontName,
            color: "334155",
          }),
        })
      );
    }

    const contactRunsList: Paragraph[] = [];
    const addContactItem = (text: string, iconChar: string) => {
      contactRunsList.push(
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { before: 8, after: 8 },
          children: [
            new TextRun({
              text,
              size: contactLineHalfPt,
              font: fontName,
              color: "334155",
            }),
            new TextRun({
              text: `  ${iconChar}`,
              size: contactLineHalfPt,
              font: fontName,
              color: accentHex,
              bold: true,
            }),
          ],
        })
      );
    };

    if (email) addContactItem(email, "✉");
    if (phone) addContactItem(phone, "📞");
    if (location) addContactItem(location, "📍");
    if (linkedin) addContactItem(linkedin.replace(/^https?:\/\//, ""), "🔗");
    if (github) addContactItem(github.replace(/^https?:\/\//, ""), "💻");
    if (portfolio) addContactItem(portfolio.replace(/^https?:\/\//, ""), "🌐");
    customLinks.forEach((cl) => {
      addContactItem(`${cl.label}: ${cl.url.replace(/^https?:\/\//, "")}`, "🌐");
    });

    const headerCells: TableCell[] = [];
    if (photoBytes) {
      headerCells.push(
        new TableCell({
          width: { size: 48, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
          },
          children: leftHeaderParas,
        }),
        new TableCell({
          width: { size: 14, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new ImageRun({
                  data: photoBytes,
                  transformation: { width: 75, height: 95 },
                  type: "png",
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: { size: 38, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
          },
          children: contactRunsList.length > 0 ? contactRunsList : [new Paragraph("")],
        })
      );
    } else {
      headerCells.push(
        new TableCell({
          width: { size: 58, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
          },
          children: leftHeaderParas,
        }),
        new TableCell({
          width: { size: 42, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
          },
          children: contactRunsList.length > 0 ? contactRunsList : [new Paragraph("")],
        })
      );
    }

    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
        },
        rows: [new TableRow({ children: headerCells })],
      })
    );
  } else {
    // Standard / Centered / Two-column General Header
    const alignment =
      cs.nameAlign === "center"
        ? AlignmentType.CENTER
        : cs.nameAlign === "right"
        ? AlignmentType.RIGHT
        : AlignmentType.LEFT;

    children.push(
      new Paragraph({
        alignment,
        spacing: { before: 0, after: 40 },
        children: [
          new TextRun({
            text: fullName,
            bold: true,
            size: nameHalfPt,
            font: fontName,
            color: nameColorHex,
          }),
        ],
      })
    );

    if (title) {
      const titleHalfPt = getLineHalfPt(
        "jobTitle",
        data.personalInfo?.titleFontSize,
        Math.max(20, Math.round(nameHalfPt * 0.55))
      );
      children.push(
        new Paragraph({
          alignment,
          spacing: { before: 0, after: 40 },
          children: [
            new TextRun({
              text: title,
              size: titleHalfPt,
              font: fontName,
              color: accentHex,
              bold: true,
            }),
          ],
        })
      );
    }

    const contactParts = [
      location,
      phone,
      email,
      linkedin,
      github,
      portfolio,
      ...customLinks.map((cl) => `${cl.label}: ${cl.url}`),
    ].filter(Boolean);

    if (contactParts.length > 0) {
      children.push(
        new Paragraph({
          alignment,
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: contactParts.join("  |  "),
              size: contactLineHalfPt,
              font: fontName,
              color: "4B5563",
            }),
          ],
        })
      );
    }
  }

  // ─── Section Builders ─────────────────────────────────────────────────────

  const buildSummaryParagraphs = (isSidebar: boolean): Paragraph[] => {
    if (!data.summary) return [];
    const secHalfPt = getSecHalfPt("summary", 10);
    const result: Paragraph[] = [createSectionHeading("Professional Summary", isSidebar)];
    result.push(
      new Paragraph({
        spacing: { before: 40, after: 100 },
        children: createFormattedRuns(data.summary, {
          size: secHalfPt,
          font: fontName,
          color: isSidebar && sidebarBgHex ? sidebarTextHex : "334155",
        }),
      })
    );
    return result;
  };

  const buildSkillsParagraphs = (isSidebar: boolean): Paragraph[] => {
    const allSkills = [
      ...(data.skills?.technical || []),
      ...(data.skills?.tools || []),
      ...(data.skills?.concepts || []),
      ...(data.skills?.soft || []),
    ];
    if (allSkills.length === 0) return [];
    const secHalfPt = getSecHalfPt("skills", 10);
    const skillItemHalfPt = getLineHalfPt("skillItems", undefined, secHalfPt);
    const headingTitle = isMichelle ? "Areas of Expertise" : "Technical & Core Skills";
    const result: Paragraph[] = [createSectionHeading(headingTitle, isSidebar)];

    const isPillStyle =
      isMichelle ||
      templateId === "pro-catherine" ||
      template?.style?.description?.includes("pill") ||
      false;

    const pillBg = isMichelle ? "E59086" : accentHex;

    if (isPillStyle) {
      // Shaded pill tags matching the PDF terracotta/accent boxes with white text
      allSkills.forEach((skill) => {
        result.push(
          new Paragraph({
            spacing: { before: 35, after: 35 },
            shading: { fill: pillBg },
            indent: { left: 80, right: 80 },
            children: createFormattedRuns(skill, {
              size: Math.max(14, skillItemHalfPt - 1),
              font: fontName,
              color: "FFFFFF",
              bold: true,
            }),
          })
        );
      });
    } else {
      allSkills.forEach((skill) => {
        result.push(
          new Paragraph({
            indent: { left: 200, hanging: 140 },
            spacing: { before: 20, after: 30 },
            children: [
              new TextRun({
                text: `${bulletChar} `,
                color: accentHex,
                bold: true,
                size: skillItemHalfPt,
                font: fontName,
              }),
              ...createFormattedRuns(skill, {
                size: skillItemHalfPt,
                font: fontName,
                color: isSidebar && sidebarBgHex ? sidebarTextHex : "1F2937",
              }),
            ],
          })
        );
      });
    }
    return result;
  };

  const buildExperienceParagraphs = (isSidebar: boolean): Paragraph[] => {
    if (!data.experience || data.experience.length === 0) return [];
    const expHalfPt = getSecHalfPt("experience", 10);
    const headingTitle = isMichelle ? "Work Experience" : "Experience";
    const result: Paragraph[] = [createSectionHeading(headingTitle, isSidebar)];

    data.experience.forEach((exp) => {
      const compHalfPt = getLineHalfPt("companyName", exp.companyFontSize, expHalfPt + 1);
      const titleHalfPt = getLineHalfPt("jobTitle", exp.titleFontSize, expHalfPt + 1);
      const dateHalfPt = getLineHalfPt("dates", exp.dateFontSize, expHalfPt - 1);
      const locHalfPt = getLineHalfPt("descriptions", exp.locationFontSize, expHalfPt - 1);

      result.push(
        new Paragraph({
          spacing: { before: 80, after: 15 },
          children: [
            new TextRun({
              text: cleanBulletText(exp.title || ""),
              bold: true,
              size: titleHalfPt,
              font: fontName,
              color: isSidebar && sidebarBgHex ? sidebarTextHex : "0F172A",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 15 },
          children: [
            new TextRun({
              text: exp.company || "",
              size: compHalfPt,
              font: fontName,
              color: "334155",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [
            new TextRun({
              text: exp.date || "",
              size: dateHalfPt,
              font: fontName,
              color: "64748B",
            }),
            ...(exp.location
              ? [
                  new TextRun({
                    text: `   ${exp.location}`,
                    size: locHalfPt,
                    font: fontName,
                    color: "64748B",
                  }),
                ]
              : []),
          ],
        })
      );

      if (exp.bullets && exp.bullets.length > 0) {
        exp.bullets.forEach((bullet, bi) => {
          const bHalfPt = getLineHalfPt(
            "bullets",
            exp.bulletFontSizes?.[bi] || exp.bulletFontSize,
            expHalfPt
          );
          const cleanB = cleanBulletText(bullet);
          result.push(
            new Paragraph({
              indent: { left: 200, hanging: 140 },
              spacing: { before: 20, after: 30 },
              children: [
                new TextRun({
                  text: `${exp.bulletChar || bulletChar} `,
                  color: accentHex,
                  bold: true,
                  size: bHalfPt,
                  font: fontName,
                }),
                ...createFormattedRuns(cleanB, {
                  size: bHalfPt,
                  font: fontName,
                  color: isSidebar && sidebarBgHex ? sidebarTextHex : "374151",
                }),
              ],
            })
          );
        });
      }
    });
    return result;
  };

  const buildProjectsParagraphs = (isSidebar: boolean): Paragraph[] => {
    if (!data.projects || data.projects.length === 0) return [];
    const secHalfPt = getSecHalfPt("projects", 10);
    const headingTitle = isMichelle ? "Personal Projects" : "Projects";
    const result: Paragraph[] = [createSectionHeading(headingTitle, isSidebar)];

    data.projects.forEach((proj) => {
      const nameHalfPt = getLineHalfPt("projectName", proj.nameFontSize, secHalfPt);
      const techHalfPt = getLineHalfPt("projectTech", proj.techFontSize, secHalfPt - 1);
      const descHalfPt = getLineHalfPt("descriptions", proj.descFontSize, secHalfPt);

      const rawName = cleanBulletText(proj.name || "Project");
      // Prevent duplicate "| Tech | Tech" if proj.name already includes tech
      const alreadyHasTech =
        proj.tech &&
        (rawName.toLowerCase().includes(proj.tech.toLowerCase()) || rawName.includes("|"));

      result.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: rawName,
              bold: true,
              size: nameHalfPt,
              font: fontName,
              color: isSidebar && sidebarBgHex ? sidebarTextHex : "0F172A",
            }),
            ...(proj.tech && !alreadyHasTech
              ? [
                  new TextRun({
                    text: ` | ${proj.tech}`,
                    size: techHalfPt,
                    font: fontName,
                    color: isSidebar && sidebarBgHex ? sidebarTextHex : "4B5563",
                  }),
                ]
              : []),
          ],
        })
      );

      const projectBullets =
        proj.bullets && proj.bullets.length > 0
          ? proj.bullets
          : proj.description
          ? proj.description.includes("\n")
            ? proj.description.split("\n").map((s) => s.trim()).filter(Boolean)
            : [proj.description.trim()]
          : [];

      projectBullets.forEach((b) => {
        const cleanB = cleanBulletText(b);
        result.push(
          new Paragraph({
            indent: { left: 200, hanging: 140 },
            spacing: { before: 20, after: 30 },
            children: [
              new TextRun({
                text: `${bulletChar} `,
                color: accentHex,
                bold: true,
                size: descHalfPt,
                font: fontName,
              }),
              ...createFormattedRuns(cleanB, {
                size: descHalfPt,
                font: fontName,
                color: isSidebar && sidebarBgHex ? sidebarTextHex : "374151",
              }),
            ],
          })
        );
      });
    });
    return result;
  };

  const buildEducationParagraphs = (isSidebar: boolean): Paragraph[] => {
    if (!data.education || data.education.length === 0) return [];
    const secHalfPt = getSecHalfPt("education", 10);
    const result: Paragraph[] = [createSectionHeading("Education", isSidebar)];

    data.education.forEach((edu) => {
      const degHalfPt = getLineHalfPt("degrees", edu.degreeFontSize, secHalfPt + 1);
      const schHalfPt = getLineHalfPt("institutions", edu.schoolFontSize, secHalfPt);
      const dateHalfPt = getLineHalfPt("dates", edu.dateFontSize, secHalfPt - 1);
      const scoreHalfPt = getLineHalfPt("scores", edu.scoreFontSize, secHalfPt - 1);

      result.push(
        new Paragraph({
          spacing: { before: 80, after: 15 },
          children: createFormattedRuns(cleanBulletText(edu.degree || "Degree"), {
            bold: true,
            size: degHalfPt,
            font: fontName,
            color: isSidebar && sidebarBgHex ? sidebarTextHex : "0F172A",
          }),
        }),
        new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [
            ...createFormattedRuns(edu.school || "", {
              size: schHalfPt,
              font: fontName,
              color: "334155",
            }),
            ...(edu.date
              ? [
                  new TextRun({
                    text: ` (${edu.date})`,
                    size: dateHalfPt,
                    font: fontName,
                    color: "64748B",
                  }),
                ]
              : []),
            ...(edu.score
              ? [
                  new TextRun({
                    text: ` — Score: ${edu.score}`,
                    size: scoreHalfPt,
                    font: fontName,
                    color: "64748B",
                  }),
                ]
              : []),
          ],
        })
      );
    });
    return result;
  };

  const buildCertificationsParagraphs = (isSidebar: boolean): Paragraph[] => {
    if (!data.certifications || data.certifications.length === 0) return [];
    const secHalfPt = getSecHalfPt("certifications", 10);
    const certHalfPt = getLineHalfPt("certifications", undefined, secHalfPt);
    const issHalfPt = getLineHalfPt("descriptions", undefined, secHalfPt - 1);
    const dateHalfPt = getLineHalfPt("dates", undefined, secHalfPt - 2);
    const headingTitle = isMichelle ? "Certificates" : "Certifications";
    const result: Paragraph[] = [createSectionHeading(headingTitle, isSidebar)];

    data.certifications.forEach((cert) => {
      const cleanCertName = cleanBulletText(cert.name || "Certification");
      result.push(
        new Paragraph({
          indent: { left: 200, hanging: 140 },
          spacing: { before: 20, after: 30 },
          children: [
            new TextRun({
              text: `${bulletChar} `,
              color: accentHex,
              bold: true,
              size: certHalfPt,
              font: fontName,
            }),
            ...createFormattedRuns(cleanCertName, {
              bold: true,
              size: certHalfPt,
              font: fontName,
              color: isSidebar && sidebarBgHex ? sidebarTextHex : "0F172A",
            }),
            ...(cert.date
              ? [
                  new TextRun({
                    text: ` (${cert.date})`,
                    size: dateHalfPt,
                    font: fontName,
                    color: isSidebar && sidebarBgHex ? sidebarTextHex : "6B7280",
                  }),
                ]
              : []),
            ...(cert.issuer
              ? createFormattedRuns(` — ${cert.issuer}`, {
                  size: issHalfPt,
                  font: fontName,
                  color: isSidebar && sidebarBgHex ? sidebarTextHex : "4B5563",
                })
              : []),
          ],
        })
      );
    });
    return result;
  };

  const buildAchievementsParagraphs = (isSidebar: boolean): Paragraph[] => {
    if (!data.achievements || data.achievements.length === 0) return [];
    const secHalfPt = getSecHalfPt("achievements", 10);
    const achHalfPt = getLineHalfPt("achievements", undefined, secHalfPt);
    const descHalfPt = getLineHalfPt("descriptions", undefined, secHalfPt - 1);
    const headingTitle = isMichelle ? "Organizations & Honors" : "Achievements & Awards";
    const result: Paragraph[] = [createSectionHeading(headingTitle, isSidebar)];

    data.achievements.forEach((ach) => {
      result.push(
        new Paragraph({
          indent: { left: 200, hanging: 140 },
          spacing: { before: 20, after: 30 },
          children: [
            new TextRun({
              text: `${bulletChar} `,
              color: accentHex,
              bold: true,
              size: achHalfPt,
              font: fontName,
            }),
            new TextRun({
              text: cleanBulletText(ach.title || "Achievement"),
              bold: true,
              size: achHalfPt,
              font: fontName,
              color: isSidebar && sidebarBgHex ? sidebarTextHex : "0F172A",
            }),
            ...(ach.description
              ? [
                  new TextRun({
                    text: `: ${ach.description}`,
                    size: descHalfPt,
                    font: fontName,
                    color: isSidebar && sidebarBgHex ? sidebarTextHex : "374151",
                  }),
                ]
              : []),
          ],
        })
      );
    });
    return result;
  };

  const buildLanguagesParagraphs = (isSidebar: boolean): Paragraph[] => {
    if (!data.languages || data.languages.length === 0) return [];
    const secHalfPt = getSecHalfPt("languages", 10);
    const langHalfPt = getLineHalfPt("languages", undefined, secHalfPt);
    const result: Paragraph[] = [createSectionHeading("Languages", isSidebar)];

    data.languages.forEach((lang) => {
      const cleanName = cleanBulletText(lang.name);
      result.push(
        new Paragraph({
          spacing: { before: 20, after: 15 },
          indent: { left: 140, hanging: 100 },
          children: [
            new TextRun({
              text: `${bulletChar} `,
              color: accentHex,
              bold: true,
              size: langHalfPt,
              font: fontName,
            }),
            new TextRun({
              text: cleanName,
              bold: true,
              size: langHalfPt,
              font: fontName,
              color: isSidebar && sidebarBgHex ? sidebarTextHex : "0F172A",
            }),
            ...(lang.proficiency
              ? [
                  new TextRun({
                    text: ` (${lang.proficiency})`,
                    size: Math.max(14, langHalfPt - 1),
                    font: fontName,
                    color: isSidebar && sidebarBgHex ? sidebarTextHex : "64748B",
                  }),
                ]
              : []),
          ],
        })
      );
    });

    return result;
  };

  // Section dispatch mapper
  const renderSection = (secId: string, isSidebar: boolean = false): Paragraph[] => {
    switch (secId) {
      case "summary":
        return buildSummaryParagraphs(isSidebar);
      case "skills":
        return buildSkillsParagraphs(isSidebar);
      case "experience":
        return buildExperienceParagraphs(isSidebar);
      case "projects":
        return buildProjectsParagraphs(isSidebar);
      case "education":
        return buildEducationParagraphs(isSidebar);
      case "certifications":
        return buildCertificationsParagraphs(isSidebar);
      case "achievements":
        return buildAchievementsParagraphs(isSidebar);
      case "languages":
        return buildLanguagesParagraphs(isSidebar);
      default:
        return [];
    }
  };

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

  // ─── 2. Body Layout Construction (Two-Column vs Single-Column) ────────────
  if (isTwoColumn) {
    const defaultSidebar = TEMPLATE_DEFAULT_SIDEBARS[templateId] || [
      "skills",
      "projects",
      "certifications",
      "languages",
      "achievements",
    ];
    const userSidebar =
      cs.sidebarSections && cs.sidebarSections.length > 0
        ? cs.sidebarSections
        : defaultSidebar;
    const sidebarSet = new Set(userSidebar);

    const ordered: string[] = (cs.sectionOrder || defaultSections).filter(
      (id: string) => !hidden.has(id)
    );

    // In Michelle template, summary is placed inside the top header next to the photo
    const bodyOrdered = isMichelle ? ordered.filter((id: string) => id !== "summary") : ordered;

    const mainSecs = bodyOrdered.filter((id: string) => !sidebarSet.has(id));
    const sideSecs = bodyOrdered.filter((id: string) => sidebarSet.has(id));

    const mainElements: Paragraph[] = [];
    mainSecs.forEach((secId: string) => {
      mainElements.push(...renderSection(secId, false));
    });

    const sideElements: Paragraph[] = [];
    sideSecs.forEach((secId: string) => {
      sideElements.push(...renderSection(secId, true));
    });

    let sideWidth = 44;
    if (cs.sidebarWidth) {
      sideWidth = parseInt(cs.sidebarWidth) || 44;
    } else if (tStyle.sidebarWidth) {
      sideWidth = parseInt(tStyle.sidebarWidth) || 44;
    }
    const mainWidth = 100 - sideWidth;

    if (isRightSidebar) {
      // Main on Left (e.g. 56%), Sidebar on Right (e.g. 44%) - like Template 01
      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: mainWidth, type: WidthType.PERCENTAGE },
                  margins: { right: 240, top: 0, bottom: 0, left: 0 },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                  children: mainElements.length > 0 ? mainElements : [new Paragraph("")],
                }),
                new TableCell({
                  width: { size: sideWidth, type: WidthType.PERCENTAGE },
                  margins: { left: 240, top: 0, bottom: 0, right: 0 },
                  shading: sidebarBgHex ? { fill: sidebarBgHex } : undefined,
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                  children: sideElements.length > 0 ? sideElements : [new Paragraph("")],
                }),
              ],
            }),
          ],
        })
      );
    } else {
      // Sidebar on Left (e.g. 32%), Main on Right (e.g. 68%) - like Template 02
      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: sideWidth, type: WidthType.PERCENTAGE },
                  margins: { right: 200, top: 0, bottom: 0, left: 0 },
                  shading: sidebarBgHex ? { fill: sidebarBgHex } : undefined,
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                  children: sideElements.length > 0 ? sideElements : [new Paragraph("")],
                }),
                new TableCell({
                  width: { size: mainWidth, type: WidthType.PERCENTAGE },
                  margins: { left: 200, top: 0, bottom: 0, right: 0 },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                  children: mainElements.length > 0 ? mainElements : [new Paragraph("")],
                }),
              ],
            }),
          ],
        })
      );
    }
  } else {
    // Single Column Linear Render
    const ordered: string[] = (cs.sectionOrder || defaultSections).filter(
      (id: string) => !hidden.has(id)
    );
    ordered.forEach((secId: string) => {
      children.push(...renderSection(secId, false));
    });
  }

  // Calculate page dimensions in twips (1 mm = 56.6929 twips)
  const pageDim = getPageDimensions(cs);
  const widthTwips = Math.round(pageDim.widthMm * 56.6929);
  const heightTwips = Math.round(pageDim.heightMm * 56.6929);
  const orientation =
    pageDim.orientation === "landscape"
      ? PageOrientation.LANDSCAPE
      : PageOrientation.PORTRAIT;

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: widthTwips,
              height: heightTwips,
              orientation,
            },
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
