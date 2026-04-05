# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\web\search-screen.spec.ts >> SEARCH SCREEN >> Existing search result
- Location: tests\playwright\tests\web\search-screen.spec.ts:4:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/search?q=Fat", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from "./fixtures";
  2  | 
  3  | test.describe("SEARCH SCREEN", () => {
  4  |   test(
  5  |     "Existing search result",
  6  |     {
  7  |       tag: "@a1",
  8  |     },
  9  |     async ({ page }) => {
> 10 |       await page.goto("/search?q=Fat");
     |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  11 | 
  12 |       // SEARCH SCREEN > Displays results based on search string stored in the query string (e.g. /search?q=Fat)
  13 | 
  14 |       // console.log(await page.innerHTML("body"));
  15 | 
  16 |       const articles = await page.locator('[data-test-id^="blog-post-"]');
  17 |       await expect(articles).toHaveCount(1);
  18 | 
  19 |       await expect(page.getByTestId("blog-post-2")).toBeVisible();
  20 |       await expect(
  21 |         page.getByText("Better front ends with Fatboy Slim"),
  22 |       ).toBeVisible();
  23 |     },
  24 |   );
  25 | 
  26 |   test(
  27 |     "Search finds multiple posts",
  28 |     {
  29 |       tag: "@a1",
  30 |     },
  31 |     async ({ page }) => {
  32 |       await page.goto("/search?q=front");
  33 | 
  34 |       // SEARCH SCREEN > Displays results based on search string stored in the query string (e.g. /search?q=Fat)
  35 | 
  36 |       const articles = await page.locator('[data-test-id^="blog-post-"]');
  37 |       await expect(articles).toHaveCount(2);
  38 | 
  39 |       await expect(page.getByTestId("blog-post-2")).toBeVisible();
  40 |       await expect(
  41 |         page.getByText("Better front ends with Fatboy Slim"),
  42 |       ).toBeVisible();
  43 | 
  44 |       await expect(page.getByTestId("blog-post-3")).toBeVisible();
  45 |       await expect(
  46 |         page.getByText("No front end framework is the best"),
  47 |       ).toBeVisible();
  48 |     },
  49 |   );
  50 | 
  51 |   test(
  52 |     "Invalid Search",
  53 |     {
  54 |       tag: "@a1",
  55 |     },
  56 |     async ({ page }) => {
  57 |       await page.goto("/search?q=abc");
  58 | 
  59 |       // SEARCH SCREEN > Displays "0 Posts" when search does not find anything
  60 | 
  61 |       const articles = await page.locator('[data-test-id^="blog-post-"]');
  62 |       await expect(articles).toHaveCount(0);
  63 | 
  64 |       await expect(page.getByText("0 Posts")).toBeVisible();
  65 |     },
  66 |   );
  67 | });
  68 | 
```