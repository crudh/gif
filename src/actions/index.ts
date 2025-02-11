"use server";

import type { GifsResult } from "../types/Gif";
import { searchGifs, shareEvent } from "../api/tenor";
import { deployEnv } from "../constants";

export const handleSearchGifs = async (
  searchTerm: string,
  next?: string,
): Promise<GifsResult> => searchGifs(searchTerm, { next });

export const handleShared = async (
  id: string,
  searchTerm: string,
): Promise<void> => {
  if (deployEnv !== "production") return;

  shareEvent(id, searchTerm);
};
