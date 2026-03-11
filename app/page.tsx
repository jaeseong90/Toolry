"use client";

import { useState } from "react";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-heading">
          개발자를 위한 <span className="text-accent">무료 도구 모음</span>
        </h1>
        <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
          광고 없이 빠르게 사용하는 온라인 유틸리티. 모든 처리는 브라우저에서 이루어집니다.
        </p>
        <p className="mt-2 text-sm text-faint">
          현재 <span className="text-accent font-medium">{tools.length}개</span>의 도구 제공
        </p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-faint"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="도구 검색..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-line rounded-lg text-heading text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-faint">
          <p className="text-lg">검색 결과가 없습니다.</p>
          <p className="text-sm mt-1">&ldquo;{search}&rdquo;에 해당하는 도구를 찾을 수 없습니다.</p>
        </div>
      )}
    </div>
  );
}
