import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "색상 변환기",
  description: "HEX, RGB, HSL 색상 포맷을 자유롭게 변환하세요. 색상 피커와 실시간 미리보기를 제공합니다.",
  alternates: { canonical: "/Toolry/color" },
  openGraph: {
    title: "색상 변환기 | Toolry",
    description: "HEX, RGB, HSL 색상 포맷을 자유롭게 변환하세요.",
    url: "https://jaeseong90.github.io/color",
  },
  twitter: { card: "summary", title: "색상 변환기 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
