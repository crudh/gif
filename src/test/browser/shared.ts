import { type Page, expect } from "@playwright/test";

export const testLayout = async (page: Page) => {
  await expect(page).toHaveTitle("gifs.run - the fastest way to share gifs");

  const logo = page.getByRole("img", { name: "gifs.run logo" });
  await expect(logo).toBeVisible();

  const startLink = page.getByRole("link", { name: "Start", exact: true });
  await expect(startLink).toBeVisible();
  await expect(startLink).toHaveAttribute("href", "/");

  const recentLink = page.getByRole("link", { name: "Share history" });
  await expect(recentLink).toBeVisible();
  await expect(recentLink).toHaveAttribute("href", "/recent");

  const logoLink = page.getByRole("link", {
    name: "Go to start page",
    exact: true,
  });
  await expect(logoLink).toBeVisible();
  await expect(logoLink).toHaveAttribute("href", "/");

  const searchInput = page.getByRole("textbox", { name: "search" });
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeFocused();
  await expect(searchInput).toHaveAttribute("placeholder", "Search KLIPY");

  const searchButton = page.getByRole("button", { name: "Search" });
  await expect(searchButton).toBeVisible();

  const footer = page.getByRole("img", { name: "Powered by Klipy" });
  await expect(footer).toBeVisible();
};
