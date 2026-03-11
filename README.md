# Toolry

[![Site](https://img.shields.io/badge/사이트-GitHub%20Pages-10b981?style=flat-square)](https://jaeseong90.github.io/Toolry)
[![GitHub](https://img.shields.io/github/stars/jaeseong90/Toolry?style=flat-square)](https://github.com/jaeseong90/Toolry)

개발자와 사무직 직장인을 위한 **광고 없는 무료 온라인 유틸리티 툴 모음** 웹사이트입니다.

> 모든 데이터 처리는 브라우저에서 이루어지며, 서버로 전송되지 않습니다.

🔗 **사이트 바로가기**: [https://jaeseong90.github.io/Toolry](https://jaeseong90.github.io/Toolry)

## 제공 도구

| 도구 | 경로 | 설명 |
|------|------|------|
| 정규식 테스터 | `/regex` | 정규표현식 실시간 테스트 및 매칭 결과 확인 |
| JSON 포맷터 | `/json` | JSON Beautify / Minify / Validate |
| 색상 변환기 | `/color` | HEX, RGB, HSL 상호 변환 |
| 타임스탬프 변환기 | `/timestamp` | Unix Timestamp ↔ 날짜/시간 변환 |
| URL 인코더/디코더 | `/url` | URL 인코딩 및 디코딩 |
| Base64 인코더/디코더 | `/base64` | 텍스트 ↔ Base64 변환 |
| 해시 생성기 | `/hash` | SHA-1, SHA-256, SHA-384, SHA-512 해시 생성 |
| HTML 엔티티 변환기 | `/html5` | HTML 특수문자 ↔ 엔티티 변환 |
| Lorem Ipsum 생성기 | `/lorem` | 더미 텍스트 생성 |
| 케이스 변환기 | `/case` | camelCase, snake_case, PascalCase 등 변환 |
| 컬럼명 변환기 | `/column` | 한글 → 영문 컬럼명/변수명 추천 |
| 텍스트 비교 | `/diff` | 두 텍스트 차이점 비교 (LCS 기반) |
| 글자수 카운터 | `/counter` | 글자수, 단어수, 바이트수 실시간 확인 |
| 숫자 포맷터 | `/number` | 천단위 콤마, 한글 금액, 진법 변환 |
| JS 플레이그라운드 | `/jsbin` | HTML/CSS/JS 실시간 코딩 및 실행 |

## 기술 스택

- **Framework**: Next.js 14 (App Router, Static Export)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **배포**: GitHub Pages (GitHub Actions)

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000/Toolry](http://localhost:3000/Toolry)를 열어 확인하세요.

## 새 도구 추가 방법

1. `lib/tools.ts`의 `tools` 배열에 새 도구 메타데이터를 추가합니다.
2. `app/<slug>/page.tsx`에 도구 페이지 컴포넌트를 생성합니다.
3. `app/<slug>/layout.tsx`에 SEO metadata를 설정합니다.
4. `ToolLayout` 컴포넌트로 감싸면 공통 레이아웃이 자동 적용됩니다.

## 라이선스

MIT
