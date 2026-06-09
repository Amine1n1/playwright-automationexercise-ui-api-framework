import { test as setup, expect } from '@playwright/test';
import 'dotenv/config';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-qa="login-email"]', process.env.VALID_USERNAME!);
  await page.fill('[data-qa="login-password"]', process.env.VALID_PASSWORD!);
  await page.click('[data-qa="login-button"]');

  await page.waitForURL('**/'); 
  await expect(page.locator('[data-qa="logout-button"]')).toBeVisible();

  await page.context().storageState({ path: 'auth/user.json' });
});