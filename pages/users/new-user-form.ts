// @ts-check
import { Page, Locator } from "@playwright/test";
import { UserRoles } from "./user-roles";

export default class NewUserForm {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly websiteInput: Locator;
  readonly generatePasswordBtn: Locator;
  readonly passwordInput: Locator;
  readonly confirmWeakPasswordCheckbox: Locator;
  readonly sendUserNotificationCheckbox: Locator;
  readonly roleSelect: Locator;
  readonly addNewUserBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator("input#user_login");
    this.emailInput = page.locator("input#email");
    this.firstNameInput = page.locator("input#first_name");
    this.lastNameInput = page.locator("input#last_name");
    this.websiteInput = page.locator("input#url");
    this.generatePasswordBtn = page.getByRole("button", {
      name: "Generate password",
    });
    this.passwordInput = page.locator("input#pass1");
    this.confirmWeakPasswordCheckbox = page.locator('input[name="pw_weak"]');
    this.sendUserNotificationCheckbox = page.locator(
      "input#send_user_notification"
    );
    this.roleSelect = page.locator("select#role");
    this.addNewUserBtn = page.locator("input#createusersub");
  }

  async fillNewUserForm(
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    website: string,
    password: string
  ) {
    await this.userNameInput.fill(username);
    await this.emailInput.fill(email);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.websiteInput.fill(website);
    await this.passwordInput.fill(password);
  }

  async clickGeneratePasswordButton() {
    await this.generatePasswordBtn.click();
  }

  async setConfirmWeakPasswordCheckbox(checked: Boolean) {
    if (checked) {
      await this.confirmWeakPasswordCheckbox.check();
    } else {
      await this.confirmWeakPasswordCheckbox.uncheck();
    }
  }

  async setSendUserNotificationCheckbox(checked: Boolean) {
    if (checked) {
      await this.sendUserNotificationCheckbox.check();
    } else {
      await this.sendUserNotificationCheckbox.uncheck();
    }
  }

  async selectUserRole(userRole: UserRoles) {
    switch (userRole) {
      case UserRoles.Administrator:
        await this.roleSelect.selectOption("Administrator");
        break;
      case UserRoles.Author:
        await this.roleSelect.selectOption("Author");
        break;
      case UserRoles.Contributor:
        await this.roleSelect.selectOption("Contributor");
        break;
      case UserRoles.Editor:
        await this.roleSelect.selectOption("Editor");
        break;
      case UserRoles.Subscriber:
        await this.roleSelect.selectOption("Subscriber");
        break;
      default:
        throw new Error("Unknown user role");;
    }
  }

  async clickAddNewUserButton() {
    await this.addNewUserBtn.click();
  }
}
