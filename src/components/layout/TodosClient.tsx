"use client";

import { useOptimistic } from "react";
import TodoForm from "@/components/TodoForm";
import TodoListItems from "@/components/layout/todolist/TodoListItems";

export type Todo = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  pending?: boolean;
};

export default function TodosClient({
  initialTodos,
}: {
  initialTodos: Todo[];
}) {
  const [optimisticTodos, updateOptimistic] = useOptimistic<
    Todo[],
    Todo | ((state: Todo[]) => Todo[])
  >(initialTodos, (state, action) => {
    if (typeof action === "function") {
      return action(state);
    }
    return [action, ...state];
  });

  return (
    <>
      <TodoForm updateOptimistic={updateOptimistic} />
      <TodoListItems initialTodos={optimisticTodos} />
    </>
  );
}
