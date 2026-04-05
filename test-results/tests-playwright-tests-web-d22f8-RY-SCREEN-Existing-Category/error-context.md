# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\web\category-screen.spec.ts >> CATEGORY SCREEN >> Existing Category
- Location: tests\playwright\tests\web\category-screen.spec.ts:9:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/category/react", waiting until "load"

```

# Test source

```ts
  1  | import { seed } from "@repo/db/seed";
  2  | import { expect, test } from "./fixtures";
  3  | 
  4  | test.describe("CATEGORY SCREEN", () => {
  5  |   test.beforeAll(async () => {
  6  |     await seed();
  7  |   });
  8  | 
  9  |   test(
  10 |     "Existing Category",
  11 |     {
  12 |       tag: "@a1",
  13 |     },
  14 |     async ({ page }) => {
> 15 |       await page.goto("/category/react");
     |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  16 | 
  17 |       // CATEGORY SCREEN > Displays results based on category from url (e.g. /category/react)
  18 | 
  19 |       const articles = await page.locator('[data-test-id^="blog-post-"]');
  20 |       await expect(articles).toHaveCount(2);
  21 | 
  22 |       await expect(page.getByTestId("blog-post-2")).toBeVisible();
  23 |       await expect(
  24 |         page.getByText("Better front ends with Fatboy Slim"),
  25 |       ).toBeVisible();
  26 | 
  27 |       await expect(page.getByTestId("blog-post-3")).toBeVisible();
  28 |       await expect(
  29 |         page.getByText("No front end framework is the best"),
  30 |       ).toBeVisible();
  31 |     },
  32 |   );
  33 | 
  34 |   test(
  35 |     "Invalid Category",
  36 |     {
  37 |       tag: "@a1",
  38 |     },
  39 |     async ({ page }) => {
  40 |       await page.goto("/category/abc");
  41 | 
  42 |       // CATEGORY SCREEN > Displays "0 Posts" when search does not find anything
  43 | 
  44 |       const articles = await page.locator('[data-test-id^="blog-post-"]');
  45 |       await expect(articles).toHaveCount(0);
  46 | 
  47 |       await expect(page.getByText("0 Posts")).toBeVisible();
  48 |     },
  49 |   );
  50 | });
  51 | 
```