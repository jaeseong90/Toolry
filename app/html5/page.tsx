"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

function encodeHtmlEntities(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtmlEntities(str: string): string {
  if (typeof document !== "undefined") {
    const ta = document.createElement("textarea");
    ta.innerHTML = str;
    return ta.value;
  }
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

const ENTITY_TABLE = [
  { char: "<", entity: "&lt;", desc: "Less than" },
  { char: ">", entity: "&gt;", desc: "Greater than" },
  { char: "&", entity: "&amp;", desc: "Ampersand" },
  { char: '"', entity: "&quot;", desc: "Double quote" },
  { char: "'", entity: "&#39;", desc: "Single quote" },
  { char: "\u00a0", entity: "&nbsp;", desc: "Non-breaking space" },
  { char: "\u00a9", entity: "&copy;", desc: "Copyright" },
  { char: "\u00ae", entity: "&reg;", desc: "Registered" },
  { char: "\u2122", entity: "&trade;", desc: "Trademark" },
  { char: "\u20ac", entity: "&euro;", desc: "Euro" },
  { char: "\u00a3", entity: "&pound;", desc: "Pound" },
  { char: "\u00a5", entity: "&yen;", desc: "Yen" },
  { char: "\u2014", entity: "&mdash;", desc: "Em dash" },
  { char: "\u2013", entity: "&ndash;", desc: "En dash" },
  { char: "\u2026", entity: "&hellip;", desc: "Ellipsis" },
  { char: "\u00ab", entity: "&laquo;", desc: "Left guillemet" },
  { char: "\u00bb", entity: "&raquo;", desc: "Right guillemet" },
  { char: "\u00d7", entity: "&times;", desc: "Multiplication" },
  { char: "\u00f7", entity: "&divide;", desc: "Division" },
  { char: "\u2190", entity: "&larr;", desc: "Left arrow" },
  { char: "\u2192", entity: "&rarr;", desc: "Right arrow" },
  { char: "\u2191", entity: "&uarr;", desc: "Up arrow" },
  { char: "\u2193", entity: "&darr;", desc: "Down arrow" },
  { char: "\u2665", entity: "&hearts;", desc: "Heart" },
];

export default function Html5Page() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const output = useMemo(() => {
    if (!input) return "";
    try {
      return mode === "encode" ? encodeHtmlEntities(input) : decodeHtmlEntities(input);
    } catch {
      return "변환할 수 없는 형식입니다";
    }
  }, [input, mode]);

  return (
    <ToolLayout slug="html5">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-2">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setInput(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m ? "bg-accent text-bg" : "bg-surface text-muted hover:text-heading border border-line"
              }`}
            >
              {m === "encode" ? "인코딩" : "디코딩"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted mb-1 block">
              {mode === "encode" ? "HTML 텍스트" : "HTML 엔티티"}
            </label>
            <textarea
              rows={12}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "encode"
                  ? '<div class="hello">Hello & "World"</div>'
                  : '&lt;div class=&quot;hello&quot;&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'
              }
              className="w-full"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-muted">
                {mode === "encode" ? "HTML 엔티티" : "HTML 텍스트"}
              </label>
              <CopyButton text={output} />
            </div>
            <textarea rows={12} value={output} readOnly className="w-full" />
          </div>
        </div>

        <div className="bg-surface border border-line rounded-lg p-4">
          <h3 className="text-sm font-medium text-heading mb-3">주요 HTML 엔티티 참조표</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-sm font-mono">
            {ENTITY_TABLE.map(({ char, entity, desc }) => (
              <button
                key={entity}
                onClick={() => {
                  if (mode === "encode") {
                    setInput((prev) => prev + char);
                  } else {
                    setInput((prev) => prev + entity);
                  }
                }}
                className="flex items-center gap-2 bg-bg rounded-lg px-3 py-2 text-left hover:border-accent/50 border border-transparent transition-colors cursor-pointer group"
                title={desc}
              >
                <span className="text-accent text-base w-5 text-center">{char === "\u00a0" ? "␣" : char}</span>
                <span className="text-faint">→</span>
                <span className="text-body text-xs group-hover:text-accent transition-colors">{entity}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
