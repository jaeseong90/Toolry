import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL 인코더/디코더",
  description: "URL을 인코딩하거나 디코딩하세요. 실시간 변환 및 클립보드 복사 기능을 제공합니다.",
  alternates: { canonical: "/Toolry/url" },
  openGraph: {
    title: "URL 인코더/디코더 | Toolry",
    description: "URL을 인코딩하거나 디코딩하세요.",
    url: "https://jaeseong90.github.io/url",
  },
  twitter: { card: "summary", title: "URL 인코더/디코더 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
