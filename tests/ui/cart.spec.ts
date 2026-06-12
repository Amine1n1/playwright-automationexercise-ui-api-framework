import { test, expect } from '../../fixtures/pom.fixture';
import { newUser } from '../../test-data/userData';

test.describe('Cart Tests', () => {

  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm, userApi}) => {

    const response = await userApi.createUser(newUser);

    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(201);

    await pm.loginPage.goToLoginPage();

    await pm.loginPage.login(newUser.email, newUser.password);
    await pm.loginPage.expectLoginSuccess();

    await pm.productPage.goToProductsPage();
  });

  test.afterEach(async ({ userApi }) => {

    const response = await userApi.verifyLogin(newUser.email, newUser.password);

    const responseBody = await response.json();

    if (responseBody.responseCode === 200) {
      const userDelete = await userApi.deleteUser(newUser.email, newUser.password);
      const userDeleteBody = await userDelete.json();

      expect(userDeleteBody.responseCode).toBe(200);
    }

  });


  test('Delete a product from Cart', async ({ pm }) => {
    const productId = '30';
    await pm.productPage.addProductToCart(productId);
    await pm.productPage.expectProductAddedToCartPopup();
    await pm.productPage.goToCart();
    await pm.cartPage.expectCartPageVisible();
    await pm.cartPage.expectProductInCart(productId);
    await pm.cartPage.deleteProductFromCart(productId);
    await pm.cartPage.expectProductNotInCart(productId);
  });

  test('Choose Quantity from product details page, click add to cart and check the quantity in the cart', async ({ pm }) => {
    const productId = '1';
    const quantity = 4;
    
    await pm.productPage.viewProductDetails(productId);
    await pm.productPage.expectProductDetailsVisible();

    await pm.productPage.increaseQuantity(quantity);
    await pm.productPage.addToCartFromProductDetails();
    await pm.productPage.expectProductAddedToCartPopup();
    await pm.productPage.goToCart();

    await pm.cartPage.expectQuantityinCart(productId, quantity);

  });

  test('Choose Quantity from product details page, click add to cart and check the quantity in the cart for multiple products', async ({ pm, page }) => {
    const productId = ['1', '5', '2'];
    const quantity = [4, 2, 6];

    for (let i = 0; i < productId.length ; i++) {
      await pm.productPage.viewProductDetails(productId[i]);
      await pm.productPage.expectProductDetailsVisible();
      await pm.productPage.increaseQuantity(quantity[i]);
      await pm.productPage.addToCartFromProductDetails();
      await pm.productPage.expectProductAddedToCartPopup();
      await pm.productPage.continueShopping();
      await pm.productPage.goToProductsPageFromDetails();
    }

    await pm.productPage.goToCartFromProductsPage();

    for (let i = 0; i < productId.length ; i++) {
      await pm.cartPage.expectQuantityinCart(productId[i], quantity[i]);
    }

  });

});