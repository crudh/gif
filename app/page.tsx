/* eslint-disable @next/next/no-img-element */
import { searchGifs, trendingGifs } from "../src/api/giphy";
import { GifPreview } from "../src/components/GifPreview";

const GIF_LIMIT = 50;

const Home = async ({
  searchParams: { search = "" },
}: {
  searchParams: { search?: string };
}) => {
  const gifsResult = search
    ? await searchGifs(search, { offset: 0, limit: GIF_LIMIT })
    : await trendingGifs({ offset: 0, limit: GIF_LIMIT });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {gifsResult.gifs.map((gif) => (
        <GifPreview key={gif.id} gif={gif} />
      ))}
    </div>
  );
};

export default Home;
