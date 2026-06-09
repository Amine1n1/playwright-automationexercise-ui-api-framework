import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

  async goToCartPage() {
    await this.goToUrl('/view_cart');
  }

  async expectCartPageVisible() {
    await this.BasePageExpectVisible(this.page.getByText('Shopping Cart'));
  }

  async expectProductInCart(id: string) {
    await this.BasePageExpectVisible(`#product-${id}`);
  } 

  async deleteProductFromCart(id: string) {
    await this.BasePageClick(`#product-${id} .cart_delete`);
  }

  async expectProductNotInCart(id: string) {
    await expect(this.Locator(`#product-${id}`)).toBeHidden();
  }

  async expectQuantityinCart(productId: string, quantity: number) {
    await expect(this.Locator(`#product-${productId} .cart_quantity .disabled`)).toContainText(quantity.toString());
  }
}