"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { Gif, GifsResult } from "../../types/Gif";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSearchGifs } from "../actions";
import { IconSpinner } from "../icons/IconSpinner";
import { GifPreview } from "./GifPreview";

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
      const newGifsResult = await handleSearchGifs(searchTerm, next);
      setNext(newGifsResult.next);

      return [...previousState, ...newGifsResult.gifs];
    },
    [],
  );

  useEffect(() => {
    if (!isIntersecting || isPending || !next) return;

    startTransition(onLoadMore);
  }, [isIntersecting, onLoadMore, isPending, next]);

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
        {isPending && <IconSpinner />}
      </div>
    </>
  );
};
