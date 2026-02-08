"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useActionState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useSearchShortcut } from "@/hooks/useSearchShortcut";

export const Search = () => {
  const router = useRouter();
  const params = useParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchShortcut = () => {
    searchRef.current?.focus();
    searchRef.current?.select();
  };

  useSearchShortcut(handleSearchShortcut);

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
      <div className="w-full relative">
        <Input
          key={activeSearch}
          type="text"
          name="search"
          className="h-14 md:text-lg pt-0 pb-0"
          placeholder="Search KLIPY"
          defaultValue={activeSearch}
          ref={searchRef}
          autoFocus
        />
        <div className="absolute right-4 top-3 select-none pointer-events-none opacity-50 border-2 rounded-md p-1 text-sm hidden md:block fade-in">
          ⌘ K
        </div>
        <div className="absolute right-18 top-2 pointer-events-none opacity-50 hidden md:block fade-in">
          <Image
            src="/images/klipy.svg"
            alt="Powered by Klipy"
            width="198"
            height="25"
          />
        </div>
      </div>
      <div className="pb-1">
        <Button
          type="submit"
          className="h-14"
          variant="outline"
          loading={isPending}
        >
          SEARCH
        </Button>
      </div>
    </form>
  );
};
