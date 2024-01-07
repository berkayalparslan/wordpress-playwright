// @ts-check
import { test, expect } from "@playwright/test";
import UsersPage from "../../pages/users/users-page";
import NewUserForm from "../../pages/users/new-user-form";
import { UserRoles, getUserRoleName } from "../../pages/users/user-roles";

function generateNewUser(userRole: UserRoles){
  const randomNr = ((Math.random() * 100) % 10).toString();
  let userName, email, firstName, lastName, website, password;
  firstName = `new${randomNr}`;
  lastName = `user${randomNr}`
  userName = `${firstName}${lastName}`;
  email = `${userName}@somerandommail.com`;
  website = `${userName}.com`
  password = `WeakPassword123AndSomeRandomCharacters456${randomNr}`;
  return {
    userName: userName,
    email: email,
    firstName: firstName,
    lastName: lastName,
    website: website,
    password: password,
    role: userRole
  }
}

const newUser = generateNewUser(UserRoles.Author);

test.describe("CRUD - User", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/wp-admin/index.php`);
  });

  test.describe("CREATE @user @create", () => {
    test("Create a user @happy", async ({ page }) => {
      const usersPage = new UsersPage(page);
      const newUserForm = new NewUserForm(page);
      let userId = "";
      await page.locator("li#menu-users").click();
      await usersPage.clickAddNewUserButton();
      await newUserForm.fillNewUserForm(newUser.userName, newUser.email, newUser.firstName, newUser.lastName, newUser.website, newUser.password);
      await newUserForm.selectUserRole(newUser.role);
      await newUserForm.clickAddNewUserButton();

      await page.waitForURL("**/users.php?id=*").then(() => {
        userId = page.url().split('id=')[1];
      })

      await expect(page.locator(`#user-${userId}`).getByRole('link', {name: newUser.userName, exact: true})).toBeVisible();
      await expect(page.locator(`#user-${userId}`).getByText(`${newUser.firstName} ${newUser.lastName}`)).toBeVisible();
      await expect(page.locator(`#user-${userId}`).getByText(newUser.email)).toBeVisible();
      await expect(page.locator(`#user-${userId}`).getByRole('cell',{name: getUserRoleName(newUser.role)})).toBeVisible();
    });
  });
});
