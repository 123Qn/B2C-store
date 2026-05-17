// login-screen.spec.ts

import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

test.describe("LOGIN SCREEN", () => {

  test.beforeAll(async () => {
    await seed();
  });

  test(
    "Login Page",
    {
      tag: "@auth",
    },

    async ({ page }) => {

      await page.goto(
        "/SessionManagement/login"
      );

      await expect(
        page.getByText("Login"),
      ).toBeVisible();

    },
  );

});