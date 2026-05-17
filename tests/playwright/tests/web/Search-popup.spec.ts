import { expect, test }
from "./fixtures";

test.describe(
  "SEARCH POPUP",
  () => {

    test(
      "Search Product",
      {
        tag: "@b2c",
      },

      async ({ page }) => {

        await page.goto("/");

        await page.waitForLoadState(
          "networkidle"
        );

        const input =
          page.getByPlaceholder(
            "Search your items..."
          );

        await input.click();

        await input.type(
          "Minimal"
        );

        await page.waitForTimeout(
          1000
        );

        await expect(
          page
            .getByText(
              "White Minimal Sneakers"
            )
            .first(),
        ).toBeVisible();

      },
    );

  },
);