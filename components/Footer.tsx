import Link from "next/link";
import { tools } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="border-t border-line-dim mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="font-heading font-bold text-lg text-heading">
              Toolry
            </Link>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              개발자를 위한 무료 온라인 유틸리티.
              <br />
              모든 데이터는 브라우저에서 처리됩니다.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted mb-3">도구</h3>
            <ul className="space-y-1.5">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="text-sm text-faint hover:text-accent transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted mb-3">정보</h3>
            <ul className="space-y-1.5">
              <li className="text-sm text-faint">오픈소스 프로젝트</li>
              <li className="text-sm text-faint">서버 전송 없음</li>
              <li className="text-sm text-faint">완전 무료</li>
              <li>
                <a
                  href="https://github.com/jaeseong90/Toolry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-faint hover:text-accent transition-colors mt-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-line-dim text-center text-xs text-dim">
          &copy; {new Date().getFullYear()} Toolry. MIT License.
        </div>
      </div>
    </footer>
  );
}
