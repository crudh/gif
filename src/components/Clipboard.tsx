"use client";

import { type KeyboardEvent, useState } from "react";
import { handleShared } from "@/actions";
import { IconClipboard } from "@/icons/IconClipboard";
import type { Gif } from "@/types/Gif";

const onKeyboardSelect = (
  event: KeyboardEvent<HTMLDivElement>,
  onHandle: () => void,
) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onHandle();
  }
};

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

  const conditionalClipboardStyles = copied
    ? "transition ease-in duration-500 ring-yellow-400"
    : "ring-black";

  return (
    <div
      tabIndex={0}
      aria-label="Copy gif share link to clipboard"
      role="button"
      className={`absolute w-8 h-8 p-1 bg-black rounded-lg bottom-2 right-2 ring-2 ring-inset hover:cursor-pointer ${conditionalClipboardStyles}`}
      onClick={handleCopy}
      onKeyDown={(event) => onKeyboardSelect(event, handleCopy)}
    >
      <IconClipboard />
    </div>
    // </div>
  );
};
