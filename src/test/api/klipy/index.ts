import { delay, HttpResponse, http, type DelayMode } from "msw";
import { isOkStatus } from "@/utils/net";
import type { KlipyGifResponse } from "@/types/Klipy";
import { mockedTrendingResponse } from "./mocks/trendingResponse";
import { mockedSearchResponse } from "./mocks/searchResponse";
import { klipyBaseUrl } from "@/constants";

export const klipyTrendingHandler = (
  status: number = 200,
  response: KlipyGifResponse = mockedTrendingResponse,
  options?: { delay: DelayMode | number },
) =>
  http.get(`${klipyBaseUrl}/:apiKey/gifs/trending`, async () => {
    if (options?.delay) {
      await delay(options.delay);
    }

    if (!isOkStatus(status)) return new HttpResponse(null, { status });

    return HttpResponse.json(response, { status });
  });

export const klipySearchHandler = (
  status: number = 200,
  response: KlipyGifResponse = mockedSearchResponse,
  options?: { delay: DelayMode | number },
) =>
  http.get(`${klipyBaseUrl}/:apiKey/gifs/search`, async () => {
    if (options?.delay) {
      await delay(options.delay);
    }

    if (!isOkStatus(status)) return new HttpResponse(null, { status });

    return HttpResponse.json(response, { status });
  });

export const klipyShareHandler = (status: number = 200) =>
  http.get(`${klipyBaseUrl}/:apiKey/gifs/share/:slug`, () => {
    if (!isOkStatus(status)) return new HttpResponse(null, { status });

    return HttpResponse.json({}, { status });
  });
