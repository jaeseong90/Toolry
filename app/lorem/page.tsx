"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
  "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
  "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores",
  "quas", "molestias", "excepturi", "obcaecati", "cupiditate", "provident",
  "similique", "mollitia", "animi", "fuga", "harum", "rerum", "necessitatibus",
  "saepe", "eveniet", "voluptates", "repudiandae", "recusandae",
];

function generateSentence(seed: number): string {
  const len = 8 + (seed % 10);
  const words: string[] = [];
  let s = seed;
  for (let i = 0; i < len; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    words.push(WORDS[s % WORDS.length]);
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(seed: number): string {
  const sentenceCount = 4 + (seed % 4);
  const sentences: string[] = [];
  let s = seed;
  for (let i = 0; i < sentenceCount; i++) {
    s = (s * 6364136223846793005 + 1) & 0x7fffffff;
    sentences.push(generateSentence(s));
  }
  return sentences.join(" ");
}

type Unit = "paragraphs" | "sentences" | "words";

export default function LoremPage() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<Unit>("paragraphs");

  const output = useMemo(() => {
    if (unit === "paragraphs") {
      return Array.from({ length: count }, (_, i) => generateParagraph(i + 1)).join("\n\n");
    }
    if (unit === "sentences") {
      return Array.from({ length: count }, (_, i) => generateSentence(i * 7 + 1)).join(" ");
    }
    // words
    const words: string[] = [];
    let s = 42;
    for (let i = 0; i < count; i++) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      words.push(WORDS[s % WORDS.length]);
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  }, [count, unit]);

  return (
    <ToolLayout slug="lorem">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">수량</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-20"
            />
          </div>
          <div className="flex items-center gap-2">
            {(["paragraphs", "sentences", "words"] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  unit === u ? "bg-accent text-bg" : "bg-surface text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                {u === "paragraphs" ? "문단" : u === "sentences" ? "문장" : "단어"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-gray-400">결과</label>
            <CopyButton text={output} />
          </div>
          <textarea rows={15} value={output} readOnly className="w-full" />
        </div>
      </div>
    </ToolLayout>
  );
}
