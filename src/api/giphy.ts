import "server-only";

import { GifsResult as GiphyGifsResult, GiphyFetch } from "@giphy/js-fetch-api";
import { IGif as GiphyGif } from "@giphy/js-types";
import { Gif, GifsResult, SearchOptions } from "../../types/Gif";
import { giphyApiKey } from "../constants";

const giphy = new GiphyFetch(giphyApiKey);

const transformGif = (gif: GiphyGif): Gif => ({
  id: gif.id,
  url: gif.images.downsized.url,
  previewUrl: gif.images.preview_gif.url,
  altText: gif.alt_text,
});

const transformResult = (result: GiphyGifsResult): GifsResult => ({
  count: result.pagination.count,
  totalCount: result.pagination.total_count,
  offset: result.pagination.offset,
  gifs: result.data.map(transformGif),
});

export const gifSearch = async (
  terms: string,
  options: SearchOptions
): Promise<GifsResult> => giphy.search(terms, options).then(transformResult);
