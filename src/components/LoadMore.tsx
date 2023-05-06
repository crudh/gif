"use client";

import { useEffect, useState } from "react";
import { Gif } from "../../types/Gif";
import { GifsGrid } from "./GifsGrid";
import { defaultGifLimit } from "../constants";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSearchGifs } from "../actions";

export const LoadMore = ({ searchTerm }: { searchTerm: string }) => {
  const [intersectionRef, isIntersecting] =
    useIntersectionObserver<HTMLButtonElement>();
  const [moreGifs, setMoreGifs] = useState<Gif[][]>([]);

  const handleLoadMore = async () => {
    const gifs = await handleSearchGifs(
      searchTerm,
      (moreGifs.length + 1) * defaultGifLimit
    );

    setMoreGifs([...moreGifs, gifs]);
  };

  useEffect(() => {
    if (!isIntersecting) return;

    handleLoadMore();
  }, [isIntersecting]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {moreGifs.map((gifs, index) => (
        <GifsGrid key={index} gifs={gifs} />
      ))}
      <button
        ref={intersectionRef}
        type="button"
        // className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
      >
        Load more
      </button>
    </>
  );
};
