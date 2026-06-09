import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';

test.describe('Login Tests', () => {

   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    await pm.loginPage.goToLoginPage();
  });

  test('Successful Login', async ({ pm, validUser }) => {
  
    await pm.loginPage.login(validUser.username, validUser.password);
    await pm.loginPage.expectLoginSuccess();
  });

  test('Failed Login with Invalid Credentials', async ({ pm, invalidUser }) => {
  
    await pm.loginPage.login(invalidUser.username, invalidUser.password);
    await pm.loginPage.expectLoginFailure();
  });

});