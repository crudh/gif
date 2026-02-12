export type KlipyRequestType = "search" | "trending" | "recent" | "share";
export type KlipyContentFilter = "off" | "low" | "medium" | "high";
export type KlipyQuality = "hd" | "md" | "sm" | "xs";

export type KlipyGifFormat = "gif";

export type KlipySearchParams = {
  customer_id: string;
  q: string;
  page?: string;
  per_page?: string;
  locale?: string;
  format_filter?: KlipyGifFormat;
  content_filter?: KlipyContentFilter;
};

export type KlipyTrendingParams = {
  customer_id: string;
  page?: string;
  per_page?: string;
  locale?: string;
  format_filter?: KlipyGifFormat;
};

export type KlipyRecentParams = {
  page?: string;
  per_page?: string;
  format_filter?: KlipyGifFormat;
};

export type KlipyGifFile = {
  url: string;
  width: number;
  height: number;
  size: number;
};

export type KlipyFiles = Record<
  KlipyQuality,
  Record<KlipyGifFormat, KlipyGifFile>
>;

export type KlipyGif = {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  blur_preview: string;
  type: "gif";
  file: KlipyFiles;
};

export type KlipyGifResponse = {
  result: boolean;
  data: {
    current_page: number;
    per_page: number;
    has_next: boolean;
    meta: unknown;
    data: KlipyGif[];
  };
};

export type KlipyShareRequest = {
  customer_id: string;
  q?: string;
};
