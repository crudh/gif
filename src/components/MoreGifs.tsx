"use client";

import { useEffect, useState } from "react";
import { Gif } from "../../types/Gif";
import { defaultGifLimit } from "../constants";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSearchGifs } from "../actions";
import { SpinnerIcon } from "../icons/SpinnerIcon";
import { GifPreview } from "./GifPreview";

export const MoreGifs = ({ searchTerm }: { searchTerm: string }) => {
  const [intersectionRef, isIntersecting] =
    useIntersectionObserver<HTMLDivElement>();
  const [moreGifs, setMoreGifs] = useState<Gif[]>([]);
  const [endOfGifs, setEndOfGifs] = useState(false);

  const handleLoadMore = async () => {
    const gifs = await handleSearchGifs(
      searchTerm,
      moreGifs.length + defaultGifLimit
    );

    if (gifs.length < defaultGifLimit) {
      setEndOfGifs(true);
      return;
    }

    setMoreGifs([...moreGifs, ...gifs]);
  };

  useEffect(() => {
    if (!isIntersecting) return;

    handleLoadMore();
  }, [isIntersecting]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {moreGifs.map((gif, index) => (
        <GifPreview key={`${gif.id}-${index}`} gif={gif} />
      ))}
      <div ref={intersectionRef} className="flex justify-center w-full p-8">
        {!endOfGifs && isIntersecting && <SpinnerIcon />}
      </div>
    </>
  );
};
