import React from "react";

export const HIGHLIGHT_COLORS: Record<string, { label: string; bg: string; text: string; docxName: string }> = {
  yellow: { label: "Soft Yellow", bg: "#fef08a", text: "#854d0e", docxName: "yellow" },
  green: { label: "Mint Green", bg: "#bbf7d0", text: "#166534", docxName: "green" },
  blue: { label: "Sky Blue", bg: "#bfdbfe", text: "#1e40af", docxName: "cyan" },
  purple: { label: "Lavender", bg: "#e9d5ff", text: "#6b21a8", docxName: "magenta" },
  coral: { label: "Soft Rose", bg: "#fecdd3", text: "#9f1239", docxName: "red" },
};

export const TEXT_COLORS: Record<string, { label: string; hex: string }> = {
  blue: { label: "Primary Blue", hex: "#2563eb" },
  navy: { label: "Deep Navy", hex: "#1e3a8a" },
  emerald: { label: "Emerald Green", hex: "#059669" },
  crimson: { label: "Ruby Red", hex: "#dc2626" },
  violet: { label: "Royal Violet", hex: "#7c3aed" },
  charcoal: { label: "Charcoal Black", hex: "#111827" },
};

export const FONT_SIZE_OPTIONS = [
  "7.5pt",
  "8pt",
  "8.5pt",
  "9pt",
  "9.5pt",
  "10pt",
  "10.5pt",
  "11pt",
  "11.5pt",
  "12pt",
  "13pt",
  "14pt",
  "16pt",
  "18pt",
];

/**
 * Strips all formatting markers to retrieve pure plain text (for ATS algorithms).
 */
export function stripFormattingTags(text: string | undefined): string {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/==(?:[a-zA-Z0-9#]+:)?(.*?)==/g, "$1")
    .replace(/<u>(.*?)<\/u>/g, "$1")
    .replace(/<mark>(.*?)<\/mark>/g, "$1")
    .replace(/<color:[^>]+>(.*?)<\/color>/g, "$1")
    .replace(/<hl:[^>]+>(.*?)<\/hl>/g, "$1")
    .replace(/<size:[^>]+>(.*?)<\/size>/g, "$1");
}

/**
 * Renders text containing formatting syntax into React nodes with bold, underline,
 * background highlighting, custom text colors, and individual line/phrase font sizing.
 */
export function renderFormattedText(text: string | undefined): React.ReactNode {
  if (!text) return null;

  // Fast path: if no formatting markers exist, return string directly
  if (
    !text.includes("**") &&
    !text.includes("==") &&
    !text.includes("<u>") &&
    !text.includes("<mark") &&
    !text.includes("<color") &&
    !text.includes("<hl") &&
    !text.includes("<size")
  ) {
    return text;
  }

  // Regex matches:
  // 1. **bold**
  // 2. ==color:text== or ==text==
  // 3. <u>underline</u>
  // 4. <color:hex_or_name>text</color>
  // 5. <hl:color>text</hl> or <mark>text</mark>
  // 6. <size:Xpt>text</size>
  const tokenRegex =
    /(\*\*[^*]+?\*\*|==(?:[a-zA-Z0-9#]+:)?[^=]+?==|<u>[\s\S]*?<\/u>|<color:[^>]+>[\s\S]*?<\/color>|<hl:[^>]+>[\s\S]*?<\/hl>|<mark>[\s\S]*?<\/mark>|<size:[^>]+>[\s\S]*?<\/size>)/g;

  const parts = text.split(tokenRegex);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        // 1. Bold: **text**
        if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
          const content = part.slice(2, -2);
          return (
            <strong key={idx} style={{ fontWeight: 700, color: "inherit" }}>
              {renderFormattedText(content)}
            </strong>
          );
        }

        // 2. Underline: <u>text</u>
        if (part.startsWith("<u>") && part.endsWith("</u>") && part.length >= 7) {
          const content = part.slice(3, -4);
          return (
            <span
              key={idx}
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              {renderFormattedText(content)}
            </span>
          );
        }

        // 3. Highlight: ==text== or ==color:text==
        if (part.startsWith("==") && part.endsWith("==") && part.length >= 4) {
          const inner = part.slice(2, -2);
          let colorKey = "yellow";
          let content = inner;

          if (inner.includes(":")) {
            const colonIndex = inner.indexOf(":");
            colorKey = inner.slice(0, colonIndex).toLowerCase();
            content = inner.slice(colonIndex + 1);
          }

          const highlightInfo = HIGHLIGHT_COLORS[colorKey] || {
            bg: colorKey.startsWith("#") ? colorKey : "#fef08a",
            text: "#000",
          };

          return (
            <mark
              key={idx}
              style={{
                backgroundColor: highlightInfo.bg,
                color: "inherit",
                padding: "1px 4px",
                borderRadius: "3px",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
              }}
            >
              {renderFormattedText(content)}
            </mark>
          );
        }

        // 4. Custom Text Color: <color:val>text</color>
        if (part.startsWith("<color:") && part.endsWith("</color>")) {
          const closingTagIndex = part.indexOf(">");
          const colorVal = part.slice(7, closingTagIndex);
          const content = part.slice(closingTagIndex + 1, -8);
          const resolvedColor = TEXT_COLORS[colorVal]?.hex || colorVal;

          return (
            <span
              key={idx}
              style={{
                color: resolvedColor,
                fontWeight: 600,
              }}
            >
              {renderFormattedText(content)}
            </span>
          );
        }

        // 5. Individual Line/Phrase Font Size: <size:11pt>text</size>
        if (part.startsWith("<size:") && part.endsWith("</size>")) {
          const closingTagIndex = part.indexOf(">");
          const sizeParam = part.slice(6, closingTagIndex).trim();
          const content = part.slice(closingTagIndex + 1, -7);
          const ptNumber = parseFloat(sizeParam.replace("pt", ""));

          return (
            <span
              key={idx}
              style={{
                fontSize: !isNaN(ptNumber) ? `${ptNumber}pt` : undefined,
                lineHeight: 1.35,
                display: "inline",
              }}
            >
              {renderFormattedText(content)}
            </span>
          );
        }

        // 6. HTML Mark / HL
        if (part.startsWith("<mark>") && part.endsWith("</mark>")) {
          const content = part.slice(6, -7);
          return (
            <mark
              key={idx}
              style={{
                backgroundColor: "#fef08a",
                color: "inherit",
                padding: "1px 4px",
                borderRadius: "3px",
              }}
            >
              {renderFormattedText(content)}
            </mark>
          );
        }

        return part;
      })}
    </>
  );
}

/**
 * Utility to wrap or toggle formatting around the currently selected text in an input or textarea.
 */
export function applyTextFormatting(
  originalText: string,
  selectionStart: number,
  selectionEnd: number,
  formatType: "bold" | "underline" | "highlight" | "color" | "size",
  param: string = "yellow"
): { newText: string; newCursorStart: number; newCursorEnd: number } {
  const start = Math.min(selectionStart, selectionEnd);
  const end = Math.max(selectionStart, selectionEnd);

  const before = originalText.substring(0, start);
  const selected = originalText.substring(start, end);
  const after = originalText.substring(end);

  const textToWrap = selected || (originalText.trim() ? originalText : "text");

  let wrapped = textToWrap;
  switch (formatType) {
    case "bold":
      wrapped = `**${textToWrap}**`;
      break;
    case "underline":
      wrapped = `<u>${textToWrap}</u>`;
      break;
    case "highlight":
      wrapped = `==${param}:${textToWrap}==`;
      break;
    case "color":
      wrapped = `<color:${param}>${textToWrap}</color>`;
      break;
    case "size":
      wrapped = `<size:${param.includes("pt") ? param : `${param}pt`}>${textToWrap}</size>`;
      break;
  }

  // If start === end and we wrapped the whole text, replace entire text
  if (start === end && originalText.trim()) {
    return {
      newText: wrapped,
      newCursorStart: 0,
      newCursorEnd: wrapped.length,
    };
  }

  const newText = before + wrapped + after;
  const newCursorStart = start;
  const newCursorEnd = start + wrapped.length;

  return { newText, newCursorStart, newCursorEnd };
}
