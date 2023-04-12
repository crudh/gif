import { searchGifs } from "../../../src/api/giphy";
import { GifsGrid } from "../../../src/components/GifsGrid";
import { defaultGifLimit } from "../../../src/constants";

// 24 hours
export const revalidate = 86400;

const Page = async ({ params }: { params: { searchTerm: string } }) => {
  const searchTerm = decodeURIComponent(params.searchTerm);
  const gifsResult = await searchGifs(searchTerm, {
    offset: 0,
    limit: defaultGifLimit,
  });

  return <GifsGrid gifsResult={gifsResult} />;
};

export default Page;
