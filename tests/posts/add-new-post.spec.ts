// @ts-check
import { test, expect } from "@playwright/test";
import NewPostPage, { PreviewMenuItems } from "../../pages/new-post-page";
import PostsPage from "../../pages/posts-page";

const newPost = {
  title: "new post title",
  block: "this is a new post",
};

test.describe("new post page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/wp-admin/index.php`);
  });

  test("should allow to add new post", async ({ page }) => {
    const postsPage = new PostsPage(page);
    const newPostPage = new NewPostPage(page);

    await page.locator("li#menu-posts").click();
    await postsPage.clickAddNewPostBtn();
    await newPostPage.enterTitle(newPost.title);
    await newPostPage.enterBlock(newPost.block);
    await newPostPage.clickPublishBtn();
    await newPostPage.clickEditorPublishBtn();
    await newPostPage.clickViewPostBtn();

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      newPost.title
    );
    await expect(page.locator("div.wp-block-post-content p")).toHaveText(
      newPost.block
    );
  });

  test("should allow to save post as a draft", async ({ page }) => {
    const postsPage = new PostsPage(page);
    const newPostPage = new NewPostPage(page);
    
    await page.locator("li#menu-posts").click();
    await postsPage.clickAddNewPostBtn();
    await newPostPage.enterTitle(newPost.title);
    await newPostPage.enterBlock(newPost.block);
    await newPostPage.clickSaveDraftBtn();
    await newPostPage.clickViewPreviewLink();

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      newPost.title
    );
    await expect(page.locator("div.wp-block-post-content p")).toHaveText(
      newPost.block
    );
  });

  test("should allow to preview post for different devices", async ({
    page,
  }) => {
    let desktopWidth, tabletWidth, mobileWidth;
    const postsPage = new PostsPage(page);
    const newPostPage = new NewPostPage(page);
    
    await page.locator("li#menu-posts").click();
    await postsPage.clickAddNewPostBtn();
    await newPostPage.enterTitle(newPost.title);
    await newPostPage.enterBlock(newPost.block);
    await newPostPage.clickPreviewBtn();
    await newPostPage.selectPreviewMenuItem(PreviewMenuItems.Desktop);
    await newPostPage.editorCanvasFrame?.locator("body")
    .boundingBox()
    .then((box) => {
      desktopWidth = box?.width;
    });
      
      await newPostPage.selectPreviewMenuItem(PreviewMenuItems.Tablet);
      await newPostPage.editorCanvasFrame?.locator("body")
      .boundingBox()
      .then((box) => {
        tabletWidth = box?.width;
      });
      
      await newPostPage.selectPreviewMenuItem(PreviewMenuItems.Mobile);
      await newPostPage.editorCanvasFrame?.locator("body")
      .boundingBox()
      .then((box) => {
        mobileWidth = box?.width;
      });
      await expect(desktopWidth).toBeGreaterThan(tabletWidth);
      await  expect(tabletWidth).toBeGreaterThan(mobileWidth);
  });
});
