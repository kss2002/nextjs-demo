import prisma from '@/app/lib/prisma';

// 모든 Todo 조회
export async function getTodos() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return todos;
}

// 특정 Todo 조회
export async function getTodoById(id: number) {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });
  return todo;
}

// 사용자별 Todo 조회
export async function getTodosByUserId(userId: number) {
  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return todos;
}

// 완료/미완료 Todo 조회
export async function getTodosByCompleted(completed: boolean) {
  const todos = await prisma.todo.findMany({
    where: { completed },
    orderBy: { createdAt: 'desc' },
  });
  return todos;
}
