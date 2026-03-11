"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function RegexPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [testString, setTestString] = useState("");

  const flagString = Object.entries(flags)
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join("");

  const result = useMemo(() => {
    if (!pattern) return { matches: [], error: null, highlighted: testString };
    try {
      const regex = new RegExp(pattern, flagString);
      const matches: { match: string; index: number; groups: string[] }[] = [];

      if (flags.g) {
        let m: RegExpExecArray | null;
        const r = new RegExp(pattern, flagString);
        while ((m = r.exec(testString)) !== null) {
          matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
          if (m[0].length === 0) r.lastIndex++;
        }
      } else {
        const m = regex.exec(testString);
        if (m) matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }

      let highlighted = "";
      let lastIndex = 0;
      for (const m of matches) {
        highlighted += escapeHtml(testString.slice(lastIndex, m.index));
        highlighted += `<mark class="bg-accent/30 text-accent rounded px-0.5">${escapeHtml(m.match)}</mark>`;
        lastIndex = m.index + m.match.length;
      }
      highlighted += escapeHtml(testString.slice(lastIndex));

      return { matches, error: null, highlighted };
    } catch (e) {
      return { matches: [], error: (e as Error).message, highlighted: escapeHtml(testString) };
    }
  }, [pattern, flagString, testString, flags.g]);

  return (
    <ToolLayout slug="regex">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">정규표현식</label>
            <div className={`flex items-center gap-2 bg-surface border rounded-lg px-3 py-2 ${result.error ? "border-red-500" : "border-line focus-within:border-accent"}`}>
              <span className="text-faint font-mono">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="패턴을 입력하세요"
                className="flex-1 bg-transparent border-none p-0 font-mono text-sm text-heading focus:outline-none focus:ring-0"
              />
              <span className="text-faint font-mono">/{flagString}</span>
            </div>
            {result.error && <p className="mt-1 text-xs text-red-400">{result.error}</p>}
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">플래그</label>
            <div className="flex gap-2">
              {(["g", "i", "m", "s"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFlags((prev) => ({ ...prev, [f]: !prev[f] }))}
                  className={`w-9 h-9 rounded-md font-mono text-sm font-medium transition-colors ${
                    flags[f] ? "bg-accent/20 text-accent border border-accent/50" : "bg-surface border border-line text-faint hover:text-body"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {result.matches.length > 0 && (
            <div>
              <label className="block text-sm text-muted mb-1">매칭 결과 ({result.matches.length}건)</label>
              <div className="bg-surface border border-line rounded-lg p-3 max-h-60 overflow-y-auto space-y-2">
                {result.matches.map((m, i) => (
                  <div key={i} className="text-sm font-mono">
                    <span className="text-faint">#{i + 1}</span>{" "}
                    <span className="text-accent">&quot;{m.match}&quot;</span>
                    <span className="text-faint ml-2">index: {m.index}</span>
                    {m.groups.length > 0 && (
                      <div className="ml-4 text-muted">
                        그룹: {m.groups.map((g, gi) => (
                          <span key={gi} className="text-yellow-500 dark:text-yellow-300 mr-2">${gi + 1}=&quot;{g}&quot;</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">테스트 문자열</label>
            <textarea value={testString} onChange={(e) => setTestString(e.target.value)} rows={8} placeholder="테스트할 문자열을 입력하세요" className="w-full" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-muted">매칭 하이라이트</label>
              <CopyButton text={testString} label="복사" />
            </div>
            <div
              className="bg-surface border border-line rounded-lg p-3 min-h-[120px] font-mono text-sm whitespace-pre-wrap break-all"
              dangerouslySetInnerHTML={{ __html: result.highlighted || '<span class="text-dim">결과가 여기에 표시됩니다</span>' }}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
