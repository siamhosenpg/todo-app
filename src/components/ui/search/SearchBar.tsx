"use client";
import { IoMdSearch } from "react-icons/io";
import { useTodoSearch } from "@/context/TodoSearchContext";

export default function SearchBar() {
  const { query, setQuery, isPending } = useTodoSearch();

  return (
    <div className=" w-110 border border-border  bg-background-secondary rounded-full flex items-center gap-2 py-2 px-4">
      <div className="flex items-center justify-center w-6 h-6 shrink-0">
        <IoMdSearch className="text-xl  block" />
      </div>

      <input
        className=" block  w-full  focus:outline-none "
        placeholder="Search todos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isPending && <p className="text-xs text-gray-500">Searching...</p>}
    </div>
  );
}
