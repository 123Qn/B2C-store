import { expect, test }
from "./fixtures";

test.describe(
  "CART WITH ITEM",
  () => {

    test(
      "User Add Product Then Login",
      {
        tag: "@cart",
      },

      async ({ page }) => {

        // OPEN PRODUCT
        await page.goto(
          "/products/flag-embroidery-terry-quarter-zip-jumper",
        );

        // SELECT SIZE
        await page
          .getByRole("button", {
            name: "M",
          })
          .click();

        // HANDLE ALERT
        page.on(
          "dialog",
          async (dialog) => {

            expect(
              dialog.message()
            ).toContain(
              "Cart Added"
            );

            await dialog.accept();

          },
        );

        // ADD TO CART
        await page
          .getByRole("button", {
            name: "Add To Cart",
          })
          .click();

        // WAIT
        await page.waitForTimeout(
          2000
        );

        // OPEN CART
        await page.goto(
          "/PaymentSystem/cart",
        );

        // LOGIN PAGE
        await expect(page)
          .toHaveURL(
            /login/,
          );

        // LOGIN
        await page
          .getByPlaceholder(
            "Email",
          )
          .fill(
            "test@mail.com",
          );

        await page
          .getByPlaceholder(
            "Password",
          )
          .fill("123");

        await page
          .getByRole("button", {
            name: "Login",
          })
          .click();

        // WAIT LOGIN
        await page.waitForTimeout(
          3000
        );

        // RETURN CART
        await page.goto(
          "/PaymentSystem/cart",
        );

        // CHECK PRODUCT
        await expect(
          page.getByText(
            "Flag Embroidery",
          ).first(),
        ).toBeVisible();

        // CHECK SIZE
        await expect(
          page.getByText(
            "Size: M",
          ),
        ).toBeVisible();

      },
    );

  },
);