import { test as base } from "@playwright/test";
import type { Server } from "http";
import { createServer } from "http";
import type { SetupServerApi } from "msw/node";
import { setupServer } from "msw/node";
import type { AddressInfo } from "net";
import next from "next";
import path from "path";
import { parse } from "url";
import { defaultHandlers } from "../api/defaultHandlers";

export const it = base.extend<
  object,
  {
    baseUrl: string;
    requestInterceptor: SetupServerApi;
  }
>({
  baseUrl: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const app = next({
        dev: false,
        dir: path.resolve(__dirname, "../../.."),
      });
      await app.prepare();

      const handle = app.getRequestHandler();

      const server: Server = await new Promise((resolve) => {
        const server = createServer((req, res) => {
          const parsedUrl = parse(req.url!, true);
          handle(req, res, parsedUrl);
        });

        server.listen((error: unknown) => {
          if (error) throw error;
          resolve(server);
        });
      });

      const port = (server.address() as AddressInfo).port.toString();
      await use(`http://localhost:${port}`);
    },
    { scope: "worker", auto: true },
  ],
  requestInterceptor: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      await use(
        (() => {
          const requestInterceptor = setupServer(...defaultHandlers);

          requestInterceptor.listen({
            onUnhandledRequest: "error",
          });

          return requestInterceptor;
        })(),
      );
    },
    { scope: "worker", auto: true },
  ],
});
