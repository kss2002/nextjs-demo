'use server';

import {
  getTodos,
  getTodoById,
  getTodosByCompleted,
} from '@/data-access/getTodo';

// 모든 할 일 가져오기
export async function getTodosAction() {
  try {
    const todos = await getTodos();
    return { success: true, data: todos };
  } catch (error) {
    console.error('Todo 조회 실패:', error);
    return { success: false, data: [], message: '할 일 조회에 실패했습니다.' };
  }
}

// 특정 할 일 가져오기
export async function getTodoByIdAction(id: number) {
  try {
    const todo = await getTodoById(id);
    if (!todo) {
      return {
        success: false,
        data: null,
        message: '할 일을 찾을 수 없습니다.',
      };
    }
    return { success: true, data: todo };
  } catch (error) {
    console.error('Todo 조회 실패:', error);
    return {
      success: false,
      data: null,
      message: '할 일 조회에 실패했습니다.',
    };
  }
}

// 완료/미완료 할 일 가져오기
export async function getTodosByCompletedAction(completed: boolean) {
  try {
    const todos = await getTodosByCompleted(completed);
    return { success: true, data: todos };
  } catch (error) {
    console.error('Todo 조회 실패:', error);
    return { success: false, data: [], message: '할 일 조회에 실패했습니다.' };
  }
}
