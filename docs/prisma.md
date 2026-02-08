# Prisma ORM

## 개요

Prisma는 Node.js와 TypeScript를 위한 ORM(Object-Relational Mapping)입니다.
타입 안전한 데이터베이스 쿼리를 작성할 수 있습니다.

## 파일 구조

```
prisma/
├── schema.prisma      # 데이터베이스 스키마 정의
└── migrations/        # 마이그레이션 히스토리
    └── 20260202.../
        └── migration.sql

prisma.config.ts       # Prisma CLI 설정 (Prisma 7+)
app/lib/prisma.ts      # Prisma 클라이언트 싱글톤
app/generated/prisma/  # 자동 생성된 클라이언트
```

## 스키마 정의

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  todos     Todo[]
}

model Todo {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      Int?
  user        User?    @relation(fields: [userId], references: [id])
}
```

## Prisma 클라이언트 (Prisma 7)

Prisma 7에서는 `adapter`를 사용하여 데이터베이스에 연결합니다.

```typescript
// app/lib/prisma.ts
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

## 주요 명령어

```bash
# Prisma 클라이언트 생성
yarn db:generate

# 마이그레이션 생성 및 적용
yarn db:migrate

# 스키마를 DB에 바로 푸시 (개발용)
yarn db:push

# Prisma Studio 실행 (DB GUI)
yarn db:studio
```

## 사용 예시

```typescript
import prisma from '@/app/lib/prisma';

// 생성
const todo = await prisma.todo.create({
  data: { title: '할 일' },
});

// 조회
const todos = await prisma.todo.findMany();
const todo = await prisma.todo.findUnique({ where: { id: 1 } });

// 수정
await prisma.todo.update({
  where: { id: 1 },
  data: { completed: true },
});

// 삭제
await prisma.todo.delete({ where: { id: 1 } });
```
