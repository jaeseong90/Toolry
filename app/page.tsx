import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
          개발자를 위한 <span className="text-accent">무료 도구 모음</span>
        </h1>
        <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
          광고 없이 빠르게 사용하는 온라인 유틸리티. 모든 처리는 브라우저에서 이루어집니다.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
