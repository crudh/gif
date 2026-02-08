"use server";

import { deployEnv } from "@/constants";
import { searchGifs, shareEvent } from "@/api/klipy";
import type { GifsResult } from "@/types/Gif";

export const handleSearchGifs = async (
  searchTerm: string,
  next?: string,
): Promise<GifsResult> => searchGifs(searchTerm, { next });

export const handleShared = async (
  slug: string,
  searchTerm: string,
): Promise<void> => {
  if (deployEnv !== "production") return;

  shareEvent(slug, searchTerm);
};
