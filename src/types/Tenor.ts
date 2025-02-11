export type TenorGifFormat = {
  url: string;
  duration: number;
  preview: string;
  dims: [number, number];
  size: number;
};

export type TenorGif = {
  id: string;
  title: string;
  media_formats: {
    tinygif: TenorGifFormat;
    nanogif: TenorGifFormat;
    mediumgif: TenorGifFormat;
  };
  created: number;
  content_description: string;
  itemurl: string;
  url: string;
  tags: string[];
  flags: string[];
  hasaudio: boolean;
  content_description_source: string;
};

export type TenorRequestType = "search" | "featured" | "registershare";

export type TenorResponse = {
  locale?: string;
  next?: string | number;
  results: TenorGif[];
};
