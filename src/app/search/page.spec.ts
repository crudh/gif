import { expect } from "@playwright/test";
import { test } from "../../test/browser/fixtures";

test("redirection to landing page", async ({ page, baseUrl }) => {
  await page.goto(`${baseUrl}/search`);

  await expect(page).toHaveURL(baseUrl);
});
