import { test, expect } from '../../fixtures/pom.fixture';

test.describe('Product combined Tests (API + UI)', () => {

  test.beforeEach(async ({ pm }) => {
    await pm.productPage.goToProductsPage();
  });

  test('Search Products, API Data + UI verify', async ({ productApi, pm }) => {

    let index = 0;
    const searchTerm = 'top';

    // Search product using the API Endpoint searchProduct
    const response = await productApi.searchProduct(searchTerm);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    //console.log('Search Response:', responseBody);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty('products');

    // Search product using UI
    await pm.productPage.searchForProduct(searchTerm);
    await pm.productPage.expectSearchResultsVisible();
    const searchResultsUI = await pm.productPage.getSearchResults();
    
   for (const product of responseBody.products) {
    expect(searchResultsUI).toContain(product.name);
   }
  });

});