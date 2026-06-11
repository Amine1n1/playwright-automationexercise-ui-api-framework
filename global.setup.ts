import { test as setup, expect } from '@playwright/test';
import 'dotenv/config';

setup('authenticate', async ({ page }) => {

   // ✅ Block ads during login setup too
  await page.route('**/*', route => {
    const blockedDomains = [
      'googlesyndication',
      'googleadservices',
      'doubleclick',
      'google-analytics',
      'googletagmanager',
      'adsbygoogle',
    ];
    const url = route.request().url();
    if (blockedDomains.some(domain => url.includes(domain))) {
      route.abort();
    } else {
      route.continue();
    }
  });
  await page.goto('/login');
  await page.fill('[data-qa="login-email"]', process.env.VALID_USERNAME!);
  await page.fill('[data-qa="login-password"]', process.env.VALID_PASSWORD!);
  await page.click('[data-qa="login-button"]');

  await page.waitForURL('**/'); 
  await expect(page.locator('[data-qa="logout-button"]')).toBeVisible();

  await page.context().storageState({ path: 'auth/user.json' });
});