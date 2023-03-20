/* eslint-disable @next/next/no-img-element */
import { Gif } from "../../types/Gif";
import { GifClipboard } from "./GifClipboard";

export const GifPreview = ({ gif }: { gif: Gif }) => {
  return (
    <div
      key={gif.id}
      className={`flex p-1 relative rounded-lg hover:cursor-pointer transition-opacity`}
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
