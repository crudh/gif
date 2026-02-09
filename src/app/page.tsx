import { trendingGifs } from "@/api/klipy";
import { GifsGrid } from "@/components/GifsGrid";
import { GifPreview } from "@/components/GifPreview";

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
