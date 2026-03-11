import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML 엔티티 변환기",
  description: "HTML 특수문자를 엔티티로 인코딩하거나, HTML 엔티티를 원래 문자로 디코딩하세요. &lt; &gt; &amp; &quot; 등 주요 엔티티 참조표를 제공합니다.",
  alternates: { canonical: "/Toolry/html5" },
  openGraph: {
    title: "HTML 엔티티 변환기 | Toolry",
    description: "HTML 특수문자와 엔티티를 자유롭게 변환하세요.",
    url: "https://jaeseong90.github.io/Toolry/html5",
  },
  twitter: { card: "summary", title: "HTML 엔티티 변환기 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
