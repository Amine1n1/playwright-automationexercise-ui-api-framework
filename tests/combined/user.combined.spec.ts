import { test, expect } from '../../fixtures/pom.fixture';
import { newUser } from '../../test-data/userData';

test.describe('User combined Tests (API + UI)', () => {

   test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    await pm.loginPage.goToLoginPage();
  });

  test.afterEach(async ({ userApi }) => {
  // ✅ Delete only if user still exists — avoids "Account not found!" error
  const verifyResponse = await userApi.verifyLogin(newUser.email, newUser.password);
  const verifyBody = await verifyResponse.json();

  if (verifyBody.responseCode === 200) {
    await userApi.deleteUser(newUser.email, newUser.password);
  }
  });

  test('Create User with API and Login via UI', async ({ userApi , pm }) => {
    const response = await userApi.createUser(newUser);
    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(201);

    await pm.loginPage.login(newUser.email, newUser.password);
    await pm.loginPage.expectLoginSuccess();
  });

  test('Delete User via UI and Check if user doesnt exist anymore via API', async ({ userApi , pm }) => {

    const response = await userApi.createUser(newUser);
    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(201);

    await pm.loginPage.login(newUser.email, newUser.password);
    await pm.loginPage.expectLoginSuccess();

    await pm.productPage.deleteAccount();

    await pm.productPage.expectAccountDeletedPage();

    const responseCheckDelete = await userApi.verifyLogin(newUser.email, newUser.password);
    const responseBodyCheck = await responseCheckDelete.json();

    expect(responseBodyCheck.responseCode).toBe(404);

  });

  test('Create User using UI and Check user information using API', async ({ userApi , pm }) => {

    await pm.signupPage.registerUser(newUser);
    await pm.signupPage.expectAccountCreationSuccessful();

    const response = await userApi.getUserDetailByEmail(newUser.email);
    const responseBody = await response.json();
  
    expect(responseBody.responseCode).toBe(200);

    expect(responseBody.user.name).toBe(newUser.name);
    expect(responseBody.user.country).toBe(newUser.country);
    expect(responseBody.user.last_name).toBe(newUser.lastname);
  });
});

