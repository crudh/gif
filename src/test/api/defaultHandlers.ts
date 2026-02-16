import {
  klipyRecentHandler,
  klipySearchHandler,
  klipyShareHandler,
  klipyTrendingHandler,
} from "./klipy";

export const defaultHandlers = [
  klipyTrendingHandler(),
  klipySearchHandler(),
  klipyRecentHandler(),
  klipyShareHandler(),
];
