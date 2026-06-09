// We are creating a Playwright fixture that initializes a page object manager (PomManager) for each test.
// This allows us to access various page objects (like LoginPage, SecurePage, etc.) through the manager.
// The fixture also provides a valid user object for authentication tests.

import { test as base } from '@playwright/test';
import PomManager from '../pages/ManagePage';
import { validUser } from '../test-data/validUser';
import { invalidUser } from '../test-data/invalidUser';
import { UserApi } from '../helpers/UserApi';
import { ProductApi } from '../helpers/ProductApi';

type MyFixtures = {
  pm: PomManager;                       
  validUser: { username: string; password: string };
  invalidUser: { username: string; password: string };
  userApi: UserApi;
  productApi: ProductApi;
};


export const test = base.extend<MyFixtures>({
  // Re-use Playwright’s default `page`
  pm: async ({ page }, use) => {
    await use(new PomManager(page));
  },

  // Plain value fixture (available in every test)
  validUser,
  invalidUser,
  userApi: async ({ request }, use) => {
    await use(new UserApi(request));
  },

  productApi: async ({ request }, use) => {
    await use(new ProductApi(request));
  },

});

export { expect } from '@playwright/test';
