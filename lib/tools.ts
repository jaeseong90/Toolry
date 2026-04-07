export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const tools: Tool[] = [
  {
    slug: "jsbin",
    name: "JS 플레이그라운드",
    description: "HTML, CSS, JavaScript를 바로 작성하고 실행 결과를 확인하세요",
    icon: "/>",
  },
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
  {
    slug: "base64",
    name: "Base64 인코더/디코더",
    description: "텍스트를 Base64로 인코딩하거나 디코딩하세요",
    icon: "b64",
  },
  {
    slug: "hash",
    name: "해시 생성기",
    description: "MD5, SHA-1, SHA-256 등 다양한 해시를 생성하세요",
    icon: "#",
  },
  {
    slug: "html5",
    name: "HTML 엔티티 변환기",
    description: "HTML 특수문자와 엔티티를 인코딩/디코딩하세요",
    icon: "<>",
  },
  {
    slug: "lorem",
    name: "Lorem Ipsum 생성기",
    description: "더미 텍스트를 원하는 분량만큼 생성하세요",
    icon: "Aa",
  },
  {
    slug: "case",
    name: "케이스 변환기",
    description: "camelCase, snake_case, PascalCase, kebab-case 등으로 변환하세요",
    icon: "aA",
  },
  {
    slug: "column",
    name: "컬럼명 변환기",
    description: "한글 단어를 입력하면 영문 컬럼명/변수명을 추천해드립니다",
    icon: "한A",
  },
  {
    slug: "diff",
    name: "텍스트 비교",
    description: "두 텍스트의 차이점을 한눈에 비교하세요",
    icon: "±",
  },
  {
    slug: "counter",
    name: "글자수 카운터",
    description: "글자수, 단어수, 바이트수를 실시간으로 확인하세요",
    icon: "T#",
  },
  {
    slug: "number",
    name: "숫자 포맷터",
    description: "천단위 콤마, 한글 금액 변환 등 숫자를 다양하게 포맷합니다",
    icon: "1,2",
  },
];
