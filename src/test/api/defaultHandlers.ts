import {
  tenorFeaturedHandler,
  tenorRegisterShareHandler,
  tenorSearchdHandler,
} from "./tenor";

export const defaultHandlers = [
  tenorFeaturedHandler(),
  tenorSearchdHandler(),
  tenorRegisterShareHandler(),
];
