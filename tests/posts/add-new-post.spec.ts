// @ts-check
import { test, expect } from '@playwright/test';

test.describe('new post page',() => {
    test.beforeEach(async({page}) => {
        await page.goto(`/wp-admin/index.php`);
    });

    test('should be accessed on Posts menu', async({page}) => {
        await page.locator('li#menu-posts').click();
        await expect(page.getByRole('heading', {level: 1}).getByText('Posts')).toBeVisible();
        await page.locator('#wpbody-content').getByRole('link', { name: 'Add New' }).click();

        await expect(page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add title')).toBeVisible();
        await expect(page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add default block')).toBeVisible();
        await expect(page.getByRole('button', {name: 'Save draft', exact: true})).toBeDisabled();
        await expect(page.getByRole('button', { name: 'Publish', exact: true })).toBeDisabled();
    });

});