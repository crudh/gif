import { trendingGifs } from "../src/api/giphy";
import { GifsGrid } from "../src/components/GifsGrid";
import { defaultGifLimit } from "../src/constants";

// 24 hours
export const revalidate = 86400;

const Page = async () => {
  const gifsResult = await trendingGifs({ offset: 0, limit: defaultGifLimit });

  return <GifsGrid gifsResult={gifsResult} />;
};

export default Page;
