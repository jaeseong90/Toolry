import Link from "next/link";
import { tools } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="font-heading font-bold text-lg text-white">
              Toolry
            </Link>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              개발자를 위한 광고 없는 무료 온라인 유틸리티.
              <br />
              모든 데이터는 브라우저에서 처리됩니다.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">도구</h3>
            <ul className="space-y-1.5">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="text-sm text-gray-500 hover:text-accent transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">정보</h3>
            <ul className="space-y-1.5">
              <li className="text-sm text-gray-500">오픈소스 프로젝트</li>
              <li className="text-sm text-gray-500">서버 전송 없음</li>
              <li className="text-sm text-gray-500">완전 무료, 광고 없음</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Toolry. MIT License.
        </div>
      </div>
    </footer>
  );
}
