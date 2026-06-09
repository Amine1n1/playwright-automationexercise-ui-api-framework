import { test } from '../../fixtures/pom.fixture';
import 'dotenv/config';

test.describe('Subscribe from Home Page Tests', () => {

   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    await pm.homePage.goToHomePage();
  });

  test('Successful Subscribe', async ({ pm }) => {
    const email = 'test@gmail.com';

    await pm.homePage.expectSubscriptionVisible();
    await pm.homePage.subscribe(email);

    await pm.homePage.expectSubscribingSuccessful();
  });

});