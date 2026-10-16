import { ResumeData } from "@/components/ResumeTemplateRenderer";

/**
 * Converts a raw User Profile from the database into the structured ResumeData
 * format used by ResumeTemplateRenderer and Resume Editor.
 */
export function convertProfileToResumeData(profile: any, user?: any): ResumeData {
  if (!profile) {
    return {
      personalInfo: {
        fullName: user?.name || "Your Name",
        email: user?.email || "",
      },
      summary: "",
      skills: { technical: [], tools: [], concepts: [], soft: [] },
      experience: [],
      education: [],
      projects: [],
      certifications: [],
      achievements: [],
      languages: [],
    };
  }

  // Location string
  const locationParts = [profile.city, profile.state, profile.country].filter(Boolean);
  const location = locationParts.join(", ");

  // Parse skills into categorized buckets
  const rawSkills: Array<{ name: string; category?: string | null }> = profile.skills || [];
  const technical: string[] = [];
  const tools: string[] = [];
  const concepts: string[] = [];
  const soft: string[] = [];

  rawSkills.forEach((s) => {
    const name = s.name.trim();
    const cat = (s.category || "").toLowerCase();
    if (cat.includes("soft") || cat.includes("interpersonal")) {
      soft.push(name);
    } else if (cat.includes("tool") || cat.includes("software")) {
      tools.push(name);
    } else if (cat.includes("concept") || cat.includes("method")) {
      concepts.push(name);
    } else {
      technical.push(name);
    }
  });

  // Convert experiences
  const experience = (profile.experiences || []).map((exp: any, idx: number) => {
    // Split multiline responsibilities into bullet points
    let bullets: string[] = [];
    if (exp.responsibilities) {
      bullets = exp.responsibilities
        .split("\n")
        .map((line: string) => line.replace(/^[•\-\*\s]+/, "").trim())
        .filter((line: string) => line.length > 0);
    }

    const startDate = exp.startDate || "";
    const endDate = exp.endDate || (startDate ? "Present" : "");
    const dateRange = [startDate, endDate].filter(Boolean).join(" – ");

    return {
      id: exp.id || `exp-${idx}`,
      title: exp.jobTitle || "",
      company: exp.company || "",
      date: dateRange,
      location: exp.location || "",
      bullets,
    };
  });

  // Convert educations
  const education = (profile.educations || []).map((edu: any, idx: number) => {
    const startDate = edu.startDate || "";
    const endDate = edu.endDate || "";
    const dateRange = [startDate, endDate].filter(Boolean).join(" – ");

    return {
      id: edu.id || `edu-${idx}`,
      degree: edu.degree || "",
      school: edu.institution || "",
      field: edu.fieldOfStudy || "",
      date: dateRange,
      location: edu.location || "",
      score: edu.score || "",
    };
  });

  // Convert projects
  const projects = (profile.projects || []).map((proj: any, idx: number) => {
    let bullets: string[] = [];
    if (Array.isArray(proj.bullets) && proj.bullets.length > 0) {
      bullets = proj.bullets;
    } else if (proj.description) {
      bullets = proj.description
        .split("\n")
        .map((line: string) => line.replace(/^[•\-\*\s]+/, "").trim())
        .filter((line: string) => line.length > 0);
    }
    return {
      id: proj.id || `proj-${idx}`,
      name: proj.name || "",
      description: proj.description || "",
      bullets: bullets.length > 0 ? bullets : (proj.description ? [proj.description] : []),
      tech: proj.technologies || "",
      url: proj.url || "",
    };
  });

  // Convert certifications
  const certifications = (profile.certifications || []).map((cert: any, idx: number) => ({
    id: cert.id || `cert-${idx}`,
    name: cert.name || "",
    issuer: cert.issuer || "",
    date: cert.date || "",
    url: cert.url || "",
  }));

  // Convert achievements
  const achievements = (profile.achievements || []).map((ach: any, idx: number) => ({
    id: ach.id || `ach-${idx}`,
    title: ach.title || "",
    description: ach.description || "",
  }));

  // Convert languages
  const languages = (profile.languages || []).map((lang: any) => ({
    name: lang.name || "",
    proficiency: lang.proficiency || "",
  }));

  return {
    personalInfo: {
      fullName: profile.userName || user?.name || "Your Name",
      title: profile.professionalTitle || "",
      email: profile.userEmail || user?.email || "",
      phone: profile.phone || "",
      location,
      linkedin: profile.linkedinUrl || "",
      github: profile.githubUrl || "",
      portfolio: profile.portfolioUrl || "",
      photoUrl: profile.photoUrl || user?.image || "",
      customLinks: (() => {
        if (!profile.customLinks) return [];
        if (Array.isArray(profile.customLinks)) return profile.customLinks;
        try { return JSON.parse(profile.customLinks); } catch { return []; }
      })(),
    },
    summary: profile.summary || "",
    skills: {
      technical: technical.length > 0 ? technical : ["Data Analysis", "SQL", "Python"],
      tools,
      concepts,
      soft,
    },
    experience,
    education,
    projects,
    certifications,
    achievements,
    languages,
  };
}
