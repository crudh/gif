"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ClipboardIcon } from "../icons/ClipboardIcon";
import { Gif } from "../../types/Gif";

export const GifPreview = ({ gif }: { gif: Gif }) => {
  const [src, setSrc] = useState(gif.previewUrl);

  const handleClick = () => {
    setSrc(gif.url);
  };

  const isPreview = src === gif.previewUrl;

  const additionalStyles = isPreview
    ? "opacity-60 hover:ring-2 hover:ring-inset hover:ring-indigo-600"
    : "ring-2 ring-inset ring-yellow-400";

  return (
    <div
      key={gif.id}
      onClick={handleClick}
      className={`flex h-48 p-1 relative rounded-lg hover:cursor-pointer transition-opacity ${additionalStyles}`}
    >
      {!isPreview && (
        <div className="absolute w-6 h-6 bg-black rounded-lg bottom-2 right-2">
          <ClipboardIcon />
        </div>
      )}
      <img src={src} alt={gif.altText ?? ""} className="w-full rounded-lg" />
    </div>
  );
};
