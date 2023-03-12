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

  return (
    <div
      key={gif.id}
      onClick={handleClick}
      className={`flex h-48 p-1 relative rounded-lg hover:cursor-pointer transition-opacity hover:ring-2 hover:ring-inset hover:ring-indigo-600 ${
        isPreview ? " opacity-60" : ""
      }`}
    >
      {!isPreview && (
        <div className="absolute bottom-2 right-2 w-6 h-6">
          <ClipboardIcon />
        </div>
      )}
      <img src={src} alt={gif.altText ?? ""} className="rounded-lg w-full" />
    </div>
  );
};
