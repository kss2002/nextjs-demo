# 시작하기

## 사전 요구사항

- Node.js 18+
- Yarn
- Docker Desktop

## 설치 및 실행

### 1. 의존성 설치

```bash
yarn install
```

### 2. Docker PostgreSQL 시작

```bash
yarn db:up
```

### 3. Prisma 설정

```bash
# 클라이언트 생성
yarn db:generate

# 마이그레이션 실행
yarn db:migrate
```

### 4. 개발 서버 실행

```bash
yarn dev
```

브라우저에서 http://localhost:3000 접속

## 유용한 명령어

### 개발

```bash
yarn dev          # 개발 서버 실행
yarn build        # 프로덕션 빌드
yarn start        # 프로덕션 서버 실행
yarn lint         # ESLint 실행
```

### 데이터베이스

```bash
yarn db:up        # Docker PostgreSQL 시작
yarn db:down      # Docker PostgreSQL 중지
yarn db:generate  # Prisma 클라이언트 생성
yarn db:migrate   # 마이그레이션 실행
yarn db:push      # 스키마 DB에 푸시
yarn db:studio    # Prisma Studio 실행
```

## 개발 워크플로우

### 새로운 모델 추가 시

1. `prisma/schema.prisma`에 모델 추가
2. `yarn db:migrate` 실행 (마이그레이션 이름 입력)
3. 코드에서 새 모델 사용

### 스키마 수정 시 (개발 중)

1. `prisma/schema.prisma` 수정
2. `yarn db:push` 실행 (빠른 반영, 마이그레이션 생성 안함)

## 환경 변수

| 변수           | 설명                   |
| -------------- | ---------------------- |
| `DATABASE_URL` | PostgreSQL 연결 문자열 |

## 문제 해결

### Prisma 클라이언트 타입 에러

```bash
yarn db:generate
```

그래도 안되면 VSCode에서 `Cmd + Shift + P` → `TypeScript: Restart TS Server`

### 데이터베이스 연결 실패

```bash
# Docker 컨테이너 상태 확인
docker ps

# 컨테이너가 없으면 시작
yarn db:up
```
