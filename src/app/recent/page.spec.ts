import { expect } from "@playwright/test";
import { gifLimit } from "@/constants";
import { test } from "@/test/browser/fixtures";
import { testLayout } from "@/test/browser/shared";
import { getTabKey } from "@/test/browser/utils";
import { mockedTrendingResponse } from "@/test/api/klipy/mocks/trendingResponse";
import { klipyRecentHandler } from "@/test/api/klipy";

test("initial render", async ({ page, baseUrl }) => {
  await page.goto(`${baseUrl}/recent`);

  await testLayout(page);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeEmpty();

  await expect(
    page.getByRole("heading", { name: "Recent shares" }),
  ).toBeVisible();

  const gifs = page.getByRole("button", {
    name: /Load high quality preview of gif with description/,
  });
  await expect(gifs).toHaveCount(gifLimit);

  const emptyImage = page.getByRole("img", {
    name: "nothing, absolutely nothing",
  });
  await expect(emptyImage).not.toBeVisible();
});

test("empty history", async ({ page, baseUrl, requestInterceptor }) => {
  requestInterceptor.use(
    klipyRecentHandler(200, {
      ...mockedTrendingResponse,
      data: { ...mockedTrendingResponse.data, data: [], has_next: false },
    }),
  );

  await page.goto(`${baseUrl}/recent`);

  await testLayout(page);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeEmpty();

  await expect(
    page.getByRole("heading", { name: "Recent shares" }),
  ).toBeVisible();

  const gifs = page.getByRole("button", {
    name: /Load high quality preview of gif with description/,
  });
  await expect(gifs).toHaveCount(0);

  const emptyImage = page.getByRole("img", {
    name: "nothing, absolutely nothing",
  });
  await expect(emptyImage).toBeVisible();
});

test("scrolling to load more gifs", async ({
  page,
  baseUrl,
  requestInterceptor,
}) => {
  requestInterceptor.use(
    klipyRecentHandler(200, mockedTrendingResponse, { delay: 200 }),
  );

  await page.goto(`${baseUrl}/recent`);

  const gifs = page.getByRole("button", {
    name: /Load high quality preview of gif with description/,
  });
  await expect(gifs).toHaveCount(gifLimit);

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await expect(page.getByRole("progressbar")).toBeVisible();

  await expect(gifs).toHaveCount(gifLimit * 2);
  await expect(page.getByRole("progressbar")).not.toBeVisible();
});

test("handle error on scroll", async ({
  page,
  baseUrl,
  requestInterceptor,
}) => {
  requestInterceptor.use(klipyRecentHandler(200, mockedTrendingResponse));

  await page.goto(`${baseUrl}/recent`);

  const gifs = page.getByRole("button", {
    name: /Load high quality preview of gif with description/,
  });
  await expect(gifs).toHaveCount(gifLimit);

  requestInterceptor.use(klipyRecentHandler(500, undefined, { delay: 200 }));

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await expect(page.getByRole("progressbar")).toBeVisible();
  await expect(page.getByRole("progressbar")).not.toBeVisible();

  await expect(page.getByText("Failed to load more!")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Try again", exact: true }),
  ).toBeVisible();
});

test("selecting a gif and copying the url", async ({
  page,
  baseUrl,
  browserName,
}) => {
  await page.goto(`${baseUrl}/recent`);

  const gifs = page.getByRole("button", {
    name: /Load high quality preview of gif with description/,
  });
  const firstGif = gifs.first();

  await firstGif.click();

  const clipboard = page.getByRole("button", {
    name: "Copy gif share link to clipboard",
  });

  await clipboard.click();

  await expect(page.getByText("Copied!")).toBeVisible();

  // https://github.com/microsoft/playwright/issues/34307
  if (!(browserName === "webkit" && process.env.CI)) {
    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );
    expect(clipboardText).toContain(
      mockedTrendingResponse.data.data[0].file.md.gif.url,
    );
  }
});

test("keyboard navigation of gifs", async ({ page, baseUrl, browserName }) => {
  await page.goto(`${baseUrl}/recent`);
  const tabKey = getTabKey(browserName);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeFocused();

  await page.keyboard.press(tabKey);

  const searchButton = page.getByRole("button", { name: "Search" });
  await expect(searchButton).toBeFocused();

  await page.keyboard.press(tabKey);

  const gifs = page.getByRole("button", {
    name: /Load high quality preview of gif with description/,
  });
  const firstGif = gifs.first();
  await expect(firstGif).toBeFocused();

  await page.keyboard.press(tabKey);

  const secondGif = gifs.nth(1);
  await expect(secondGif).toBeFocused();

  const clipboard = page.getByRole("button", {
    name: "Copy gif share link to clipboard",
  });
  await expect(clipboard).not.toBeVisible();

  await page.keyboard.press("Enter");

  await expect(secondGif).toBeFocused();
  await expect(clipboard).toBeVisible();
  await expect(clipboard).not.toBeFocused();

  await page.keyboard.press(tabKey);

  await expect(clipboard).toBeFocused();

  await page.keyboard.press("Enter");

  // https://github.com/microsoft/playwright/issues/34307
  if (!(browserName === "webkit" && process.env.CI)) {
    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );
    expect(clipboardText).toContain(
      mockedTrendingResponse.data.data[1].file.md.gif.url,
    );
  }
});
