import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON 포맷터",
  description: "JSON 데이터를 보기 좋게 정렬(Beautify)하거나 압축(Minify)하세요. 실시간 검증 및 에러 위치 표시 기능을 제공합니다.",
  alternates: { canonical: "/Toolry/json" },
  openGraph: {
    title: "JSON 포맷터 | Toolry",
    description: "JSON 데이터를 보기 좋게 정렬하거나 압축하세요.",
    url: "https://jaeseong90.github.io/json",
  },
  twitter: { card: "summary", title: "JSON 포맷터 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
