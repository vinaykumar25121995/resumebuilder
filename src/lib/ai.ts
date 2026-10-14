import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const model = "gemini-2.5-flash";

export async function analyzeJobDescription(jobDescription: string) {
  const response = await ai.models.generateContent({
    model,
    contents: `You are an expert ATS resume consultant. Analyze this job description and extract all relevant information in the exact JSON format requested. Be thorough and precise.

Job Description:
${jobDescription}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          jobTitle: { type: Type.STRING },
          company: { type: Type.STRING },
          requiredQualifications: { type: Type.ARRAY, items: { type: Type.STRING } },
          preferredQualifications: { type: Type.ARRAY, items: { type: Type.STRING } },
          technicalSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          softSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          tools: { type: Type.ARRAY, items: { type: Type.STRING } },
          educationRequirements: { type: Type.STRING },
          experienceYears: { type: Type.STRING },
          responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
          industryKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          priorityKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
          repeatedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["jobTitle", "technicalSkills", "softSkills", "priorityKeywords", "responsibilities"]
      }
    }
  });
  if (!response.text) throw new Error("Failed to analyze job description");
  return JSON.parse(response.text);
}

export async function calculateMatchScore(profile: any, jobAnalysis: any) {
  const profileSkillNames = profile.skills?.map((s: any) => s.name.toLowerCase()) || [];
  const profileText = JSON.stringify(profile).toLowerCase();
  
  const priorityKeywords: string[] = jobAnalysis.priorityKeywords || [];
  const technicalSkills: string[] = jobAnalysis.technicalSkills || [];
  const allJobSkills = [...new Set([...priorityKeywords, ...technicalSkills])].map(s => s.toLowerCase());
  
  const matchedKeywords = priorityKeywords.filter((kw: string) => profileText.includes(kw.toLowerCase()));
  const missingKeywords = priorityKeywords.filter((kw: string) => !profileText.includes(kw.toLowerCase()));
  
  const matchedSkills = allJobSkills.filter(s => profileSkillNames.some((ps: string) => ps.includes(s) || s.includes(ps)));
  const missingSkills = allJobSkills.filter(s => !profileSkillNames.some((ps: string) => ps.includes(s) || s.includes(ps)));
  
  const keywordMatch = priorityKeywords.length > 0 ? Math.round((matchedKeywords.length / priorityKeywords.length) * 100) : 0;
  const skillsMatch = allJobSkills.length > 0 ? Math.round((matchedSkills.length / allJobSkills.length) * 100) : 0;
  
  // Experience match - check if profile has experience relevant to the role
  const experienceMatch = profile.experiences?.length > 0 ? Math.min(100, 60 + (matchedKeywords.length * 5)) : 20;
  
  // Education match
  const educationMatch = profile.educations?.length > 0 ? 95 : 60;
  
  const overallScore = Math.round((keywordMatch * 0.35) + (skillsMatch * 0.30) + (experienceMatch * 0.20) + (educationMatch * 0.15));
  
  return {
    overallScore: Math.min(100, overallScore),
    keywordMatch: Math.min(100, keywordMatch),
    experienceMatch: Math.min(100, experienceMatch),
    skillsMatch: Math.min(100, skillsMatch),
    educationMatch: Math.min(100, educationMatch),
    matchedKeywords: matchedKeywords.slice(0, 15),
    missingKeywords: missingKeywords.slice(0, 10),
    relatedSkills: missingSkills.slice(0, 8)
  };
}

export async function tailorResume(profile: any, jobAnalysis: any) {
  const response = await ai.models.generateContent({
    model,
    contents: `You are an expert ATS Resume Optimizer with strict ethical guidelines.

CRITICAL ANTI-HALLUCINATION RULES (NEVER VIOLATE):
1. NEVER invent employment history, companies, job titles, or dates
2. NEVER invent degrees, institutions, certifications, or education details
3. NEVER invent projects, technologies, or skills the user doesn't have
4. NEVER fabricate metrics, numbers, or achievements
5. You MAY rewrite existing content for clarity and keyword optimization
6. You MAY reorder sections based on job relevance
7. You MAY improve grammar, action verbs, and ATS keyword alignment
8. Only use skills, experiences, and information EXPLICITLY present in the Master Profile

TASK: Tailor the Master Profile to match the Target Job Analysis.
- Rewrite the summary to highlight relevant skills from the profile
- Optimize experience bullets using action verbs and job keywords (only using facts that exist)
- Prioritize and reorder skills matching the job description first  
- Select most relevant projects for this job role
- Return complete tailored resume data

Master Profile:
${JSON.stringify(profile, null, 2)}

Target Job Analysis:
${JSON.stringify(jobAnalysis, null, 2)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          personalInfo: {
            type: Type.OBJECT,
            properties: {
              fullName: { type: Type.STRING },
              title: { type: Type.STRING },
              email: { type: Type.STRING },
              phone: { type: Type.STRING },
              location: { type: Type.STRING },
              linkedin: { type: Type.STRING },
              github: { type: Type.STRING },
              portfolio: { type: Type.STRING },
              photoUrl: { type: Type.STRING },
            }
          },
          summary: { type: Type.STRING },
          skills: {
            type: Type.OBJECT,
            properties: {
              technical: { type: Type.ARRAY, items: { type: Type.STRING } },
              tools: { type: Type.ARRAY, items: { type: Type.STRING } },
              concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
              soft: { type: Type.ARRAY, items: { type: Type.STRING } },
            }
          },
          experience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                company: { type: Type.STRING },
                date: { type: Type.STRING },
                location: { type: Type.STRING },
                bullets: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                tech: { type: Type.STRING },
                url: { type: Type.STRING },
              }
            }
          },
          education: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                degree: { type: Type.STRING },
                school: { type: Type.STRING },
                field: { type: Type.STRING },
                date: { type: Type.STRING },
                location: { type: Type.STRING },
                score: { type: Type.STRING },
              }
            }
          },
          certifications: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                issuer: { type: Type.STRING },
                date: { type: Type.STRING },
              }
            }
          },
          achievements: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
              }
            }
          },
          languages: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                proficiency: { type: Type.STRING },
              }
            }
          },
        },
        required: ["personalInfo", "summary", "experience", "skills", "education"]
      }
    }
  });
  if (!response.text) throw new Error("Failed to tailor resume");
  return JSON.parse(response.text);
}

export async function generateProfessionalSummary(profile: any, jobAnalysis: any) {
  const response = await ai.models.generateContent({
    model,
    contents: `You are an expert resume writer.

CRITICAL RULES:
- ONLY use skills, experience, and information explicitly present in the user's profile below
- NEVER invent metrics, companies, skills, or accomplishments
- Write in first-person implied (no "I" pronoun)
- Make it 3-4 sentences, ATS-friendly, keyword-rich based on the target job
- Generate exactly 3 different variations

User Profile:
${JSON.stringify(profile, null, 2)}

Target Job:
Title: ${jobAnalysis.jobTitle}
Priority Keywords: ${jobAnalysis.priorityKeywords?.join(", ")}
Key Skills Required: ${jobAnalysis.technicalSkills?.slice(0, 8).join(", ")}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          options: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["options"]
      }
    }
  });
  if (!response.text) throw new Error("Failed to generate summary");
  return JSON.parse(response.text);
}

export async function optimizeBulletPoints(originalBullet: string, jobKeywords: string[]) {
  const response = await ai.models.generateContent({
    model,
    contents: `You are an expert resume bullet point optimizer.

CRITICAL RULES:
- NEVER invent metrics, numbers, or technologies not in the original bullet
- NEVER add companies, skills, or experiences not mentioned
- Structure: Action Verb + Task + Tool/Method + Result/Impact
- Keep to 1-2 sentences maximum
- Generate exactly 2 improved variations

Original Bullet: "${originalBullet}"
Target Job Keywords: ${jobKeywords.join(", ")}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          options: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["options"]
      }
    }
  });
  if (!response.text) throw new Error("Failed to optimize bullet");
  return JSON.parse(response.text);
}

export async function runATSCheck(resumeData: any, jobAnalysis: any | null) {
  const hasContact = !!(resumeData.personalInfo?.email && resumeData.personalInfo?.phone);
  const hasEducation = resumeData.education?.length > 0;
  const hasExperience = resumeData.experience?.length > 0;
  const hasSkills = resumeData.skills?.technical?.length > 0 || resumeData.skills?.tools?.length > 0;
  const hasSummary = !!(resumeData.summary && resumeData.summary.length > 50);
  
  const priorityKeywords = jobAnalysis?.priorityKeywords || [];
  const resumeText = JSON.stringify(resumeData).toLowerCase();
  
  const matchedKeywords = priorityKeywords.filter((kw: string) => resumeText.includes(kw.toLowerCase()));
  const missingKeywords = priorityKeywords.filter((kw: string) => !resumeText.includes(kw.toLowerCase()));
  const keywordScore = priorityKeywords.length > 0 ? Math.round((matchedKeywords.length / priorityKeywords.length) * 100) : 85;
  
  const contactScore = hasContact ? 100 : 30;
  const summaryScore = hasSummary ? (keywordScore > 70 ? 95 : 75) : 40;
  const skillsScore = hasSkills ? Math.min(100, 60 + keywordScore * 0.4) : 30;
  const experienceScore = hasExperience ? Math.min(100, 70 + (resumeData.experience?.reduce((acc: number, exp: any) => acc + (exp.bullets?.length || 0), 0) * 3)) : 30;
  const educationScore = hasEducation ? 95 : 50;
  const projectsScore = resumeData.projects?.length > 0 ? Math.min(100, 70 + resumeData.projects.length * 5) : 60;
  const formattingScore = 100; // Template is always ATS-friendly
  const readabilityScore = hasSummary && hasContact ? 95 : 70;
  
  const overallScore = Math.round(
    contactScore * 0.1 +
    summaryScore * 0.15 +
    skillsScore * 0.15 +
    experienceScore * 0.20 +
    educationScore * 0.15 +
    projectsScore * 0.10 +
    keywordScore * 0.10 +
    formattingScore * 0.025 +
    readabilityScore * 0.025
  );
  
  const problems: string[] = [];
  const recommendations: string[] = [];
  
  if (!hasContact) { problems.push("Contact information (email/phone) is incomplete."); recommendations.push("Add your email and phone number to the contact section."); }
  if (!hasSummary) { problems.push("Professional summary is missing or too short."); recommendations.push("Add a 3-4 sentence professional summary with target keywords."); }
  if (!hasSkills) { problems.push("Skills section is empty or missing."); recommendations.push("Add your technical skills and tools."); }
  if (!hasExperience) { problems.push("Work experience section is missing."); recommendations.push("Add your work experience with bullet points."); }
  if (!hasEducation) { problems.push("Education section is incomplete."); recommendations.push("Add your education with degree, institution, and graduation date."); }
  if (missingKeywords.length > 0) { problems.push(`${missingKeywords.length} important keywords from the job description are missing.`); recommendations.push(`Add these keywords where truthfully applicable: ${missingKeywords.slice(0, 5).join(", ")}`); }
  if (hasExperience && experienceScore < 80) { problems.push("Work experience bullets lack detailed results or relevant keywords."); recommendations.push("Enhance experience bullets with action verbs and relevant tools."); }
  
  return {
    overallScore: Math.min(100, Math.max(0, overallScore)),
    breakdown: {
      contactInfo: contactScore,
      summary: summaryScore,
      skills: Math.round(skillsScore),
      experience: Math.round(experienceScore),
      education: educationScore,
      projects: projectsScore,
      keywords: keywordScore,
      formatting: formattingScore,
      readability: readabilityScore,
    },
    problems,
    recommendations,
    checks: {
      atsReadable: true,
      contactDetected: hasContact,
      educationDetected: hasEducation,
      experienceDetected: hasExperience,
      skillsDetected: hasSkills,
      summaryDetected: hasSummary,
      keywordsAnalyzed: priorityKeywords.length > 0,
      standardHeadings: true,
      noImageText: true,
    },
    matchedKeywords,
    missingKeywords,
  };
}

export async function analyzeSkillsGap(profileSkills: string[], jobRequiredSkills: string[]) {
  const profileSkillsLower = profileSkills.map(s => s.toLowerCase());
  const matched: string[] = [];
  const missing: string[] = [];
  
  for (const skill of jobRequiredSkills) {
    const skillLower = skill.toLowerCase();
    if (profileSkillsLower.some(ps => ps.includes(skillLower) || skillLower.includes(ps))) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  }
  
  // Related skills: common adjacent technologies
  const relatedMap: Record<string, string[]> = {
    'sql': ['postgresql', 'mysql', 'nosql', 'database design'],
    'python': ['pandas', 'numpy', 'scikit-learn', 'jupyter'],
    'tableau': ['power bi', 'looker', 'data visualization', 'dashboards'],
    'excel': ['google sheets', 'spreadsheets', 'pivot tables'],
    'machine learning': ['deep learning', 'nlp', 'ai', 'scikit-learn'],
  };
  
  const related = new Set<string>();
  for (const matchedSkill of matched) {
    const adjacentSkills = relatedMap[matchedSkill.toLowerCase()];
    if (adjacentSkills) {
      adjacentSkills.forEach(s => {
        if (!profileSkillsLower.includes(s) && !missing.includes(s)) {
          related.add(s);
        }
      });
    }
  }
  
  return {
    matched,
    missing,
    related: Array.from(related)
  };
}
