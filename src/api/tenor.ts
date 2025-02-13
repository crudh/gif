import { cache } from "react";
import type { Gif, GifsResult, SearchOptions } from "../types/Gif";
import {
  gifLimit,
  tenorApiKey,
  tenorBaseUrl,
  tenorClientKey,
} from "../constants";
import type { TenorGif, TenorRequestType, TenorResponse } from "../types/Tenor";

const baseParams = {
  key: tenorApiKey,
  client_key: tenorClientKey,
  media_filter: "tinygif,nanogif,mediumgif",
  limit: `${gifLimit}`,
} as const;

const sendRequest = async (
  requestType: TenorRequestType,
  params: Record<string, string>,
  options?: RequestInit,
) => {
  const urlParams = new URLSearchParams({ ...params, ...baseParams });
  const response = await fetch(
    `${tenorBaseUrl}${requestType}?${urlParams}`,
    options,
  );
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
  async (searchTerm: string, options?: SearchOptions): Promise<GifsResult> =>
    sendRequest(
      "search",
      {
        q: searchTerm,
        ...(options?.next ? { pos: `${options.next}` } : {}),
      },
      {
        cache: "force-cache",
      },
    ).then(transformResponse),
);

export const trendingGifs = cache(
  async (options?: SearchOptions): Promise<GifsResult> =>
    sendRequest(
      "featured",
      {
        ...(options?.next ? { pos: `${options.next}` } : {}),
      },
      {
        cache: "force-cache",
      },
    ).then(transformResponse),
);

export const shareEvent = async (id: string, searchTerm: string) =>
  sendRequest("registershare", { id, q: searchTerm });
