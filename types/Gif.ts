export type Gif = {
  id: string | number;
  altText: string | undefined;
  url: string;
  width: number;
  height: number;
  previewUrl: string;
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
