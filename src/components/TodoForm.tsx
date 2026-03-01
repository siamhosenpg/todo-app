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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function generateTempId() {
    return "temp-" + Date.now();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSuccessMessage(null);
    setErrorMessage(null);

    const tempId = generateTempId();

    const optimisticTodo: Todo = {
      _id: tempId,
      title,
      description,
      completed: false,
      pending: true,
    };

    updateOptimistic(optimisticTodo);

    startTransition(async () => {
      try {
        const result = await createTodo(null, { title, description });

        // ❌ Validation error
        if (result?.error) {
          updateOptimistic((state: Todo[]) =>
            state.filter((t) => t._id !== tempId),
          );

          setErrorMessage(
            result.error.title?.[0] ||
              result.error.description?.[0] ||
              "Validation failed",
          );

          return;
        }

        // ✅ Success
        if (result?.todo) {
          updateOptimistic((state: Todo[]) =>
            state.map((t) =>
              t._id === tempId ? { ...result.todo, pending: false } : t,
            ),
          );

          setSuccessMessage("Todo created successfully!");

          setTitle("");
          setDescription("");
          formRef.current?.reset();
        }
      } catch (error) {
        updateOptimistic((state: Todo[]) =>
          state.filter((t) => t._id !== tempId),
        );

        setErrorMessage("Something went wrong. Try again.");
      }

      // 🔥 Auto hide after 3 sec
      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);
    });
  }

  return (
    <div>
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
          className="bg-green-300 shrink-0 font-medium px-6 py-2 rounded-full w-fit cursor-pointer disabled:cursor-not-allowed disabled:bg-green-200"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Add Todo"}
        </button>
      </form>

      {/* 🔥 Status Messages */}
      <div className="mt-2 min-h-6">
        {successMessage && (
          <p className="text-green-600 text-sm">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
    </div>
  );
}
