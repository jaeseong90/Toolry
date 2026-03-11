"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";

interface DiffLine {
  type: "equal" | "added" | "removed";
  text: string;
}

function computeDiff(a: string, b: string): DiffLine[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const m = linesA.length;
  const n = linesB.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (linesA[i - 1] === linesB[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  let i = m, j = n;
  const stack: DiffLine[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      stack.push({ type: "equal", text: linesA[i - 1] }); i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({ type: "added", text: linesB[j - 1] }); j--;
    } else {
      stack.push({ type: "removed", text: linesA[i - 1] }); i--;
    }
  }
  stack.reverse();
  return stack;
}

export default function DiffPage() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const diff = useMemo(() => computeDiff(left, right), [left, right]);
  const stats = useMemo(() => {
    let added = 0, removed = 0;
    for (const line of diff) {
      if (line.type === "added") added++;
      if (line.type === "removed") removed++;
    }
    return { added, removed };
  }, [diff]);

  const hasInput = left.length > 0 || right.length > 0;

  return (
    <ToolLayout slug="diff">
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted mb-1 block">원본 텍스트</label>
            <textarea rows={12} value={left} onChange={(e) => setLeft(e.target.value)} placeholder="원본 텍스트를 붙여넣으세요..." className="w-full" />
          </div>
          <div>
            <label className="text-sm text-muted mb-1 block">비교 텍스트</label>
            <textarea rows={12} value={right} onChange={(e) => setRight(e.target.value)} placeholder="비교할 텍스트를 붙여넣으세요..." className="w-full" />
          </div>
        </div>

        {hasInput && (
          <>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted">비교 결과</span>
              <span className="text-green-500">+{stats.added} 추가</span>
              <span className="text-red-500">-{stats.removed} 삭제</span>
            </div>
            <div className="bg-surface border border-line rounded-lg overflow-hidden">
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <pre className="text-sm font-mono leading-6">
                  {diff.map((line, idx) => (
                    <div
                      key={idx}
                      className={`px-4 ${
                        line.type === "added"
                          ? "bg-green-500/10 text-green-600 dark:text-green-300"
                          : line.type === "removed"
                          ? "bg-red-500/10 text-red-600 dark:text-red-300"
                          : "text-muted"
                      }`}
                    >
                      <span className="inline-block w-6 text-dim select-none">
                        {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                      </span>
                      {line.text || "\u00a0"}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
