// @ts-check
import {test as setup, expect} from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const userName = process.env.USER_NAME as string;
const userPassword = process.env.USER_PASSWORD as string;

setup('authenticate', async({page}) => {
    const loginInput = page.locator('input#user_login');
    const passwordInput = page.locator('input#user_pass');
    const loginButton = page.locator('input#wp-submit');
    const wpAdminContent = page.locator('div#wpcontent');

    await page.goto(`http://0.0.0.0:8080/wp-admin/index.php`);

    await loginInput.fill(userName);
    await passwordInput.fill(userPassword);
    await loginButton.click();

    await expect(wpAdminContent).toBeVisible();
    await page.waitForURL('http://0.0.0.0:8080/wp-admin/index.php');
    await page.context().storageState({ path: authFile });
})