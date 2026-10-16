"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Bold,
  Underline,
  Type,
  Highlighter,
  Paintbrush,
  Eraser,
} from "lucide-react";
import {
  HIGHLIGHT_COLORS,
  TEXT_COLORS,
  FONT_SIZE_OPTIONS,
  markupToHtml,
  domToMarkup,
  repairFormattingTags,
  stripFormattingTags,
} from "@/lib/text-formatter";

interface RichEditorToolbarProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  onCommit: () => void;
  lineFontSize?: number;
  onLineFontSizeChange?: (size: number) => void;
  showFontSize?: boolean;
}

export function VisualFormattingToolbar({
  editorRef,
  onCommit,
  lineFontSize,
  onLineFontSizeChange,
  showFontSize = true,
}: RichEditorToolbarProps) {
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const [showHlMenu, setShowHlMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  const applyCommand = (command: string, value: string | undefined = undefined) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    document.execCommand(command, false, value);
    onCommit();
  };

  const applyCustomStyle = (styleType: "size" | "color" | "highlight", value: string) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      // If no text selected, don't wrap empty node
      return;
    }

    const range = selection.getRangeAt(0);

    if (styleType === "size") {
      const span = document.createElement("span");
      const pt = value.includes("pt") ? value : `${value}pt`;
      span.style.fontSize = pt;
      span.appendChild(range.extractContents());
      range.insertNode(span);
    } else if (styleType === "color") {
      const span = document.createElement("span");
      const hex = TEXT_COLORS[value]?.hex || (value.startsWith("#") ? value : "#2563eb");
      span.style.color = hex;
      span.style.fontWeight = "600";
      span.appendChild(range.extractContents());
      range.insertNode(span);
    } else if (styleType === "highlight") {
      const mark = document.createElement("mark");
      const bg = HIGHLIGHT_COLORS[value]?.bg || (value.startsWith("#") ? value : "#fef08a");
      mark.style.backgroundColor = bg;
      mark.style.color = "inherit";
      mark.style.padding = "1px 3px";
      mark.style.borderRadius = "2px";
      mark.appendChild(range.extractContents());
      range.insertNode(mark);
    }

    selection.removeAllRanges();
    onCommit();
  };

  const handleClear = () => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    document.execCommand("removeFormat", false);
    onCommit();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs">
      <span className="text-[10px] text-gray-400 font-semibold mr-0.5">FORMAT:</span>

      {/* Bold */}
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          applyCommand("bold");
        }}
        className="p-1 rounded hover:bg-gray-200 text-gray-800 font-bold transition-colors"
        title="Bold selected text"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>

      {/* Underline */}
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          applyCommand("underline");
        }}
        className="p-1 rounded hover:bg-gray-200 text-gray-800 transition-colors"
        title="Underline selected text"
      >
        <Underline className="w-3.5 h-3.5" />
      </button>

      {/* Font Size dropdown for selected text */}
      {showFontSize && (
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
            title="Change font size of selected text"
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
                    applyCustomStyle("size", sizeOpt);
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
      )}

      {/* Quick A- and A+ buttons */}
      {showFontSize && (
        <>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              applyCustomStyle("size", "9pt");
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
              applyCustomStyle("size", "11pt");
            }}
            className="px-1 py-0.5 rounded hover:bg-gray-200 text-gray-700 text-[10px] font-bold"
            title="Set larger font (11pt) on selection"
          >
            A+
          </button>
        </>
      )}

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
                  applyCustomStyle("highlight", k);
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
                  applyCustomStyle("color", k);
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

      {/* Row font size stepper */}
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

      {/* Eraser */}
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          handleClear();
        }}
        className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-red-500 ml-auto transition-colors"
        title="Clear formatting from selection"
      >
        <Eraser className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function VisualRichTextarea({
  value,
  onChange,
  placeholder,
  className = "",
  minHeight = "120px",
  lineFontSize,
  onLineFontSizeChange,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  lineFontSize?: number;
  onLineFontSizeChange?: (val: number) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isComposingRef = useRef(false);

  // Sync prop value into DOM innerHTML only when external value changed significantly
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const currentMarkup = domToMarkup(el);
    if (currentMarkup !== value) {
      el.innerHTML = markupToHtml(value);
    }
  }, [value]);

  const handleInput = useCallback(() => {
    const el = editorRef.current;
    if (!el || isComposingRef.current) return;
    const markup = domToMarkup(el);
    onChange(markup);
  }, [onChange]);

  return (
    <div className="space-y-1">
      <VisualFormattingToolbar
        editorRef={editorRef}
        onCommit={handleInput}
        lineFontSize={lineFontSize}
        onLineFontSizeChange={onLineFontSizeChange}
      />
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onCompositionStart={() => {
          isComposingRef.current = true;
        }}
        onCompositionEnd={() => {
          isComposingRef.current = false;
          handleInput();
        }}
        style={{ minHeight }}
        className={`w-full text-xs p-3 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed text-gray-800 overflow-y-auto whitespace-pre-wrap ${className}`}
        data-placeholder={placeholder}
      />
    </div>
  );
}

export function VisualRichInput({
  value,
  onChange,
  placeholder,
  className = "",
  inputRef: externalRef,
  onKeyDown,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  inputRef?: React.RefObject<HTMLDivElement | null>;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const inputRef = externalRef || localRef;
  const isComposingRef = useRef(false);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const currentMarkup = domToMarkup(el);
    if (currentMarkup !== value) {
      el.innerHTML = markupToHtml(value);
    }
  }, [value, inputRef]);

  const handleInput = useCallback(() => {
    const el = inputRef.current;
    if (!el || isComposingRef.current) return;
    const markup = domToMarkup(el);
    onChange(markup);
  }, [onChange, inputRef]);

  return (
    <div
      ref={inputRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
        if (onKeyDown) onKeyDown(e);
      }}
      onCompositionStart={() => {
        isComposingRef.current = true;
      }}
      onCompositionEnd={() => {
        isComposingRef.current = false;
        handleInput();
      }}
      className={`text-xs p-1.5 border border-gray-200 rounded text-gray-800 focus:ring-1 focus:ring-blue-500 bg-white focus:outline-none whitespace-pre-wrap break-words ${className}`}
      data-placeholder={placeholder}
    />
  );
}

