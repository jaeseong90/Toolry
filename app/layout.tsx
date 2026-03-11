import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Toolry - 개발자를 위한 무료 온라인 도구 모음",
    template: "%s | Toolry",
  },
  description:
    "광고 없는 무료 온라인 유틸리티 도구 모음. 정규식 테스터, JSON 포맷터, 색상 변환기, 타임스탬프 변환기, URL 인코더/디코더, 해시 생성기, 텍스트 비교 등을 제공합니다. 모든 처리는 브라우저에서 이루어집니다.",
  metadataBase: new URL("https://jaeseong90.github.io"),
  alternates: {
    canonical: "/Toolry",
  },
  openGraph: {
    title: "Toolry - 개발자를 위한 무료 온라인 도구 모음",
    description: "광고 없는 무료 온라인 유틸리티 도구 모음. 모든 처리는 브라우저에서 이루어집니다.",
    url: "https://jaeseong90.github.io/Toolry",
    siteName: "Toolry",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolry - 개발자를 위한 무료 온라인 도구 모음",
    description: "광고 없는 무료 온라인 유틸리티 도구 모음",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/Toolry/favicon.svg",
  },
  manifest: "/Toolry/manifest.json",
  other: {
    "theme-color": "#10b981",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Toolry",
              url: "https://jaeseong90.github.io/Toolry",
              description: "개발자를 위한 광고 없는 무료 온라인 유틸리티 도구 모음",
              inLanguage: "ko",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://jaeseong90.github.io/Toolry?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
