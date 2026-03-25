import type { Metadata } from "next";
import ToolStructuredData from "@/components/ToolStructuredData";

export const metadata: Metadata = {
  title: "숫자 포맷터",
  description: "숫자를 천단위 콤마, 한글 금액, 진법 변환 등 다양한 형식으로 변환합니다.",
  alternates: { canonical: "/Toolry/number" },
  openGraph: {
    title: "숫자 포맷터 | Toolry",
    description: "숫자를 천단위 콤마, 한글 금액 등 다양한 형식으로 변환합니다.",
    url: "https://jaeseong90.github.io/Toolry/number",
  },
  twitter: { card: "summary", title: "숫자 포맷터 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolStructuredData slug="number" /></>;
}
