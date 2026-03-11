import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group block p-6 bg-surface rounded-xl border border-gray-800 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="text-3xl mb-3 w-12 h-12 flex items-center justify-center bg-bg rounded-lg font-mono text-accent">
        {tool.icon}
      </div>
      <h2 className="font-heading font-semibold text-lg text-white group-hover:text-accent transition-colors">
        {tool.name}
      </h2>
      <p className="mt-1 text-sm text-gray-400 leading-relaxed">
        {tool.description}
      </p>
    </Link>
  );
}
