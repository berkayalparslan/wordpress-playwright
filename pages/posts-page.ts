import {Page, Locator} from "@playwright/test"

export default class PostsPage{
    readonly page: Page
    readonly addNewPostBtn: Locator

    constructor(page: Page){
        this.page = page;
        this.addNewPostBtn = page
        .locator("#wpbody-content")
        .getByRole("link", { name: "Add New" })
        
    }

    async clickAddNewPostBtn(){
        await this.addNewPostBtn.click();
    }
}