"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

const KOREAN_UNITS = ["", "만", "억", "조", "경"];
const KOREAN_DIGITS = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const KOREAN_SUB = ["", "십", "백", "천"];

function numberToKorean(n: number): string {
  if (n === 0) return "영";
  if (n < 0) return "마이너스 " + numberToKorean(-n);
  const intPart = Math.floor(n);
  const str = intPart.toString();
  const groups: string[] = [];
  for (let i = str.length; i > 0; i -= 4) {
    groups.unshift(str.slice(Math.max(0, i - 4), i));
  }
  let result = "";
  for (let i = 0; i < groups.length; i++) {
    const unitIdx = groups.length - 1 - i;
    const groupNum = parseInt(groups[i]);
    if (groupNum === 0) continue;
    let groupStr = "";
    const digits = groups[i].padStart(4, "0");
    for (let j = 0; j < 4; j++) {
      const d = parseInt(digits[j]);
      if (d === 0) continue;
      if (d === 1 && j < 3) groupStr += KOREAN_SUB[3 - j];
      else groupStr += KOREAN_DIGITS[d] + KOREAN_SUB[3 - j];
    }
    if (unitIdx < KOREAN_UNITS.length) result += groupStr + KOREAN_UNITS[unitIdx] + " ";
  }
  return result.trim();
}

function numberToKoreanCurrency(n: number): string {
  if (n === 0) return "영원";
  return numberToKorean(n) + "원";
}

export default function NumberPage() {
  const [input, setInput] = useState("");

  const parsed = useMemo(() => {
    const cleaned = input.replace(/[,\s원₩\\$]/g, "");
    const num = Number(cleaned);
    if (cleaned === "" || isNaN(num)) return null;
    return num;
  }, [input]);

  const formats = useMemo(() => {
    if (parsed === null) return [];
    const abs = Math.abs(parsed);
    const intPart = Math.floor(abs);
    const sign = parsed < 0 ? "-" : "";
    return [
      { label: "천단위 콤마", value: sign + intPart.toLocaleString("ko-KR") },
      { label: "한글 숫자", value: numberToKorean(parsed) },
      { label: "한글 금액", value: numberToKoreanCurrency(parsed) },
      { label: "통화 (₩)", value: "₩" + sign + intPart.toLocaleString("ko-KR") },
      { label: "통화 ($)", value: "$" + sign + intPart.toLocaleString("en-US") },
      { label: "지수 표기", value: parsed.toExponential(2) },
      { label: "16진수", value: sign + "0x" + Math.floor(abs).toString(16).toUpperCase() },
      { label: "8진수", value: sign + "0o" + Math.floor(abs).toString(8) },
      { label: "2진수", value: sign + "0b" + Math.floor(abs).toString(2) },
    ];
  }, [parsed]);

  const units = useMemo(() => {
    if (parsed === null || parsed < 0) return [];
    return [
      { label: "만", value: parsed >= 10000 ? (parsed / 10000).toLocaleString("ko-KR", { maximumFractionDigits: 2 }) + "만" : null },
      { label: "억", value: parsed >= 100000000 ? (parsed / 100000000).toLocaleString("ko-KR", { maximumFractionDigits: 2 }) + "억" : null },
      { label: "조", value: parsed >= 1000000000000 ? (parsed / 1000000000000).toLocaleString("ko-KR", { maximumFractionDigits: 2 }) + "조" : null },
    ].filter((u) => u.value !== null);
  }, [parsed]);

  return (
    <ToolLayout slug="number">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <label className="text-sm text-muted mb-1 block">숫자 입력</label>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="예: 1234567890, 1,234,567, 50000원 ..." className="w-full text-lg" />
          <p className="text-xs text-dim mt-1">콤마, 원, ₩, $ 등은 자동으로 제거됩니다</p>
        </div>

        {parsed !== null && formats.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {formats.map((fmt) => (
                <div key={fmt.label} className="bg-surface border border-line rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-accent">{fmt.label}</span>
                    <CopyButton text={fmt.value} />
                  </div>
                  <p className="font-mono text-sm text-body break-all">{fmt.value}</p>
                </div>
              ))}
            </div>

            {units.length > 0 && (
              <div>
                <h3 className="text-sm text-muted mb-2">단위 변환</h3>
                <div className="flex flex-wrap gap-2">
                  {units.map((u) => (
                    <div key={u.label} className="flex items-center gap-2 bg-surface border border-line rounded-lg px-4 py-2">
                      <span className="font-mono text-sm text-body">{u.value}</span>
                      <CopyButton text={u.value!} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {input.trim() && parsed === null && (
          <p className="text-red-400 text-sm">유효한 숫자를 입력해주세요.</p>
        )}
      </div>
    </ToolLayout>
  );
}
