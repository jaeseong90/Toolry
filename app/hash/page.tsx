"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

async function computeHash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashPage() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [uppercase, setUppercase] = useState(false);

  useEffect(() => {
    if (!input) {
      setHashes({});
      return;
    }
    let cancelled = false;
    Promise.all(
      ALGORITHMS.map(async (algo) => {
        const hash = await computeHash(algo, input);
        return [algo, hash] as const;
      })
    ).then((results) => {
      if (!cancelled) {
        setHashes(Object.fromEntries(results));
      }
    });
    return () => { cancelled = true; };
  }, [input]);

  const format = (hash: string) => (uppercase ? hash.toUpperCase() : hash);

  return (
    <ToolLayout slug="hash">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-gray-400">입력 텍스트</label>
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="accent-accent"
              />
              대문자
            </label>
          </div>
          <textarea
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="해시를 생성할 텍스트를 입력하세요..."
            className="w-full"
          />
        </div>

        {input && (
          <div className="space-y-3">
            {ALGORITHMS.map((algo) => (
              <div key={algo} className="bg-surface border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-accent">{algo}</span>
                  <CopyButton text={format(hashes[algo] || "")} />
                </div>
                <p className="font-mono text-sm text-gray-300 break-all">
                  {format(hashes[algo] || "계산 중...")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
