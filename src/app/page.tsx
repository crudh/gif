import { handleTrendingGifs } from "@/actions";
import { trendingGifs } from "@/api/klipy";
import { GifPreview } from "@/components/GifPreview";
import { GifsGrid } from "@/components/GifsGrid";
import { MoreGifs } from "@/components/MoreGifs";
import { PageLoading } from "@/components/PageLoading";
import { Suspense } from "react";

const Gifs = async () => {
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

const IndexPage = async () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Gifs />
    </Suspense>
  );
};

export default IndexPage;
