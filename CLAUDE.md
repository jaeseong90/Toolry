# CLAUDE.md

## 프로젝트 개요

Toolry - 개발자용 온라인 유틸리티 도구 모음 사이트 (정적 사이트, 백엔드 없음)

## 기술 스택

- **Framework**: Next.js 14 (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **배포**: GitHub Pages (GitHub Actions)

## 주요 명령어

```bash
npm run dev      # 로컬 개발 서버 (http://localhost:3000)
npm run build    # 정적 빌드 (out/ 폴더 생성)
npm run lint     # ESLint 검사
```

## 프로젝트 구조

```
app/             # Next.js App Router 페이지
  layout.tsx     # 루트 레이아웃 (폰트, 메타데이터)
  page.tsx       # 홈페이지 (도구 목록)
  color/         # Color Picker 도구
  json/          # JSON Formatter 도구
  regex/         # Regex Tester 도구
  timestamp/     # Timestamp Converter 도구
  url/           # URL Encoder/Decoder 도구
components/      # 공통 컴포넌트
  Header.tsx     # 상단 네비게이션
  ToolCard.tsx   # 홈 도구 카드
  ToolLayout.tsx # 도구 페이지 공통 레이아웃
  CopyButton.tsx # 복사 버튼
lib/
  tools.ts       # 도구 메타데이터 (이름, 설명, 경로, 아이콘)
```

## 새 도구 추가 방법

1. `lib/tools.ts`에 도구 메타데이터 추가
2. `app/<tool-name>/page.tsx` 페이지 생성
3. `ToolLayout` 컴포넌트로 감싸서 일관된 UI 유지

## 주의사항

- `next.config.mjs`에 `basePath: "/Toolry"` 설정됨 (GitHub Pages 배포용)
- `output: "export"` — 정적 빌드 전용, API Routes 사용 불가
- `images.unoptimized: true` — 정적 배포에서는 이미지 최적화 비활성화
- 로컬 개발 시 basePath 때문에 `http://localhost:3000/Toolry`로 접근
