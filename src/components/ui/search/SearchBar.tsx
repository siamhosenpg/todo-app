"use client";

import { useTodoSearch } from "@/context/TodoSearchContext";

export default function SearchBar() {
  const { query, setQuery, isPending } = useTodoSearch();

  return (
    <div className="space-y-2 w-80">
      <input
        className="border border-border  bg-background-secondary py-2 px-4 w-full rounded-full focus:outline-none "
        placeholder="Search todos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isPending && <p className="text-xs text-gray-500">Searching...</p>}
    </div>
  );
}
