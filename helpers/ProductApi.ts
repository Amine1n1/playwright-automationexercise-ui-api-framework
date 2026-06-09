import { APIRequestContext } from '@playwright/test';

export class ProductApi {
  constructor(private request: APIRequestContext) {}
  
  async getAllProducts() {
    const response = await this.request.get('/api/productsList');
    return response;
  }

  async getAllBrands() {
    const response = await this.request.get('/api/brandsList');
    return response;
  }

  async searchProduct(name?: string) {
    const response = await this.request.post(`/api/searchProduct`, {
      form: name ? { search_product: name }: {},
    });
    return response;
  }
}