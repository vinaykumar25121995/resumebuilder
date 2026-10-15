"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ALL_TEMPLATES,
  filterTemplates,
  TEMPLATE_CATEGORIES,
  TemplateConfig,
} from "@/lib/templates";
import {
  Sparkles,
  Crown,
  Eye,
  FileText,
  Search,
  CheckCircle,
  ArrowRight,
  Filter,
  X,
  Zap,
} from "lucide-react";
import ResumeTemplateRenderer from "@/components/ResumeTemplateRenderer";

const sampleResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    title: "Senior Product & Technical Lead",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    portfolio: "alexjohnson.dev",
  },
  summary:
    "High-performing technology professional with 8+ years leading cross-functional engineering and design teams. Proven track record scaling digital architectures, optimizing ATS candidate conversion, and delivering enterprise platforms with 99.9% uptime.",
  skills: {
    technical: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "GraphQL",
      "PostgreSQL",
      "AWS",
    ],
    soft: [
      "Cross-functional Leadership",
      "Agile & Scrum",
      "Strategic Planning",
      "Mentorship",
    ],
    tools: ["Docker", "Git", "Kubernetes", "Figma", "Jira"],
  },
  experience: [
    {
      title: "Lead Systems Architect",
      company: "Apex Global Technologies",
      date: "2021 – Present",
      location: "San Francisco, CA",
      bullets: [
        "Architected enterprise distributed platforms serving over 1.8M active daily users.",
        "Spearheaded cloud migration to Next.js and microservices, reducing p99 latency by 42%.",
        "Mentored a team of 14 senior engineers and established standard CI/CD deployment pipelines.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Starlight Digital Corp",
      date: "2018 – 2021",
      location: "Austin, TX",
      bullets: [
        "Engineered real-time analytics streaming pipelines processing 50M+ events daily.",
        "Collaborated with product leadership to build ATS-compatible document export features.",
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

function PublicMiniPreview({ template }: { template: TemplateConfig }) {
  if (template.id === "pro-catherine") {
    return (
      <div className="w-full h-48 bg-slate-950 border-b border-slate-800 flex items-center justify-center overflow-hidden select-none">
        <div
          className="bg-white shadow-xl rounded overflow-hidden flex"
          style={{ width: "135px", height: "175px", fontSize: "3px" }}
        >
          <div
            style={{
              width: "35%",
              backgroundColor: "#1e293b",
              color: "#f8fafc",
              padding: "6px 4px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <div
              style={{
                fontSize: "3.5px",
                fontWeight: "bold",
                color: "#38bdf8",
                textTransform: "uppercase",
              }}
            >
              CONTACT
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                padding: "1px 2px",
                borderRadius: "2px",
                fontSize: "2.2px",
                color: "#e2e8f0",
              }}
            >
              ✉ catherine@email
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                padding: "1px 2px",
                borderRadius: "2px",
                fontSize: "2.2px",
                color: "#e2e8f0",
              }}
            >
              ✆ +1 (555) 0192
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                padding: "1px 2px",
                borderRadius: "2px",
                fontSize: "2.2px",
                color: "#e2e8f0",
              }}
            >
              ⚲ Los Angeles, CA
            </div>
            <div
              style={{
                fontSize: "3.5px",
                fontWeight: "bold",
                color: "#38bdf8",
                marginTop: "3px",
              }}
            >
              HARD SKILLS
            </div>
            <div style={{ fontSize: "2.3px", color: "#cbd5e1", lineHeight: "1.3" }}>
              • Maya & Blender
              <br />
              • Rigging & Mocap
              <br />• Unreal Engine
            </div>
            <div
              style={{
                fontSize: "3.5px",
                fontWeight: "bold",
                color: "#38bdf8",
                marginTop: "3px",
              }}
            >
              SOFT SKILLS
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1px" }}>
              <span
                style={{
                  background: "#334155",
                  padding: "1px 2px",
                  borderRadius: "1px",
                  fontSize: "2px",
                }}
              >
                Storytelling
              </span>
              <span
                style={{
                  background: "#334155",
                  padding: "1px 2px",
                  borderRadius: "1px",
                  fontSize: "2px",
                }}
              >
                Leadership
              </span>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: "6px 5px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <div
              style={{
                fontSize: "5.5px",
                fontWeight: "900",
                color: "#0f172a",
                textTransform: "uppercase",
                lineHeight: "1.1",
              }}
            >
              Catherine Barnett
            </div>
            <div
              style={{
                fontSize: "3.2px",
                color: "#0284c7",
                fontWeight: "bold",
                marginBottom: "2px",
              }}
            >
              3D Character Animator
            </div>
            <div
              style={{
                fontSize: "2.3px",
                color: "#475569",
                lineHeight: "1.2",
                marginBottom: "3px",
              }}
            >
              Creative animator with 7+ years in feature film & AAA games
              specializing in lifelike movement.
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                fontSize: "3.2px",
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              <span
                style={{
                  background: "#0284c7",
                  color: "#fff",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3px",
                }}
              >
                ★
              </span>
              WORK EXPERIENCE
            </div>
            <div
              style={{ fontSize: "2.8px", fontWeight: "bold", color: "#1e293b" }}
            >
              Lead Animator
            </div>
            <div
              style={{
                fontSize: "2.2px",
                color: "#0284c7",
                fontStyle: "italic",
              }}
            >
              Pixar Studios • 2021-Pres
            </div>
            <div style={{ fontSize: "2.1px", color: "#64748b" }}>
              • Directed key character sequences for feature film
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "pro-chris-flims") {
    return (
      <div className="w-full h-48 bg-stone-950 border-b border-stone-800 flex items-center justify-center overflow-hidden select-none">
        <div
          className="bg-white shadow-xl rounded overflow-hidden p-2.5 flex flex-col gap-1.5"
          style={{ width: "135px", height: "175px", fontSize: "3px" }}
        >
          <div>
            <div
              style={{
                fontSize: "6.5px",
                fontWeight: "900",
                color: "#c84b31",
                letterSpacing: "0.2px",
              }}
            >
              CHRIS FLIMS
            </div>
            <div
              style={{
                fontSize: "3.2px",
                fontWeight: "bold",
                color: "#374151",
              }}
            >
              Project Manager — Remote Agile Leader
            </div>
          </div>
          <div style={{ fontSize: "2.4px", color: "#4b5563", lineHeight: "1.2" }}>
            Results-driven Project Manager overseeing distributed global delivery
            teams with 98% on-time records.
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              fontSize: "2.3px",
              color: "#6b7280",
              borderTop: "0.5px solid #e5e7eb",
              borderBottom: "0.5px solid #e5e7eb",
              padding: "1px 0",
            }}
          >
            <span>✉ chris.flims@email</span>
            <span>✆ +1 (555) 9021</span>
            <span>⚲ Austin, TX (Remote)</span>
            <span>🌐 linkedin.com/flims</span>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                marginBottom: "1px",
              }}
            >
              <span style={{ color: "#c84b31", fontSize: "3.5px" }}>◈</span>
              <span
                style={{
                  fontSize: "3.4px",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                AREAS OF EXPERTISE
              </span>
              <div style={{ flex: 1, height: "0.5px", background: "#c84b31" }} />
              <div
                style={{
                  width: "2px",
                  height: "2px",
                  borderRadius: "50%",
                  background: "#c84b31",
                }}
              />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5px" }}>
              {["Scrum Agile", "Sprint Planning", "Jira & Confluence", "Budget P&L"].map(
                (s, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#e2e8f0",
                      color: "#1e293b",
                      padding: "1px 2px",
                      borderRadius: "1px",
                      fontSize: "2px",
                      fontWeight: "600",
                    }}
                  >
                    {s}
                  </span>
                )
              )}
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                marginBottom: "1px",
              }}
            >
              <span style={{ color: "#c84b31", fontSize: "3.5px" }}>◈</span>
              <span
                style={{
                  fontSize: "3.4px",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                WORK EXPERIENCE
              </span>
              <div style={{ flex: 1, height: "0.5px", background: "#c84b31" }} />
              <div
                style={{
                  width: "2px",
                  height: "2px",
                  borderRadius: "50%",
                  background: "#c84b31",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "2.8px",
                fontWeight: "bold",
              }}
            >
              <span>Senior Technical PM</span>
              <span style={{ color: "#6b7280", fontSize: "2.3px" }}>
                2020 – Present
              </span>
            </div>
            <div
              style={{
                fontSize: "2.3px",
                color: "#c84b31",
                fontStyle: "italic",
              }}
            >
              Global Cloud Systems
            </div>
            <div style={{ fontSize: "2.2px", color: "#4b5563" }}>
              • Spearheaded remote team sprints with 0 blocker rate
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "pro-will-tribian") {
    return (
      <div className="w-full h-48 bg-slate-950 border-b border-slate-800 flex items-center justify-center overflow-hidden select-none">
        <div
          className="bg-white shadow-xl rounded overflow-hidden p-2 flex flex-col gap-1.5"
          style={{ width: "135px", height: "175px", fontSize: "3px" }}
        >
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0891b2, #1e293b)",
                border: "1px solid #0891b2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "5px",
                fontWeight: "bold",
                flexShrink: 0,
              }}
            >
              WT
            </div>
            <div>
              <div
                style={{ fontSize: "6px", fontWeight: "900", color: "#0f172a" }}
              >
                WILL TRIBIAN
              </div>
              <div
                style={{
                  fontSize: "3.2px",
                  color: "#0891b2",
                  fontWeight: "bold",
                }}
              >
                Theater Actor & Performer
              </div>
            </div>
          </div>
          <div
            style={{
              background: "#1e293b",
              color: "#e2e8f0",
              padding: "2px 3px",
              borderRadius: "2px",
              fontSize: "2.4px",
              lineHeight: "1.2",
            }}
          >
            Dynamic stage actor trained in classical theater, voice projection,
            and improvisational performance.
          </div>
          <div
            style={{
              background: "#0891b2",
              color: "#ffffff",
              padding: "2px 3px",
              borderRadius: "2px",
              fontSize: "2.3px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
            }}
          >
            <span>✉ will.tribian@email</span>
            <span>✆ +1 (555) 7731</span>
            <span>⚲ New York, NY</span>
            <span>🌐 willtribian.actor</span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <div style={{ flex: "1 1 58%" }}>
              <div
                style={{
                  fontSize: "3.4px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  borderBottom: "0.5px solid #0891b2",
                  paddingBottom: "1px",
                  marginBottom: "1px",
                }}
              >
                WORK EXPERIENCE
              </div>
              <div style={{ fontSize: "2.8px", fontWeight: "bold" }}>
                Lead Actor — Hamlet
              </div>
              <div style={{ fontSize: "2.3px", color: "#0891b2" }}>
                Broadway Playhouse | 2022
              </div>
              <div style={{ fontSize: "2.1px", color: "#475569" }}>
                • Performed 65 sold-out shows with acclaim
              </div>
            </div>
            <div style={{ flex: "1 1 42%" }}>
              <div
                style={{
                  fontSize: "3.4px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  borderBottom: "0.5px solid #0891b2",
                  paddingBottom: "1px",
                  marginBottom: "1px",
                }}
              >
                HARD SKILLS
              </div>
              <div style={{ fontSize: "2.3px", color: "#475569" }}>
                • Classical Shakespearian
                <br />
                • Stage Combat
                <br />• Baritone Vocalist
              </div>
              <div
                style={{
                  fontSize: "3.4px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  marginTop: "2px",
                  borderBottom: "0.5px solid #0891b2",
                  paddingBottom: "1px",
                  marginBottom: "1px",
                }}
              >
                SOFT SKILLS
              </div>
              <span
                style={{
                  background: "#e2e8f0",
                  padding: "1px 2px",
                  borderRadius: "1px",
                  fontSize: "2px",
                }}
              >
                Stage Presence
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "pro-amanda-smith") {
    return (
      <div className="w-full h-48 bg-zinc-950 border-b border-zinc-800 flex items-center justify-center overflow-hidden select-none">
        <div
          className="bg-white shadow-xl rounded overflow-hidden p-2 flex flex-col gap-1.5"
          style={{ width: "135px", height: "175px", fontSize: "3px" }}
        >
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            <div
              style={{
                width: "17px",
                height: "19px",
                borderRadius: "2px",
                background: "linear-gradient(135deg, #71717a, #18181b)",
                border: "0.5px solid #cbd5e1",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "5px",
                fontWeight: "bold",
              }}
            >
              AS
            </div>
            <div>
              <div
                style={{ fontSize: "6px", fontWeight: "900", color: "#18181b" }}
              >
                AMANDA SMITH
              </div>
              <div
                style={{
                  fontSize: "3.2px",
                  color: "#52525b",
                  fontWeight: "bold",
                }}
              >
                Chief Information Officer (CIO)
              </div>
            </div>
          </div>
          <div style={{ fontSize: "2.4px", color: "#52525b", lineHeight: "1.2" }}>
            Visionary CIO guiding enterprise technology transformation,
            cybersecurity governance, and cloud architectures.
          </div>
          <div
            style={{
              background: "#18181b",
              color: "#ffffff",
              padding: "2px 3px",
              borderRadius: "2px",
              fontSize: "2.3px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
            }}
          >
            <span>✉ amanda.smith@email</span>
            <span>✆ +1 (555) 4412</span>
            <span>⚲ Chicago, IL</span>
            <span>🌐 amandasmith.cio</span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <div style={{ flex: "1 1 55%" }}>
              <div
                style={{
                  fontSize: "3.4px",
                  fontWeight: "bold",
                  color: "#18181b",
                  marginBottom: "1px",
                }}
              >
                ▤ WORK EXPERIENCE
              </div>
              <div style={{ fontSize: "2.8px", fontWeight: "bold" }}>
                CIO & VP Technology
              </div>
              <div
                style={{
                  fontSize: "2.3px",
                  color: "#52525b",
                  fontStyle: "italic",
                }}
              >
                Pear Global Systems | 2018–Pres
              </div>
              <div style={{ fontSize: "2.1px", color: "#666" }}>
                • Scaled global cloud footprint across 12 datacenters
              </div>
            </div>
            <div style={{ flex: "1 1 45%" }}>
              <div
                style={{
                  fontSize: "3.4px",
                  fontWeight: "bold",
                  color: "#18181b",
                  marginBottom: "1px",
                }}
              >
                ▤ GENERAL SKILLS
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1px",
                  fontSize: "2.2px",
                  color: "#444",
                }}
              >
                <span>Agile CI/CD</span>
                <span>Multi-Cloud</span>
                <span>Security</span>
                <span>Data Lakes</span>
              </div>
              <div
                style={{
                  fontSize: "3.4px",
                  fontWeight: "bold",
                  color: "#18181b",
                  marginTop: "2px",
                }}
              >
                ▤ CERTIFICATIONS
              </div>
              <div style={{ fontSize: "2.2px", color: "#555" }}>
                CISM Certified CIO
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-48 bg-slate-900 border-b border-slate-800 flex items-center justify-center overflow-hidden select-none">
      <div
        className="bg-white shadow-xl rounded overflow-hidden p-3 flex flex-col gap-1.5"
        style={{ width: "135px", height: "175px", fontSize: "3px" }}
      >
        <div
          style={{
            borderBottom: `1px solid ${template.style.accentColor || "#2563eb"}`,
            paddingBottom: "2px",
          }}
        >
          <div
            style={{
              fontSize: "6px",
              fontWeight: "900",
              color: template.style.nameColor || "#0f172a",
            }}
          >
            Alex Johnson
          </div>
          <div
            style={{
              fontSize: "3.2px",
              color: template.style.accentColor || "#2563eb",
              fontWeight: "600",
            }}
          >
            Lead Software Engineer
          </div>
          <div style={{ fontSize: "2.2px", color: "#64748b" }}>
            San Francisco, CA • alex@example.com • (555) 0192
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: "3.4px",
              fontWeight: "bold",
              color: template.style.headingColor || "#0f172a",
              textTransform: "uppercase",
            }}
          >
            Summary
          </div>
          <div style={{ fontSize: "2.2px", color: "#475569", lineHeight: "1.2" }}>
            Experienced professional with a proven track record delivering scalable
            applications and clean architectures.
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: "3.4px",
              fontWeight: "bold",
              color: template.style.headingColor || "#0f172a",
              textTransform: "uppercase",
            }}
          >
            Experience
          </div>
          <div
            style={{ fontSize: "2.8px", fontWeight: "bold", color: "#1e293b" }}
          >
            Senior Lead Specialist
          </div>
          <div
            style={{
              fontSize: "2.2px",
              color: "#64748b",
              fontStyle: "italic",
            }}
          >
            Acme Global Tech | 2021 – Present
          </div>
          <div style={{ fontSize: "2.1px", color: "#475569" }}>
            • Spearheaded enterprise deliverables with 99.9% uptime
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: "3.4px",
              fontWeight: "bold",
              color: template.style.headingColor || "#0f172a",
              textTransform: "uppercase",
            }}
          >
            Skills
          </div>
          <div style={{ fontSize: "2.2px", color: "#475569" }}>
            React, Next.js, TypeScript, Node.js, Python, PostgreSQL, AWS
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PublicTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(
    null
  );

  const filteredTemplates = useMemo(() => {
    return filterTemplates(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#030612]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white font-bold text-xl"
            >
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                ATS Resume Builder
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/#how-it-works"
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#features"
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                Features
              </Link>
              <Link
                href="/templates"
                className="text-cyan-400 font-bold text-sm flex items-center gap-1.5"
              >
                <span>Templates</span>
                <span className="text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded-full leading-none">
                  4 PRO
                </span>
              </Link>
              <Link
                href="/#pricing"
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-600/30"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-amber-300 shadow-sm">
            <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>COMPLETE RESUME TEMPLATE DIRECTORY</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            ATS-Friendly Resume Templates
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Choose from all {ALL_TEMPLATES.length} ATS-optimized templates,
            including our{" "}
            <strong className="text-amber-300">
              4 New Premium Pro Templates
            </strong>{" "}
            (Catherine Barnett, Chris Flims, Will Tribian, Amanda Smith).
          </p>
        </div>

        {/* 👑 Premium Pro Spotlight Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 text-white shadow-xl border border-amber-500/40">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-extrabold text-amber-300">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>NEW IN PRO SUBSCRIPTION</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                4 Exclusive Executive & Creative Templates
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Dual columns, slate sidebars, cyan contact banners, diamond divider
                rules, and executive portraits — formatted as machine-readable text
                for 100% ATS pass rates.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-300">
                <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> Catherine Barnett (3D Animator)
                </span>
                <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> Chris Flims (Remote PM)
                </span>
                <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> Will Tribian (Theater Actor)
                </span>
                <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> Amanda Smith (CIO Executive)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
              <button
                onClick={() => setSelectedCategory("Premium")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all"
              >
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>Filter 4 Pro Templates</span>
              </button>
              <Link
                href="/register?plan=pro"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <span>Unlock Pro Access ($12/mo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-lg">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates by role (e.g. Animator, Project Manager, CIO, Tech)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            {TEMPLATE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? cat.id === "Premium"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              className={`bg-slate-900 rounded-2xl border overflow-hidden hover:shadow-2xl transition-all duration-200 flex flex-col justify-between group ${
                tmpl.isPro
                  ? "border-amber-500/50 hover:border-amber-400 shadow-amber-500/10"
                  : "border-slate-800 hover:border-blue-500"
              }`}
            >
              {/* Visual Preview */}
              <div className="relative">
                <PublicMiniPreview template={tmpl} />

                {tmpl.isPro && (
                  <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-amber-300/40">
                    <Crown className="w-3 h-3 text-amber-200 fill-amber-200" />
                    <span>PRO EXCLUSIVE</span>
                  </div>
                )}

                <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  ATS {tmpl.atsScore}%
                </div>
              </div>

              {/* Information */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
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
                        className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
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
      </main>

      {/* Live Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl text-white ${
                    previewTemplate.isPro
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950"
                      : "bg-blue-600"
                  }`}
                >
                  {previewTemplate.isPro ? (
                    <Crown className="w-5 h-5 fill-current" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">
                      {previewTemplate.name}
                    </h3>
                    {previewTemplate.isPro && (
                      <span className="text-[10px] font-extrabold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                        PRO EXCLUSIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    High-resolution ATS Preview • Compatibility:{" "}
                    <span className="text-emerald-400 font-bold">
                      {previewTemplate.atsScore}%
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/register?template=${previewTemplate.id}`}
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Use This Template Now</span>
                </Link>
                <button
                  onClick={() => setPreviewTemplate(null)}
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
                  template={previewTemplate}
                  data={sampleResumeData}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2025 ATS Resume Builder. All templates engineered for 100% machine readability.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/templates" className="hover:text-white font-bold text-amber-300">Templates</Link>
            <Link href="/#pricing" className="hover:text-white">Pricing</Link>
            <Link href="/login" className="hover:text-white">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
