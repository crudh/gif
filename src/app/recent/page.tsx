/* eslint-disable @next/next/no-img-element */
import { handleRecentGifs } from "@/actions";
import { recentGifs } from "@/api/klipy";
import { GifPreview } from "@/components/GifPreview";
import { GifsGrid } from "@/components/GifsGrid";
import { MoreGifs } from "@/components/MoreGifs";

const RecentPage = async () => {
  const gifsResult = await recentGifs();
  const hasRecents = gifsResult.gifs.length > 0;

  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Recent shares</h1>
      {!hasRecents && (
        <img
          src="https://static.klipy.com/ii/7607a26399874a14744aa5e7accfa062/17/ba/ZpPeyNLi.gif"
          alt="nothing, absolutely nothing"
        />
      )}

      {hasRecents && (
        <GifsGrid>
          <GifsGrid>
            {gifsResult.gifs.map((gif, index) => (
              <GifPreview key={`${gif.id}-${index}`} gif={gif} />
            ))}
          </GifsGrid>
          {gifsResult.next && (
            <MoreGifs
              initialResult={gifsResult}
              onMoreGifs={handleRecentGifs}
            />
          )}
        </GifsGrid>
      )}
    </div>
  );
};

export default RecentPage;
