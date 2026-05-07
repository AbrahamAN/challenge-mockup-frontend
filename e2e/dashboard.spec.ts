import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard");
  });

  test("shows the dashboard title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Crypto Dashboard" })
    ).toBeVisible();
  });

  test("loads and displays assets in the table", async ({ page }) => {
    await expect(page.getByText("Bitcoin").first()).toBeVisible({
      timeout: 20000
    });
    await expect(page.getByText("Ethereum").first()).toBeVisible({
      timeout: 20000
    });
  });

  test("search filters assets correctly", async ({ page }) => {
    await expect(page.getByText("Bitcoin").first()).toBeVisible({
      timeout: 20000
    });

    await page.getByPlaceholder("Search by name or symbol...").fill("bitcoin");
    await expect(page.getByText("Bitcoin").first()).toBeVisible();
    await expect(page.getByText("Ethereum").first()).not.toBeVisible();
  });

  test("navigates to asset detail page on row click", async ({ page }) => {
    await page.getByText("Bitcoin").first().click();
    await expect(page).toHaveURL(/\/dashboard\/bitcoin/);
    await expect(page.getByRole("heading", { name: /Bitcoin/i })).toBeVisible({
      timeout: 10000
    });
  });

  test("shows empty state when no results match search", async ({ page }) => {
    await expect(page.getByText("Bitcoin").first()).toBeVisible({
      timeout: 20000
    });

    await page
      .getByPlaceholder("Search by name or symbol...")
      .fill("xyznotexists");

    await expect(page.getByText("No assets found")).toBeVisible({
      timeout: 10000
    });
  });
});
