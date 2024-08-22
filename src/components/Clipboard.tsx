"use client";

import { useState } from "react";
import { IconClipboard } from "../icons/IconClipboard";
import { Gif } from "../../types/Gif";
import { handleShared } from "../actions";

export const Clipboard = ({
  gif,
  searchTerm,
}: {
  gif: Gif;
  searchTerm: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(gif.shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((error) => console.error("Failed to copy", error))
      .then(() => handleShared(gif.id, searchTerm))
      .catch((error) => console.error("Failed to register share", error));
  };

  const conditionalClipboardStyles = copied ? "ring-yellow-400" : "ring-black";

  return (
    <button title="Copy link" onClick={handleCopy}>
      <div
        className={`absolute w-8 h-8 p-1 transition ease-in-out duration-500 bg-black rounded-lg bottom-2 right-2 ring-2 ring-inset ${conditionalClipboardStyles}`}
      >
        <IconClipboard />
      </div>
    </button>
  );
};
