import { expect } from "@playwright/test";
import { it } from "../src/test/browser/fixtures";

it("renders correctly", async ({ page, baseUrl, _requestInterceptor }) => {
  await page.goto(baseUrl);

  // title
  await expect(page).toHaveTitle("gifs.run - the fastest way to share gifs");

  // logo
  const logo = page.getByRole("img", { name: "gifs.run logo" });
  await expect(logo).toBeVisible();

  // search input
  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeEmpty();
  await expect(searchInput).toBeFocused();
  await expect(searchInput).toHaveAttribute("placeholder", "Search for a gif");

  // search button
  const searchButton = page.getByRole("button", { name: "Search" });
  await expect(searchButton).toBeVisible();

  // footer
  const footer = page.getByRole("img", { name: "Powered by Tenor" });
  await expect(footer).toBeVisible();
});
