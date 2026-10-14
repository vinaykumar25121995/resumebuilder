import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  PageOrientation,
} from "docx";
import { ResumeData, getPageDimensions } from "@/components/ResumeTemplateRenderer";

/**
 * Generates a clean, ATS-compliant DOCX document from ResumeData.
 * Respects custom section ordering and styling choices while retaining 100% machine-readable text.
 */
export async function generateResumeDocxBlob(data: ResumeData): Promise<Blob> {
  const children: Paragraph[] = [];
  const cs = data.customStyles || {};

  // Custom accent color in hex without #
  const accentHex = (cs.accentColor || cs.headingColor || "#2563EB").replace(
    "#",
    ""
  );

  const fontName = cs.fontFamily?.includes("Serif") || cs.fontFamily?.includes("Garamond")
    ? "Georgia"
    : "Calibri";

  const sfs = cs.sectionFontSizes || {};
  const lfs = cs.lineFontSizes || {};
  const nameHalfPt = Math.round((sfs.name || 18) * 2);
  const contactHalfPt = Math.round((sfs.contact || 9) * 2);
  const headingHalfPt = Math.round((sfs.sectionHeadings || 12) * 2);
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

  // Helper for section heading
  const createSectionHeading = (title: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: {
        bottom: {
          color: accentHex,
          space: 4,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: headingHalfPt,
          color: accentHex,
          font: fontName,
        }),
      ],
    });
  };

  // Helper to parse formatting (bold, underline, highlight, color, size) into Word TextRuns
  const createFormattedRuns = (
    text: string | undefined,
    baseOptions: { font: string; size: number; color?: string; bold?: boolean; italics?: boolean }
  ): TextRun[] => {
    if (!text) return [];
    if (
      !text.includes("**") &&
      !text.includes("==") &&
      !text.includes("<u>") &&
      !text.includes("<color:") &&
      !text.includes("<size:")
    ) {
      return [new TextRun({ text, ...baseOptions })];
    }

    const tokenRegex =
      /(\*\*[^*]+?\*\*|==(?:[a-zA-Z0-9#]+:)?[^=]+?==|<u>[\s\S]*?<\/u>|<color:[^>]+>[\s\S]*?<\/color>|<size:[^>]+>[\s\S]*?<\/size>)/g;
    const parts = text.split(tokenRegex);
    const runs: TextRun[] = [];

    parts.forEach((part) => {
      if (!part) return;

      if (part.startsWith("**") && part.endsWith("**")) {
        runs.push(
          new TextRun({
            text: part.slice(2, -2),
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
        runs.push(
          new TextRun({
            text: content,
            ...baseOptions,
            color: colorVal.replace("#", ""),
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

  // 1. Personal Header
  const fullName = data.personalInfo?.fullName || "Your Name";
  const title = data.personalInfo?.title || "";
  const contactParts = [
    data.personalInfo?.location,
    data.personalInfo?.phone,
    data.personalInfo?.email,
    data.personalInfo?.linkedin,
    data.personalInfo?.github,
    data.personalInfo?.portfolio,
  ].filter(Boolean);

  const alignment =
    cs.nameAlign === "center"
      ? AlignmentType.CENTER
      : cs.nameAlign === "right"
      ? AlignmentType.RIGHT
      : AlignmentType.LEFT;

  children.push(
    new Paragraph({
      alignment,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: fullName.toUpperCase(),
          bold: true,
          size: nameHalfPt,
          font: fontName,
          color: "111827",
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
        spacing: { before: 0, after: 60 },
        children: [
          new TextRun({
            text: title,
            size: titleHalfPt,
            font: fontName,
            color: "4B5563",
          }),
        ],
      })
    );
  }

  if (contactParts.length > 0) {
    const contactLineHalfPt = getLineHalfPt(
      "contactDetails",
      data.personalInfo?.contactFontSize,
      contactHalfPt
    );
    children.push(
      new Paragraph({
        alignment,
        spacing: { before: 0, after: 200 },
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

  // Section builders
  const renderSummary = () => {
    if (!data.summary) return;
    const secHalfPt = getSecHalfPt("summary", 10);
    children.push(createSectionHeading("Professional Summary"));
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 140 },
        children: createFormattedRuns(data.summary, {
          size: secHalfPt,
          font: fontName,
          color: "1F2937",
        }),
      })
    );
  };

  const renderSkills = () => {
    const allSkills: string[] = [
      ...(data.skills?.technical || []),
      ...(data.skills?.tools || []),
      ...(data.skills?.concepts || []),
      ...(data.skills?.soft || []),
    ];
    if (allSkills.length === 0) return;
    const secHalfPt = getSecHalfPt("skills", 10);
    const skillItemHalfPt = getLineHalfPt("skillItems", undefined, secHalfPt);
    children.push(createSectionHeading("Technical & Core Skills"));
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 140 },
        children: [
          new TextRun({
            text: allSkills.join(" • "),
            size: skillItemHalfPt,
            font: fontName,
            color: "1F2937",
          }),
        ],
      })
    );
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return;
    const expHalfPt = getSecHalfPt("experience", 10);
    children.push(createSectionHeading("Work Experience"));

    data.experience.forEach((exp) => {
      const compHalfPt = getLineHalfPt("companyName", exp.companyFontSize, expHalfPt + 2);
      const titleHalfPt = getLineHalfPt("jobTitle", exp.titleFontSize, expHalfPt);
      const dateHalfPt = getLineHalfPt("dates", exp.dateFontSize, expHalfPt - 1);
      const locHalfPt = getLineHalfPt("descriptions", exp.locationFontSize, expHalfPt);

      if (exp.companyFirst) {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 40 },
            children: [
              new TextRun({
                text: exp.company || "",
                bold: true,
                size: compHalfPt,
                font: fontName,
                color: "111827",
              }),
              new TextRun({
                text: exp.location ? ` — ${exp.location}` : "",
                size: locHalfPt,
                font: fontName,
                color: "6B7280",
              }),
            ].concat(
              exp.date
                ? [
                    new TextRun({
                      text: `  (${exp.date})`,
                      italics: true,
                      size: dateHalfPt,
                      font: fontName,
                      color: "4B5563",
                    }),
                  ]
                : []
            ),
          })
        );

        children.push(
          new Paragraph({
            spacing: { before: 0, after: 60 },
            children: createFormattedRuns(exp.title, {
              size: titleHalfPt,
              font: fontName,
              color: accentHex,
              italics: true,
            }),
          })
        );
      } else {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 40 },
            children: createFormattedRuns(exp.title, {
              size: titleHalfPt,
              font: fontName,
              color: "111827",
              bold: true,
            }).concat(
              exp.date
                ? [
                    new TextRun({
                      text: `  (${exp.date})`,
                      italics: true,
                      size: dateHalfPt,
                      font: fontName,
                      color: "4B5563",
                    }),
                  ]
                : []
            ),
          })
        );

        children.push(
          new Paragraph({
            spacing: { before: 0, after: 60 },
            children: [
              new TextRun({
                text: exp.company || "",
                italics: true,
                size: compHalfPt,
                font: fontName,
                color: accentHex,
              }),
              new TextRun({
                text: exp.location ? ` — ${exp.location}` : "",
                size: locHalfPt,
                font: fontName,
                color: "6B7280",
              }),
            ],
          })
        );
      }

      if (exp.bullets && exp.bullets.length > 0) {
        exp.bullets.forEach((bullet, bi) => {
          const bHalfPt = getLineHalfPt(
            "bullets",
            exp.bulletFontSizes?.[bi] || exp.bulletFontSize,
            expHalfPt
          );
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { before: 20, after: 40 },
              children: createFormattedRuns(bullet, {
                size: bHalfPt,
                font: fontName,
                color: "374151",
              }),
            })
          );
        });
      }
    });
  };

  const renderProjects = () => {
    if (!data.projects || data.projects.length === 0) return;
    const secHalfPt = getSecHalfPt("projects", 10);
    children.push(createSectionHeading("Projects"));

    data.projects.forEach((proj) => {
      const nameHalfPt = getLineHalfPt("projectName", proj.nameFontSize, secHalfPt + 1);
      const techHalfPt = getLineHalfPt("projectTech", proj.techFontSize, secHalfPt - 1);
      const descHalfPt = getLineHalfPt("descriptions", proj.descFontSize, secHalfPt);

      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: proj.name || "Project",
              bold: true,
              size: nameHalfPt,
              font: fontName,
              color: "111827",
            }),
            new TextRun({
              text: proj.tech ? ` | Technologies: ${proj.tech}` : "",
              italics: true,
              size: techHalfPt,
              font: fontName,
              color: "4B5563",
            }),
          ],
        })
      );

      if (proj.description) {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 20, after: 60 },
            children: createFormattedRuns(proj.description, {
              size: descHalfPt,
              font: fontName,
              color: "374151",
            }),
          })
        );
      }
    });
  };

  const renderEducation = () => {
    if (!data.education || data.education.length === 0) return;
    const secHalfPt = getSecHalfPt("education", 10);
    children.push(createSectionHeading("Education"));

    data.education.forEach((edu) => {
      const degHalfPt = getLineHalfPt("degrees", edu.degreeFontSize, secHalfPt + 1);
      const schHalfPt = getLineHalfPt("institutions", edu.schoolFontSize, secHalfPt);
      const dateHalfPt = getLineHalfPt("dates", edu.dateFontSize, secHalfPt - 1);
      const scoreHalfPt = getLineHalfPt("scores", edu.scoreFontSize, secHalfPt - 1);

      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: edu.degree || "Degree",
              bold: true,
              size: degHalfPt,
              font: fontName,
              color: "111827",
            }),
            new TextRun({
              text: edu.date ? ` (${edu.date})` : "",
              size: dateHalfPt,
              font: fontName,
              color: "4B5563",
            }),
          ],
        })
      );

      children.push(
        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [
            new TextRun({
              text: edu.school || "",
              italics: true,
              size: schHalfPt,
              font: fontName,
              color: "374151",
            }),
            new TextRun({
              text: edu.location ? `, ${edu.location}` : "",
              size: schHalfPt - 1,
              font: fontName,
              color: "6B7280",
            }),
            new TextRun({
              text: edu.score ? ` — Score: ${edu.score}` : "",
              bold: true,
              size: scoreHalfPt,
              font: fontName,
              color: "4B5563",
            }),
          ],
        })
      );
    });
  };

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return;
    const secHalfPt = getSecHalfPt("certifications", 10);
    children.push(createSectionHeading("Certifications"));

    data.certifications.forEach((cert) => {
      const certHalfPt = getLineHalfPt("certifications", cert.nameFontSize, secHalfPt);
      const issHalfPt = getLineHalfPt("descriptions", cert.issuerFontSize, secHalfPt - 1);
      const dateHalfPt = getLineHalfPt("dates", cert.dateFontSize, secHalfPt - 2);

      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 20, after: 40 },
          children: [
            new TextRun({
              text: cert.name || "Certification",
              bold: true,
              size: certHalfPt,
              font: fontName,
              color: "111827",
            }),
            new TextRun({
              text: cert.issuer ? ` — ${cert.issuer}` : "",
              size: issHalfPt,
              font: fontName,
              color: "4B5563",
            }),
            new TextRun({
              text: cert.date ? ` (${cert.date})` : "",
              size: dateHalfPt,
              font: fontName,
              color: "6B7280",
            }),
          ],
        })
      );
    });
  };

  const renderAchievements = () => {
    if (!data.achievements || data.achievements.length === 0) return;
    const secHalfPt = getSecHalfPt("achievements", 10);
    children.push(createSectionHeading("Achievements & Awards"));

    data.achievements.forEach((ach) => {
      const achHalfPt = getLineHalfPt("achievements", ach.titleFontSize, secHalfPt);
      const descHalfPt = getLineHalfPt("descriptions", ach.descFontSize, secHalfPt - 1);

      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 20, after: 40 },
          children: [
            new TextRun({
              text: ach.title || "Achievement",
              bold: true,
              size: achHalfPt,
              font: fontName,
              color: "111827",
            }),
            new TextRun({
              text: ach.description ? `: ${ach.description}` : "",
              size: descHalfPt,
              font: fontName,
              color: "374151",
            }),
          ],
        })
      );
    });
  };

  const renderLanguages = () => {
    if (!data.languages || data.languages.length === 0) return;
    const secHalfPt = getSecHalfPt("languages", 10);
    const langHalfPt = getLineHalfPt("languages", undefined, secHalfPt);
    children.push(createSectionHeading("Languages"));
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 120 },
        children: [
          new TextRun({
            text: data.languages
              .map(
                (l) => `${l.name}${l.proficiency ? ` (${l.proficiency})` : ""}`
              )
              .join(" • "),
            size: langHalfPt,
            font: fontName,
            color: "1F2937",
          }),
        ],
      })
    );
  };

  // Section order dispatch
  const sectionMap: Record<string, () => void> = {
    summary: renderSummary,
    skills: renderSkills,
    experience: renderExperience,
    projects: renderProjects,
    education: renderEducation,
    certifications: renderCertifications,
    achievements: renderAchievements,
    languages: renderLanguages,
  };

  const defaultOrder = [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
    "achievements",
    "languages",
  ];

  const hidden = new Set(cs.hiddenSections || []);
  const order = (cs.sectionOrder || defaultOrder).filter(
    (id) => !hidden.has(id)
  );

  order.forEach((sectionId) => {
    if (sectionMap[sectionId]) {
      sectionMap[sectionId]();
    }
  });

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
