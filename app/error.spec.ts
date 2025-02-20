import { expect } from "@playwright/test";
import { test } from "../src/test/browser/fixtures";
import { tenorFeaturedHandler } from "../src/test/api/tenor";
import { testLayout } from "../src/test/browser/shared";

test("initial render", async ({ page, baseUrl, requestInterceptor }) => {
  requestInterceptor.use(tenorFeaturedHandler(500));

  await page.goto(baseUrl);

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
});
