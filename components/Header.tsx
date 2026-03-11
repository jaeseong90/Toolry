"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl text-white hover:text-accent transition-colors">
          Toolry
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname === `/${tool.slug}`
                  ? "bg-accent/10 text-accent"
                  : "text-gray-400 hover:text-gray-200 hover:bg-surface"
              }`}
            >
              {tool.name}
            </Link>
          ))}
        </nav>
        <MobileMenu pathname={pathname} />
      </div>
    </header>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <details className="md:hidden relative">
      <summary className="list-none cursor-pointer p-2 text-gray-400 hover:text-white">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-gray-700 rounded-lg shadow-xl py-1">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className={`block px-4 py-2 text-sm transition-colors ${
              pathname === `/${tool.slug}`
                ? "text-accent bg-accent/10"
                : "text-gray-300 hover:text-white hover:bg-bg"
            }`}
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </details>
  );
}
