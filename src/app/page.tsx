import { handleTrendingGifs } from "@/actions";
import { trendingGifs } from "@/api/klipy";
import { GifPreview } from "@/components/GifPreview";
import { GifsGrid } from "@/components/GifsGrid";
import { MoreGifs } from "@/components/MoreGifs";

const IndexPage = async () => {
  const gifsResult = await trendingGifs();

  return (
    <GifsGrid>
      <GifsGrid>
        {gifsResult.gifs.map((gif, index) => (
          <GifPreview key={`${gif.id}-${index}`} gif={gif} />
        ))}
      </GifsGrid>
      {gifsResult.next && (
        <MoreGifs initialResult={gifsResult} onMoreGifs={handleTrendingGifs} />
      )}
    </GifsGrid>
  );
};

export default IndexPage;
