# Pages CMS Notion 스타일 에디터 전환(자체 호스팅)

현재 사용 중인 `app.pagescms.org`(호스팅 버전)는 설정/기능 커스터마이즈가 제한적이라,
노션 느낌의 에디터 UI(툴바/업로드 UX 강한 커스텀)를 만들려면 **Pages CMS 자체를 직접 호스팅**해야 해요.

## 목표
- 노션처럼 텍스트 편집기가 되는 커스텀 에디터로 글쓰기 UI 개선
- 이미지 붙여넣기/드래그&드롭 업로드 UX를 직접 제어
- 블로그 글 저장은 기존처럼 GitHub repo(main 브랜치)에 commit

## 적용 순서

1. Pages CMS 소스 가져오기

```bash

git clone https://github.com/pagescms/pagescms.git
cd pagescms
npm install
```

2. PostgreSQL 띄우기

```bash
docker run --name pagescms-db \
  -e POSTGRES_USER=pagescms \
  -e POSTGRES_PASSWORD=pagescms \
  -e POSTGRES_DB=pagescms \
  -p 5432:5432 \
  -d postgres:16
```

3. 환경변수 준비(`.env.local`)

```bash
DATABASE_URL=postgresql://pagescms:pagescms@localhost:5432/pagescms
BETTER_AUTH_SECRET=<랜덤값>
CRYPTO_KEY=<랜덤값>
BASE_URL=http://localhost:3000
ADMIN_EMAILS=<네 로그인 이메일>
```

랜덤값 생성:

```bash
openssl rand -base64 32
```

4. GitHub App 생성

```bash
npm run setup:github-app -- --base-url http://localhost:3000 --env .env.local
```

5. DB 마이그레이션/실행

```bash
npm run db:migrate
npm run dev
```

6. GitHub App 설정 값이 들어간 `Base URL`, webhook URL이 모두 `http://localhost:3000`으로 일치하는지 확인

7. 블로그의 `.pages.yml`은 기존 방식 그대로 사용 가능하되, 에디터는 내가 원하는 대로 커스텀 필드/컴포넌트로 변경

- `fields/core`나 `fields/custom`에 새 field를 추가하여 body 에디터를 조합
- 혹은 pagescms에서 제공하는 editor 컴포넌트를 포크해서 직접 UI/스타일 변경
- 문서: https://pagescms.org/docs/guides/creating-custom-field/

## 배포(운영)

로컬이 끝나면 Vercel/자체 서버로 배포
- https://pagescms.org/docs/guides/installing/vercel/
- https://pagescms.org/docs/guides/installing/self-host/
- GitHub App 설정은 `BASE_URL`, callback/webhook/setup URL 모두 운영 URL로 통일

## 참고

- 설치/배포 공식 가이드: https://pagescms.org/docs/guides/installing/
- GitHub App 가이드: https://pagescms.org/docs/guides/installing/github-app/
