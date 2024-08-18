"use server";

import { GifsResult } from "../../types/Gif";
import { searchGifs } from "../api/tenor";

export const handleSearchGifs = async (
  searchTerm: string,
  next?: string
): Promise<GifsResult> => searchGifs(searchTerm, { next });
