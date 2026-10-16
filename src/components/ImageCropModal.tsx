"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  RefreshCw,
  Maximize2,
  Check,
  X,
  Move,
  Sparkles,
  Circle,
  Square
} from "lucide-react";

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
  title?: string;
}

export default function ImageCropModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  title = "Crop, Fit & Position Photo"
}: ImageCropModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [cropShape, setCropShape] = useState<"circle" | "square">("circle");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Viewport dimensions
  const VIEWPORT_SIZE = 340;
  const CROP_SIZE = 260; // 260x260 crop area
  const CROP_RADIUS = CROP_SIZE / 2;
  const EXPORT_SIZE = 512; // 512x512 high-DPI headshot

  // Load image when imageSrc changes
  useEffect(() => {
    if (!imageSrc || !isOpen) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setImage(img);
      // Reset state for new image
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setRotation(0);
      setFlipH(false);
    };
    img.src = imageSrc;
  }, [imageSrc, isOpen]);

  // Compute base scale so image fills crop area at zoom = 1
  const getBaseScale = useCallback(() => {
    if (!image) return 1;
    const isSideways = rotation % 180 !== 0;
    const w = isSideways ? image.naturalHeight : image.naturalWidth;
    const h = isSideways ? image.naturalWidth : image.naturalHeight;
    return Math.max(CROP_SIZE / w, CROP_SIZE / h);
  }, [image, rotation, CROP_SIZE]);

  // Render canvas & preview
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = VIEWPORT_SIZE / 2;
    const cy = VIEWPORT_SIZE / 2;
    const baseScale = getBaseScale();
    const currentScale = baseScale * zoom;

    // Clear canvas
    ctx.clearRect(0, 0, VIEWPORT_SIZE, VIEWPORT_SIZE);

    // 1. Draw transformed image
    ctx.save();
    ctx.translate(cx + offset.x, cy + offset.y);
    ctx.rotate((rotation * Math.PI) / 180);
    if (flipH) ctx.scale(-1, 1);
    ctx.scale(currentScale, currentScale);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      -image.naturalWidth / 2,
      -image.naturalHeight / 2,
      image.naturalWidth,
      image.naturalHeight
    );
    ctx.restore();

    // 2. Draw dark vignette overlay outside the crop zone
    ctx.save();
    ctx.fillStyle = "rgba(15, 23, 42, 0.65)"; // slate-900 / 65%
    ctx.beginPath();
    ctx.rect(0, 0, VIEWPORT_SIZE, VIEWPORT_SIZE);

    if (cropShape === "circle") {
      ctx.arc(cx, cy, CROP_RADIUS, 0, Math.PI * 2, true);
    } else {
      const r = 16;
      const x = cx - CROP_SIZE / 2;
      const y = cy - CROP_SIZE / 2;
      const w = CROP_SIZE;
      const h = CROP_SIZE;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }
    ctx.fill("evenodd");

    // 3. Draw crop guide border
    ctx.strokeStyle = "#3b82f6"; // Blue border
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    if (cropShape === "circle") {
      ctx.arc(cx, cy, CROP_RADIUS, 0, Math.PI * 2);
    } else {
      const r = 16;
      const x = cx - CROP_SIZE / 2;
      const y = cy - CROP_SIZE / 2;
      const w = CROP_SIZE;
      const h = CROP_SIZE;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }
    ctx.stroke();

    // 4. Subtle grid lines (rule of thirds)
    if (showGrid) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      const left = cx - CROP_SIZE / 2;
      const top = cy - CROP_SIZE / 2;
      const step = CROP_SIZE / 3;

      ctx.beginPath();
      // vertical lines
      ctx.moveTo(left + step, top);
      ctx.lineTo(left + step, top + CROP_SIZE);
      ctx.moveTo(left + step * 2, top);
      ctx.lineTo(left + step * 2, top + CROP_SIZE);
      // horizontal lines
      ctx.moveTo(left, top + step);
      ctx.lineTo(left + CROP_SIZE, top + step);
      ctx.moveTo(left, top + step * 2);
      ctx.lineTo(left + CROP_SIZE, top + step * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();

    // 5. Draw live preview into mini preview canvas
    const pCanvas = previewCanvasRef.current;
    if (pCanvas) {
      const pCtx = pCanvas.getContext("2d");
      if (pCtx) {
        const pw = pCanvas.width;
        const ph = pCanvas.height;
        const pScale = pw / CROP_SIZE;
        pCtx.clearRect(0, 0, pw, ph);

        pCtx.save();
        pCtx.translate(pw / 2 + offset.x * pScale, ph / 2 + offset.y * pScale);
        pCtx.rotate((rotation * Math.PI) / 180);
        if (flipH) pCtx.scale(-1, 1);
        pCtx.scale(currentScale * pScale, currentScale * pScale);
        pCtx.drawImage(
          image,
          -image.naturalWidth / 2,
          -image.naturalHeight / 2,
          image.naturalWidth,
          image.naturalHeight
        );
        pCtx.restore();
      }
    }
  }, [
    image,
    zoom,
    offset,
    rotation,
    flipH,
    cropShape,
    showGrid,
    getBaseScale,
    VIEWPORT_SIZE,
    CROP_SIZE,
    CROP_RADIUS
  ]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Pointer drag events for moving the image
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom((prev) => Math.min(4, Math.max(0.2, Number((prev * factor).toFixed(2)))));
  };

  // Quick Preset Actions
  const handleFitToFrame = () => {
    if (!image) return;
    const isSideways = rotation % 180 !== 0;
    const w = isSideways ? image.naturalHeight : image.naturalWidth;
    const h = isSideways ? image.naturalWidth : image.naturalHeight;
    const fitScale = Math.min(CROP_SIZE / w, CROP_SIZE / h);
    const baseScale = getBaseScale();
    setZoom(Number((fitScale / baseScale).toFixed(2)));
    setOffset({ x: 0, y: 0 });
  };

  const handleFillFrame = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setRotation(0);
    setFlipH(false);
  };

  // Apply crop & generate export data URL
  const handleApply = () => {
    if (!image) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = EXPORT_SIZE;
    exportCanvas.height = EXPORT_SIZE;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    const exportScale = EXPORT_SIZE / CROP_SIZE;
    const baseScale = getBaseScale();
    const currentScale = baseScale * zoom * exportScale;
    const ecx = EXPORT_SIZE / 2;
    const ecy = EXPORT_SIZE / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.save();
    ctx.translate(ecx + offset.x * exportScale, ecy + offset.y * exportScale);
    ctx.rotate((rotation * Math.PI) / 180);
    if (flipH) ctx.scale(-1, 1);
    ctx.scale(currentScale, currentScale);

    ctx.drawImage(
      image,
      -image.naturalWidth / 2,
      -image.naturalHeight / 2,
      image.naturalWidth,
      image.naturalHeight
    );
    ctx.restore();

    const croppedBase64 = exportCanvas.toDataURL("image/jpeg", 0.92);
    onCropComplete(croppedBase64);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Move className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">{title}</h3>
              <p className="text-xs text-gray-500">Position your face & adjust zoom for ATS photo templates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Main Interactive Canvas */}
          <div className="flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-inner border border-gray-200 bg-slate-900 select-none">
              <canvas
                ref={canvasRef}
                width={VIEWPORT_SIZE}
                height={VIEWPORT_SIZE}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onWheel={handleWheel}
                className={`touch-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                style={{ width: `${VIEWPORT_SIZE}px`, height: `${VIEWPORT_SIZE}px` }}
              />

              {/* Top Hint Badge */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-slate-950/75 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full pointer-events-none flex items-center gap-1.5 shadow-md">
                <Move className="w-3 h-3 text-blue-400" />
                <span>Drag to move • Scroll to zoom</span>
              </div>
            </div>

            {/* Shape & Grid Controls */}
            <div className="flex items-center justify-between w-full max-w-sm mt-3 px-1 text-xs">
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setCropShape("circle")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all ${
                    cropShape === "circle"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Circle className="w-3.5 h-3.5" />
                  <span>Circle</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCropShape("square")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all ${
                    cropShape === "square"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Square</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
                  showGrid
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border-gray-200 text-gray-500 hover:text-gray-700"
                }`}
              >
                {showGrid ? "Grid On" : "Grid Off"}
              </button>
            </div>
          </div>

          {/* Zoom Slider Control */}
          <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-gray-700">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <ZoomIn className="w-3.5 h-3.5 text-blue-600" /> Zoom Level
              </span>
              <span className="text-gray-500 font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-gray-200">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.max(0.2, Number((prev - 0.1).toFixed(2))))}
                className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="0.2"
                max="3.5"
                step="0.02"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.min(3.5, Number((prev + 0.1).toFixed(2))))}
                className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rotation, Flip & Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setRotation((prev) => (prev - 90 + 360) % 360)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              <span>Rotate Left</span>
            </button>
            <button
              type="button"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5 text-gray-500" />
              <span>Rotate Right</span>
            </button>
            <button
              type="button"
              onClick={() => setFlipH(!flipH)}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 border rounded-lg text-xs font-semibold transition-colors ${
                flipH
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
              <span>Flip H</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Fit Buttons & Real-Time Preview */}
          <div className="flex items-center justify-between p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-800 block">Quick Framing</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleFillFrame}
                  className="px-2.5 py-1 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-md text-[11px] font-semibold transition-colors"
                >
                  Fill Frame
                </button>
                <button
                  type="button"
                  onClick={handleFitToFrame}
                  className="px-2.5 py-1 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-md text-[11px] font-semibold transition-colors"
                >
                  Fit Whole Photo
                </button>
              </div>
            </div>

            {/* Realtime Live Preview */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">
                  Preview
                </span>
                <span className="text-[11px] font-medium text-gray-700">Resume Headshot</span>
              </div>
              <div className="w-14 h-14 rounded-full border-2 border-blue-600 overflow-hidden bg-white shadow-md flex-shrink-0">
                <canvas
                  ref={previewCanvasRef}
                  width={CROP_SIZE}
                  height={CROP_SIZE}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl text-xs font-semibold transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/25 transition-all transform hover:scale-[1.01]"
          >
            <Check className="w-4 h-4" />
            <span>Apply Cropped Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
