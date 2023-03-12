export type Gif = {
  id: string | number;
  url: string;
  previewUrl: string;
  altText: string | undefined;
};

export type GifsResult = {
  count: number;
  totalCount: number;
  offset: number;
  gifs: Gif[];
};

export type SearchOptions = {
  limit?: number;
  offset?: number;
};
