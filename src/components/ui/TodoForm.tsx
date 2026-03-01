"use client";

import { useRef, useState, useTransition, FormEvent } from "react";
import { createTodo } from "@/app/actions/todoActions";
import { Todo } from "@/types/todo";

// Props type
interface TodoFormProps {
  updateOptimistic: (todoOrUpdater: Todo | ((state: Todo[]) => Todo[])) => void;
}

// ---------------- Response types ----------------
interface CreateTodoSuccess {
  todo: Todo;
  error?: undefined;
}

interface CreateTodoError {
  todo?: undefined;
  error:
    | string // simple error string
    | {
        title?: string[];
        description?: string[];
        [key: string]: string[] | undefined;
      }; // validation errors
}

type CreateTodoResponse = CreateTodoSuccess | CreateTodoError;

// ---------------- Component ----------------
export default function TodoForm({ updateOptimistic }: TodoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Generate temporary ID for optimistic update
  function generateTempId(): string {
    return "temp-" + Date.now();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
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

    startTransition(async () => {
      // Optimistic update
      updateOptimistic(optimisticTodo);

      try {
        const result: CreateTodoResponse = await createTodo(null, {
          title,
          description,
        });

        // Check if result has error
        if ("error" in result && result.error) {
          // Remove temp todo
          updateOptimistic((state: Todo[]) =>
            state.filter((t) => t._id !== tempId),
          );

          let errorMsg = "Validation failed";

          if (typeof result.error === "string") {
            // Simple string error
            errorMsg = result.error;
          } else if (result.error.title?.length) {
            errorMsg = result.error.title[0];
          } else if (result.error.description?.length) {
            errorMsg = result.error.description[0];
          }

          setErrorMessage(errorMsg);
          return;
        }

        // Success
        if ("todo" in result && result.todo) {
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
          className="bg-green-300 shrink-0 text-black font-medium px-6 py-2 rounded-full w-fit cursor-pointer disabled:cursor-not-allowed disabled:bg-green-200"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Add Todo"}
        </button>
      </form>

      {/* Status Messages */}
      <div className="mt-2 min-h-6">
        {successMessage && (
          <p className="text-green-600 text-sm">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
    </div>
  );
}
