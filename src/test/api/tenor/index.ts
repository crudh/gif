import { http, HttpResponse } from "msw";
import { TenorResponse } from "../../../../types/Tenor";
import { tenorBaseUrl } from "../../../constants";
import { mockedFeaturedResponse } from "./mocks/featuredResponse";
import { mockedSearchResponse } from "./mocks/searchResponse";
import { isOkStatus } from "../../../utils/net";

export const tenorFeaturedHandler = (
  status: number = 200,
  response: TenorResponse = mockedFeaturedResponse,
) =>
  http.get(`${tenorBaseUrl}featured`, () => {
    if (!isOkStatus(status)) return new HttpResponse(null, { status });

    return HttpResponse.json(response, { status });
  });

export const tenorSearchdHandler = (
  status: number = 200,
  response: TenorResponse = mockedSearchResponse,
) =>
  http.get(`${tenorBaseUrl}search`, () => {
    if (!isOkStatus(status)) return new HttpResponse(null, { status });

    return HttpResponse.json(response, { status });
  });

export const tenorRegisterShareHandler = (status: number = 200) =>
  http.get(`${tenorBaseUrl}registershare`, () => {
    if (!isOkStatus(status)) return new HttpResponse(null, { status });

    return HttpResponse.json({}, { status });
  });
