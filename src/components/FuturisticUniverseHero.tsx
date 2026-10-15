"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

// --- ACCURATE VECTOR LOGOS FOR THE 10 GLOBAL CORPORATIONS ---

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

function AmazonLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M18.8 17.5c-4.9 3.6-12 1.9-16.1-.9-.3-.2 0-.6.4-.4 4.1 2.4 10.7 3.3 15.3-.2.4-.3.7.2.4.5z"
        fill="#FF9900"
      />
      <path
        d="M20.2 16.2c-.4-.5-2.6-.3-3.6-.1-.3 0-.4-.2-.1-.4 1.8-1.2 4.7-.9 5.1-.3.3.6-.2 3.5-1.9 4.9-.3.2-.5.1-.4-.2.4-.9 1.3-3.4.9-3.9z"
        fill="#FF9900"
      />
      <path
        d="M13.2 4.4C10.6 4.4 7 5.7 7 10.3c0 3.5 2 5.3 4.8 5.3 2 0 3.1-.9 4.3-2.3v1.8h2.3V4.8h-2.3v1.7c-1-1.3-2.1-2.1-2.9-2.1zm-.2 9.2c-1.8 0-3.1-1.4-3.1-3.6s1.3-3.6 3.1-3.6c1.6 0 2.8 1.3 2.8 3.6 0 2.3-1.2 3.6-2.8 3.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function NvidiaLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M11.9 3.5c-4.9 0-8.9 4-8.9 8.9 0 4.9 4 8.9 8.9 8.9 2.5 0 4.8-1.1 6.5-2.8l-1.9-1.9c-1.2 1.2-2.8 2-4.6 2-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2 2.6 0 4.8 1.6 5.7 3.9h2.9C19.4 6 16 3.5 11.9 3.5z"
        fill="#76B900"
      />
      <path
        d="M11.9 7.1c-2.9 0-5.3 2.4-5.3 5.3 0 2.9 2.4 5.3 5.3 5.3 1.5 0 2.9-.6 3.9-1.6l-1.9-1.9c-.5.5-1.2.8-2 .8-1.5 0-2.6-1.2-2.6-2.6 0-1.5 1.2-2.6 2.6-2.6 1 0 1.9.6 2.3 1.5h2.9C16.5 8.8 14.4 7.1 11.9 7.1z"
        fill="#76B900"
      />
      <circle cx="11.9" cy="12.4" r="1.3" fill="#76B900" />
    </svg>
  );
}

function DeloitteLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <text
        x="1"
        y="16"
        fill="#FFFFFF"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="14"
        letterSpacing="-0.5"
      >
        Deloitte
      </text>
      <circle cx="21.5" cy="15.5" r="2.2" fill="#86BC25" />
    </svg>
  );
}

function TcsLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#0070AD" fillOpacity="0.2" />
      <text
        x="12"
        y="16.5"
        fill="#38BDF8"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="12"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        TCS
      </text>
    </svg>
  );
}

function AppleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
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

function IbmLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <g fill="#0F62FE">
        <rect x="2" y="5" width="20" height="1" />
        <rect x="2" y="7" width="20" height="1" />
        <rect x="2" y="9" width="20" height="1" />
        <rect x="2" y="11" width="20" height="1" />
        <rect x="2" y="13" width="20" height="1" />
        <rect x="2" y="15" width="20" height="1" />
        <rect x="2" y="17" width="20" height="1" />
      </g>
      <text
        x="12"
        y="15.5"
        fill="#FFFFFF"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="11"
        textAnchor="middle"
        letterSpacing="1.2"
      >
        IBM
      </text>
    </svg>
  );
}

function AccentureLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 6l5 6-5 6h3.5l5-6-5-6H12z" fill="#A100FF" />
      <text
        x="2"
        y="16"
        fill="#FFFFFF"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="11"
        letterSpacing="-0.5"
      >
        accenture
      </text>
    </svg>
  );
}

// --- SKYLINE DATA: TEN DISTINGUISHED GLOBAL COMPANIES ---
interface CompanyBuilding {
  id: string;
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  height: number; // in pixels
  width: number;
  leftPercent: number; // position on horizon
  zIndex: number;
  spireHeight: number;
  styleDesc: string;
}

const corporateBuildings: CompanyBuilding[] = [
  {
    id: "accenture",
    name: "Accenture",
    logo: AccentureLogo,
    accentColor: "#A100FF",
    glowColor: "rgba(161, 0, 255, 0.4)",
    height: 250,
    width: 76,
    leftPercent: 2,
    zIndex: 1,
    spireHeight: 28,
    styleDesc: "Angular purple-chevron innovation tower",
  },
  {
    id: "ibm",
    name: "IBM",
    logo: IbmLogo,
    accentColor: "#0F62FE",
    glowColor: "rgba(15, 98, 254, 0.4)",
    height: 290,
    width: 86,
    leftPercent: 11,
    zIndex: 2,
    spireHeight: 24,
    styleDesc: "8-bar horizontal louvers enterprise monolith",
  },
  {
    id: "google",
    name: "Google",
    logo: GoogleLogo,
    accentColor: "#4285F4",
    glowColor: "rgba(66, 133, 244, 0.45)",
    height: 350,
    width: 96,
    leftPercent: 21,
    zIndex: 4,
    spireHeight: 36,
    styleDesc: "Modern stepped glass campus with 4-color trim",
  },
  {
    id: "deloitte",
    name: "Deloitte",
    logo: DeloitteLogo,
    accentColor: "#86BC25",
    glowColor: "rgba(134, 188, 37, 0.4)",
    height: 310,
    width: 84,
    leftPercent: 32,
    zIndex: 3,
    spireHeight: 26,
    styleDesc: "Refined business tower with emerald beacon",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: MicrosoftLogo,
    accentColor: "#00A4EF",
    glowColor: "rgba(0, 164, 239, 0.45)",
    height: 390,
    width: 104,
    leftPercent: 42,
    zIndex: 5,
    spireHeight: 46,
    styleDesc: "Central crystalline high-rise with 4-quadrant beacon",
  },
  {
    id: "apple",
    name: "Apple",
    logo: AppleLogo,
    accentColor: "#E2E8F0",
    glowColor: "rgba(255, 255, 255, 0.45)",
    height: 370,
    width: 98,
    leftPercent: 53,
    zIndex: 5,
    spireHeight: 38,
    styleDesc: "Minimalist frosted glass & titanium monolith",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    logo: NvidiaLogo,
    accentColor: "#76B900",
    glowColor: "rgba(118, 185, 0, 0.45)",
    height: 335,
    width: 90,
    leftPercent: 64,
    zIndex: 4,
    spireHeight: 32,
    styleDesc: "Computational prism with faceted emerald neon",
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: AmazonLogo,
    accentColor: "#FF9900",
    glowColor: "rgba(255, 153, 0, 0.4)",
    height: 345,
    width: 94,
    leftPercent: 74,
    zIndex: 3,
    spireHeight: 30,
    styleDesc: "Curved cloud high-rise with warm amber smile arc",
  },
  {
    id: "meta",
    name: "Meta",
    logo: MetaLogo,
    accentColor: "#0668E1",
    glowColor: "rgba(6, 104, 225, 0.4)",
    height: 285,
    width: 82,
    leftPercent: 84,
    zIndex: 2,
    spireHeight: 22,
    styleDesc: "Dual-curved horizon tower with cyan light ribbon",
  },
  {
    id: "tcs",
    name: "TCS",
    logo: TcsLogo,
    accentColor: "#0070AD",
    glowColor: "rgba(0, 112, 173, 0.4)",
    height: 260,
    width: 78,
    leftPercent: 92,
    zIndex: 1,
    spireHeight: 24,
    styleDesc: "Stepped enterprise tower with rich blue vertical columns",
  },
];

// Generate consistent twinkling stars
function generateStarfield(count = 95) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: ((i * 137.5) % 100).toFixed(1),
      y: ((i * 61.8) % 75).toFixed(1),
      size: (1 + (i % 3) * 0.6).toFixed(1),
      opacity: (0.3 + (i % 5) * 0.14).toFixed(2),
      duration: (3 + (i % 4) * 1.5).toFixed(1),
      delay: ((i % 7) * 0.8).toFixed(1),
    });
  }
  return stars;
}

export default function FuturisticUniverseHero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const stars = useMemo(() => generateStarfield(105), []);

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
      {/* 1. DEEP SPACE COSMIC GRADIENT BACKDROP */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 10%, #0d1636 0%, #070c22 40%, #030612 80%, #02040a 100%)",
        }}
      />

      {/* 2. SUBTLE COSMIC NEBULAE & GALACTIC DUST */}
      <div
        className="absolute top-1/4 -left-20 w-[42rem] h-[42rem] rounded-full blur-[110px] opacity-25 mix-blend-screen pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 80%)",
          transform: `translate(${mouseOffset.x * -12}px, ${mouseOffset.y * -8}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="absolute top-1/3 -right-20 w-[45rem] h-[45rem] rounded-full blur-[120px] opacity-20 mix-blend-screen pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 80%)",
          transform: `translate(${mouseOffset.x * 14}px, ${mouseOffset.y * 10}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[30rem] rounded-full blur-[130px] opacity-15 pointer-events-none bg-indigo-500/20" />

      {/* 3. TWINKLING COSMIC STARFIELD */}
      <div
        className="absolute inset-0"
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

        {/* Few prominent glowing distant navigation stars with cross diffraction spikes */}
        <div className="absolute top-[18%] left-[16%] w-2 h-2">
          <div className="absolute inset-0 bg-cyan-200 rounded-full blur-[1px] animate-ping" style={{ animationDuration: "5s" }} />
          <div className="absolute top-1/2 -left-2 right-[-8px] h-[0.5px] bg-cyan-100/70" />
          <div className="absolute left-1/2 -top-2 bottom-[-8px] w-[0.5px] bg-cyan-100/70" />
        </div>
        <div className="absolute top-[28%] left-[78%] w-2 h-2">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-[1px] animate-ping" style={{ animationDuration: "6s" }} />
          <div className="absolute top-1/2 -left-2 right-[-8px] h-[0.5px] bg-blue-100/60" />
          <div className="absolute left-1/2 -top-2 bottom-[-8px] w-[0.5px] bg-blue-100/60" />
        </div>
      </div>

      {/* 4. REALISTIC DISTANT VENUS PLANET (Upper-Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute top-8 right-6 md:top-14 md:right-20 z-10 pointer-events-none"
        style={{
          transform: `translate(${mouseOffset.x * -10}px, ${mouseOffset.y * -8}px)`,
          transition: "transform 0.35s ease-out",
        }}
      >
        {/* Venus Planet Body */}
        <div
          className="relative w-14 h-14 md:w-18 md:h-18 rounded-full overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 35% 32%, #fff3db 0%, #ecd093 25%, #c89b4b 55%, #8a5822 80%, #2e1604 100%)",
            boxShadow:
              "0 0 28px rgba(236, 208, 147, 0.35), inset -5px -5px 12px rgba(0, 0, 0, 0.85), inset 3px 3px 8px rgba(255, 255, 255, 0.55)",
          }}
        >
          {/* Venus Cloud Atmosphere Swirl Bands */}
          <div
            className="absolute inset-0 rounded-full opacity-65 mix-blend-overlay"
            style={{
              background:
                "repeating-radial-gradient(circle at 30% 30%, transparent 0, rgba(168, 105, 30, 0.18) 5px, transparent 10px)",
            }}
          />
          {/* Night Terminator Shadow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 75% 75%, rgba(10, 5, 2, 0.88) 0%, rgba(10, 5, 2, 0.4) 45%, transparent 70%)",
            }}
          />
        </div>

        {/* Delicate Atmospheric Golden Rim Light */}
        <div
          className="absolute -inset-1 rounded-full blur-[3px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(254, 240, 138, 0.35) 0%, transparent 70%)",
          }}
        />

        {/* Small subtle label */}
        <div className="text-[9px] uppercase tracking-widest text-amber-200/50 text-center mt-1 font-mono">
          Venus
        </div>
      </motion.div>

      {/* 5. DISTANT PLANETARY HORIZON LIMB (Curving softly across the lower third) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 130% 80% at 50% 100%, rgba(14, 165, 233, 0.12) 0%, rgba(59, 130, 246, 0.06) 40%, transparent 80%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.3) 20%, rgba(147, 197, 253, 0.6) 50%, rgba(56, 189, 248, 0.3) 80%, transparent 100%)",
          boxShadow: "0 0 20px rgba(56, 189, 248, 0.35)",
        }}
      />

      {/* 6. FUTURISTIC CORPORATE SKYLINE: TEN DISTINGUISHED GLOBAL COMPANIES */}
      <div
        className="absolute bottom-0 left-0 right-0 h-80 flex items-end justify-center pointer-events-none overflow-hidden"
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
                {/* Rooftop Spire & Beacon Light */}
                <div
                  className="w-[2px] transition-all duration-300 group-hover:h-12"
                  style={{
                    height: `${b.spireHeight}px`,
                    background: `linear-gradient(to top, ${b.accentColor}, #ffffff)`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 -ml-[2px] -mt-1 rounded-full animate-ping"
                    style={{ backgroundColor: b.accentColor, animationDuration: "3s" }}
                  />
                </div>

                {/* Corporate Logo Plaque / Sign on Building Crown */}
                <div
                  className="relative -mb-1 px-2 py-1 rounded-md backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "rgba(10, 18, 38, 0.9)",
                    boxShadow: `0 0 14px ${b.glowColor}`,
                    borderColor: `rgba(${b.accentColor === "#FFFFFF" ? "255,255,255" : "100,180,255"}, 0.3)`,
                  }}
                  title={`${b.name} — ${b.styleDesc}`}
                >
                  <LogoComp className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                </div>

                {/* Building Main Tower Facade */}
                <div
                  className="w-full relative overflow-hidden rounded-t-sm border-t border-x border-white/15"
                  style={{
                    height: `${b.height}px`,
                    background:
                      "linear-gradient(180deg, rgba(20, 32, 60, 0.95) 0%, rgba(10, 18, 36, 0.98) 50%, rgba(5, 10, 22, 1) 100%)",
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 0 25px rgba(0,0,0,0.8)`,
                  }}
                >
                  {/* Vertical Architectural Light Columns / Accent Strips */}
                  <div
                    className="absolute top-0 bottom-0 left-1 w-[1.5px] opacity-70"
                    style={{ backgroundColor: b.accentColor }}
                  />
                  <div
                    className="absolute top-0 bottom-0 right-1 w-[1.5px] opacity-70"
                    style={{ backgroundColor: b.accentColor }}
                  />

                  {/* Architectural Window Matrix / Office Light Grid */}
                  <div
                    className="absolute inset-2 grid grid-cols-4 gap-1 opacity-70"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                      backgroundSize: "6px 8px",
                    }}
                  />

                  {/* Glass Reflection Shimmer Angle */}
                  <div
                    className="absolute -inset-full w-[200%] h-[200%] rotate-45 pointer-events-none opacity-15"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
                    }}
                  />

                  {/* Building Base Atmospheric Fade into Planetary Horizon */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#030612] to-transparent opacity-95" />
                </div>

                {/* Architectural Company Name Tag */}
                <div
                  className="text-[9px] font-mono tracking-wider uppercase text-center mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ color: b.accentColor }}
                >
                  {b.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. HORIZON ATMOSPHERIC MIST & GRADIENT BLEND TO WEBSITE CONTENT */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030612] via-[#030612]/75 to-transparent pointer-events-none" />
    </div>
  );
}
