"use client";

import { useState, useRef, useEffect, use } from "react";
import {
  Download,
  Sparkles,
  LayoutTemplate,
  Save,
  ArrowLeft,
  RefreshCw,
  FileDown,
  FileText,
  Plus,
  Trash2,
  CheckCircle,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Code,
  Award,
  Globe,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Palette,
  Sliders,
  Columns,
  RotateCcw,
  Check,
  Bold,
  Underline,
  Highlighter,
  Paintbrush,
  Eraser,
  HelpCircle,
  Layers,
  PlusCircle,
  CheckCircle2,
  MinusCircle,
  Type,
  ArrowUpDown,
  ArrowLeftRight,
  Building2,
  Calendar,
  AlignLeft,
  List,
} from "lucide-react";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import { ALL_TEMPLATES, getTemplateById } from "@/lib/templates";
import ResumeTemplateRenderer, {
  ResumeData,
  CustomStyles,
  SectionFontSizes,
  LineFontSizes,
  PageSizePreset,
  PageOrientation,
  PAGE_SIZE_PRESETS,
  getPageDimensions,
} from "@/components/ResumeTemplateRenderer";
import { convertProfileToResumeData } from "@/lib/profile-converter";
import { generateResumeDocxBlob } from "@/lib/docx-generator";
import {
  applyTextFormatting,
  stripFormattingTags,
  renderFormattedText,
  HIGHLIGHT_COLORS,
  TEXT_COLORS,
  FONT_SIZE_OPTIONS,
} from "@/lib/text-formatter";

const FONT_SIZE_STEPPER_OPTIONS = [
  7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15, 16, 18, 20, 22, 24,
];

function LineFontSizeSelector({
  label,
  value,
  fallback = 10,
  onChange,
  onReset,
  compact = false,
}: {
  label?: string;
  value?: number;
  fallback?: number;
  onChange: (val: number) => void;
  onReset?: () => void;
  compact?: boolean;
}) {
  const currentVal = value !== undefined && value > 0 ? value : fallback;
  const isOverridden = value !== undefined && value > 0;

  return (
    <div className={`flex items-center gap-1.5 ${compact ? "" : "justify-between"}`}>
      {label && (
        <span className="text-[10px] font-semibold text-gray-600 truncate flex items-center gap-1">
          {label}
          {isOverridden && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"
              title="Custom line font size override"
            />
          )}
        </span>
      )}
      <div className="flex items-center bg-white border border-gray-300 rounded shadow-2xs">
        <button
          type="button"
          onClick={() =>
            onChange(Math.max(7, Math.round((currentVal - 0.5) * 2) / 2))
          }
          className="px-1.5 py-0.5 text-[10px] font-bold text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors"
          title="Decrease font size (-0.5pt)"
        >
          -
        </button>
        <select
          value={currentVal}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50/50 py-0.5 px-1 border-x border-gray-200 outline-none cursor-pointer"
          title="Choose line font size"
        >
          {FONT_SIZE_STEPPER_OPTIONS.map((pt) => (
            <option key={pt} value={pt}>
              {pt}pt
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() =>
            onChange(Math.min(36, Math.round((currentVal + 0.5) * 2) / 2))
          }
          className="px-1.5 py-0.5 text-[10px] font-bold text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors"
          title="Increase font size (+0.5pt)"
        >
          +
        </button>
      </div>
      {isOverridden && onReset && (
        <button
          type="button"
          onClick={onReset}
          className="text-[9px] text-gray-400 hover:text-red-500 p-0.5 transition-colors"
          title="Reset to default font size"
        >
          <RotateCcw className="w-2.5 h-2.5" />
        </button>
      )}
    </div>
  );
}

function FormattedEditorToolbar({
  inputRef,
  value,
  onChange,
  showLineHighlight = true,
  lineFontSize,
  onLineFontSizeChange,
}: {
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  value: string;
  onChange: (val: string) => void;
  showLineHighlight?: boolean;
  lineFontSize?: number;
  onLineFontSizeChange?: (pt: number) => void;
}) {
  const [showHlMenu, setShowHlMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);

  const applyFormat = (
    type: "bold" | "underline" | "highlight" | "color" | "size",
    param?: string
  ) => {
    const el = inputRef.current;
    if (!el) {
      if (value.trim()) {
        const res = applyTextFormatting(value, 0, value.length, type, param);
        onChange(res.newText);
      }
      return;
    }
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;

    if (start === end) {
      if (value.trim()) {
        const res = applyTextFormatting(value, 0, value.length, type, param);
        onChange(res.newText);
      } else {
        const res = applyTextFormatting(value, 0, 0, type, param);
        onChange(res.newText);
      }
      return;
    }

    const res = applyTextFormatting(value, start, end, type, param);
    onChange(res.newText);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(res.newCursorStart, res.newCursorEnd);
    }, 10);
  };

  const handleClearFormatting = () => {
    const el = inputRef.current;
    if (!el) {
      onChange(stripFormattingTags(value));
      return;
    }
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    if (start === end) {
      onChange(stripFormattingTags(value));
    } else {
      const selected = value.substring(start, end);
      const stripped = stripFormattingTags(selected);
      const newText =
        value.substring(0, start) + stripped + value.substring(end);
      onChange(newText);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs">
      <span className="text-[10px] text-gray-400 font-semibold mr-0.5">FORMAT:</span>
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          applyFormat("bold");
        }}
        className="p-1 rounded hover:bg-gray-200 text-gray-800 font-bold transition-colors"
        title="Bold selected text (**word**)"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          applyFormat("underline");
        }}
        className="p-1 rounded hover:bg-gray-200 text-gray-800 transition-colors"
        title="Underline selected text (<u>word</u>)"
      >
        <Underline className="w-3.5 h-3.5" />
      </button>

      {/* Font Size dropdown for selected text */}
      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setShowSizeMenu(!showSizeMenu);
            setShowHlMenu(false);
            setShowColorMenu(false);
          }}
          className="px-1.5 py-0.5 rounded hover:bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center gap-0.5 border border-blue-200 bg-blue-50/50 transition-colors"
          title="Change Font Size of selected text (<size:Xpt>)"
        >
          <Type className="w-3 h-3" />
          <span>Size</span>
        </button>

        {showSizeMenu && (
          <div className="absolute left-0 top-full mt-1.5 z-40 bg-white border border-gray-200 rounded-lg shadow-xl p-1.5 grid grid-cols-3 gap-1 min-w-[170px] animate-in fade-in">
            {FONT_SIZE_OPTIONS.map((sizeOpt) => (
              <button
                key={sizeOpt}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  applyFormat("size", sizeOpt);
                  setShowSizeMenu(false);
                }}
                className="px-1.5 py-1 text-[10px] font-mono font-medium rounded hover:bg-blue-50 hover:text-blue-700 text-gray-700 text-center transition-colors"
              >
                {sizeOpt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick A- and A+ buttons */}
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          applyFormat("size", "9pt");
        }}
        className="px-1 py-0.5 rounded hover:bg-gray-200 text-gray-700 text-[10px] font-bold"
        title="Set smaller font (9pt) on selection"
      >
        A-
      </button>
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          applyFormat("size", "11pt");
        }}
        className="px-1 py-0.5 rounded hover:bg-gray-200 text-gray-700 text-[10px] font-bold"
        title="Set larger font (11pt) on selection"
      >
        A+
      </button>

      {/* Highlighter dropdown */}
      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setShowHlMenu(!showHlMenu);
            setShowColorMenu(false);
            setShowSizeMenu(false);
          }}
          className="p-1 rounded hover:bg-amber-100 text-amber-600 transition-colors flex items-center gap-0.5"
          title="Highlight Background Color"
        >
          <Highlighter className="w-3.5 h-3.5" />
        </button>

        {showHlMenu && (
          <div className="absolute left-0 top-full mt-1.5 z-40 bg-white border border-gray-200 rounded-lg shadow-xl p-2 flex gap-1.5 animate-in fade-in">
            {Object.entries(HIGHLIGHT_COLORS).map(([k, color]) => (
              <button
                key={k}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  applyFormat("highlight", k);
                  setShowHlMenu(false);
                }}
                className="w-5 h-5 rounded-full border border-gray-300 hover:scale-125 transition-transform"
                style={{ backgroundColor: color.bg }}
                title={`Highlight in ${color.label}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text color dropdown */}
      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setShowColorMenu(!showColorMenu);
            setShowHlMenu(false);
            setShowSizeMenu(false);
          }}
          className="p-1 rounded hover:bg-blue-100 text-blue-600 transition-colors flex items-center gap-0.5"
          title="Text Color"
        >
          <Paintbrush className="w-3.5 h-3.5" />
        </button>

        {showColorMenu && (
          <div className="absolute left-0 top-full mt-1.5 z-40 bg-white border border-gray-200 rounded-lg shadow-xl p-2 flex gap-1.5 animate-in fade-in">
            {Object.entries(TEXT_COLORS).map(([k, color]) => (
              <button
                key={k}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  applyFormat("color", k);
                  setShowColorMenu(false);
                }}
                className="w-5 h-5 rounded-full border border-gray-300 hover:scale-125 transition-transform"
                style={{ backgroundColor: color.hex }}
                title={`Text Color: ${color.label}`}
              />
            ))}
          </div>
        )}
      </div>

      {showLineHighlight && (
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat("highlight", "yellow");
          }}
          className="px-1.5 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-semibold transition-colors"
          title="Highlight Entire Line"
        >
          ⚡ Whole Line
        </button>
      )}

      {/* Optional Line Font Size Stepper right in toolbar */}
      {onLineFontSizeChange && (
        <div className="flex items-center gap-1 border-l border-gray-200 pl-1.5 ml-0.5">
          <span className="text-[9px] text-gray-500 font-medium">Row:</span>
          <div className="flex items-center bg-white border border-gray-300 rounded shadow-2xs">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onLineFontSizeChange(
                  Math.max(7, Math.round(((lineFontSize || 10) - 0.5) * 2) / 2)
                );
              }}
              className="px-1 text-[9px] font-bold text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              title="Decrease entire line font size"
            >
              -
            </button>
            <span className="px-1 text-[9px] font-mono font-bold text-blue-700 min-w-[28px] text-center">
              {lineFontSize || 10}pt
            </span>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onLineFontSizeChange(
                  Math.min(24, Math.round(((lineFontSize || 10) + 0.5) * 2) / 2)
                );
              }}
              className="px-1 text-[9px] font-bold text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              title="Increase entire line font size"
            >
              +
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          handleClearFormatting();
        }}
        className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-red-500 ml-auto transition-colors"
        title="Clear formatting from selection"
      >
        <Eraser className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function ExperienceBulletItem({
  bullet,
  bulletChar,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onChange,
  onDelete,
  fontSize,
  onFontSizeChange,
}: {
  bullet: string;
  bulletChar: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onChange: (newVal: string) => void;
  onDelete: () => void;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showHlMenu, setShowHlMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);

  const applyFormat = (
    type: "bold" | "underline" | "highlight" | "color" | "size",
    param: string = "yellow"
  ) => {
    const el = inputRef.current;
    if (!el) {
      if (bullet.trim()) {
        const res = applyTextFormatting(bullet, 0, bullet.length, type, param);
        onChange(res.newText);
      }
      return;
    }
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;

    if (start === end) {
      if (bullet.trim()) {
        const res = applyTextFormatting(bullet, 0, bullet.length, type, param);
        onChange(res.newText);
      } else {
        const res = applyTextFormatting(bullet, 0, 0, type, param);
        onChange(res.newText);
      }
      return;
    }

    const res = applyTextFormatting(bullet, start, end, type, param);
    onChange(res.newText);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(res.newCursorStart, res.newCursorEnd);
    }, 10);
  };

  const hasFormatting =
    bullet.includes("**") ||
    bullet.includes("==") ||
    bullet.includes("<u>") ||
    bullet.includes("<color:") ||
    bullet.includes("<size:");

  return (
    <div className="space-y-1 bg-white p-2 rounded-lg border border-gray-200 shadow-xs">
      <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
        {/* Reorder Buttons */}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="text-gray-400 hover:text-blue-600 disabled:opacity-20 p-0.5"
            title="Move Bullet Up"
          >
            <ArrowUp className="w-2.5 h-2.5" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="text-gray-400 hover:text-blue-600 disabled:opacity-20 p-0.5"
            title="Move Bullet Down"
          >
            <ArrowDown className="w-2.5 h-2.5" />
          </button>
        </div>

        <span className="text-blue-600 font-bold text-xs flex-shrink-0">
          {bulletChar}
        </span>

        {/* Bullet Input */}
        <input
          ref={inputRef}
          className="flex-1 min-w-[200px] text-xs p-1.5 border border-gray-200 rounded text-gray-800 focus:ring-1 focus:ring-blue-500 bg-gray-50/50 focus:bg-white"
          value={bullet}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your achievement with metrics & results..."
        />

        {/* Individual Bullet Font Size Stepper & Dropdown */}
        {onFontSizeChange && (
          <div
            className="flex items-center bg-gray-50 border border-gray-200 rounded px-1 py-0.5 gap-0.5 flex-shrink-0"
            title="Individual Bullet Font Size"
          >
            <button
              type="button"
              onClick={() =>
                onFontSizeChange(
                  Math.max(7, Math.round(((fontSize || 9.5) - 0.5) * 2) / 2)
                )
              }
              className="text-[9px] font-bold text-gray-500 hover:text-blue-600 px-0.5"
              title="Decrease bullet font size"
            >
              -
            </button>
            <select
              value={fontSize || 9.5}
              onChange={(e) => onFontSizeChange(parseFloat(e.target.value))}
              className="text-[9px] font-mono font-bold text-blue-700 bg-transparent outline-none cursor-pointer p-0"
              title="Choose font size for this bullet"
            >
              {[7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14].map(
                (pt) => (
                  <option key={pt} value={pt}>
                    {pt}pt
                  </option>
                )
              )}
            </select>
            <button
              type="button"
              onClick={() =>
                onFontSizeChange(
                  Math.min(16, Math.round(((fontSize || 9.5) + 0.5) * 2) / 2)
                )
              }
              className="text-[9px] font-bold text-gray-500 hover:text-blue-600 px-0.5"
              title="Increase bullet font size"
            >
              +
            </button>
          </div>
        )}

        {/* Inline Formatting Controls */}
        <div className="flex items-center gap-0.5 flex-shrink-0 relative">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              applyFormat("bold");
            }}
            className="p-1 rounded hover:bg-gray-100 text-gray-700 font-bold transition-colors"
            title="Bold selection (**word**)"
          >
            <Bold className="w-3 h-3" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              applyFormat("underline");
            }}
            className="p-1 rounded hover:bg-gray-100 text-gray-700 transition-colors"
            title="Underline selection (<u>word</u>)"
          >
            <Underline className="w-3 h-3" />
          </button>

          {/* Font Size dropdown for selected text */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setShowSizeMenu(!showSizeMenu);
                setShowHlMenu(false);
                setShowColorMenu(false);
              }}
              className="px-1 py-0.5 rounded hover:bg-blue-50 text-blue-700 font-bold text-[9px] transition-colors"
              title="Change size of selected text (<size:Xpt>)"
            >
              <Type className="w-3 h-3" />
            </button>

            {showSizeMenu && (
              <div className="absolute right-0 top-full mt-1 z-40 bg-white border border-gray-200 rounded-lg shadow-xl p-1 grid grid-cols-3 gap-0.5 min-w-[150px] animate-in fade-in">
                {FONT_SIZE_OPTIONS.map((sizeOpt) => (
                  <button
                    key={sizeOpt}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applyFormat("size", sizeOpt);
                      setShowSizeMenu(false);
                    }}
                    className="px-1 py-0.5 text-[9px] font-mono font-medium rounded hover:bg-blue-50 hover:text-blue-700 text-gray-700 text-center transition-colors"
                  >
                    {sizeOpt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Highlight Color Dropdown */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setShowHlMenu(!showHlMenu);
                setShowColorMenu(false);
                setShowSizeMenu(false);
              }}
              className="p-1 rounded hover:bg-amber-100 text-amber-600 transition-colors"
              title="Highlight selection in background color"
            >
              <Highlighter className="w-3 h-3" />
            </button>

            {showHlMenu && (
              <div className="absolute right-0 top-full mt-1 z-40 bg-white border border-gray-200 rounded-lg shadow-xl p-1.5 flex gap-1 animate-in fade-in">
                {Object.entries(HIGHLIGHT_COLORS).map(([k, color]) => (
                  <button
                    key={k}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applyFormat("highlight", k);
                      setShowHlMenu(false);
                    }}
                    className="w-4 h-4 rounded-full border border-gray-300 hover:scale-125 transition-transform"
                    style={{ backgroundColor: color.bg }}
                    title={`Highlight in ${color.label}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Text Color Dropdown */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setShowColorMenu(!showColorMenu);
                setShowHlMenu(false);
                setShowSizeMenu(false);
              }}
              className="p-1 rounded hover:bg-blue-100 text-blue-600 transition-colors"
              title="Change selected text color"
            >
              <Paintbrush className="w-3 h-3" />
            </button>

            {showColorMenu && (
              <div className="absolute right-0 top-full mt-1 z-40 bg-white border border-gray-200 rounded-lg shadow-xl p-1.5 flex gap-1 animate-in fade-in">
                {Object.entries(TEXT_COLORS).map(([k, color]) => (
                  <button
                    key={k}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applyFormat("color", k);
                      setShowColorMenu(false);
                    }}
                    className="w-4 h-4 rounded-full border border-gray-300 hover:scale-125 transition-transform"
                    style={{ backgroundColor: color.hex }}
                    title={`Text Color: ${color.label}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Highlight Whole Bullet Line */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              applyFormat("highlight", "yellow");
            }}
            className="px-1 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 text-[9px] font-bold transition-colors"
            title="Highlight entire line/bullet"
          >
            ⚡ Line
          </button>

          {/* Delete Bullet */}
          <button
            type="button"
            onClick={onDelete}
            className="text-gray-300 hover:text-red-500 p-1 transition-colors"
            title="Remove Bullet"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Rendered Preview Badge if formatted */}
      {hasFormatting && (
        <div className="ml-7 text-[11px] p-1.5 bg-gray-50 border border-gray-100 rounded-md leading-relaxed text-gray-800">
          <span className="text-[9px] font-bold text-gray-400 block uppercase mb-0.5">
            Rendered Preview:
          </span>
          {renderFormattedText(bullet)}
        </div>
      )}
    </div>
  );
}

function ProjectItemEditor({
  proj,
  projIdx,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onUpdateName,
  onUpdateTech,
  onUpdateDesc,
  onDelete,
  nameFontSize,
  techFontSize,
  descFontSize,
  onUpdateNameFontSize,
  onUpdateTechFontSize,
  onUpdateDescFontSize,
  onResetNameFontSize,
  onResetTechFontSize,
  onResetDescFontSize,
}: {
  proj: any;
  projIdx: number;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onUpdateName: (v: string) => void;
  onUpdateTech: (v: string) => void;
  onUpdateDesc: (v: string) => void;
  onDelete: () => void;
  nameFontSize?: number;
  techFontSize?: number;
  descFontSize?: number;
  onUpdateNameFontSize?: (v: number) => void;
  onUpdateTechFontSize?: (v: number) => void;
  onUpdateDescFontSize?: (v: number) => void;
  onResetNameFontSize?: () => void;
  onResetTechFontSize?: () => void;
  onResetDescFontSize?: () => void;
}) {
  const descRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2 relative">
      <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-gray-200">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
            #{projIdx + 1}
          </span>
          <span className="text-xs font-bold text-gray-700 truncate max-w-[150px]">
            {proj.name || "Untitled Project"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {onMoveUp && (
            <button
              type="button"
              disabled={!canMoveUp}
              onClick={onMoveUp}
              className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Move Project Up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          )}
          {onMoveDown && (
            <button
              type="button"
              disabled={!canMoveDown}
              onClick={onMoveDown}
              className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Move Project Down"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
            title="Remove Project"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] font-bold text-gray-500 uppercase">
            Project Name
          </label>
          {onUpdateNameFontSize && (
            <LineFontSizeSelector
              compact
              value={nameFontSize}
              fallback={11}
              onChange={onUpdateNameFontSize}
              onReset={onResetNameFontSize}
            />
          )}
        </div>
        <input
          className="w-full text-xs p-1.5 border border-gray-300 rounded font-bold"
          value={proj.name || ""}
          onChange={(e) => onUpdateName(e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] font-bold text-gray-500 uppercase">
            Technologies
          </label>
          {onUpdateTechFontSize && (
            <LineFontSizeSelector
              compact
              value={techFontSize}
              fallback={10}
              onChange={onUpdateTechFontSize}
              onReset={onResetTechFontSize}
            />
          )}
        </div>
        <input
          className="w-full text-xs p-1.5 border border-gray-300 rounded"
          value={proj.tech || ""}
          onChange={(e) => onUpdateTech(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-gray-500 uppercase">
            Description
          </label>
          {onUpdateDescFontSize && (
            <LineFontSizeSelector
              compact
              value={descFontSize}
              fallback={9.5}
              onChange={onUpdateDescFontSize}
              onReset={onResetDescFontSize}
            />
          )}
        </div>
        <FormattedEditorToolbar
          inputRef={descRef}
          value={proj.description || ""}
          onChange={onUpdateDesc}
          showLineHighlight={false}
          lineFontSize={descFontSize}
          onLineFontSizeChange={onUpdateDescFontSize}
        />
        <textarea
          ref={descRef}
          className="w-full text-xs p-1.5 border border-gray-300 rounded h-16 leading-relaxed"
          value={proj.description || ""}
          onChange={(e) => onUpdateDesc(e.target.value)}
          placeholder="Describe scope, tools used, and key impact..."
        />
        {proj.description && (
          <div className="text-[11px] p-1.5 bg-white border border-gray-100 rounded leading-relaxed text-gray-800">
            <span className="text-[9px] font-bold text-gray-400 block uppercase mb-0.5">
              Rendered Preview:
            </span>
            {renderFormattedText(proj.description)}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionPositionAndFontBar({
  sectionId,
  label,
  currentOrder,
  fontSizeKey,
  fontSizeVal,
  onMoveSection,
  onUpdateFontSize,
}: {
  sectionId?: string;
  label: string;
  currentOrder?: string[];
  fontSizeKey?: keyof SectionFontSizes;
  fontSizeVal?: number;
  onMoveSection?: (direction: "up" | "down") => void;
  onUpdateFontSize?: (delta: number) => void;
}) {
  const positionIndex =
    sectionId && currentOrder ? currentOrder.indexOf(sectionId) : -1;
  const isPresent = positionIndex !== -1;
  const totalSections = currentOrder?.length || 0;

  return (
    <div className="p-2.5 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between gap-2 shadow-xs mb-3">
      {/* Position in Resume */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900">
            {label}
          </span>
          {isPresent && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-200 text-blue-800">
              #{positionIndex + 1} of {totalSections}
            </span>
          )}
        </div>
        {isPresent && onMoveSection && (
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              disabled={positionIndex === 0}
              onClick={() => onMoveSection("up")}
              className="p-1 rounded bg-white hover:bg-blue-100 text-blue-700 disabled:opacity-30 disabled:pointer-events-none border border-blue-200 shadow-2xs transition-colors"
              title="Move entire section up on page"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
            <button
              type="button"
              disabled={positionIndex === totalSections - 1}
              onClick={() => onMoveSection("down")}
              className="p-1 rounded bg-white hover:bg-blue-100 text-blue-700 disabled:opacity-30 disabled:pointer-events-none border border-blue-200 shadow-2xs transition-colors"
              title="Move entire section down on page"
            >
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Font Size Stepper */}
      {fontSizeKey && fontSizeVal !== undefined && onUpdateFontSize && (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-[10px] font-medium text-gray-500">Size:</span>
          <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => onUpdateFontSize(-0.5)}
              className="px-1.5 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              title="Decrease font size (-0.5pt)"
            >
              -
            </button>
            <span className="px-1.5 text-[11px] font-bold text-gray-800 min-w-[34px] text-center border-x border-gray-200">
              {fontSizeVal}pt
            </span>
            <button
              type="button"
              onClick={() => onUpdateFontSize(0.5)}
              className="px-1.5 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              title="Increase font size (+0.5pt)"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const BULLET_STYLES = [
  { id: "•", label: "Classic Dot", preview: "•", desc: "Universal ATS standard" },
  { id: "▸", label: "Modern Arrow", preview: "▸", desc: "Sharp & tech forward" },
  { id: "✓", label: "Checkmark", preview: "✓", desc: "Results & achievements" },
  { id: "–", label: "Clean Dash", preview: "–", desc: "Minimalist executive" },
  { id: "▪", label: "Bold Square", preview: "▪", desc: "Structured & geometric" },
  { id: "◆", label: "Diamond", preview: "◆", desc: "Distinguished & elegant" },
  { id: "◦", label: "Hollow Ring", preview: "◦", desc: "Light & contemporary" },
  { id: "★", label: "Star", preview: "★", desc: "Featured highlights" },
  { id: "→", label: "Arrow Pointer", preview: "→", desc: "Dynamic direction" },
  { id: "accent-dot", label: "Accent Dot", preview: "●", desc: "Theme colored circle" },
];

const PRESET_COLORS = [
  { name: "Royal Blue", hex: "#2563eb" },
  { name: "Deep Navy", hex: "#1e3a8a" },
  { name: "Charcoal", hex: "#111827" },
  { name: "Slate Gray", hex: "#334155" },
  { name: "Emerald Green", hex: "#065f46" },
  { name: "Burgundy", hex: "#831843" },
  { name: "Teal Modern", hex: "#0f766e" },
  { name: "Violet", hex: "#581c87" },
];

const FONT_OPTIONS = [
  { name: "Inter (Modern Sans)", value: "'Inter', sans-serif" },
  { name: "Roboto (Tech Clean)", value: "'Roboto', sans-serif" },
  { name: "Arial (Standard ATS)", value: "Arial, sans-serif" },
  { name: "Calibri (Corporate)", value: "Calibri, Arial, sans-serif" },
  { name: "Georgia (Serif Classic)", value: "Georgia, serif" },
  { name: "Garamond (Executive)", value: "Garamond, serif" },
  { name: "Segoe UI (Clean)", value: "'Segoe UI', Tahoma, sans-serif" },
];

export interface ResumeSectionMeta {
  id: string;
  label: string;
  icon: any;
  desc: string;
  category: "Core" | "Experience" | "Skills" | "Education" | "Showcase" | "Credentials" | "Additional";
  defaultStarterData: (data: ResumeData) => Partial<ResumeData>;
}

export const ALL_RESUME_SECTIONS: ResumeSectionMeta[] = [
  {
    id: "summary",
    label: "Professional Summary",
    icon: Sparkles,
    desc: "Executive overview, core competencies, and career value proposition.",
    category: "Core",
    defaultStarterData: (d) => ({
      summary:
        d.summary ||
        "Results-oriented professional with demonstrated expertise in delivering high-impact solutions, optimizing processes, and cross-functional leadership.",
    }),
  },
  {
    id: "experience",
    label: "Work Experience",
    icon: Briefcase,
    desc: "Roles, employers, timelines, leadership achievements, and quantifiable results.",
    category: "Experience",
    defaultStarterData: (d) => ({
      experience: d.experience?.length
        ? d.experience
        : [
            {
              title: "Senior Role / Specialist",
              company: "Company Name",
              date: "2023 – Present",
              location: "City, Country",
              bullets: [
                "Spearheaded critical initiatives delivering measurable improvements in team efficiency and delivery speed.",
                "Engineered streamlined operational workflows resulting in improved accuracy and cost savings.",
              ],
            },
          ],
    }),
  },
  {
    id: "skills",
    label: "Technical & Core Skills",
    icon: Code,
    desc: "Technical languages, software tools, frameworks, and methodologies.",
    category: "Skills",
    defaultStarterData: (d) => ({
      skills: d.skills || {
        technical: ["Core Technical Skill", "Data Analysis", "System Design"],
        tools: ["Software Tool", "Platform", "Git"],
        concepts: ["Agile Methodology", "Best Practices"],
        soft: ["Communication", "Problem Solving"],
      },
    }),
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    desc: "Academic degrees, universities, relevant coursework, graduation years, and GPA.",
    category: "Education",
    defaultStarterData: (d) => ({
      education: d.education?.length
        ? d.education
        : [
            {
              degree: "Bachelor of Science / Technology",
              school: "University / Institute Name",
              date: "2020 – 2024",
              location: "City, Country",
            },
          ],
    }),
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderGit2,
    desc: "High-impact projects, GitHub repositories, architecture, and tech stacks.",
    category: "Showcase",
    defaultStarterData: (d) => ({
      projects: d.projects?.length
        ? d.projects
        : [
            {
              name: "Key Analytics & Development Project",
              tech: "Python, SQL, Modern Frameworks",
              description:
                "Designed and deployed end-to-end workflow delivering automated reporting and +35% efficiency boost.",
            },
          ],
    }),
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: Award,
    desc: "Accredited certifications, professional licenses, and verified credentials.",
    category: "Credentials",
    defaultStarterData: (d) => ({
      certifications: d.certifications?.length
        ? d.certifications
        : [
            {
              name: "Certified Professional Credential",
              issuer: "Recognized Certification Authority",
              date: "2024",
            },
          ],
    }),
  },
  {
    id: "achievements",
    label: "Achievements & Awards",
    icon: Award,
    desc: "Honors, hackathon wins, scholarships, publications, and professional awards.",
    category: "Additional",
    defaultStarterData: (d) => ({
      achievements: d.achievements?.length
        ? d.achievements
        : [
            {
              title: "Award of Excellence / Recognition",
              description:
                "Recognized for outstanding leadership, project delivery excellence, or milestone achievement.",
            },
          ],
    }),
  },
  {
    id: "languages",
    label: "Languages",
    icon: Globe,
    desc: "Spoken and written language proficiencies (Native, Fluent, Professional).",
    category: "Additional",
    defaultStarterData: (d) => ({
      languages: d.languages?.length
        ? d.languages
        : [
            {
              name: "English",
              proficiency: "Full Professional Proficiency",
            },
          ],
    }),
  },
];

const SECTION_METADATA: Record<string, { label: string; icon: any; desc: string }> =
  ALL_RESUME_SECTIONS.reduce((acc, sec) => {
    acc[sec.id] = { label: sec.label, icon: sec.icon, desc: sec.desc };
    return acc;
  }, {} as Record<string, { label: string; icon: any; desc: string }>);

export default function ResumeEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [data, setData] = useState<ResumeData | null>(null);
  const [resumeMeta, setResumeMeta] = useState<any>(null);
  const [templateId, setTemplateId] = useState<string>("ats-classic");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Main editor panel navigation
  const [mainTab, setMainTab] = useState<"content" | "layout" | "design">("content");
  const [contentSubTab, setContentSubTab] = useState<string>("info");

  // Drag and drop state for sections
  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
  const [layoutFilter, setLayoutFilter] = useState<"all" | "added" | "unadded">("all");

  const componentRef = useRef<HTMLDivElement>(null);
  const summaryInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchResume();
  }, [id]);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchResume = async () => {
    try {
      const res = await fetch(`/api/resumes/${id}`);
      if (res.ok) {
        const json = await res.json();
        setResumeMeta(json);
        setTemplateId(json.template || "ats-classic");
        const parsed = JSON.parse(json.content);
        setData(parsed);
      } else {
        router.push("/dashboard/resumes");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const currentTemplate = getTemplateById(templateId) || ALL_TEMPLATES[0];

  // Custom styles helper
  const updateCustomStyles = (updates: Partial<CustomStyles>) => {
    if (!data) return;
    setData({
      ...data,
      customStyles: {
        ...(data.customStyles || {}),
        ...updates,
      },
    });
  };

  const resetCustomStyles = () => {
    if (!data) return;
    setData({
      ...data,
      customStyles: {},
    });
    notify("Layout styles reset to template defaults");
  };

  // Re-sync directly with master profile
  const handleSyncWithProfile = async () => {
    if (
      !confirm(
        "Are you sure you want to refresh this resume with your latest Master Profile information? Any manual text changes will be updated with your profile data (your custom design and bullet settings will remain)."
      )
    ) {
      return;
    }

    setSyncing(true);
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const profile = await res.json();
        const freshResumeData = convertProfileToResumeData(profile, {
          name: profile.userName,
          email: profile.userEmail,
        });

        // Preserve user's custom layout styles
        freshResumeData.customStyles = data?.customStyles;

        setData(freshResumeData);
        notify("Successfully populated with latest Master Profile data!");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to fetch Master Profile");
    } finally {
      setSyncing(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: data,
          template: templateId,
        }),
      });
      if (res.ok) {
        notify("Resume saved successfully!");
      } else {
        notify("Failed to save changes.");
      }
    } catch (error) {
      console.error(error);
      notify("Error saving resume.");
    } finally {
      setSaving(false);
    }
  };

  const pageDim = getPageDimensions(data?.customStyles);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle:
      resumeMeta?.title ||
      `${data?.personalInfo?.fullName || "Resume"}_ATS_Resume`,
    pageStyle: `
      @page {
        size: ${pageDim.width} ${pageDim.height};
        margin: 0mm;
      }
      @media print {
        body {
          margin: 0 !important;
          padding: 0 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const handleDownloadDocx = async () => {
    if (!data) return;
    setDownloadingDocx(true);
    try {
      const blob = await generateResumeDocxBlob(data);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        data.personalInfo?.fullName?.replace(/\s+/g, "_") || "Resume"
      }_ATS.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      notify("DOCX downloaded successfully!");
    } catch (err) {
      console.error("Failed to generate DOCX:", err);
      notify("Error generating Word document.");
    } finally {
      setDownloadingDocx(false);
    }
  };

  // ─── Section Reordering Functions ──────────────────────────────────────────

  const defaultSectionOrder = [
    "summary",
    "experience",
    "skills",
    "education",
    "projects",
    "certifications",
    "achievements",
    "languages",
  ];

  const currentOrder =
    data?.customStyles?.sectionOrder ||
    currentTemplate.style.sectionOrder ||
    defaultSectionOrder;

  const hiddenSections = new Set(data?.customStyles?.hiddenSections || []);
  const sidebarSections = new Set(
    data?.customStyles?.sidebarSections || [
      "skills",
      "certifications",
      "languages",
      "achievements",
    ]
  );

  const moveSection = (index: number, direction: "up" | "down") => {
    const newOrder = [...currentOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    updateCustomStyles({ sectionOrder: newOrder });
  };

  const toggleSectionVisibility = (sectionId: string) => {
    const newHidden = new Set(hiddenSections);
    if (newHidden.has(sectionId)) {
      newHidden.delete(sectionId);
    } else {
      newHidden.add(sectionId);
    }
    updateCustomStyles({ hiddenSections: Array.from(newHidden) });
  };

  const toggleSidebarPlacement = (sectionId: string) => {
    const newSidebar = new Set(sidebarSections);
    if (newSidebar.has(sectionId)) {
      newSidebar.delete(sectionId);
    } else {
      newSidebar.add(sectionId);
    }
    updateCustomStyles({ sidebarSections: Array.from(newSidebar) });
  };

  // Compute unadded and added sections
  const unaddedSections = ALL_RESUME_SECTIONS.filter(
    (s) => !currentOrder.includes(s.id)
  );

  const getSectionContentStatus = (sectionId: string) => {
    if (!data) return { hasContent: false, countText: "Empty" };
    switch (sectionId) {
      case "summary": {
        const has = Boolean(data.summary && data.summary.trim().length > 0);
        return { hasContent: has, countText: has ? "Summary added" : "No summary yet" };
      }
      case "experience": {
        const count = data.experience?.length || 0;
        return {
          hasContent: count > 0,
          countText: count > 0 ? `${count} role${count > 1 ? "s" : ""}` : "No roles yet",
        };
      }
      case "skills": {
        const count =
          (data.skills?.technical?.length || 0) +
          (data.skills?.tools?.length || 0) +
          (data.skills?.concepts?.length || 0) +
          (data.skills?.soft?.length || 0);
        return {
          hasContent: count > 0,
          countText: count > 0 ? `${count} skills` : "No skills yet",
        };
      }
      case "education": {
        const count = data.education?.length || 0;
        return {
          hasContent: count > 0,
          countText: count > 0 ? `${count} degree${count > 1 ? "s" : ""}` : "No degrees yet",
        };
      }
      case "projects": {
        const count = data.projects?.length || 0;
        return {
          hasContent: count > 0,
          countText: count > 0 ? `${count} project${count > 1 ? "s" : ""}` : "No projects yet",
        };
      }
      case "certifications": {
        const count = data.certifications?.length || 0;
        return {
          hasContent: count > 0,
          countText: count > 0 ? `${count} cert${count > 1 ? "s" : ""}` : "No certs yet",
        };
      }
      case "achievements": {
        const count = data.achievements?.length || 0;
        return {
          hasContent: count > 0,
          countText: count > 0 ? `${count} award${count > 1 ? "s" : ""}` : "No awards yet",
        };
      }
      case "languages": {
        const count = data.languages?.length || 0;
        return {
          hasContent: count > 0,
          countText: count > 0 ? `${count} language${count > 1 ? "s" : ""}` : "No languages yet",
        };
      }
      default:
        return { hasContent: false, countText: "Ready" };
    }
  };

  const handleAddSection = (sectionId: string) => {
    if (!data) return;
    const meta = ALL_RESUME_SECTIONS.find((s) => s.id === sectionId);
    const newOrder = currentOrder.includes(sectionId)
      ? currentOrder
      : [...currentOrder, sectionId];

    // Remove from hidden sections if it was hidden
    const newHidden = (data.customStyles?.hiddenSections || []).filter(
      (s) => s !== sectionId
    );

    let updatedData: ResumeData = {
      ...data,
      customStyles: {
        ...(data.customStyles || {}),
        sectionOrder: newOrder,
        hiddenSections: newHidden,
      },
    };

    // If section has no content, populate starter data so it renders immediately
    if (meta) {
      const starter = meta.defaultStarterData(data);
      updatedData = { ...updatedData, ...starter };
    }

    setData(updatedData);
    notify(`Added ${meta?.label || sectionId} to your resume!`);
  };

  const handleRemoveSection = (sectionId: string) => {
    if (!data) return;
    const meta = ALL_RESUME_SECTIONS.find((s) => s.id === sectionId);
    const newOrder = currentOrder.filter((id) => id !== sectionId);

    setData({
      ...data,
      customStyles: {
        ...(data.customStyles || {}),
        sectionOrder: newOrder,
      },
    });
    notify(
      `Removed ${meta?.label || sectionId} from resume (available to re-add below).`
    );
  };

  const handleAddAllSections = () => {
    if (!data) return;
    const allIds = ALL_RESUME_SECTIONS.map((s) => s.id);
    let updatedData: ResumeData = { ...data };

    ALL_RESUME_SECTIONS.forEach((meta) => {
      const starter = meta.defaultStarterData(updatedData);
      updatedData = { ...updatedData, ...starter };
    });

    updatedData.customStyles = {
      ...(updatedData.customStyles || {}),
      sectionOrder: allIds,
      hiddenSections: [],
    };

    setData(updatedData);
    notify("Added all 8 available resume sections!");
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedSectionIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedSectionIndex === null || draggedSectionIndex === dropIndex) return;
    const newOrder = [...currentOrder];
    const [movedItem] = newOrder.splice(draggedSectionIndex, 1);
    newOrder.splice(dropIndex, 0, movedItem);
    updateCustomStyles({ sectionOrder: newOrder });
    setDraggedSectionIndex(null);
  };

  // ─── Bullet Point Reordering in Experience ──────────────────────────────────

  const moveExperienceBullet = (
    expIdx: number,
    bulletIdx: number,
    direction: "up" | "down"
  ) => {
    if (!data?.experience) return;
    const updatedExp = [...data.experience];
    const bullets = [...(updatedExp[expIdx].bullets || [])];
    const targetIdx = direction === "up" ? bulletIdx - 1 : bulletIdx + 1;
    if (targetIdx < 0 || targetIdx >= bullets.length) return;

    const temp = bullets[bulletIdx];
    bullets[bulletIdx] = bullets[targetIdx];
    bullets[targetIdx] = temp;

    updatedExp[expIdx].bullets = bullets;
    setData({ ...data, experience: updatedExp });
  };

  // ─── Entry & Content Reordering Helpers ─────────────────────────────────────

  // Move entire section (e.g. Work Experience) up or down from inside its content tab
  const moveSectionById = (sectionId: string, direction: "up" | "down") => {
    const idx = currentOrder.indexOf(sectionId);
    if (idx === -1) return;
    moveSection(idx, direction);
  };

  // Move Work Experience item up/down
  const moveExperienceItem = (index: number, direction: "up" | "down") => {
    if (!data?.experience) return;
    const items = [...data.experience];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;
    setData({ ...data, experience: items });
  };

  // Toggle companyFirst on experience item (position company above or below title)
  const toggleCompanyFirst = (index: number) => {
    if (!data?.experience) return;
    const items = [...data.experience];
    items[index] = {
      ...items[index],
      companyFirst: !items[index].companyFirst,
    };
    setData({ ...data, experience: items });
  };

  // Move Education item up/down
  const moveEducationItem = (index: number, direction: "up" | "down") => {
    if (!data?.education) return;
    const items = [...data.education];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;
    setData({ ...data, education: items });
  };

  // Move Project item up/down
  const moveProjectItem = (index: number, direction: "up" | "down") => {
    if (!data?.projects) return;
    const items = [...data.projects];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;
    setData({ ...data, projects: items });
  };

  // Move Certification item up/down
  const moveCertificationItem = (index: number, direction: "up" | "down") => {
    if (!data?.certifications) return;
    const items = [...data.certifications];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;
    setData({ ...data, certifications: items });
  };

  // Move Achievement item up/down
  const moveAchievementItem = (index: number, direction: "up" | "down") => {
    if (!data?.achievements) return;
    const items = [...data.achievements];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;
    setData({ ...data, achievements: items });
  };

  // Move Language item up/down
  const moveLanguageItem = (index: number, direction: "up" | "down") => {
    if (!data?.languages) return;
    const items = [...data.languages];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;
    setData({ ...data, languages: items });
  };

  // Move individual skill within a category
  const moveSkillItem = (
    category: "technical" | "tools" | "concepts" | "soft",
    index: number,
    direction: "up" | "down"
  ) => {
    if (!data?.skills) return;
    const list = [...(data.skills[category] || [])];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    setData({
      ...data,
      skills: {
        ...data.skills,
        [category]: list,
      },
    });
  };

  // Helper for Section Font Size updates
  const updateSectionFontSize = (
    key: keyof SectionFontSizes,
    deltaOrValue: number,
    isAbsolute = false
  ) => {
    const currentSfs = data?.customStyles?.sectionFontSizes || {};
    const defaultVal =
      key === "name"
        ? 22
        : key === "contact"
        ? 9
        : key === "sectionHeadings"
        ? 12
        : 10;
    const currentVal = currentSfs[key] !== undefined ? currentSfs[key]! : defaultVal;
    const newVal = isAbsolute
      ? deltaOrValue
      : Math.max(7, Math.min(36, Math.round((currentVal + deltaOrValue) * 2) / 2));

    updateCustomStyles({
      sectionFontSizes: {
        ...currentSfs,
        [key]: newVal,
      },
    });
  };

  const getSectionFontSizeVal = (key: keyof SectionFontSizes) => {
    const currentSfs = data?.customStyles?.sectionFontSizes || {};
    const defaultVal =
      key === "name"
        ? 22
        : key === "contact"
        ? 9
        : key === "sectionHeadings"
        ? 12
        : 10;
    return currentSfs[key] !== undefined ? currentSfs[key]! : defaultVal;
  };

  // Helper for Global Line/Row Font Size updates in CustomStyles
  const updateLineFontSize = (
    key: keyof LineFontSizes,
    deltaOrValue: number,
    isAbsolute = false
  ) => {
    const currentLfs = data?.customStyles?.lineFontSizes || {};
    const defaultVal =
      key === "companyName"
        ? 11
        : key === "jobTitle"
        ? 10.5
        : key === "dates"
        ? 9
        : key === "descriptions"
        ? 9.5
        : key === "contactDetails"
        ? 8.5
        : key === "degrees"
        ? 11
        : key === "institutions"
        ? 10
        : key === "bullets"
        ? 9.5
        : key === "skillItems"
        ? 9.5
        : 10;
    const currentVal = currentLfs[key] !== undefined ? currentLfs[key]! : defaultVal;
    const newVal = isAbsolute
      ? deltaOrValue
      : Math.max(7, Math.min(24, Math.round((currentVal + deltaOrValue) * 2) / 2));

    updateCustomStyles({
      lineFontSizes: {
        ...currentLfs,
        [key]: newVal,
      },
    });
  };

  const getLineFontSizeVal = (key: keyof LineFontSizes, fallback: number = 10) => {
    const currentLfs = data?.customStyles?.lineFontSizes || {};
    return currentLfs[key] !== undefined ? currentLfs[key]! : fallback;
  };

  if (loading || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-700">Loading your resume...</p>
        </div>
      </div>
    );
  }

  const cs = data.customStyles || {};

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden -m-8">
      {/* ── Left Panel: Controls, Reorder & Design ── */}
      <div className="w-2/5 min-w-[430px] max-w-[560px] bg-white border-r border-gray-200 flex flex-col h-full z-10 shadow-lg">
        {/* Top Header */}
        <div className="p-3.5 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-20">
          <div className="flex items-center space-x-2.5 min-w-0">
            <Link
              href="/dashboard/resumes"
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="Back to Resumes"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-gray-900 truncate" title={resumeMeta?.title}>
                {resumeMeta?.title || "Resume Editor"}
              </h2>
              <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                ATS Safe: {currentTemplate.atsScore}%
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 flex-shrink-0">
            <button
              onClick={handleSyncWithProfile}
              disabled={syncing}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
              title="Re-populate with Master Profile"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin text-blue-600" : ""}`} />
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50"
              title="Save Changes"
            >
              <Save className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownloadDocx}
              disabled={downloadingDocx}
              className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
              title="Download Word DOCX"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-600" />
              DOCX
            </button>

            <button
              onClick={() => handlePrint()}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            {notification}
          </div>
        )}

        {/* Primary Navigation Modes: Content | Layout & Reorder | Design & Bullets */}
        <div className="grid grid-cols-3 bg-gray-100 p-1.5 border-b border-gray-200 text-xs font-bold text-gray-600">
          <button
            onClick={() => setMainTab("content")}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mainTab === "content"
                ? "bg-white text-blue-600 shadow-sm"
                : "hover:text-gray-900"
            }`}
          >
            <User className="w-3.5 h-3.5" /> Content
          </button>

          <button
            onClick={() => setMainTab("layout")}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mainTab === "layout"
                ? "bg-white text-blue-600 shadow-sm"
                : "hover:text-gray-900"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> Layout & Order
          </button>

          <button
            onClick={() => setMainTab("design")}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mainTab === "design"
                ? "bg-white text-blue-600 shadow-sm"
                : "hover:text-gray-900"
            }`}
          >
            <Palette className="w-3.5 h-3.5" /> Design & Bullets
          </button>
        </div>

        {/* ── MODE 1: LAYOUT & REORDER (ALL SECTIONS DISPLAY) ── */}
        {mainTab === "layout" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Guide & Summary */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-800 leading-relaxed space-y-1">
              <div className="flex items-center justify-between">
                <strong className="font-semibold text-blue-900 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  Resume Section Architecture ({ALL_RESUME_SECTIONS.length} Available)
                </strong>
                <span className="text-[10px] bg-blue-100/80 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                  {currentOrder.length} on Resume
                </span>
              </div>
              <p className="text-[11px] text-blue-700">
                Manage, reorder, or add any available resume section. Drag with <strong>⠿</strong> or use <strong>▲ ▼</strong> to position sections anywhere on the page.
              </p>
            </div>

            {/* Filter Pills & Actions */}
            <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
              <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-[11px] font-bold text-gray-600">
                <button
                  type="button"
                  onClick={() => setLayoutFilter("all")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    layoutFilter === "all"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "hover:text-gray-900"
                  }`}
                >
                  All ({ALL_RESUME_SECTIONS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutFilter("added")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    layoutFilter === "added"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "hover:text-gray-900"
                  }`}
                >
                  Added ({currentOrder.length})
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutFilter("unadded")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    layoutFilter === "unadded"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "hover:text-gray-900"
                  }`}
                >
                  Not Added ({unaddedSections.length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                {unaddedSections.length > 0 && (
                  <button
                    type="button"
                    onClick={handleAddAllSections}
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    title="Add all remaining sections to resume layout"
                  >
                    <Plus className="w-3 h-3" /> Add All
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetCustomStyles}
                  className="text-[10px] text-gray-500 hover:text-gray-700 flex items-center gap-1 font-medium"
                  title="Reset to template default layout"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
            </div>

            {/* 1. SECTIONS ADDED TO RESUME */}
            {(layoutFilter === "all" || layoutFilter === "added") && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Added to Resume ({currentOrder.length})
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Drag ⠿ or use ▲ ▼ to reorder
                  </span>
                </div>

                {currentOrder.length === 0 ? (
                  <div className="p-4 border border-dashed border-gray-200 rounded-xl text-center text-xs text-gray-500">
                    No sections currently added. Click &quot;+ Add to Resume&quot; below to add sections.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentOrder.map((sectionId, idx) => {
                      const meta = SECTION_METADATA[sectionId] || {
                        label: sectionId,
                        icon: LayoutTemplate,
                        desc: "",
                      };
                      const Icon = meta.icon;
                      const isHidden = hiddenSections.has(sectionId);
                      const isSidebar = sidebarSections.has(sectionId);
                      const isTwoCol =
                        cs.layoutType?.includes("two-column") ||
                        currentTemplate.style.layoutType?.includes("two-column");
                      const status = getSectionContentStatus(sectionId);

                      return (
                        <div
                          key={sectionId}
                          draggable
                          onDragStart={() => handleDragStart(idx)}
                          onDragOver={handleDragOver}
                          onDrop={() => handleDrop(idx)}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                            isHidden
                              ? "bg-gray-50 border-dashed border-gray-200 opacity-60"
                              : "bg-white border-gray-200 shadow-xs hover:border-blue-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-700 p-0.5 flex-shrink-0"
                              title="Drag to reposition section"
                            >
                              <GripVertical className="w-4 h-4" />
                            </span>

                            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </span>

                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <p className="text-xs font-bold text-gray-800 leading-tight">
                                  {meta.label}
                                </p>
                                <span className="text-[9px] bg-gray-100 text-gray-600 font-mono px-1.5 py-0.2 rounded font-semibold">
                                  #{idx + 1}
                                </span>
                              </div>
                              <p className="text-[10px] text-gray-400 flex items-center gap-1.5 truncate">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    status.hasContent
                                      ? "bg-emerald-500"
                                      : "bg-amber-400"
                                  }`}
                                />
                                {status.countText}
                                {isHidden && (
                                  <span className="text-red-500 font-semibold">
                                    • Hidden
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 flex-shrink-0">
                            {/* Two-Column Placement Toggle */}
                            {isTwoCol && !isHidden && (
                              <button
                                type="button"
                                onClick={() => toggleSidebarPlacement(sectionId)}
                                className={`text-[10px] px-2 py-0.5 rounded font-semibold transition-colors ${
                                  isSidebar
                                    ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                                title="Toggle between Main Column and Sidebar"
                              >
                                {isSidebar ? "Sidebar" : "Main"}
                              </button>
                            )}

                            {/* Move Up */}
                            <button
                              type="button"
                              onClick={() => moveSection(idx, "up")}
                              disabled={idx === 0}
                              className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 rounded hover:bg-gray-100 transition-colors"
                              title="Move Section Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>

                            {/* Move Down */}
                            <button
                              type="button"
                              onClick={() => moveSection(idx, "down")}
                              disabled={idx === currentOrder.length - 1}
                              className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 rounded hover:bg-gray-100 transition-colors"
                              title="Move Section Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>

                            {/* Show/Hide Eye Toggle */}
                            <button
                              type="button"
                              onClick={() => toggleSectionVisibility(sectionId)}
                              className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                                isHidden
                                  ? "text-red-400 hover:text-red-600"
                                  : "text-gray-400 hover:text-gray-700"
                              }`}
                              title={isHidden ? "Unhide Section" : "Hide Section from Resume"}
                            >
                              {isHidden ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Remove from Resume Layout */}
                            <button
                              type="button"
                              onClick={() => handleRemoveSection(sectionId)}
                              className="p-1 text-gray-300 hover:text-red-500 rounded hover:bg-red-50 transition-colors"
                              title="Remove section from resume layout"
                            >
                              <MinusCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 2. AVAILABLE SECTIONS (NOT YET ADDED) */}
            {(layoutFilter === "all" || layoutFilter === "unadded") && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                    Available Sections (Not Yet Added - {unaddedSections.length})
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Click + Add to include
                  </span>
                </div>

                {unaddedSections.length === 0 ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      <strong>All 8 sections added!</strong> Every available section is currently active in your resume layout.
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {unaddedSections.map((sec) => {
                      const Icon = sec.icon;
                      const status = getSectionContentStatus(sec.id);

                      return (
                        <div
                          key={sec.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-dashed border-gray-300 bg-gray-50/70 hover:bg-white hover:border-blue-400 transition-all group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-8 h-8 rounded-lg bg-gray-200/80 group-hover:bg-blue-50 text-gray-600 group-hover:text-blue-600 flex items-center justify-center flex-shrink-0 transition-colors">
                              <Icon className="w-4 h-4" />
                            </span>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-xs font-bold text-gray-800">
                                  {sec.label}
                                </p>
                                <span className="text-[9px] bg-gray-200/70 text-gray-600 px-1.5 py-0.2 rounded font-medium">
                                  {sec.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 leading-tight mt-0.5 truncate max-w-[280px]">
                                {sec.desc}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-0.5">
                                Status:{" "}
                                {status.hasContent ? (
                                  <span className="text-emerald-600 font-semibold">
                                    Has {status.countText} ready
                                  </span>
                                ) : (
                                  <span className="text-gray-500">
                                    Starter template provided
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddSection(sec.id)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs flex-shrink-0"
                            title={`Add ${sec.label} to resume`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── MODE 2: DESIGN & BULLETS STUDIO ── */}
        {mainTab === "design" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Template Base Picker */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                Base Template Style
              </label>
              <select
                className="w-full bg-white border border-gray-300 rounded-lg text-xs font-medium px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
              >
                <optgroup label="👑 Premium Pro Templates (Members Only)">
                  {ALL_TEMPLATES.filter((t) => t.isPro).map((tmpl) => (
                    <option key={tmpl.id} value={tmpl.id}>
                      👑 {tmpl.name} (ATS {tmpl.atsScore}%)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Standard ATS Templates">
                  {ALL_TEMPLATES.filter((t) => !t.isPro).map((tmpl) => (
                    <option key={tmpl.id} value={tmpl.id}>
                      {tmpl.name} (ATS {tmpl.atsScore}%)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Page Size & Document Dimensions Studio */}
            <div className="border border-blue-200 rounded-xl p-3.5 bg-blue-50/30 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                    Document & Page Size
                  </label>
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full border border-blue-200">
                  {pageDim.label.split("(")[0].trim()}
                </span>
              </div>

              <p className="text-[11px] text-gray-600 leading-relaxed">
                Choose standard paper sizes or enter custom dimensions. A4 is the recommended default. All content, sections, and styling are 100% preserved.
              </p>

              {/* Quick Preset Selector Buttons */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1.5">
                  Standard Presets
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "a4", label: "A4", sub: "210×297mm", badge: "Default" },
                    { id: "letter", label: "US Letter", sub: "216×279mm" },
                    { id: "legal", label: "US Legal", sub: "216×356mm" },
                    { id: "a3", label: "A3", sub: "297×420mm" },
                    { id: "a5", label: "A5", sub: "148×210mm" },
                    { id: "custom", label: "Custom", sub: "Any Size" },
                  ].map((p) => {
                    const isSelected = (cs.pageSize || "a4") === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          if (p.id === "custom") {
                            updateCustomStyles({
                              pageSize: "custom",
                              customPageWidth: cs.customPageWidth || "210",
                              customPageHeight: cs.customPageHeight || "297",
                            });
                          } else {
                            updateCustomStyles({ pageSize: p.id as PageSizePreset });
                          }
                        }}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-center transition-all ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50/50"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold">{p.label}</span>
                          {p.badge && !isSelected && (
                            <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-1 rounded">
                              ★
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[9px] ${
                            isSelected ? "text-blue-100" : "text-gray-400"
                          }`}
                        >
                          {p.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Preset Dropdown */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Full Page Size List
                </label>
                <select
                  className="w-full bg-white border border-gray-300 rounded-lg text-xs font-medium px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={cs.pageSize || "a4"}
                  onChange={(e) => {
                    const val = e.target.value as PageSizePreset;
                    if (val === "custom") {
                      updateCustomStyles({
                        pageSize: "custom",
                        customPageWidth: cs.customPageWidth || "210",
                        customPageHeight: cs.customPageHeight || "297",
                      });
                    } else {
                      updateCustomStyles({ pageSize: val });
                    }
                  }}
                >
                  {PAGE_SIZE_PRESETS.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.name} — {preset.widthMm} × {preset.heightMm} mm ({preset.description.split("—")[0].trim()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Page Orientation Controls */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1.5">
                  Page Orientation
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "portrait", label: "Portrait (Vertical)", desc: "Standard for resumes" },
                    { id: "landscape", label: "Landscape (Horizontal)", desc: "Wide layout format" },
                  ].map((orient) => {
                    const isSelected = (cs.pageOrientation || "portrait") === orient.id;
                    return (
                      <button
                        key={orient.id}
                        type="button"
                        onClick={() =>
                          updateCustomStyles({
                            pageOrientation: orient.id as PageOrientation,
                          })
                        }
                        className={`flex flex-col items-start p-2 rounded-lg border text-left transition-all ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-xs font-bold">{orient.label}</span>
                        <span
                          className={`text-[10px] ${
                            isSelected ? "text-blue-100" : "text-gray-400"
                          }`}
                        >
                          {orient.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Dimensions Form Inputs (Shown when 'custom' is active) */}
              {cs.pageSize === "custom" && (
                <div className="border border-blue-200 bg-white rounded-xl p-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900">
                      Custom Dimensions (in millimeters)
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      1 in = 25.4 mm
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                        Width (mm)
                      </label>
                      <input
                        type="number"
                        min="50"
                        max="1000"
                        step="1"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                        value={cs.customPageWidth || "210"}
                        onChange={(e) =>
                          updateCustomStyles({ customPageWidth: e.target.value })
                        }
                        placeholder="210"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                        Height (mm)
                      </label>
                      <input
                        type="number"
                        min="50"
                        max="1000"
                        step="1"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                        value={cs.customPageHeight || "297"}
                        onChange={(e) =>
                          updateCustomStyles({ customPageHeight: e.target.value })
                        }
                        placeholder="297"
                      />
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500 flex items-center justify-between pt-1">
                    <span>
                      Active: {pageDim.widthMm} mm × {pageDim.heightMm} mm
                    </span>
                    <span>
                      ({(pageDim.widthMm / 25.4).toFixed(1)}″ × {(pageDim.heightMm / 25.4).toFixed(1)}″)
                    </span>
                  </div>
                </div>
              )}

              {/* Active Dimensions Footer Summary */}
              <div className="bg-white/80 border border-blue-100 rounded-lg p-2 flex items-center justify-between text-[11px]">
                <div className="text-gray-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Active Sheet:</span>
                  <span className="font-semibold text-gray-900">
                    {pageDim.width} × {pageDim.height}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateCustomStyles({
                      pageSize: "a4",
                      pageOrientation: "portrait",
                    })
                  }
                  className="text-blue-600 hover:text-blue-800 text-[10px] font-semibold"
                >
                  Reset to A4
                </button>
              </div>
            </div>

            {/* Custom Bullet Design Studio */}
            <div className="border border-gray-200 rounded-xl p-3.5 bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                  Custom Bullet Point Design
                </label>
                <span className="text-[11px] font-bold text-blue-600">
                  {cs.bulletChar || currentTemplate.style.bulletChar || "•"}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Choose the bullet design for all achievements and work experiences:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {BULLET_STYLES.map((b) => {
                  const isSelected =
                    (cs.bulletChar || currentTemplate.style.bulletChar || "•") === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => updateCustomStyles({ bulletChar: b.id })}
                      className={`flex items-center gap-2.5 p-2 rounded-lg border text-left transition-all ${
                        isSelected
                          ? "bg-blue-50 border-blue-600 text-blue-900 shadow-sm"
                          : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <span className="w-6 h-6 rounded flex items-center justify-center bg-gray-100 font-bold text-sm text-blue-600">
                        {b.preview}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold leading-tight">{b.label}</p>
                        <p className="text-[10px] text-gray-400 truncate">{b.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Margins & Spacing Controls */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                Page Margins
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Compact (12mm)", val: "12mm" },
                  { label: "Normal (18mm)", val: "18mm" },
                  { label: "Spacious (24mm)", val: "24mm" },
                ].map((m) => (
                  <button
                    key={m.val}
                    onClick={() => updateCustomStyles({ margin: m.val })}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition-all ${
                      (cs.margin || "18mm") === m.val
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section Spacing */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700 uppercase">Section Spacing</span>
                <span className="text-gray-500 font-mono">{cs.spacing || "14px"}</span>
              </div>
              <input
                type="range"
                min="6"
                max="28"
                step="2"
                value={parseInt(cs.spacing || "14") || 14}
                onChange={(e) => updateCustomStyles({ spacing: `${e.target.value}px` })}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Line Height Spacing */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Line Spacing (Density)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Compact (1.3)", val: "1.3" },
                  { label: "Standard (1.45)", val: "1.45" },
                  { label: "Relaxed (1.6)", val: "1.6" },
                ].map((lh) => (
                  <button
                    key={lh.val}
                    onClick={() => updateCustomStyles({ lineHeight: lh.val })}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition-all ${
                      (cs.lineHeight || "1.45") === lh.val
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {lh.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography & Font Scaling */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                Typography (Font Family)
              </label>
              <select
                className="w-full bg-white border border-gray-300 rounded-lg text-xs font-medium px-3 py-2 outline-none"
                value={cs.fontFamily || currentTemplate.style.fontFamily}
                onChange={(e) => updateCustomStyles({ fontFamily: e.target.value })}
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-between items-center pt-1">
                <span className="text-xs font-bold text-gray-700 uppercase">Font Size Scale</span>
                <div className="flex items-center gap-1">
                  {[-1, 0, 1, 2].map((scaleVal) => (
                    <button
                      key={scaleVal}
                      onClick={() => updateCustomStyles({ fontSizeScale: scaleVal })}
                      className={`w-7 h-7 rounded-lg text-xs font-bold border transition-colors ${
                        (cs.fontSizeScale || 0) === scaleVal
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {scaleVal > 0 ? `+${scaleVal}` : scaleVal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Font Size Control for Every Section */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-blue-600" />
                    Individual Font Size Control
                  </label>
                  <p className="text-[11px] text-gray-500">
                    Separate font size for each section of your resume.
                  </p>
                </div>
                {cs.sectionFontSizes && Object.keys(cs.sectionFontSizes).length > 0 && (
                  <button
                    onClick={() => updateCustomStyles({ sectionFontSizes: {} })}
                    className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                    title="Reset all section font sizes to template defaults"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset All
                  </button>
                )}
              </div>

              <div className="space-y-2 bg-gray-50/80 p-2.5 rounded-xl border border-gray-200/80 max-h-72 overflow-y-auto">
                {[
                  { key: "name", label: "Name / Heading", icon: User, min: 14, max: 36, step: 1 },
                  { key: "contact", label: "Contact Info", icon: HelpCircle, min: 7, max: 14, step: 0.5 },
                  { key: "sectionHeadings", label: "Section Headings", icon: Type, min: 10, max: 20, step: 0.5 },
                  { key: "summary", label: "Professional Summary", icon: Sparkles, min: 8, max: 14, step: 0.5 },
                  { key: "experience", label: "Work Experience", icon: Briefcase, min: 8, max: 14, step: 0.5 },
                  { key: "skills", label: "Skills", icon: Code, min: 8, max: 14, step: 0.5 },
                  { key: "education", label: "Education", icon: GraduationCap, min: 8, max: 14, step: 0.5 },
                  { key: "projects", label: "Projects", icon: FolderGit2, min: 8, max: 14, step: 0.5 },
                  { key: "certifications", label: "Certifications", icon: Award, min: 8, max: 14, step: 0.5 },
                  { key: "achievements", label: "Achievements & Awards", icon: Award, min: 8, max: 14, step: 0.5 },
                  { key: "languages", label: "Languages", icon: Globe, min: 8, max: 14, step: 0.5 },
                ].map((item) => {
                  const currentVal = getSectionFontSizeVal(item.key as keyof SectionFontSizes);
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      className="bg-white p-2 rounded-lg border border-gray-200 shadow-2xs flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-1.5 min-w-[125px]">
                        <Icon className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        <span className="text-[11px] font-semibold text-gray-700 truncate">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-1 justify-end">
                        <input
                          type="range"
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          value={currentVal}
                          onChange={(e) =>
                            updateSectionFontSize(
                              item.key as keyof SectionFontSizes,
                              parseFloat(e.target.value),
                              true
                            )
                          }
                          className="w-20 sm:w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />

                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateSectionFontSize(
                                item.key as keyof SectionFontSizes,
                                -item.step
                              )
                            }
                            className="w-4 h-4 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[10px] flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="w-11 text-center text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1 py-0.5 rounded border border-blue-100">
                            {currentVal}pt
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateSectionFontSize(
                                item.key as keyof SectionFontSizes,
                                item.step
                              )
                            }
                            className="w-4 h-4 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[10px] flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Line & Row Font Sizes */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Individual Line & Row Font Sizes
                  </label>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Fine-tune font size for every individual line type independently
                  </p>
                </div>
                {data.customStyles?.lineFontSizes && (
                  <button
                    type="button"
                    onClick={() =>
                      updateCustomStyles({
                        lineFontSizes: undefined,
                      })
                    }
                    className="text-[10px] text-gray-500 hover:text-blue-600 font-medium underline"
                  >
                    Reset All Lines
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {[
                  { key: "companyName", label: "Company Names", icon: Building2, min: 8, max: 18, step: 0.5, default: 11 },
                  { key: "jobTitle", label: "Job Titles / Roles", icon: Briefcase, min: 8, max: 18, step: 0.5, default: 10.5 },
                  { key: "dates", label: "Dates & Locations", icon: Calendar, min: 7, max: 14, step: 0.5, default: 9 },
                  { key: "descriptions", label: "Descriptions & Summaries", icon: AlignLeft, min: 7.5, max: 14, step: 0.5, default: 9.5 },
                  { key: "contactDetails", label: "Contact Details Line", icon: HelpCircle, min: 7, max: 14, step: 0.5, default: 8.5 },
                  { key: "degrees", label: "Degree & Major Lines", icon: GraduationCap, min: 8, max: 18, step: 0.5, default: 11 },
                  { key: "institutions", label: "School & Institution Names", icon: Building2, min: 8, max: 16, step: 0.5, default: 10 },
                  { key: "bullets", label: "Bullet Points (Global Row)", icon: List, min: 7.5, max: 14, step: 0.5, default: 9.5 },
                  { key: "skillItems", label: "Individual Skill Items", icon: Code, min: 7.5, max: 14, step: 0.5, default: 9.5 },
                ].map((item) => {
                  const currentVal = getLineFontSizeVal(item.key as keyof LineFontSizes, item.default);
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      className="bg-white p-2 rounded-lg border border-gray-200 shadow-2xs flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-1.5 min-w-[125px]">
                        <Icon className="w-3 h-3 text-indigo-600 flex-shrink-0" />
                        <span className="text-[11px] font-semibold text-gray-700 truncate">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-1 justify-end">
                        <input
                          type="range"
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          value={currentVal}
                          onChange={(e) =>
                            updateLineFontSize(
                              item.key as keyof LineFontSizes,
                              parseFloat(e.target.value),
                              true
                            )
                          }
                          className="w-20 sm:w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />

                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateLineFontSize(
                                item.key as keyof LineFontSizes,
                                -item.step
                              )
                            }
                            className="w-4 h-4 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[10px] flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <select
                            value={currentVal}
                            onChange={(e) =>
                              updateLineFontSize(
                                item.key as keyof LineFontSizes,
                                parseFloat(e.target.value),
                                true
                              )
                            }
                            className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-100 outline-none cursor-pointer"
                          >
                            {FONT_SIZE_STEPPER_OPTIONS.filter((pt) => pt >= item.min && pt <= item.max).map((pt) => (
                              <option key={pt} value={pt}>
                                {pt}pt
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() =>
                              updateLineFontSize(
                                item.key as keyof LineFontSizes,
                                item.step
                              )
                            }
                            className="w-4 h-4 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[10px] flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Header Alignment */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                Header Alignment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["left", "center", "right"] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => updateCustomStyles({ nameAlign: align })}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-semibold capitalize transition-all ${
                      (cs.nameAlign || currentTemplate.style.nameAlign) === align
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color Palette */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                Accent & Heading Color
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => {
                  const isSelected =
                    (cs.accentColor || currentTemplate.style.headingColor) === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() =>
                        updateCustomStyles({
                          accentColor: color.hex,
                          headingColor: color.hex,
                          bulletColor: color.hex,
                        })
                      }
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                        isSelected ? "scale-110 ring-2 ring-blue-500 ring-offset-2" : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider Style */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                Section Dividers
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "1px Solid Line", val: "1px solid" },
                  { label: "2px Accent Bar", val: "2px solid" },
                  { label: "Dashed Line", val: "1px dashed" },
                  { label: "No Divider", val: "none" },
                ].map((div) => (
                  <button
                    key={div.val}
                    onClick={() =>
                      updateCustomStyles({
                        dividerStyle: div.val,
                        showDividers: div.val !== "none",
                      })
                    }
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition-all ${
                      (cs.dividerStyle || "1px solid") === div.val
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {div.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Mode (Single vs Two-Column) */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                Page Layout Architecture
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "1-Column", val: "single-column" },
                  { label: "Left Sidebar", val: "two-column-left-sidebar" },
                  { label: "Right Sidebar", val: "two-column-right-sidebar" },
                ].map((l) => (
                  <button
                    key={l.val}
                    onClick={() =>
                      updateCustomStyles({
                        layoutType: l.val as any,
                      })
                    }
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition-all ${
                      (cs.layoutType || currentTemplate.style.layoutType || "single-column") ===
                      l.val
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Word & Line Highlighting Studio */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                  Word & Line Highlighting Studio
                </label>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                  ATS Safe
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Emphasize key skills, metrics, and achievements using selective background highlighting or high-contrast colored text. Highlights are rendered cleanly without distorting margins or font sizes.
              </p>

              {/* Background Color Swatches */}
              <div>
                <label className="text-[10px] font-bold text-gray-600 uppercase mb-1.5 block">
                  Highlight Background Colors
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {Object.entries(HIGHLIGHT_COLORS).map(([k, c]) => (
                    <div
                      key={k}
                      className="p-1.5 rounded-lg border border-gray-200 text-center shadow-2xs"
                      style={{ backgroundColor: c.bg }}
                    >
                      <span className="block text-[9px] font-bold truncate" style={{ color: c.text }}>
                        {c.label}
                      </span>
                      <span className="block text-[8px] text-gray-500 font-mono">
                        =={k}:text==
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Accent Colors */}
              <div>
                <label className="text-[10px] font-bold text-gray-600 uppercase mb-1.5 block">
                  High-Contrast Accent Colors
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {Object.entries(TEXT_COLORS).map(([k, c]) => (
                    <div
                      key={k}
                      className="p-1.5 rounded-lg border border-gray-200 bg-white flex items-center gap-1.5"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[10px] font-semibold text-gray-700 truncate">
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Demo Box */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">
                  Live Highlighting Demonstration:
                </span>
                <div className="text-xs leading-relaxed text-gray-800 bg-white p-2.5 rounded-lg border border-gray-200">
                  {renderFormattedText(
                    "Built analytics workflow in ==green:Python & SQL==, reducing latency by **35%** and driving <color:blue>+$50K annual savings</color>."
                  )}
                </div>
                <p className="text-[10px] text-gray-500 pt-0.5">
                  💡 Select any word in a bullet point or summary and click <strong>B</strong>, <strong>U</strong>, <strong>🖍️</strong>, or <strong>🎨</strong> to apply selective styling!
                </p>
              </div>

              {/* One-click insert sample highlighted bullet */}
              <button
                type="button"
                onClick={() => {
                  if (!data?.experience || data.experience.length === 0) return;
                  const updatedExp = [...data.experience];
                  updatedExp[0].bullets = [
                    ...(updatedExp[0].bullets || []),
                    "Spearheaded ==yellow:cross-functional project== driving **42% efficiency boost** with <color:blue>SQL & Power BI</color>",
                  ];
                  setData({ ...data, experience: updatedExp });
                  notify("Added sample highlighted bullet point!");
                }}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-lg transition-colors border border-blue-200 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Add Sample Highlighted Bullet Point
              </button>
            </div>
          </div>
        )}

        {/* ── MODE 3: CONTENT TEXT EDITING ── */}
        {mainTab === "content" && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Section Sub-Navigation Tabs */}
            <div className="flex border-b border-gray-200 bg-white px-2 overflow-x-auto text-xs font-semibold flex-shrink-0">
              {[
                { id: "info", label: "Contact", icon: User },
                { id: "summary", label: "Summary", icon: Sparkles },
                { id: "experience", label: "Experience", icon: Briefcase },
                { id: "skills", label: "Skills", icon: Code },
                { id: "education", label: "Education", icon: GraduationCap },
                { id: "projects", label: "Projects", icon: FolderGit2 },
                { id: "certs", label: "Certs", icon: Award },
                { id: "achievements", label: "Awards", icon: Award },
                { id: "languages", label: "Languages", icon: Globe },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setContentSubTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                    contentSubTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Fields */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* 1. Contact / Info */}
              {contentSubTab === "info" && (
                <div className="space-y-3">
                  {/* Quick Font Size Controls for Header */}
                  <div className="p-2.5 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-700" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900">
                        Header Font Sizes
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Name Font Size */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-medium text-gray-500">Name:</span>
                        <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateSectionFontSize("name", -1)}
                            className="px-1.5 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            title="Decrease name font size (-1pt)"
                          >
                            -
                          </button>
                          <span className="px-1.5 text-[11px] font-bold text-gray-800 min-w-[34px] text-center border-x border-gray-200">
                            {getSectionFontSizeVal("name")}pt
                          </span>
                          <button
                            type="button"
                            onClick={() => updateSectionFontSize("name", 1)}
                            className="px-1.5 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            title="Increase name font size (+1pt)"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* Contact Font Size */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-medium text-gray-500">Info:</span>
                        <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateSectionFontSize("contact", -0.5)}
                            className="px-1.5 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            title="Decrease contact font size (-0.5pt)"
                          >
                            -
                          </button>
                          <span className="px-1.5 text-[11px] font-bold text-gray-800 min-w-[34px] text-center border-x border-gray-200">
                            {getSectionFontSizeVal("contact")}pt
                          </span>
                          <button
                            type="button"
                            onClick={() => updateSectionFontSize("contact", 0.5)}
                            className="px-1.5 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            title="Increase contact font size (+0.5pt)"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-700">
                        Full Name
                      </label>
                      <LineFontSizeSelector
                        compact
                        value={data.personalInfo?.nameFontSize}
                        fallback={getSectionFontSizeVal("name")}
                        onChange={(val) =>
                          setData({
                            ...data,
                            personalInfo: {
                              ...data.personalInfo,
                              nameFontSize: val,
                            },
                          })
                        }
                        onReset={() =>
                          setData({
                            ...data,
                            personalInfo: {
                              ...data.personalInfo,
                              nameFontSize: undefined,
                            },
                          })
                        }
                      />
                    </div>
                    <input
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                      value={data.personalInfo?.fullName || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personalInfo: {
                            ...data.personalInfo,
                            fullName: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g. Vinay Kumar"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-700">
                        Professional Title
                      </label>
                      <LineFontSizeSelector
                        compact
                        value={data.personalInfo?.titleFontSize}
                        fallback={getLineFontSizeVal("jobTitle", 10.5)}
                        onChange={(val) =>
                          setData({
                            ...data,
                            personalInfo: {
                              ...data.personalInfo,
                              titleFontSize: val,
                            },
                          })
                        }
                        onReset={() =>
                          setData({
                            ...data,
                            personalInfo: {
                              ...data.personalInfo,
                              titleFontSize: undefined,
                            },
                          })
                        }
                      />
                    </div>
                    <input
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                      value={data.personalInfo?.title || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personalInfo: {
                            ...data.personalInfo,
                            title: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g. Data Analyst"
                    />
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                      Contact Details Line
                    </span>
                    <LineFontSizeSelector
                      compact
                      value={data.personalInfo?.contactFontSize}
                      fallback={getLineFontSizeVal("contactDetails", 8.5)}
                      onChange={(val) =>
                        setData({
                          ...data,
                          personalInfo: {
                            ...data.personalInfo,
                            contactFontSize: val,
                          },
                        })
                      }
                      onReset={() =>
                        setData({
                          ...data,
                          personalInfo: {
                            ...data.personalInfo,
                            contactFontSize: undefined,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                        value={data.personalInfo?.email || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            personalInfo: {
                              ...data.personalInfo,
                              email: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                        value={data.personalInfo?.phone || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            personalInfo: {
                              ...data.personalInfo,
                              phone: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Location (City, State, Country)
                    </label>
                    <input
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                      value={data.personalInfo?.location || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personalInfo: {
                            ...data.personalInfo,
                            location: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                      value={data.personalInfo?.linkedin || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personalInfo: {
                            ...data.personalInfo,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      placeholder="linkedin.com/in/..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      GitHub URL
                    </label>
                    <input
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                      value={data.personalInfo?.github || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personalInfo: {
                            ...data.personalInfo,
                            github: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Portfolio / Website URL
                    </label>
                    <input
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                      value={data.personalInfo?.portfolio || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personalInfo: {
                            ...data.personalInfo,
                            portfolio: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Photo URL (for photo templates)
                    </label>
                    <input
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                      value={data.personalInfo?.photoUrl || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personalInfo: {
                            ...data.personalInfo,
                            photoUrl: e.target.value,
                          },
                        })
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>
              )}

              {/* 2. Professional Summary */}
              {contentSubTab === "summary" && (
                <div className="space-y-3">
                  <SectionPositionAndFontBar
                    sectionId="summary"
                    label="Summary Section"
                    currentOrder={currentOrder}
                    fontSizeKey="summary"
                    fontSizeVal={getSectionFontSizeVal("summary")}
                    onMoveSection={(dir) => moveSectionById("summary", dir)}
                    onUpdateFontSize={(delta) => updateSectionFontSize("summary", delta)}
                  />

                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Professional Summary Text
                    </label>
                    <span className="text-[11px] text-gray-400">
                      {data.summary?.length || 0} characters
                    </span>
                  </div>

                  {/* Formatting Toolbar */}
                  <FormattedEditorToolbar
                    inputRef={summaryInputRef}
                    value={data.summary || ""}
                    onChange={(newVal) => setData({ ...data, summary: newVal })}
                    showLineHighlight={false}
                    lineFontSize={getLineFontSizeVal("descriptions", 9.5)}
                    onLineFontSizeChange={(pt) => updateLineFontSize("descriptions", pt, true)}
                  />

                  <textarea
                    ref={summaryInputRef}
                    className="w-full text-xs p-3 border border-gray-300 rounded-lg h-36 focus:ring-1 focus:ring-blue-500 leading-relaxed text-gray-800"
                    value={data.summary || ""}
                    onChange={(e) => setData({ ...data, summary: e.target.value })}
                    placeholder="Write a clear, ATS-friendly summary highlighting your primary domain expertise and key results..."
                  />

                  {/* Live Rendered Preview */}
                  {data.summary && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs leading-relaxed text-gray-800 shadow-xs">
                      <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Live Formatted Preview:
                      </span>
                      {renderFormattedText(data.summary)}
                    </div>
                  )}
                </div>
              )}

              {/* 3. Work Experience with Company & Entry Positioning */}
              {contentSubTab === "experience" && (
                <div className="space-y-4">
                  <SectionPositionAndFontBar
                    sectionId="experience"
                    label="Work Experience Section"
                    currentOrder={currentOrder}
                    fontSizeKey="experience"
                    fontSizeVal={getSectionFontSizeVal("experience")}
                    onMoveSection={(dir) => moveSectionById("experience", dir)}
                    onUpdateFontSize={(delta) => updateSectionFontSize("experience", delta)}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Work Experiences ({data.experience?.length || 0})
                    </span>
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          experience: [
                            ...(data.experience || []),
                            {
                              title: "New Role",
                              company: "Company Name",
                              date: "2023 – Present",
                              location: "City, Country",
                              bullets: ["Key responsibility or achievement"],
                            },
                          ],
                        })
                      }
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Experience
                    </button>
                  </div>

                  {data.experience?.map((exp, expIdx) => (
                    <div
                      key={exp.id || expIdx}
                      className="p-3.5 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2.5 relative group"
                    >
                      {/* Top Action Bar for Individual Experience Entry */}
                      <div className="flex items-center justify-between pb-2 border-b border-gray-200/80 gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                            Role #{expIdx + 1}
                          </span>
                          <span className="text-xs font-bold text-gray-800 truncate max-w-[140px]">
                            {exp.title || "Untitled Role"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Company 1st vs Title 1st Toggle */}
                          <button
                            type="button"
                            onClick={() => toggleCompanyFirst(expIdx)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 border transition-colors ${
                              exp.companyFirst
                                ? "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                            title="Toggle whether Company Name or Job Title appears first"
                          >
                            <ArrowLeftRight className="w-3 h-3" />
                            {exp.companyFirst ? "Company 1st" : "Title 1st"}
                          </button>

                          {/* Move Entry Up */}
                          <button
                            type="button"
                            disabled={expIdx === 0}
                            onClick={() => moveExperienceItem(expIdx, "up")}
                            className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors border border-transparent hover:border-gray-200"
                            title="Move this job experience up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          {/* Move Entry Down */}
                          <button
                            type="button"
                            disabled={expIdx === (data.experience?.length || 1) - 1}
                            onClick={() => moveExperienceItem(expIdx, "down")}
                            className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors border border-transparent hover:border-gray-200"
                            title="Move this job experience down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Entry */}
                          <button
                            onClick={() => {
                              const updated = data.experience?.filter(
                                (_, idx) => idx !== expIdx
                              );
                              setData({ ...data, experience: updated });
                            }}
                            className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
                            title="Remove Experience"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                              <span>Job Title</span>
                              {!exp.companyFirst && (
                                <span className="text-[9px] text-blue-600 font-semibold">(Primary)</span>
                              )}
                            </label>
                            <LineFontSizeSelector
                              compact
                              value={exp.titleFontSize}
                              fallback={getLineFontSizeVal("jobTitle", 10.5)}
                              onChange={(val) => {
                                const updated = [...(data.experience || [])];
                                updated[expIdx] = { ...updated[expIdx], titleFontSize: val };
                                setData({ ...data, experience: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.experience || [])];
                                updated[expIdx] = { ...updated[expIdx], titleFontSize: undefined };
                                setData({ ...data, experience: updated });
                              }}
                            />
                          </div>
                          <input
                            className="w-full text-xs p-1.5 border border-gray-300 rounded font-bold text-gray-800"
                            value={exp.title || ""}
                            onChange={(e) => {
                              const updated = [...(data.experience || [])];
                              updated[expIdx].title = e.target.value;
                              setData({ ...data, experience: updated });
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                              <span>Company</span>
                              {exp.companyFirst && (
                                <span className="text-[9px] text-indigo-600 font-semibold">(Primary)</span>
                              )}
                            </label>
                            <LineFontSizeSelector
                              compact
                              value={exp.companyFontSize}
                              fallback={getLineFontSizeVal("companyName", 11)}
                              onChange={(val) => {
                                const updated = [...(data.experience || [])];
                                updated[expIdx] = { ...updated[expIdx], companyFontSize: val };
                                setData({ ...data, experience: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.experience || [])];
                                updated[expIdx] = { ...updated[expIdx], companyFontSize: undefined };
                                setData({ ...data, experience: updated });
                              }}
                            />
                          </div>
                          <input
                            className="w-full text-xs p-1.5 border border-gray-300 rounded text-gray-700 font-medium"
                            value={exp.company || ""}
                            onChange={(e) => {
                              const updated = [...(data.experience || [])];
                              updated[expIdx].company = e.target.value;
                              setData({ ...data, experience: updated });
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">
                              Dates
                            </label>
                            <LineFontSizeSelector
                              compact
                              value={exp.dateFontSize}
                              fallback={getLineFontSizeVal("dates", 9)}
                              onChange={(val) => {
                                const updated = [...(data.experience || [])];
                                updated[expIdx] = { ...updated[expIdx], dateFontSize: val };
                                setData({ ...data, experience: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.experience || [])];
                                updated[expIdx] = { ...updated[expIdx], dateFontSize: undefined };
                                setData({ ...data, experience: updated });
                              }}
                            />
                          </div>
                          <input
                            className="w-full text-xs p-1.5 border border-gray-300 rounded text-gray-700"
                            value={exp.date || ""}
                            onChange={(e) => {
                              const updated = [...(data.experience || [])];
                              updated[expIdx].date = e.target.value;
                              setData({ ...data, experience: updated });
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">
                              Location
                            </label>
                            <LineFontSizeSelector
                              compact
                              value={exp.locationFontSize}
                              fallback={getLineFontSizeVal("dates", 9)}
                              onChange={(val) => {
                                const updated = [...(data.experience || [])];
                                updated[expIdx] = { ...updated[expIdx], locationFontSize: val };
                                setData({ ...data, experience: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.experience || [])];
                                updated[expIdx] = { ...updated[expIdx], locationFontSize: undefined };
                                setData({ ...data, experience: updated });
                              }}
                            />
                          </div>
                          <input
                            className="w-full text-xs p-1.5 border border-gray-300 rounded text-gray-700"
                            value={exp.location || ""}
                            onChange={(e) => {
                              const updated = [...(data.experience || [])];
                              updated[expIdx].location = e.target.value;
                              setData({ ...data, experience: updated });
                            }}
                          />
                        </div>
                      </div>

                      {/* Bullet Points with Reorder (Up/Down) & Individual Row Font Size */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">
                            Bullet Points & Achievements
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-gray-400">Role Bullets Size:</span>
                            <LineFontSizeSelector
                              compact
                              value={exp.bulletFontSize}
                              fallback={getLineFontSizeVal("bullets", 9.5)}
                              onChange={(val) => {
                                const updated = [...(data.experience || [])];
                                updated[expIdx] = { ...updated[expIdx], bulletFontSize: val };
                                setData({ ...data, experience: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.experience || [])];
                                updated[expIdx] = { ...updated[expIdx], bulletFontSize: undefined };
                                setData({ ...data, experience: updated });
                              }}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          {exp.bullets?.map((bullet, bIdx) => (
                            <ExperienceBulletItem
                              key={bIdx}
                              bullet={bullet}
                              bulletChar={exp.bulletChar || cs.bulletChar || "•"}
                              canMoveUp={bIdx > 0}
                              canMoveDown={bIdx < (exp.bullets?.length || 1) - 1}
                              fontSize={
                                exp.bulletFontSizes?.[bIdx] ??
                                exp.bulletFontSize ??
                                getLineFontSizeVal("bullets", 9.5)
                              }
                              onFontSizeChange={(size) => {
                                const updatedExp = [...(data.experience || [])];
                                const bulletSizes = [...(exp.bulletFontSizes || [])];
                                while (bulletSizes.length < (exp.bullets?.length || 0)) {
                                  bulletSizes.push(
                                    exp.bulletFontSize ?? getLineFontSizeVal("bullets", 9.5)
                                  );
                                }
                                bulletSizes[bIdx] = size;
                                updatedExp[expIdx] = {
                                  ...updatedExp[expIdx],
                                  bulletFontSizes: bulletSizes,
                                };
                                setData({ ...data, experience: updatedExp });
                              }}
                              onMoveUp={() => moveExperienceBullet(expIdx, bIdx, "up")}
                              onMoveDown={() => moveExperienceBullet(expIdx, bIdx, "down")}
                              onChange={(newVal) => {
                                const updatedExp = [...(data.experience || [])];
                                const newBullets = [...(exp.bullets || [])];
                                newBullets[bIdx] = newVal;
                                updatedExp[expIdx].bullets = newBullets;
                                setData({ ...data, experience: updatedExp });
                              }}
                              onDelete={() => {
                                const updatedExp = [...(data.experience || [])];
                                const newBullets = exp.bullets?.filter((_, idx) => idx !== bIdx);
                                const newBulletSizes = exp.bulletFontSizes?.filter(
                                  (_, idx) => idx !== bIdx
                                );
                                updatedExp[expIdx] = {
                                  ...updatedExp[expIdx],
                                  bullets: newBullets,
                                  bulletFontSizes: newBulletSizes,
                                };
                                setData({ ...data, experience: updatedExp });
                              }}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            const updatedExp = [...(data.experience || [])];
                            const newBullets = [
                              ...(exp.bullets || []),
                              "Demonstrated measurable results and leadership in projects",
                            ];
                            updatedExp[expIdx].bullets = newBullets;
                            setData({ ...data, experience: updatedExp });
                          }}
                          className="mt-2 text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Bullet Point
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 4. Skills */}
              {contentSubTab === "skills" && (
                <div className="space-y-4">
                  <SectionPositionAndFontBar
                    sectionId="skills"
                    label="Skills Section"
                    currentOrder={currentOrder}
                    fontSizeKey="skills"
                    fontSizeVal={getSectionFontSizeVal("skills")}
                    onMoveSection={(dir) => moveSectionById("skills", dir)}
                    onUpdateFontSize={(delta) => updateSectionFontSize("skills", delta)}
                  />

                  {/* Technical Skills */}
                  <div className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-700 uppercase">
                        Technical Skills ({data.skills?.technical?.length || 0})
                      </label>
                      <div className="flex items-center gap-2">
                        <LineFontSizeSelector
                          compact
                          value={data.skills?.technicalFontSize}
                          fallback={getLineFontSizeVal("skillItems", 9.5)}
                          onChange={(val) =>
                            setData({
                              ...data,
                              skills: { ...data.skills, technicalFontSize: val },
                            })
                          }
                          onReset={() =>
                            setData({
                              ...data,
                              skills: { ...data.skills, technicalFontSize: undefined },
                            })
                          }
                        />
                        <span className="text-[10px] text-gray-400">Reorder with ▲ ▼</span>
                      </div>
                    </div>

                    {/* Interactive Pills with Reorder */}
                    {data.skills?.technical && data.skills.technical.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-lg border border-gray-200">
                        {data.skills.technical.map((sk, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200"
                          >
                            <span>{sk}</span>
                            <button
                              type="button"
                              disabled={sIdx === 0}
                              onClick={() => moveSkillItem("technical", sIdx, "up")}
                              className="text-gray-400 hover:text-blue-700 disabled:opacity-25"
                              title="Move skill earlier"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={sIdx === (data.skills?.technical?.length || 1) - 1}
                              onClick={() => moveSkillItem("technical", sIdx, "down")}
                              className="text-gray-400 hover:text-blue-700 disabled:opacity-25"
                              title="Move skill later"
                            >
                              ▼
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const list = (data.skills?.technical || []).filter((_, i) => i !== sIdx);
                                setData({ ...data, skills: { ...data.skills, technical: list } });
                              }}
                              className="text-gray-400 hover:text-red-500 font-bold ml-0.5"
                              title="Remove skill"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <textarea
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg h-16"
                      value={data.skills?.technical?.join(", ") || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          skills: {
                            ...data.skills,
                            technical: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          },
                        })
                      }
                      placeholder="Or edit comma-separated: Python, SQL, Tableau, Power BI..."
                    />
                  </div>

                  {/* Tools & Software */}
                  <div className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-700 uppercase">
                        Tools & Software ({data.skills?.tools?.length || 0})
                      </label>
                      <div className="flex items-center gap-2">
                        <LineFontSizeSelector
                          compact
                          value={data.skills?.toolsFontSize}
                          fallback={getLineFontSizeVal("skillItems", 9.5)}
                          onChange={(val) =>
                            setData({
                              ...data,
                              skills: { ...data.skills, toolsFontSize: val },
                            })
                          }
                          onReset={() =>
                            setData({
                              ...data,
                              skills: { ...data.skills, toolsFontSize: undefined },
                            })
                          }
                        />
                        <span className="text-[10px] text-gray-400">Reorder with ▲ ▼</span>
                      </div>
                    </div>

                    {data.skills?.tools && data.skills.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-lg border border-gray-200">
                        {data.skills.tools.map((sk, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                          >
                            <span>{sk}</span>
                            <button
                              type="button"
                              disabled={sIdx === 0}
                              onClick={() => moveSkillItem("tools", sIdx, "up")}
                              className="text-gray-400 hover:text-emerald-700 disabled:opacity-25"
                              title="Move tool earlier"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={sIdx === (data.skills?.tools?.length || 1) - 1}
                              onClick={() => moveSkillItem("tools", sIdx, "down")}
                              className="text-gray-400 hover:text-emerald-700 disabled:opacity-25"
                              title="Move tool later"
                            >
                              ▼
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const list = (data.skills?.tools || []).filter((_, i) => i !== sIdx);
                                setData({ ...data, skills: { ...data.skills, tools: list } });
                              }}
                              className="text-gray-400 hover:text-red-500 font-bold ml-0.5"
                              title="Remove tool"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <textarea
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg h-16"
                      value={data.skills?.tools?.join(", ") || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          skills: {
                            ...data.skills,
                            tools: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          },
                        })
                      }
                      placeholder="Or edit comma-separated: Git, Docker, JIRA, VS Code, AWS..."
                    />
                  </div>

                  {/* Core Concepts */}
                  <div className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-700 uppercase">
                        Methodologies & Concepts ({data.skills?.concepts?.length || 0})
                      </label>
                      <div className="flex items-center gap-2">
                        <LineFontSizeSelector
                          compact
                          value={data.skills?.conceptsFontSize}
                          fallback={getLineFontSizeVal("skillItems", 9.5)}
                          onChange={(val) =>
                            setData({
                              ...data,
                              skills: { ...data.skills, conceptsFontSize: val },
                            })
                          }
                          onReset={() =>
                            setData({
                              ...data,
                              skills: { ...data.skills, conceptsFontSize: undefined },
                            })
                          }
                        />
                        <span className="text-[10px] text-gray-400">Reorder with ▲ ▼</span>
                      </div>
                    </div>

                    {data.skills?.concepts && data.skills.concepts.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-lg border border-gray-200">
                        {data.skills.concepts.map((sk, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-800 border border-purple-200"
                          >
                            <span>{sk}</span>
                            <button
                              type="button"
                              disabled={sIdx === 0}
                              onClick={() => moveSkillItem("concepts", sIdx, "up")}
                              className="text-gray-400 hover:text-purple-700 disabled:opacity-25"
                              title="Move concept earlier"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={sIdx === (data.skills?.concepts?.length || 1) - 1}
                              onClick={() => moveSkillItem("concepts", sIdx, "down")}
                              className="text-gray-400 hover:text-purple-700 disabled:opacity-25"
                              title="Move concept later"
                            >
                              ▼
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const list = (data.skills?.concepts || []).filter((_, i) => i !== sIdx);
                                setData({ ...data, skills: { ...data.skills, concepts: list } });
                              }}
                              className="text-gray-400 hover:text-red-500 font-bold ml-0.5"
                              title="Remove concept"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <textarea
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg h-16"
                      value={data.skills?.concepts?.join(", ") || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          skills: {
                            ...data.skills,
                            concepts: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          },
                        })
                      }
                      placeholder="Or edit comma-separated: Agile, System Design, CI/CD, ETL..."
                    />
                  </div>
                </div>
              )}

              {/* 5. Education */}
              {contentSubTab === "education" && (
                <div className="space-y-4">
                  <SectionPositionAndFontBar
                    sectionId="education"
                    label="Education Section"
                    currentOrder={currentOrder}
                    fontSizeKey="education"
                    fontSizeVal={getSectionFontSizeVal("education")}
                    onMoveSection={(dir) => moveSectionById("education", dir)}
                    onUpdateFontSize={(delta) => updateSectionFontSize("education", delta)}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase">
                      Education Degrees ({data.education?.length || 0})
                    </span>
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          education: [
                            ...(data.education || []),
                            {
                              degree: "Bachelor of Science",
                              school: "University Name",
                              date: "2018 – 2022",
                              location: "City, Country",
                            },
                          ],
                        })
                      }
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Education
                    </button>
                  </div>

                  {data.education?.map((edu, eduIdx) => (
                    <div
                      key={edu.id || eduIdx}
                      className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2 relative"
                    >
                      {/* Top Action Bar for Education Entry */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                            Degree #{eduIdx + 1}
                          </span>
                          <span className="text-xs font-bold text-gray-700 truncate max-w-[150px]">
                            {edu.degree || "Untitled Degree"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={eduIdx === 0}
                            onClick={() => moveEducationItem(eduIdx, "up")}
                            className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Education Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={eduIdx === (data.education?.length || 1) - 1}
                            onClick={() => moveEducationItem(eduIdx, "down")}
                            className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Education Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              const updated = data.education?.filter(
                                (_, idx) => idx !== eduIdx
                              );
                              setData({ ...data, education: updated });
                            }}
                            className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
                            title="Remove Education"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">
                            Degree
                          </label>
                          <LineFontSizeSelector
                            compact
                            value={edu.degreeFontSize}
                            fallback={getLineFontSizeVal("degrees", 11)}
                            onChange={(val) => {
                              const updated = [...(data.education || [])];
                              updated[eduIdx] = { ...updated[eduIdx], degreeFontSize: val };
                              setData({ ...data, education: updated });
                            }}
                            onReset={() => {
                              const updated = [...(data.education || [])];
                              updated[eduIdx] = { ...updated[eduIdx], degreeFontSize: undefined };
                              setData({ ...data, education: updated });
                            }}
                          />
                        </div>
                        <input
                          className="w-full text-xs p-1.5 border border-gray-300 rounded font-bold"
                          value={edu.degree || ""}
                          onChange={(e) => {
                            const updated = [...(data.education || [])];
                            updated[eduIdx].degree = e.target.value;
                            setData({ ...data, education: updated });
                          }}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">
                            Institution / School
                          </label>
                          <LineFontSizeSelector
                            compact
                            value={edu.schoolFontSize}
                            fallback={getLineFontSizeVal("institutions", 10)}
                            onChange={(val) => {
                              const updated = [...(data.education || [])];
                              updated[eduIdx] = { ...updated[eduIdx], schoolFontSize: val };
                              setData({ ...data, education: updated });
                            }}
                            onReset={() => {
                              const updated = [...(data.education || [])];
                              updated[eduIdx] = { ...updated[eduIdx], schoolFontSize: undefined };
                              setData({ ...data, education: updated });
                            }}
                          />
                        </div>
                        <input
                          className="w-full text-xs p-1.5 border border-gray-300 rounded"
                          value={edu.school || ""}
                          onChange={(e) => {
                            const updated = [...(data.education || [])];
                            updated[eduIdx].school = e.target.value;
                            setData({ ...data, education: updated });
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">
                              Dates
                            </label>
                            <LineFontSizeSelector
                              compact
                              value={edu.dateFontSize}
                              fallback={getLineFontSizeVal("dates", 9)}
                              onChange={(val) => {
                                const updated = [...(data.education || [])];
                                updated[eduIdx] = { ...updated[eduIdx], dateFontSize: val };
                                setData({ ...data, education: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.education || [])];
                                updated[eduIdx] = { ...updated[eduIdx], dateFontSize: undefined };
                                setData({ ...data, education: updated });
                              }}
                            />
                          </div>
                          <input
                            className="w-full text-xs p-1.5 border border-gray-300 rounded"
                            value={edu.date || ""}
                            onChange={(e) => {
                              const updated = [...(data.education || [])];
                              updated[eduIdx].date = e.target.value;
                              setData({ ...data, education: updated });
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">
                              Score / GPA
                            </label>
                            <LineFontSizeSelector
                              compact
                              value={edu.scoreFontSize}
                              fallback={getLineFontSizeVal("dates", 9)}
                              onChange={(val) => {
                                const updated = [...(data.education || [])];
                                updated[eduIdx] = { ...updated[eduIdx], scoreFontSize: val };
                                setData({ ...data, education: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.education || [])];
                                updated[eduIdx] = { ...updated[eduIdx], scoreFontSize: undefined };
                                setData({ ...data, education: updated });
                              }}
                            />
                          </div>
                          <input
                            className="w-full text-xs p-1.5 border border-gray-300 rounded"
                            value={edu.score || ""}
                            onChange={(e) => {
                              const updated = [...(data.education || [])];
                              updated[eduIdx].score = e.target.value;
                              setData({ ...data, education: updated });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 6. Projects */}
              {contentSubTab === "projects" && (
                <div className="space-y-4">
                  <SectionPositionAndFontBar
                    sectionId="projects"
                    label="Projects Section"
                    currentOrder={currentOrder}
                    fontSizeKey="projects"
                    fontSizeVal={getSectionFontSizeVal("projects")}
                    onMoveSection={(dir) => moveSectionById("projects", dir)}
                    onUpdateFontSize={(delta) => updateSectionFontSize("projects", delta)}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase">
                      Projects ({data.projects?.length || 0})
                    </span>
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          projects: [
                            ...(data.projects || []),
                            {
                              name: "Project Name",
                              tech: "Python, SQL",
                              description: "Built end-to-end analytics workflow.",
                            },
                          ],
                        })
                      }
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>

                  {data.projects?.map((proj, projIdx) => (
                    <ProjectItemEditor
                      key={proj.id || projIdx}
                      proj={proj}
                      projIdx={projIdx}
                      canMoveUp={projIdx > 0}
                      canMoveDown={projIdx < (data.projects?.length || 1) - 1}
                      nameFontSize={proj.nameFontSize}
                      techFontSize={proj.techFontSize}
                      descFontSize={proj.descFontSize}
                      onUpdateNameFontSize={(val) => {
                        const updated = [...(data.projects || [])];
                        updated[projIdx] = { ...updated[projIdx], nameFontSize: val };
                        setData({ ...data, projects: updated });
                      }}
                      onUpdateTechFontSize={(val) => {
                        const updated = [...(data.projects || [])];
                        updated[projIdx] = { ...updated[projIdx], techFontSize: val };
                        setData({ ...data, projects: updated });
                      }}
                      onUpdateDescFontSize={(val) => {
                        const updated = [...(data.projects || [])];
                        updated[projIdx] = { ...updated[projIdx], descFontSize: val };
                        setData({ ...data, projects: updated });
                      }}
                      onResetNameFontSize={() => {
                        const updated = [...(data.projects || [])];
                        updated[projIdx] = { ...updated[projIdx], nameFontSize: undefined };
                        setData({ ...data, projects: updated });
                      }}
                      onResetTechFontSize={() => {
                        const updated = [...(data.projects || [])];
                        updated[projIdx] = { ...updated[projIdx], techFontSize: undefined };
                        setData({ ...data, projects: updated });
                      }}
                      onResetDescFontSize={() => {
                        const updated = [...(data.projects || [])];
                        updated[projIdx] = { ...updated[projIdx], descFontSize: undefined };
                        setData({ ...data, projects: updated });
                      }}
                      onMoveUp={() => moveProjectItem(projIdx, "up")}
                      onMoveDown={() => moveProjectItem(projIdx, "down")}
                      onUpdateName={(val) => {
                        const updated = [...(data.projects || [])];
                        updated[projIdx].name = val;
                        setData({ ...data, projects: updated });
                      }}
                      onUpdateTech={(val) => {
                        const updated = [...(data.projects || [])];
                        updated[projIdx].tech = val;
                        setData({ ...data, projects: updated });
                      }}
                      onUpdateDesc={(val) => {
                        const updated = [...(data.projects || [])];
                        updated[projIdx].description = val;
                        setData({ ...data, projects: updated });
                      }}
                      onDelete={() => {
                        const updated = data.projects?.filter(
                          (_, idx) => idx !== projIdx
                        );
                        setData({ ...data, projects: updated });
                      }}
                    />
                  ))}
                </div>
              )}

              {/* 7. Certifications */}
              {contentSubTab === "certs" && (
                <div className="space-y-4">
                  <SectionPositionAndFontBar
                    sectionId="certifications"
                    label="Certifications Section"
                    currentOrder={currentOrder}
                    fontSizeKey="certifications"
                    fontSizeVal={getSectionFontSizeVal("certifications")}
                    onMoveSection={(dir) => moveSectionById("certifications", dir)}
                    onUpdateFontSize={(delta) => updateSectionFontSize("certifications", delta)}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase">
                      Certifications ({data.certifications?.length || 0})
                    </span>
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          certifications: [
                            ...(data.certifications || []),
                            {
                              name: "Certificate Name",
                              issuer: "Issuing Organization",
                              date: "2023",
                            },
                          ],
                        })
                      }
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Certificate
                    </button>
                  </div>

                  {data.certifications?.map((cert, certIdx) => (
                    <div
                      key={cert.id || certIdx}
                      className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2 relative"
                    >
                      {/* Top Action Bar for Certification Entry */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                            Cert #{certIdx + 1}
                          </span>
                          <span className="text-xs font-bold text-gray-700 truncate max-w-[150px]">
                            {cert.name || "Untitled Certificate"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={certIdx === 0}
                            onClick={() => moveCertificationItem(certIdx, "up")}
                            className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Certificate Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={certIdx === (data.certifications?.length || 1) - 1}
                            onClick={() => moveCertificationItem(certIdx, "down")}
                            className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Certificate Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              const updated = data.certifications?.filter(
                                (_, idx) => idx !== certIdx
                              );
                              setData({ ...data, certifications: updated });
                            }}
                            className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
                            title="Remove Certificate"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">
                            Certificate Name
                          </label>
                          <LineFontSizeSelector
                            compact
                            value={cert.nameFontSize}
                            fallback={getLineFontSizeVal("degrees", 10.5)}
                            onChange={(val) => {
                              const updated = [...(data.certifications || [])];
                              updated[certIdx] = { ...updated[certIdx], nameFontSize: val };
                              setData({ ...data, certifications: updated });
                            }}
                            onReset={() => {
                              const updated = [...(data.certifications || [])];
                              updated[certIdx] = { ...updated[certIdx], nameFontSize: undefined };
                              setData({ ...data, certifications: updated });
                            }}
                          />
                        </div>
                        <input
                          className="w-full text-xs p-1.5 border border-gray-300 rounded font-bold"
                          value={cert.name || ""}
                          onChange={(e) => {
                            const updated = [...(data.certifications || [])];
                            updated[certIdx].name = e.target.value;
                            setData({ ...data, certifications: updated });
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">
                              Issuer
                            </label>
                            <LineFontSizeSelector
                              compact
                              value={cert.issuerFontSize}
                              fallback={getLineFontSizeVal("institutions", 9.5)}
                              onChange={(val) => {
                                const updated = [...(data.certifications || [])];
                                updated[certIdx] = { ...updated[certIdx], issuerFontSize: val };
                                setData({ ...data, certifications: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.certifications || [])];
                                updated[certIdx] = { ...updated[certIdx], issuerFontSize: undefined };
                                setData({ ...data, certifications: updated });
                              }}
                            />
                          </div>
                          <input
                            className="w-full text-xs p-1.5 border border-gray-300 rounded"
                            value={cert.issuer || ""}
                            onChange={(e) => {
                              const updated = [...(data.certifications || [])];
                              updated[certIdx].issuer = e.target.value;
                              setData({ ...data, certifications: updated });
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">
                              Date
                            </label>
                            <LineFontSizeSelector
                              compact
                              value={cert.dateFontSize}
                              fallback={getLineFontSizeVal("dates", 9)}
                              onChange={(val) => {
                                const updated = [...(data.certifications || [])];
                                updated[certIdx] = { ...updated[certIdx], dateFontSize: val };
                                setData({ ...data, certifications: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.certifications || [])];
                                updated[certIdx] = { ...updated[certIdx], dateFontSize: undefined };
                                setData({ ...data, certifications: updated });
                              }}
                            />
                          </div>
                          <input
                            className="w-full text-xs p-1.5 border border-gray-300 rounded"
                            value={cert.date || ""}
                            onChange={(e) => {
                              const updated = [...(data.certifications || [])];
                              updated[certIdx].date = e.target.value;
                              setData({ ...data, certifications: updated });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 8. Achievements & Awards */}
              {contentSubTab === "achievements" && (
                <div className="space-y-4">
                  <SectionPositionAndFontBar
                    sectionId="achievements"
                    label="Awards & Achievements Section"
                    currentOrder={currentOrder}
                    fontSizeKey="achievements"
                    fontSizeVal={getSectionFontSizeVal("achievements")}
                    onMoveSection={(dir) => moveSectionById("achievements", dir)}
                    onUpdateFontSize={(delta) => updateSectionFontSize("achievements", delta)}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase">
                      Achievements & Awards ({data.achievements?.length || 0})
                    </span>
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          achievements: [
                            ...(data.achievements || []),
                            {
                              title: "Achievement / Award Title",
                              description: "Describe the distinction or impact",
                            },
                          ],
                        })
                      }
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Achievement
                    </button>
                  </div>

                  {data.achievements?.map((ach, achIdx) => (
                    <div
                      key={ach.id || achIdx}
                      className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2 relative"
                    >
                      {/* Top Action Bar for Achievement Entry */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                            Award #{achIdx + 1}
                          </span>
                          <span className="text-xs font-bold text-gray-700 truncate max-w-[150px]">
                            {ach.title || "Untitled Award"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={achIdx === 0}
                            onClick={() => moveAchievementItem(achIdx, "up")}
                            className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Achievement Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={achIdx === (data.achievements?.length || 1) - 1}
                            onClick={() => moveAchievementItem(achIdx, "down")}
                            className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Achievement Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              const updated = data.achievements?.filter(
                                (_, idx) => idx !== achIdx
                              );
                              setData({ ...data, achievements: updated });
                            }}
                            className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
                            title="Remove Achievement"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">
                            Award / Achievement Title
                          </label>
                          <LineFontSizeSelector
                            compact
                            value={ach.titleFontSize}
                            fallback={getLineFontSizeVal("jobTitle", 10.5)}
                            onChange={(val) => {
                              const updated = [...(data.achievements || [])];
                              updated[achIdx] = { ...updated[achIdx], titleFontSize: val };
                              setData({ ...data, achievements: updated });
                            }}
                            onReset={() => {
                              const updated = [...(data.achievements || [])];
                              updated[achIdx] = { ...updated[achIdx], titleFontSize: undefined };
                              setData({ ...data, achievements: updated });
                            }}
                          />
                        </div>
                        <input
                          className="w-full text-xs p-1.5 border border-gray-300 rounded font-bold"
                          value={ach.title || ""}
                          onChange={(e) => {
                            const updated = [...(data.achievements || [])];
                            updated[achIdx].title = e.target.value;
                            setData({ ...data, achievements: updated });
                          }}
                          placeholder="e.g. Employee of the Year, Hackathon 1st Place"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">
                            Description / Significance
                          </label>
                          <LineFontSizeSelector
                            compact
                            value={ach.descFontSize}
                            fallback={getLineFontSizeVal("descriptions", 9.5)}
                            onChange={(val) => {
                              const updated = [...(data.achievements || [])];
                              updated[achIdx] = { ...updated[achIdx], descFontSize: val };
                              setData({ ...data, achievements: updated });
                            }}
                            onReset={() => {
                              const updated = [...(data.achievements || [])];
                              updated[achIdx] = { ...updated[achIdx], descFontSize: undefined };
                              setData({ ...data, achievements: updated });
                            }}
                          />
                        </div>
                        <input
                          className="w-full text-xs p-1.5 border border-gray-300 rounded"
                          value={ach.description || ""}
                          onChange={(e) => {
                            const updated = [...(data.achievements || [])];
                            updated[achIdx].description = e.target.value;
                            setData({ ...data, achievements: updated });
                          }}
                          placeholder="Details of the recognition or result achieved..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 9. Languages */}
              {contentSubTab === "languages" && (
                <div className="space-y-4">
                  <SectionPositionAndFontBar
                    sectionId="languages"
                    label="Languages Section"
                    currentOrder={currentOrder}
                    fontSizeKey="languages"
                    fontSizeVal={getSectionFontSizeVal("languages")}
                    onMoveSection={(dir) => moveSectionById("languages", dir)}
                    onUpdateFontSize={(delta) => updateSectionFontSize("languages", delta)}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase">
                      Languages ({data.languages?.length || 0})
                    </span>
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          languages: [
                            ...(data.languages || []),
                            {
                              name: "English",
                              proficiency: "Full Professional Proficiency",
                            },
                          ],
                        })
                      }
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Language
                    </button>
                  </div>

                  {data.languages?.map((lang, langIdx) => (
                    <div
                      key={lang.id || langIdx}
                      className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2 relative"
                    >
                      {/* Top Action Bar for Language Entry */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                            Language #{langIdx + 1}
                          </span>
                          <span className="text-xs font-bold text-gray-700 truncate max-w-[150px]">
                            {lang.name || "Language"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={langIdx === 0}
                            onClick={() => moveLanguageItem(langIdx, "up")}
                            className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Language Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={langIdx === (data.languages?.length || 1) - 1}
                            onClick={() => moveLanguageItem(langIdx, "down")}
                            className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Language Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              const updated = data.languages?.filter(
                                (_, idx) => idx !== langIdx
                              );
                              setData({ ...data, languages: updated });
                            }}
                            className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
                            title="Remove Language"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">
                              Language Name
                            </label>
                            <LineFontSizeSelector
                              compact
                              value={lang.nameFontSize}
                              fallback={getLineFontSizeVal("skillItems", 9.5)}
                              onChange={(val) => {
                                const updated = [...(data.languages || [])];
                                updated[langIdx] = { ...updated[langIdx], nameFontSize: val };
                                setData({ ...data, languages: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.languages || [])];
                                updated[langIdx] = { ...updated[langIdx], nameFontSize: undefined };
                                setData({ ...data, languages: updated });
                              }}
                            />
                          </div>
                          <input
                            className="w-full text-xs p-1.5 border border-gray-300 rounded font-bold"
                            value={lang.name || ""}
                            onChange={(e) => {
                              const updated = [...(data.languages || [])];
                              updated[langIdx].name = e.target.value;
                              setData({ ...data, languages: updated });
                            }}
                            placeholder="e.g. English, French, Spanish"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">
                              Proficiency
                            </label>
                            <LineFontSizeSelector
                              compact
                              value={lang.proficiencyFontSize}
                              fallback={getLineFontSizeVal("descriptions", 9)}
                              onChange={(val) => {
                                const updated = [...(data.languages || [])];
                                updated[langIdx] = { ...updated[langIdx], proficiencyFontSize: val };
                                setData({ ...data, languages: updated });
                              }}
                              onReset={() => {
                                const updated = [...(data.languages || [])];
                                updated[langIdx] = { ...updated[langIdx], proficiencyFontSize: undefined };
                                setData({ ...data, languages: updated });
                              }}
                            />
                          </div>
                          <select
                            className="w-full text-xs p-1.5 border border-gray-300 rounded bg-white text-gray-700"
                            value={lang.proficiency || "Full Professional Proficiency"}
                            onChange={(e) => {
                              const updated = [...(data.languages || [])];
                              updated[langIdx].proficiency = e.target.value;
                              setData({ ...data, languages: updated });
                            }}
                          >
                            <option value="Native / Bilingual">Native / Bilingual</option>
                            <option value="Full Professional Proficiency">Full Professional</option>
                            <option value="Professional Working Proficiency">Professional Working</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Elementary">Elementary</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Right Panel: Real-Time Live Preview (Dynamic Dimensions) ── */}
      <div className="flex-1 bg-gray-200/80 overflow-y-auto flex flex-col items-center py-6 px-4">
        {/* Dynamic Page Dimensions Indicator Bar */}
        <div className="mb-3 flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-gray-300 text-xs text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-gray-900">{pageDim.label}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 capitalize">{pageDim.orientation}</span>
          <span className="text-gray-300">|</span>
          <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-100">
            ATS 100% Readable
          </span>
        </div>

        <div
          className="bg-white shadow-2xl relative transition-all duration-300"
          style={{ width: pageDim.width, minHeight: pageDim.height }}
        >
          {/* Dynamic Template Renderer with full customization */}
          <ResumeTemplateRenderer
            ref={componentRef}
            template={currentTemplate}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
