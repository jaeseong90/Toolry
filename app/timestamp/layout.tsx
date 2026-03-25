import type { Metadata } from "next";
import ToolStructuredData from "@/components/ToolStructuredData";

export const metadata: Metadata = {
  title: "타임스탬프 변환기",
  description: "Unix 타임스탬프와 날짜/시간을 변환하세요. 초/밀리초 단위 지원, KST/UTC 병렬 표시.",
  alternates: { canonical: "/Toolry/timestamp" },
  openGraph: {
    title: "타임스탬프 변환기 | Toolry",
    description: "Unix 타임스탬프와 날짜/시간을 변환하세요.",
    url: "https://jaeseong90.github.io/Toolry/timestamp",
  },
  twitter: { card: "summary", title: "타임스탬프 변환기 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolStructuredData slug="timestamp" /></>;
}
