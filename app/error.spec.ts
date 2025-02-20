import { expect, type Page } from "@playwright/test";
import { test } from "../src/test/browser/fixtures";
import {
  tenorFeaturedHandler,
  tenorSearchHandler,
} from "../src/test/api/tenor";
import { testLayout } from "../src/test/browser/shared";

const testPage = async (page: Page) => {
  await testLayout(page);

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
};

test("should trigger from the main page", async ({
  page,
  baseUrl,
  requestInterceptor,
}) => {
  requestInterceptor.use(tenorFeaturedHandler(500));

  await page.goto(baseUrl);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeEmpty();

  await testPage(page);
});

test("should trigger from the search page", async ({
  page,
  baseUrl,
  requestInterceptor,
}) => {
  requestInterceptor.use(tenorSearchHandler(500));

  await page.goto(`${baseUrl}/search/dog`);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toHaveValue("dog");

  await testPage(page);
});
