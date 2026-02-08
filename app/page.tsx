import TodoForm from '@/feature/todo/components/TodoForm';
import { getTodosAction } from '@/feature/todo/actions/getTodo.action';

export default async function Home() {
  const { data: todos } = await getTodosAction();

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-900">
      <main className="w-full max-w-xl">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Todo
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            오늘 할 일을 관리하세요
          </p>
        </header>

        {/* Todo Form */}
        <section className="mb-8">
          <TodoForm />
        </section>

        {/* Todo List */}
        <section>
          {todos.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-zinc-400 dark:text-zinc-500">
                아직 할 일이 없습니다
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-800"
                >
                  <div
                    className={`h-5 w-5 flex-shrink-0 rounded-full border-2 ${
                      todo.completed
                        ? 'border-[#03c057] bg-[#03c057]'
                        : 'border-zinc-300 dark:border-zinc-600'
                    }`}
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? 'text-zinc-400 line-through dark:text-zinc-500'
                        : 'text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    {todo.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
