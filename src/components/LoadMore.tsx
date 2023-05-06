"use client";

import { useState } from "react";
import { Gif } from "../../types/Gif";
import { GifsGrid } from "./GifsGrid";
import { defaultGifLimit } from "../constants";

export const LoadMore = ({
  onLoadMore,
}: {
  onLoadMore: (offset: number) => Promise<Gif[]>;
}) => {
  const [moreGifs, setMoreGifs] = useState<Gif[][]>([]);

  const handleLoadMore = async () => {
    const newGifs = await onLoadMore((moreGifs.length + 1) * defaultGifLimit);
    setMoreGifs([...moreGifs, newGifs]);
  };

  return (
    <>
      {moreGifs.map((gifs, index) => (
        <GifsGrid key={index} gifs={gifs} />
      ))}
      <button
        type="button"
        onClick={handleLoadMore}
        // className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
      >
        Load more
      </button>
    </>
  );
};
