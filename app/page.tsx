import { trendingGifs } from "../src/api/tenor";
import { GifPreview } from "../src/components/GifPreview";
import { GifsGrid } from "../src/components/GifsGrid";

// 24 hours
export const revalidate = 86400;

const IndexPage = async () => {
  const gifsResult = await trendingGifs();

  return (
    <GifsGrid>
      {gifsResult.gifs.map((gif, index) => (
        <GifPreview key={`${gif.id}-${index}`} gif={gif} />
      ))}
    </GifsGrid>
  );
};

export default IndexPage;
