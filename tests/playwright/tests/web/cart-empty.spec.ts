import { expect, test }
from "./fixtures";

test.describe(
  "EMPTY CART SCREEN",
  () => {

    test(
      "Empty Cart",
      {
        tag: "@cart",
      },

      async ({ page }) => {

        await page.goto(
          "/PaymentSystem/cart"
        );

        await expect(
          page.getByText(
            "Your cart is empty",
          ),
        ).toBeVisible();

      },
    );

  },
);