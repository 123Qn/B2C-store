import { expect, test } from "./fixtures";

test.describe("SEARCH POPUP", () => {

  test("Search Product", { tag: "@b2c" }, async ({ page }) => {

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const input = page.getByPlaceholder("Search your items...");
    await input.click();
    await input.fill("Sneakers");
    await page.waitForTimeout(1000);

    // CHECK POPUP APPEARS
    await expect(page.getByText("Product Results")).toBeVisible({ timeout: 5000 });

  });

});