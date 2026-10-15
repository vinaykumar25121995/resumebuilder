"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import * as THREE from "three";

// --- MATHEMATICAL GEOMETRY BUILDERS FOR BUCKMINSTERFULLERENE & CONCENTRIC FULLERNES ---

function createIcosahedron() {
  const t = (1 + Math.sqrt(5)) / 2;
  const v = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
  ].map((p) => {
    const l = Math.hypot(...p);
    return [p[0] / l, p[1] / l, p[2] / l];
  });
  const faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
  ];
  return { v, faces };
}

// Dual Geodesic Fullerene Generator: produces true pentagonal and hexagonal trivalent cages
function buildGeodesicFullerene(freq: number, radius: number) {
  const ico = createIcosahedron();
  const vMap = new Map<string, number>();

  function getVId(p: number[]) {
    const key = p.map((x) => Math.round(x * 10000)).join(",");
    if (vMap.has(key)) return vMap.get(key)!;
    const id = vMap.size;
    vMap.set(key, id);
    return id;
  }

  const triIndices: number[][] = [];
  for (const face of ico.faces) {
    const A = ico.v[face[0]];
    const B = ico.v[face[1]];
    const C = ico.v[face[2]];
    const grid: number[][] = [];
    for (let i = 0; i <= freq; i++) {
      grid[i] = [];
      for (let j = 0; j <= freq - i; j++) {
        const k = freq - i - j;
        const x = (i * A[0] + j * B[0] + k * C[0]) / freq;
        const y = (i * A[1] + j * B[1] + k * C[1]) / freq;
        const z = (i * A[2] + j * B[2] + k * C[2]) / freq;
        const l = Math.hypot(x, y, z);
        grid[i][j] = getVId([x / l, y / l, z / l]);
      }
    }
    for (let i = 0; i < freq; i++) {
      for (let j = 0; j < freq - i; j++) {
        triIndices.push([grid[i][j], grid[i + 1][j], grid[i][j + 1]]);
        if (j < freq - i - 1) {
          triIndices.push([grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]]);
        }
      }
    }
  }

  const verts: number[][] = [];
  for (const [key, id] of vMap.entries()) {
    verts[id] = key.split(",").map(Number).map((x) => x / 10000);
  }

  // Dual vertices: Centroids of the spherical triangles
  const dualVerts: THREE.Vector3[] = triIndices.map((tri) => {
    const v0 = verts[tri[0]], v1 = verts[tri[1]], v2 = verts[tri[2]];
    const cx = (v0[0] + v1[0] + v2[0]) / 3;
    const cy = (v0[1] + v1[1] + v2[1]) / 3;
    const cz = (v0[2] + v1[2] + v2[2]) / 3;
    const l = Math.hypot(cx, cy, cz) / radius;
    return new THREE.Vector3(cx / l, cy / l, cz / l);
  });

  // Dual edges: Pairs of triangles sharing a common edge
  const edgeMap = new Map<string, number[]>();
  function edgeKey(i: number, j: number) {
    return i < j ? `${i}-${j}` : `${j}-${i}`;
  }

  triIndices.forEach((tri, tIdx) => {
    for (let k = 0; k < 3; k++) {
      const e = edgeKey(tri[k], tri[(k + 1) % 3]);
      if (!edgeMap.has(e)) edgeMap.set(e, []);
      edgeMap.get(e)!.push(tIdx);
    }
  });

  const dualEdges: [number, number][] = [];
  for (const tList of edgeMap.values()) {
    if (tList.length === 2) {
      dualEdges.push([tList[0], tList[1]]);
    }
  }

  return { vertices: dualVerts, edges: dualEdges };
}

// Exact C60 Buckminsterfullerene Generator (Truncated Icosahedron: 60 vertices, 90 edges)
function buildC60Fullerene(radius: number) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw: number[][] = [];
  const signs = [-1, 1];

  for (const s1 of signs) {
    for (const s2 of signs) {
      raw.push([0, s1, s2 * 3 * phi]);
      raw.push([s2 * 3 * phi, 0, s1]);
      raw.push([s1, s2 * 3 * phi, 0]);
    }
  }
  for (const s1 of signs) {
    for (const s2 of signs) {
      for (const s3 of signs) {
        raw.push([s1, s2 * (2 + phi), s3 * 2 * phi]);
        raw.push([s3 * 2 * phi, s1, s2 * (2 + phi)]);
        raw.push([s2 * (2 + phi), s3 * 2 * phi, s1]);
      }
    }
  }
  for (const s1 of signs) {
    for (const s2 of signs) {
      for (const s3 of signs) {
        raw.push([s1 * phi, s2 * 2, s3 * (2 * phi + 1)]);
        raw.push([s3 * (2 * phi + 1), s1 * phi, s2 * 2]);
        raw.push([s2 * 2, s3 * (2 * phi + 1), s1 * phi]);
      }
    }
  }

  const vertices: THREE.Vector3[] = [];
  for (const p of raw) {
    const norm = Math.hypot(p[0], p[1], p[2]) / radius;
    const u = new THREE.Vector3(p[0] / norm, p[1] / norm, p[2] / norm);
    if (!vertices.some((v) => v.distanceTo(u) < 1e-4)) {
      vertices.push(u);
    }
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const d = vertices[i].distanceTo(vertices[j]);
      if (d < 0.45 * radius) {
        edges.push([i, j]);
      }
    }
  }

  return { vertices, edges };
}

// Helper to construct InstancedMesh for Atoms and Bonds in a single shell
function createShellMesh(
  data: { vertices: THREE.Vector3[]; edges: [number, number][] },
  atomRadius: number,
  bondRadius: number,
  material: THREE.Material
): { group: THREE.Group; atomMesh: THREE.InstancedMesh; bondMesh: THREE.InstancedMesh } {
  const group = new THREE.Group();

  // 1. Carbon Node Atoms (Instanced Spheres)
  const sphereGeo = new THREE.SphereGeometry(atomRadius, 14, 14);
  const atomMesh = new THREE.InstancedMesh(sphereGeo, material, data.vertices.length);
  const dummy = new THREE.Object3D();

  data.vertices.forEach((v, idx) => {
    dummy.position.copy(v);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    atomMesh.setMatrixAt(idx, dummy.matrix);
  });
  atomMesh.instanceMatrix.needsUpdate = true;
  group.add(atomMesh);

  // 2. Carbon-Carbon Bonds (Instanced Cylinders)
  const cylGeo = new THREE.CylinderGeometry(bondRadius, bondRadius, 1, 8);
  const bondMesh = new THREE.InstancedMesh(cylGeo, material, data.edges.length);
  const upVec = new THREE.Vector3(0, 1, 0);

  data.edges.forEach(([i, j], idx) => {
    const vA = data.vertices[i];
    const vB = data.vertices[j];
    const mid = new THREE.Vector3().addVectors(vA, vB).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(vB, vA);
    const len = dir.length();

    dummy.position.copy(mid);
    dummy.quaternion.setFromUnitVectors(upVec, dir.clone().normalize());
    dummy.scale.set(1, len, 1);
    dummy.updateMatrix();
    bondMesh.setMatrixAt(idx, dummy.matrix);
  });
  bondMesh.instanceMatrix.needsUpdate = true;
  group.add(bondMesh);

  return { group, atomMesh, bondMesh };
}

export default function FullereneCursorModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { status } = useSession();

  // Authentication & Route Protection: only active on public pre-login pages
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  const isVisible = !isProtectedRoute && status !== "loading";

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    setPrefersReducedMotion(motionQuery.matches);
    setIsTouchDevice(touchQuery.matches);

    const onMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    const onTouch = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    motionQuery.addEventListener("change", onMotion);
    touchQuery.addEventListener("change", onTouch);

    return () => {
      motionQuery.removeEventListener("change", onMotion);
      touchQuery.removeEventListener("change", onTouch);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isVisible) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // --- PROFESSIONAL 3D SCIENTIFIC LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light (Crisp specular sheen on bonds and nodes)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(6, 8, 10);
    scene.add(keyLight);

    // Cyan/Blue Rim Light (Distinguishes fullerene silhouette against backgrounds)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    // Deep Indigo Fill Light (Provides dimensional depth between nested shells)
    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.6);
    fillLight.position.set(6, -6, 4);
    scene.add(fillLight);

    // --- BUILD THE FOUR DISTINCT CONCENTRIC SHELLS ---
    const rootModelGroup = new THREE.Group();
    scene.add(rootModelGroup);

    // Layer 1: Innermost Core Cage (C20 Dodecahedron, radius 0.70)
    // Core has a luminous silver-cyan titanium appearance
    const matLayer1 = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
    });
    const shell1Data = buildGeodesicFullerene(1, 0.7);
    const shell1 = createShellMesh(shell1Data, 0.045, 0.016, matLayer1);
    rootModelGroup.add(shell1.group);

    // Layer 2: Inner-Middle Cage (C60 Buckyball, radius 1.35)
    // Titanium-silver metallic carbon
    const matLayer2 = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x0f172a,
      emissiveIntensity: 0.1,
    });
    const shell2Data = buildC60Fullerene(1.35);
    const shell2 = createShellMesh(shell2Data, 0.048, 0.018, matLayer2);
    rootModelGroup.add(shell2.group);

    // Layer 3: Outer-Middle Cage (C80 Fullerene, radius 2.05)
    // Gunmetal graphite carbon
    const matLayer3 = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.8,
      roughness: 0.25,
    });
    const shell3Data = buildGeodesicFullerene(2, 2.05);
    const shell3 = createShellMesh(shell3Data, 0.052, 0.02, matLayer3);
    rootModelGroup.add(shell3.group);

    // Layer 4: Outermost Cage (C180 Multi-shell Fullerene Silhouette, radius 2.80)
    // Deep metallic graphite with subtle silver highlights
    const matLayer4 = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.78,
      roughness: 0.3,
    });
    const shell4Data = buildGeodesicFullerene(3, 2.8);
    const shell4 = createShellMesh(shell4Data, 0.058, 0.022, matLayer4);
    rootModelGroup.add(shell4.group);

    // --- RESPONSIVE SCALE & ANCHOR RECALCULATION ---
    const updateResponsiveScaleAndAnchor = () => {
      const w = window.innerWidth;
      const isHome = pathname === "/";

      let scale = 1.0;
      let anchorX = 0;
      let anchorY = 0;

      if (w >= 1280) {
        // Desktop: Large impressive ~400-450px visual diameter
        scale = 1.0;
        anchorX = isHome ? 2.5 : 3.0;
        anchorY = isHome ? 0.3 : 0.0;
      } else if (w >= 1024) {
        scale = 0.85;
        anchorX = isHome ? 2.2 : 2.5;
        anchorY = 0.2;
      } else if (w >= 768) {
        scale = 0.7;
        anchorX = isHome ? 1.4 : 0;
        anchorY = isHome ? 0.8 : 0;
      } else {
        // Mobile / Small Tablet: Centered, reduced scale to not obscure text
        scale = 0.48;
        anchorX = 0;
        anchorY = isHome ? 0.6 : 0;
      }

      rootModelGroup.scale.setScalar(scale);
      return { anchorX, anchorY };
    };

    let { anchorX, anchorY } = updateResponsiveScaleAndAnchor();

    // --- CURSOR TRACKING & INTERPOLATION STATE ---
    let mouseNormX = 0;
    let mouseNormY = 0;
    let currentX = anchorX;
    let currentY = anchorY;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let baseRotationY = 0;
    let baseRotationX = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (isTouchDevice || prefersReducedMotion) return;
      mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const anchors = updateResponsiveScaleAndAnchor();
      anchorX = anchors.anchorX;
      anchorY = anchors.anchorY;
    };

    window.addEventListener("resize", onResize);

    // --- ANIMATION LOOP ---
    let rafId: number;
    let isTabVisible = true;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      if (prefersReducedMotion) {
        // Reduced motion: static rendering with fixed subtle orientation
        renderer.render(scene, camera);
        return;
      }

      // Smooth Idle Base Rotation
      baseRotationY += 0.0028;
      baseRotationX += 0.0012;

      // Independent Counter-Rotations for the 4 concentric shells
      shell1.group.rotation.y += 0.0035;
      shell1.group.rotation.x += 0.0022;

      shell2.group.rotation.y -= 0.0028;
      shell2.group.rotation.z += 0.0018;

      shell3.group.rotation.y += 0.002;
      shell3.group.rotation.x -= 0.0015;

      shell4.group.rotation.y -= 0.0015;
      shell4.group.rotation.z -= 0.0012;

      // Cursor Response: Fluid Spring-like Lerp Interpolation
      if (!isTouchDevice) {
        const targetX = anchorX + mouseNormX * 1.25;
        const targetY = anchorY + mouseNormY * 0.85;
        targetTiltX = -mouseNormY * 0.65;
        targetTiltY = mouseNormX * 0.85;

        currentX += (targetX - currentX) * 0.055;
        currentY += (targetY - currentY) * 0.055;
        currentTiltX += (targetTiltX - currentTiltX) * 0.06;
        currentTiltY += (targetTiltY - currentTiltY) * 0.06;

        rootModelGroup.position.set(currentX, currentY, 0);
        rootModelGroup.rotation.x = currentTiltX + Math.sin(baseRotationX) * 0.15;
        rootModelGroup.rotation.y = baseRotationY + currentTiltY;
      } else {
        // Touchscreen: Smooth ambient lissajous floating drift
        const time = Date.now() * 0.0012;
        currentX = anchorX + Math.sin(time * 0.5) * 0.35;
        currentY = anchorY + Math.cos(time * 0.7) * 0.25;
        rootModelGroup.position.set(currentX, currentY, 0);
        rootModelGroup.rotation.y = baseRotationY;
        rootModelGroup.rotation.x = Math.sin(time * 0.4) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- RESOURCE CLEANUP ON UNMOUNT ---
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Geometries and Materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.InstancedMesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [isVisible, isTouchDevice, prefersReducedMotion, pathname]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-[1] overflow-hidden transition-opacity duration-500 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    />
  );
}
