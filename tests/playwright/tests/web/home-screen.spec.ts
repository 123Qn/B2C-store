import { expect, test } from "./fixtures";

test.describe("HOME SCREEN", () => {

  test(
    "Home Loads",
    {
      tag: "@b2c",
    },

    async ({ page }) => {

      await page.goto("/");

      await expect(
        page.getByText("Q Fashion"),
      ).toBeVisible();

    },
  );

  test(
    "Products Visible",
    {
      tag: "@b2c",
    },

    async ({ page }) => {

      await page.goto("/");

      const products =
        await page.locator("article");

      await expect(products)
        .not.toHaveCount(0);

    },
  );

});