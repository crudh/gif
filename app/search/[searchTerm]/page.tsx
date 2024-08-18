import { searchGifs } from "../../../src/api/tenor";
import { GifPreview } from "../../../src/components/GifPreview";
import { GifsGrid } from "../../../src/components/GifsGrid";
import { MoreGifs } from "../../../src/components/MoreGifs";

// 24 hours
export const revalidate = 86400;

const SearchResultPage = async ({
  params,
}: {
  params: { searchTerm: string };
}) => {
  const searchTerm = decodeURIComponent(params.searchTerm);
  const gifsResult = await searchGifs(searchTerm);

  return (
    <GifsGrid>
      {gifsResult.gifs.map((gif, index) => (
        <GifPreview key={`${gif.id}-${index}`} gif={gif} />
      ))}
      {gifsResult.next && (
        <MoreGifs searchTerm={searchTerm} initialResult={gifsResult} />
      )}
    </GifsGrid>
  );
};

export default SearchResultPage;
