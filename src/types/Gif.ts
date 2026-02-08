export type Gif = {
  id: number;
  slug: string;
  title: string | undefined;
  blurUrl: string;
  previewUrl: string;
  previewUrlHighQuality: string;
  shareUrl: string;
};

export type GifsResult = {
  gifs: Gif[];
  next?: string;
};

export type SearchOptions = {
  next?: string;
};
