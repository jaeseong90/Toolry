import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "글자수 카운터",
  description: "글자수, 단어수, 바이트수를 실시간으로 확인하세요. 한글, 영문, 숫자 별도 카운트를 지원합니다.",
  alternates: { canonical: "/Toolry/counter" },
  openGraph: {
    title: "글자수 카운터 | Toolry",
    description: "글자수, 단어수, 바이트수를 실시간으로 확인하세요.",
    url: "https://toolry.kr/Toolry/counter",
  },
  twitter: { card: "summary", title: "글자수 카운터 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
