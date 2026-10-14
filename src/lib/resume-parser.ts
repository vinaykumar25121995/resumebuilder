/**
 * Resume Parser Library
 * Handles PDF and DOCX text extraction + AI-powered structured parsing
 * Fully modular — AI provider can be swapped without changing extraction logic
 */

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const model = "gemini-2.5-flash";

// ─── Text Extraction ──────────────────────────────────────────────────────────

export async function extractTextFromPDF(buffer: Buffer): Promise<{ text: string; pageCount: number; isImageBased: boolean }> {
  try {
    // Dynamic import to avoid build-time issues
    const pdfParseModule: any = await import("pdf-parse");
    const pdfParse = pdfParseModule.default || pdfParseModule;
    const result = await pdfParse(buffer);
    const text = result.text || "";
    const pageCount = result.numpages || 1;
    // Heuristic: if average chars per page < 100, likely image-based
    const avgCharsPerPage = text.length / Math.max(pageCount, 1);
    const isImageBased = avgCharsPerPage < 100;
    return { text: text.trim(), pageCount, isImageBased };
  } catch (err: any) {
    if (err?.message?.includes("password")) {
      throw new Error("PDF_PASSWORD_PROTECTED");
    }
    throw new Error(`PDF_PARSE_FAILED: ${err?.message}`);
  }
}

export async function extractTextFromDOCX(buffer: Buffer): Promise<{ text: string }> {
  try {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return { text: result.value.trim() };
  } catch (err: any) {
    throw new Error(`DOCX_PARSE_FAILED: ${err?.message}`);
  }
}

// ─── Section Normalization ────────────────────────────────────────────────────

const SECTION_ALIASES: Record<string, string> = {
  // Experience
  "work experience": "EXPERIENCE",
  "professional experience": "EXPERIENCE",
  "employment history": "EXPERIENCE",
  "work history": "EXPERIENCE",
  "experience": "EXPERIENCE",
  "internships": "EXPERIENCE",
  "internship experience": "EXPERIENCE",
  "career history": "EXPERIENCE",
  "relevant experience": "EXPERIENCE",
  // Education
  "education": "EDUCATION",
  "academic background": "EDUCATION",
  "educational background": "EDUCATION",
  "academic qualifications": "EDUCATION",
  "qualifications": "EDUCATION",
  "academic history": "EDUCATION",
  // Skills
  "skills": "SKILLS",
  "technical skills": "SKILLS",
  "core skills": "SKILLS",
  "key skills": "SKILLS",
  "competencies": "SKILLS",
  "technologies": "SKILLS",
  "tools & technologies": "SKILLS",
  "technical expertise": "SKILLS",
  "areas of expertise": "SKILLS",
  // Projects
  "projects": "PROJECTS",
  "academic projects": "PROJECTS",
  "personal projects": "PROJECTS",
  "key projects": "PROJECTS",
  "selected projects": "PROJECTS",
  "project work": "PROJECTS",
  // Certifications
  "certifications": "CERTIFICATIONS",
  "certificates": "CERTIFICATIONS",
  "courses": "CERTIFICATIONS",
  "training": "CERTIFICATIONS",
  "professional development": "CERTIFICATIONS",
  "licenses & certifications": "CERTIFICATIONS",
  // Summary
  "professional summary": "SUMMARY",
  "summary": "SUMMARY",
  "career objective": "SUMMARY",
  "objective": "SUMMARY",
  "profile": "SUMMARY",
  "career profile": "SUMMARY",
  "professional profile": "SUMMARY",
  "about me": "SUMMARY",
  // Achievements
  "achievements": "ACHIEVEMENTS",
  "awards": "ACHIEVEMENTS",
  "honors": "ACHIEVEMENTS",
  "accomplishments": "ACHIEVEMENTS",
  "awards & honors": "ACHIEVEMENTS",
  // Languages
  "languages": "LANGUAGES",
  "language skills": "LANGUAGES",
  // Contact
  "contact": "CONTACT",
  "contact information": "CONTACT",
  "personal information": "CONTACT",
  "personal details": "CONTACT",
};

// ─── AI-Powered Structured Extraction ────────────────────────────────────────

export interface ExtractedProfile {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;
    otherLinks: string[];
    confidence: "HIGH" | "MEDIUM" | "LOW";
  };
  summary: string;
  experiences: Array<{
    company: string;
    jobTitle: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
    technologies: string;
    confidence: "HIGH" | "MEDIUM" | "LOW";
  }>;
  educations: Array<{
    degree: string;
    institution: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    score: string;
    location: string;
    confidence: "HIGH" | "MEDIUM" | "LOW";
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    results: string;
    url: string;
    confidence: "HIGH" | "MEDIUM" | "LOW";
  }>;
  skills: Array<{
    name: string;
    category: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url: string;
    confidence: "HIGH" | "MEDIUM" | "LOW";
  }>;
  achievements: Array<{
    title: string;
    description: string;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  qualityScore: number;
  warnings: string[];
}

export async function parseResumeWithAI(rawText: string): Promise<ExtractedProfile> {
  const response = await ai.models.generateContent({
    model,
    contents: `You are an expert resume parser. Parse the following resume text and extract ALL information into a precisely structured JSON format.

CRITICAL RULES:
1. Extract ONLY information explicitly present in the resume text
2. NEVER invent or fabricate any data
3. If a field is unclear or absent, use an empty string ""
4. For dates, preserve the original format (e.g., "June 2022", "2020-2023", "Jan 2021")
5. For responsibilities/bullets, join multiple bullet points with " | " separator
6. Detect skills from ALL sections (experience, projects, summary, not just the skills section)
7. Deduplicate skills - if SQL appears multiple times, include it only once
8. Assign confidence: HIGH (clearly stated), MEDIUM (inferred with good evidence), LOW (uncertain)
9. Recognize phone numbers in various formats: +91-XXXXX, (XXX) XXX-XXXX, XXX.XXX.XXXX
10. Normalize LinkedIn URLs to just the full URL
11. For qualityScore: calculate 0-100 based on completeness (contact+edu+exp+skills+projects each worth 20 points)
12. Include warnings for fields with LOW confidence or missing critical info

Resume Text:
${rawText.substring(0, 15000)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          personalInfo: {
            type: Type.OBJECT,
            properties: {
              fullName: { type: Type.STRING },
              email: { type: Type.STRING },
              phone: { type: Type.STRING },
              city: { type: Type.STRING },
              state: { type: Type.STRING },
              country: { type: Type.STRING },
              linkedinUrl: { type: Type.STRING },
              githubUrl: { type: Type.STRING },
              portfolioUrl: { type: Type.STRING },
              otherLinks: { type: Type.ARRAY, items: { type: Type.STRING } },
              confidence: { type: Type.STRING },
            },
          },
          summary: { type: Type.STRING },
          experiences: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                company: { type: Type.STRING },
                jobTitle: { type: Type.STRING },
                location: { type: Type.STRING },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING },
                responsibilities: { type: Type.STRING },
                technologies: { type: Type.STRING },
                confidence: { type: Type.STRING },
              },
            },
          },
          educations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                degree: { type: Type.STRING },
                institution: { type: Type.STRING },
                fieldOfStudy: { type: Type.STRING },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING },
                score: { type: Type.STRING },
                location: { type: Type.STRING },
                confidence: { type: Type.STRING },
              },
            },
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                technologies: { type: Type.STRING },
                results: { type: Type.STRING },
                url: { type: Type.STRING },
                confidence: { type: Type.STRING },
              },
            },
          },
          skills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING },
              },
            },
          },
          certifications: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                issuer: { type: Type.STRING },
                date: { type: Type.STRING },
                url: { type: Type.STRING },
                confidence: { type: Type.STRING },
              },
            },
          },
          achievements: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
              },
            },
          },
          languages: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                proficiency: { type: Type.STRING },
              },
            },
          },
          qualityScore: { type: Type.NUMBER },
          warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["personalInfo", "experiences", "educations", "skills", "qualityScore"],
      },
    },
  });

  if (!response.text) throw new Error("AI extraction failed");
  return JSON.parse(response.text);
}

// ─── Conflict Detection ───────────────────────────────────────────────────────

export interface ConflictField {
  field: string;
  label: string;
  existing: string;
  incoming: string;
}

export function detectProfileConflicts(
  existingProfile: any,
  extractedProfile: ExtractedProfile
): ConflictField[] {
  const conflicts: ConflictField[] = [];

  const check = (field: string, label: string, existingVal: string, newVal: string) => {
    if (existingVal && newVal && existingVal.trim() !== newVal.trim()) {
      conflicts.push({ field, label, existing: existingVal.trim(), incoming: newVal.trim() });
    }
  };

  check("phone", "Phone Number", existingProfile.phone || "", extractedProfile.personalInfo.phone);
  check("city", "City", existingProfile.city || "", extractedProfile.personalInfo.city);
  check("linkedinUrl", "LinkedIn URL", existingProfile.linkedinUrl || "", extractedProfile.personalInfo.linkedinUrl);
  check("githubUrl", "GitHub URL", existingProfile.githubUrl || "", extractedProfile.personalInfo.githubUrl);
  check("summary", "Professional Summary", existingProfile.summary || "", extractedProfile.summary || "");

  return conflicts;
}
