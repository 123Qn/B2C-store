import { expect, test } from "./fixtures";

test.describe("CATEGORY SCREEN", () => {

  test(
    "Existing Category",
    {
      tag: "@b2c",
    },

    async ({ page }) => {

      await page.goto("/category/shoes");

      await expect(
        page.getByText(
          "White Minimal Sneakers",
        ),
      ).toBeVisible();

    },
  );

  test(
    "Invalid Category",
    {
      tag: "@b2c",
    },

    async ({ page }) => {

      await page.goto("/category/abc");

      await expect(
        page.getByText("0 Products"),
      ).toBeVisible();

    },
  );

});