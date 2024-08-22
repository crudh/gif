export type Gif = {
  id: string;
  altText: string | undefined;
  previewUrl: string;
  previewWidth: number;
  previewHeight: number;
  previewUrlFull: string;
  shareUrl: string;
};

export type GifsResult = {
  gifs: Gif[];
  next?: string;
};

export type SearchOptions = {
  next?: string;
};
