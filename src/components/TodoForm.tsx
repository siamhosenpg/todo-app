"use client";

import { useOptimistic, useRef } from "react";
import { createTodo } from "@/app/actions/todoActions";

type Todo = {
  _id?: string;
  title: string;
  completed: boolean;
  pending?: boolean;
};

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], string>(
    [],
    (state, newTitle) => [
      {
        _id: Math.random().toString(),
        title: newTitle,
        completed: false,
        pending: true,
      },
      ...state,
    ],
  );

  async function action(formData: FormData) {
    const title = formData.get("title") as string;

    addOptimisticTodo(title);

    const result = await createTodo(null, formData);

    if (result?.error) {
      alert(result.error.title?.[0]);
    }

    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={action} className="flex gap-2">
      <input
        name="title"
        className="border p-2 flex-1"
        placeholder="Add todo..."
      />
      <button className="bg-black text-white px-4">Add</button>
    </form>
  );
}
