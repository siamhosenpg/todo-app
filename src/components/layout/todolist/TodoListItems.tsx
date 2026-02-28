"use client";

import TodoItem from "@/components/TodoItem";
import { useTodoSearch } from "@/context/TodoSearchContext";

export default function TodoListItems({
  initialTodos,
}: {
  initialTodos: any[];
}) {
  const { query, results, isPending } = useTodoSearch();

  const isSearching = query.trim().length > 0;

  const todosToShow =
    isSearching && results.length > 0 ? results : initialTodos;

  return (
    <div className="space-y-4">
      <div
        className={`grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 ${isPending ? "opacity-50 transition" : "transition"}`}
      >
        {todosToShow.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </div>

      {isSearching && !isPending && results.length === 0 && (
        <p className="text-center text-gray-500">No todos found</p>
      )}
    </div>
  );
}
