"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

// ============================================================================
// INTERACTIVE BUILDING HOTSPOTS ON THE CYBER TOWERS
// ============================================================================
interface BuildingHotspot {
  id: string;
  name: string;
  roleDomain: string;
  matchScore: number;
  topPercent: number; // Y position in %
  leftPercent: number; // X position in %
  accentColor: string;
}

const buildingHotspots: BuildingHotspot[] = [
  {
    id: "google",
    name: "Google",
    roleDomain: "Cloud, AI & Systems",
    matchScore: 98,
    topPercent: 51,
    leftPercent: 23,
    accentColor: "#4285F4",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    roleDomain: "Azure & Enterprise Core",
    matchScore: 97,
    topPercent: 51.5,
    leftPercent: 33.5,
    accentColor: "#00A4EF",
  },
  {
    id: "amazon",
    name: "Amazon",
    roleDomain: "AWS Cloud & Logistics",
    matchScore: 98,
    topPercent: 52,
    leftPercent: 39.5,
    accentColor: "#FF9900",
  },
  {
    id: "apple",
    name: "Apple",
    roleDomain: "Silicon & iOS Architecture",
    matchScore: 99,
    topPercent: 50.8,
    leftPercent: 57.5,
    accentColor: "#FFFFFF",
  },
  {
    id: "deloitte",
    name: "Deloitte",
    roleDomain: "Advisory & Strategy",
    matchScore: 96,
    topPercent: 52.2,
    leftPercent: 63,
    accentColor: "#86BC25",
  },
  {
    id: "meta",
    name: "Meta",
    roleDomain: "PyTorch & AI Infrastructure",
    matchScore: 98,
    topPercent: 58.5,
    leftPercent: 71.5,
    accentColor: "#0668E1",
  },
  {
    id: "tcs",
    name: "TCS",
    roleDomain: "Global Digital Solutions",
    matchScore: 95,
    topPercent: 62.5,
    leftPercent: 71.5,
    accentColor: "#38BDF8",
  },
];

// Generate consistent twinkling cosmic starfield in outer space
function generateStarfield(count = 95) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: ((i * 137.508) % 100).toFixed(2),
      y: ((i * 61.803) % 45).toFixed(2), // Stars in upper cosmic space
      size: (0.9 + (i % 4) * 0.45).toFixed(1),
      opacity: (0.35 + (i % 5) * 0.15).toFixed(2),
      duration: (2.8 + (i % 5) * 1.2).toFixed(1),
      delay: ((i % 7) * 0.6).toFixed(1),
    });
  }
  return stars;
}

// Generate dynamic twinkling city light nodes overlaying the nocturnal continent
function generateCityLights(count = 28) {
  const lights = [];
  const coords = [
    { x: 26, y: 32 }, { x: 30, y: 30 }, { x: 34, y: 28 }, { x: 38, y: 26 },
    { x: 42, y: 24 }, { x: 46, y: 22 }, { x: 50, y: 21 }, { x: 54, y: 22 },
    { x: 28, y: 35 }, { x: 33, y: 34 }, { x: 37, y: 32 }, { x: 42, y: 31 },
    { x: 47, y: 30 }, { x: 52, y: 29 }, { x: 25, y: 38 }, { x: 30, y: 39 },
    { x: 35, y: 38 }, { x: 39, y: 36 }, { x: 44, y: 36 }, { x: 22, y: 40 },
    { x: 27, y: 43 }, { x: 32, y: 42 }, { x: 36, y: 41 }, { x: 40, y: 40 },
    { x: 18, y: 44 }, { x: 23, y: 46 }, { x: 28, y: 47 }, { x: 33, y: 46 },
  ];
  for (let i = 0; i < count; i++) {
    const c = coords[i % coords.length];
    lights.push({
      x: c.x,
      y: c.y,
      size: (1.5 + (i % 3) * 0.8).toFixed(1),
      duration: (1.8 + (i % 4) * 0.8).toFixed(1),
      delay: ((i % 6) * 0.4).toFixed(1),
    });
  }
  return lights;
}

export default function FuturisticUniverseHero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState<BuildingHotspot | null>(null);

  const stars = useMemo(() => generateStarfield(95), []);
  const cityLights = useMemo(() => generateCityLights(28), []);

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#030612]">
      {/* ------------------------------------------------------------------ */}
      {/* 1. MASTER FUTURISTIC HERO BACKGROUND IMAGE (DYNAMIC PARALLAX)      */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate(${mouseOffset.x * -14}px, ${mouseOffset.y * -8}px) scale(1.05)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cyber-city-universe.jpg"
          alt="Futuristic Cyber City with Orbital Earth View"
          className="w-full h-full object-cover object-center brightness-105 contrast-105"
          fetchPriority="high"
        />

        {/* Ambient Cosmic Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-[#030612]/20 to-[#030612]/70 pointer-events-none" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. DYNAMIC TWINKLING STARS IN DEEP SPACE (LAYER 4)                 */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mouseOffset.x * -6}px, ${mouseOffset.y * -4}px)`,
          transition: "transform 0.4s ease-out",
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

        {/* Prominent Cross-Diffraction Celestial Nav Stars */}
        <div className="absolute top-[8%] left-[18%] w-2 h-2">
          <div className="absolute inset-0 bg-cyan-200 rounded-full blur-[1px] animate-ping" style={{ animationDuration: "4s" }} />
          <div className="absolute top-1/2 -left-3 right-[-12px] h-[0.5px] bg-cyan-100/80" />
          <div className="absolute left-1/2 -top-3 bottom-[-12px] w-[0.5px] bg-cyan-100/80" />
        </div>
        <div className="absolute top-[12%] right-[16%] w-2 h-2">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-[1px] animate-ping" style={{ animationDuration: "5s" }} />
          <div className="absolute top-1/2 -left-3 right-[-12px] h-[0.5px] bg-blue-100/70" />
          <div className="absolute left-1/2 -top-3 bottom-[-12px] w-[0.5px] bg-blue-100/70" />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. DYNAMIC PULSING NOCTURNAL CITY LIGHTS ON ORBITAL EARTH (IMAGE 3)*/}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mouseOffset.x * -10}px, ${mouseOffset.y * -6}px)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        {cityLights.map((cl, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-amber-300 blur-[0.8px] animate-ping"
            style={{
              left: `${cl.x}%`,
              top: `${cl.y}%`,
              width: `${cl.size}px`,
              height: `${cl.size}px`,
              animationDuration: `${cl.duration}s`,
              animationDelay: `${cl.delay}s`,
            }}
          />
        ))}

        {/* Glowing Atmospheric Limb Auroral Halo Arc */}
        <div
          className="absolute top-[4%] inset-x-0 h-44 pointer-events-none opacity-45 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 95% 45% at 50% 12%, rgba(56, 189, 248, 0.45) 0%, rgba(14, 165, 233, 0.2) 40%, transparent 80%)",
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. DYNAMIC LIGHT DATA STREAM ALONG THE HIGH-ALTITUDE SKYBRIDGE     */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute top-[56.5%] left-[43%] w-[12%] h-2 pointer-events-none overflow-hidden hidden md:block"
        style={{
          transform: `translate(${mouseOffset.x * -14}px, ${mouseOffset.y * -8}px)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        {/* Animated Light Pulse traveling between Tower Wings */}
        <div className="w-8 h-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#38bdf8] animate-[marquee_2.8s_linear_infinite]" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. INTERACTIVE CORPORATE BUILDING HOTSPOTS & HUD BADGES            */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute inset-0 pointer-events-auto"
        style={{
          transform: `translate(${mouseOffset.x * -14}px, ${mouseOffset.y * -8}px)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        {buildingHotspots.map((hs) => {
          const isActive = activeHotspot?.id === hs.id;
          return (
            <div
              key={hs.id}
              onMouseEnter={() => setActiveHotspot(hs)}
              onMouseLeave={() => setActiveHotspot(null)}
              onClick={() => setActiveHotspot(isActive ? null : hs)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                top: `${hs.topPercent}%`,
                left: `${hs.leftPercent}%`,
              }}
            >
              {/* Pulsing Radar Ring on Company Building Crown */}
              <div
                className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center transition-transform duration-300 group-hover:scale-130 shadow-lg"
                style={{
                  backgroundColor: "rgba(10, 18, 38, 0.8)",
                  boxShadow: `0 0 12px ${hs.accentColor}`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: hs.accentColor }}
                />
              </div>

              {/* Floating Mini Company Pill */}
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase text-white bg-slate-900/85 backdrop-blur-md border border-white/20 shadow-md whitespace-nowrap opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all"
                style={{
                  borderColor: hs.accentColor,
                }}
              >
                {hs.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 6. DYNAMIC HUD PREVIEW CARD (ON HOVER)                             */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.94 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="hidden md:flex absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none items-center gap-3 bg-slate-950/90 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/25 shadow-2xl shadow-blue-950/80"
          >
            <div
              className="w-3.5 h-3.5 rounded-full animate-pulse shadow-md"
              style={{ backgroundColor: activeHotspot.accentColor }}
            />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white tracking-wide">
                  {activeHotspot.name}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-cyan-300 font-medium">
                  {activeHotspot.roleDomain}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                ATS Resume Templates Optimized for {activeHotspot.name} Recruiters
              </p>
            </div>
            <div className="ml-3 pl-3 border-l border-white/15 flex items-center gap-1 text-xs font-mono font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {activeHotspot.matchScore}% Compatibility
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* 7. HORIZON ATMOSPHERIC CLOUD MIST & BOTTOM GRADIENT TO CONTENT     */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#030612] via-[#030612]/85 to-transparent pointer-events-none z-10" />
    </div>
  );
}
