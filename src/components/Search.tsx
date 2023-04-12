"use client";

import { useRouter, useParams } from "next/navigation";
import { FormEvent, useRef } from "react";

export const Search = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const searchTerm = decodeURIComponent(params.searchTerm ?? "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const search = (searchRef.current?.value ?? "").trim();
    router.push(`/search/${search}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mt-2 rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            name="search"
            className="block w-full p-4 bg-black border-0 rounded-none shadow-sm rounded-l-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg "
            placeholder="Search for a gif"
            defaultValue={searchTerm}
            ref={searchRef}
          />
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
