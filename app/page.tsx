/* eslint-disable @next/next/no-img-element */
import { searchGifs, trendingGifs } from "../src/api/giphy";
import { GifsGrid } from "../src/components/GifsGrid";

const GIF_LIMIT = 50;

// TODO temporary until next Next release, then using searchParams will do this automatically
export const dynamic = "force-dynamic";

const Home = async ({
  searchParams: { search = "" },
}: {
  searchParams: { search?: string };
}) => {
  const gifsResult = search
    ? await searchGifs(search, { offset: 0, limit: GIF_LIMIT })
    : await trendingGifs({ offset: 0, limit: GIF_LIMIT });

  return <GifsGrid gifsResult={gifsResult} />;
};

export default Home;
