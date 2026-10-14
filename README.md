# 🚀 ATS Resume Builder & AI Career Platform

An end-to-end, AI-powered Applicant Tracking System (ATS) Resume Builder and Optimization platform built with Next.js 16, TypeScript, Tailwind CSS, Prisma, and Google Gemini AI.

---

## ✨ Features

- **Master Career Profile:** Build your comprehensive career profile once — experiences, education, skills, projects, certifications, and languages.
- **AI Job Tailoring & Anti-Hallucination:** Paste any job description to automatically extract key skills and tailor your resume without ever inventing fake metrics or companies.
- **15+ ATS-Optimized Templates:** Clean, machine-readable resume templates designed to pass automated parsing systems with top scores.
- **Comprehensive ATS Scoring Engine:** 0–100 compatibility rating with broken-down checks, missing keyword identification, and actionable suggestions.
- **Dual Export Formats:** Download print-ready **PDF** documents with selectable text and Microsoft Word **DOCX** files.
- **Default A4 & Customizable Page Sizes:** ISO A4 (default), US Letter, US Legal, A3, A5, Executive, Tabloid, and custom millimeter dimensions with live preview.
- **Typography & Highlighting Studio:** Selective text highlighter (yellow, green, cyan, pink, orange), custom bullet point characters, and row-by-row font size scaling.
- **Application Pipeline Tracker:** Manage job applications across Saved, Applied, Interview, Offer, and Rejected stages.
- **Contact & Support Center:** Integrated contact form and inquiry management.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database & ORM:** Prisma ORM (SQLite for local dev, PostgreSQL ready for production)
- **Authentication:** NextAuth.js (Credentials Provider)
- **AI Engine:** Google Gemini API (`@google/genai`)
- **Document Generation:** `docx` (Word documents) & `react-to-print` (Print & PDF)
- **Icons:** `lucide-react`

---

## 📦 Project Directory

The complete codebase is located on your machine at:
```text
C:\Users\HP\.gemini\antigravity\scratch\ats-resume-builder
```

---

## 🚀 Quick Start (Local Setup)

### 1. Clone or Open the Repository
```bash
cd "C:\Users\HP\.gemini\antigravity\scratch\ats-resume-builder"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secure-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GEMINI_API_KEY="your-google-gemini-api-key"
```

### 4. Push Database Schema
```bash
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 How to Upload to GitHub & Deploy

### Step 1: Push Code to GitHub
1. Create a new repository on [GitHub](https://github.com/new) (e.g. `ats-resume-builder`).
2. Run these commands inside your project folder:
```bash
cd "C:\Users\HP\.gemini\antigravity\scratch\ats-resume-builder"
git add .
git commit -m "Initial commit: ATS Resume Builder platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### Step 2: Deploy as a Live Website

#### Option A: Deploy on Vercel (Recommended)
1. Go to [Vercel](https://vercel.com) and click **"Add New" > "Project"**.
2. Import your GitHub repository (`ats-resume-builder`).
3. Set your **Environment Variables** in the Vercel dashboard:
   - `NEXTAUTH_SECRET`: Random 32+ character string
   - `NEXTAUTH_URL`: Your Vercel domain (e.g. `https://your-resume-app.vercel.app`)
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `DATABASE_URL`: Your hosted database (e.g. [Neon PostgreSQL](https://neon.tech), [Supabase](https://supabase.com), or [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate))
4. Click **Deploy**. Vercel will build and deploy your site in ~2 minutes!

#### Option B: Deploy on Railway / Render
1. Connect your GitHub repository to [Railway](https://railway.app) or [Render](https://render.com).
2. Set build command: `npm run build`
3. Set start command: `npm run start`
4. Configure the same environment variables above.

---

## 📄 License
MIT License. Built for modern job seekers.
