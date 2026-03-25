import type { Metadata } from "next";
import ToolStructuredData from "@/components/ToolStructuredData";

export const metadata: Metadata = {
  title: "정규식 테스터",
  description: "정규표현식을 실시간으로 테스트하고 매칭 결과를 확인하세요. 플래그 설정, 그룹 매칭, 하이라이트 기능을 제공합니다.",
  alternates: { canonical: "/Toolry/regex" },
  openGraph: {
    title: "정규식 테스터 | Toolry",
    description: "정규표현식을 실시간으로 테스트하고 매칭 결과를 확인하세요.",
    url: "https://jaeseong90.github.io/Toolry/regex",
  },
  twitter: { card: "summary", title: "정규식 테스터 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolStructuredData slug="regex" /></>;
}
