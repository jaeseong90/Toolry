"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";
import { searchDictionary, dictionary, type DictEntry } from "@/lib/column-dict";

function toCamel(s: string) { return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase()); }
function toPascal(s: string) { const c = toCamel(s); return c.charAt(0).toUpperCase() + c.slice(1); }
function toKebab(s: string) { return s.replace(/_/g, "-"); }

interface Suggestion {
  entry: DictEntry;
  formats: { label: string; value: string }[];
}

function buildSuggestions(entries: DictEntry[]): Suggestion[] {
  return entries.map((entry) => ({
    entry,
    formats: [
      { label: "snake_case", value: entry.en },
      { label: "camelCase", value: toCamel(entry.en) },
      { label: "PascalCase", value: toPascal(entry.en) },
      { label: "kebab-case", value: toKebab(entry.en) },
    ],
  }));
}

function combineSearch(query: string): Suggestion[] {
  const words = query.trim().split(/\s+/);
  if (words.length < 2) return [];
  const parts: string[] = [];
  let allFound = true;
  for (const word of words) {
    const results = searchDictionary(word);
    if (results.length === 0) { allFound = false; break; }
    parts.push(results[0].en);
  }
  if (!allFound || parts.length === 0) return [];
  const combined = parts.join("_");
  const combinedEntry: DictEntry = { ko: [query], en: combined, category: "조합" };
  return buildSuggestions([combinedEntry]);
}

export default function ColumnPage() {
  const [input, setInput] = useState("");
  const [showDict, setShowDict] = useState(false);

  const results = useMemo(() => {
    if (!input.trim()) return [];
    const single = buildSuggestions(searchDictionary(input.trim()));
    const combined = combineSearch(input);
    return [...combined, ...single];
  }, [input]);

  const categories = useMemo(() => {
    const cats = new Map<string, DictEntry[]>();
    for (const entry of dictionary) {
      const list = cats.get(entry.category) || [];
      list.push(entry);
      cats.set(entry.category, list);
    }
    return cats;
  }, []);

  return (
    <ToolLayout slug="column">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-muted">한글 단어 입력</label>
            <button onClick={() => setShowDict(!showDict)} className="text-xs text-faint hover:text-accent transition-colors">
              {showDict ? "사전 닫기" : "지원 단어 목록 보기"}
            </button>
          </div>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="예: 사용자 이름, 주문번호, 결제금액, 배송 상태 ..." className="w-full" />
          <p className="text-xs text-dim mt-1">띄어쓰기로 단어를 조합할 수 있습니다 (예: &ldquo;주문 상태&rdquo; → order_status)</p>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((suggestion, idx) => (
              <div key={idx} className="bg-surface border border-line rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-heading">{suggestion.entry.ko[0]}</span>
                  <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">{suggestion.entry.category}</span>
                  {suggestion.entry.ko.length > 1 && (
                    <span className="text-xs text-dim">({suggestion.entry.ko.slice(1).join(", ")})</span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {suggestion.formats.map((fmt) => (
                    <div key={fmt.label} className="flex items-center justify-between bg-bg rounded-md px-3 py-2">
                      <div>
                        <div className="text-[10px] text-faint mb-0.5">{fmt.label}</div>
                        <div className="font-mono text-sm text-body">{fmt.value}</div>
                      </div>
                      <CopyButton text={fmt.value} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {input.trim() && results.length === 0 && (
          <div className="text-center py-8 text-faint">
            <p>&ldquo;{input}&rdquo;에 해당하는 단어를 찾을 수 없습니다.</p>
            <p className="text-sm mt-1">다른 표현을 시도하거나 지원 단어 목록을 확인해보세요.</p>
          </div>
        )}

        {showDict && (
          <div className="border border-line rounded-lg overflow-hidden">
            <div className="bg-surface px-4 py-3 border-b border-line">
              <h3 className="text-sm font-medium text-heading">지원 단어 목록 ({dictionary.length}개)</h3>
            </div>
            <div className="max-h-96 overflow-y-auto p-4 space-y-4">
              {Array.from(categories.entries()).map(([cat, entries]) => (
                <div key={cat}>
                  <h4 className="text-xs font-medium text-accent mb-2">{cat}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {entries.map((entry, i) => (
                      <button
                        key={i}
                        onClick={() => { setInput(entry.ko[0]); setShowDict(false); }}
                        className="px-2 py-1 text-xs bg-bg border border-line rounded text-muted hover:text-accent hover:border-accent/50 transition-colors cursor-pointer"
                      >
                        {entry.ko[0]} → {entry.en}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
