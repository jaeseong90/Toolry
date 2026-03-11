"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-line-dim">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl text-heading hover:text-accent transition-colors">
          Toolry
        </Link>
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto max-w-[70%] scrollbar-none">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className={`px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors ${
                pathname === `/${tool.slug}`
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-heading hover:bg-surface"
              }`}
            >
              {tool.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <details className="lg:hidden relative">
      <summary className="list-none cursor-pointer p-2 text-muted hover:text-heading">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 w-52 bg-surface border border-line rounded-lg shadow-xl py-1 z-50 max-h-[70vh] overflow-y-auto">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className={`block px-4 py-2 text-sm transition-colors ${
              pathname === `/${tool.slug}`
                ? "text-accent bg-accent/10"
                : "text-body hover:text-heading hover:bg-bg"
            }`}
          >
            <span className="mr-2">{tool.icon}</span>
            {tool.name}
          </Link>
        ))}
      </div>
    </details>
  );
}
