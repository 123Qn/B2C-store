import { expect, test } from "./fixtures";

const ADMIN_EMAIL = "admin@qfashion.com";
const BUYER_EMAIL = "buyer@gmail.com";
const PASSWORD = "123";

async function loginAsAdmin(page: any) {
  await page.goto("/SessionManagement/login");
  await page.getByPlaceholder("Email").fill(ADMIN_EMAIL);
  await page.getByPlaceholder("Password").fill(PASSWORD);
  await page.getByTestId("login-btn").click();
  await page.waitForURL(/admin/, { timeout: 10000 });
}

test.describe("ADMIN", () => {

  test("Admin Login And See Dashboard", { tag: "@admin" }, async ({ page }) => {
    await loginAsAdmin(page);
    await expect(page.getByRole("heading", { name: "Admin Dashboard" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Orders" })).toBeVisible();
  });

test("Buyer Cannot Access Admin", { tag: "@admin" }, async ({ page }) => {
  await page.goto("/SessionManagement/login");
  await page.getByPlaceholder("Email").fill(BUYER_EMAIL);
  await page.getByPlaceholder("Password").fill(PASSWORD);
  await page.getByTestId("login-btn").click();
  await page.waitForTimeout(3000); // ← fix
  await page.goto("/admin");
  await page.waitForTimeout(2000);
  await expect(page).not.toHaveURL(/\/admin$/);
});

  test("Admin Can See Products List", { tag: "@admin" }, async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/products");
    await expect(page.getByRole("columnheader", { name: "Product" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Category" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Status" })).toBeVisible();
  });

  test("Admin Can Add Product", { tag: "@admin" }, async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/products/new");

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
    await page.waitForURL(/admin\/products$/, { timeout: 10000 });
    await expect(page).toHaveURL(/admin\/products$/);
  });

  test("Admin Can Toggle Product Status", { tag: "@admin" }, async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/products");
    await page.waitForLoadState("networkidle");

    const firstStatus = page.getByRole("button", { name: /Active|Inactive/ }).first();
    await firstStatus.waitFor({ state: "visible" });
    const initialText = await firstStatus.innerText();
    await firstStatus.click();
    await page.waitForTimeout(2000);

    const newText = await firstStatus.innerText();
    expect(newText).not.toBe(initialText);
  });

  test("Admin Can See Orders", { tag: "@admin" }, async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/orders");
    await expect(page.getByRole("heading", { name: "Orders" })).toBeVisible();
    await expect(page.getByText("All purchase records")).toBeVisible();
  });

});