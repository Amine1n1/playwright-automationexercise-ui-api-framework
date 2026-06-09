import { test, expect } from '../../fixtures/pom.fixture';

test.describe('Product Tests', () => {

  test.beforeEach(async ({ pm }) => {
    await pm.productPage.goToProductsPage();
  });

  test('Search for a tshirt', async ({ pm }) => {
    const searchTerm = 'tshirt';
    await pm.productPage.searchForProduct(searchTerm);
   await pm.productPage.expectSearchResultsVisible();
    const productNames = await pm.productPage.getSearchResults();
    
    //console.log('Product Names:', productNames);
    for (const name of productNames) {
      expect(name.toLowerCase()).toMatch(/tshirt|t-shirt|t shirt| t-shirts/);
    }
  });

  test('Add product to cart', async ({ pm }) => {
    const productId = '2'; // Example product ID, replace with actual ID from your application
    await pm.productPage.addProductToCart(productId);
    await pm.productPage.expectProductAddedToCartPopup();
    await pm.productPage.goToCart();
    await pm.cartPage.expectCartPageVisible();
    await pm.cartPage.expectProductInCart(productId);
  });

  test('View product details', async ({ pm }) => {
    const productId = '30'; // Example product ID, replace with actual ID from your application
    await pm.productPage.viewProductDetails(productId);
    await pm.productPage.expectProductDetailsVisible();
  });

  test('Filter by brand', async ({ pm }) => {
    const brand = 'H&M';

    await pm.productPage.expectBrandsVisible();
    await pm.productPage.chooseBrand(brand);

    await pm.productPage.expectChoosedBrandVisible(brand);
  });

});