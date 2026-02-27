"use client";

import { useEffect, useState } from "react";

export default function SearchBar({
  onResults,
}: {
  onResults: (data: any[]) => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query) {
        onResults([]);
        return;
      }

      const res = await fetch(`/api/todos?search=${query}`);
      const data = await res.json();
      onResults(data);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <input
      className="border p-2 w-full"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
