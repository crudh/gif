import {
  tenorFeaturedHandler,
  tenorRegisterShareHandler,
  tenorSearchHandler,
} from "./tenor";

export const defaultHandlers = [
  tenorFeaturedHandler(),
  tenorSearchHandler(),
  tenorRegisterShareHandler(),
];
