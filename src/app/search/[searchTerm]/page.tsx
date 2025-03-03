import { searchGifs } from "../../../api/tenor";
import { GifPreview } from "../../../components/GifPreview";
import { GifsGrid } from "../../../components/GifsGrid";
import { MoreGifs } from "../../../components/MoreGifs";

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
      <GifsGrid>
        {gifsResult.gifs.map((gif, index) => (
          <GifPreview
            key={`${gif.id}-${index}`}
            gif={gif}
            searchTerm={searchTerm}
          />
        ))}
      </GifsGrid>
      {gifsResult.next && (
        <MoreGifs searchTerm={searchTerm} initialResult={gifsResult} />
      )}
    </GifsGrid>
  );
};

export default SearchResultPage;
