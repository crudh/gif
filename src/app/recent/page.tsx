import { handleRecentGifs } from "@/actions";
import { recentGifs } from "@/api/klipy";
import { GifPreview } from "@/components/GifPreview";
import { GifsGrid } from "@/components/GifsGrid";
import { MoreGifs } from "@/components/MoreGifs";

const RecentPage = async () => {
  const gifsResult = await recentGifs();

  return (
    <GifsGrid>
      <GifsGrid>
        {gifsResult.gifs.map((gif, index) => (
          <GifPreview key={`${gif.id}-${index}`} gif={gif} />
        ))}
      </GifsGrid>
      {gifsResult.next && (
        <MoreGifs initialResult={gifsResult} onMoreGifs={handleRecentGifs} />
      )}
    </GifsGrid>
  );
};

export default RecentPage;
