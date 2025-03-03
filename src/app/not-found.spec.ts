import { expect } from "@playwright/test";
import { test } from "../test/browser/fixtures";
import { testLayout } from "../test/browser/shared";

test("page", async ({ page, baseUrl }) => {
  await page.goto(`${baseUrl}/dskfjsdkjfk`);

  await testLayout(page);

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeEmpty();

  const notFoundImage = page.getByRole("img", { name: "page not found" });
  await expect(notFoundImage).toBeVisible();

  const homeButton = page.getByRole("link", {
    name: "Go home",
  });
  await expect(homeButton).toBeVisible();

  await homeButton.click();

  await expect(page).toHaveURL(baseUrl);
});
