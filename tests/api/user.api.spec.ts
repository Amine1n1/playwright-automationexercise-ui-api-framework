import { test, expect } from '../../fixtures/pom.fixture';
import { newUser, updatedUser, newUserForCreation } from '../../test-data/userData';

test.describe('User API Tests', () => {

  let userEmail: string;

  test.beforeEach(async ({ userApi }) => {
    // Ensure the test user exists before each test
    const response = await userApi.createUser(newUser);
    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(201);

    userEmail = newUser.email;
  });

  test.afterEach(async ({ userApi }) => {
  // ✅ Delete only if user still exists — avoids "Account not found!" error
  const verifyResponse = await userApi.verifyLogin(newUser.email, newUser.password);
  const verifyBody = await verifyResponse.json();

  if (verifyBody.responseCode === 200) {
    await userApi.deleteUser(newUser.email, newUser.password);
  }
  });

  test('Verify Login with Valid Credentials', async ({ userApi, validUser }) => {
    const response = await userApi.verifyLogin(validUser.username, validUser.password);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    
    expect(responseBody.message).toBe('User exists!');
    expect(responseBody.responseCode).toBe(200);
  });

  test('Verify Login with Invalid Credentials', async ({ userApi, invalidUser }) => {
    const response = await userApi.verifyLogin(invalidUser.username, invalidUser.password);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody.message).toBe('User not found!');
    expect(responseBody.responseCode).toBe(404);

  });

  test('Create New User', async ({ userApi }) => {
    const response = await userApi.createUser(newUserForCreation);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    
    expect(responseBody.message).toBe('User created!');
    expect(responseBody.responseCode).toBe(201);

  });

  test('Get User Details by Email', async ({ userApi }) => {
    const response = await userApi.getUserDetailByEmail(userEmail);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody.user.email).toBe(userEmail);
    expect(responseBody.user.name).toBe(newUser.name);
    expect(responseBody.user.title).toBe(newUser.title);
    expect(responseBody.user.birth_day).toBe(newUser.birth_date);
    expect(responseBody.user.birth_month).toBe(newUser.birth_month);
    expect(responseBody.user.birth_year).toBe(newUser.birth_year);
    expect(responseBody.user.first_name).toBe(newUser.firstname);
    expect(responseBody.user.last_name).toBe(newUser.lastname);
    expect(responseBody.user.company).toBe(newUser.company);
    expect(responseBody.user.address1).toBe(newUser.address1);
    expect(responseBody.user.address2).toBe(newUser.address2);
    expect(responseBody.user.country).toBe(newUser.country);
    expect(responseBody.user.state).toBe(newUser.state);
    expect(responseBody.user.city).toBe(newUser.city);
    expect(responseBody.user.zipcode).toBe(newUser.zipcode);
  });

  test('Delete User', async ({ userApi }) => {
    const response = await userApi.deleteUser(newUser.email, newUser.password);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    
    expect(responseBody.message).toBe('Account deleted!');
    expect(responseBody.responseCode).toBe(200);

    const verifyResponse = await userApi.verifyLogin(newUser.email, newUser.password);
    const verifyBody = await verifyResponse.json();

    expect(verifyBody.message).toBe('User not found!');
    expect(verifyBody.responseCode).toBe(404);

  });

  test('Update User', async ({ userApi }) => {
    const response = await userApi.updateUser(updatedUser);
    expect(response.status()).toBe(200);      
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.message).toBe('User updated!');
    expect(responseBody.responseCode).toBe(200);

    // Verify the update
    const verifyResponse = await userApi.getUserDetailByEmail(updatedUser.email);
    expect(verifyResponse.status()).toBe(200);
    const verifyBody = await verifyResponse.json();

    expect(verifyBody.user.company).toBe(updatedUser.company);
    expect(verifyBody.user.address1).toBe(updatedUser.address1);
  });

});