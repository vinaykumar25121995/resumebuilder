"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

// ============================================================================
// 1. AUTHENTIC VECTOR LOGOS FOR ALL 10 GLOBAL CORPORATIONS
// ============================================================================

function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.6-5.2 3.6-9.15z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.73-2.1-6.68-4.94H1.21v3.15C3.25 21.4 7.31 24 12 24z"
        fill="#34A853"
      />
      <path
        d="M5.32 14.26c-.24-.72-.38-1.49-.38-2.26s.14-1.54.38-2.26V6.59H1.21A11.95 11.95 0 0 0 0 12c0 1.92.45 3.74 1.21 5.41l4.11-3.15z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.6 1.21 6.59l4.11 3.15c.95-2.84 3.58-4.97 6.68-4.97z"
        fill="#EA4335"
      />
    </svg>
  );
}

function MicrosoftLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
      <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
      <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
    </svg>
  );
}

function AmazonLogo({ className = "w-6 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 20" fill="none">
      <text
        x="0"
        y="12"
        fill="#FFFFFF"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="bold"
        fontSize="12"
        letterSpacing="-0.3"
      >
        amazon
      </text>
      {/* Signature Amazon Smile Arc & Arrowhead */}
      <path
        d="M2.5 16.2C7.5 19.4 17.5 19.4 23.5 15.2"
        stroke="#FF9900"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M22.5 14.2L24.8 15.5L23.2 17.5"
        fill="#FF9900"
      />
    </svg>
  );
}

function NvidiaLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="3.5" fill="#76B900" />
      {/* NVIDIA White Swirl Eye Icon */}
      <path
        d="M12 5.5c-3.6 0-6.5 2.9-6.5 6.5 0 3.6 2.9 6.5 6.5 6.5 1.8 0 3.5-.8 4.7-2l-1.4-1.4c-.9.9-2.1 1.5-3.3 1.5-2.5 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6c1.9 0 3.5 1.2 4.2 2.9h2.1C17.5 7.4 15 5.5 12 5.5z"
        fill="#FFFFFF"
      />
      <path
        d="M12 8.2c-2.1 0-3.8 1.7-3.8 3.8 0 2.1 1.7 3.8 3.8 3.8 1.1 0 2.1-.5 2.8-1.2l-1.4-1.4c-.4.4-.9.7-1.4.7-1.1 0-1.9-.9-1.9-1.9s.9-1.9 1.9-1.9c.7 0 1.4.4 1.7 1.1h2.1c-.5-1.7-2-3-3.8-3z"
        fill="#FFFFFF"
      />
      <circle cx="12" cy="12" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}

function DeloitteLogo({ className = "w-6 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 52 18" fill="none">
      <text
        x="0"
        y="14"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize="13"
        letterSpacing="-0.4"
      >
        Deloitte
      </text>
      {/* Signature Deloitte Green Dot */}
      <circle cx="48.5" cy="13" r="2.4" fill="#86BC25" />
    </svg>
  );
}

function TcsLogo({ className = "w-6 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 20" fill="none">
      <rect width="32" height="20" rx="3" fill="#00355f" />
      <text
        x="16"
        y="14.5"
        fill="#38BDF8"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="12"
        textAnchor="middle"
        letterSpacing="0.8"
      >
        TCS
      </text>
    </svg>
  );
}

function AppleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.61 1.34-.56.64-1.05 1.7-0.92 2.73 1 .08 2.02-.51 2.6-1.22z" />
    </svg>
  );
}

function MetaLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 16.5c-2.4 0-4.3-1.7-5.4-3.5-1.2-1.9-1.9-4.2-1.9-5.7 0-2.4 1.7-4.3 4.2-4.3 2.2 0 3.7 1.5 4.8 3.1 1.1-1.6 2.6-3.1 4.8-3.1 2.5 0 4.2 1.9 4.2 4.3 0 1.5-.7 3.8-1.9 5.7-1.1 1.8-3 3.5-5.4 3.5zm-5.7-9.2c0 1.1.5 2.8 1.4 4.2.9 1.4 2.3 2.7 4.3 2.7 1.9 0 3.3-1.3 4.3-2.7.9-1.4 1.4-3.1 1.4-4.2 0-1.2-.8-2-2.1-2-1.5 0-2.6 1.4-3.6 2.8l-.7 1-.7-1C9.6 6.5 8.5 5.3 7 5.3c-1.3 0-2.1.8-2.1 2z"
        fill="#0668E1"
      />
    </svg>
  );
}

function IbmLogo({ className = "w-6 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 18" fill="none">
      {/* Authentic 8-bar striped IBM geometry */}
      <g fill="#0F62FE">
        <rect x="1" y="2" width="30" height="1.2" />
        <rect x="1" y="4" width="30" height="1.2" />
        <rect x="1" y="6" width="30" height="1.2" />
        <rect x="1" y="8" width="30" height="1.2" />
        <rect x="1" y="10" width="30" height="1.2" />
        <rect x="1" y="12" width="30" height="1.2" />
        <rect x="1" y="14" width="30" height="1.2" />
        <rect x="1" y="16" width="30" height="1.2" />
      </g>
      <text
        x="16"
        y="14"
        fill="#FFFFFF"
        fontFamily="Courier New, monospace"
        fontWeight="bold"
        fontSize="12"
        textAnchor="middle"
        letterSpacing="2"
      >
        IBM
      </text>
    </svg>
  );
}

function AccentureLogo({ className = "w-6 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 54 18" fill="none">
      <path d="M30 4.5l3.5 4.5-3.5 4.5h2.5l3.5-4.5-3.5-4.5H30z" fill="#A100FF" />
      <text
        x="1"
        y="14"
        fill="#FFFFFF"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="12"
        letterSpacing="-0.3"
      >
        accenture
      </text>
    </svg>
  );
}

// ============================================================================
// 2. SKYLINE DATA & SPECIFIC ARCHITECTURAL IDENTITIES (TEN GLOBAL GIANTS)
// ============================================================================

interface CorporateBuilding {
  id: string;
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  height: number; // in pixels (desktop)
  width: number;
  leftPercent: number; // position on horizon 0..100
  zIndex: number;
  spireHeight: number;
  styleName: string;
  styleDesc: string;
  architecturalType:
    | "stepped-campus" // Google
    | "crystalline-quad" // Microsoft
    | "curved-sail" // Amazon
    | "computational-prism" // NVIDIA
    | "executive-setback" // Deloitte
    | "twin-pylon" // TCS
    | "monolith-pill" // Apple
    | "parabolic-wings" // Meta
    | "eight-bar-mainframe" // IBM
    | "chevron-crown"; // Accenture
}

const corporateBuildings: CorporateBuilding[] = [
  {
    id: "accenture",
    name: "Accenture",
    logo: AccentureLogo,
    accentColor: "#A100FF",
    glowColor: "rgba(161, 0, 255, 0.45)",
    height: 255,
    width: 78,
    leftPercent: 2.5,
    zIndex: 1,
    spireHeight: 30,
    styleName: "Purple Chevron Tower",
    styleDesc: "Angular forward-raked chevron crown tower with violet light guides",
    architecturalType: "chevron-crown",
  },
  {
    id: "ibm",
    name: "IBM",
    logo: IbmLogo,
    accentColor: "#0F62FE",
    glowColor: "rgba(15, 98, 254, 0.45)",
    height: 295,
    width: 88,
    leftPercent: 12,
    zIndex: 2,
    spireHeight: 26,
    styleName: "8-Bar Enterprise Monolith",
    styleDesc: "Classical mainframe-inspired tower with 8 illuminated horizontal louvers",
    architecturalType: "eight-bar-mainframe",
  },
  {
    id: "google",
    name: "Google",
    logo: GoogleLogo,
    accentColor: "#4285F4",
    glowColor: "rgba(66, 133, 244, 0.5)",
    height: 360,
    width: 102,
    leftPercent: 22,
    zIndex: 4,
    spireHeight: 38,
    styleName: "Stepped Innovation Campus",
    styleDesc: "Modern stepped cantilevered glass campus with 4-color accent glass bands",
    architecturalType: "stepped-campus",
  },
  {
    id: "deloitte",
    name: "Deloitte",
    logo: DeloitteLogo,
    accentColor: "#86BC25",
    glowColor: "rgba(134, 188, 37, 0.45)",
    height: 315,
    width: 86,
    leftPercent: 32.5,
    zIndex: 3,
    spireHeight: 28,
    styleName: "Executive Glass High-Rise",
    styleDesc: "Refined business skyscraper with dual setback and lime-green sphere finial",
    architecturalType: "executive-setback",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: MicrosoftLogo,
    accentColor: "#00A4EF",
    glowColor: "rgba(0, 164, 239, 0.5)",
    height: 405,
    width: 108,
    leftPercent: 43,
    zIndex: 5,
    spireHeight: 48,
    styleName: "Crystalline High-Rise",
    styleDesc: "Central crystalline high-rise with angled geometric crown and 4-color atrium",
    architecturalType: "crystalline-quad",
  },
  {
    id: "apple",
    name: "Apple",
    logo: AppleLogo,
    accentColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.5)",
    height: 380,
    width: 100,
    leftPercent: 53.5,
    zIndex: 5,
    spireHeight: 40,
    styleName: "Titanium & Glass Monolith",
    styleDesc: "Minimalist seamless frosted glass monolith with rounded pill-shaped corners",
    architecturalType: "monolith-pill",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    logo: NvidiaLogo,
    accentColor: "#76B900",
    glowColor: "rgba(118, 185, 0, 0.5)",
    height: 345,
    width: 92,
    leftPercent: 64,
    zIndex: 4,
    spireHeight: 34,
    styleName: "Computational Prism",
    styleDesc: "Faceted computational prism with diagonal bracing and emerald neon circuit lines",
    architecturalType: "computational-prism",
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: AmazonLogo,
    accentColor: "#FF9900",
    glowColor: "rgba(255, 153, 0, 0.45)",
    height: 355,
    width: 96,
    leftPercent: 74.5,
    zIndex: 3,
    spireHeight: 32,
    styleName: "Cloud Sail Complex",
    styleDesc: "Curved aerodynamic sail tower with glowing warm amber smile ribbon light",
    architecturalType: "curved-sail",
  },
  {
    id: "meta",
    name: "Meta",
    logo: MetaLogo,
    accentColor: "#0668E1",
    glowColor: "rgba(6, 104, 225, 0.45)",
    height: 290,
    width: 84,
    leftPercent: 84.5,
    zIndex: 2,
    spireHeight: 24,
    styleName: "Connected Horizon Tower",
    styleDesc: "Twin curved parabolic towers with cyan glowing infinity-loop light bridge",
    architecturalType: "parabolic-wings",
  },
  {
    id: "tcs",
    name: "TCS",
    logo: TcsLogo,
    accentColor: "#0070AD",
    glowColor: "rgba(0, 112, 173, 0.45)",
    height: 265,
    width: 80,
    leftPercent: 93,
    zIndex: 1,
    spireHeight: 26,
    styleName: "Twin Pylon Enterprise Tower",
    styleDesc: "Dual vertical column enterprise tower with skybridges and royal blue light guides",
    architecturalType: "twin-pylon",
  },
];

// Distant background silhouette buildings for cinematic metropolis depth (Layer 3)
const distantSilhouetteTowers = [
  { left: 0, width: 45, height: 170 },
  { left: 7, width: 55, height: 210 },
  { left: 17, width: 60, height: 190 },
  { left: 27, width: 50, height: 230 },
  { left: 38, width: 65, height: 250 },
  { left: 49, width: 58, height: 240 },
  { left: 59, width: 52, height: 220 },
  { left: 69, width: 64, height: 200 },
  { left: 80, width: 48, height: 185 },
  { left: 89, width: 54, height: 215 },
  { left: 96, width: 42, height: 160 },
];

// Generate consistent twinkling cosmic starfield
function generateStarfield(count = 110) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: ((i * 137.508) % 100).toFixed(2),
      y: ((i * 61.803) % 76).toFixed(2),
      size: (0.9 + (i % 4) * 0.45).toFixed(1),
      opacity: (0.25 + (i % 5) * 0.15).toFixed(2),
      duration: (3 + (i % 5) * 1.4).toFixed(1),
      delay: ((i % 8) * 0.7).toFixed(1),
    });
  }
  return stars;
}

// ============================================================================
// 3. SPECIALIZED ARCHITECTURAL FACADES FOR EACH COMPANY
// ============================================================================

function BuildingFacade({ building }: { building: CorporateBuilding }) {
  const { architecturalType, accentColor } = building;

  switch (architecturalType) {
    case "stepped-campus": // Google: Stepped cantilevers + 4-color accent glass bands
      return (
        <div className="relative w-full h-full flex flex-col items-center">
          {/* Top Tier (Tier 3) */}
          <div className="w-3/5 h-1/4 relative border-t border-x border-white/20 bg-gradient-to-b from-[#1a2d52] to-[#0f1d38]">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#4285F4]" />
            <div className="absolute inset-1 grid grid-cols-3 gap-0.5 opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:4px_6px]" />
          </div>
          {/* Mid Tier (Tier 2) */}
          <div className="w-4/5 h-1/3 relative border-t border-x border-white/20 bg-gradient-to-b from-[#142342] to-[#0a1426]">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#EA4335]" />
            <div className="absolute inset-1 grid grid-cols-4 gap-0.5 opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:5px_7px]" />
            <div className="absolute bottom-0 inset-x-0 h-1 bg-[#FBBC05]" />
          </div>
          {/* Base Tier (Tier 1) */}
          <div className="w-full flex-1 relative border-t border-x border-white/20 bg-gradient-to-b from-[#0e1930] to-[#040813]">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#34A853]" />
            <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-70 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:6px_8px]" />
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030612] to-transparent" />
          </div>
        </div>
      );

    case "crystalline-quad": // Microsoft: Angled cut crown + 4-quadrant glowing atrium
      return (
        <div className="relative w-full h-full border-t border-x border-white/20 bg-gradient-to-b from-[#172d50] via-[#0d1c34] to-[#040915] overflow-hidden">
          {/* Central Vertical Glass Atrium */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-cyan-400/30 via-blue-500/15 to-transparent border-x border-cyan-400/40" />
          {/* 4-Color Glowing Matrix Window Atrium (Mid-Tower) */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-8 rounded grid grid-cols-2 gap-0.5 p-0.5 bg-black/60 border border-white/20 shadow-[0_0_12px_rgba(0,164,239,0.5)]">
            <div className="bg-[#F25022]/90 rounded-xs" />
            <div className="bg-[#7FBA00]/90 rounded-xs" />
            <div className="bg-[#00A4EF]/90 rounded-xs" />
            <div className="bg-[#FFB900]/90 rounded-xs" />
          </div>
          {/* Window Matrix */}
          <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-65 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:6px_8px]" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030612] to-transparent" />
        </div>
      );

    case "curved-sail": // Amazon: Sweeping sail roof + warm amber smile arc
      return (
        <div className="relative w-full h-full border-t border-x border-white/20 rounded-tr-3xl bg-gradient-to-b from-[#1c2838] via-[#0f1722] to-[#04080e] overflow-hidden">
          {/* Sweeping Aerodynamic Roof Glow */}
          <div className="absolute top-0 right-0 w-12 h-12 rounded-bl-full border-b-2 border-l-2 border-amber-400/60 bg-amber-500/10" />
          {/* Signature Illuminated Amber Smile Arc Across Facade */}
          <div className="absolute top-1/3 inset-x-2 h-10 pointer-events-none">
            <svg viewBox="0 0 80 20" className="w-full h-full overflow-visible">
              <path
                d="M5 6 Q 40 22 75 8"
                fill="none"
                stroke="#FF9900"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(255,153,0,0.8)]"
              />
              <circle cx="75" cy="8" r="2" fill="#FF9900" />
            </svg>
          </div>
          <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-65 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:6px_8px]" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030612] to-transparent" />
        </div>
      );

    case "computational-prism": // NVIDIA: Faceted diagonal emerald framing
      return (
        <div className="relative w-full h-full border-t border-x border-white/20 bg-gradient-to-b from-[#112a1c] via-[#091a10] to-[#020704] overflow-hidden">
          {/* Diagonal Computational Bracing Beams (Emerald) */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-0 left-0 w-full h-1/2 border-b border-[#76B900] rotate-12 origin-left scale-150" />
            <div className="absolute top-1/3 left-0 w-full h-1/2 border-b border-[#76B900] -rotate-12 origin-right scale-150" />
          </div>
          {/* Vertical Emerald Neon Data Traces */}
          <div className="absolute top-0 bottom-0 left-2 w-[1.5px] bg-[#76B900] opacity-80 shadow-[0_0_8px_#76B900]" />
          <div className="absolute top-0 bottom-0 right-2 w-[1.5px] bg-[#76B900] opacity-80 shadow-[0_0_8px_#76B900]" />
          <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-70 bg-[radial-gradient(circle,rgba(200,255,200,0.7)_1px,transparent_1px)] bg-[size:6px_8px]" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030612] to-transparent" />
        </div>
      );

    case "executive-setback": // Deloitte: Double setback + green beacon sphere
      return (
        <div className="relative w-full h-full flex flex-col items-center">
          {/* Penthouse Setback */}
          <div className="w-3/4 h-1/5 relative border-t border-x border-white/20 bg-gradient-to-b from-[#182e22] to-[#0e1d15]">
            <div className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#86BC25] shadow-[0_0_8px_#86BC25] animate-ping" />
          </div>
          {/* Main Tower */}
          <div className="w-full flex-1 relative border-t border-x border-white/20 bg-gradient-to-b from-[#112319] via-[#0a1710] to-[#030805] overflow-hidden">
            {/* Signature Emerald Glass Vertical Mullions */}
            <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-[#86BC25]/60" />
            <div className="absolute top-0 bottom-0 right-3 w-[1px] bg-[#86BC25]/60" />
            <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-65 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:6px_8px]" />
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030612] to-transparent" />
          </div>
        </div>
      );

    case "twin-pylon": // TCS: Dual enterprise pylons with skybridges
      return (
        <div className="relative w-full h-full flex justify-between border-t border-x border-white/20 bg-gradient-to-b from-[#0c1f38] via-[#061222] to-[#02060d] p-1 overflow-hidden">
          {/* Left Pylon */}
          <div className="w-[45%] h-full relative border-r border-blue-400/30 bg-blue-950/40">
            <div className="absolute top-0 bottom-0 left-1 w-[1px] bg-[#0070AD] shadow-[0_0_6px_#0070AD]" />
            <div className="absolute inset-1 grid grid-cols-2 gap-0.5 opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:4px_6px]" />
          </div>
          {/* Mid Skybridges Connecting Pylons */}
          <div className="absolute top-1/4 inset-x-2 h-3 bg-cyan-400/30 border-y border-cyan-400/60 shadow-[0_0_10px_rgba(56,189,248,0.5)] z-10" />
          <div className="absolute top-2/4 inset-x-2 h-3 bg-cyan-400/30 border-y border-cyan-400/60 shadow-[0_0_10px_rgba(56,189,248,0.5)] z-10" />
          {/* Right Pylon */}
          <div className="w-[45%] h-full relative border-l border-blue-400/30 bg-blue-950/40">
            <div className="absolute top-0 bottom-0 right-1 w-[1px] bg-[#0070AD] shadow-[0_0_6px_#0070AD]" />
            <div className="absolute inset-1 grid grid-cols-2 gap-0.5 opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:4px_6px]" />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030612] to-transparent z-20" />
        </div>
      );

    case "monolith-pill": // Apple: Precision titanium frame + frosted glass monolith
      return (
        <div className="relative w-full h-full rounded-t-2xl border-t border-x border-white/30 bg-gradient-to-b from-[#252c38]/90 via-[#151a24]/95 to-[#05070a] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
          {/* Subtle Titanium Side Rails */}
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-r from-slate-200/40 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gradient-to-l from-slate-200/40 to-transparent" />
          {/* Pure White Vertical Light Axis */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
          {/* Minimalist Micro-Grid Windows */}
          <div className="absolute inset-3 grid grid-cols-4 gap-1 opacity-55 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:5px_7px]" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030612] to-transparent" />
        </div>
      );

    case "parabolic-wings": // Meta: Twin curved towers + cyan horizon light ribbon
      return (
        <div className="relative w-full h-full border-t border-x border-white/20 bg-gradient-to-b from-[#102444] via-[#09152b] to-[#02050c] overflow-hidden">
          {/* Dual Curved Light Ribbons */}
          <div className="absolute top-1/4 inset-x-1 h-12 pointer-events-none">
            <svg viewBox="0 0 70 25" className="w-full h-full overflow-visible">
              <path
                d="M5 20 C 20 2, 50 2, 65 20"
                fill="none"
                stroke="#0668E1"
                strokeWidth="2"
                className="drop-shadow-[0_0_8px_#0668E1]"
              />
            </svg>
          </div>
          <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-65 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:6px_8px]" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030612] to-transparent" />
        </div>
      );

    case "eight-bar-mainframe": // IBM: 8 prominent illuminated horizontal louvers
      return (
        <div className="relative w-full h-full border-t border-x border-white/20 bg-gradient-to-b from-[#132548] via-[#0a152d] to-[#030612] overflow-hidden">
          {/* 8 Prominent IBM Horizontal Louvers */}
          <div className="absolute top-2 inset-x-2 space-y-1.5 opacity-80">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((l) => (
              <div
                key={l}
                className="h-[1.5px] bg-[#0F62FE] shadow-[0_0_6px_rgba(15,98,254,0.7)]"
              />
            ))}
          </div>
          <div className="absolute top-28 inset-2 bottom-0 grid grid-cols-4 gap-1 opacity-70 bg-[radial-gradient(circle,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:6px_8px]" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030612] to-transparent" />
        </div>
      );

    case "chevron-crown": // Accenture: Forward-leaning chevron crown + violet lasers
      return (
        <div className="relative w-full h-full border-t border-x border-white/20 bg-gradient-to-b from-[#221038] via-[#140824] to-[#04010a] overflow-hidden">
          {/* Angular Chevron Lines on Crown */}
          <div className="absolute top-1 inset-x-1 flex justify-center">
            <svg viewBox="0 0 60 18" className="w-full h-full">
              <path
                d="M10 14 L30 4 L50 14"
                fill="none"
                stroke="#A100FF"
                strokeWidth="2.2"
                className="drop-shadow-[0_0_8px_#A100FF]"
              />
            </svg>
          </div>
          <div className="absolute top-0 bottom-0 left-1.5 w-[1px] bg-[#A100FF]/80 shadow-[0_0_8px_#A100FF]" />
          <div className="absolute top-0 bottom-0 right-1.5 w-[1px] bg-[#A100FF]/80 shadow-[0_0_8px_#A100FF]" />
          <div className="absolute inset-2 grid grid-cols-3 gap-1 opacity-65 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:6px_8px]" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030612] to-transparent" />
        </div>
      );

    default:
      return null;
  }
}

// ============================================================================
// 4. MAIN FUTURISTIC UNIVERSE HERO COMPONENT
// ============================================================================

export default function FuturisticUniverseHero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const stars = useMemo(() => generateStarfield(115), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ------------------------------------------------------------------ */}
      {/* 1. DEEP SPACE COSMIC GRADIENT (Layer 4)                             */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 90% at 50% 8%, #0d1636 0%, #070c22 42%, #030612 80%, #02040a 100%)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* 2. SUBTLE COSMIC NEBULAE & GALACTIC DUST (Layer 4)                  */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute top-1/4 -left-24 w-[46rem] h-[46rem] rounded-full blur-[120px] opacity-25 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 80%)",
          transform: `translate(${mouseOffset.x * -12}px, ${mouseOffset.y * -8}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="absolute top-1/3 -right-24 w-[48rem] h-[48rem] rounded-full blur-[130px] opacity-20 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 80%)",
          transform: `translate(${mouseOffset.x * 14}px, ${mouseOffset.y * 10}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65rem] h-[32rem] rounded-full blur-[140px] opacity-15 pointer-events-none bg-indigo-500/20" />

      {/* ------------------------------------------------------------------ */}
      {/* 3. TWINKLING COSMIC STARFIELD WITH PARALLAX (Layer 4)               */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mouseOffset.x * -6}px, ${mouseOffset.y * -4}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}

        {/* Distant Navigational Stars with Cross Diffraction Spikes */}
        <div className="absolute top-[16%] left-[14%] w-2 h-2">
          <div
            className="absolute inset-0 bg-cyan-200 rounded-full blur-[1px] animate-ping"
            style={{ animationDuration: "5s" }}
          />
          <div className="absolute top-1/2 -left-2.5 right-[-10px] h-[0.5px] bg-cyan-100/70" />
          <div className="absolute left-1/2 -top-2.5 bottom-[-10px] w-[0.5px] bg-cyan-100/70" />
        </div>
        <div className="absolute top-[26%] left-[82%] w-2 h-2">
          <div
            className="absolute inset-0 bg-blue-100 rounded-full blur-[1px] animate-ping"
            style={{ animationDuration: "6s" }}
          />
          <div className="absolute top-1/2 -left-2.5 right-[-10px] h-[0.5px] bg-blue-100/60" />
          <div className="absolute left-1/2 -top-2.5 bottom-[-10px] w-[0.5px] bg-blue-100/60" />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. REALISTIC DISTANT VENUS PLANET (Upper-Right) (Layer 4)          */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute top-8 right-6 md:top-14 md:right-20 z-10 pointer-events-none"
        style={{
          transform: `translate(${mouseOffset.x * -10}px, ${mouseOffset.y * -8}px)`,
          transition: "transform 0.35s ease-out",
        }}
      >
        {/* Venus Spherical Planet Body */}
        <div
          className="relative w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 32% 30%, #fff7e6 0%, #ecd093 25%, #c89b4b 55%, #8a5822 80%, #2e1604 100%)",
            boxShadow:
              "0 0 32px rgba(236, 208, 147, 0.4), inset -6px -6px 14px rgba(0, 0, 0, 0.9), inset 3px 3px 8px rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* Swirling Atmospheric Cloud Bands (Slowly Rotating) */}
          <div
            className="absolute inset-0 rounded-full opacity-65 mix-blend-overlay animate-spin"
            style={{
              animationDuration: "90s",
              background:
                "repeating-radial-gradient(circle at 30% 30%, transparent 0, rgba(168, 105, 30, 0.22) 6px, transparent 12px)",
            }}
          />
          {/* Day / Night Terminator Shadow (Crescent sunlight effect) */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 72% 72%, rgba(10, 5, 2, 0.9) 0%, rgba(10, 5, 2, 0.45) 45%, transparent 70%)",
            }}
          />
        </div>

        {/* Delicate Golden Atmospheric Rim Light */}
        <div
          className="absolute -inset-1.5 rounded-full blur-[4px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, rgba(254, 240, 138, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Realistic Label */}
        <div className="text-[9px] uppercase tracking-widest text-amber-200/60 text-center mt-1.5 font-mono">
          Venus
        </div>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. DISTANT PLANETARY HORIZON LIMB (Layer 3)                         */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 130% 85% at 50% 100%, rgba(14, 165, 233, 0.14) 0%, rgba(59, 130, 246, 0.06) 42%, transparent 80%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.3) 20%, rgba(147, 197, 253, 0.6) 50%, rgba(56, 189, 248, 0.3) 80%, transparent 100%)",
          boxShadow: "0 0 22px rgba(56, 189, 248, 0.4)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* 6. DISTANT METROPOLIS BACKGROUND SILHOUETTE (Layer 2.5)             */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 flex items-end justify-center pointer-events-none overflow-hidden opacity-35"
        style={{
          transform: `translate(${mouseOffset.x * -7}px, ${mouseOffset.y * -2}px)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        <div className="relative w-full max-w-7xl h-full mx-auto">
          {distantSilhouetteTowers.map((st, idx) => (
            <div
              key={idx}
              className="absolute bottom-0 bg-gradient-to-t from-[#02050f] via-[#081226] to-[#122244] border-t border-x border-cyan-500/20 rounded-t-xs"
              style={{
                left: `${st.left}%`,
                width: `${st.width}px`,
                height: `${st.height}px`,
              }}
            >
              {/* Distant window matrices */}
              <div className="absolute inset-1 grid grid-cols-2 gap-1 opacity-50 bg-[radial-gradient(circle,rgba(180,220,255,0.6)_1px,transparent_1px)] bg-[size:4px_6px]" />
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 7. FUTURISTIC CORPORATE SKYLINE: TEN DISTINGUISHED GLOBAL LEADERS   */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-84 md:h-96 flex items-end justify-center pointer-events-none overflow-hidden"
        style={{
          transform: `translate(${mouseOffset.x * -14}px, ${mouseOffset.y * -4}px)`,
          transition: "transform 0.35s ease-out",
        }}
      >
        <div className="relative w-full max-w-7xl h-full mx-auto">
          {corporateBuildings.map((b) => {
            const LogoComp = b.logo;
            return (
              <div
                key={b.id}
                className="absolute bottom-0 flex flex-col items-center group pointer-events-auto transition-transform duration-300 hover:-translate-y-2 cursor-default"
                style={{
                  left: `${b.leftPercent}%`,
                  width: `${b.width}px`,
                  zIndex: b.zIndex,
                }}
              >
                {/* Rooftop Spire & Pulsing Beacon Light */}
                <div
                  className="w-[2px] transition-all duration-300 group-hover:h-12"
                  style={{
                    height: `${b.spireHeight}px`,
                    background: `linear-gradient(to top, ${b.accentColor}, #ffffff)`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 -ml-[2px] -mt-1 rounded-full animate-ping"
                    style={{
                      backgroundColor: b.accentColor,
                      animationDuration: "3s",
                    }}
                  />
                </div>

                {/* Corporate Logo Sign Plaque on Building Crown */}
                <div
                  className="relative -mb-1 px-2 py-1 rounded-md backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "rgba(10, 18, 38, 0.92)",
                    boxShadow: `0 0 16px ${b.glowColor}`,
                    borderColor: `rgba(${b.accentColor === "#FFFFFF" ? "255,255,255" : "100,180,255"}, 0.35)`,
                  }}
                  title={`${b.name} (${b.styleName}) — ${b.styleDesc}`}
                >
                  <LogoComp className="w-5 h-4 md:w-6 md:h-5 object-contain" />
                </div>

                {/* Building Main Tower with Specific Custom Facade */}
                <div
                  className="w-full relative overflow-hidden rounded-t-sm"
                  style={{
                    height: `${b.height}px`,
                  }}
                >
                  <BuildingFacade building={b} />
                </div>

                {/* Architectural Company Name Tag */}
                <div
                  className="text-[9px] font-mono tracking-wider uppercase text-center mt-0.5 opacity-75 group-hover:opacity-100 transition-opacity font-semibold"
                  style={{ color: b.accentColor }}
                >
                  {b.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 8. HORIZON ATMOSPHERIC MIST & GRADIENT BLEND TO WEBSITE CONTENT     */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030612] via-[#030612]/80 to-transparent pointer-events-none" />
    </div>
  );
}
