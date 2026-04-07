"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

const DEFAULT_HTML = `<h1>Hello, Toolry!</h1>
<p id="demo">결과가 여기에 표시됩니다.</p>
<button onclick="sayHello()">클릭해보세요</button>`;

const DEFAULT_CSS = `body {
  font-family: 'Segoe UI', sans-serif;
  padding: 20px;
  background: #1a1d27;
  color: #e5e7eb;
}

h1 { color: #6ee7b7; }

button {
  margin-top: 12px;
  padding: 8px 20px;
  background: #6ee7b7;
  color: #0f1117;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
button:hover { opacity: 0.85; }`;

const DEFAULT_JS = `function sayHello() {
  document.getElementById('demo').textContent = '안녕하세요! 🎉';
  console.log('버튼이 클릭되었습니다!');
  console.log('현재 시간:', new Date().toLocaleString('ko-KR'));
}

console.log('JS 플레이그라운드에 오신 것을 환영합니다!');
console.log('자유롭게 코드를 수정하고 실행해보세요.');`;

type Tab = "html" | "css" | "js";

interface ConsoleLine {
  type: "log" | "error" | "warn" | "info";
  args: string;
}

export default function JSBinPage() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [js, setJs] = useState(DEFAULT_JS);
  const [activeTab, setActiveTab] = useState<Tab>("html");
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([]);
  const [autoRun, setAutoRun] = useState(true);
  const [showConsole, setShowConsole] = useState(true);
  const [splitPercent, setSplitPercent] = useState(45);
  const [consoleHeight, setConsoleHeight] = useState(160);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  const run = useCallback(() => {
    setConsoleLines([]);
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>${css}</style>
</head>
<body>
${html}
<script>
(function() {
  const _post = (type, args) => {
    try {
      window.parent.postMessage({
        source: 'toolry-jsbin',
        type,
        args: Array.from(args).map(a => {
          try {
            if (typeof a === 'object') return JSON.stringify(a, null, 2);
            return String(a);
          } catch { return String(a); }
        }).join(' ')
      }, '*');
    } catch {}
  };
  console.log = function() { _post('log', arguments); };
  console.error = function() { _post('error', arguments); };
  console.warn = function() { _post('warn', arguments); };
  console.info = function() { _post('info', arguments); };
  window.onerror = function(msg, url, line) {
    _post('error', ['Error: ' + msg + ' (line ' + line + ')']);
  };
})();
try {
${js}
} catch(e) {
  console.error(e.toString());
}
<\/script>
</body>
</html>`;

    iframe.srcdoc = doc;
  }, [html, css, js]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.source === "toolry-jsbin") {
        setConsoleLines((prev) => [...prev, { type: e.data.type, args: e.data.args }]);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    if (!autoRun) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(run, 500);
    return () => clearTimeout(timerRef.current);
  }, [html, css, js, autoRun, run]);

  const currentValue = activeTab === "html" ? html : activeTab === "css" ? css : js;
  const currentSetter = activeTab === "html" ? setHtml : activeTab === "css" ? setCss : setJs;

  const consoleColorMap: Record<string, string> = {
    log: "text-body",
    error: "text-red-400",
    warn: "text-yellow-400",
    info: "text-blue-400",
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "html", label: "HTML" },
    { key: "css", label: "CSS" },
    { key: "js", label: "JS" },
  ];

  // Horizontal splitter drag
  const handleSplitDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const startX = e.clientX;
    const startPercent = splitPercent;
    const rect = container.getBoundingClientRect();

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const newPercent = startPercent + (dx / rect.width) * 100;
      setSplitPercent(Math.min(75, Math.max(25, newPercent)));
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [splitPercent]);

  // Console vertical resize
  const handleConsoleDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startH = consoleHeight;

    const onMove = (ev: MouseEvent) => {
      const dy = startY - ev.clientY;
      setConsoleHeight(Math.min(400, Math.max(80, startH + dy)));
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [consoleHeight]);

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      currentSetter(value.substring(0, start) + "  " + value.substring(end));
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  };

  const handleReset = () => {
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setJs(DEFAULT_JS);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-surface border-b border-line shrink-0">
        <div className="flex items-center gap-1">
          <Link href="/" className="text-muted hover:text-heading text-xs mr-2 transition-colors">
            ← 홈
          </Link>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-accent text-bg"
                  : "text-muted hover:text-heading hover:bg-bg"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer">
            <input type="checkbox" checked={autoRun} onChange={(e) => setAutoRun(e.target.checked)} className="accent-accent" />
            자동실행
          </label>
          {!autoRun && (
            <button onClick={run} className="px-3 py-1 bg-accent text-bg rounded text-xs font-medium hover:opacity-85 transition-opacity">
              ▶ 실행
            </button>
          )}
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors border ${
              showConsole ? "text-accent border-accent/50" : "text-muted border-line hover:text-heading"
            }`}
          >
            콘솔{consoleLines.length > 0 ? ` (${consoleLines.length})` : ""}
          </button>
          <button onClick={handleReset} className="px-2 py-1 rounded text-xs text-muted border border-line hover:text-heading transition-colors">
            초기화
          </button>
        </div>
      </div>

      {/* Main area */}
      <div ref={containerRef} className="flex flex-1 min-h-0">
        {/* Editor panel */}
        <div className="flex flex-col min-h-0" style={{ width: `${splitPercent}%` }}>
          <textarea
            value={currentValue}
            onChange={(e) => currentSetter(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full font-mono text-sm bg-bg px-4 py-3 text-heading focus:outline-none leading-6 resize-none"
            style={{ tabSize: 2 }}
            onKeyDown={handleTab}
            placeholder={`${activeTab.toUpperCase()} 코드를 입력하세요...`}
          />
        </div>

        {/* Vertical splitter */}
        <div
          onMouseDown={handleSplitDrag}
          className="w-1 bg-line hover:bg-accent/50 cursor-col-resize shrink-0 transition-colors"
        />

        {/* Preview + Console panel */}
        <div className="flex flex-col flex-1 min-h-0 min-w-0">
          {/* Preview */}
          <div className="flex-1 min-h-0 bg-white">
            <iframe
              ref={iframeRef}
              title="preview"
              sandbox="allow-scripts allow-modals"
              className="w-full h-full border-0"
            />
          </div>

          {/* Console */}
          {showConsole && (
            <>
              <div
                onMouseDown={handleConsoleDrag}
                className="h-1 bg-line hover:bg-accent/50 cursor-row-resize shrink-0 transition-colors"
              />
              <div className="bg-surface shrink-0 flex flex-col" style={{ height: consoleHeight }}>
                <div className="flex items-center justify-between px-3 py-1 border-b border-line shrink-0">
                  <span className="text-xs text-faint font-medium">Console</span>
                  <button onClick={() => setConsoleLines([])} className="text-xs text-dim hover:text-muted transition-colors">
                    지우기
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-3 py-1.5 font-mono text-xs space-y-0.5">
                  {consoleLines.length === 0 ? (
                    <div className="text-dim">콘솔 출력이 여기에 표시됩니다.</div>
                  ) : (
                    consoleLines.map((line, i) => (
                      <div key={i} className={`${consoleColorMap[line.type]} break-all leading-5`}>
                        <span className="text-dim select-none mr-2">
                          {line.type === "error" ? "✕" : line.type === "warn" ? "⚠" : "›"}
                        </span>
                        {line.args}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
