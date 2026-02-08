import prisma from '@/app/lib/prisma';

export interface CreateTodoInput {
  title: string;
  description?: string;
  userId?: number;
}

export async function createTodo(input: CreateTodoInput) {
  const todo = await prisma.todo.create({
    data: {
      title: input.title,
      description: input.description,
      userId: input.userId,
    },
  });
  return todo;
}
