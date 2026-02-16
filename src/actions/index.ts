"use server";

import { recentGifs, searchGifs, shareEvent, trendingGifs } from "@/api/klipy";
import type { GifsResult } from "@/types/Gif";

export const handleSearchGifs = async (
  searchTerm: string,
  next?: string,
): Promise<GifsResult> => searchGifs(searchTerm, { next });

export const handleTrendingGifs = async (next?: string): Promise<GifsResult> =>
  trendingGifs({ next });

export const handleRecentGifs = async (next?: string): Promise<GifsResult> =>
  recentGifs({ next });

export const handleShared = async (
  slug: string,
  searchTerm?: string,
): Promise<void> => {
  await shareEvent(slug, searchTerm);
};
