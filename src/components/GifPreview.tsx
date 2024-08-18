/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Gif } from "../../types/Gif";
import { Clipboard } from "./Clipboard";

export const GifPreview = ({ gif }: { gif: Gif }) => {
  const [src, setSrc] = useState(gif.previewUrl);

  const isPreview = src === gif.previewUrl;
  const handleClick = () => setSrc(gif.previewUrlFull);

  const conditionalContainerStyles = isPreview
    ? "opacity-60 hover:ring-2 hover:ring-inset hover:ring-indigo-600"
    : "ring-2 ring-inset ring-yellow-400";

  return (
    <div
      key={gif.id}
      className={`flex p-1 h-fit justify-center relative rounded-lg hover:cursor-pointer transition-opacity w-[220px]  ${conditionalContainerStyles}`}
      onClick={handleClick}
    >
      {!isPreview && <Clipboard text={gif.shareUrl} />}
      <img
        src={src}
        alt={gif.altText ?? ""}
        className="w-full rounded-lg"
        width={gif.previewWidth}
        height={gif.previewHeight}
        style={{
          width: gif.previewWidth,
          height: gif.previewHeight,
        }}
      />
    </div>
  );
};
