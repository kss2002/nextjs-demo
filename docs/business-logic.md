# 비즈니스 로직

## 아키텍처 개요

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Components    │ ──▶ │  Server Actions │ ──▶ │   Data Access   │ ──▶ │    Database     │
│   (UI Layer)    │     │ (Business Logic)│     │  (Prisma ORM)   │     │  (PostgreSQL)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 레이어 설명

### 1. Components (UI Layer)

**위치**: `feature/*/components/`

사용자 인터페이스를 담당합니다.

- React 컴포넌트
- 폼 입력 처리
- 상태 표시 (로딩, 에러 등)

```tsx
// feature/todo/components/TodoForm.tsx
'use client';
import { useActionState } from 'react';
import { createTodoAction } from '@/feature/todo/actions/createTodo.action';

export default function TodoForm() {
  const [state, formAction, pending] = useActionState(createTodoAction, null);
  // ...
}
```

### 2. Server Actions (Business Logic)

**위치**: `feature/*/actions/`

비즈니스 로직을 담당합니다.

- 입력 유효성 검사
- 에러 처리
- 캐시 무효화 (revalidatePath)

```tsx
// feature/todo/actions/createTodo.action.ts
'use server';
import { createTodo } from '@/data-access/createTodo';

export async function createTodoAction(prevState, formData) {
  const title = formData.get('title');

  if (!title) {
    return { success: false, message: '제목을 입력해주세요.' };
  }

  await createTodo({ title });
  revalidatePath('/');

  return { success: true, message: '할 일이 추가되었습니다.' };
}
```

### 3. Data Access (Database Layer)

**위치**: `data-access/`

데이터베이스 접근을 담당합니다.

- Prisma를 사용한 CRUD 작업
- 순수한 데이터 접근 로직만 포함

```tsx
// data-access/createTodo.ts
import prisma from '@/app/lib/prisma';

export async function createTodo(input) {
  return await prisma.todo.create({
    data: {
      title: input.title,
      description: input.description,
    },
  });
}
```

## 데이터 흐름 예시

### Todo 생성 흐름

1. **사용자 입력**: TodoForm에서 할 일 제목 입력
2. **폼 제출**: `formAction` 호출
3. **서버 액션**: `createTodoAction`에서 유효성 검사 후 `createTodo` 호출
4. **데이터 저장**: Prisma가 PostgreSQL에 데이터 저장
5. **캐시 갱신**: `revalidatePath("/")`로 페이지 데이터 갱신
6. **UI 업데이트**: 새로운 할 일이 리스트에 표시됨
