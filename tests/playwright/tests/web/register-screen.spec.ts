// register-screen.spec.ts

import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

test.describe("REGISTER SCREEN", () => {

  test.beforeAll(async () => {
    await seed();
  });

  test(
    "Register Page",
    {
      tag: "@auth",
    },

    async ({ page }) => {

      await page.goto(
        "/SessionManagement/register"
      );

      await expect(
        page.getByText("Register"),
      ).toBeVisible();

    },
  );

});