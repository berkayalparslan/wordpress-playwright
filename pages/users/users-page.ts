// @ts-check
import {Page, Locator} from "@playwright/test"

export default class UsersPage{
    readonly page: Page
    readonly addNewUserBtn: Locator

    constructor(page: Page){
        this.page = page;
        this.addNewUserBtn = page
        .locator("#wpbody-content")
        .getByRole("link", { name: "Add New User" })
        
    }

    async clickAddNewUserButton(){
        await this.addNewUserBtn.click();
    }
}