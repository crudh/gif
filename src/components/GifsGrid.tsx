import { Gif } from "../../types/Gif";
import { GifPreview } from "./GifPreview";

export const GifsGrid = ({ gifs }: { gifs: Gif[] }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {gifs.map((gif, index) => (
        <GifPreview key={`${gif.id}-${index}`} gif={gif} />
      ))}
    </div>
  );
};
