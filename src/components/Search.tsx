"use client";

import { useParams, useRouter } from "next/navigation";
import { useActionState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

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
    <form action={formAction} className="flex w-full h-full space-x-2">
      <div className="w-full">
        <Input
          key={activeSearch}
          type="text"
          name="search"
          className="h-14 md:text-lg pt-0 pb-0"
          placeholder="Search for a gif"
          defaultValue={activeSearch}
          ref={searchRef}
          autoFocus
        />
      </div>
      <div className="pb-1">
        <Button
          type="submit"
          className="h-14"
          variant="outline"
          loading={isPending}
        >
          Search
        </Button>
      </div>
    </form>
  );
};
