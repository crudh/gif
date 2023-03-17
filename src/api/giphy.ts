import "server-only";
import { cache } from "react";

import { GifsResult as GiphyGifsResult, GiphyFetch } from "@giphy/js-fetch-api";
import { IGif as GiphyGif } from "@giphy/js-types";
import { Gif, GifsResult, SearchOptions } from "../../types/Gif";
import { giphyApiKey } from "../constants";

const giphy = new GiphyFetch(giphyApiKey);

const transformGif = (gif: GiphyGif): Gif => ({
  id: gif.id,
  altText: gif.alt_text,
  url: gif.images.downsized.url,
  width: gif.images.fixed_height.width,
  height: gif.images.fixed_height.height,
  previewUrl: gif.images.fixed_height.url,
});

const transformResult = (result: GiphyGifsResult): GifsResult => ({
  count: result.pagination.count,
  totalCount: result.pagination.total_count,
  offset: result.pagination.offset,
  gifs: result.data.map(transformGif),
});

export const searchGifs = cache(
  async (terms: string, options: SearchOptions): Promise<GifsResult> =>
    giphy.search(terms, options).then(transformResult)
);

export const trendingGifs = cache(
  async (options: SearchOptions): Promise<GifsResult> =>
    giphy.trending(options).then(transformResult)
);
