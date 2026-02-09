import {
  klipySearchHandler,
  klipyShareHandler,
  klipyTrendingHandler,
} from "./klipy";

export const defaultHandlers = [
  klipyTrendingHandler(),
  klipySearchHandler(),
  klipyShareHandler(),
];
