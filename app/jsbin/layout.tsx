import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JS 플레이그라운드",
  description: "HTML, CSS, JavaScript를 바로 작성하고 실행 결과를 확인하세요. JSBin과 유사한 실시간 코드 에디터입니다.",
  alternates: { canonical: "/Toolry/jsbin" },
  openGraph: {
    title: "JS 플레이그라운드 | Toolry",
    description: "HTML, CSS, JavaScript를 바로 작성하고 실행 결과를 확인하세요.",
    url: "https://toolry.kr/Toolry/jsbin",
  },
  twitter: { card: "summary", title: "JS 플레이그라운드 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
