"use client";

import { useRouter, useParams } from "next/navigation";
import { useActionState, useRef } from "react";
import { IconSpinner } from "../icons/IconSpinner";

export const Search = () => {
  const router = useRouter();
  const params = useParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const [, formAction, isPending] = useActionState(async () => {
    const searchInput = (searchRef.current?.value ?? "").trim();

    router.push(`/search/${searchInput}`);

    return undefined;
  }, undefined);

  const searchTermParam = Array.isArray(params.searchTerm)
    ? params.searchTerm[0]
    : params.searchTerm;
  const activeSearch = decodeURIComponent(searchTermParam ?? "");

  return (
    <form action={formAction}>
      <div className="flex mt-2 rounded-md shadow-xs">
        <div className="relative flex items-stretch grow focus-within:z-10">
          <input
            key={activeSearch}
            type="text"
            name="search"
            className="block w-full p-4 bg-black border-0 rounded-none shadow-xs rounded-l-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg "
            placeholder="Search for a gif"
            defaultValue={activeSearch}
            ref={searchRef}
            autoFocus
          />
          {isPending && (
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
