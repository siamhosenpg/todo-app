"use client";

import { useOptimistic, useRef, useState, useTransition } from "react";
import { createTodo } from "@/app/actions/todoActions";

type Todo = {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  pending?: boolean;
};

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  // Optimistic todos array
  const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], Todo>(
    [],
    (state, newTodo) => [newTodo, ...state],
  );

  // Generate temporary ID without uuid
  function generateTempId() {
    return "temp-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const tempId = generateTempId();
    const newOptimisticTodo: Todo = {
      _id: tempId,
      title,
      description,
      completed: false,
      pending: true, // mark as pending for UI
    };

    // ✅ Wrap optimistic update in startTransition
    startTransition(() => {
      addOptimisticTodo(newOptimisticTodo);
    });

    // Server action call
    startTransition(async () => {
      try {
        const result = await createTodo(null, { title, description });

        if (result?.error) {
          // Rollback optimistic todo if validation fails
          addOptimisticTodo((state) => state.filter((t) => t._id !== tempId));
          alert(result.error.title?.[0] || result.error.description?.[0]);
        } else {
          // Replace optimistic todo with real todo from server
          addOptimisticTodo((state) =>
            state.map((t) =>
              t._id === tempId ? { ...result.todo, pending: false } : t,
            ),
          );
        }
      } catch (err) {
        // Network error rollback
        addOptimisticTodo((state) => state.filter((t) => t._id !== tempId));
        alert("Failed to create todo. Try again.");
      } finally {
        // Reset form
        setTitle("");
        setDescription("");
        formRef.current?.reset();
      }
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full"
    >
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-4 py-2 rounded-md w-full"
        placeholder="Title..."
        required
      />
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-4 py-2 rounded-md w-full"
        placeholder="Description (optional)"
      />
      <button
        className="bg-black text-white px-4 py-2 rounded-md w-fit"
        disabled={isPending}
      >
        Add Todo
      </button>
    </form>
  );
}
