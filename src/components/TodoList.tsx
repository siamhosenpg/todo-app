"use client";

import { useState } from "react";

import SearchBar from "./SearchBar";
import TodoItem from "./TodoItem";

export default function TodoList({ initialTodos }: { initialTodos: any[] }) {
  const [searchedTodos, setSearchedTodos] = useState<any[]>([]);

  const todosToShow = searchedTodos.length > 0 ? searchedTodos : initialTodos;

  return (
    <div className="space-y-4">
      <SearchBar onResults={setSearchedTodos} />

      {todosToShow.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}
