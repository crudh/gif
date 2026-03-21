import { handleSearchGifs } from "@/actions";
import { searchGifs } from "@/api/klipy";
import { GifPreview } from "@/components/GifPreview";
import { GifsGrid } from "@/components/GifsGrid";
import { MoreGifs } from "@/components/MoreGifs";
import { PageLoading } from "@/components/PageLoading";
import { Suspense } from "react";

const Gifs = async ({
  params,
}: {
  params: Promise<{
    searchTerm: string;
  }>;
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
        <MoreGifs
          searchTerm={searchTerm}
          initialResult={gifsResult}
          onMoreGifs={handleSearchGifs.bind(null, searchTerm)}
        />
      )}
    </GifsGrid>
  );
};

const SearchResultPage = async ({
  params,
}: PageProps<"/search/[searchTerm]">) => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Gifs params={params} />
    </Suspense>
  );
};

export default SearchResultPage;
