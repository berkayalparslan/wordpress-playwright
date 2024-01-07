// @ts-check
import { test, expect } from '@playwright/test';


const userName: string = process.env.USER_NAME!;
const userPassword: string = process.env.USER_PASSWORD!;

test.use({storageState: {cookies: [], origins: []}});

test.describe('login page', () => {
    test.beforeEach(async({page}) => {
        await page.goto(`/wp-admin`);
    });

    test('should redirect to wp-admin page when existing user credentials are entered', async({page}) => {
        const loginInput = page.locator('input#user_login');
        const passwordInput = page.locator('input#user_pass');
        const loginButton = page.locator('input#wp-submit');
        const wpAdminContent = page.locator('div#wpcontent');
        const wpAdminMenu = page.locator('ul#adminmenu');

        await loginInput.fill(userName);
        await passwordInput.fill(userPassword);
        await loginButton.click();

        await expect(wpAdminContent).toBeVisible();
        await expect(wpAdminMenu).toBeVisible();
        await expect(page.getByText('Howdy, ')).toBeVisible();
    });

    test('should be displayed when wp-admin page is tried to accessed without logged in user', async({page}) => {
        const loginInput = page.locator('input#user_login');
        const passwordInput = page.locator('input#user_pass');
        const loginButton = page.locator('input#wp-submit');

        await expect(loginInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(loginButton).toBeVisible();
    });

    test('should display error if wrong username and password are entered', async({page}) => {
        const loginInput = page.locator('input#user_login');
        const passwordInput = page.locator('input#user_pass');
        const loginButton = page.locator('input#wp-submit');
        const loginError = page.locator('#login_error');

        await loginInput.fill('test');
        await passwordInput.fill('test');
        await loginButton.click();
        await expect(loginError).toContainText('  Error: The username test is not registered on this site. If you are unsure of your username, try your email address instead.');
    });
});