"use client";

import { useActionState, useEffect, useState } from "react";
import { Gif } from "../../types/Gif";
import { defaultGifLimit } from "../constants";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSearchGifs } from "../actions";
import { IconSpinner } from "../icons/IconSpinner";
import { GifPreview } from "./GifPreview";

export const MoreGifs = ({ searchTerm }: { searchTerm: string }) => {
  const [intersectionRef, isIntersecting] =
    useIntersectionObserver<HTMLDivElement>();

  const [gifs, handleLoadMore, isPending] = useActionState<Gif[]>(async (previousState) => {
    const newGifs = await handleSearchGifs(
      searchTerm,
      previousState.length + defaultGifLimit
    );

    return [...previousState, ...newGifs];
  }, []);

  useEffect(() => {
    const isAtEnd = gifs.length % defaultGifLimit !== 0;
    if (!isIntersecting || isPending || isAtEnd) return;

    handleLoadMore();
  }, [isIntersecting]);

  return (
    <>
      {gifs.map((gif, index) => (
        <GifPreview key={`${gif.id}-${index}`} gif={gif} />
      ))}
      <div ref={intersectionRef} className="flex justify-center w-full p-8">
        {isPending && <IconSpinner />}
      </div>
    </>
  );
};
