"use client";

import { useState } from "react";
import { Clipboard } from "@/components/Clipboard";
import type { Gif } from "@/types/Gif";
import { ImageWithPreview } from "./ImageWithPreview";

export const GifPreview = ({
  gif,
  searchTerm,
}: {
  gif: Gif;
  searchTerm?: string;
}) => {
  const [src, setSrc] = useState(gif.previewUrl);

  const isPreview = src === gif.previewUrl;
  const handleClick = () => setSrc(gif.previewUrlHighQuality);

  const conditionalContainerStyles = isPreview
    ? "opacity-60 hover:cursor-pointer"
    : "ring-2 ring-inset ring-yellow-400";

  return (
    <button
      key={gif.id}
      tabIndex={0}
      aria-label={`Load high quality preview of gif with description: ${gif.title ?? "Unknown title"}`}
      className={`flex p-1 h-fit justify-center relative rounded-lg transition-opacity ${conditionalContainerStyles}`}
      onClick={handleClick}
    >
      {!isPreview && <Clipboard gif={gif} searchTerm={searchTerm} />}
      <ImageWithPreview
        src={src}
        previewSrc={gif.blurUrl}
        alt={gif.title}
        className="rounded-lg h-[120px] md:h-[200px]"
      />
    </button>
  );
};
