"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { tools } from "@/lib/tools";
import ThemeToggle from "./ThemeToggle";

interface ToolCategory {
  name: string;
  slugs: string[];
}

const CATEGORIES: ToolCategory[] = [
  { name: "인코딩/변환", slugs: ["url", "base64", "html5", "hash"] },
  { name: "포맷/텍스트", slugs: ["json", "case", "counter", "number", "lorem"] },
  { name: "개발 도구", slugs: ["regex", "color", "timestamp", "diff", "column", "jsbin"] },
];

const toolMap = Object.fromEntries(tools.map((t) => [t.slug, t]));

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setNavOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setNavOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-line-dim">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl text-heading hover:text-accent transition-colors">
          Toolry
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" ref={navRef}>
          <div className="relative">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                navOpen ? "bg-accent/10 text-accent" : "text-muted hover:text-heading hover:bg-surface"
              }`}
              aria-expanded={navOpen}
              aria-haspopup="true"
            >
              도구 모음
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${navOpen ? "rotate-180" : ""}`}>
                <path d="M3 4.5l3 3 3-3" />
              </svg>
            </button>

            {navOpen && (
              <div className="absolute left-0 top-full mt-2 bg-surface border border-line rounded-lg shadow-xl py-3 px-4 z-50 w-[520px]">
                <div className="grid grid-cols-3 gap-4">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.name}>
                      <h4 className="text-xs font-medium text-faint mb-2 px-1">{cat.name}</h4>
                      <div className="space-y-0.5">
                        {cat.slugs.map((slug) => {
                          const tool = toolMap[slug];
                          if (!tool) return null;
                          return (
                            <Link
                              key={slug}
                              href={`/${slug}`}
                              className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                                pathname === `/${slug}`
                                  ? "bg-accent/10 text-accent"
                                  : "text-body hover:text-heading hover:bg-bg"
                              }`}
                            >
                              <span className="w-6 text-center text-xs text-muted">{tool.icon}</span>
                              <span>{tool.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick access: most used tools */}
          {[
            { slug: "json", label: "JSON" },
            { slug: "regex", label: "정규식" },
            { slug: "url", label: "URL" },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className={`px-2.5 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                pathname === `/${item.slug}`
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-heading hover:bg-surface"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <div className="md:hidden relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-muted hover:text-heading transition-colors"
              aria-label="메뉴 열기"
              aria-expanded={menuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <path d="M5 5l10 10M15 5L5 15" />
                ) : (
                  <path d="M3 5h14M3 10h14M3 15h14" />
                )}
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-surface border border-line rounded-lg shadow-xl py-2 z-50 max-h-[80vh] overflow-y-auto">
                {CATEGORIES.map((cat) => (
                  <div key={cat.name}>
                    <h4 className="text-xs font-medium text-faint px-4 pt-3 pb-1">{cat.name}</h4>
                    {cat.slugs.map((slug) => {
                      const tool = toolMap[slug];
                      if (!tool) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/${slug}`}
                          className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                            pathname === `/${slug}`
                              ? "text-accent bg-accent/10"
                              : "text-body hover:text-heading hover:bg-bg"
                          }`}
                        >
                          <span className="w-6 text-center text-xs text-muted">{tool.icon}</span>
                          {tool.name}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
