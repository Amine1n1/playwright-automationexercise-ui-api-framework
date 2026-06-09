import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {

  async goToProductsPage() {
    await this.goToUrl('/products');
  }

  async goToProductsPageFromDetails() {
    await this.BasePageClick('a[href="/products"]');
  }

  async searchForProduct(productName: string) {
    await this.BasePageFill('#search_product', productName);
    await this.BasePageClick('#submit_search');
  }

  async expectSearchResultsVisible() {
    await this.BasePageExpectVisible('.features_items');
  }

  async getSearchResults(): Promise<string[]> {
    const productNames = await this.page.locator('.productinfo p').allTextContents();
    /*const productNames = [];
    for (const element of productElements) {
      const name = await element.textContent();
      if (name) {
        productNames.push(name.trim());
      }
    }*/
    return productNames;
  }

  async addProductToCart(productId: string) {
    await this.BasePageClick(`.productinfo [data-product-id="${productId}"]`);
  }

  async expectProductAddedToCartPopup() {
    await this.BasePageExpectVisible(this.page.getByText('Your product has been added to cart.'));
  } 

  async viewProductDetails(productId: string) {
    await this.BasePageClick(`a[href='/product_details/${productId}']`)
  }

  async expectProductDetailsVisible() {
    await this.BasePageExpectVisible('.product-information');
  }

  async increaseQuantity(quantity: number) {
    await this.BasePageFill('#quantity', quantity.toString());
  }

  async addToCartFromProductDetails() {
    await this.BasePageClick(this.page.getByRole('button', {name: 'Add to cart'}));
  }

  async deleteAccount() {
    await this.BasePageClick(this.page.getByRole('link', {name : 'Delete Account'}));
  }

  async expectAccountDeletedPage() {
    await this.BasePageExpectVisible(this.page.getByText('Account Deleted!'));
  }

  async goToCart() {
    await this.BasePageClick(this.page.getByRole('link', { name: 'View Cart' }));
  }

  async goToCartFromProductsPage() {
    await this.BasePageClick('.shop-menu a[href="/view_cart"]');
  }

  async continueShopping() {
    await this.BasePageClick(this.page.getByRole('button', {name: 'Continue Shopping'}))
  }

  async expectBrandsVisible() {
    await this.BasePageExpectVisible('.brands_products');
  }

  async chooseBrand(brand: string) {
    await this.BasePageClick(`a[href='/brand_products/${brand}']`);
  }

  async expectChoosedBrandVisible(brand: string) {
    await this.BasePageExpectVisible(this.page.getByRole('heading', {name: `Brand - ${brand} Products`}));
  }

}