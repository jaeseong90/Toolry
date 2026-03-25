import type { Metadata } from "next";
import ToolStructuredData from "@/components/ToolStructuredData";

export const metadata: Metadata = {
  title: "Lorem Ipsum 생성기",
  description: "더미 텍스트를 원하는 분량만큼 생성하세요. 문단, 문장, 단어 단위로 생성 가능합니다.",
  alternates: { canonical: "/Toolry/lorem" },
  openGraph: {
    title: "Lorem Ipsum 생성기 | Toolry",
    description: "더미 텍스트를 원하는 분량만큼 생성하세요.",
    url: "https://jaeseong90.github.io/Toolry/lorem",
  },
  twitter: { card: "summary", title: "Lorem Ipsum 생성기 | Toolry" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolStructuredData slug="lorem" /></>;
}
