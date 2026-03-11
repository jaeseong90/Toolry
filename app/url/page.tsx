"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function UrlPage() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    if (!input) return "";
    try {
      return mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch {
      return "변환할 수 없는 형식입니다";
    }
  }, [input, mode]);

  return (
    <ToolLayout slug="url">
      <div className="max-w-3xl space-y-4">
        <div className="flex bg-surface border border-line rounded-lg overflow-hidden w-fit">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setInput(""); }}
              className={`px-5 py-2 text-sm font-medium transition-colors ${
                mode === m ? "bg-accent/20 text-accent" : "text-muted hover:text-heading"
              }`}
            >
              {m === "encode" ? "인코더" : "디코더"}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">
            {mode === "encode" ? "인코딩할 텍스트" : "디코딩할 URL"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            placeholder={mode === "encode" ? "URL에 포함할 텍스트를 입력하세요" : "%EC%9D%B8%EC%BD%94%EB%94%A9%EB%90%9C+URL"}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-muted">결과</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly rows={6} placeholder="변환 결과가 여기에 표시됩니다" className="w-full text-accent/90" />
        </div>
      </div>
    </ToolLayout>
  );
}
