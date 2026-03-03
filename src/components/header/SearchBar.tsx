import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function handleSetQuery(event: any) {
    setQuery(event.target.value);
  }

  function handleKeyDown(event: any) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  function handleSearch() {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }
    const params = new URLSearchParams();
    params.set("q", trimmedQuery);
    const categoryId = searchParams.get("categoryId");
    if (categoryId) params.set("categoryId", categoryId);
    navigate(`/browse?${params.toString()}`);
    setQuery("");
  }

  return (
    <div className="flex-1 max-w-xl">
      <div className="flex items-center bg-stone-700 rounded-full px-4 py-2 gap-2">
        <input
          type="text"
          value={query}
          onChange={handleSetQuery}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="bg-transparent text-sm text-white placeholder-stone-400 outline-none w-full"
        />
        <button
          onClick={handleSearch}
          aria-label="Search"
          className="shrink-0 text-stone-400 hover:text-white transition-colors"
        >
          {query ? <MagnifyingGlassIcon className="h-4 w-4 text-white transition-colors" /> : <MagnifyingGlassIcon className="h-4 w-4 opacity-90 transition-colors" />}
        </button>
      </div>
    </div>
  );
}

