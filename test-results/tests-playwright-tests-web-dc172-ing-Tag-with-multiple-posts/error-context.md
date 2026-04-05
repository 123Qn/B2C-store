# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\web\tags-screen.spec.ts >> TAG SCREEN >> Existing Tag with multiple posts
- Location: tests\playwright\tests\web\tags-screen.spec.ts:24:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/tags/front-end", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from "./fixtures";
  2  | 
  3  | test.describe("TAG SCREEN", () => {
  4  |   test(
  5  |     "Existing Tag with one post",
  6  |     {
  7  |       tag: "@a1",
  8  |     },
  9  |     async ({ page }) => {
  10 |       await page.goto("/tags/dev-tools");
  11 | 
  12 |       // TAG SCREEN > Displays posts with the tag url (e.g. /tags/dev-tools)
  13 | 
  14 |       const articles = await page.locator('[data-testid^="blog-post-"]');
  15 |       await expect(articles).toHaveCount(1);
  16 | 
  17 |       await expect(page.getByTestId("blog-post-3")).toBeVisible();
  18 |       await expect(
  19 |         page.getByText("No front end framework is the best"),
  20 |       ).toBeVisible();
  21 |     },
  22 |   );
  23 | 
  24 |   test(
  25 |     "Existing Tag with multiple posts",
  26 |     {
  27 |       tag: "@a1",
  28 |     },
  29 |     async ({ page }) => {
> 30 |       await page.goto("/tags/front-end");
     |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  31 | 
  32 |       const articles = await page.locator('[data-testid^="blog-post-"]');
  33 |       await expect(articles).toHaveCount(2);
  34 | 
  35 |       await expect(page.getByTestId("blog-post-2")).toBeVisible();
  36 |       await expect(
  37 |         page.getByText("Better front ends with Fatboy Slim"),
  38 |       ).toBeVisible();
  39 | 
  40 |       await expect(page.getByTestId("blog-post-3")).toBeVisible();
  41 |       await expect(
  42 |         page.getByText("No front end framework is the best"),
  43 |       ).toBeVisible();
  44 |     },
  45 |   );
  46 | 
  47 |   test(
  48 |     "Invalid Tag",
  49 |     {
  50 |       tag: "@a1",
  51 |     },
  52 |     async ({ page }) => {
  53 |       await page.goto("/category/abc");
  54 | 
  55 |       // TAG SCREEN > Displays "0 Posts" when search does no posts have that tag
  56 | 
  57 |       const articles = await page.locator('[data-testid^="blog-post-"]');
  58 |       await expect(articles).toHaveCount(0);
  59 | 
  60 |       await expect(page.getByText("0 Posts")).toBeVisible();
  61 |     },
  62 |   );
  63 | });
  64 | 
```