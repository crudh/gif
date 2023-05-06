import { searchGifs } from "../../../src/api/giphy";
import { GifsGrid } from "../../../src/components/GifsGrid";
import { LoadMore } from "../../../src/components/LoadMore";
import { defaultGifLimit } from "../../../src/constants";
import { Gif } from "../../../types/Gif";

// 24 hours
export const revalidate = 86400;

const Page = async ({ params }: { params: { searchTerm: string } }) => {
  const searchTerm = decodeURIComponent(params.searchTerm);
  const gifsResult = await searchGifs(searchTerm, {
    offset: 0,
    limit: defaultGifLimit,
  });

  const handleLoadMore = async (offset: number): Promise<Gif[]> => {
    "use server";

    console.log("MORE OFFSET", offset);

    return (await searchGifs(searchTerm, { offset, limit: defaultGifLimit }))
      .gifs;
  };

  return (
    <>
      <GifsGrid gifs={gifsResult.gifs} />
      <LoadMore onLoadMore={handleLoadMore} />
    </>
  );
};

export default Page;
