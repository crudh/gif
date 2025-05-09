import { trendingGifs } from "@/api/tenor";
import { GifsGrid } from "@/components/GifsGrid";
import { GifPreview } from "@/components/GifPreview";

// 24 hours
export const revalidate = 86400;
export const dynamic = "force-static";

const IndexPage = async () => {
  const gifsResult = await trendingGifs();

  return (
    <GifsGrid>
      {gifsResult.gifs.map((gif, index) => (
        <GifPreview
          key={`${gif.id}-${index}`}
          gif={gif}
          searchTerm="featured"
        />
      ))}
    </GifsGrid>
  );
};

export default IndexPage;
