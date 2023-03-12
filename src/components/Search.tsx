"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef } from "react";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const search = searchRef.current?.value ?? "";
    router.push(`/?search=${search}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            name="search"
            className="p-4 bg-black block w-full rounded-none rounded-l-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg "
            placeholder="Search for a gif"
            defaultValue={searchParams.get("search") ?? ""}
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
