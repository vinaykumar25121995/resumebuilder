"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Sparkles, FileText, CheckCircle, ArrowRight, Target, Zap, Shield, BarChart3, 
  Download, Brain, Star, ChevronDown, ChevronUp, Users, Award, TrendingUp,
  BookOpen, Briefcase, GraduationCap, Mail, Clock, Send, Headphones, CreditCard, AlertCircle,
  MessageCircle, ExternalLink
} from "lucide-react";

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

const templates = [
  { name: "ATS Classic", best: "Corporate Applications", compat: "Excellent" },
  { name: "ATS Data Analyst", best: "Data & Analytics Roles", compat: "Excellent" },
  { name: "ATS Technical", best: "Software Engineering", compat: "Excellent" },
  { name: "ATS Fresher", best: "Entry Level & Graduates", compat: "Excellent" },
];

const testimonials = [
  { name: "Priya S.", role: "Data Analyst, hired at a major tech firm", text: "I uploaded my resume and it scored 71 on the ATS check. After tailoring with this tool for a specific job description, it jumped to 93. I got an interview within a week.", rating: 5 },
  { name: "Rahul M.", role: "Software Engineer, recent graduate", text: "As a fresher, I had no idea what ATS even meant. This platform explained it clearly and helped me build a resume that actually got noticed. The keyword matching feature is incredible.", rating: 5 },
  { name: "Anjali K.", role: "Business Analyst transitioning careers", text: "The AI never fabricated anything — it just reorganized my existing experience to highlight what mattered for each job. I used it for 8 different applications and got 5 interviews.", rating: 5 },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
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
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
              <Sparkles className="w-6 h-6" />
              <span>ATS Resume Builder</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium">How It Works</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</a>
              <a href="#templates" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Templates</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Contact Us</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 text-sm font-medium">FAQ</a>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Log in</Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-24 lg:py-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-blue-100">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered ATS Optimization
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Build Once.<br />
            <span className="text-blue-600">Tailor for Every Job.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create an ATS-friendly master resume, then automatically optimize it for every job description using AI.
            <span className="font-semibold text-gray-900"> Stop rewriting manually.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
              BUILD MY RESUME <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto inline-flex items-center justify-center border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors">
              See How It Works
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Free to start</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> ATS-Designed Templates</div>
          </div>
        </div>
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

      {/* Templates */}
      <div id="templates" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Template Gallery</p>
            <h2 className="text-4xl font-bold text-gray-900">15+ ATS-First Resume Templates</h2>
            <p className="text-gray-600 mt-4">No graphics. No skill bars. No images. Just clean, machine-readable resumes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((tmpl, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border-b border-gray-100">
                  <div className="w-32 h-40 bg-white shadow-md rounded p-3 space-y-2">
                    <div className="h-2 bg-gray-800 rounded w-20 mx-auto"></div>
                    <div className="h-1 bg-gray-400 rounded w-24 mx-auto"></div>
                    <div className="h-0.5 bg-gray-200 rounded w-full mt-2"></div>
                    <div className="space-y-1">
                      <div className="h-1 bg-gray-600 rounded w-12"></div>
                      <div className="h-1 bg-gray-300 rounded w-full"></div>
                      <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-1 bg-gray-300 rounded w-4/6"></div>
                    </div>
                    <div className="h-0.5 bg-gray-200 rounded w-full"></div>
                    <div className="space-y-1">
                      <div className="h-1 bg-gray-600 rounded w-16"></div>
                      <div className="h-1 bg-gray-300 rounded w-full"></div>
                      <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900">{tmpl.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Best for: {tmpl.best}</p>
                  <div className="mt-3 flex items-center">
                    <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full border border-green-100">ATS: {tmpl.compat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/register" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              View All 15 Templates <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

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
