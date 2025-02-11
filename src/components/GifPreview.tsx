/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { Gif } from "../types/Gif";
import { Clipboard } from "./Clipboard";

export const GifPreview = ({
  gif,
  searchTerm,
}: {
  gif: Gif;
  searchTerm: string;
}) => {
  const [src, setSrc] = useState(gif.previewUrl);

  const isPreview = src === gif.previewUrl;
  const handleClick = () => setSrc(gif.previewUrlFull);

  const conditionalContainerStyles = isPreview
    ? "opacity-60 hover:ring-2 hover:ring-inset hover:ring-indigo-600"
    : "ring-2 ring-inset ring-yellow-400";

  return (
    <div
      key={gif.id}
      className={`flex p-1 h-fit justify-center relative rounded-lg hover:cursor-pointer transition-opacity ${conditionalContainerStyles}`}
      onClick={handleClick}
    >
      {!isPreview && <Clipboard gif={gif} searchTerm={searchTerm} />}
      <img
        src={src}
        alt={gif.altText ?? ""}
        className="rounded-lg h-[120px] md:h-[200px]"
      />
    </div>
  );
};
