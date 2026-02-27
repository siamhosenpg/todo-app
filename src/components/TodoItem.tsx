"use client";

import { useTransition } from "react";
import { toggleTodo } from "@/app/actions/todoActions";
import DeleteModal from "./DeleteModal";

export default function TodoItem({ todo }: { todo: any }) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(() => {
      toggleTodo(todo._id, !todo.completed);
    });
  }

  return (
    <div
      className={`flex justify-between items-center border p-2 ${
        isPending ? "opacity-50" : ""
      }`}
    >
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <span className={todo.completed ? "line-through" : ""}>
          {todo.title}
        </span>
      </div>

      <DeleteModal id={todo._id} />
    </div>
  );
}
