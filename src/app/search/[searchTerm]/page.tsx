import { handleSearchGifs } from "@/actions";
import { searchGifs } from "@/api/klipy";
import { GifPreview } from "@/components/GifPreview";
import { GifsGrid } from "@/components/GifsGrid";
import { MoreGifs } from "@/components/MoreGifs";

const SearchResultPage = async ({
  params,
}: PageProps<"/search/[searchTerm]">) => {
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
        <MoreGifs
          searchTerm={searchTerm}
          initialResult={gifsResult}
          onMoreGifs={handleSearchGifs.bind(null, searchTerm)}
        />
      )}
    </GifsGrid>
  );
};

export default SearchResultPage;
