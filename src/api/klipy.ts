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
} from "@/types/Klipy";
import { cookies } from "next/headers";

const baseSearchParams = {
  content_filter: "off",
  format_filter: "gif",
  per_page: `${gifLimit}`,
} as const satisfies Partial<KlipySearchParams>;

const getBaseURL = (requestType: KlipyRequestType) =>
  `${klipyBaseUrl}/${klipyApiKey}/gifs/${requestType}`;

const getCustomerId = async (): Promise<string> =>
  (await cookies()).get("cid")?.value ?? "";

const sendGifRequest = async (
  requestType: "search" | "trending",
  searchParams?: Record<string, string>,
  options?: RequestInit,
) => {
  const customerId = await getCustomerId();

  const finalSearchParams = new URLSearchParams({
    ...searchParams,
    customer_id: customerId,
  }).toString();

  const url = new URL(
    `${getBaseURL(requestType)}${finalSearchParams ? `?${finalSearchParams}` : ""}`,
  );

  const response = await fetch(url, options);
  if (!response.ok)
    throw new Error(`Failed to fetch ${requestType}: ${response.statusText}`);

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
    const params: Omit<KlipySearchParams, "customer_id"> = {
      ...baseSearchParams,
      q: searchTerm,
      ...(options?.next ? { page: `${options.next}` } : {}),
    };

    return sendGifRequest("search", params).then(transformGifResponse);
  },
);

export const trendingGifs = cache(
  async (options?: SearchOptions): Promise<GifsResult> => {
    const params: Omit<KlipyTrendingParams, "customer_id"> = {
      ...baseSearchParams,
      ...(options?.next ? { page: `${options.next}` } : {}),
    };

    return sendGifRequest("trending", params).then(transformGifResponse);
  },
);

export const shareEvent = async (slug: string, searchTerm: string) => {
  const customerId = await getCustomerId();

  const url = new URL(`${getBaseURL("share")}/${slug}`);

  const body: KlipyShareRequest = {
    customer_id: customerId,
    q: searchTerm,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok)
    throw new Error(`Failed to report share: ${response.statusText}`);
};
