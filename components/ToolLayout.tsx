import Link from "next/link";
import { tools } from "@/lib/tools";

interface ToolLayoutProps {
  slug: string;
  children: React.ReactNode;
}

export default function ToolLayout({ slug, children }: ToolLayoutProps) {
  const current = tools.find((t) => t.slug === slug);
  const related = tools.filter((t) => t.slug !== slug).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {current && (
        <div className="mb-6">
          <nav aria-label="breadcrumb" className="mb-2">
            <ol className="flex items-center gap-1.5 text-xs text-faint" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" className="hover:text-accent transition-colors" itemProp="item">
                  <span itemProp="name">홈</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-dim">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-muted" itemProp="name">{current.name}</span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>
          <h1 className="font-heading text-2xl font-bold text-heading">{current.name}</h1>
          <p className="mt-1 text-muted text-sm">{current.description}</p>
        </div>
      )}
      <div className="min-h-[60vh]">{children}</div>
      <div className="mt-12 pt-8 border-t border-line-dim">
        <h3 className="text-sm font-medium text-faint mb-3">다른 도구</h3>
        <div className="flex flex-wrap gap-2">
          {related.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="px-4 py-2 bg-surface rounded-lg text-sm text-body hover:text-accent hover:border-accent/50 border border-line transition-colors"
            >
              {tool.icon} {tool.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
