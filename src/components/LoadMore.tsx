"use client";

import { useEffect, useState } from "react";
import { Gif } from "../../types/Gif";
import { GifsGrid } from "./GifsGrid";
import { defaultGifLimit } from "../constants";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSearchGifs } from "../actions";
import { SpinnerIcon } from "../icons/SpinnerIcon";

export const LoadMore = ({ searchTerm }: { searchTerm: string }) => {
  const [intersectionRef, isIntersecting] =
    useIntersectionObserver<HTMLDivElement>();
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
      <div ref={intersectionRef} className="flex justify-center p-8">
        {isIntersecting && <SpinnerIcon />}
      </div>
    </>
  );
};
