import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "케이스 변환기",
  description: "camelCase, snake_case, PascalCase, kebab-case 등 다양한 네이밍 컨벤션으로 변환하세요.",
  alternates: { canonical: "/Toolry/case" },
  openGraph: {
    title: "케이스 변환기 | Toolry",
    description: "camelCase, snake_case, PascalCase, kebab-case 등으로 변환하세요.",
    url: "https://toolry.kr/case",
  },
  twitter: { card: "summary", title: "케이스 변환기 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
