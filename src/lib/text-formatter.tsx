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
 * Auto-repairs unclosed or malformed formatting tags, strips orphaned closing tags,
 * and normalizes runaway asterisks so that markup never bleeds as raw code into preview or print.
 */
export function repairFormattingTags(text: string | undefined): string {
  if (!text) return "";
  // Normalize runs of 3+ asterisks to 2
  let s = text.replace(/\*{3,}/g, "**");

  const tagRegex = /(\*\*|==(?:[a-zA-Z0-9#]+:)?|==|<\/?[a-zA-Z0-9#:]+>)/g;
  let result = "";
  let lastIndex = 0;
  const stack: Array<{ type: string; close: string; open: string }> = [];

  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(s)) !== null) {
    const rawTag = match[0];
    const tagIndex = match.index;
    result += s.substring(lastIndex, tagIndex);
    lastIndex = tagRegex.lastIndex;

    const remaining = s.substring(lastIndex);
    const hasRemainingContent =
      remaining.replace(/(?:==|<\/[a-zA-Z0-9#:]+>|\s)+$/g, "").trim().length > 0;

    if (rawTag === "**") {
      const boldIdx = stack.findIndex((t) => t.type === "bold");
      if (boldIdx !== -1) {
        while (stack.length > boldIdx) {
          result += stack.pop()!.close;
        }
      } else if (hasRemainingContent) {
        stack.push({ type: "bold", close: "**", open: "**" });
        result += "**";
      }
      // If no matching opening bold and no remaining content, drop orphaned closing **
    } else if (rawTag.startsWith("==") && rawTag !== "==") {
      stack.push({ type: "hl", close: "==", open: rawTag });
      result += rawTag;
    } else if (rawTag === "==") {
      const hlIdx = stack.findIndex((t) => t.type === "hl");
      if (hlIdx !== -1) {
        while (stack.length > hlIdx) {
          result += stack.pop()!.close;
        }
      } else if (hasRemainingContent && remaining.includes("==")) {
        stack.push({ type: "hl", close: "==", open: "==" });
        result += "==";
      }
      // Else drop orphaned closing ==
    } else if (rawTag === "<u>") {
      stack.push({ type: "u", close: "</u>", open: "<u>" });
      result += "<u>";
    } else if (rawTag === "</u>") {
      const uIdx = stack.findIndex((t) => t.type === "u");
      if (uIdx !== -1) {
        while (stack.length > uIdx) {
          result += stack.pop()!.close;
        }
      }
      // Else drop orphaned </u>
    } else if (rawTag.startsWith("<color:")) {
      stack.push({ type: "color", close: "</color>", open: rawTag });
      result += rawTag;
    } else if (rawTag === "</color>") {
      const cIdx = stack.findIndex((t) => t.type === "color");
      if (cIdx !== -1) {
        while (stack.length > cIdx) {
          result += stack.pop()!.close;
        }
      }
    } else if (rawTag.startsWith("<size:")) {
      stack.push({ type: "size", close: "</size>", open: rawTag });
      result += rawTag;
    } else if (rawTag === "</size>") {
      const sIdx = stack.findIndex((t) => t.type === "size");
      if (sIdx !== -1) {
        while (stack.length > sIdx) {
          result += stack.pop()!.close;
        }
      }
    } else if (rawTag === "<mark>") {
      stack.push({ type: "mark", close: "</mark>", open: "<mark>" });
      result += "<mark>";
    } else if (rawTag === "</mark>") {
      const mIdx = stack.findIndex((t) => t.type === "mark");
      if (mIdx !== -1) {
        while (stack.length > mIdx) {
          result += stack.pop()!.close;
        }
      }
    } else {
      result += rawTag;
    }
  }

  result += s.substring(lastIndex);

  // Auto-close any unclosed tags in reverse order
  while (stack.length > 0) {
    result += stack.pop()!.close;
  }

  return result;
}

/**
 * Splits a comma/newline separated skills string into individual items
 * without breaking formatting tags or leaving dangling tags.
 * If multiple skills were highlighted or formatted together, active formatting
 * is cleanly distributed to each item so all pills render formatted.
 */
export function splitSkillsList(text: string | undefined): string[] {
  if (!text) return [];

  // Fast path if no comma or newline
  if (!text.includes(",") && !text.includes("\n")) {
    const repaired = repairFormattingTags(text.trim());
    return repaired ? [repaired] : [];
  }

  const items: string[] = [];
  let current = "";
  const activeTags: Array<{ open: string; close: string }> = [];

  const tagRegex = /(\*\*|==(?:[a-zA-Z0-9#]+:)?|==|<\/?[a-zA-Z0-9#:]+>)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(text)) !== null) {
    const before = text.substring(lastIndex, match.index);
    lastIndex = tagRegex.lastIndex;

    for (let i = 0; i < before.length; i++) {
      const char = before[i];
      if (char === "," || char === "\n") {
        if (current.trim()) {
          let item = current;
          for (let j = activeTags.length - 1; j >= 0; j--) {
            item += activeTags[j].close;
          }
          const repaired = repairFormattingTags(item.trim());
          if (repaired) items.push(repaired);
        }
        current = "";
        for (let j = 0; j < activeTags.length; j++) {
          current += activeTags[j].open;
        }
      } else {
        current += char;
      }
    }

    const rawTag = match[0];
    current += rawTag;

    if (rawTag === "**") {
      const bIdx = activeTags.findIndex((t) => t.open === "**");
      if (bIdx !== -1) activeTags.splice(bIdx, 1);
      else activeTags.push({ open: "**", close: "**" });
    } else if (rawTag.startsWith("==") && rawTag !== "==") {
      activeTags.push({ open: rawTag, close: "==" });
    } else if (rawTag === "==") {
      const hIdx = activeTags.findIndex((t) => t.close === "==");
      if (hIdx !== -1) activeTags.splice(hIdx, 1);
      else activeTags.push({ open: "==", close: "==" });
    } else if (rawTag.startsWith("</")) {
      const closeName = rawTag.slice(2, -1);
      const idx = activeTags.findIndex((t) => t.close.startsWith("</" + closeName));
      if (idx !== -1) activeTags.splice(idx, 1);
    } else if (rawTag.startsWith("<")) {
      if (rawTag === "<u>") activeTags.push({ open: "<u>", close: "</u>" });
      else if (rawTag.startsWith("<color:")) activeTags.push({ open: rawTag, close: "</color>" });
      else if (rawTag.startsWith("<size:")) activeTags.push({ open: rawTag, close: "</size>" });
      else if (rawTag === "<mark>") activeTags.push({ open: "<mark>", close: "</mark>" });
    }
  }

  const remainder = text.substring(lastIndex);
  for (let i = 0; i < remainder.length; i++) {
    const char = remainder[i];
    if (char === "," || char === "\n") {
      if (current.trim()) {
        let item = current;
        for (let j = activeTags.length - 1; j >= 0; j--) {
          item += activeTags[j].close;
        }
        const repaired = repairFormattingTags(item.trim());
        if (repaired) items.push(repaired);
      }
      current = "";
      for (let j = 0; j < activeTags.length; j++) {
        current += activeTags[j].open;
      }
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    let item = current;
    for (let j = activeTags.length - 1; j >= 0; j--) {
      item += activeTags[j].close;
    }
    const repaired = repairFormattingTags(item.trim());
    if (repaired) items.push(repaired);
  }

  return items;
}

/**
 * Renders text containing formatting syntax into React nodes with bold, underline,
 * background highlighting, custom text colors, and individual line/phrase font sizing.
 */
export function renderFormattedText(text: string | undefined): React.ReactNode {
  if (!text) return null;

  // First repair any unclosed or malformed tags so raw markup never leaks
  const cleanText = repairFormattingTags(text);

  // Fast path: if no formatting markers exist, return string directly
  if (
    !cleanText.includes("**") &&
    !cleanText.includes("==") &&
    !cleanText.includes("<u>") &&
    !cleanText.includes("<mark") &&
    !cleanText.includes("<color") &&
    !cleanText.includes("<hl") &&
    !cleanText.includes("<size")
  ) {
    return cleanText;
  }

  // Regex matches:
  // 1. **bold** (or ****bold****)
  // 2. ==color:text== or ==text==
  // 3. <u>underline</u>
  // 4. <color:hex_or_name>text</color>
  // 5. <hl:color>text</hl> or <mark>text</mark>
  // 6. <size:Xpt>text</size>
  const tokenRegex =
    /(\*{2,}[\s\S]+?\*{2,}|==(?:[a-zA-Z0-9#]+:)?[^=]+?==|<u>[\s\S]*?<\/u>|<color:[^>]+>[\s\S]*?<\/color>|<hl:[^>]+>[\s\S]*?<\/hl>|<mark>[\s\S]*?<\/mark>|<size:[^>]+>[\s\S]*?<\/size>)/g;

  const parts = cleanText.split(tokenRegex);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        // 1. Bold: **text**
        if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
          const content = part.replace(/^\*+|\*+$/g, "");
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
      if (textToWrap.startsWith("**") && textToWrap.endsWith("**") && textToWrap.length >= 4) {
        wrapped = textToWrap.replace(/^\*+|\*+$/g, "");
      } else {
        wrapped = `**${textToWrap.replace(/^\*+|\*+$/g, "")}**`;
      }
      break;
    case "underline":
      if (textToWrap.startsWith("<u>") && textToWrap.endsWith("</u>") && textToWrap.length >= 7) {
        wrapped = textToWrap.slice(3, -4);
      } else {
        wrapped = `<u>${textToWrap}</u>`;
      }
      break;
    case "highlight":
      if (textToWrap.startsWith("==") && textToWrap.endsWith("==") && textToWrap.length >= 4) {
        wrapped = textToWrap.slice(2, -2).replace(/^[a-zA-Z0-9#]+:/, "");
      } else {
        wrapped = `==${param}:${textToWrap}==`;
      }
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
