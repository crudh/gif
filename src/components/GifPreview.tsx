/* eslint-disable @next/next/no-img-element */
import { Gif } from "../../types/Gif";
import { GifClipboard } from "./GifClipboard";

export const GifPreview = ({ gif }: { gif: Gif }) => {
  return (
    <div
      key={gif.id}
      className="relative flex p-1 transition-opacity rounded-lg"
    >
      <GifClipboard gif={gif} />
      <img
        src={gif.previewUrl}
        alt={gif.altText ?? ""}
        className="w-full rounded-lg"
        width={gif.width}
        height={gif.height}
        style={{
          width: gif.width,
          height: gif.height,
        }}
      />
    </div>
  );
};
