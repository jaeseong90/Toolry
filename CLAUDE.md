# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Toolry - 개발자용 온라인 유틸리티 도구 모음 사이트 (정적 사이트, 백엔드 없음). 모든 데이터 처리는 브라우저에서 수행되며 서버 전송 없음.

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

## 아키텍처

- **도구 레지스트리**: `lib/tools.ts`의 `tools` 배열이 홈페이지 그리드와 `ToolLayout` 관련 도구 섹션을 구동
- **도구 페이지 패턴**: 각 도구는 `app/<slug>/page.tsx` (클라이언트 컴포넌트, `"use client"` 필수)와 `app/<slug>/layout.tsx` (SEO metadata export)로 구성
- **공통 래퍼**: `ToolLayout` 컴포넌트가 도구 제목, 설명, 하단 관련 도구 네비게이션을 자동 제공

## 디자인 시스템 (Tailwind)

- 다크 모드 전용 (`class` 전략, `<html lang="ko" className="dark">`)
- 커스텀 색상: `bg` (#0f1117), `surface` (#1a1d27), `accent` (#6ee7b7)
- 폰트: Syne (heading), DM Sans (body/sans), DM Mono (mono)

## 새 도구 추가 방법

1. `lib/tools.ts`에 도구 메타데이터 추가 (`slug`, `name`, `description`, `icon`)
2. `app/<slug>/page.tsx` 생성 — `"use client"` 지시어 필수, `<ToolLayout slug="<slug>">` 으로 감쌈
3. `app/<slug>/layout.tsx` 생성 — SEO용 `Metadata` export

## Git 브랜치 규칙

- **반드시 `main` 브랜치에서만 작업**한다. 별도 feature 브랜치를 만들지 않는다.
- 커밋 후 `main` 브랜치에 직접 push한다.
- 브랜치를 새로 만들거나 PR을 생성하지 않는다.

## 주의사항

- `next.config.mjs`에 `basePath: "/Toolry"` 설정됨 (GitHub Pages 배포용)
- `output: "export"` — 정적 빌드 전용, API Routes 사용 불가
- `images.unoptimized: true` — 정적 배포에서는 이미지 최적화 비활성화
- 로컬 개발 시 basePath 때문에 `http://localhost:3000/Toolry`로 접근
