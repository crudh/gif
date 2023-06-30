import { searchGifs } from "../../../src/api/giphy";
import { GifPreview } from "../../../src/components/GifPreview";
import { GifsGrid } from "../../../src/components/GifsGrid";
import { MoreGifs } from "../../../src/components/MoreGifs";
import { defaultGifLimit } from "../../../src/constants";

// 24 hours
export const revalidate = 86400;

const SearchResultPage = async ({ params }: { params: { searchTerm: string } }) => {
  const searchTerm = decodeURIComponent(params.searchTerm);
  const gifsResult = await searchGifs(searchTerm, {
    offset: 0,
    limit: defaultGifLimit,
  });

  const endOfGifs = gifsResult.gifs.length < defaultGifLimit;

  return (
    <GifsGrid>
      {gifsResult.gifs.map((gif, index) => (
        <GifPreview key={`${gif.id}-${index}`} gif={gif} />
      ))}
      {!endOfGifs && <MoreGifs searchTerm={searchTerm} />}
    </GifsGrid>
  );
};

export default SearchResultPage;
