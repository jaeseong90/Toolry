"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

function tokenize(input: string): string[] {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[\s_\-\.]+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

const converters: Record<string, { label: string; convert: (tokens: string[]) => string }> = {
  camel: { label: "camelCase", convert: (t) => t.map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))).join("") },
  pascal: { label: "PascalCase", convert: (t) => t.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("") },
  snake: { label: "snake_case", convert: (t) => t.join("_") },
  screaming: { label: "SCREAMING_SNAKE_CASE", convert: (t) => t.map((w) => w.toUpperCase()).join("_") },
  kebab: { label: "kebab-case", convert: (t) => t.join("-") },
  dot: { label: "dot.case", convert: (t) => t.join(".") },
  title: { label: "Title Case", convert: (t) => t.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") },
  lower: { label: "lower case", convert: (t) => t.join(" ") },
  upper: { label: "UPPER CASE", convert: (t) => t.map((w) => w.toUpperCase()).join(" ") },
};

const CASE_KEYS = ["camel", "pascal", "snake", "screaming", "kebab", "dot", "title", "lower", "upper"] as const;

export default function CasePage() {
  const [input, setInput] = useState("");
  const [bulk, setBulk] = useState(false);

  const results = (() => {
    if (!input.trim()) return [];
    if (bulk) {
      const lines = input.split("\n").filter((l) => l.trim());
      return CASE_KEYS.map((key) => ({ key, label: converters[key].label, value: lines.map((line) => converters[key].convert(tokenize(line.trim()))).join("\n") }));
    }
    const tokens = tokenize(input.trim());
    return CASE_KEYS.map((key) => ({ key, label: converters[key].label, value: converters[key].convert(tokens) }));
  })();

  return (
    <ToolLayout slug="case">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-muted">입력</label>
            <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
              <input type="checkbox" checked={bulk} onChange={(e) => setBulk(e.target.checked)} className="accent-accent" />
              여러 줄 변환
            </label>
          </div>
          {bulk ? (
            <textarea rows={5} value={input} onChange={(e) => setInput(e.target.value)} placeholder={"한 줄에 하나씩 입력하세요...\nuserFirstName\norder_total_price"} className="w-full" />
          ) : (
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="예: userFirstName, user_first_name, user-first-name ..." className="w-full" />
          )}
        </div>

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map(({ key, label, value }) => (
              <div key={key} className="bg-surface border border-line rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-accent">{label}</span>
                  <CopyButton text={value} />
                </div>
                {bulk ? (
                  <pre className="font-mono text-sm text-body break-all whitespace-pre-wrap">{value}</pre>
                ) : (
                  <p className="font-mono text-sm text-body break-all">{value}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
