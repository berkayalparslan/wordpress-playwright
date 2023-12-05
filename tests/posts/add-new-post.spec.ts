// @ts-check
import { test, expect } from '@playwright/test';

test.describe('new post',() => {
    test.beforeEach(async({page}) => {
        await page.goto(`/wp-admin/index.php`);
    });

    test('should be possible to add through Posts menu', async({page}) => {
        const newPost = {
            title: "new post title",
            block: "this is a new post"
        }
        await page.locator('li#menu-posts').click();
        await expect(page.getByRole('heading', {level: 1}).getByText('Posts')).toBeVisible();
        await page.locator('#wpbody-content').getByRole('link', { name: 'Add New' }).click();


        await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add title').pressSequentially(newPost.title);
        await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add default block').pressSequentially(newPost.block);
        await page.getByRole('button', { name: 'Publish', exact: true }).click();
        await page.getByLabel('Editor publish').getByRole('button', { name: 'Publish', exact: true }).click();
        await page.locator('a.components-button.is-primary').click();

        await expect(page.getByRole('heading', {level: 1})).toHaveText(newPost.title);
        await expect(page.locator('div.wp-block-post-content p')).toHaveText(newPost.block);
    });



});