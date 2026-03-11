"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function JsonPage() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");

  const result = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };
    try {
      const parsed = JSON.parse(input);
      const output = mode === "beautify"
        ? JSON.stringify(parsed, null, indent)
        : JSON.stringify(parsed);
      return { output, error: null };
    } catch (e) {
      const msg = (e as Error).message;
      // Try to extract position info
      const posMatch = msg.match(/position (\d+)/);
      let line: number | null = null;
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        line = input.slice(0, pos).split("\n").length;
      }
      return {
        output: "",
        error: line ? `${msg} (${line}번째 줄 근처)` : msg,
      };
    }
  }, [input, indent, mode]);

  return (
    <ToolLayout slug="json">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex bg-surface border border-gray-700 rounded-lg overflow-hidden">
          {(["beautify", "minify"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                mode === m ? "bg-accent/20 text-accent" : "text-gray-400 hover:text-white"
              }`}
            >
              {m === "beautify" ? "Beautify" : "Minify"}
            </button>
          ))}
        </div>
        {mode === "beautify" && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>들여쓰기:</span>
            {[2, 4].map((n) => (
              <button
                key={n}
                onClick={() => setIndent(n)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  indent === n ? "bg-accent/20 text-accent" : "bg-surface border border-gray-700 text-gray-400 hover:text-white"
                }`}
              >
                {n}칸
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">입력 JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={20}
            placeholder='{"key": "value"}'
            className={`w-full ${result.error ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : ""}`}
          />
          {result.error && (
            <p className="mt-1 text-xs text-red-400">{result.error}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-gray-400">결과</label>
            <CopyButton text={result.output} />
          </div>
          <textarea
            value={result.output}
            readOnly
            rows={20}
            placeholder="변환 결과가 여기에 표시됩니다"
            className="w-full text-accent/90"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
