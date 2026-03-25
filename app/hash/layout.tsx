import type { Metadata } from "next";
import ToolStructuredData from "@/components/ToolStructuredData";

export const metadata: Metadata = {
  title: "해시 생성기",
  description: "SHA-1, SHA-256, SHA-384, SHA-512 해시를 실시간으로 생성하세요.",
  alternates: { canonical: "/Toolry/hash" },
  openGraph: {
    title: "해시 생성기 | Toolry",
    description: "다양한 해시 알고리즘으로 텍스트 해시를 생성하세요.",
    url: "https://jaeseong90.github.io/Toolry/hash",
  },
  twitter: { card: "summary", title: "해시 생성기 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolStructuredData slug="hash" /></>;
}
