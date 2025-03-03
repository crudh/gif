import { expect } from "@playwright/test";
import { getTabKey } from "../../../test/browser/utils";
import { mockedSearchResponse } from "../../../test/api/tenor/mocks/searchResponse";
import { testLayout } from "../../../test/browser/shared";
import { gifLimit } from "../../../constants";
import { test } from "../../../test/browser/fixtures";

test("initial render", async ({ page, baseUrl }) => {
  await page.goto(`${baseUrl}/search/dog`);

  await testLayout(page);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toHaveValue("dog");

  const gifs = page.getByRole("button", {
    name: /Load full preview of gif with description/,
  });
  await expect(gifs).toHaveCount(gifLimit);
});

test("selecting a gif and copying the url", async ({
  page,
  baseUrl,
  browserName,
}) => {
  await page.goto(`${baseUrl}/search/dog`);

  const gifs = page.getByRole("button", {
    name: /Load full preview of gif with description/,
  });
  const firstGif = gifs.first();

  await firstGif.click();

  const clipboard = page.getByRole("button", {
    name: "Copy gif share link to clipboard",
  });

  await clipboard.click();

  // https://github.com/microsoft/playwright/issues/34307
  if (!(browserName === "webkit" && process.env.CI)) {
    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );
    expect(clipboardText).toContain(
      mockedSearchResponse.results[0].media_formats.mediumgif.url,
    );
  }
});

test("searching for gifs", async ({ page, baseUrl }) => {
  await page.goto(`${baseUrl}/search/dog`);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await searchInput.clear();
  await searchInput.fill("cats");

  const searchButton = page.getByRole("button", { name: "Search" });
  await searchButton.click();

  await expect(page).toHaveURL(`${baseUrl}/search/cats`);
});

test("keyboard navigation of gifs", async ({ page, baseUrl, browserName }) => {
  await page.goto(`${baseUrl}/search/dog`);
  const tabKey = getTabKey(browserName);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeFocused();

  await page.keyboard.press(tabKey);

  const searchButton = page.getByRole("button", { name: "Search" });
  await expect(searchButton).toBeFocused();

  await page.keyboard.press(tabKey);

  const gifs = page.getByRole("button", {
    name: /Load full preview of gif with description/,
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
      mockedSearchResponse.results[1].media_formats.mediumgif.url,
    );
  }
});

test("keyboard navigation of searching for gifs", async ({
  page,
  baseUrl,
  browserName,
}) => {
  await page.goto(`${baseUrl}/search/dog`);
  const tabKey = getTabKey(browserName);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeFocused();
  await searchInput.clear();

  await page.keyboard.insertText("cats");
  await page.keyboard.press(tabKey);

  const searchButton = page.getByRole("button", { name: "Search" });
  await expect(searchButton).toBeFocused();

  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(`${baseUrl}/search/cats`);
});
