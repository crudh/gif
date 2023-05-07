import { trendingGifs } from "../src/api/giphy";
import { GifPreview } from "../src/components/GifPreview";
import { GifsGrid } from "../src/components/GifsGrid";
import { defaultGifLimit } from "../src/constants";

// 24 hours
export const revalidate = 86400;

const Page = async () => {
  const gifsResult = await trendingGifs({ offset: 0, limit: defaultGifLimit });

  return (
    <GifsGrid>
      {gifsResult.gifs.map((gif, index) => (
        <GifPreview key={`${gif.id}-${index}`} gif={gif} />
      ))}
    </GifsGrid>
  );
};

export default Page;
