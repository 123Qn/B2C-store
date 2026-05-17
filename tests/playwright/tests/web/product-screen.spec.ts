import { expect, test } from "./fixtures";

test.describe("PRODUCT SCREEN", () => {

  test(
    "Existing Product",
    {
      tag: "@b2c",
    },

    async ({ page }) => {

      await page.goto(
        "/products/flag-embroidery-terry-quarter-zip-jumper",
      );

      await expect(
        page.getByText(
          "Flag Embroidery Terry Quarter-Zip Jumper",
        ),
      ).toBeVisible();

      await expect(
        page.getByText("Add To Cart"),
      ).toBeVisible();

    },
  );

  test(
    "Invalid Product",
    {
      tag: "@b2c",
    },

    async ({ page }) => {

      await page.goto("/products/abc");

      await expect(page)
        .toHaveURL(
          /products\/abc/,
        );

    },
  );

});