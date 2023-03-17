/* eslint-disable @next/next/no-img-element */
import { gifSearch } from "../src/api/giphy";
import { GifPreview } from "../src/components/GifPreview";

const Home = async ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  if (search === undefined) {
    return <div>Search for something</div>;
  }

  const gifsResult = await gifSearch(search, { offset: 0, limit: 20 });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {gifsResult.gifs.map((gif) => (
        <GifPreview key={gif.id} gif={gif} />
      ))}
    </div>
  );
};

export default Home;
