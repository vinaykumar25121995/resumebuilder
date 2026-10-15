"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import * as THREE from "three";

// --- MATHEMATICAL GEODESIC & BUCKMINSTERFULLERENE GENERATOR ---

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

// Dual Geodesic Fullerene: produces true pentagonal and hexagonal trivalent cages
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

  // Dual vertices: Centroids of spherical triangles projected to sphere
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

// GLSL Shaders for Depth-Aware Cursor Reveal
const lineVertexShader = `
uniform vec2 uCursor;
uniform vec2 uResolution;
uniform float uRevealRadius;
uniform float uLayerIndex;
uniform float uBaseOpacity;
uniform float uActiveOpacity;

varying float vOpacity;
varying vec3 vColor;

void main() {
  vec3 normalModel = normalize(position);
  vec3 normalView = normalize(normalMatrix * normalModel);
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Calculate projected screen-space position in pixels
  vec2 ndc = gl_Position.xy / gl_Position.w;
  vec2 screenPos = vec2((ndc.x * 0.5 + 0.5) * uResolution.x, (1.0 - (ndc.y * 0.5 + 0.5)) * uResolution.y);
  
  // Distance from screen vertex to cursor
  float dist = length(screenPos - uCursor);
  
  // Smooth cubic-hermite feathered reveal factor
  float reveal = smoothstep(uRevealRadius, uRevealRadius * 0.20, dist);
  
  // Front-facing factor: normalView.z > 0 faces camera, normalView.z < 0 faces away
  float frontFacing = smoothstep(-0.15, 0.40, normalView.z);
  
  // Resting opacity: delicate 3-7% watermark line
  float restingOpacity = mix(uBaseOpacity * 0.65, uBaseOpacity, frontFacing);
  
  // Illuminated opacity: front-facing lines brighten up to 28-38%
  float illuminatedOpacity = uActiveOpacity * frontFacing;
  
  // Rear-facing suppression: inside the reveal field, rear-facing lines fade even more
  float rearSuppression = (1.0 - frontFacing) * reveal * 0.85;
  
  vOpacity = mix(restingOpacity, illuminatedOpacity, reveal) * (1.0 - rearSuppression);
  
  // Color: faint white / silver with subtle cyan-white core depth
  vec3 baseCol = vec3(0.92, 0.95, 1.0);
  if (uLayerIndex == 1.0) {
    baseCol = vec3(0.78, 0.90, 1.0); // Innermost core: soft blue-white
  } else if (uLayerIndex == 2.0) {
    baseCol = vec3(0.85, 0.94, 1.0);
  } else if (uLayerIndex == 3.0) {
    baseCol = vec3(0.92, 0.96, 1.0);
  }
  
  // When illuminated, highlight into clean diamond white
  vColor = mix(baseCol, vec3(1.0, 1.0, 1.0), reveal * 0.6);
}
`;

const lineFragmentShader = `
varying float vOpacity;
varying vec3 vColor;

void main() {
  if (vOpacity <= 0.003) discard;
  gl_FragColor = vec4(vColor, vOpacity);
}
`;

const pointVertexShader = `
uniform vec2 uCursor;
uniform vec2 uResolution;
uniform float uRevealRadius;
uniform float uLayerIndex;
uniform float uBaseOpacity;
uniform float uActiveOpacity;

varying float vOpacity;
varying vec3 vColor;

void main() {
  vec3 normalModel = normalize(position);
  vec3 normalView = normalize(normalMatrix * normalModel);
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Delicate understated carbon node size (2.5px to 4.5px)
  gl_PointSize = clamp(3.5 * (10.0 / -mvPosition.z), 2.2, 4.5);
  
  vec2 ndc = gl_Position.xy / gl_Position.w;
  vec2 screenPos = vec2((ndc.x * 0.5 + 0.5) * uResolution.x, (1.0 - (ndc.y * 0.5 + 0.5)) * uResolution.y);
  
  float dist = length(screenPos - uCursor);
  float reveal = smoothstep(uRevealRadius, uRevealRadius * 0.20, dist);
  float frontFacing = smoothstep(-0.15, 0.40, normalView.z);
  
  float restingOpacity = mix(uBaseOpacity * 0.55, uBaseOpacity * 0.85, frontFacing);
  float illuminatedOpacity = uActiveOpacity * 0.90 * frontFacing;
  float rearSuppression = (1.0 - frontFacing) * reveal * 0.85;
  
  vOpacity = mix(restingOpacity, illuminatedOpacity, reveal) * (1.0 - rearSuppression);
  
  vec3 baseCol = vec3(0.94, 0.96, 1.0);
  if (uLayerIndex == 1.0) baseCol = vec3(0.80, 0.92, 1.0);
  vColor = mix(baseCol, vec3(1.0, 1.0, 1.0), reveal * 0.6);
}
`;

const pointFragmentShader = `
varying float vOpacity;
varying vec3 vColor;

void main() {
  float r = length(gl_PointCoord - vec2(0.5));
  if (r > 0.5) discard;
  float alpha = smoothstep(0.5, 0.15, r) * vOpacity;
  if (alpha <= 0.003) discard;
  gl_FragColor = vec4(vColor, alpha);
}
`;

export default function FullereneCursorModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { status } = useSession();

  // Route & Auth Filtering: only active on public pre-login pages
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  const isVisible = !isProtectedRoute && status !== "loading";

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    
    const updatePreferences = () => {
      setPrefersReducedMotion(motionQuery.matches);
      setIsTouchDevice(touchQuery.matches);
    };

    const timer = setTimeout(updatePreferences, 0);

    const onMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    const onTouch = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    motionQuery.addEventListener("change", onMotion);
    touchQuery.addEventListener("change", onTouch);

    return () => {
      clearTimeout(timer);
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
    // Camera positioned at Z = 7.5 to give full-viewport immersive scale
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // --- SHARED UNIFORMS FOR DEPTH-AWARE CURSOR REVEAL ---
    const cursorCurrent = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    const cursorTarget = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

    const commonUniforms = {
      uCursor: { value: cursorCurrent },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uRevealRadius: { value: isTouchDevice ? 260.0 : 230.0 },
      uBaseOpacity: { value: 0.035 }, // Delicate 3.5% resting opacity for subtle celestial support
      uActiveOpacity: { value: 0.28 }, // 28% illuminated opacity
    };

    // --- CONSTRUCT THE GIANT FOUR-LAYER FULLERENE STRUCTURE ---
    // The structure stays centered at (0, 0, 0) and fills the viewport!
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Layer Radii: Concentric spacing with outer shell reaching beyond screen edges
    const layerConfigs = [
      { layerIndex: 1.0, radius: 1.25, type: "c60" as const }, // Innermost core
      { layerIndex: 2.0, radius: 2.25, type: "geo" as const, freq: 2 }, // Inner-middle cage
      { layerIndex: 3.0, radius: 3.35, type: "geo" as const, freq: 3 }, // Outer-middle cage
      { layerIndex: 4.0, radius: 4.65, type: "geo" as const, freq: 3 }, // Outermost giant cage
    ];

    const shellGroups: THREE.Group[] = [];

    layerConfigs.forEach((cfg) => {
      const shellGroup = new THREE.Group();
      masterGroup.add(shellGroup);
      shellGroups.push(shellGroup);

      const data =
        cfg.type === "c60"
          ? buildC60Fullerene(cfg.radius)
          : buildGeodesicFullerene(cfg.freq, cfg.radius);

      // 1. Bonds Geometry (Thin LineSegments)
      const linePositions: number[] = [];
      data.edges.forEach(([i, j]) => {
        const vA = data.vertices[i];
        const vB = data.vertices[j];
        // Midpoint subdivision for accurate cursor distance calculation along bonds
        const vMid = new THREE.Vector3().addVectors(vA, vB).multiplyScalar(0.5);

        linePositions.push(vA.x, vA.y, vA.z, vMid.x, vMid.y, vMid.z);
        linePositions.push(vMid.x, vMid.y, vMid.z, vB.x, vB.y, vB.z);
      });

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

      const lineMat = new THREE.ShaderMaterial({
        vertexShader: lineVertexShader,
        fragmentShader: lineFragmentShader,
        uniforms: {
          ...commonUniforms,
          uLayerIndex: { value: cfg.layerIndex },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
      shellGroup.add(lineMesh);

      // 2. Carbon Atom Nodes (Points)
      const pointPositions: number[] = [];
      data.vertices.forEach((v) => {
        pointPositions.push(v.x, v.y, v.z);
      });

      const pointGeo = new THREE.BufferGeometry();
      pointGeo.setAttribute("position", new THREE.Float32BufferAttribute(pointPositions, 3));

      const pointMat = new THREE.ShaderMaterial({
        vertexShader: pointVertexShader,
        fragmentShader: pointFragmentShader,
        uniforms: {
          ...commonUniforms,
          uLayerIndex: { value: cfg.layerIndex },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const pointMesh = new THREE.Points(pointGeo, pointMat);
      shellGroup.add(pointMesh);
    });

    // --- CURSOR TRACKING (CONTROLS ILLUMINATION REVEAL ONLY) ---
    const onMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      cursorTarget.set(e.clientX, e.clientY);
    };

    const onMouseEnter = (e: MouseEvent) => {
      cursorTarget.set(e.clientX, e.clientY);
      cursorCurrent.set(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseenter", onMouseEnter, { passive: true });

    // Responsive Resize Handling
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      commonUniforms.uResolution.value.set(w, h);
      commonUniforms.uRevealRadius.value = w < 768 ? 190.0 : 250.0;
    };

    window.addEventListener("resize", onResize);

    // Visibility Listener to pause RAF loop in background tab
    let isTabVisible = true;
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // --- ANIMATION LOOP ---
    // The molecular structure STAYS IN PLACE at (0, 0, 0)
    // Subtle ambient animation: extremely slow, barely perceptible rotation
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      if (!prefersReducedMotion) {
        // Barely perceptible, continuous slow counter-rotations between shells
        shellGroups[0].rotation.y += 0.00035;
        shellGroups[0].rotation.x += 0.00020;

        shellGroups[1].rotation.y -= 0.00026;
        shellGroups[1].rotation.z += 0.00018;

        shellGroups[2].rotation.y += 0.00018;
        shellGroups[2].rotation.x -= 0.00014;

        shellGroups[3].rotation.y -= 0.00012;
        shellGroups[3].rotation.z -= 0.00010;
      }

      // Smooth cursor lerp interpolation: reveal field follows pointer smoothly
      if (!isTouchDevice) {
        cursorCurrent.x += (cursorTarget.x - cursorCurrent.x) * 0.16;
        cursorCurrent.y += (cursorTarget.y - cursorCurrent.y) * 0.16;
      } else {
        // Touch device: slow ambient breathing motion around center
        const time = Date.now() * 0.0008;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        cursorCurrent.x = centerX + Math.sin(time) * (window.innerWidth * 0.25);
        cursorCurrent.y = centerY + Math.cos(time * 0.8) * (window.innerHeight * 0.2);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- RESOURCE CLEANUP ---
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((obj) => {
        if (obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
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
  }, [isVisible, isTouchDevice, prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-[1] overflow-hidden transition-opacity duration-700 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    />
  );
}
