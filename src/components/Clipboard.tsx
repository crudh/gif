"use client";

import { useState } from "react";
import { IconClipboard } from "../icons/IconClipboard";

export const Clipboard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch(() => console.error("Failed to copy"));
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
