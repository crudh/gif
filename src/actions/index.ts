"use server";

import { Gif } from "../../types/Gif";
import { searchGifs } from "../api/giphy";
import { defaultGifLimit } from "../constants";

export const handleSearchGifs = async (
  searchTerm: string,
  offset: number
): Promise<Gif[]> =>
  (await searchGifs(searchTerm, { offset, limit: defaultGifLimit })).gifs;
