import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "컬럼명 변환기",
  description: "한글 단어를 입력하면 영문 컬럼명/변수명을 추천해드립니다. snake_case, camelCase, PascalCase 등 다양한 형식을 지원합니다.",
  alternates: { canonical: "/Toolry/column" },
  openGraph: {
    title: "컬럼명 변환기 | Toolry",
    description: "한글 → 영문 컬럼명/변수명 변환기",
    url: "https://jaeseong90.github.io/column",
  },
  twitter: { card: "summary", title: "컬럼명 변환기 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
