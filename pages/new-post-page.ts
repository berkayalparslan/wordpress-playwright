import { Page, Locator, Frame, FrameLocator } from "@playwright/test";

export enum PreviewMenuItems {
  NONE = 0,
  Desktop,
  Tablet,
  Mobile,
}

export default class NewPostPage {
  readonly page: Page;
  readonly titleEl: Locator;
  readonly blockEl: Locator;
  readonly publishBtn: Locator;
  readonly saveDraftBtn: Locator;
  readonly editorPublishBtn: Locator;
  readonly viewPostBtn: Locator;
  readonly previewBtn: Locator;
  readonly desktopPreviewMenuItem: Locator;
  readonly tabletPreviewMenuItem: Locator;
  readonly mobilePreviewMenuItem: Locator;
  readonly viewPreviewLink: Locator;
  readonly editorCanvasFrame: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.titleEl = this.page
      .frameLocator('iframe[name="editor-canvas"]')
      .getByLabel("Add title");
    this.blockEl = page
      .frameLocator('iframe[name="editor-canvas"]')
      .getByLabel("Add default block");
    this.publishBtn = page.getByRole("button", {
      name: "Publish",
      exact: true,
    });
    this.saveDraftBtn = page.getByLabel("Save draft");
    this.editorPublishBtn = page
      .getByLabel("Editor publish")
      .getByRole("button", { name: "Publish", exact: true });
    this.viewPostBtn = page.locator("a.components-button.is-primary", {
      hasText: "View",
    });
    this.previewBtn = page.getByLabel("Preview");
    this.desktopPreviewMenuItem = page.getByRole("menuitem", {
      name: "Desktop",
    });
    this.tabletPreviewMenuItem = page.getByRole("menuitem", { name: "Tablet" });
    this.mobilePreviewMenuItem = page.getByRole("menuitem", { name: "Mobile" });
    this.viewPreviewLink = page.getByRole("link", { name: "View Preview" });
    this.editorCanvasFrame =  page.frameLocator('iframe[name="editor-canvas"]');
  }

  //#region input methods
  async enterTitle(title: string) {
    await this.titleEl.pressSequentially(title);
  }

  async enterBlock(block: string) {
    await this.blockEl.pressSequentially(block);
  }
  //#endregion

  //#region click methods
  async clickPublishBtn() {
    await this.publishBtn.click();
  }

  async clickEditorPublishBtn() {
    await this.editorPublishBtn.click();
  }

  async clickViewPostBtn() {
    await this.viewPostBtn.click();
  }

  async clickSaveDraftBtn() {
    await this.saveDraftBtn.click();
  }

  async clickPreviewBtn() {
    await this.previewBtn.click();
  }

  async clickViewPreviewLink() {
    await this.viewPreviewLink.click();
  }

  async selectPreviewMenuItem(previewMenuItem: PreviewMenuItems) {
    switch (previewMenuItem) {
      case PreviewMenuItems.Desktop:
        await this.desktopPreviewMenuItem.click();
        break;
      case PreviewMenuItems.Tablet:
        await this.tabletPreviewMenuItem.click();
        break;
      case PreviewMenuItems.Mobile:
        await this.mobilePreviewMenuItem.click();
        break;
      default:
        throw new Error("Unknown preview menu item type");
    }
  }
  //#endregion
}
