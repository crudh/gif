import { searchGifs } from "../../../src/api/tenor";
import { GifPreview } from "../../../src/components/GifPreview";
import { GifsGrid } from "../../../src/components/GifsGrid";
import { MoreGifs } from "../../../src/components/MoreGifs";

// 24 hours
export const revalidate = 86400;
export const dynamic = "force-static";

const SearchResultPage = async ({
  params,
}: {
  params: Promise<{ searchTerm: string }>;
}) => {
  const { searchTerm: searchTermParam } = await params;
  const searchTerm = decodeURIComponent(searchTermParam);
  const gifsResult = await searchGifs(searchTerm);

  return (
    <GifsGrid>
      {gifsResult.gifs.map((gif, index) => (
        <GifPreview
          key={`${gif.id}-${index}`}
          gif={gif}
          searchTerm={searchTerm}
        />
      ))}
      {gifsResult.next && (
        <MoreGifs searchTerm={searchTerm} initialResult={gifsResult} />
      )}
    </GifsGrid>
  );
};

export default SearchResultPage;
