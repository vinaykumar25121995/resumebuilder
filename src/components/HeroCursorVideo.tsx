"use client";

import React, { useEffect, useRef, useState } from "react";

export interface HeroVideoConfig {
  videoOpacity?: number; // Background video opacity (default: 0.2)
  glowIntensity?: number; // Ambient cursor glow alpha (default: 0.22)
  videoSrcMp4?: string;
  videoSrcWebm?: string;
}

interface HeroCursorVideoProps {
  parentRef?: React.RefObject<HTMLElement | null>;
  config?: HeroVideoConfig;
  className?: string;
}

export default function HeroCursorVideo({
  parentRef,
  config = {},
  className = "",
}: HeroCursorVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    videoOpacity = 0.22,
    glowIntensity = 0.25,
    videoSrcMp4 = "/videos/hero-background.mp4",
    videoSrcWebm = "/videos/hero-background.webm",
  } = config;

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Mouse tracking for subtle ambient interactive lighting (no dark masks)
  useEffect(() => {
    const container = containerRef.current;
    const targetElement = parentRef?.current || container;
    if (!container || !targetElement) return;

    let targetX = container.clientWidth / 2;
    let targetY = container.clientHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let targetOpacity = 0;
    let currentOpacity = 0;
    let rafId: number | null = null;
    let isTracking = true;

    container.style.setProperty("--light-x", `${currentX}px`);
    container.style.setProperty("--light-y", `${currentY}px`);
    container.style.setProperty("--light-opacity", `${currentOpacity}`);

    const updateFrame = () => {
      if (!isTracking) return;

      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentOpacity += (targetOpacity - currentOpacity) * 0.08;

      container.style.setProperty("--light-x", `${currentX.toFixed(1)}px`);
      container.style.setProperty("--light-y", `${currentY.toFixed(1)}px`);
      container.style.setProperty("--light-opacity", `${currentOpacity.toFixed(2)}`);

      rafId = requestAnimationFrame(updateFrame);
    };

    rafId = requestAnimationFrame(updateFrame);

    const onMouseMove = (e: MouseEvent) => {
      const rect = targetElement.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      targetOpacity = glowIntensity;
    };

    const onMouseEnter = (e: MouseEvent) => {
      const rect = targetElement.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      currentX = targetX;
      currentY = targetY;
      targetOpacity = glowIntensity;
    };

    const onMouseLeave = () => {
      targetOpacity = 0;
    };

    targetElement.addEventListener("mousemove", onMouseMove as EventListener);
    targetElement.addEventListener("mouseenter", onMouseEnter as EventListener);
    targetElement.addEventListener("mouseleave", onMouseLeave as EventListener);

    // Pause video when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isTracking = true;
            if (!rafId) rafId = requestAnimationFrame(updateFrame);
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }
          } else {
            isTracking = false;
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = null;
            }
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(targetElement);

    return () => {
      isTracking = false;
      if (rafId) cancelAnimationFrame(rafId);
      targetElement.removeEventListener("mousemove", onMouseMove as EventListener);
      targetElement.removeEventListener("mouseenter", onMouseEnter as EventListener);
      targetElement.removeEventListener("mouseleave", onMouseLeave as EventListener);
      observer.disconnect();
    };
  }, [parentRef, glowIntensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Background Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white" />

      {/* Decorative High-Tech Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(rgba(37, 99, 235, 0.8) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient Luminous Floating Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "7s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-cyan-300/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "9s" }}
      />

      {/* Ambient Full Video Layer (No black circle cutout!) */}
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? videoOpacity : 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          aria-hidden="true"
        >
          <source src={videoSrcWebm} type="video/webm" />
          <source src={videoSrcMp4} type="video/mp4" />
        </video>
      )}

      {/* Soft Interactive Luminous Aura that follows the mouse (Gentle Blue-Cyan glow, NO dark circle) */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(450px circle at var(--light-x, 50%) var(--light-y, 50%), rgba(56, 189, 248, var(--light-opacity, 0)) 0%, rgba(99, 102, 241, calc(var(--light-opacity, 0) * 0.4)) 40%, transparent 80%)`,
        }}
      />

      {/* Bottom Vignette for seamless blend with page content */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
    </div>
  );
}
