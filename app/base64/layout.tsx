import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 인코더/디코더",
  description: "텍스트를 Base64로 인코딩하거나 디코딩하세요. 실시간 변환 및 클립보드 복사 기능을 제공합니다.",
  alternates: { canonical: "/Toolry/base64" },
  openGraph: {
    title: "Base64 인코더/디코더 | Toolry",
    description: "텍스트를 Base64로 인코딩하거나 디코딩하세요.",
    url: "https://toolry.kr/base64",
  },
  twitter: { card: "summary", title: "Base64 인코더/디코더 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
