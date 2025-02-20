import { expect } from "@playwright/test";
import { test } from "../src/test/browser/fixtures";
import { tenorFeaturedHandler } from "../src/test/api/tenor";

test("initial render", async ({ page, baseUrl, requestInterceptor }) => {
  requestInterceptor.use(tenorFeaturedHandler(500));

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
  await expect(gifs).toHaveCount(0);

  const reloadButton = page.getByRole("button", {
    name: "Reload and try again",
  });
  await expect(reloadButton).toBeVisible();

  const errorImage = page.getByRole("img", { name: "an error occured" });
  await expect(errorImage).toBeVisible();

  const footer = page.getByRole("img", { name: "Powered by Tenor" });
  await expect(footer).toBeVisible();
});
