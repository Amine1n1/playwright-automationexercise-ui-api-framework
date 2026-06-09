import { test, expect } from '../../fixtures/pom.fixture';
import  productList from '../../test-data/productList.json';
import brandList from '../../test-data/brandList.json'

test.describe('Product API Tests', () => {

  test('Get All Products', async ({ productApi }) => {
    const response = await productApi.getAllProducts();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty('products');
    expect(responseBody).toEqual(productList);
  });

  test('Get All Brands', async ({ productApi }) => {
    const response = await productApi.getAllBrands();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty('brands');
    expect(responseBody).toEqual(brandList);
  });

  test('Search Products by Name', async ({ productApi }) => {
    const searchTerm = 'dress';
    const response = await productApi.searchProduct(searchTerm);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    //console.log('Search Response:', responseBody.products[0].category);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty('products');
    
    for (const product of responseBody.products) {
      expect(product.category.category.toLowerCase()).toContain(searchTerm);
    }
  });

  test('Search Products without parameter', async ({ productApi }) => {
    const response = await productApi.searchProduct();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');
  });

});