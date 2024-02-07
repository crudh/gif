"use client";

import { useRouter, useParams } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { IconSpinner } from "../icons/IconSpinner";

export const Search = () => {
  const router = useRouter();
  const params = useParams();

  const searchTermParam = Array.isArray(params.searchTerm)
    ? params.searchTerm[0]
    : params.searchTerm;
  const activeSearch = decodeURIComponent(searchTermParam ?? "");

  const searchRef = useRef<HTMLInputElement>(null);
  const [lastSearch, setLastSearch] = useState(activeSearch);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchInput = (searchRef.current?.value ?? "").trim();
    setLastSearch(searchInput);

    requestAnimationFrame(() => {
      router.push(`/search/${searchInput}`);
    });
  };

  const isLoading = activeSearch !== lastSearch;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mt-2 rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            name="search"
            className="block w-full p-4 bg-black border-0 rounded-none shadow-sm rounded-l-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg "
            placeholder="Search for a gif"
            defaultValue={activeSearch}
            ref={searchRef}
            autoFocus
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <IconSpinner />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
        >
          Search
        </button>
      </div>
    </form>
  );
};
