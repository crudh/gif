export type KlipyRequestType = "search" | "trending" | "share";
export type KlipyContentFilter = "off" | "low" | "medium" | "high";
export type KlipyQuality = "hd" | "md" | "sm" | "xs";

export type KlipyGifFormat = "gif";

export type KlipyBaseParams = {
  customer_id: string;
  page?: string; // default "1"
  per_page?: string; // default "24"
  locale?: string; // ISO 3166
  format_filter?: KlipyGifFormat;
};

export type KlipyTrendingParams = KlipyBaseParams;

export type KlipySearchParams = KlipyBaseParams & {
  q: string;
  content_filter?: KlipyContentFilter;
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
  q: string;
};
