import { delay, HttpResponse, http, type DelayMode } from "msw";
import { tenorBaseUrl } from "@/constants";
import { mockedFeaturedResponse } from "@/test/api/tenor/mocks/featuredResponse";
import { mockedSearchResponse } from "@/test/api/tenor/mocks/searchResponse";
import type { TenorResponse } from "@/types/Tenor";
import { isOkStatus } from "@/utils/net";

export const tenorFeaturedHandler = (
  status: number = 200,
  response: TenorResponse = mockedFeaturedResponse,
) =>
  http.get(`${tenorBaseUrl}featured`, () => {
    if (!isOkStatus(status)) return new HttpResponse(null, { status });

    return HttpResponse.json(response, { status });
  });

export const tenorSearchHandler = (
  status: number = 200,
  response: TenorResponse = mockedSearchResponse,
  options?: { delay: DelayMode | number },
) =>
  http.get(`${tenorBaseUrl}search`, async () => {
    if (options?.delay) {
      await delay(options.delay);
    }

    if (!isOkStatus(status)) return new HttpResponse(null, { status });

    return HttpResponse.json(response, { status });
  });

export const tenorRegisterShareHandler = (status: number = 200) =>
  http.get(`${tenorBaseUrl}registershare`, () => {
    if (!isOkStatus(status)) return new HttpResponse(null, { status });

    return HttpResponse.json({}, { status });
  });
