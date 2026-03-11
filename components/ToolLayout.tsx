import Link from "next/link";
import { tools } from "@/lib/tools";

interface ToolLayoutProps {
  slug: string;
  children: React.ReactNode;
}

export default function ToolLayout({ slug, children }: ToolLayoutProps) {
  const current = tools.find((t) => t.slug === slug);
  const related = tools.filter((t) => t.slug !== slug).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {current && (
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold text-white">{current.name}</h1>
          <p className="mt-1 text-gray-400 text-sm">{current.description}</p>
        </div>
      )}
      <div className="min-h-[60vh]">{children}</div>
      <div className="mt-12 pt-8 border-t border-gray-800">
        <h3 className="text-sm font-medium text-gray-500 mb-3">다른 도구</h3>
        <div className="flex flex-wrap gap-2">
          {related.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="px-4 py-2 bg-surface rounded-lg text-sm text-gray-300 hover:text-accent hover:border-accent/50 border border-gray-800 transition-colors"
            >
              {tool.icon} {tool.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
