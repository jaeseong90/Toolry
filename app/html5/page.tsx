"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

function encodeHtmlEntities(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtmlEntities(str: string): string {
  if (typeof document !== "undefined") {
    const ta = document.createElement("textarea");
    ta.innerHTML = str;
    return ta.value;
  }
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

interface EntityEntry {
  char: string;
  entity: string;
  code: string;
  desc: string;
}

interface EntityCategory {
  name: string;
  entries: EntityEntry[];
}

const ENTITY_DICT: EntityCategory[] = [
  {
    name: "기본 HTML",
    entries: [
      { char: "<", entity: "&lt;", code: "&#60;", desc: "Less than" },
      { char: ">", entity: "&gt;", code: "&#62;", desc: "Greater than" },
      { char: "&", entity: "&amp;", code: "&#38;", desc: "Ampersand" },
      { char: '"', entity: "&quot;", code: "&#34;", desc: "Double quote" },
      { char: "'", entity: "&apos;", code: "&#39;", desc: "Apostrophe" },
      { char: " ", entity: "&nbsp;", code: "&#160;", desc: "Non-breaking space" },
    ],
  },
  {
    name: "통화 / 기호",
    entries: [
      { char: "\u20ac", entity: "&euro;", code: "&#8364;", desc: "Euro" },
      { char: "\u00a3", entity: "&pound;", code: "&#163;", desc: "Pound" },
      { char: "\u00a5", entity: "&yen;", code: "&#165;", desc: "Yen" },
      { char: "\u00a2", entity: "&cent;", code: "&#162;", desc: "Cent" },
      { char: "\u20a9", entity: "&#8361;", code: "&#8361;", desc: "Won" },
      { char: "\u00a4", entity: "&curren;", code: "&#164;", desc: "Currency" },
    ],
  },
  {
    name: "지적재산 / 법률",
    entries: [
      { char: "\u00a9", entity: "&copy;", code: "&#169;", desc: "Copyright" },
      { char: "\u00ae", entity: "&reg;", code: "&#174;", desc: "Registered" },
      { char: "\u2122", entity: "&trade;", code: "&#8482;", desc: "Trademark" },
      { char: "\u00a7", entity: "&sect;", code: "&#167;", desc: "Section" },
      { char: "\u00b6", entity: "&para;", code: "&#182;", desc: "Paragraph" },
    ],
  },
  {
    name: "수학 기호",
    entries: [
      { char: "\u00d7", entity: "&times;", code: "&#215;", desc: "Multiplication" },
      { char: "\u00f7", entity: "&divide;", code: "&#247;", desc: "Division" },
      { char: "\u00b1", entity: "&plusmn;", code: "&#177;", desc: "Plus-minus" },
      { char: "\u2260", entity: "&ne;", code: "&#8800;", desc: "Not equal" },
      { char: "\u2264", entity: "&le;", code: "&#8804;", desc: "Less or equal" },
      { char: "\u2265", entity: "&ge;", code: "&#8805;", desc: "Greater or equal" },
      { char: "\u221e", entity: "&infin;", code: "&#8734;", desc: "Infinity" },
      { char: "\u00b2", entity: "&sup2;", code: "&#178;", desc: "Superscript 2" },
      { char: "\u00b3", entity: "&sup3;", code: "&#179;", desc: "Superscript 3" },
      { char: "\u00bd", entity: "&frac12;", code: "&#189;", desc: "1/2" },
      { char: "\u00bc", entity: "&frac14;", code: "&#188;", desc: "1/4" },
      { char: "\u00be", entity: "&frac34;", code: "&#190;", desc: "3/4" },
      { char: "\u2211", entity: "&sum;", code: "&#8721;", desc: "Summation" },
      { char: "\u221a", entity: "&radic;", code: "&#8730;", desc: "Square root" },
      { char: "\u00b0", entity: "&deg;", code: "&#176;", desc: "Degree" },
      { char: "\u00b5", entity: "&micro;", code: "&#181;", desc: "Micro" },
    ],
  },
  {
    name: "화살표",
    entries: [
      { char: "\u2190", entity: "&larr;", code: "&#8592;", desc: "Left arrow" },
      { char: "\u2191", entity: "&uarr;", code: "&#8593;", desc: "Up arrow" },
      { char: "\u2192", entity: "&rarr;", code: "&#8594;", desc: "Right arrow" },
      { char: "\u2193", entity: "&darr;", code: "&#8595;", desc: "Down arrow" },
      { char: "\u2194", entity: "&harr;", code: "&#8596;", desc: "Left-right arrow" },
      { char: "\u21b5", entity: "&crarr;", code: "&#8629;", desc: "Carriage return" },
      { char: "\u21d0", entity: "&lArr;", code: "&#8656;", desc: "Double left arrow" },
      { char: "\u21d2", entity: "&rArr;", code: "&#8658;", desc: "Double right arrow" },
      { char: "\u21d4", entity: "&hArr;", code: "&#8660;", desc: "Double left-right" },
    ],
  },
  {
    name: "구두점 / 따옴표",
    entries: [
      { char: "\u2014", entity: "&mdash;", code: "&#8212;", desc: "Em dash" },
      { char: "\u2013", entity: "&ndash;", code: "&#8211;", desc: "En dash" },
      { char: "\u2026", entity: "&hellip;", code: "&#8230;", desc: "Ellipsis" },
      { char: "\u00ab", entity: "&laquo;", code: "&#171;", desc: "Left guillemet" },
      { char: "\u00bb", entity: "&raquo;", code: "&#187;", desc: "Right guillemet" },
      { char: "\u201c", entity: "&ldquo;", code: "&#8220;", desc: "Left double quote" },
      { char: "\u201d", entity: "&rdquo;", code: "&#8221;", desc: "Right double quote" },
      { char: "\u2018", entity: "&lsquo;", code: "&#8216;", desc: "Left single quote" },
      { char: "\u2019", entity: "&rsquo;", code: "&#8217;", desc: "Right single quote" },
      { char: "\u2022", entity: "&bull;", code: "&#8226;", desc: "Bullet" },
      { char: "\u00b7", entity: "&middot;", code: "&#183;", desc: "Middle dot" },
      { char: "\u2020", entity: "&dagger;", code: "&#8224;", desc: "Dagger" },
      { char: "\u2021", entity: "&Dagger;", code: "&#8225;", desc: "Double dagger" },
    ],
  },
  {
    name: "기타 기호",
    entries: [
      { char: "\u2665", entity: "&hearts;", code: "&#9829;", desc: "Heart" },
      { char: "\u2666", entity: "&diams;", code: "&#9830;", desc: "Diamond" },
      { char: "\u2663", entity: "&clubs;", code: "&#9827;", desc: "Club" },
      { char: "\u2660", entity: "&spades;", code: "&#9824;", desc: "Spade" },
      { char: "\u2605", entity: "&#9733;", code: "&#9733;", desc: "Star" },
      { char: "\u2713", entity: "&#10003;", code: "&#10003;", desc: "Check mark" },
      { char: "\u2717", entity: "&#10007;", code: "&#10007;", desc: "Cross mark" },
      { char: "\u266a", entity: "&#9834;", code: "&#9834;", desc: "Note" },
      { char: "\u00ac", entity: "&not;", code: "&#172;", desc: "Not sign" },
      { char: "\u00af", entity: "&macr;", code: "&#175;", desc: "Macron" },
    ],
  },
  {
    name: "그리스 문자",
    entries: [
      { char: "\u0391", entity: "&Alpha;", code: "&#913;", desc: "Alpha" },
      { char: "\u0392", entity: "&Beta;", code: "&#914;", desc: "Beta" },
      { char: "\u0393", entity: "&Gamma;", code: "&#915;", desc: "Gamma" },
      { char: "\u0394", entity: "&Delta;", code: "&#916;", desc: "Delta" },
      { char: "\u03b1", entity: "&alpha;", code: "&#945;", desc: "alpha" },
      { char: "\u03b2", entity: "&beta;", code: "&#946;", desc: "beta" },
      { char: "\u03b3", entity: "&gamma;", code: "&#947;", desc: "gamma" },
      { char: "\u03b4", entity: "&delta;", code: "&#948;", desc: "delta" },
      { char: "\u03c0", entity: "&pi;", code: "&#960;", desc: "pi" },
      { char: "\u03c3", entity: "&sigma;", code: "&#963;", desc: "sigma" },
      { char: "\u03c9", entity: "&omega;", code: "&#969;", desc: "omega" },
      { char: "\u03bb", entity: "&lambda;", code: "&#955;", desc: "lambda" },
    ],
  },
];

export default function Html5Page() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [dictSearch, setDictSearch] = useState("");
  const [showDict, setShowDict] = useState(true);

  const output = useMemo(() => {
    if (!input) return "";
    try {
      return mode === "encode" ? encodeHtmlEntities(input) : decodeHtmlEntities(input);
    } catch {
      return "변환할 수 없는 형식입니다";
    }
  }, [input, mode]);

  const filteredDict = useMemo(() => {
    if (!dictSearch.trim()) return ENTITY_DICT;
    const q = dictSearch.toLowerCase();
    return ENTITY_DICT.map((cat) => ({
      ...cat,
      entries: cat.entries.filter(
        (e) =>
          e.char.includes(q) ||
          e.entity.toLowerCase().includes(q) ||
          e.code.includes(q) ||
          e.desc.toLowerCase().includes(q) ||
          cat.name.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.entries.length > 0);
  }, [dictSearch]);

  const totalEntities = ENTITY_DICT.reduce((sum, cat) => sum + cat.entries.length, 0);

  return (
    <ToolLayout slug="html5">
      <div className="space-y-6">
        {/* Encoder/Decoder */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {(["encode", "decode"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setInput(""); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === m ? "bg-accent text-bg" : "bg-surface text-muted hover:text-heading border border-line"
                }`}
              >
                {m === "encode" ? "인코딩" : "디코딩"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted mb-1 block">
                {mode === "encode" ? "HTML 텍스트" : "HTML 엔티티"}
              </label>
              <textarea
                rows={8}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "encode"
                    ? '<div class="hello">Hello & "World"</div>'
                    : '&lt;div class=&quot;hello&quot;&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'
                }
                className="w-full"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm text-muted">
                  {mode === "encode" ? "HTML 엔티티" : "HTML 텍스트"}
                </label>
                <CopyButton text={output} />
              </div>
              <textarea rows={8} value={output} readOnly className="w-full" />
            </div>
          </div>
        </div>

        {/* Dictionary */}
        <div className="border border-line rounded-lg overflow-hidden">
          <button
            onClick={() => setShowDict(!showDict)}
            className="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-bg transition-colors"
          >
            <h3 className="text-sm font-medium text-heading">
              HTML 엔티티 사전 ({totalEntities}개)
            </h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`text-muted transition-transform ${showDict ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {showDict && (
            <div className="border-t border-line">
              <div className="px-4 py-3 border-b border-line">
                <input
                  type="text"
                  value={dictSearch}
                  onChange={(e) => setDictSearch(e.target.value)}
                  placeholder="엔티티 검색... (예: arrow, copy, euro)"
                  className="w-full !font-sans"
                />
              </div>

              <div className="max-h-[500px] overflow-y-auto p-4 space-y-6">
                {filteredDict.length === 0 ? (
                  <p className="text-center text-faint py-4">검색 결과가 없습니다.</p>
                ) : (
                  filteredDict.map((cat) => (
                    <div key={cat.name}>
                      <h4 className="text-xs font-medium text-accent mb-2 sticky top-0 bg-bg py-1">{cat.name}</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-faint text-xs">
                              <th className="pb-1.5 pr-4 font-medium w-16">문자</th>
                              <th className="pb-1.5 pr-4 font-medium">Named</th>
                              <th className="pb-1.5 pr-4 font-medium">Numeric</th>
                              <th className="pb-1.5 pr-4 font-medium">설명</th>
                              <th className="pb-1.5 font-medium w-10"></th>
                            </tr>
                          </thead>
                          <tbody className="font-mono">
                            {cat.entries.map((entry) => (
                              <tr key={entry.entity} className="border-t border-line-dim hover:bg-surface/50 transition-colors">
                                <td className="py-2 pr-4">
                                  <span className="text-accent text-lg">{entry.char === " " ? "␣" : entry.char}</span>
                                </td>
                                <td className="py-2 pr-4 text-body text-xs">{entry.entity}</td>
                                <td className="py-2 pr-4 text-muted text-xs">{entry.code}</td>
                                <td className="py-2 pr-4 text-faint text-xs font-sans">{entry.desc}</td>
                                <td className="py-2">
                                  <CopyButton text={entry.entity} label="" className="!px-1.5 !py-1" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
