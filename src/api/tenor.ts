import { cache } from "react";
import { Gif, GifsResult, SearchOptions } from "../../types/Gif";
import {
  gifLimit,
  tenorApiKey,
  tenorBaseUrl,
  tenorClientKey,
} from "../constants";

type RequestType = "search" | "featured";

type TenorGifFormat = {
  url: string;
  dims: [number, number];
};

type TenorGif = {
  id: string;
  title: string;
  content_description: string;
  itemurl: string;
  url: string;
  tags: string[];
  media_formats: {
    tinygif: TenorGifFormat;
    nanogif: TenorGifFormat;
    mediumgif: TenorGifFormat;
  };
};

type TenorResponse = {
  locale: string;
  next?: string | number;
  results: TenorGif[];
};

const baseParams = {
  key: tenorApiKey,
  client_key: tenorClientKey,
  media_filter: "tinygif,nanogif,mediumgif",
  limit: `${gifLimit}`,
} as const;

const sendRequest = async (
  requestType: RequestType,
  params: Record<string, string>
) => {
  const urlParams = new URLSearchParams({ ...params, ...baseParams });
  const response = await fetch(`${tenorBaseUrl}${requestType}?${urlParams}`);
  if (!response.ok)
    throw new Error(`Failed to fetch ${requestType}: ${response.statusText}`);

  return response.json();
};

const transformGif = (gif: TenorGif): Gif => ({
  id: gif.id,
  altText: gif.content_description,
  previewUrl: gif.media_formats.tinygif.url,
  previewWidth: gif.media_formats.tinygif.dims[0],
  previewHeight: gif.media_formats.tinygif.dims[1],
  previewUrlFull: gif.media_formats.mediumgif.url,
  shareUrl: gif.media_formats.mediumgif.url,
});

const transformResponse = (response: TenorResponse): GifsResult => ({
  next: response.next ? `${response.next}` : undefined,
  gifs: response.results.map(transformGif),
});

export const searchGifs = cache(
  async (terms: string, options?: SearchOptions): Promise<GifsResult> =>
    sendRequest("search", {
      q: terms,
      ...(options?.next ? { pos: `${options.next}` } : {}),
    }).then(transformResponse)
);

export const trendingGifs = cache(
  async (options?: SearchOptions): Promise<GifsResult> =>
    sendRequest("featured", {
      ...(options?.next ? { pos: `${options.next}` } : {}),
    }).then(transformResponse)
);
