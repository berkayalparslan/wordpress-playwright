// @ts-check
import { test, expect } from "@playwright/test";
import PostEditorPage, { PreviewMenuItems } from "../../pages/posts/post-editor-page";
import PostsPage from "../../pages/posts/posts-page";

const newPost = {
  title: "new post title",
  block: "this is a new post",
};

const updatePost = {
  title: "updated post title",
  block: "this block is updated"
};

test.describe("CRUD - Post", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/wp-admin/index.php`);
  });

  test.describe('CREATE @post @create', () => {
    test("create a post @happy", async ({ page }) => {
      const postsPage = new PostsPage(page);
      const postEditorPage = new PostEditorPage(page);
  
      await page.locator("li#menu-posts").click();
      await postsPage.clickAddNewPostBtn();
      await postEditorPage.fillTitle(newPost.title);
      await postEditorPage.fillEmptyBlock(newPost.block);
      await postEditorPage.clickPublishBtn();
      await postEditorPage.clickEditorPublishBtn();
      await postEditorPage.clickViewPostBtn();
  
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        newPost.title
      );
      await expect(page.locator("div.wp-block-post-content p")).toHaveText(
        newPost.block
      );
    });
  
    test("create a post as draft", async ({ page }) => {
      const postsPage = new PostsPage(page);
      const postEditorPage = new PostEditorPage(page);
      
      await page.locator("li#menu-posts").click();
      await postsPage.clickAddNewPostBtn();
      await postEditorPage.fillTitle(newPost.title);
      await postEditorPage.fillEmptyBlock(newPost.block);
      await postEditorPage.clickSaveDraftBtn();
      await postEditorPage.clickViewPreviewLink();
  
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        newPost.title
      );
      await expect(page.locator("div.wp-block-post-content p")).toHaveText(
        newPost.block
      );
    });

  });

  test.describe('UPDATE @post @update', () => {
    test("update a post @happy", async ({ page }) => {
      const postEditorPage = new PostEditorPage(page);
  
      await page.locator("li#menu-posts").click();
      await page.locator('table.posts tr.status-publish a.row-title').first().click();

      await postEditorPage.clearTitle();
      await postEditorPage.fillTitle(updatePost.title);
      await postEditorPage.clearFilledBlock();
      await postEditorPage.fillEmptyBlock(updatePost.block);
      await postEditorPage.page.getByRole("button", {
        name: "Update",
        exact: true,
      }).click();

      await page.locator("a.components-button.is-tertiary", {
        hasText: "View Post",
      }).click();
  
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        updatePost.title
      );
      await expect(page.locator("div.wp-block-post-content p")).toHaveText(
        updatePost.block
      );
    });
  })

  test.describe('READ @post @read', () => {
    test("should allow to preview post for different devices", async ({
      page,
    }) => {
      let desktopWidth, tabletWidth, mobileWidth;
      const postsPage = new PostsPage(page);
      const postEditorPage = new PostEditorPage(page);
      
      await page.locator("li#menu-posts").click();
      await postsPage.clickAddNewPostBtn();
      await postEditorPage.fillTitle(newPost.title);
      await postEditorPage.fillEmptyBlock(newPost.block);
      await postEditorPage.clickPreviewBtn();
      await postEditorPage.selectPreviewMenuItem(PreviewMenuItems.Desktop);
      await postEditorPage.editorCanvasFrame?.locator("body")
      .boundingBox()
      .then((box) => {
        desktopWidth = box?.width;
      });
        
        await postEditorPage.selectPreviewMenuItem(PreviewMenuItems.Tablet);
        await postEditorPage.editorCanvasFrame?.locator("body")
        .boundingBox()
        .then((box) => {
          tabletWidth = box?.width;
        });
        
        await postEditorPage.selectPreviewMenuItem(PreviewMenuItems.Mobile);
        await postEditorPage.editorCanvasFrame?.locator("body")
        .boundingBox()
        .then((box) => {
          mobileWidth = box?.width;
        });
        await expect(desktopWidth).toBeGreaterThan(tabletWidth);
        await  expect(tabletWidth).toBeGreaterThan(mobileWidth);
    });
  })


});
