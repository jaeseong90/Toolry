export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const tools: Tool[] = [
  {
    slug: "regex",
    name: "정규식 테스터",
    description: "정규표현식을 실시간으로 테스트하고 매칭 결과를 확인하세요",
    icon: ".*",
  },
  {
    slug: "json",
    name: "JSON 포맷터",
    description: "JSON 데이터를 보기 좋게 정렬하거나 압축하세요",
    icon: "{}",
  },
  {
    slug: "color",
    name: "색상 변환기",
    description: "HEX, RGB, HSL 색상 포맷을 자유롭게 변환하세요",
    icon: "🎨",
  },
  {
    slug: "timestamp",
    name: "타임스탬프 변환기",
    description: "Unix 타임스탬프와 날짜/시간을 변환하세요",
    icon: "⏱",
  },
  {
    slug: "url",
    name: "URL 인코더/디코더",
    description: "URL을 인코딩하거나 디코딩하세요",
    icon: "%",
  },
];
