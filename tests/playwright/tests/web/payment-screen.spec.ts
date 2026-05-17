// payment-screen.spec.ts

import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

test.describe("PAYMENT SCREEN", () => {

  test.beforeAll(async () => {
    await seed();
  });

  test(
    "Payment Page",
    {
      tag: "@payment",
    },

    async ({ page }) => {

      await page.goto(
        "/PaymentSystem/payment"
      );

      await expect(page)
        .toHaveURL(
          /payment/,
        );

    },
  );

});