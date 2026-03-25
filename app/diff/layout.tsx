import type { Metadata } from "next";
import ToolStructuredData from "@/components/ToolStructuredData";

export const metadata: Metadata = {
  title: "텍스트 비교 (Diff)",
  description: "두 텍스트의 차이점을 한눈에 비교하세요. 코드 리뷰, 문서 비교에 유용합니다.",
  alternates: { canonical: "/Toolry/diff" },
  openGraph: {
    title: "텍스트 비교 (Diff) | Toolry",
    description: "두 텍스트의 차이점을 한눈에 비교하세요.",
    url: "https://jaeseong90.github.io/Toolry/diff",
  },
  twitter: { card: "summary", title: "텍스트 비교 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolStructuredData slug="diff" /></>;
}
