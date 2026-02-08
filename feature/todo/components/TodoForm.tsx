'use client';

import { useActionState } from 'react';
import { createTodoAction } from '@/feature/todo/actions/createTodo.action';

export default function TodoForm() {
  const [state, formAction, pending] = useActionState(createTodoAction, null);

  return (
    <form action={formAction} className="w-full max-w-[500px]">
      <div className="flex items-center gap-3">
        <input
          type="text"
          name="title"
          placeholder="할 일을 입력하세요"
          className="h-[52px] flex-1 rounded-xl border-2 border-zinc-200 bg-white px-5 text-base text-zinc-800 outline-none transition-all placeholder:text-zinc-400 focus:border-[#03c057] focus:shadow-[0_0_0_3px_rgba(3,192,87,0.15)] disabled:cursor-not-allowed disabled:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:shadow-[0_0_0_3px_rgba(3,192,87,0.2)] dark:disabled:bg-zinc-900"
          required
          disabled={pending}
        />
        <button
          type="submit"
          className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-xl border-none bg-[#03c057] text-white transition-all hover:translate-y-[-1px] hover:bg-[#02a34a] hover:shadow-[0_4px_12px_rgba(3,192,87,0.3)] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={pending}
        >
          {pending ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </button>
      </div>
      {state?.message && (
        <p
          className={`mt-3 rounded-lg px-4 py-3 text-sm ${
            state.success
              ? 'bg-[#03c057]/10 text-[#03c057]'
              : 'bg-red-500/10 text-red-500'
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
