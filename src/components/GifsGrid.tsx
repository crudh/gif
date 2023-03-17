import { GifsResult } from "../../types/Gif";
import { GifPreview } from "./GifPreview";

export const GifsGrid = ({ gifsResult }: { gifsResult: GifsResult }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {gifsResult.gifs.map((gif, index) => (
        <GifPreview key={index} gif={gif} />
      ))}
    </div>
  );
};
