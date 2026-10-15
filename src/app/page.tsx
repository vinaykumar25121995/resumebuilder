"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import FuturisticUniverseHero from "@/components/FuturisticUniverseHero";
import { 
  Sparkles, FileText, CheckCircle, ArrowRight, Target, Zap, Shield, BarChart3, 
  Download, Brain, Star, ChevronDown, ChevronUp, Users, Award, TrendingUp,
  BookOpen, Briefcase, GraduationCap, Mail, Clock, Send, Headphones, CreditCard, AlertCircle,
  MessageCircle, ExternalLink, Crown, Eye, Lock, X
} from "lucide-react";
import { ALL_TEMPLATES, TemplateConfig } from "@/lib/templates";
import ResumeTemplateRenderer from "@/components/ResumeTemplateRenderer";

const faqs = [
  { q: "What is an ATS and why does it matter?", a: "An Applicant Tracking System (ATS) is software used by employers to manage job applications. It scans resumes for keywords and formatting before a human ever sees them. A resume not optimized for ATS may be automatically filtered out, even if you're qualified." },
  { q: "Does this guarantee my resume will pass every ATS?", a: "No — and we don't claim that. Different ATS systems use different parsing algorithms. What we do is optimize your resume based on common ATS best practices: standard headings, machine-readable text, relevant keywords, and clean formatting. This significantly improves your chances." },
  { q: "Will the AI invent skills or experience I don't have?", a: "Never. Our AI strictly uses only the information in your profile. It can improve wording, reorder sections, and optimize keyword alignment — but it will never fabricate skills, companies, degrees, or metrics you don't possess." },
  { q: "Can I use one profile for multiple job applications?", a: "Yes — that's the core idea. You build your master profile once, then for each job, the AI tailors a separate resume version. Your master profile is never modified by the tailoring process." },
  { q: "What export formats are supported?", a: "You can download your tailored resume as a PDF with real selectable text (not an image scan), ensuring it remains machine-readable by ATS systems." },
];

const features = [
  { icon: Brain, title: "AI Job Tailoring", desc: "Paste a job description and our AI automatically reorganizes your existing profile to match the role's requirements." },
  { icon: Target, title: "ATS Score Engine", desc: "Get a detailed 0-100 ATS compatibility score with actionable recommendations for every section of your resume." },
  { icon: BarChart3, title: "Keyword Matcher", desc: "Identify matched and missing keywords from the job description before you apply." },
  { icon: Shield, title: "Anti-Hallucination AI", desc: "Our AI never invents skills, experience, or metrics. It only works with information you've provided." },
  { icon: FileText, title: "15+ ATS Templates", desc: "Choose from templates designed specifically for ATS parsing — no graphics, no images, only clean machine-readable text." },
  { icon: Zap, title: "Bullet Point Optimizer", desc: "One-click improvement of any experience bullet to use stronger action verbs and relevant keywords." },
];

const steps = [
  { num: "01", title: "Build Your Profile", desc: "Enter your complete career information once — experience, education, skills, projects, and certifications. This becomes your master resume database.", icon: Users },
  { num: "02", title: "Choose an ATS Template", desc: "Select from 15+ ATS-friendly templates. Each is designed for machine readability with standard fonts, headings, and bullet points.", icon: FileText },
  { num: "03", title: "Paste a Job Description", desc: "Found a job you want? Paste the description or URL. Our AI extracts all keywords, requirements, and priority skills.", icon: Briefcase },
  { num: "04", title: "Download Your Resume", desc: "Get a job-specific tailored resume with your ATS score. Download as PDF — ready to submit.", icon: Download },
];

const sampleLandingResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    title: "Lead Systems Architect & Engineer",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    portfolio: "alexjohnson.dev",
  },
  summary:
    "High-performing technology leader with 8+ years architecting enterprise distributed systems, microservices, and high-conversion ATS platforms with 99.9% uptime. Proven track record leading cross-functional teams.",
  skills: {
    technical: ["React", "Next.js", "TypeScript", "Node.js", "Python", "GraphQL", "PostgreSQL", "Docker", "AWS"],
    soft: ["Cross-functional Leadership", "Agile & Scrum", "Strategic Roadmaps", "Mentorship"],
    tools: ["Docker", "Git", "Kubernetes", "Figma", "Jira", "CI/CD"],
  },
  experience: [
    {
      title: "Lead Systems Architect",
      company: "Apex Global Technologies",
      date: "2021 – Present",
      location: "San Francisco, CA",
      bullets: [
        "Architected enterprise distributed platform serving over 1.8M active daily users with zero downtime.",
        "Spearheaded cloud migration to Next.js and microservices, reducing p99 response times by 42%.",
        "Mentored a team of 14 senior engineers and established standard CI/CD deployment pipelines."
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Starlight Digital Corp",
      date: "2018 – 2021",
      location: "Austin, TX",
      bullets: [
        "Engineered real-time analytics streaming pipelines processing 50M+ events daily.",
        "Collaborated with product leadership to build ATS-compatible document export features."
      ],
    },
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      school: "University of California, Berkeley",
      date: "2014 – 2018",
      location: "Berkeley, CA",
      score: "3.9 GPA",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect — Professional",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      name: "Certified Scrum Master (CSM)",
      issuer: "Scrum Alliance",
      date: "2022",
    },
  ],
};

function LandingMiniPreview({ template }: { template: TemplateConfig }) {
  if (template.id === "pro-catherine") {
    return (
      <div className="w-full h-48 bg-slate-950 border-b border-slate-800 flex items-center justify-center overflow-hidden select-none">
        <div className="bg-white shadow-xl rounded overflow-hidden flex" style={{ width: "135px", height: "175px", fontSize: "3px" }}>
          <div style={{ width: "35%", backgroundColor: "#1e293b", color: "#f8fafc", padding: "6px 4px", display: "flex", flexDirection: "column", gap: "2px" }}>
            <div style={{ fontSize: "3.5px", fontWeight: "bold", color: "#38bdf8", textTransform: "uppercase" }}>CONTACT</div>
            <div style={{ background: "rgba(255,255,255,0.08)", padding: "1px 2px", borderRadius: "2px", fontSize: "2.2px", color: "#e2e8f0" }}>✉ catherine@email</div>
            <div style={{ background: "rgba(255,255,255,0.08)", padding: "1px 2px", borderRadius: "2px", fontSize: "2.2px", color: "#e2e8f0" }}>✆ +1 (555) 0192</div>
            <div style={{ background: "rgba(255,255,255,0.08)", padding: "1px 2px", borderRadius: "2px", fontSize: "2.2px", color: "#e2e8f0" }}>⚲ Los Angeles, CA</div>
            <div style={{ fontSize: "3.5px", fontWeight: "bold", color: "#38bdf8", marginTop: "3px" }}>HARD SKILLS</div>
            <div style={{ fontSize: "2.3px", color: "#cbd5e1", lineHeight: "1.3" }}>
              • Maya & Blender<br/>• Rigging & Mocap<br/>• Unreal Engine
            </div>
            <div style={{ fontSize: "3.5px", fontWeight: "bold", color: "#38bdf8", marginTop: "3px" }}>SOFT SKILLS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1px" }}>
              <span style={{ background: "#334155", padding: "1px 2px", borderRadius: "1px", fontSize: "2px" }}>Storytelling</span>
              <span style={{ background: "#334155", padding: "1px 2px", borderRadius: "1px", fontSize: "2px" }}>Leadership</span>
            </div>
          </div>
          <div style={{ flex: 1, padding: "6px 5px", display: "flex", flexDirection: "column", gap: "2px" }}>
            <div style={{ fontSize: "5.5px", fontWeight: "900", color: "#0f172a", textTransform: "uppercase", lineHeight: "1.1" }}>Catherine Barnett</div>
            <div style={{ fontSize: "3.2px", color: "#0284c7", fontWeight: "bold", marginBottom: "2px" }}>3D Character Animator</div>
            <div style={{ fontSize: "2.3px", color: "#475569", lineHeight: "1.2", marginBottom: "3px" }}>
              Creative animator with 7+ years in feature film & AAA games specializing in lifelike movement.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "3.2px", fontWeight: "bold", color: "#0f172a" }}>
              <span style={{ background: "#0284c7", color: "#fff", width: "7px", height: "7px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "3px" }}>★</span>
              WORK EXPERIENCE
            </div>
            <div style={{ fontSize: "2.8px", fontWeight: "bold", color: "#1e293b" }}>Lead Animator</div>
            <div style={{ fontSize: "2.2px", color: "#0284c7", fontStyle: "italic" }}>Pixar Studios • 2021-Pres</div>
            <div style={{ fontSize: "2.1px", color: "#64748b" }}>• Directed key character sequences for feature film</div>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "pro-chris-flims") {
    return (
      <div className="w-full h-48 bg-stone-950 border-b border-stone-800 flex items-center justify-center overflow-hidden select-none">
        <div className="bg-white shadow-xl rounded overflow-hidden p-2.5 flex flex-col gap-1.5" style={{ width: "135px", height: "175px", fontSize: "3px" }}>
          <div>
            <div style={{ fontSize: "6.5px", fontWeight: "900", color: "#c84b31", letterSpacing: "0.2px" }}>CHRIS FLIMS</div>
            <div style={{ fontSize: "3.2px", fontWeight: "bold", color: "#374151" }}>Project Manager — Remote Agile Leader</div>
          </div>
          <div style={{ fontSize: "2.4px", color: "#4b5563", lineHeight: "1.2" }}>
            Results-driven Project Manager overseeing distributed global delivery teams with 98% on-time records.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", fontSize: "2.3px", color: "#6b7280", borderTop: "0.5px solid #e5e7eb", borderBottom: "0.5px solid #e5e7eb", padding: "1px 0" }}>
            <span>✉ chris.flims@email</span>
            <span>✆ +1 (555) 9021</span>
            <span>⚲ Austin, TX (Remote)</span>
            <span>🌐 linkedin.com/flims</span>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px", marginBottom: "1px" }}>
              <span style={{ color: "#c84b31", fontSize: "3.5px" }}>◈</span>
              <span style={{ fontSize: "3.4px", fontWeight: "bold", color: "#111827" }}>AREAS OF EXPERTISE</span>
              <div style={{ flex: 1, height: "0.5px", background: "#c84b31" }} />
              <div style={{ width: "2px", height: "2px", borderRadius: "50%", background: "#c84b31" }} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5px" }}>
              {["Scrum Agile", "Sprint Planning", "Jira & Confluence", "Budget P&L"].map((s, i) => (
                <span key={i} style={{ background: "#e2e8f0", color: "#1e293b", padding: "1px 2px", borderRadius: "1px", fontSize: "2px", fontWeight: "600" }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px", marginBottom: "1px" }}>
              <span style={{ color: "#c84b31", fontSize: "3.5px" }}>◈</span>
              <span style={{ fontSize: "3.4px", fontWeight: "bold", color: "#111827" }}>WORK EXPERIENCE</span>
              <div style={{ flex: 1, height: "0.5px", background: "#c84b31" }} />
              <div style={{ width: "2px", height: "2px", borderRadius: "50%", background: "#c84b31" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "2.8px", fontWeight: "bold" }}>
              <span>Senior Technical PM</span>
              <span style={{ color: "#6b7280", fontSize: "2.3px" }}>2020 – Present</span>
            </div>
            <div style={{ fontSize: "2.3px", color: "#c84b31", fontStyle: "italic" }}>Global Cloud Systems</div>
            <div style={{ fontSize: "2.2px", color: "#4b5563" }}>• Spearheaded remote team sprints with 0 blocker rate</div>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "pro-will-tribian") {
    return (
      <div className="w-full h-48 bg-slate-950 border-b border-slate-800 flex items-center justify-center overflow-hidden select-none">
        <div className="bg-white shadow-xl rounded overflow-hidden p-2 flex flex-col gap-1.5" style={{ width: "135px", height: "175px", fontSize: "3px" }}>
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "linear-gradient(135deg, #0891b2, #1e293b)", border: "1px solid #0891b2", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "5px", fontWeight: "bold", flexShrink: 0 }}>
              WT
            </div>
            <div>
              <div style={{ fontSize: "6px", fontWeight: "900", color: "#0f172a" }}>WILL TRIBIAN</div>
              <div style={{ fontSize: "3.2px", color: "#0891b2", fontWeight: "bold" }}>Theater Actor & Performer</div>
            </div>
          </div>
          <div style={{ background: "#1e293b", color: "#e2e8f0", padding: "2px 3px", borderRadius: "2px", fontSize: "2.4px", lineHeight: "1.2" }}>
            Dynamic stage actor trained in classical theater, voice projection, and improvisational performance.
          </div>
          <div style={{ background: "#0891b2", color: "#ffffff", padding: "2px 3px", borderRadius: "2px", fontSize: "2.3px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px" }}>
            <span>✉ will.tribian@email</span>
            <span>✆ +1 (555) 7731</span>
            <span>⚲ New York, NY</span>
            <span>🌐 willtribian.actor</span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <div style={{ flex: "1 1 58%" }}>
              <div style={{ fontSize: "3.4px", fontWeight: "bold", color: "#0f172a", borderBottom: "0.5px solid #0891b2", paddingBottom: "1px", marginBottom: "1px" }}>WORK EXPERIENCE</div>
              <div style={{ fontSize: "2.8px", fontWeight: "bold" }}>Lead Actor — Hamlet</div>
              <div style={{ fontSize: "2.3px", color: "#0891b2" }}>Broadway Playhouse | 2022</div>
              <div style={{ fontSize: "2.1px", color: "#475569" }}>• Performed 65 sold-out shows with acclaim</div>
            </div>
            <div style={{ flex: "1 1 42%" }}>
              <div style={{ fontSize: "3.4px", fontWeight: "bold", color: "#0f172a", borderBottom: "0.5px solid #0891b2", paddingBottom: "1px", marginBottom: "1px" }}>HARD SKILLS</div>
              <div style={{ fontSize: "2.3px", color: "#475569" }}>• Classical Shakespearian<br/>• Stage Combat<br/>• Baritone Vocalist</div>
              <div style={{ fontSize: "3.4px", fontWeight: "bold", color: "#0f172a", marginTop: "2px", borderBottom: "0.5px solid #0891b2", paddingBottom: "1px", marginBottom: "1px" }}>SOFT SKILLS</div>
              <span style={{ background: "#e2e8f0", padding: "1px 2px", borderRadius: "1px", fontSize: "2px" }}>Stage Presence</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "pro-amanda-smith") {
    return (
      <div className="w-full h-48 bg-zinc-950 border-b border-zinc-800 flex items-center justify-center overflow-hidden select-none">
        <div className="bg-white shadow-xl rounded overflow-hidden p-2 flex flex-col gap-1.5" style={{ width: "135px", height: "175px", fontSize: "3px" }}>
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            <div style={{ width: "17px", height: "19px", borderRadius: "2px", background: "linear-gradient(135deg, #71717a, #18181b)", border: "0.5px solid #cbd5e1", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "5px", fontWeight: "bold" }}>
              AS
            </div>
            <div>
              <div style={{ fontSize: "6px", fontWeight: "900", color: "#18181b" }}>AMANDA SMITH</div>
              <div style={{ fontSize: "3.2px", color: "#52525b", fontWeight: "bold" }}>Chief Information Officer (CIO)</div>
            </div>
          </div>
          <div style={{ fontSize: "2.4px", color: "#52525b", lineHeight: "1.2" }}>
            Visionary CIO guiding enterprise technology transformation, cybersecurity governance, and cloud architectures.
          </div>
          <div style={{ background: "#18181b", color: "#ffffff", padding: "2px 3px", borderRadius: "2px", fontSize: "2.3px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px" }}>
            <span>✉ amanda.smith@email</span>
            <span>✆ +1 (555) 4412</span>
            <span>⚲ Chicago, IL</span>
            <span>🌐 amandasmith.cio</span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <div style={{ flex: "1 1 55%" }}>
              <div style={{ fontSize: "3.4px", fontWeight: "bold", color: "#18181b", marginBottom: "1px" }}>▤ WORK EXPERIENCE</div>
              <div style={{ fontSize: "2.8px", fontWeight: "bold" }}>CIO & VP Technology</div>
              <div style={{ fontSize: "2.3px", color: "#52525b", fontStyle: "italic" }}>Pear Global Systems | 2018–Pres</div>
              <div style={{ fontSize: "2.1px", color: "#666" }}>• Scaled global cloud footprint across 12 datacenters</div>
            </div>
            <div style={{ flex: "1 1 45%" }}>
              <div style={{ fontSize: "3.4px", fontWeight: "bold", color: "#18181b", marginBottom: "1px" }}>▤ GENERAL SKILLS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", fontSize: "2.2px", color: "#444" }}>
                <span>Agile CI/CD</span><span>Multi-Cloud</span>
                <span>Security</span><span>Data Lakes</span>
              </div>
              <div style={{ fontSize: "3.4px", fontWeight: "bold", color: "#18181b", marginTop: "2px" }}>▤ CERTIFICATIONS</div>
              <div style={{ fontSize: "2.2px", color: "#555" }}>CISM Certified CIO</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const s = template.style;
  const isTwoColumn = s.layoutType?.includes("two-column");
  const accentHex = s.accentColor || "#2563eb";

  return (
    <div
      className="w-full h-48 bg-slate-900 border-b border-slate-800 flex items-center justify-center overflow-hidden select-none"
      style={{ fontFamily: s.fontFamily }}
    >
      <div
        className="bg-white shadow-xl rounded-sm overflow-hidden flex"
        style={{
          width: "135px",
          height: "175px",
          fontSize: "3.5px",
          lineHeight: "1.3",
          flexDirection:
            s.layoutType === "two-column-right-sidebar" ? "row-reverse" : "row",
        }}
      >
        {isTwoColumn ? (
          <>
            <div
              style={{
                width: s.sidebarWidth || "32%",
                backgroundColor: s.sidebarBgColor || "#f8fafc",
                color: s.sidebarTextColor || "#000",
                padding: "8px 5px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {s.hasPhoto && (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius:
                      s.photoStyle === "round"
                        ? "50%"
                        : s.photoStyle === "rounded"
                        ? "4px"
                        : "0",
                    backgroundColor: "#cbd5e1",
                    margin: "0 auto 3px auto",
                    border: `1px solid ${s.accentColor || "#fff"}`,
                  }}
                />
              )}
              <div>
                <div
                  style={{
                    fontSize: "5.5px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: s.sidebarTextColor || accentHex,
                    lineHeight: "1.1",
                  }}
                >
                  John Doe
                </div>
                <div style={{ fontSize: "3.2px", opacity: 0.9 }}>
                  Senior Analyst
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "3.5px",
                    fontWeight: "bold",
                    borderBottom: `0.5px solid ${s.sidebarTextColor || accentHex}`,
                    marginBottom: "2px",
                    color: s.sidebarTextColor || accentHex,
                  }}
                >
                  Contact
                </div>
                <div
                  style={{
                    fontSize: "2.5px",
                    opacity: 0.8,
                    lineHeight: "1.3",
                  }}
                >
                  Mumbai, India
                  <br />
                  john@example.com
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "3.5px",
                    fontWeight: "bold",
                    borderBottom: `0.5px solid ${s.sidebarTextColor || accentHex}`,
                    marginBottom: "2px",
                    color: s.sidebarTextColor || accentHex,
                  }}
                >
                  Skills
                </div>
                <div
                  style={{
                    fontSize: "2.5px",
                    opacity: 0.8,
                    lineHeight: "1.3",
                  }}
                >
                  SQL, Python, Tableau, Excel
                </div>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                padding: "8px 6px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "3.8px",
                    fontWeight: "bold",
                    textTransform:
                      s.headingCase === "uppercase" ? "uppercase" : "none",
                    color: accentHex,
                    borderBottom: s.showDividers
                      ? `0.5px solid ${accentHex}`
                      : "none",
                    marginBottom: "2px",
                  }}
                >
                  Summary
                </div>
                <div
                  style={{
                    fontSize: "2.6px",
                    color: "#555",
                    lineHeight: "1.2",
                  }}
                >
                  Experienced professional with proven domain track record in
                  analytics.
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "3.8px",
                    fontWeight: "bold",
                    textTransform:
                      s.headingCase === "uppercase" ? "uppercase" : "none",
                    color: accentHex,
                    borderBottom: s.showDividers
                      ? `0.5px solid ${accentHex}`
                      : "none",
                    marginBottom: "2px",
                  }}
                >
                  Experience
                </div>
                <div
                  style={{
                    fontSize: "3.2px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Senior Analyst
                </div>
                <div
                  style={{
                    fontSize: "2.6px",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
                  ABC Tech | 2022–Present
                </div>
                <div
                  style={{
                    fontSize: "2.4px",
                    color: "#555",
                    marginTop: "1px",
                  }}
                >
                  {s.bulletChar} Spearheaded business analytics & reporting
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              padding: "8px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div
              style={{
                textAlign: s.nameAlign,
                borderBottom: s.showDividers ? `1px solid ${accentHex}` : "none",
                paddingBottom: "3px",
                display: s.hasPhoto ? "flex" : "block",
                alignItems: "center",
                gap: "6px",
                flexDirection: s.nameAlign === "right" ? "row-reverse" : "row",
              }}
            >
              {s.hasPhoto && (
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius:
                      s.photoStyle === "round"
                        ? "50%"
                        : s.photoStyle === "rounded"
                        ? "3px"
                        : "0",
                    backgroundColor: "#cbd5e1",
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "6px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: accentHex,
                  }}
                >
                  John Doe
                </div>
                <div style={{ fontSize: "3.2px", color: "#666" }}>
                  Data Analyst
                </div>
                <div
                  style={{
                    fontSize: "2.5px",
                    color: "#888",
                    marginTop: "1px",
                  }}
                >
                  Mumbai, India • john@example.com
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "3.8px",
                  fontWeight: "bold",
                  textTransform:
                    s.headingCase === "uppercase" ? "uppercase" : "none",
                  color: accentHex,
                  borderBottom: s.showDividers
                    ? `0.5px solid ${accentHex}`
                    : "none",
                  paddingBottom: "1px",
                  marginBottom: "2px",
                }}
              >
                Summary
              </div>
              <div
                style={{
                  fontSize: "2.6px",
                  color: "#555",
                  lineHeight: "1.2",
                }}
              >
                Experienced data analyst specializing in reporting, dashboards,
                and business intelligence.
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "3.8px",
                  fontWeight: "bold",
                  textTransform:
                    s.headingCase === "uppercase" ? "uppercase" : "none",
                  color: accentHex,
                  borderBottom: s.showDividers
                    ? `0.5px solid ${accentHex}`
                    : "none",
                  paddingBottom: "1px",
                  marginBottom: "2px",
                }}
              >
                Experience
              </div>
              <div
                style={{
                  fontSize: "3.2px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Senior Analyst
              </div>
              <div
                style={{
                  fontSize: "2.6px",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                Global Tech | 2022–Present
              </div>
              <div
                style={{
                  fontSize: "2.4px",
                  color: "#555",
                  marginTop: "1px",
                }}
              >
                {s.bulletChar} Developed operational data pipelines
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "3.8px",
                  fontWeight: "bold",
                  textTransform:
                    s.headingCase === "uppercase" ? "uppercase" : "none",
                  color: accentHex,
                  borderBottom: s.showDividers
                    ? `0.5px solid ${accentHex}`
                    : "none",
                  paddingBottom: "1px",
                  marginBottom: "2px",
                }}
              >
                Skills
              </div>
              <div
                style={{
                  fontSize: "2.4px",
                  color: "#555",
                  lineHeight: "1.3",
                }}
              >
                SQL, Python, Power BI, Advanced Excel, Statistics
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const testimonials = [
  { name: "Priya S.", role: "Data Analyst, hired at a major tech firm", text: "I uploaded my resume and it scored 71 on the ATS check. After tailoring with this tool for a specific job description, it jumped to 93. I got an interview within a week.", rating: 5 },
  { name: "Rahul M.", role: "Software Engineer, recent graduate", text: "As a fresher, I had no idea what ATS even meant. This platform explained it clearly and helped me build a resume that actually got noticed. The keyword matching feature is incredible.", rating: 5 },
  { name: "Anjali K.", role: "Business Analyst transitioning careers", text: "The AI never fabricated anything — it just reorganized my existing experience to highlight what mattered for each job. I used it for 8 different applications and got 5 interviews.", rating: 5 },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [templateTab, setTemplateTab] = useState<"pro" | "twocolumn" | "standard" | "all">("pro");
  const [landingPreviewTemplate, setLandingPreviewTemplate] = useState<TemplateConfig | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);
    setContactSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit message.");
      setContactSubmitted(true);
      setContactForm({ name: "", email: "", subject: "General Inquiry", message: "" });
    } catch (err: any) {
      setContactError(err.message || "Something went wrong. Please email atsfriendlyresumes.admin@gmail.com directly.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#030612]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 text-white font-bold text-xl">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">ATS Resume Builder</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">How It Works</a>
              <a href="#features" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Features</a>
              <a href="#templates" className="text-slate-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5">
                <span>Templates</span>
                <span className="text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded-full leading-none">
                  4 PRO
                </span>
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Pricing</a>
              <a href="#contact" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Contact Us</a>
              <a href="#faq" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">FAQ</a>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/login" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Log in</Link>
              <Link href="/register" className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-md shadow-blue-500/20 border border-blue-400/30">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Futuristic Corporate Universe Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-[#030612] px-6 py-24 lg:py-36 min-h-[720px] flex items-center justify-center border-b border-white/10"
      >
        {/* Futuristic Corporate Universe Background: Space, Venus, 10 Tech Towers */}
        <FuturisticUniverseHero />

        {/* Floating Interactive Badge: Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0, y: [-4, 6, -4] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.4 },
            x: { duration: 0.8, delay: 0.4 },
            y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="hidden xl:flex absolute left-8 top-1/3 items-center gap-3 bg-slate-900/85 backdrop-blur-md px-4 py-3 rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-950/50 z-20 pointer-events-auto hover:scale-105 transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-cyan-400 border border-blue-400/30">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-white tracking-wide">ATS Match Score</span>
            </div>
            <p className="text-xs text-cyan-400 font-semibold tracking-wide">98% Compatibility</p>
          </div>
        </motion.div>

        {/* Dynamic High-Contrast Background Card for Hero Texts */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 mx-auto max-w-4xl text-center pointer-events-auto my-6"
        >
          {/* Animated Ambient Color Aura Behind the Card */}
          <div
            className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-indigo-500/30 rounded-3xl blur-2xl opacity-75 animate-pulse -z-10"
            style={{ animationDuration: "6s" }}
          />

          {/* Dynamic Frosted Glass Container */}
          <div className="relative rounded-3xl bg-slate-950/70 backdrop-blur-xl md:backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.85)] p-6 sm:p-10 md:p-12 overflow-hidden">
            {/* Subtle Top-Edge High-Tech Rim Light */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent shadow-[0_0_15px_#38bdf8]" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* AI Optimization Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="inline-flex items-center bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 backdrop-blur-md text-cyan-300 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              <Sparkles className="w-4 h-4 mr-2 text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} />
              AI-Powered ATS Optimization • Global Career Ready
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            >
              Build Once.<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                Tailor for Every Job.
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl text-slate-100 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              Create an ATS-friendly master resume, then automatically optimize it for every job description using AI.
              <span className="font-semibold text-white"> Stop rewriting manually.</span>
            </motion.p>

            {/* Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:from-blue-500 hover:to-indigo-500 hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_25px_rgba(37,99,235,0.5)] border border-blue-400/40 group"
              >
                BUILD MY RESUME
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/20 hover:border-white/50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
              >
                See How It Works
              </a>
            </motion.div>

            {/* Guarantee / Verification Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-200"
            >
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> No credit card required
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Free to start
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> ATS-Designed Templates
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { num: "15+", label: "ATS-Friendly Templates" },
            { num: "90%", label: "Average ATS Score Improvement" },
            { num: "100%", label: "Truthful — Never Fabricates" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-white">{stat.num}</p>
              <p className="text-blue-100 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">The Process</p>
            <h2 className="text-4xl font-bold text-gray-900">From Profile to Perfect Resume</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Four simple steps to generate a job-tailored ATS resume in minutes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-100 z-0 -translate-x-4"></div>}
                <div className="relative z-10 bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-4xl font-bold text-gray-900">Everything You Need to Get Noticed</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ATS Score Demo */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">ATS Score Engine</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Know Exactly Why Your Score Is What It Is</h2>
              <p className="text-gray-600 text-lg mb-8">Don't just get a number — get a complete breakdown with specific problems and actionable recommendations.</p>
              <div className="space-y-4">
                {[
                  { label: "Contact Information", score: 100, color: "bg-green-500" },
                  { label: "Professional Summary", score: 95, color: "bg-green-500" },
                  { label: "Work Experience", score: 90, color: "bg-green-500" },
                  { label: "Keyword Match", score: 82, color: "bg-yellow-500" },
                  { label: "Skills Alignment", score: 88, color: "bg-green-500" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{item.label}</span>
                      <span className="text-gray-500 font-semibold">{item.score}/100</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">
              <div className="text-center mb-8">
                <p className="text-blue-200 text-sm mb-2">Overall ATS Score</p>
                <p className="text-8xl font-bold">91</p>
                <p className="text-blue-200">/100</p>
                <p className="mt-2 text-green-300 font-semibold">✓ Excellent</p>
              </div>
              <div className="space-y-3">
                {[
                  "✓ ATS-readable format",
                  "✓ Contact information complete",
                  "✓ Standard section headings",
                  "✓ Keywords aligned with job",
                  "✓ No graphics or image text",
                ].map((check, i) => (
                  <p key={i} className="text-blue-100 text-sm">{check}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 👑 Templates Showcase */}
      <div id="templates" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-amber-300 mb-4 shadow-sm">
              <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>19+ ATS-SAFE RESUME TEMPLATES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Crafted for Real Jobs. Engineered for ATS.
            </h2>
            <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Featuring our <strong className="text-amber-300">4 New Premium Pro Templates</strong> (Catherine Barnett, Chris Flims, Will Tribian, Amanda Smith) alongside proven corporate layouts.
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
              <button
                onClick={() => setTemplateTab("pro")}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  templateTab === "pro"
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 scale-105"
                    : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700"
                }`}
              >
                <Crown className="w-3.5 h-3.5 fill-current" />
                <span>👑 Premium Pro Collection (4)</span>
              </button>
              <button
                onClick={() => setTemplateTab("twocolumn")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  templateTab === "twocolumn"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 scale-105"
                    : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700"
                }`}
              >
                <span>📑 2-Column & Photo (5)</span>
              </button>
              <button
                onClick={() => setTemplateTab("standard")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  templateTab === "standard"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Standard ATS Templates (40)</span>
              </button>
              <button
                onClick={() => setTemplateTab("all")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  templateTab === "all"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700"
                }`}
              >
                <span>All Templates ({ALL_TEMPLATES.length})</span>
              </button>
            </div>
          </div>

          {/* Template Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(templateTab === "pro"
              ? ALL_TEMPLATES.filter((t) => t.isPro)
              : templateTab === "twocolumn"
              ? ALL_TEMPLATES.filter((t) => t.number >= 45 && t.number <= 49)
              : templateTab === "standard"
              ? ALL_TEMPLATES.filter((t) => !t.isPro)
              : ALL_TEMPLATES
            ).map((tmpl) => (
              <div
                key={tmpl.id}
                className={`bg-slate-800/90 rounded-2xl border overflow-hidden hover:shadow-2xl transition-all duration-200 flex flex-col justify-between group ${
                  tmpl.isPro
                    ? "border-amber-500/50 hover:border-amber-400 shadow-amber-500/5"
                    : "border-slate-700 hover:border-blue-500"
                }`}
              >
                {/* Visual Preview */}
                <div className="relative">
                  <LandingMiniPreview template={tmpl} />

                  {tmpl.isPro && (
                    <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-amber-300/40">
                      <Crown className="w-3 h-3 text-amber-200 fill-amber-200" />
                      <span>PRO EXCLUSIVE</span>
                    </div>
                  )}

                  <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                    ATS {tmpl.atsScore}%
                  </div>

                  <div className="absolute bottom-2 left-2 bg-slate-950/85 backdrop-blur-sm text-cyan-300 text-[10px] font-mono font-black px-2 py-0.5 rounded-md border border-cyan-500/30 shadow">
                    Template #{String(tmpl.number || 0).padStart(2, "0")}
                  </div>
                </div>

                {/* Information */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border ${
                        tmpl.isPro
                          ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                          : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                      }`}>
                        Template #{String(tmpl.number || 0).padStart(2, "0")}
                      </span>
                      {tmpl.isPro && (
                        <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5">
                          <Crown className="w-2.5 h-2.5 fill-current" /> Pro
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-white text-sm group-hover:text-amber-300 transition-colors">
                      {tmpl.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {tmpl.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {tmpl.bestFor.slice(0, 2).map((b, bi) => (
                        <span
                          key={bi}
                          className="text-[10px] bg-slate-900/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 mt-3 border-t border-slate-700/60 flex items-center gap-2">
                    <button
                      onClick={() => setLandingPreviewTemplate(tmpl)}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-700/60 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                    <Link
                      href={`/register?template=${tmpl.id}`}
                      className={`flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                        tmpl.isPro
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 shadow-md shadow-amber-500/20"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {tmpl.isPro ? (
                        <>
                          <Crown className="w-3 h-3 fill-current" />
                          <span>Use (Pro)</span>
                        </>
                      ) : (
                        <span>Use Template</span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Link to Full Public Directory */}
          <div className="text-center mt-12">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
            >
              <span>Explore All {ALL_TEMPLATES.length} Templates In Full Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 👑 Landing Page Live Preview Modal */}
      {landingPreviewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl text-white ${
                    landingPreviewTemplate.isPro
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950"
                      : "bg-blue-600"
                  }`}
                >
                  {landingPreviewTemplate.isPro ? (
                    <Crown className="w-5 h-5 fill-current" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      Template #{String(landingPreviewTemplate.number || 0).padStart(2, "0")}
                    </span>
                    <h3 className="font-bold text-white text-base">
                      {landingPreviewTemplate.name}
                    </h3>
                    {landingPreviewTemplate.isPro && (
                      <span className="text-[10px] font-extrabold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                        PRO EXCLUSIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    High-resolution ATS Preview • Compatibility:{" "}
                    <span className="text-emerald-400 font-bold">
                      {landingPreviewTemplate.atsScore}%
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/register?template=${landingPreviewTemplate.id}`}
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Use This Template Now</span>
                </Link>
                <button
                  onClick={() => setLandingPreviewTemplate(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: A4 Paper Preview */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-950 flex justify-center">
              <div
                className="bg-white shadow-2xl rounded-sm"
                style={{ width: "210mm", minHeight: "297mm" }}
              >
                <ResumeTemplateRenderer
                  template={landingPreviewTemplate}
                  data={sampleLandingResumeData}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Trusted by Job Seekers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 border border-blue-100">
              <CreditCard className="w-3.5 h-3.5 mr-1.5" />
              100% Transparent • No Hidden Fees
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Start free with no credit card required. Upgrade whenever you need unlimited job analyses, Word DOCX export, or team seats.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="mt-8 inline-flex items-center bg-gray-100 p-1.5 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  billingCycle === "monthly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  billingCycle === "annual"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>Annual Billing</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  billingCycle === "annual" ? "bg-white text-blue-700" : "bg-green-100 text-green-700"
                }`}>
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Free Tier */}
            <div className="rounded-2xl p-8 bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Free</h3>
                <p className="text-xs text-gray-500 mb-4">Perfect for getting started with standard ATS resumes.</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-sm text-gray-500 ml-1">forever</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "1 Master Career Profile",
                    "3 ATS-Friendly Templates",
                    "5 Job Analyses per month",
                    "A4 & Standard PDF Download",
                    "Basic ATS Score Breakdown",
                    "No Credit Card Required",
                  ].map((f, j) => (
                    <li key={j} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2.5 flex-shrink-0 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/register"
                className="block text-center py-3 px-6 rounded-xl font-semibold bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors shadow-sm"
              >
                Start Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="rounded-2xl p-8 bg-blue-600 text-white shadow-2xl shadow-blue-600/30 md:scale-105 flex flex-col justify-between relative border border-blue-500">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Most Popular
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
                <p className="text-xs text-blue-100 mb-4">Complete suite for serious job seekers and career transitions.</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    {billingCycle === "annual" ? "$9.60" : "$12"}
                  </span>
                  <span className="text-sm text-blue-200 ml-1">
                    {billingCycle === "annual" ? "/month (billed annually)" : "/month"}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "1 Master Profile (Unlimited edits)",
                    "All 15+ ATS-Optimized Templates",
                    "Unlimited Job Description Analyses",
                    "Both PDF & Word (.docx) Downloads",
                    "Full 0-100 ATS Scoring Engine",
                    "AI Bullet Optimizer & Verb Refiner",
                    "AI Summary Generator (3 variations)",
                    "Application Pipeline & Job Tracker",
                    "All Page Sizes: A4, Letter, Legal & Custom",
                    "Selective Highlighter & Row Font Sizes",
                  ].map((f, j) => (
                    <li key={j} className="flex items-center text-sm text-blue-50">
                      <CheckCircle className="w-4 h-4 mr-2.5 flex-shrink-0 text-emerald-300" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/register?plan=pro"
                className="block text-center py-3.5 px-6 rounded-xl font-bold bg-white text-blue-600 hover:bg-blue-50 transition-colors shadow-md"
              >
                Get Pro — 1-Click Upgrade
              </Link>
            </div>

            {/* Teams Tier */}
            <div className="rounded-2xl p-8 bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Teams / Enterprise</h3>
                <p className="text-xs text-gray-500 mb-4">For university career centers, recruiting agencies & teams.</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    {billingCycle === "annual" ? "$23.20" : "$29"}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    {billingCycle === "annual" ? "/seat/mo (billed annually)" : "/seat/month"}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Everything in Pro for all users",
                    "5 Team Seats included (expandable)",
                    "Shared Company Template Library",
                    "Centralized Billing & Invoicing",
                    "Priority AI Processing Bandwidth",
                    "Dedicated Account Manager",
                    "99.9% Uptime SLA",
                    "Direct Email & Phone Support",
                  ].map((f, j) => (
                    <li key={j} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2.5 flex-shrink-0 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                onClick={() =>
                  setContactForm((prev) => ({
                    ...prev,
                    subject: "Enterprise & Team Plans",
                  }))
                }
                className="block text-center py-3 px-6 rounded-xl font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-sm"
              >
                Contact Us / Get Quote
              </a>
            </div>
          </div>

          {/* Pricing Transparency Guarantees */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-t border-gray-100 pt-10">
            <div>
              <p className="font-bold text-gray-900 text-sm">No Hidden Fees</p>
              <p className="text-xs text-gray-500 mt-1">What you see is exactly what you pay. No activation or export charges.</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Cancel With 1 Click</p>
              <p className="text-xs text-gray-500 mt-1">Easily cancel or pause your subscription anytime directly in account settings.</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">100% Truthful AI</p>
              <p className="text-xs text-gray-500 mt-1">AI never invents fake metrics or companies. Your career credibility is paramount.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact Us Section ── */}
      <div id="contact" className="py-24 bg-gray-50 border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 border border-blue-100">
              <Headphones className="w-3.5 h-3.5 mr-1.5" />
              Dedicated Support & Inquiries
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Questions about our platform, transparent pricing, custom team licenses, or need ATS assistance? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-5">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  Direct Contact Information
                </h3>

                <div className="space-y-4">
                  {/* General Support */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Support & General</p>
                      <a
                        href="mailto:atsfriendlyresumes.admin@gmail.com"
                        className="text-sm font-semibold text-blue-600 hover:underline break-all"
                      >
                        atsfriendlyresumes.admin@gmail.com
                      </a>
                      <p className="text-xs text-gray-400 mt-0.5">Resume formatting, ATS scoring & troubleshooting</p>
                    </div>
                  </div>

                  {/* WhatsApp Channel Help Desk */}
                  <div className="flex items-start gap-3 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-emerald-900 uppercase">WhatsApp Help Desk</p>
                        <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-bold px-1.5 py-0.5 rounded">
                          Official
                        </span>
                      </div>
                      <a
                        href="https://whatsapp.com/channel/0029VbEHAMkADTO9BaH0Mh2O"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1 mt-1"
                      >
                        Join WhatsApp Channel <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-[11px] text-emerald-700/80 mt-0.5 leading-snug">
                        Instant announcements, resume assistance & live community updates
                      </p>
                    </div>
                  </div>

                  {/* Sales & Billing */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Sales & Billing</p>
                      <a
                        href="mailto:atsfriendlyresumes.admin@gmail.com"
                        className="text-sm font-semibold text-purple-600 hover:underline break-all"
                      >
                        atsfriendlyresumes.admin@gmail.com
                      </a>
                      <p className="text-xs text-gray-400 mt-0.5">Custom plans, invoices & subscriptions</p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Response Time</p>
                      <p className="text-sm font-bold text-gray-900">Under 24 Hours Guaranteed</p>
                      <p className="text-xs text-gray-400 mt-0.5">Usually within 2 hours during 9:00 AM – 6:00 PM EST, Mon–Fri</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Link Card */}
              <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-5 text-sm text-blue-950">
                <p className="font-semibold mb-1">Looking for our dedicated support center?</p>
                <p className="text-xs text-blue-800 mb-3">Visit our full contact page with in-depth resources.</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-xs font-bold text-blue-700 bg-white px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  Visit Dedicated Contact Page <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Send a Message Directly</h3>
                <p className="text-xs text-gray-500 mb-5">
                  We'll reply to your email address promptly.
                </p>

                {contactSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center space-y-3">
                    <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
                    <h4 className="text-base font-bold text-green-900">Message Received!</h4>
                    <p className="text-xs text-green-700 max-w-sm mx-auto">
                      Thank you! Our support team has received your message and will reach out to your email within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setContactSubmitted(false)}
                      className="text-xs font-semibold text-green-800 underline hover:text-green-950 pt-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {contactError && (
                      <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{contactError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg text-xs px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-900"
                          placeholder="Jane Doe"
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg text-xs px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-900"
                          placeholder="jane@example.com"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Topic / Subject
                      </label>
                      <select
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg text-xs px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-900"
                        value={contactForm.subject}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, subject: e.target.value })
                        }
                      >
                        <option value="Enterprise & Team Plans">Enterprise & Team Plans</option>
                        <option value="Transparent Pricing & Billing">Transparent Pricing & Billing</option>
                        <option value="General Inquiry">General Platform Inquiry</option>
                        <option value="Technical Support">Technical Support / ATS Help</option>
                        <option value="Feature Request">Feature Request</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg text-xs px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-900"
                        placeholder="How can we help you?"
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, message: e.target.value })
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full bg-blue-600 text-white text-xs font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {contactSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Message to Support</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Noticed?</h2>
          <p className="text-blue-100 text-lg mb-10">Build your master resume once. Tailor it for every job in minutes.</p>
          <Link href="/register" className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition-colors">
            Start Building — It's Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 text-white font-bold text-lg mb-4">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span>ATS Resume Builder</span>
              </div>
              <p className="text-sm">Build once. Tailor for every job. Get noticed by ATS.</p>
              <div className="mt-4 text-xs space-y-1.5">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:atsfriendlyresumes.admin@gmail.com"
                    className="text-blue-400 hover:underline break-all"
                  >
                    atsfriendlyresumes.admin@gmail.com
                  </a>
                </p>
                <p>
                  Help Desk:{" "}
                  <a
                    href="https://whatsapp.com/channel/0029VbEHAMkADTO9BaH0Mh2O"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    WhatsApp Channel <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#templates" className="hover:text-white">Templates</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources & Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
                <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
                <li>
                  <a
                    href="https://whatsapp.com/channel/0029VbEHAMkADTO9BaH0Mh2O"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    WhatsApp Channel <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li><Link href="/contact" className="hover:text-white">Support Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/login" className="hover:text-white">Sign In</Link></li>
                <li><Link href="/register" className="hover:text-white">Create Account</Link></li>
                <li><Link href="/contact" className="hover:text-white">Enterprise Quotes</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 ATS Resume Builder. Simple, transparent pricing with dedicated support.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
