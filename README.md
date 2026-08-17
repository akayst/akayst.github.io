# Astro GitHub Pages 블로그

Markdown으로 글을 쓰고 `main` 브랜치에 push하면 GitHub Pages로 자동 배포되는 개인 블로그입니다.

## 로컬 실행

```bash
pnpm install
pnpm dev
```

## 기본 정보 변경

`src/config.ts`에서 블로그 제목, 소개, 작성자와 연락처를 변경합니다.

## 글 작성

`src/content/blog`에 `.md` 파일을 추가합니다.

```md
---
title: "글 제목"
description: "글 설명"
pubDate: 2024-03-15
updatedDate: 2026-08-17
category: "개발"
tags: ["Astro", "GitHub"]
draft: false
---

본문
```

미래 날짜의 글과 `draft: true`인 글은 공개되지 않습니다.

## GitHub Pages 배포

1. GitHub에서 저장소를 만듭니다. 사용자 사이트라면 저장소 이름을 `<사용자명>.github.io`로 지정합니다.
2. 이 폴더에 원격 저장소를 연결하고 `main` 브랜치를 push합니다.
3. 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
4. Actions의 배포가 끝나면 Pages 주소로 접속합니다.

프로젝트 저장소 이름을 사용해도 빌드 시 주소를 자동 계산합니다. 개인 도메인을 사용할 때는 Actions 변수 `SITE_URL`에 `https://example.com`을 지정하고 `public/CNAME` 파일에 도메인을 적습니다.

## AdSense

승인 후 `src/config.ts`의 `adsenseClient`에 게시자 ID를 입력하고, `public/ads.txt`를 AdSense에서 제공한 값으로 교체합니다. 실제 광고 단위는 `AdSlot.astro` 컴포넌트에 광고 슬롯 ID를 전달해 배치할 수 있습니다.

개인정보처리방침은 실제 운영자 정보와 사용하는 분석·광고 서비스에 맞게 반드시 수정하세요.
