"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";

function countBytes(str: string): number {
  return new TextEncoder().encode(str).length;
}

export default function CounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).filter(Boolean).length : 0;
    const bytes = countBytes(text);

    // 한글 글자수 (자모 제외, 완성형만)
    const korean = (text.match(/[\uAC00-\uD7A3]/g) || []).length;
    // 영문 단어
    const english = (text.match(/[a-zA-Z]+/g) || []).length;
    // 숫자
    const numbers = (text.match(/\d+/g) || []).length;

    return { chars, charsNoSpace, words, lines, paragraphs, bytes, korean, english, numbers };
  }, [text]);

  const statCards = [
    { label: "전체 글자수", value: stats.chars.toLocaleString() },
    { label: "공백 제외", value: stats.charsNoSpace.toLocaleString() },
    { label: "단어수", value: stats.words.toLocaleString() },
    { label: "줄 수", value: stats.lines.toLocaleString() },
    { label: "문단수", value: stats.paragraphs.toLocaleString() },
    { label: "바이트 (UTF-8)", value: stats.bytes.toLocaleString() },
    { label: "한글", value: stats.korean.toLocaleString() },
    { label: "영문 단어", value: stats.english.toLocaleString() },
    { label: "숫자", value: stats.numbers.toLocaleString() },
  ];

  return (
    <ToolLayout slug="counter">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">텍스트 입력</label>
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="글자수를 세고 싶은 텍스트를 입력하세요..."
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {statCards.map((card) => (
            <div key={card.label} className="bg-surface border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-lg font-mono font-bold text-accent">{card.value}</div>
              <div className="text-[11px] text-gray-500 mt-1">{card.label}</div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
