import { expect } from "@playwright/test";
import { test } from "../src/test/browser/fixtures";
import { getTabKey } from "../src/test/browser/utils";
import { mockedFeaturedResponse } from "../src/test/api/tenor/mocks/featuredResponse";

test("initial render", async ({ page, baseUrl }) => {
  await page.goto(baseUrl);

  await expect(page).toHaveTitle("gifs.run - the fastest way to share gifs");

  const logo = page.getByRole("img", { name: "gifs.run logo" });
  await expect(logo).toBeVisible();

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeEmpty();
  await expect(searchInput).toBeFocused();
  await expect(searchInput).toHaveAttribute("placeholder", "Search for a gif");

  const searchButton = page.getByRole("button", { name: "Search" });
  await expect(searchButton).toBeVisible();

  const gifs = page.getByRole("button", {
    name: /Load full preview of gif with description/,
  });
  await expect(gifs).toHaveCount(50);

  const footer = page.getByRole("img", { name: "Powered by Tenor" });
  await expect(footer).toBeVisible();
});

test("selecting a gif and copying the url", async ({ page, baseUrl }) => {
  await page.goto(baseUrl);

  const gifs = page.getByRole("button", {
    name: /Load full preview of gif with description/,
  });
  const firstGif = gifs.first();

  await firstGif.click();

  const clipboard = page.getByRole("button", {
    name: "Copy gif share link to clipboard",
  });

  await clipboard.click();

  const clipboardText = await page.evaluate(() =>
    navigator.clipboard.readText(),
  );
  expect(clipboardText).toContain(
    mockedFeaturedResponse.results[0].media_formats.mediumgif.url,
  );
});

test("searching for gifs", async ({ page, baseUrl }) => {
  await page.goto(baseUrl);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await searchInput.fill("cats");

  const searchButton = page.getByRole("button", { name: "Search" });
  await searchButton.click();

  await expect(page).toHaveURL(`${baseUrl}/search/cats`);
});

test("keyboard navigation of gifs", async ({ page, baseUrl }) => {
  await page.goto(baseUrl);
  const tabKey = getTabKey(test);

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

  const clipboardText = await page.evaluate(() =>
    navigator.clipboard.readText(),
  );
  expect(clipboardText).toContain(
    mockedFeaturedResponse.results[1].media_formats.mediumgif.url,
  );
});

test("keyboard navigation of searching for gifs", async ({ page, baseUrl }) => {
  await page.goto(baseUrl);
  const tabKey = getTabKey(test);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeFocused();

  await page.keyboard.insertText("cats");
  await page.keyboard.press(tabKey);

  const searchButton = page.getByRole("button", { name: "Search" });
  await expect(searchButton).toBeFocused();

  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(`${baseUrl}/search/cats`);
});
