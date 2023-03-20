"use client";

import { useState } from "react";
import { Gif } from "../../types/Gif";
import { ClipboardIcon } from "../icons/ClipboardIcon";

export const GifClipboard = ({ gif }: { gif: Gif }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(gif.url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch(() => console.error("Failed to copy url"));
  };

  const conditionalClipboardStyles = copied ? "ring-yellow-400" : "ring-black";

  return (
    <button title="Copy link" onClick={handleCopyUrl}>
      <div
        className={`absolute w-8 h-8 p-1 transition ease-in-out duration-500 bg-black rounded-lg bottom-2 right-2 ring-2 ring-inset ${conditionalClipboardStyles}`}
      >
        <ClipboardIcon />
      </div>
    </button>
  );
};
