"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// 1. AUTHENTIC VECTOR LOGOS FOR THE 10 GLOBAL CORPORATIONS
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
      <path
        d="M2.5 16.2C7.5 19.4 17.5 19.4 23.5 15.2"
        stroke="#FF9900"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M22.5 14.2L24.8 15.5L23.2 17.5" fill="#FF9900" />
    </svg>
  );
}

function NvidiaLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="3.5" fill="#76B900" />
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
// 2. ORBITAL PLANET COMPONENT (INSPIRED BY IMAGE 3: EARTH FROM SPACE AT NIGHT)
// ============================================================================

function OrbitalPlanetEarth({ mouseOffset }: { mouseOffset: { x: number; y: number } }) {
  // 14 prominent nocturnal city clusters (Image 3: glowing golden lights across continent)
  const cityClusters = useMemo(
    () => [
      { id: "delhi", x: 42, y: 38, size: 7, pulse: 2.8, intensity: 1.0 },
      { id: "mumbai", x: 31, y: 55, size: 6.5, pulse: 3.2, intensity: 0.95 },
      { id: "bangalore", x: 36, y: 70, size: 6, pulse: 2.4, intensity: 0.9 },
      { id: "hyderabad", x: 41, y: 60, size: 5.5, pulse: 3.0, intensity: 0.85 },
      { id: "chennai", x: 42, y: 74, size: 5.5, pulse: 3.5, intensity: 0.85 },
      { id: "kolkata", x: 59, y: 46, size: 6, pulse: 2.6, intensity: 0.9 },
      { id: "ahmedabad", x: 28, y: 46, size: 5, pulse: 3.1, intensity: 0.8 },
      { id: "pune", x: 33, y: 58, size: 4.8, pulse: 2.9, intensity: 0.75 },
      { id: "ganga1", x: 48, y: 41, size: 4.5, pulse: 3.4, intensity: 0.8 },
      { id: "ganga2", x: 53, y: 43, size: 4.2, pulse: 2.7, intensity: 0.75 },
      { id: "kochi", x: 34, y: 82, size: 4, pulse: 3.6, intensity: 0.7 },
      { id: "jaipur", x: 37, y: 41, size: 4.2, pulse: 3.3, intensity: 0.7 },
      { id: "lahore", x: 36, y: 31, size: 4.5, pulse: 3.1, intensity: 0.75 },
      { id: "dhaka", x: 64, y: 45, size: 5, pulse: 2.9, intensity: 0.8 },
    ],
    []
  );

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{
        transform: `translate(${mouseOffset.x * -8}px, ${mouseOffset.y * -5}px)`,
        transition: "transform 0.4s ease-out",
      }}
    >
      {/* Sweeping Curvature of the Planet across the canvas */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-90"
      >
        <defs>
          {/* Atmospheric Glow Radial & Linear Gradients */}
          <radialGradient id="oceanGradient" cx="45%" cy="65%" r="75%">
            <stop offset="0%" stopColor="#0a1936" />
            <stop offset="35%" stopColor="#061026" />
            <stop offset="65%" stopColor="#030815" />
            <stop offset="100%" stopColor="#010308" />
          </radialGradient>

          {/* Electric Cyan Atmospheric Limb Glow (Image 3 signature) */}
          <linearGradient id="atmosphereLimb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="20%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0" />
          </linearGradient>

          {/* Golden City Light Glow Filter */}
          <filter id="cityGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="himalayanLimbGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. PLANETARY GLOBE BODY: SWEEPING CURVED HORIZON FROM SPACE */}
        <path
          d="M -150 950 C 200 480, 750 360, 1600 420 L 1600 1100 L -150 1100 Z"
          fill="url(#oceanGradient)"
        />

        {/* 2. ATMOSPHERIC LIMB: INTENSE ELECTRIC BLUE ARC (Image 3) */}
        <path
          d="M -150 950 C 200 480, 750 360, 1600 420"
          fill="none"
          stroke="url(#atmosphereLimb)"
          strokeWidth="14"
          filter="url(#himalayanLimbGlow)"
          opacity="0.9"
        />
        <path
          d="M -150 950 C 200 480, 750 360, 1600 420"
          fill="none"
          stroke="#e0f2fe"
          strokeWidth="3.5"
          opacity="0.95"
        />

        {/* 3. CONTINENTAL TERRAIN: HIMALAYAS & PENINSULA SILHOUETTE (Image 3) */}
        {/* Himalayan Mountain Arc in Twilight Cyan-White Relief */}
        <path
          d="M 320 540 Q 560 440 820 460 Q 940 470 1060 500"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="5"
          strokeDasharray="6 3 12 4"
          opacity="0.65"
          filter="url(#himalayanLimbGlow)"
        />
        <path
          d="M 340 550 C 480 470, 720 460, 980 490"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
          opacity="0.5"
        />

        {/* Indian Coastline Outline in Subtle Twilight Cyan */}
        <path
          d="M 380 580 C 350 640 420 720 470 810 C 510 870 540 890 560 900 C 580 880 620 800 680 730 C 740 670 820 640 870 610"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="2.5"
          opacity="0.4"
        />

        {/* 4. GOLDEN CITY LIGHT NETWORKS AT NIGHT (Image 3 Signature) */}
        <g filter="url(#cityGlow)">
          {/* Inter-City Highway Corridors / Data Network Strands */}
          <path
            d="M 520 620 L 440 710 L 490 800 L 580 780 L 690 680 L 610 630 Z"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.4"
          />
          <path
            d="M 520 620 L 730 630 L 690 680"
            fill="none"
            stroke="#fde047"
            strokeWidth="1"
            strokeDasharray="3 4"
            opacity="0.35"
          />

          {/* Twinkling Golden City Clusters */}
          {cityClusters.map((c) => {
            // Map percentage coords to SVG canvas coordinate space
            const cx = (c.x / 100) * 1440;
            const cy = 350 + (c.y / 100) * 550;
            return (
              <g key={c.id}>
                {/* City Glow Halo */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={c.size * 3.2}
                  fill="#f59e0b"
                  opacity={0.3 * c.intensity}
                  className="animate-pulse"
                  style={{ animationDuration: `${c.pulse * 1.5}s` }}
                />
                {/* Inner Bright Golden Core */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={c.size}
                  fill="#fef08a"
                  opacity={0.85 * c.intensity}
                />
                {/* Hot White Metropolitan Epicenter */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={c.size * 0.45}
                  fill="#ffffff"
                  opacity={0.95}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

// ============================================================================
// 3. CYBER CITY ARCHITECTURE (INSPIRED BY IMAGES 1 & 2: DLF CYBER CITY/HUB)
// ============================================================================

interface CyberCityBuilding {
  id: string;
  name: string;
  roleDomain: string;
  logo: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  height: number; // in pixels
  width: number;
  leftPercent: number; // position on horizon
  zIndex: number;
  spireHeight: number;
  architecturalStyle:
    | "trapezoid-gateway" // Building 10 signature leaning frame (Image 2)
    | "cylindrical-tower" // Building 8 curved tower (Image 1)
    | "stepped-cantilever" // Building 9 & 10 stepped campus (Image 1 & 2)
    | "glass-pylon-bridge" // Dual tower with skywalk bridge (Image 1)
    | "titanium-monolith"; // Minimalist cyber monolith
}

const cyberBuildings: CyberCityBuilding[] = [
  {
    id: "accenture",
    name: "Accenture",
    roleDomain: "Consulting & Cloud",
    logo: AccentureLogo,
    accentColor: "#A100FF",
    glowColor: "rgba(161, 0, 255, 0.45)",
    height: 250,
    width: 82,
    leftPercent: 2,
    zIndex: 1,
    spireHeight: 28,
    architecturalStyle: "stepped-cantilever",
  },
  {
    id: "ibm",
    name: "IBM",
    roleDomain: "Enterprise & RedHat",
    logo: IbmLogo,
    accentColor: "#0F62FE",
    glowColor: "rgba(15, 98, 254, 0.45)",
    height: 285,
    width: 88,
    leftPercent: 11.5,
    zIndex: 2,
    spireHeight: 24,
    architecturalStyle: "cylindrical-tower",
  },
  {
    id: "google",
    name: "Google",
    roleDomain: "AI & Distributed Systems",
    logo: GoogleLogo,
    accentColor: "#4285F4",
    glowColor: "rgba(66, 133, 244, 0.5)",
    height: 350,
    width: 104,
    leftPercent: 21.5,
    zIndex: 4,
    spireHeight: 36,
    architecturalStyle: "trapezoid-gateway", // Signature Leaning Frame (Image 2)
  },
  {
    id: "deloitte",
    name: "Deloitte",
    roleDomain: "Advisory & Strategy",
    logo: DeloitteLogo,
    accentColor: "#86BC25",
    glowColor: "rgba(134, 188, 37, 0.45)",
    height: 320,
    width: 92,
    leftPercent: 32,
    zIndex: 3,
    spireHeight: 30,
    architecturalStyle: "stepped-cantilever", // Inspired directly by Deloitte building in Image 1
  },
  {
    id: "microsoft",
    name: "Microsoft",
    roleDomain: "Azure & Enterprise AI",
    logo: MicrosoftLogo,
    accentColor: "#00A4EF",
    glowColor: "rgba(0, 164, 239, 0.5)",
    height: 395,
    width: 110,
    leftPercent: 42.5,
    zIndex: 5,
    spireHeight: 46,
    architecturalStyle: "trapezoid-gateway", // Signature Leaning Frame (Image 2)
  },
  {
    id: "apple",
    name: "Apple",
    roleDomain: "Silicon & Swift Systems",
    logo: AppleLogo,
    accentColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.5)",
    height: 375,
    width: 98,
    leftPercent: 53.5,
    zIndex: 5,
    spireHeight: 38,
    architecturalStyle: "titanium-monolith",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    roleDomain: "CUDA & Accelerated Computing",
    logo: NvidiaLogo,
    accentColor: "#76B900",
    glowColor: "rgba(118, 185, 0, 0.5)",
    height: 340,
    width: 94,
    leftPercent: 64,
    zIndex: 4,
    spireHeight: 32,
    architecturalStyle: "glass-pylon-bridge",
  },
  {
    id: "amazon",
    name: "Amazon",
    roleDomain: "AWS Cloud & Infrastructure",
    logo: AmazonLogo,
    accentColor: "#FF9900",
    glowColor: "rgba(255, 153, 0, 0.45)",
    height: 345,
    width: 96,
    leftPercent: 74.5,
    zIndex: 3,
    spireHeight: 30,
    architecturalStyle: "stepped-cantilever",
  },
  {
    id: "meta",
    name: "Meta",
    roleDomain: "PyTorch & Meta AI",
    logo: MetaLogo,
    accentColor: "#0668E1",
    glowColor: "rgba(6, 104, 225, 0.45)",
    height: 290,
    width: 86,
    leftPercent: 84.5,
    zIndex: 2,
    spireHeight: 22,
    architecturalStyle: "cylindrical-tower", // Curved Cylinder from Image 1
  },
  {
    id: "tcs",
    name: "TCS",
    roleDomain: "Global Digital Solutions",
    logo: TcsLogo,
    accentColor: "#0070AD",
    glowColor: "rgba(0, 112, 173, 0.45)",
    height: 260,
    width: 82,
    leftPercent: 93,
    zIndex: 1,
    spireHeight: 24,
    architecturalStyle: "glass-pylon-bridge",
  },
];

// Specialized Architectural Facade Renderers (Images 1 & 2 Design Language)
function CyberBuildingFacade({ building }: { building: CyberCityBuilding }) {
  const { architecturalStyle, accentColor } = building;

  switch (architecturalStyle) {
    case "trapezoid-gateway": // DLF Cyber City Building 10 Signature Leaning Frame (Image 2)
      return (
        <div className="relative w-full h-full overflow-hidden">
          {/* Prominent White Architectural Angled Leaning Pylon (Image 2) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-5 bg-gradient-to-r from-slate-100 via-white to-slate-200 shadow-md border-r border-slate-300 z-10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 75% 100%, 0 100%)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-0 w-5 bg-gradient-to-l from-slate-100 via-white to-slate-200 shadow-md border-l border-slate-300 z-10"
            style={{
              clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          />

          {/* Emerald / Cyan Reflective Glass Curtain Wall (Image 2) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c3138] via-[#082228] to-[#041014] border-t border-cyan-400/30">
            {/* Horizontal White Floor Slab Louvers (Image 2) */}
            <div className="absolute inset-x-2 inset-y-1 flex flex-col justify-between opacity-80 pointer-events-none">
              {[...Array(14)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-[1px] bg-cyan-200/50 shadow-[0_0_4px_rgba(56,189,248,0.4)]"
                />
              ))}
            </div>

            {/* Micro Window Office Lights Matrix */}
            <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-70 bg-[radial-gradient(circle,rgba(200,250,255,0.7)_1px,transparent_1px)] bg-[size:5px_7px]" />

            {/* Signature Angled White Glazing Cross-Ribbon (Image 2) */}
            <div
              className="absolute top-0 bottom-0 left-1/3 w-3 bg-white/20 -skew-x-12 border-x border-white/40 shadow-[0_0_8px_rgba(255,255,255,0.3)] pointer-events-none"
            />
          </div>
          {/* Building Base Atmospheric Fade */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#030612] to-transparent z-20" />
        </div>
      );

    case "cylindrical-tower": // Cylindrical Glass Horizon Tower (Image 1 Background)
      return (
        <div className="relative w-full h-full rounded-t-full border-t border-x border-white/30 bg-gradient-to-b from-[#132c44] via-[#0b1c2e] to-[#030a12] overflow-hidden">
          {/* Curved Circular Floor Slabs (Image 1) */}
          <div className="absolute inset-0 flex flex-col justify-between py-2 opacity-75">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_6px_rgba(56,189,248,0.5)]"
              />
            ))}
          </div>
          {/* Subtle Vertical Louvers */}
          <div className="absolute inset-2 grid grid-cols-5 gap-1 opacity-65 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:5px_7px]" />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#030612] to-transparent z-20" />
        </div>
      );

    case "stepped-cantilever": // Stepped Cantilever Campus with White Trim (Image 1 & 2)
      return (
        <div className="relative w-full h-full flex flex-col items-center">
          {/* Top Tier (Cantilever setback) */}
          <div className="w-3/4 h-1/4 relative border-t-2 border-x-2 border-white/80 bg-gradient-to-b from-[#17303e] to-[#0d1d26]">
            <div className="absolute inset-1 grid grid-cols-3 gap-0.5 opacity-65 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:4px_6px]" />
          </div>
          {/* Main Tier with White Framing Ribs */}
          <div className="w-full flex-1 relative border-t-2 border-x-2 border-white/80 bg-gradient-to-b from-[#0e222e] via-[#091720] to-[#030a0e] overflow-hidden">
            {/* White Vertical Cantilever Accent (Image 1) */}
            <div className="absolute top-0 bottom-0 left-2 w-2 bg-white/90 shadow-sm border-r border-slate-300" />
            <div className="absolute top-0 bottom-0 right-2 w-2 bg-white/90 shadow-sm border-l border-slate-300" />
            {/* Green Reflective Glass Grid */}
            <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-70 bg-[radial-gradient(circle,rgba(180,240,220,0.7)_1px,transparent_1px)] bg-[size:6px_8px]" />
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#030612] to-transparent z-20" />
          </div>
        </div>
      );

    case "glass-pylon-bridge": // Dual Tower with Transparent Skywalk (Image 1 & 2)
      return (
        <div className="relative w-full h-full flex justify-between border-t border-x border-white/25 bg-gradient-to-b from-[#102a3a] to-[#040e16] p-1 overflow-hidden">
          {/* Left Glass Column */}
          <div className="w-[44%] h-full relative border-r border-cyan-400/30 bg-cyan-950/40">
            <div className="absolute inset-1 grid grid-cols-2 gap-0.5 opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:4px_6px]" />
          </div>
          {/* Transparent Skybridge connecting pylons (Image 1) */}
          <div className="absolute top-1/4 inset-x-1 h-3.5 bg-gradient-to-r from-white/30 via-cyan-400/40 to-white/30 border-y border-white/60 shadow-[0_0_10px_rgba(56,189,248,0.6)] z-10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
          </div>
          {/* Right Glass Column */}
          <div className="w-[44%] h-full relative border-l border-cyan-400/30 bg-cyan-950/40">
            <div className="absolute inset-1 grid grid-cols-2 gap-0.5 opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:4px_6px]" />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#030612] to-transparent z-20" />
        </div>
      );

    case "titanium-monolith": // Sleek Frosted Glass & Titanium Monolith
      return (
        <div className="relative w-full h-full rounded-t-xl border-t-2 border-x-2 border-slate-200/90 bg-gradient-to-b from-[#1a2332]/95 via-[#0f1724] to-[#04070c] overflow-hidden shadow-lg">
          <div className="absolute top-0 bottom-0 left-1 w-1 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute top-0 bottom-0 right-1 w-1 bg-gradient-to-l from-white to-transparent" />
          <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:5px_7px]" />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#030612] to-transparent z-20" />
        </div>
      );

    default:
      return null;
  }
}

// Generate consistent twinkling cosmic starfield
function generateStarfield(count = 110) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: ((i * 137.508) % 100).toFixed(2),
      y: ((i * 61.803) % 65).toFixed(2),
      size: (0.9 + (i % 4) * 0.45).toFixed(1),
      opacity: (0.3 + (i % 5) * 0.15).toFixed(2),
      duration: (3 + (i % 5) * 1.4).toFixed(1),
      delay: ((i % 8) * 0.7).toFixed(1),
    });
  }
  return stars;
}

// ============================================================================
// 4. MAIN FUTURISTIC HERO BACKGROUND COMPONENT
// ============================================================================

export default function FuturisticUniverseHero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [hoveredBuilding, setHoveredBuilding] = useState<CyberCityBuilding | null>(null);
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
      {/* 1. DEEP SPACE COSMIC BACKDROP                                       */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 90% at 50% 5%, #0d1a3c 0%, #060e24 40%, #030612 80%, #02040a 100%)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* 2. TWINKLING COSMIC STARS WITH PARALLAX                             */}
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

        {/* Distant Navigation Stars with Diffraction Crosses */}
        <div className="absolute top-[14%] left-[12%] w-2 h-2">
          <div className="absolute inset-0 bg-cyan-200 rounded-full blur-[1px] animate-ping" style={{ animationDuration: "5s" }} />
          <div className="absolute top-1/2 -left-2.5 right-[-10px] h-[0.5px] bg-cyan-100/70" />
          <div className="absolute left-1/2 -top-2.5 bottom-[-10px] w-[0.5px] bg-cyan-100/70" />
        </div>
        <div className="absolute top-[22%] left-[84%] w-2 h-2">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-[1px] animate-ping" style={{ animationDuration: "6s" }} />
          <div className="absolute top-1/2 -left-2.5 right-[-10px] h-[0.5px] bg-blue-100/60" />
          <div className="absolute left-1/2 -top-2.5 bottom-[-10px] w-[0.5px] bg-blue-100/60" />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. GRAND ORBITAL PLANET WITH NOCTURNAL CITY LIGHTS (IMAGE 3)        */}
      {/* ------------------------------------------------------------------ */}
      <OrbitalPlanetEarth mouseOffset={mouseOffset} />

      {/* ------------------------------------------------------------------ */}
      {/* 4. ELEVATED CYBER SKYWALK & PODIUM NETWORK (IMAGES 1 & 2)           */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute bottom-6 left-0 right-0 h-16 pointer-events-none overflow-hidden opacity-90 z-[3]"
        style={{
          transform: `translate(${mouseOffset.x * -10}px, ${mouseOffset.y * -3}px)`,
          transition: "transform 0.35s ease-out",
        }}
      >
        <div className="relative w-full max-w-7xl h-full mx-auto">
          {/* Elevated Glass Skybridge (DLF Cyber Hub Skywalk from Images 1 & 2) */}
          <div className="absolute bottom-3 inset-x-2 h-5 bg-gradient-to-r from-slate-900/90 via-[#0e273c]/95 to-slate-900/90 border-y-2 border-white/60 shadow-[0_0_16px_rgba(56,189,248,0.4)] backdrop-blur-md rounded-xs flex items-center justify-between px-4">
            {/* Green Rooftop Garden Hedges along Walkway (Image 1) */}
            <div className="absolute -top-1.5 inset-x-4 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 rounded-full opacity-90 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />

            {/* Glowing Career Data Nodes moving across the Skywalk */}
            <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
            <div className="flex gap-4">
              <span className="text-[8px] font-mono tracking-widest text-cyan-200/80 uppercase">
                DLF Cyber Tech Hub • Global Enterprise Park
              </span>
            </div>
            <div className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. CYBER CITY SKYLINE: TEN GLOBAL CORPORATIONS (IMAGES 1 & 2)       */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-88 md:h-98 flex items-end justify-center pointer-events-none overflow-hidden z-[4]"
        style={{
          transform: `translate(${mouseOffset.x * -14}px, ${mouseOffset.y * -4}px)`,
          transition: "transform 0.35s ease-out",
        }}
      >
        <div className="relative w-full max-w-7xl h-full mx-auto">
          {cyberBuildings.map((b) => {
            const LogoComp = b.logo;
            const isHovered = hoveredBuilding?.id === b.id;

            return (
              <div
                key={b.id}
                onMouseEnter={() => setHoveredBuilding(b)}
                onMouseLeave={() => setHoveredBuilding(null)}
                className="absolute bottom-0 flex flex-col items-center group pointer-events-auto transition-all duration-300 hover:-translate-y-3 cursor-pointer"
                style={{
                  left: `${b.leftPercent}%`,
                  width: `${b.width}px`,
                  zIndex: b.zIndex,
                }}
              >
                {/* Rooftop Antenna Spire with Pulsing Beacon Light */}
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

                {/* Backlit Corporate Logo Signboard on Crown (Images 1 & 2 Style) */}
                <div
                  className="relative -mb-1 px-2.5 py-1.5 rounded-md backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-115"
                  style={{
                    backgroundColor: "rgba(10, 18, 38, 0.94)",
                    boxShadow: `0 0 18px ${b.glowColor}`,
                    borderColor: `rgba(${b.accentColor === "#FFFFFF" ? "255,255,255" : "120,200,255"}, 0.4)`,
                  }}
                >
                  <LogoComp className="w-5 h-4 md:w-6 md:h-5 object-contain" />
                </div>

                {/* Cyber City Building Facade Body */}
                <div
                  className="w-full relative overflow-hidden rounded-t-sm shadow-2xl transition-all duration-300 group-hover:brightness-110"
                  style={{
                    height: `${b.height}px`,
                  }}
                >
                  <CyberBuildingFacade building={b} />
                </div>

                {/* Cyber City Building Name Tag */}
                <div
                  className="text-[9px] font-mono tracking-wider uppercase text-center mt-1 opacity-80 group-hover:opacity-100 transition-opacity font-bold"
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
      {/* 6. DYNAMIC BUILDING HOVER CARD (HUD PREVIEW)                        */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {hoveredBuilding && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex absolute top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none items-center gap-3 bg-slate-900/90 backdrop-blur-lg px-5 py-2.5 rounded-xl border border-white/20 shadow-2xl shadow-black/60"
          >
            <div
              className="w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: hoveredBuilding.accentColor }}
            />
            <div className="text-left">
              <span className="text-xs font-bold text-white tracking-wide">
                {hoveredBuilding.name}
              </span>
              <span className="mx-2 text-slate-500">•</span>
              <span className="text-xs text-cyan-300 font-medium">
                {hoveredBuilding.roleDomain}
              </span>
            </div>
            <div className="ml-3 pl-3 border-l border-white/10 text-xs font-mono text-emerald-400 font-semibold">
              98% ATS Match Ready
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* 7. HORIZON ATMOSPHERIC MIST & GRADIENT BLEND TO WEBSITE CONTENT     */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030612] via-[#030612]/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}
