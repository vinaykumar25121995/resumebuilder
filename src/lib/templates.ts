/**
 * ATS Resume Template System
 * 40 fully defined ATS-safe templates with unique visual styling
 * Every template uses: standard text, standard headings, bullet points, clear hierarchy
 * NO: skill bars, graphics, images, infographics, or complex columns
 */

export interface TemplateConfig {
  id: string;
  number: number;
  name: string;
  category: string[];
  description: string;
  bestFor: string[];
  atsScore: number; // 95-100, all templates are ATS-safe
  pageSupport: "one" | "two" | "both";
  isPro?: boolean; // Reserved for Pro subscription members
  previewImage?: string;
  style: {
    fontFamily: string;
    nameFontSize: string;
    sectionFontSize: string;
    bodyFontSize: string;
    nameColor: string;
    headingColor: string;
    accentColor: string;
    borderStyle: string;
    spacing: string;
    nameAlign: "left" | "center" | "right";
    showDividers: boolean;
    bulletChar: string;
    headingCase: "uppercase" | "capitalize" | "normal";
    headingWeight: string;
    sectionOrder: string[];
    // Layout extensions
    layoutType?: "single-column" | "two-column-left-sidebar" | "two-column-right-sidebar";
    sidebarWidth?: string;
    sidebarBgColor?: string;
    sidebarTextColor?: string;
    hasPhoto?: boolean;
    photoStyle?: "round" | "square" | "rounded";
  };
}

export const ALL_TEMPLATES: TemplateConfig[] = [
  // ─── PREMIUM PRO TEMPLATES (PRO SUBSCRIPTION EXCLUSIVE) ────────────────────
  {
    id: "pro-michelle",
    number: 1,
    name: "Template 01 — Michelle Dhamar — Healthcare Volunteer",
    category: ["Premium", "Pro", "Healthcare", "Modern"],
    description: "Soft terracotta healthcare layout with a top-centered photo badge, right-aligned contact matrix, double-underlined headers, and clinical pill tags.",
    bestFor: ["Healthcare Volunteer", "Clinical Assistant", "Nursing Assistant", "Medical Administration", "Healthcare"],
    atsScore: 98,
    pageSupport: "both",
    isPro: true,
    style: {
      fontFamily: "'Inter', Arial, sans-serif",
      nameFontSize: "24pt",
      sectionFontSize: "10.5pt",
      bodyFontSize: "9.5pt",
      nameColor: "#be675e",
      headingColor: "#1e293b",
      accentColor: "#be675e",
      borderStyle: "3px double #be675e",
      spacing: "15px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["education", "experience", "skills", "projects", "certifications", "languages"],
      layoutType: "single-column",
      hasPhoto: true,
      photoStyle: "rounded",
    },
  },
  {
    id: "pro-catherine",
    number: 2,
    name: "Template 02 — Cathy Barnett — 3D Character Animator",
    category: ["Premium", "Pro", "Creative", "Modern"],
    description: "High-contrast creative dual-column layout with a deep slate sidebar, pill-style contact indicators, and custom circular section badges.",
    bestFor: ["3D Animator", "VFX Artist", "Game Developer", "Creative Roles", "Designers"],
    atsScore: 97,
    pageSupport: "both",
    isPro: true,
    style: {
      fontFamily: "'Inter', Arial, sans-serif",
      nameFontSize: "24pt",
      sectionFontSize: "10.5pt",
      bodyFontSize: "9.5pt",
      nameColor: "#0f172a",
      headingColor: "#0f172a",
      accentColor: "#0284c7",
      borderStyle: "1px solid #e2e8f0",
      spacing: "16px",
      nameAlign: "left",
      showDividers: false,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "experience", "certifications", "education"],
      layoutType: "two-column-left-sidebar",
      sidebarWidth: "32%",
      sidebarBgColor: "#1e293b",
      sidebarTextColor: "#f8fafc",
      hasPhoto: false,
    },
  },
  {
    id: "pro-chris-flims",
    number: 3,
    name: "Template 03 — Chris Flims — Project Manager",
    category: ["Premium", "Pro", "Management", "Modern"],
    description: "High-impact executive single-column layout featuring coral branding, diamond-rule section headers, and an Areas of Expertise matrix.",
    bestFor: ["Project Manager", "Scrum Master", "Operations Director", "Remote Leaders", "Management"],
    atsScore: 99,
    pageSupport: "both",
    isPro: true,
    style: {
      fontFamily: "'Inter', Arial, sans-serif",
      nameFontSize: "26pt",
      sectionFontSize: "11pt",
      bodyFontSize: "9.5pt",
      nameColor: "#c84b31",
      headingColor: "#1f2937",
      accentColor: "#c84b31",
      borderStyle: "1.5px solid #cbd5e1",
      spacing: "15px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "skills", "experience", "education", "certifications"],
      layoutType: "single-column",
    },
  },
  {
    id: "pro-will-tribian",
    number: 4,
    name: "Template 04 — Will Tribian — Theater & Creative",
    category: ["Premium", "Pro", "Creative", "Popular"],
    description: "Creative profile layout featuring a portrait headshot, dark bio capsule, vibrant cyan-teal contact banner, and split-column credentials.",
    bestFor: ["Actor", "Performer", "Creative Director", "Media Professional", "Entertainer"],
    atsScore: 96,
    pageSupport: "both",
    isPro: true,
    style: {
      fontFamily: "'Inter', Arial, sans-serif",
      nameFontSize: "22pt",
      sectionFontSize: "10.5pt",
      bodyFontSize: "9.5pt",
      nameColor: "#0f172a",
      headingColor: "#0891b2",
      accentColor: "#0891b2",
      borderStyle: "1.5px solid #0891b2",
      spacing: "14px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["experience", "projects", "skills", "education", "languages"],
      hasPhoto: true,
      photoStyle: "round",
    },
  },
  {
    id: "pro-amanda-smith",
    number: 5,
    name: "Template 05 — Amanda — Chief Information Officer (CIO)",
    category: ["Premium", "Pro", "Tech", "Executive"],
    description: "High-level CIO executive format featuring a rounded-square portrait, solid charcoal contact bar, dual-column layout, and specialized credentials matrix.",
    bestFor: ["CIO", "CTO", "VP of Engineering", "IT Director", "Executive Leadership"],
    atsScore: 98,
    pageSupport: "both",
    isPro: true,
    style: {
      fontFamily: "'Inter', Arial, sans-serif",
      nameFontSize: "24pt",
      sectionFontSize: "11pt",
      bodyFontSize: "9.5pt",
      nameColor: "#0f172a",
      headingColor: "#18181b",
      accentColor: "#18181b",
      borderStyle: "1px solid #d1d5db",
      spacing: "15px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["experience", "education", "skills", "certifications", "languages", "achievements"],
      hasPhoto: true,
      photoStyle: "rounded",
    },
  },

  {
    id: "pro-claire",
    number: 6,
    name: "Template 06 — Claire Russel — Computer Science Student",
    category: ["Premium", "Pro", "Tech", "Student"],
    description: "Royal purple tech banner with circular photo avatar, left credentials sidebar, and geometric coursework & volunteer matrix.",
    bestFor: ["Computer Science Student", "Software Engineer Intern", "Junior Developer", "STEM Graduate"],
    atsScore: 98,
    pageSupport: "both",
    isPro: true,
    style: {
      fontFamily: "'Inter', Arial, sans-serif",
      nameFontSize: "24pt",
      sectionFontSize: "10.5pt",
      bodyFontSize: "9pt",
      nameColor: "#ffffff",
      headingColor: "#1e1b4b",
      accentColor: "#4c1d95",
      borderStyle: "1.5px solid #4c1d95",
      spacing: "14px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["education", "experience", "skills", "projects", "certifications", "languages"],
      layoutType: "two-column-left-sidebar",
      sidebarWidth: "30%",
      hasPhoto: true,
      photoStyle: "round",
    },
  },
  {
    id: "pro-jessica",
    number: 7,
    name: "Template 07 — Jessica Blakely — Game Designer",
    category: ["Premium", "Pro", "Creative", "Gaming"],
    description: "Dark navy header with gold ring-framed photo, dual-column layout with gold headings, dark pill tags, and visual language proficiency blocks.",
    bestFor: ["Game Designer", "Level Designer", "3D Environment Artist", "Unreal Engine Specialist", "Creative Tech"],
    atsScore: 97,
    pageSupport: "both",
    isPro: true,
    style: {
      fontFamily: "'Inter', Arial, sans-serif",
      nameFontSize: "24pt",
      sectionFontSize: "11pt",
      bodyFontSize: "9pt",
      nameColor: "#ffffff",
      headingColor: "#b8860b",
      accentColor: "#b8860b",
      borderStyle: "1px solid #d4af37",
      spacing: "14px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["experience", "skills", "education", "certifications", "achievements", "languages"],
      layoutType: "single-column",
      hasPhoto: true,
      photoStyle: "round",
    },
  },
  {
    id: "pro-adam",
    number: 8,
    name: "Template 08 — Adam Stotch — Realtor",
    category: ["Premium", "Pro", "Business", "Sales"],
    description: "Executive real estate format with vertical timeline node glyphs, bracketed achievements, skills matrix, and language dot ratings.",
    bestFor: ["Realtor", "Real Estate Agent", "Property Manager", "Commercial Broker", "Sales Executive"],
    atsScore: 99,
    pageSupport: "both",
    isPro: true,
    style: {
      fontFamily: "'Inter', Arial, sans-serif",
      nameFontSize: "24pt",
      sectionFontSize: "10.5pt",
      bodyFontSize: "9pt",
      nameColor: "#0f172a",
      headingColor: "#0f172a",
      accentColor: "#0f172a",
      borderStyle: "1px solid #0f172a",
      spacing: "14px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["experience", "education", "skills", "certifications", "achievements", "languages"],
      layoutType: "single-column",
      hasPhoto: true,
      photoStyle: "rounded",
    },
  },
  {
    id: "pro-nick",
    number: 9,
    name: "Template 09 — Nick Koe — Event Photographer",
    category: ["Premium", "Pro", "Creative", "Media"],
    description: "Vibrant slate-blue & terracotta creative layout with squircle-framed portrait, colored margin accent bars, and portfolio showcase section.",
    bestFor: ["Event Photographer", "Wedding Photographer", "Photojournalist", "Visual Artist", "Media Specialist"],
    atsScore: 96,
    pageSupport: "both",
    isPro: true,
    style: {
      fontFamily: "'Inter', Arial, sans-serif",
      nameFontSize: "24pt",
      sectionFontSize: "10.5pt",
      bodyFontSize: "9pt",
      nameColor: "#4a6b82",
      headingColor: "#1e293b",
      accentColor: "#e06d53",
      borderStyle: "1.5px solid #4a6b82",
      spacing: "14px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["experience", "education", "skills", "projects", "certifications"],
      layoutType: "single-column",
      hasPhoto: true,
      photoStyle: "rounded",
    },
  },
  {
    id: "pro-lisa",
    number: 10,
    name: "Template 10 — Lisa Neumann — Mechanical Engineer",
    category: ["Premium", "Pro", "Engineering", "Technical"],
    description: "Engineering executive format with solid steel-blue contact banner, categorized technical competencies, and certification credentials.",
    bestFor: ["Mechanical Engineer", "HVAC Engineer", "Manufacturing Engineer", "Project Engineer", "Industrial Designer"],
    atsScore: 99,
    pageSupport: "both",
    isPro: true,
    style: {
      fontFamily: "'Inter', Arial, sans-serif",
      nameFontSize: "26pt",
      sectionFontSize: "11pt",
      bodyFontSize: "9.5pt",
      nameColor: "#1e293b",
      headingColor: "#1e3a5f",
      accentColor: "#1e3a5f",
      borderStyle: "1.5px solid #1e3a5f",
      spacing: "15px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["experience", "education", "skills", "certifications", "languages"],
      layoutType: "single-column",
      hasPhoto: false,
      photoStyle: "rounded",
    },
  },

  // ─── STANDARD ATS TEMPLATES (RETAINED) ───────────────────────────────────
  {
    id: "ats-supply-chain",
    number: 41,
    name: "Template 41 — ATS Supply Chain",
    category: ["Business", "Management"],
    description: "Logistics and procurement-focused for supply chain professionals.",
    bestFor: ["Supply Chain Manager", "Procurement", "Logistics"],
    atsScore: 99,
    pageSupport: "both",
    style: {
      fontFamily: "Arial, sans-serif",
      nameFontSize: "19pt",
      sectionFontSize: "10pt",
      bodyFontSize: "9.5pt",
      nameColor: "#15803d",
      headingColor: "#15803d",
      accentColor: "#15803d",
      borderStyle: "1.5px solid #15803d",
      spacing: "13px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "experience", "skills", "certifications", "education", "achievements"],
    },
  },
  {
    id: "ats-healthcare",
    number: 42,
    name: "Template 42 — ATS Healthcare",
    category: ["Management"],
    description: "Credentials and clinical experience-forward for healthcare roles.",
    bestFor: ["Healthcare Manager", "Medical Professional", "Clinical"],
    atsScore: 99,
    pageSupport: "both",
    style: {
      fontFamily: "Arial, sans-serif",
      nameFontSize: "19pt",
      sectionFontSize: "10pt",
      bodyFontSize: "9.5pt",
      nameColor: "#0f766e",
      headingColor: "#0f766e",
      accentColor: "#0f766e",
      borderStyle: "1.5px solid #0f766e",
      spacing: "14px",
      nameAlign: "center",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "certifications", "experience", "education", "skills", "achievements"],
    },
  },
  {
    id: "ats-engineering",
    number: 43,
    name: "Template 43 — ATS Engineering",
    category: ["Tech", "Management"],
    description: "Technical depth and project impact-focused for engineering professionals.",
    bestFor: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"],
    atsScore: 99,
    pageSupport: "both",
    style: {
      fontFamily: "Arial, sans-serif",
      nameFontSize: "19pt",
      sectionFontSize: "10pt",
      bodyFontSize: "9.5pt",
      nameColor: "#1e40af",
      headingColor: "#1e40af",
      accentColor: "#1e40af",
      borderStyle: "1.5px solid #1e40af",
      spacing: "13px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "▪",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "experience", "skills", "projects", "certifications", "education"],
    },
  },
  {
    id: "ats-management",
    number: 44,
    name: "Template 44 — ATS Management",
    category: ["Management"],
    description: "Leadership and team impact-focused for general management.",
    bestFor: ["General Manager", "Department Head", "Team Lead"],
    atsScore: 99,
    pageSupport: "both",
    style: {
      fontFamily: "Georgia, serif",
      nameFontSize: "20pt",
      sectionFontSize: "10pt",
      bodyFontSize: "9.5pt",
      nameColor: "#1f2937",
      headingColor: "#1f2937",
      accentColor: "#1f2937",
      borderStyle: "2px solid #1f2937",
      spacing: "15px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "▸",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "experience", "education", "skills", "certifications", "achievements"],
    },
  },
  // ─── TWO-COLUMN / DESIGNER ────────────────────────────────────────────────
  {
    id: "ats-two-column-blue",
    number: 45,
    name: "Template 45 — Two-Column Blue Sidebar",
    category: ["2-Column", "Modern", "Popular"],
    description: "Visually striking layout with a distinct blue sidebar. Note: While designed safely, two-column formats can have slightly lower parsing reliability on older ATS.",
    bestFor: ["Designers", "Tech", "Marketing"],
    atsScore: 92,
    pageSupport: "both",
    style: {
      fontFamily: "'Segoe UI', Arial, sans-serif",
      nameFontSize: "24pt",
      sectionFontSize: "11pt",
      bodyFontSize: "9.5pt",
      nameColor: "#ffffff",
      headingColor: "#2563eb", // Blue for main area headings
      accentColor: "#60a5fa",
      borderStyle: "1px solid #e5e7eb",
      spacing: "16px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "experience", "education", "projects"], // Main column sections
      layoutType: "two-column-left-sidebar",
      sidebarWidth: "32%",
      sidebarBgColor: "#3b82f6", // Blue
      sidebarTextColor: "#ffffff",
    },
  },
  {
    id: "ats-two-column-dark",
    number: 46,
    name: "Template 46 — Two-Column Navy Sidebar",
    category: ["2-Column", "Modern", "Tech", "Business"],
    description: "Professional navy blue sidebar layout. High contrast and clean separation of skills and experience.",
    bestFor: ["Data Analysts", "Engineers", "Management"],
    atsScore: 94,
    pageSupport: "both",
    style: {
      fontFamily: "Arial, sans-serif",
      nameFontSize: "22pt",
      sectionFontSize: "11pt",
      bodyFontSize: "9.5pt",
      nameColor: "#ffffff",
      headingColor: "#1e3a8a", // Navy for main area
      accentColor: "#93c5fd",
      borderStyle: "1px solid #cbd5e1",
      spacing: "14px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "▸",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "experience", "projects", "education"],
      layoutType: "two-column-left-sidebar",
      sidebarWidth: "30%",
      sidebarBgColor: "#1e3a8a", // Navy
      sidebarTextColor: "#f8fafc",
    },
  },
  {
    id: "ats-two-column-cream",
    number: 47,
    name: "Template 47 — Two-Column Cream Sidebar",
    category: ["2-Column", "Modern", "Classic"],
    description: "Elegant layout with a soft cream sidebar for a subtle but distinct visual hierarchy.",
    bestFor: ["Finance", "Consulting", "Creative"],
    atsScore: 95,
    pageSupport: "both",
    style: {
      fontFamily: "Georgia, serif",
      nameFontSize: "24pt",
      sectionFontSize: "10pt",
      bodyFontSize: "10pt",
      nameColor: "#0f172a",
      headingColor: "#0f172a",
      accentColor: "#475569",
      borderStyle: "1px solid #0f172a",
      spacing: "16px",
      nameAlign: "center",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "experience", "education", "achievements"],
      layoutType: "two-column-left-sidebar",
      sidebarWidth: "33%",
      sidebarBgColor: "#fffbeb", // Cream
      sidebarTextColor: "#0f172a",
    },
  },
  // ─── PHOTO TEMPLATES ──────────────────────────────────────────────────────
  {
    id: "ats-photo-modern",
    number: 48,
    name: "Template 48 — Modern Photo Header",
    category: ["Photo", "Modern", "Popular"],
    description: "A clean, modern layout featuring a professional photo in the header. Excellent for real estate, acting, modeling, or customer-facing roles.",
    bestFor: ["Sales", "Customer Success", "Real Estate", "Creative"],
    atsScore: 92,
    pageSupport: "both",
    style: {
      fontFamily: "'Inter', sans-serif",
      nameFontSize: "24pt",
      sectionFontSize: "12pt",
      bodyFontSize: "10pt",
      nameColor: "#111827",
      headingColor: "#2563eb",
      accentColor: "#3b82f6",
      borderStyle: "2px solid #e5e7eb",
      spacing: "16px",
      nameAlign: "left",
      showDividers: true,
      bulletChar: "•",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "experience", "education", "skills", "projects"],
      hasPhoto: true,
      photoStyle: "round",
    },
  },
  {
    id: "ats-photo-sidebar",
    number: 49,
    name: "Template 49 — Two-Column Photo",
    category: ["Photo", "2-Column", "Modern", "Classic"],
    description: "Two-column design with your photo prominently displayed at the top of the sidebar.",
    bestFor: ["Designers", "Marketing", "Consultants"],
    atsScore: 90,
    pageSupport: "both",
    style: {
      fontFamily: "Arial, sans-serif",
      nameFontSize: "22pt",
      sectionFontSize: "11pt",
      bodyFontSize: "9.5pt",
      nameColor: "#ffffff",
      headingColor: "#1f2937",
      accentColor: "#9ca3af",
      borderStyle: "1px solid #d1d5db",
      spacing: "14px",
      nameAlign: "center",
      showDividers: true,
      bulletChar: "▸",
      headingCase: "uppercase",
      headingWeight: "bold",
      sectionOrder: ["summary", "experience", "projects", "education"],
      layoutType: "two-column-left-sidebar",
      sidebarWidth: "30%",
      sidebarBgColor: "#1f2937",
      sidebarTextColor: "#f3f4f6",
      hasPhoto: true,
      photoStyle: "square",
    },
  }
];

// ─── Category definitions ─────────────────────────────────────────────────────
export const TEMPLATE_CATEGORIES = [
  { id: "All", label: "All Templates", emoji: "📄" },
  { id: "Premium", label: "👑 Premium Pro", emoji: "👑" },
  { id: "2-Column", label: "2-Column", emoji: "📑" },
  { id: "Photo", label: "Photo CV", emoji: "📷" },
  { id: "Popular", label: "Popular", emoji: "⭐" },
  { id: "Classic", label: "Classic", emoji: "🏛️" },
  { id: "Modern", label: "Modern", emoji: "✨" },
  { id: "Minimal", label: "Minimal", emoji: "◻️" },
  { id: "Fresher", label: "Fresher", emoji: "🎓" },
  { id: "Student", label: "Student", emoji: "📚" },
  { id: "Tech", label: "Tech", emoji: "💻" },
  { id: "Data", label: "Data", emoji: "📊" },
  { id: "Business", label: "Business", emoji: "💼" },
  { id: "Finance", label: "Finance", emoji: "💰" },
  { id: "Marketing", label: "Marketing", emoji: "📣" },
  { id: "Management", label: "Management", emoji: "👔" },
];

// ─── Template recommendation engine ──────────────────────────────────────────
export function recommendTemplates(targetJobTitle?: string, experienceLevel?: string): TemplateConfig[] {
  if (!targetJobTitle) return ALL_TEMPLATES.slice(0, 3);

  const title = targetJobTitle.toLowerCase();
  const scored = ALL_TEMPLATES.map((tmpl) => {
    let score = 0;
    const bestForStr = tmpl.bestFor.join(" ").toLowerCase();
    const nameStr = tmpl.name.toLowerCase();
    const catStr = tmpl.category.join(" ").toLowerCase();

    // Keyword matching
    const keywords = title.split(" ");
    keywords.forEach((kw) => {
      if (bestForStr.includes(kw)) score += 3;
      if (nameStr.includes(kw)) score += 5;
      if (catStr.includes(kw)) score += 2;
    });

    // Experience level matching
    if (experienceLevel === "fresher" && tmpl.category.includes("Fresher")) score += 10;
    if (experienceLevel === "student" && tmpl.category.includes("Student")) score += 10;
    if (experienceLevel === "senior" && tmpl.id.includes("executive")) score += 5;

    // Popular templates get a baseline score
    if (tmpl.category.includes("Popular")) score += 1;

    return { tmpl, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.tmpl);
}

// ─── Get template by ID ───────────────────────────────────────────────────────
export function getTemplateById(id: string): TemplateConfig | undefined {
  return ALL_TEMPLATES.find((t) => t.id === id);
}

// ─── Filter templates ─────────────────────────────────────────────────────────
export function filterTemplates(
  category: string,
  searchQuery?: string
): TemplateConfig[] {
  let results = ALL_TEMPLATES;

  if (category && category !== "All") {
    results = results.filter((t) => t.category.includes(category));
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.bestFor.join(" ").toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }

  return results;
}
