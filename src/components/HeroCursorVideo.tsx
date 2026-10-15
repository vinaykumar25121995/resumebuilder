"use client";

import React, { useEffect, useRef, useState } from "react";

export interface HeroVideoConfig {
  spotlightRadius?: number; // Radius in pixels (default: 260)
  featherSize?: number; // Edge feathering in pixels (default: 80)
  smoothing?: number; // Movement smoothing 0.01 - 0.2 (default: 0.08)
  videoOpacity?: number; // Spotlight video opacity (default: 0.95)
  ambientOpacity?: number; // Subtle background video opacity (default: 0.12)
  glowIntensity?: number; // Spotlight halo glow opacity (default: 0.28)
  hoverScale?: number; // Expansion factor when hovered (default: 1.05)
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Centralized Configuration with default fallbacks
  const {
    spotlightRadius = 260,
    featherSize = 80,
    smoothing = 0.085,
    videoOpacity = 0.95,
    ambientOpacity = 0.12,
    glowIntensity = 0.28,
    hoverScale = 1.05,
    videoSrcMp4 = "/videos/hero-background.mp4",
    videoSrcWebm = "/videos/hero-background.webm",
  } = config;

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preferences & device capabilities
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setIsTouchDevice(touchQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

    const onTouchChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    touchQuery.addEventListener("change", onTouchChange);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      touchQuery.removeEventListener("change", onTouchChange);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  // Cursor tracking with lerp interpolation in requestAnimationFrame
  useEffect(() => {
    const container = containerRef.current;
    const targetElement = parentRef?.current || container;
    if (!container || !targetElement) return;

    // Apply initial CSS variables
    container.style.setProperty("--spotlight-radius", `${spotlightRadius}px`);
    container.style.setProperty("--spotlight-feather", `${featherSize}px`);
    container.style.setProperty("--video-opacity", `${videoOpacity}`);
    container.style.setProperty("--ambient-opacity", `${ambientOpacity}`);
    container.style.setProperty("--glow-intensity", `${glowIntensity}`);

    let targetX = container.clientWidth / 2;
    let targetY = container.clientHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let targetOpacity = isTouchDevice ? 0.7 : 0;
    let currentOpacity = targetOpacity;
    let targetScale = 1.0;
    let currentScale = 1.0;
    let rafId: number | null = null;
    let isTracking = true;

    // Set initial position
    container.style.setProperty("--mouse-x", `${currentX}px`);
    container.style.setProperty("--mouse-y", `${currentY}px`);
    container.style.setProperty("--spotlight-opacity", `${currentOpacity}`);
    container.style.setProperty("--spotlight-scale", `${currentScale}`);

    const updateFrame = () => {
      if (!isTracking) return;

      if (isTouchDevice || prefersReducedMotion) {
        // Touch or reduced motion: gentle ambient pulse around center
        const time = Date.now() * 0.0012;
        const centerX = container.clientWidth / 2;
        const centerY = container.clientHeight / 2;
        const breatheX = centerX + Math.sin(time) * 40;
        const breatheY = centerY + Math.cos(time * 0.8) * 25;

        currentX += (breatheX - currentX) * 0.03;
        currentY += (breatheY - currentY) * 0.03;
        currentOpacity = 0.75 + Math.sin(time * 1.5) * 0.15;
        currentScale = 1.0 + Math.sin(time) * 0.04;
      } else {
        // Desktop cursor tracking: Lerp interpolation
        currentX += (targetX - currentX) * smoothing;
        currentY += (targetY - currentY) * smoothing;
        currentOpacity += (targetOpacity - currentOpacity) * 0.08;
        currentScale += (targetScale - currentScale) * 0.08;
      }

      container.style.setProperty("--mouse-x", `${currentX.toFixed(2)}px`);
      container.style.setProperty("--mouse-y", `${currentY.toFixed(2)}px`);
      container.style.setProperty("--spotlight-opacity", `${currentOpacity.toFixed(3)}`);
      container.style.setProperty("--spotlight-scale", `${currentScale.toFixed(3)}`);

      rafId = requestAnimationFrame(updateFrame);
    };

    rafId = requestAnimationFrame(updateFrame);

    // Event Handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice || prefersReducedMotion) return;
      const rect = targetElement.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      targetOpacity = 1.0;
      targetScale = hoverScale;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (isTouchDevice || prefersReducedMotion) return;
      const rect = targetElement.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      currentX = targetX;
      currentY = targetY;
      targetOpacity = 1.0;
      targetScale = hoverScale;
    };

    const handleMouseLeave = () => {
      if (isTouchDevice || prefersReducedMotion) return;
      targetOpacity = 0;
      targetScale = 1.0;
      // Return target to center on leave
      targetX = container.clientWidth / 2;
      targetY = container.clientHeight / 2;
    };

    // Attach to target element
    targetElement.addEventListener("mousemove", handleMouseMove as EventListener);
    targetElement.addEventListener("mouseenter", handleMouseEnter as EventListener);
    targetElement.addEventListener("mouseleave", handleMouseLeave as EventListener);

    // Viewport intersection observer to pause video/animations when out of view
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
      targetElement.removeEventListener("mousemove", handleMouseMove as EventListener);
      targetElement.removeEventListener("mouseenter", handleMouseEnter as EventListener);
      targetElement.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      observer.disconnect();
    };
  }, [
    parentRef,
    spotlightRadius,
    featherSize,
    smoothing,
    videoOpacity,
    ambientOpacity,
    glowIntensity,
    hoverScale,
    isTouchDevice,
    prefersReducedMotion,
  ]);

  // Fallback canvas animation (active if video fails or is loading)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || videoLoaded) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth || 1200);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const drawFallback = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.fillStyle = `rgba(59, 130, 246, ${p1.alpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 110) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(drawFallback);
    };

    animId = requestAnimationFrame(drawFallback);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [videoLoaded]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Layer 1: Ambient Mesh Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white" />

      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-indigo-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "6s" }}
      />

      {/* Fallback Animated Canvas (Rendered when video is buffering or offline) */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded && !videoError ? "opacity-0" : "opacity-40"
        }`}
      />

      {/* Layer 2: Subtle Ambient Background Video (Low Opacity for atmospheric depth) */}
      {!videoError && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: "var(--ambient-opacity, 0.12)" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={videoSrcWebm} type="video/webm" />
          <source src={videoSrcMp4} type="video/mp4" />
        </video>
      )}

      {/* Layer 3: Spotlight Glow / Halo (Luminous ring around the revealed video) */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle calc(var(--spotlight-radius) * var(--spotlight-scale, 1) + 30px) at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, var(--glow-intensity, 0.28)) 0%, rgba(99, 102, 241, calc(var(--glow-intensity, 0.28) * 0.5)) 50%, transparent 100%)`,
          opacity: "var(--spotlight-opacity, 0)",
        }}
      />

      {/* Layer 4: Primary Cursor-Following Video Spotlight */}
      {!videoError && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            WebkitMaskImage: `radial-gradient(circle calc(var(--spotlight-radius) * var(--spotlight-scale, 1)) at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, black calc(var(--spotlight-radius) * var(--spotlight-scale, 1) - var(--spotlight-feather)), transparent calc(var(--spotlight-radius) * var(--spotlight-scale, 1)))`,
            maskImage: `radial-gradient(circle calc(var(--spotlight-radius) * var(--spotlight-scale, 1)) at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, black calc(var(--spotlight-radius) * var(--spotlight-scale, 1) - var(--spotlight-feather)), transparent calc(var(--spotlight-radius) * var(--spotlight-scale, 1)))`,
            opacity: `calc(var(--spotlight-opacity, 0) * var(--video-opacity, 0.95))`,
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover filter contrast-105 brightness-105"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => {
              console.warn("Hero video failed to load, falling back to ambient canvas.");
              setVideoError(true);
            }}
            aria-hidden="true"
          >
            <source src={videoSrcWebm} type="video/webm" />
            <source src={videoSrcMp4} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Layer 5: Soft Vignette & Border Overlay to integrate cleanly with website theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
    </div>
  );
}
