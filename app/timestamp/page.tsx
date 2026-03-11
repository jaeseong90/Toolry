"use client";

import { useState, useCallback, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function formatDateUTC(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
}

export default function TimestampPage() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [unit, setUnit] = useState<"s" | "ms">("s");
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => { setNow(Math.floor(Date.now() / 1000)); }, []);

  const handleTimestampChange = useCallback((val: string) => {
    setTimestamp(val);
    const n = parseInt(val, 10);
    if (isNaN(n)) { setDateStr(""); return; }
    const ms = unit === "s" ? n * 1000 : n;
    const d = new Date(ms);
    if (isNaN(d.getTime())) { setDateStr(""); return; }
    setDateStr(formatDate(d));
  }, [unit]);

  const handleDateChange = useCallback((val: string) => {
    setDateStr(val);
    const d = new Date(val.replace(" ", "T"));
    if (isNaN(d.getTime())) { setTimestamp(""); return; }
    const ts = unit === "s" ? Math.floor(d.getTime() / 1000) : d.getTime();
    setTimestamp(String(ts));
  }, [unit]);

  const handleNow = useCallback(() => {
    const d = new Date();
    const ts = unit === "s" ? Math.floor(d.getTime() / 1000) : d.getTime();
    setTimestamp(String(ts));
    setDateStr(formatDate(d));
    setNow(Math.floor(d.getTime() / 1000));
  }, [unit]);

  const parsedDate = (() => {
    const n = parseInt(timestamp, 10);
    if (isNaN(n)) return null;
    const ms = unit === "s" ? n * 1000 : n;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  })();

  return (
    <ToolLayout slug="timestamp">
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">단위:</span>
          <div className="flex bg-surface border border-line rounded-lg overflow-hidden">
            {(["s", "ms"] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  unit === u ? "bg-accent/20 text-accent" : "text-muted hover:text-heading"
                }`}
              >
                {u === "s" ? "초 (s)" : "밀리초 (ms)"}
              </button>
            ))}
          </div>
          <button onClick={handleNow} className="ml-auto px-4 py-1.5 bg-accent/20 text-accent rounded-lg text-sm font-medium hover:bg-accent/30 transition-colors">
            현재 시각
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-muted">Unix Timestamp</label>
              <CopyButton text={timestamp} />
            </div>
            <input type="text" value={timestamp} onChange={(e) => handleTimestampChange(e.target.value)} placeholder={now !== null ? String(now) : ""} className="w-full font-mono" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-muted">날짜/시간</label>
              <CopyButton text={dateStr} />
            </div>
            <input type="text" value={dateStr} onChange={(e) => handleDateChange(e.target.value)} placeholder="2024-01-01 00:00:00" className="w-full font-mono" />
          </div>
        </div>

        {parsedDate && (
          <div className="bg-surface border border-line rounded-lg p-4 space-y-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="text-faint">KST (한국 시간)</span>
                <p className="font-mono text-body">{formatDate(parsedDate)}</p>
              </div>
              <div>
                <span className="text-faint">UTC</span>
                <p className="font-mono text-body">{formatDateUTC(parsedDate)}</p>
              </div>
              <div>
                <span className="text-faint">초 (s)</span>
                <p className="font-mono text-body">{Math.floor(parsedDate.getTime() / 1000)}</p>
              </div>
              <div>
                <span className="text-faint">밀리초 (ms)</span>
                <p className="font-mono text-body">{parsedDate.getTime()}</p>
              </div>
              <div className="col-span-2">
                <span className="text-faint">ISO 8601</span>
                <p className="font-mono text-body">{parsedDate.toISOString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
