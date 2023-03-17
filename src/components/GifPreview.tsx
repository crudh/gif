"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ClipboardIcon } from "../icons/ClipboardIcon";
import { Gif } from "../../types/Gif";

export const GifPreview = ({ gif }: { gif: Gif }) => {
  const [src, setSrc] = useState(gif.previewUrl);
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setSrc(gif.url);
  };

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(gif.url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch(() => console.error("Failed to copy url"));
  };

  const isPreview = src === gif.previewUrl;

  const conditionalContainerStyles = isPreview
    ? "opacity-60 hover:ring-2 hover:ring-inset hover:ring-indigo-600"
    : "ring-2 ring-inset ring-yellow-400";

  const conditionalClipboardStyles = copied ? "ring-yellow-400" : "ring-black";

  return (
    <div
      key={gif.id}
      onClick={handleClick}
      className={`flex h-48 p-1 relative rounded-lg hover:cursor-pointer transition-opacity ${conditionalContainerStyles}`}
    >
      {!isPreview && (
        <button title="Copy link" onClick={handleCopyUrl}>
          <div
            className={`absolute w-8 h-8 p-1 transition ease-in-out duration-500 bg-black rounded-lg bottom-2 right-2 ring-2 ring-inset ${conditionalClipboardStyles}`}
          >
            <ClipboardIcon />
          </div>
        </button>
      )}
      <img src={src} alt={gif.altText ?? ""} className="w-full rounded-lg" />
    </div>
  );
};
