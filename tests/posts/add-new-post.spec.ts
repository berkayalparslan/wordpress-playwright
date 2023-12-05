// @ts-check
import { test, expect } from "@playwright/test";

const newPost = {
  title: "new post title",
  block: "this is a new post",
};

test.describe("new post page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/wp-admin/index.php`);
  });

  test("should allow to add new post", async ({ page }) => {
    await page.locator("li#menu-posts").click();
    await expect(
      page.getByRole("heading", { level: 1 }).getByText("Posts")
    ).toBeVisible();
    await page
      .locator("#wpbody-content")
      .getByRole("link", { name: "Add New" })
      .click();

    await page
      .frameLocator('iframe[name="editor-canvas"]')
      .getByLabel("Add title")
      .pressSequentially(newPost.title);
    await page
      .frameLocator('iframe[name="editor-canvas"]')
      .getByLabel("Add default block")
      .pressSequentially(newPost.block);
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page
      .getByLabel("Editor publish")
      .getByRole("button", { name: "Publish", exact: true })
      .click();
    await page.locator("a.components-button.is-primary").click();

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      newPost.title
    );
    await expect(page.locator("div.wp-block-post-content p")).toHaveText(
      newPost.block
    );
  });

  test("should allow to save post as a draft", async ({ page }) => {
    await page.locator("li#menu-posts").click();
    await expect(
      page.getByRole("heading", { level: 1 }).getByText("Posts")
    ).toBeVisible();
    await page
      .locator("#wpbody-content")
      .getByRole("link", { name: "Add New" })
      .click();

    await page
      .frameLocator('iframe[name="editor-canvas"]')
      .getByLabel("Add title")
      .pressSequentially(newPost.title);
    await page
      .frameLocator('iframe[name="editor-canvas"]')
      .getByLabel("Add default block")
      .pressSequentially(newPost.block);

    await page.getByLabel("Save draft").click();
    await page.getByRole('link', {name: "View Preview"}).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        newPost.title
      );
      await expect(page.locator("div.wp-block-post-content p")).toHaveText(
        newPost.block
      );
  });

  test("should allow to preview post for different devices", async({page}) => {
    let desktopWidth, tabletWidth, mobileWidth;
    await page.locator("li#menu-posts").click();
    await expect(
      page.getByRole("heading", { level: 1 }).getByText("Posts")
    ).toBeVisible();
    await page
      .locator("#wpbody-content")
      .getByRole("link", { name: "Add New" })
      .click();

    await page
      .frameLocator('iframe[name="editor-canvas"]')
      .getByLabel("Add title")
      .pressSequentially(newPost.title);
    await page
      .frameLocator('iframe[name="editor-canvas"]')
      .getByLabel("Add default block")
      .pressSequentially(newPost.block);

    await page.getByLabel('Preview').click();
    await page.getByRole('menuitem', {name: "Desktop"}).click();
    await page.frame({name: "editor-canvas"})?.locator('body').boundingBox().then(box => {
        desktopWidth = box?.width;
    })
    await page.getByRole('menuitem', {name: "Tablet"}).click();
    await page.frame({name: "editor-canvas"})?.locator('body').boundingBox().then(box => {
        tabletWidth = box?.width;
    })
    await page.getByRole('menuitem', {name: "Mobile"}).click();
    await page.frame({name: "editor-canvas"})?.locator('body').boundingBox().then(box => {
        mobileWidth = box?.width;
    });
    await expect(desktopWidth).toBeGreaterThan(tabletWidth);
    await expect(tabletWidth).toBeGreaterThan(mobileWidth);
    })
  
  
});
