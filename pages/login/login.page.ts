import { test, expect } from '@playwright/test';

test.describe('Logging in to the application', () => {

  test('Redirect to login page url.', async ({ page }, testInfo) => {
    await page.goto(testInfo.project.use.baseURL!);
  });

  test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Welcome/);
});

});
