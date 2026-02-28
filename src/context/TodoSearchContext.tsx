"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

type TodoSearchContextType = {
  query: string;
  setQuery: (value: string) => void;
  results: any[];
  isPending: boolean;
};

const TodoSearchContext = createContext<TodoSearchContextType | null>(null);

export function TodoSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      startTransition(async () => {
        try {
          const res = await fetch(`/api/todos?search=${query}`);
          const data = await res.json();
          setResults(data);
        } catch (error) {
          console.error(error);
        }
      });
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <TodoSearchContext.Provider value={{ query, setQuery, results, isPending }}>
      {children}
    </TodoSearchContext.Provider>
  );
}

export function useTodoSearch() {
  const context = useContext(TodoSearchContext);
  if (!context) {
    throw new Error("useTodoSearch must be used inside TodoSearchProvider");
  }
  return context;
}
