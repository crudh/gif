import {
  tenorFeaturedHandler,
  tenorRegisterShareHandler,
  tenorSearchHandler,
} from "@/test/api/tenor";

export const defaultHandlers = [
  tenorFeaturedHandler(),
  tenorSearchHandler(),
  tenorRegisterShareHandler(),
];
