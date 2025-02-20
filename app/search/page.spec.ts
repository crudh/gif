import { expect } from "@playwright/test";
import { test } from "../../src/test/browser/fixtures";

test("redirection to landing page", async ({ page, baseUrl }) => {
  await page.goto(`${baseUrl}/search`);

  await expect(page).toHaveURL(baseUrl);
});
