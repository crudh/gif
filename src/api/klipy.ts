import { cache } from "react";
import { gifLimit, klipyApiKey, klipyBaseUrl } from "@/constants";
import type { Gif, GifsResult, SearchOptions } from "@/types/Gif";
import type {
  KlipySearchParams,
  KlipyRequestType,
  KlipyTrendingParams,
  KlipyGifResponse,
  KlipyGif,
  KlipyShareRequest,
  KlipyRecentParams,
} from "@/types/Klipy";
import { cookies } from "next/headers";

const contentFilter = "off";
const formatFilter = "gif";

const getCustomerId = async (): Promise<string> =>
  (await cookies()).get("cid")?.value ?? "";

const createURL = (
  requestType: KlipyRequestType,
  options?: {
    additionalPath?: string;
    searchParams?: KlipySearchParams | KlipyTrendingParams | KlipyRecentParams;
  },
) => {
  const baseURL = `${klipyBaseUrl}/${klipyApiKey}/gifs/${requestType}`;
  const additionalPath = options?.additionalPath ?? "";

  const urlSearchParams = new URLSearchParams({
    ...(options?.searchParams ?? {}),
  }).toString();
  const searchParams = urlSearchParams ? `?${urlSearchParams}` : "";

  return new URL(`${baseURL}${additionalPath}${searchParams}`);
};

const sendRequest = async (url: URL, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok)
    throw new Error(`Failed to fetch ${url.pathname}: ${response.statusText}`);

  return response.json();
};

const transformGif = (gif: KlipyGif): Gif => ({
  id: gif.id,
  slug: gif.slug,
  title: gif.title,
  blurUrl: gif.blur_preview,
  previewUrl: gif.file.xs.gif.url,
  previewUrlHighQuality: gif.file.md.gif.url,
  shareUrl: gif.file.md.gif.url,
});

const transformGifResponse = (response: KlipyGifResponse): GifsResult => ({
  next: response.data.has_next
    ? `${response.data.current_page + 1}`
    : undefined,
  gifs: response.data.data.map(transformGif),
});

export const searchGifs = cache(
  async (searchTerm: string, options?: SearchOptions): Promise<GifsResult> => {
    const customerId = await getCustomerId();

    const searchParams: KlipySearchParams = {
      q: searchTerm,
      customer_id: customerId,
      per_page: `${gifLimit}`,
      content_filter: contentFilter,
      format_filter: formatFilter,
      ...(options?.next ? { page: `${options.next}` } : {}),
    };

    const url = createURL("search", {
      searchParams,
    });

    return sendRequest(url).then(transformGifResponse);
  },
);

export const trendingGifs = cache(
  async (options?: SearchOptions): Promise<GifsResult> => {
    const customerId = await getCustomerId();

    const searchParams: KlipyTrendingParams = {
      customer_id: customerId,
      per_page: `${gifLimit}`,
      format_filter: formatFilter,
      ...(options?.next ? { page: `${options.next}` } : {}),
    };

    const url = createURL("trending", {
      searchParams,
    });

    return sendRequest(url).then(transformGifResponse);
  },
);

export const recentGifs = cache(
  async (options?: SearchOptions): Promise<GifsResult> => {
    const customerId = await getCustomerId();

    const searchParams: KlipyRecentParams = {
      per_page: `${gifLimit}`,
      format_filter: formatFilter,
      ...(options?.next ? { page: `${options.next}` } : {}),
    };

    const url = createURL("recent", {
      searchParams,
      additionalPath: `/${customerId}`,
    });

    return sendRequest(url).then(transformGifResponse);
  },
);

export const shareEvent = async (slug: string, searchTerm: string) => {
  const customerId = await getCustomerId();

  const url = createURL("share", {
    additionalPath: `/${slug}`,
  });

  const body: KlipyShareRequest = {
    customer_id: customerId,
    q: searchTerm,
  };

  await sendRequest(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
