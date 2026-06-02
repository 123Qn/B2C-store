import { expect, test } from "./fixtures";

async function loginAsAdmin(page: any) {
  await page.goto("/SessionManagement/login");
  await page.getByPlaceholder("Email").fill("admin@qfashion.com");
  await page.getByPlaceholder("Password").fill("123");
  await page.getByTestId("login-btn").click();
  await page.waitForTimeout(2000);
}

test.describe("ADMIN", () => {

  test(
    "Admin Login And See Dashboard",
    { tag: "@admin" },
    async ({ page }) => {

      await loginAsAdmin(page);

      await expect(page).toHaveURL(/admin/);
      await expect(page.getByRole("heading", { name: "Admin Dashboard" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Orders" })).toBeVisible();

    },
  );

  test(
    "Buyer Cannot Access Admin",
    { tag: "@admin" },
    async ({ page }) => {

      await page.goto("/SessionManagement/login");
      await page.getByPlaceholder("Email").fill("buyer@gmail.com");
      await page.getByPlaceholder("Password").fill("123");
      await page.getByTestId("login-btn").click();
      await page.waitForTimeout(2000);

      await page.goto("/admin");
      await page.waitForTimeout(1000);

      await expect(page).not.toHaveURL(/\/admin$/);

    },
  );

  test(
    "Admin Can See Products List",
    { tag: "@admin" },
    async ({ page }) => {

      await loginAsAdmin(page);
      await page.goto("/admin/products");

      await expect(page.getByRole("columnheader", { name: "Product" })).toBeVisible();
      await expect(page.getByRole("columnheader", { name: "Category" })).toBeVisible();
      await expect(page.getByRole("columnheader", { name: "Status" })).toBeVisible();

    },
  );

  test(
  "Admin Can Add Product",
  { tag: "@admin" },
  async ({ page }) => {

    await loginAsAdmin(page);
    await page.goto("/admin/products/new");

    // UNIQUE NAME TO AVOID urlId CONFLICT
    const uniqueName = `Test Product ${Date.now()}`;

    await page.getByPlaceholder("e.g. Air Max 90").fill(uniqueName);
    await page.getByPlaceholder("e.g. Nike").fill("Test Brand");
    await page.getByPlaceholder("e.g. Sneakers").fill("Test Category");
    await page.getByPlaceholder("Product description...").fill("Test Description");
    await page.getByPlaceholder("e.g. 199").fill("99");
    await page.getByPlaceholder("e.g. 50").fill("10");
    await page.getByPlaceholder("e.g. S, M, L, XL").fill("S, M, L");
    await page.getByPlaceholder("https://...").fill("https://via.placeholder.com/300");

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Product created");
      await dialog.accept();
    });

    await page.getByRole("button", { name: "Create Product" }).click();
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL(/admin\/products$/);

  },
);

  test(
    "Admin Can Toggle Product Status",
    { tag: "@admin" },
    async ({ page }) => {

      await loginAsAdmin(page);
      await page.goto("/admin/products");

      const firstStatus = page.getByRole("button", { name: /Active|Inactive/ }).first();
      const initialText = await firstStatus.innerText();
      await firstStatus.click();
      await page.waitForTimeout(1000);

      const newText = await firstStatus.innerText();
      expect(newText).not.toBe(initialText);

    },
  );

  test(
    "Admin Can See Orders",
    { tag: "@admin" },
    async ({ page }) => {

      await loginAsAdmin(page);
      await page.goto("/admin/orders");

      await expect(page.getByRole("heading", { name: "Orders" })).toBeVisible();
      await expect(page.getByText("All purchase records")).toBeVisible();

    },
  );

});