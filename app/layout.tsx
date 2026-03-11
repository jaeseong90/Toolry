import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolry - 개발자를 위한 무료 온라인 도구 모음",
  description:
    "광고 없는 무료 온라인 유틸리티 도구 모음. 정규식 테스터, JSON 포맷터, 색상 변환기, 타임스탬프 변환기, URL 인코더/디코더 등을 제공합니다.",
  metadataBase: new URL("https://toolry.kr"),
  openGraph: {
    title: "Toolry - 개발자를 위한 무료 온라인 도구 모음",
    description: "광고 없는 무료 온라인 유틸리티 도구 모음",
    url: "https://toolry.kr",
    siteName: "Toolry",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
