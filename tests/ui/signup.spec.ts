import { test } from '../../fixtures/pom.fixture';
import { newUser } from '../../test-data/userData';
import 'dotenv/config';

test.describe('Signup Tests', () => {

   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    await pm.signupPage.goToSignupPage();
    await pm.signupPage.expectSignupPageVisible();
  });

  test.afterEach(async ({ userApi }) => {
  const verify = await userApi.verifyLogin(newUser.email, newUser.password);
  const body = await verify.json();
  if (body.responseCode === 200) {
    await userApi.deleteUser(newUser.email, newUser.password);
  }
});

  test('Successful Signup', async ({ pm }) => {
   
    await pm.signupPage.registerUser(newUser);
    await pm.signupPage.expectAccountCreationSuccessful();

  });

  test('Failed Signup, User already registered', async ({ pm, validUser }) => {
    const name = 'test';
    await pm.signupPage.signup(name, validUser.username);
    await pm.signupPage.expectSignupFailedUserAlreadyExists();
  });

});