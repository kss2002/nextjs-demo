# 프로젝트 구조

```
next-demo/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈페이지 (Todo 앱)
│   ├── globals.css               # 전역 스타일
│   ├── lib/
│   │   └── prisma.ts             # Prisma 클라이언트 싱글톤
│   └── generated/
│       └── prisma/               # Prisma 자동 생성 파일
│
├── feature/                      # 기능별 모듈
│   └── todo/
│       ├── README.md
│       ├── actions/              # 서버 액션
│       │   ├── createTodo.action.ts
│       │   └── getTodo.action.ts
│       └── components/           # UI 컴포넌트
│           └── TodoForm.tsx
│
├── data-access/                  # 데이터 접근 계층
│   ├── createTodo.ts             # Todo 생성
│   └── getTodo.ts                # Todo 조회
│
├── prisma/
│   ├── schema.prisma             # 데이터베이스 스키마
│   └── migrations/               # 마이그레이션 파일들
│
├── docker-compose.yml            # Docker 설정
├── prisma.config.ts              # Prisma CLI 설정
├── .env                          # 환경 변수
└── package.json
```

## 디렉토리 설명

### `app/`

Next.js 15+ App Router 디렉토리. 라우팅과 레이아웃을 담당합니다.

### `feature/`

기능별로 모듈화된 코드를 담습니다. 각 feature는 독립적인 비즈니스 로직을 가집니다.

- `actions/` - Next.js 서버 액션
- `components/` - 해당 기능의 UI 컴포넌트

### `data-access/`

데이터베이스 접근 로직을 담습니다. Prisma를 사용한 CRUD 함수들이 위치합니다.

### `prisma/`

Prisma ORM 관련 파일들입니다.

- `schema.prisma` - 데이터베이스 모델 정의
- `migrations/` - 데이터베이스 마이그레이션 기록
