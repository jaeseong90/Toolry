"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const output = (() => {
    if (!input) return "";
    try {
      setError("");
      if (mode === "encode") {
        return btoa(unescape(encodeURIComponent(input)));
      } else {
        return decodeURIComponent(escape(atob(input)));
      }
    } catch {
      setError(mode === "encode" ? "인코딩할 수 없는 입력입니다." : "유효하지 않은 Base64 문자열입니다.");
      return "";
    }
  })();

  return (
    <ToolLayout slug="base64">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-2">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setInput(""); setError(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m ? "bg-accent text-bg" : "bg-surface text-muted hover:text-heading border border-line"
              }`}
            >
              {m === "encode" ? "Encode" : "Decode"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-muted">
                {mode === "encode" ? "텍스트" : "Base64"}
              </label>
            </div>
            <textarea
              rows={10}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "인코딩할 텍스트를 입력하세요..." : "디코딩할 Base64 문자열을 입력하세요..."}
              className="w-full"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-muted">
                {mode === "encode" ? "Base64" : "텍스트"}
              </label>
              <CopyButton text={output} />
            </div>
            <textarea rows={10} value={output} readOnly className="w-full" />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </ToolLayout>
  );
}
