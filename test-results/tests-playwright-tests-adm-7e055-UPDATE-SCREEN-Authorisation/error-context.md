# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\admin\update-screen.spec.ts >> ADMIN UPDATE SCREEN >> Authorisation
- Location: tests\playwright\tests\admin\update-screen.spec.ts:10:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/post/no-front-end-framework-is-the-best", waiting until "load"

```

# Test source

```ts
  1   | 
  2   | import { expect, test } from "./fixtures";
  3   | 
  4   | test.beforeEach(async () => {
  5   |   const { seed } = await import("@repo/db/seed");
  6   |   await seed();
  7   | });
  8   | 
  9   | test.describe("ADMIN UPDATE SCREEN", () => {
  10  |   test(
  11  |     "Authorisation",
  12  |     {
  13  |       tag: "@a2",
  14  |     },
  15  |     async ({ page }) => {
> 16  |       await page.goto("/post/no-front-end-framework-is-the-best");
      |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  17  | 
  18  |       // UPDATE SCREEN > Shows login screen if not logged
  19  |       await expect(
  20  |         page.getByText("Sign in to your account", { exact: true }),
  21  |       ).toBeVisible();
  22  |     },
  23  |   );
  24  | 
  25  |   test(
  26  |     "Update post form",
  27  |     {
  28  |       tag: "@a2",
  29  |     },
  30  |     async ({ userPage }) => {
  31  |       await userPage.goto("/post/no-front-end-framework-is-the-best");
  32  | 
  33  |       const saveButton = await userPage.getByText("Save");
  34  | 
  35  |       // UPDATE SCREEN > There must be the following fields which must be validated for errors:
  36  | 
  37  |       // UPDATE SCREEN > Title
  38  | 
  39  |       await userPage.getByLabel("Title").clear();
  40  |       await saveButton.click();
  41  | 
  42  |       await expect(userPage.getByText("Title is required")).toBeVisible();
  43  |       await userPage.getByLabel("Title").fill("New title");
  44  |       await saveButton.click();
  45  |       await expect(userPage.getByText("Title is required")).not.toBeVisible();
  46  | 
  47  |       // UPDATE SCREEN > Description
  48  | 
  49  |       await userPage.getByLabel("Description").clear();
  50  |       await saveButton.click();
  51  | 
  52  |       await expect(userPage.getByText("Description is required")).toBeVisible();
  53  |       await userPage.getByLabel("Description").fill("New Description");
  54  |       await saveButton.click();
  55  |       await expect(
  56  |         userPage.getByText("Description is required"),
  57  |       ).not.toBeVisible();
  58  | 
  59  |       // cannot be longer than 200
  60  |       await userPage.getByLabel("Description").fill("a".repeat(201));
  61  |       await saveButton.click();
  62  |       await expect(
  63  |         userPage.getByText(
  64  |           "Description is too long. Maximum is 200 characters",
  65  |         ),
  66  |       ).toBeVisible();
  67  | 
  68  |       await userPage.getByLabel("Description").fill("a".repeat(200));
  69  |       await saveButton.click();
  70  |       await expect(
  71  |         userPage.getByText(
  72  |           "Description is too long. Maximum is 200 characters",
  73  |         ),
  74  |       ).not.toBeVisible();
  75  | 
  76  |       // UPDATE SCREEN > Content
  77  | 
  78  |       await userPage.getByLabel("Content").clear();
  79  |       await saveButton.click();
  80  | 
  81  |       await expect(userPage.getByText("Content is required")).toBeVisible();
  82  |       await userPage.getByLabel("Content").fill("New Description");
  83  |       await saveButton.click();
  84  |       await expect(userPage.getByText("Content is required")).not.toBeVisible();
  85  | 
  86  |       // UPDATE SCREEN > Image
  87  | 
  88  |       await userPage.getByLabel("Image URL").clear();
  89  |       await saveButton.click();
  90  | 
  91  |       // required
  92  |       await expect(userPage.getByText("Image URL is required")).toBeVisible();
  93  | 
  94  |       // invalid
  95  |       await userPage.getByLabel("Image URL").fill("some url");
  96  |       await saveButton.click();
  97  |       await expect(userPage.getByText("This is not a valid URL")).toBeVisible();
  98  | 
  99  |       await userPage
  100 |         .getByLabel("Image URL")
  101 |         .fill("http://example.com/image.jpg");
  102 |       await saveButton.click();
  103 |       await expect(
  104 |         userPage.getByText("Image URL is required"),
  105 |       ).not.toBeVisible();
  106 | 
  107 |       // UPDATE SCREEN > Tag Lists
  108 | 
  109 |       await userPage.getByLabel("Tags").clear();
  110 |       await saveButton.click();
  111 | 
  112 |       await expect(
  113 |         userPage.getByText("At least one tag is required"),
  114 |       ).toBeVisible();
  115 |       await userPage.getByLabel("Tags").fill("Tag");
  116 |       await saveButton.click();
```