import { type Page, expect } from "@playwright/test";

export const testLayout = async (page: Page) => {
  await expect(page).toHaveTitle("gifs.run - the fastest way to share gifs");

  const logo = page.getByRole("img", { name: "gifs.run logo" });
  await expect(logo).toBeVisible();

  const logoLink = page.getByRole("link", { name: "Go to start page" });
  await expect(logoLink).toBeVisible();
  await expect(logoLink).toHaveAttribute("href", "/");

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeFocused();
  await expect(searchInput).toHaveAttribute("placeholder", "Search for a gif");

  const searchButton = page.getByRole("button", { name: "Search" });
  await expect(searchButton).toBeVisible();

  const footer = page.getByRole("img", { name: "Powered by Klipy" });
  await expect(footer).toBeVisible();
};
