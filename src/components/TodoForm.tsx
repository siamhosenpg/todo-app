"use client";

import { useRef, useState, useTransition } from "react";
import { createTodo } from "@/app/actions/todoActions";
import { Todo } from "@/types/todo";

export default function TodoForm({
  updateOptimistic,
}: {
  updateOptimistic: any;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  function generateTempId(): string {
    return "temp-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const tempId = generateTempId();

    const optimisticTodo: Todo = {
      _id: tempId,
      title,
      description,
      completed: false,
      pending: true,
    };

    // 🔥 1️⃣ Show instantly in UI
    updateOptimistic(optimisticTodo);

    startTransition(async () => {
      try {
        const result = await createTodo(null, { title, description });

        // ❌ Validation fail → rollback
        if (result?.error) {
          updateOptimistic((state: Todo[]) =>
            state.filter((t) => t._id !== tempId),
          );

          alert(result.error.title?.[0] || result.error.description?.[0]);
        }

        // ✅ Success → replace temp with real
        else if (result?.todo) {
          updateOptimistic((state: Todo[]) =>
            state.map((t) =>
              t._id === tempId ? { ...result.todo, pending: false } : t,
            ),
          );
        }
      } catch (error) {
        // ❌ Server crash → rollback
        updateOptimistic((state: Todo[]) =>
          state.filter((t) => t._id !== tempId),
        );

        alert("Failed to create todo. Try again.");
      }
    });

    setTitle("");
    setDescription("");
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-2 w-full md:w-200"
    >
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-border bg-background outline-0 px-6 py-2 rounded-full w-full"
        placeholder="Title..."
        required
      />
      <input
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-border bg-background outline-0 px-6 py-2 rounded-full w-full"
        placeholder="Description (optional)"
      />
      <button
        type="submit"
        className="bg-green-300 shrink-0 font-medium px-6 py-2 rounded-full w-fit"
        disabled={isPending}
      >
        Add Todo
      </button>
    </form>
  );
}
