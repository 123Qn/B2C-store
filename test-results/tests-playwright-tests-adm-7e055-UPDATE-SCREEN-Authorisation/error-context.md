# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\admin\update-screen.spec.ts >> ADMIN UPDATE SCREEN >> Authorisation
- Location: tests\playwright\tests\admin\update-screen.spec.ts:9:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/post/no-front-end-framework-is-the-best", waiting until "load"

```

# Test source

```ts
  1   | import { seed } from "@repo/db/seed";
  2   | import { expect, test } from "./fixtures";
  3   | 
  4   | test.beforeEach(async () => {
  5   |   await seed();
  6   | });
  7   | 
  8   | test.describe("ADMIN UPDATE SCREEN", () => {
  9   |   test(
  10  |     "Authorisation",
  11  |     {
  12  |       tag: "@a2",
  13  |     },
  14  |     async ({ page }) => {
> 15  |       await page.goto("/post/no-front-end-framework-is-the-best");
      |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  16  | 
  17  |       // UPDATE SCREEN > Shows login screen if not logged
  18  |       await expect(
  19  |         page.getByText("Sign in to your account", { exact: true }),
  20  |       ).toBeVisible();
  21  |     },
  22  |   );
  23  | 
  24  |   test(
  25  |     "Update post form",
  26  |     {
  27  |       tag: "@a2",
  28  |     },
  29  |     async ({ userPage }) => {
  30  |       await userPage.goto("/post/no-front-end-framework-is-the-best");
  31  | 
  32  |       const saveButton = await userPage.getByText("Save");
  33  | 
  34  |       // UPDATE SCREEN > There must be the following fields which must be validated for errors:
  35  | 
  36  |       // UPDATE SCREEN > Title
  37  | 
  38  |       await userPage.getByLabel("Title").clear();
  39  |       await saveButton.click();
  40  | 
  41  |       await expect(userPage.getByText("Title is required")).toBeVisible();
  42  |       await userPage.getByLabel("Title").fill("New title");
  43  |       await saveButton.click();
  44  |       await expect(userPage.getByText("Title is required")).not.toBeVisible();
  45  | 
  46  |       // UPDATE SCREEN > Description
  47  | 
  48  |       await userPage.getByLabel("Description").clear();
  49  |       await saveButton.click();
  50  | 
  51  |       await expect(userPage.getByText("Description is required")).toBeVisible();
  52  |       await userPage.getByLabel("Description").fill("New Description");
  53  |       await saveButton.click();
  54  |       await expect(
  55  |         userPage.getByText("Description is required"),
  56  |       ).not.toBeVisible();
  57  | 
  58  |       // cannot be longer than 200
  59  |       await userPage.getByLabel("Description").fill("a".repeat(201));
  60  |       await saveButton.click();
  61  |       await expect(
  62  |         userPage.getByText(
  63  |           "Description is too long. Maximum is 200 characters",
  64  |         ),
  65  |       ).toBeVisible();
  66  | 
  67  |       await userPage.getByLabel("Description").fill("a".repeat(200));
  68  |       await saveButton.click();
  69  |       await expect(
  70  |         userPage.getByText(
  71  |           "Description is too long. Maximum is 200 characters",
  72  |         ),
  73  |       ).not.toBeVisible();
  74  | 
  75  |       // UPDATE SCREEN > Content
  76  | 
  77  |       await userPage.getByLabel("Content").clear();
  78  |       await saveButton.click();
  79  | 
  80  |       await expect(userPage.getByText("Content is required")).toBeVisible();
  81  |       await userPage.getByLabel("Content").fill("New Description");
  82  |       await saveButton.click();
  83  |       await expect(userPage.getByText("Content is required")).not.toBeVisible();
  84  | 
  85  |       // UPDATE SCREEN > Image
  86  | 
  87  |       await userPage.getByLabel("Image URL").clear();
  88  |       await saveButton.click();
  89  | 
  90  |       // required
  91  |       await expect(userPage.getByText("Image URL is required")).toBeVisible();
  92  | 
  93  |       // invalid
  94  |       await userPage.getByLabel("Image URL").fill("some url");
  95  |       await saveButton.click();
  96  |       await expect(userPage.getByText("This is not a valid URL")).toBeVisible();
  97  | 
  98  |       await userPage
  99  |         .getByLabel("Image URL")
  100 |         .fill("http://example.com/image.jpg");
  101 |       await saveButton.click();
  102 |       await expect(
  103 |         userPage.getByText("Image URL is required"),
  104 |       ).not.toBeVisible();
  105 | 
  106 |       // UPDATE SCREEN > Tag Lists
  107 | 
  108 |       await userPage.getByLabel("Tags").clear();
  109 |       await saveButton.click();
  110 | 
  111 |       await expect(
  112 |         userPage.getByText("At least one tag is required"),
  113 |       ).toBeVisible();
  114 |       await userPage.getByLabel("Tags").fill("Tag");
  115 |       await saveButton.click();
```