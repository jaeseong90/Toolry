"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";

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

interface ConsoleLine {
  type: "log" | "error" | "warn" | "info";
  args: string;
}

export default function JSBinPage() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [js, setJs] = useState(DEFAULT_JS);
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([]);
  const [autoRun, setAutoRun] = useState(true);
  const [showConsole, setShowConsole] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

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

  const consoleColorMap: Record<string, string> = {
    log: "text-body",
    error: "text-red-400",
    warn: "text-yellow-400",
    info: "text-blue-400",
  };

  const editorCommon = "w-full font-mono text-sm bg-surface border border-line rounded-lg px-3 py-2 text-heading focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors leading-6";

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>, setter: (v: string) => void) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      setter(value.substring(0, start) + "  " + value.substring(end));
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  };

  return (
    <ToolLayout slug="jsbin">
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
              <input type="checkbox" checked={autoRun} onChange={(e) => setAutoRun(e.target.checked)} className="accent-accent" />
              자동 실행
            </label>
            {!autoRun && (
              <button onClick={run} className="px-4 py-2 bg-accent text-bg rounded-lg text-sm font-medium hover:opacity-85 transition-opacity">
                ▶ 실행
              </button>
            )}
          </div>
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
              showConsole ? "bg-surface text-accent border-accent/50" : "bg-surface text-muted border-line hover:text-heading"
            }`}
          >
            콘솔 {consoleLines.length > 0 && `(${consoleLines.length})`}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left: All 3 editors stacked */}
          <div className="space-y-2">
            <div>
              <label className="text-xs font-medium text-accent mb-1 block">HTML</label>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                spellCheck={false}
                className={editorCommon}
                rows={7}
                style={{ tabSize: 2, resize: "vertical" }}
                onKeyDown={(e) => handleTab(e, setHtml)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-accent mb-1 block">CSS</label>
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                spellCheck={false}
                className={editorCommon}
                rows={7}
                style={{ tabSize: 2, resize: "vertical" }}
                onKeyDown={(e) => handleTab(e, setCss)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-accent mb-1 block">JavaScript</label>
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                spellCheck={false}
                className={editorCommon}
                rows={7}
                style={{ tabSize: 2, resize: "vertical" }}
                onKeyDown={(e) => handleTab(e, setJs)}
              />
            </div>
          </div>

          {/* Right: Preview + Console */}
          <div className="space-y-3">
            <div className="bg-white rounded-lg overflow-hidden border border-line" style={{ minHeight: showConsole ? "340px" : "500px" }}>
              <iframe
                ref={iframeRef}
                title="preview"
                sandbox="allow-scripts allow-modals"
                className="w-full h-full border-0"
                style={{ minHeight: showConsole ? "340px" : "500px" }}
              />
            </div>

            {showConsole && (
              <div className="bg-surface border border-line rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-line">
                  <span className="text-xs text-faint font-medium">Console</span>
                  <button onClick={() => setConsoleLines([])} className="text-xs text-dim hover:text-muted transition-colors">
                    지우기
                  </button>
                </div>
                <div className="max-h-48 overflow-y-auto px-3 py-2 font-mono text-xs space-y-0.5">
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
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
