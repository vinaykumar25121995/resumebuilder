"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Golden ratio constant for icosahedral and fullerene geometry
const PHI = (1 + Math.sqrt(5)) / 2;

// Layer 1 & 2: Buckminsterfullerene C60 Geometry (60 vertices, 90 edges)
function generateC60() {
  const vertices: [number, number, number][] = [];
  const sets = [
    [0, 1, 3 * PHI],
    [1, 2 + PHI, 2 * PHI],
    [PHI, 2, 1 + 2 * PHI],
  ];

  for (const [a, b, c] of sets) {
    const perms = [
      [a, b, c],
      [b, c, a],
      [c, a, b],
    ];
    for (const [px, py, pz] of perms) {
      const sxList = px === 0 ? [0] : [-1, 1];
      const syList = py === 0 ? [0] : [-1, 1];
      const szList = pz === 0 ? [0] : [-1, 1];
      for (const sx of sxList) {
        for (const sy of syList) {
          for (const sz of szList) {
            vertices.push([sx * px, sy * py, sz * pz]);
          }
        }
      }
    }
  }

  const unique: [number, number, number][] = [];
  for (const v of vertices) {
    if (!unique.some((u) => Math.hypot(u[0] - v[0], u[1] - v[1], u[2] - v[2]) < 0.001)) {
      unique.push(v);
    }
  }

  const radius = Math.hypot(unique[0][0], unique[0][1], unique[0][2]);
  const normalized: [number, number, number][] = unique.map((v) => [
    v[0] / radius,
    v[1] / radius,
    v[2] / radius,
  ]);

  const edges: [number, number][] = [];
  for (let i = 0; i < normalized.length; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      const dist = Math.hypot(
        normalized[i][0] - normalized[j][0],
        normalized[i][1] - normalized[j][1],
        normalized[i][2] - normalized[j][2]
      );
      if (dist > 0.35 && dist < 0.45) {
        edges.push([i, j]);
      }
    }
  }

  return { vertices: normalized, edges };
}

// Layer 3: Inner Icosahedron Core Geometry (12 vertices, 30 edges)
function generateIcosahedron() {
  const base = [
    [0, 1, PHI],
    [1, PHI, 0],
    [PHI, 0, 1],
  ];
  const vertices: [number, number, number][] = [];
  for (const [x, y, z] of base) {
    for (const sx of x === 0 ? [0] : [-1, 1]) {
      for (const sy of y === 0 ? [0] : [-1, 1]) {
        for (const sz of z === 0 ? [0] : [-1, 1]) {
          vertices.push([sx * x, sy * y, sz * z]);
        }
      }
    }
  }

  const unique: [number, number, number][] = [];
  for (const v of vertices) {
    if (!unique.some((u) => Math.hypot(u[0] - v[0], u[1] - v[1], u[2] - v[2]) < 0.001)) {
      unique.push(v);
    }
  }

  const radius = Math.hypot(unique[0][0], unique[0][1], unique[0][2]);
  const normalized: [number, number, number][] = unique.map((v) => [
    v[0] / radius,
    v[1] / radius,
    v[2] / radius,
  ]);

  const edges: [number, number][] = [];
  for (let i = 0; i < normalized.length; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      const dist = Math.hypot(
        normalized[i][0] - normalized[j][0],
        normalized[i][1] - normalized[j][1],
        normalized[i][2] - normalized[j][2]
      );
      if (dist > 0.95 && dist < 1.15) {
        edges.push([i, j]);
      }
    }
  }

  return { vertices: normalized, edges };
}

// Precomputed geometries for high-performance rendering
const C60_GEOMETRY = generateC60();
const ICO_GEOMETRY = generateIcosahedron();

function rotate3D(
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number
): [number, number, number] {
  // Rotate around X
  const cx = Math.cos(rx),
    sx = Math.sin(rx);
  const y1 = y * cx - z * sx;
  const z1 = y * sx + z * cx;

  // Rotate around Y
  const cy = Math.cos(ry),
    sy = Math.sin(ry);
  const x2 = x * cy + z1 * sy;
  const z2 = -x * sy + z1 * cy;

  // Rotate around Z
  const cz = Math.cos(rz),
    sz = Math.sin(rz);
  const x3 = x2 * cz - y1 * sz;
  const y3 = x2 * sz + y1 * cz;

  return [x3, y3, z2];
}

export default function BuckminsterCursor() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show exclusively on public, before-login pages
  const isExcludedRoute =
    !pathname ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api");

  useEffect(() => {
    if (isExcludedRoute || !mounted) return;

    // Disable on touch devices or reduced motion
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (touchQuery.matches || motionQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates and smooth interpolation tracking
    let targetX = width / 2;
    let targetY = height / 2;
    let currentX = targetX;
    let currentY = targetY;
    let velX = 0;
    let velY = 0;
    let isVisible = false;
    let isHovering = false;
    let isMouseDown = false;
    let currentScale = 1.0;
    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isVisible = true;

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, input, textarea, select, [role='button'], [tabindex='0']"
        );
        isHovering = !!interactive;
      }
    };

    const onMouseDown = () => {
      isMouseDown = true;
      shockwaveRadius = 15;
      shockwaveAlpha = 0.8;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
    };

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("resize", onResize);

    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) * 0.001;

      // Smooth lerp movement
      const prevX = currentX;
      const prevY = currentY;
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      velX = currentX - prevX;
      velY = currentY - prevY;

      // Target scale according to hover and click states
      const targetScale = isMouseDown ? 0.82 : isHovering ? 1.25 : 1.0;
      currentScale += (targetScale - currentScale) * 0.1;

      ctx.clearRect(0, 0, width, height);

      if (isVisible) {
        const perspective = 350;

        // Dynamic tilt based on cursor velocity
        const tiltX = Math.max(-0.6, Math.min(0.6, velY * 0.04));
        const tiltY = Math.max(-0.6, Math.min(0.6, -velX * 0.04));

        // -------------------------------------------------------------
        // LAYER 1: Outer Buckminsterfullerene C60 Cage (Radius ~44px)
        // -------------------------------------------------------------
        const r1 = 44 * currentScale;
        const rx1 = elapsed * 0.5 + tiltX;
        const ry1 = elapsed * 0.7 + tiltY;
        const rz1 = elapsed * 0.3;

        const projected1: [number, number, number][] = C60_GEOMETRY.vertices.map(
          ([vx, vy, vz]) => {
            const [rx, ry, rz] = rotate3D(vx, vy, vz, rx1, ry1, rz1);
            const scale = perspective / (perspective + rz * r1);
            return [currentX + rx * r1 * scale, currentY + ry * r1 * scale, rz];
          }
        );

        // Draw Layer 1 Edges
        ctx.lineWidth = isHovering ? 1.2 : 0.9;
        for (const [i, j] of C60_GEOMETRY.edges) {
          const p1 = projected1[i];
          const p2 = projected1[j];
          const avgZ = (p1[2] + p2[2]) / 2;
          // Depth shading: closer edges are brighter
          const alpha = Math.max(0.08, Math.min(0.75, (avgZ + 1.2) * 0.35));
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * (isHovering ? 1.2 : 0.85)})`;
          ctx.beginPath();
          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.stroke();
        }

        // Draw Layer 1 Carbon Nodes (Vertices)
        for (const p of projected1) {
          const nodeAlpha = Math.max(0.15, Math.min(0.9, (p[2] + 1.2) * 0.45));
          const nodeSize = (p[2] + 1.2) * 1.1 + 0.6;
          ctx.fillStyle = `rgba(59, 130, 246, ${nodeAlpha})`;
          ctx.beginPath();
          ctx.arc(p[0], p[1], nodeSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // -------------------------------------------------------------
        // LAYER 2: Middle Concentric Geodesic Fullerene Shell (Radius ~30px)
        // -------------------------------------------------------------
        const r2 = 30 * currentScale;
        const rx2 = -elapsed * 0.65 - tiltX * 0.8;
        const ry2 = elapsed * 0.85;
        const rz2 = -elapsed * 0.4;

        const projected2: [number, number, number][] = C60_GEOMETRY.vertices.map(
          ([vx, vy, vz]) => {
            const [rx, ry, rz] = rotate3D(vx, vy, vz, rx2, ry2, rz2);
            const scale = perspective / (perspective + rz * r2);
            return [currentX + rx * r2 * scale, currentY + ry * r2 * scale, rz];
          }
        );

        // Draw Layer 2 Edges (Indigo / Violet)
        ctx.lineWidth = 0.75;
        for (const [i, j] of C60_GEOMETRY.edges) {
          const p1 = projected2[i];
          const p2 = projected2[j];
          const avgZ = (p1[2] + p2[2]) / 2;
          const alpha = Math.max(0.05, Math.min(0.55, (avgZ + 1.1) * 0.25));
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.stroke();
        }

        // -------------------------------------------------------------
        // LAYER 3: Inner Icosahedron Carbon Core (Radius ~18px)
        // -------------------------------------------------------------
        const r3 = 18 * currentScale;
        const rx3 = elapsed * 1.1;
        const ry3 = -elapsed * 0.95 + tiltY;
        const rz3 = elapsed * 0.6;

        const projected3: [number, number, number][] = ICO_GEOMETRY.vertices.map(
          ([vx, vy, vz]) => {
            const [rx, ry, rz] = rotate3D(vx, vy, vz, rx3, ry3, rz3);
            const scale = perspective / (perspective + rz * r3);
            return [currentX + rx * r3 * scale, currentY + ry * r3 * scale, rz];
          }
        );

        // Draw Layer 3 Edges (Emerald / Cyan Core)
        ctx.lineWidth = 1.0;
        for (const [i, j] of ICO_GEOMETRY.edges) {
          const p1 = projected3[i];
          const p2 = projected3[j];
          const avgZ = (p1[2] + p2[2]) / 2;
          const alpha = Math.max(0.12, Math.min(0.8, (avgZ + 1.1) * 0.4));
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.stroke();
        }

        // Draw Layer 3 Nodes
        for (const p of projected3) {
          const nodeAlpha = Math.max(0.25, Math.min(1.0, (p[2] + 1.2) * 0.5));
          ctx.fillStyle = `rgba(52, 211, 153, ${nodeAlpha})`;
          ctx.beginPath();
          ctx.arc(p[0], p[1], 1.6, 0, Math.PI * 2);
          ctx.fill();
        }

        // -------------------------------------------------------------
        // LAYER 4: Quantum Nucleus & Orbiting Electron Rings (Radius ~8px)
        // -------------------------------------------------------------
        const ringTime = elapsed * 2.2;
        const ringRadiusX = 11 * currentScale;
        const ringRadiusY = 4 * currentScale;

        // 3 inclined elliptical orbital rings
        const angles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
        for (let a = 0; a < angles.length; a++) {
          ctx.save();
          ctx.translate(currentX, currentY);
          ctx.rotate(angles[a] + elapsed * 0.5);

          ctx.strokeStyle = `rgba(37, 99, 235, ${isHovering ? 0.7 : 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(0, 0, ringRadiusX, ringRadiusY, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Orbiting electron particle
          const electronAngle = ringTime + a * 2;
          const ex = Math.cos(electronAngle) * ringRadiusX;
          const ey = Math.sin(electronAngle) * ringRadiusY;

          ctx.fillStyle = "#38bdf8";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(ex, ey, 2.0, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        // Central Quantum Pulse Nucleus
        const pulse = 1 + Math.sin(elapsed * 6) * 0.2;
        const nucleusGrad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          6 * pulse
        );
        nucleusGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        nucleusGrad.addColorStop(0.4, "rgba(56, 189, 248, 0.8)");
        nucleusGrad.addColorStop(1, "rgba(37, 99, 235, 0)");

        ctx.fillStyle = nucleusGrad;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // -------------------------------------------------------------
        // CLICK SHOCKWAVE PULSE
        // -------------------------------------------------------------
        if (shockwaveAlpha > 0.01) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${shockwaveAlpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(currentX, currentY, shockwaveRadius, 0, Math.PI * 2);
          ctx.stroke();

          shockwaveRadius += 3.5;
          shockwaveAlpha *= 0.92;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("resize", onResize);
    };
  }, [isExcludedRoute, mounted]);

  // Exclude dashboard, admin, and api routes completely
  if (isExcludedRoute || !mounted) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 select-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
