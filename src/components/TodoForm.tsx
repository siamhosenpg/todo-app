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
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  // ✅ Fix: allow both Todo and updater function
  const [optimisticTodos, addOptimisticTodo] = useOptimistic<
    Todo[],
    Todo | ((state: Todo[]) => Todo[])
  >([], (state, action) => {
    if (typeof action === "function") {
      return action(state);
    }
    return [action, ...state];
  });

  function generateTempId(): string {
    return "temp-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const tempId = generateTempId();

    const newOptimisticTodo: Todo = {
      _id: tempId,
      title,
      description,
      completed: false,
      pending: true,
    };

    startTransition(() => {
      addOptimisticTodo(newOptimisticTodo);
    });

    startTransition(async () => {
      try {
        const result = await createTodo(null, { title, description });

        if (result?.error) {
          addOptimisticTodo((state) => state.filter((t) => t._id !== tempId));

          alert(result.error.title?.[0] || result.error.description?.[0]);
        } else if (result?.todo) {
          addOptimisticTodo((state) =>
            state.map((t) =>
              t._id === tempId ? { ...result.todo, pending: false } : t,
            ),
          );
        }
      } catch (err) {
        addOptimisticTodo((state) => state.filter((t) => t._id !== tempId));

        alert("Failed to create todo. Try again.");
      } finally {
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
      className="flex flex-col md:flex-row gap-2 w-full md:w-200"
    >
      <input
        name="title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        className="border border-border bg-background outline-0 px-6 py-2 rounded-full w-full"
        placeholder="Title..."
        required
      />
      <input
        name="description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        className="border border-border bg-background outline-0 px-6 py-2  rounded-full w-full"
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
