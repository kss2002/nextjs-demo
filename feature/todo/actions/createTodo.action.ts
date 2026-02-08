'use server';

import { revalidatePath } from 'next/cache';
import { createTodo } from '@/data-access/createTodo';

export interface CreateTodoActionState {
  success: boolean;
  message: string;
}

export async function createTodoAction(
  _prevState: CreateTodoActionState | null,
  formData: FormData,
): Promise<CreateTodoActionState> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string | null;

  if (!title || title.trim() === '') {
    return {
      success: false,
      message: '제목을 입력해주세요.',
    };
  }

  try {
    await createTodo({
      title: title.trim(),
      description: description?.trim() || undefined,
    });

    revalidatePath('/');

    return {
      success: true,
      message: '할 일이 추가되었습니다.',
    };
  } catch (error) {
    console.error('Todo 생성 실패:', error);
    return {
      success: false,
      message: '할 일 추가에 실패했습니다.',
    };
  }
}
