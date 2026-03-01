"use client";

import { useState, useTransition } from "react";
import { toggleTodo } from "@/app/actions/todoActions";
import DeleteModal from "./DeleteModal";

export default function TodoItem({ todo }: { todo: any }) {
  const [isPending, startTransition] = useTransition();

  // ✅ Track last clicked completed state to handle race condition
  const [completedState, setCompletedState] = useState(todo.completed);

  function handleToggle() {
    const newState = !completedState;
    setCompletedState(newState); // update latest click state locally

    startTransition(async () => {
      await toggleTodo(todo._id, newState); // server action will now always get last click
    });
  }

  return (
    <div
      className={`flex justify-between items-center border border-border rounded-md bg-background px-6 py-4 ${
        isPending ? "opacity-50" : ""
      }`}
    >
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-medium w-full">{todo?.title}</h2>
          <DeleteModal id={todo._id} />
        </div>
        <p className="text-sm text-gray-600 mt-2">{todo?.description}</p>

        <div className="flex items-center gap-2 mt-3">
          {completedState ? (
            <span className="font-medium text-black text-sm px-2 py-1 rounded-md bg-green-200">
              Completed
            </span>
          ) : (
            <span className="w-fit px-2 py-1 rounded-md bg-background-secondary text-sm font-medium text-gray-500">
              Pending
            </span>
          )}
        </div>

        <div className="text-xs text-gray-500 mt-2">
          {todo?.createdAt
            ? `Due: ${new Date(todo.createdAt).toLocaleDateString()}`
            : null}
        </div>

        {/* ✅ Checkbox toggle */}
        <div className="flex gap-2 mt-2 items-center justify-between">
          <div className="flex gap-2 mt-2 items-center">
            <input
              type="checkbox"
              id={`checkbox-${todo._id}`}
              checked={completedState}
              onChange={handleToggle}
              disabled={isPending} // prevent double clicks during server update
              className="bg-background-secondary border border-border rounded-md w-4 h-4"
            />
            <label
              htmlFor={`checkbox-${todo._id}`}
              className="text-sm text-gray-600 cursor-pointer"
            >
              Mark as completed
            </label>
          </div>

          {/* ✅ Pending spinner for create */}
          {todo?.pending && (
            <span className="ml-2 w-4 h-4 border-2 border-gray-400 border-t-black rounded-full animate-spin inline-block"></span>
          )}
        </div>
      </div>
    </div>
  );
}
