"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { handleSearchGifs } from "@/actions";
import type { Gif, GifsResult } from "@/types/Gif";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { GifPreview } from "@/components/GifPreview";
import { Loading } from "./Loeding";
import { toast } from "sonner";

export const MoreGifs = ({
  searchTerm,
  initialResult,
}: {
  searchTerm: string;
  initialResult: GifsResult;
}) => {
  const [next, setNext] = useState<string | undefined>(initialResult.next);
  const [intersectionRef, isIntersecting] =
    useIntersectionObserver<HTMLDivElement>();

  const [gifs, onLoadMore, isPending] = useActionState<Gif[]>(
    async (previousState) => {
      try {
        const newGifsResult = await handleSearchGifs(searchTerm, next);

        setNext(newGifsResult.next);
        return [...previousState, ...newGifsResult.gifs];
      } catch {
        toast.error("Failed to load more!", {
          description: "No more GIFs could be loaded",
          duration: 300000,
          action: {
            label: "Try again",
            onClick: onLoadMore,
          },
        });

        return previousState;
      }
    },
    [],
  );

  useEffect(() => {
    if (!isIntersecting || isPending || !next) return;

    startTransition(onLoadMore);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  return (
    <>
      {gifs.map((gif, index) => (
        <GifPreview
          key={`${gif.id}-${index}`}
          gif={gif}
          searchTerm={searchTerm}
        />
      ))}
      <div ref={intersectionRef} className="flex justify-center w-full p-8">
        <Loading isLoading={isPending} />
      </div>
    </>
  );
};
