import { APIRequestContext } from '@playwright/test';
import { User } from '../types/user.types';

export class UserApi {
  constructor(private request: APIRequestContext) {}

  async verifyLogin(email: string, password: string) {
    const response = await this.request.post('/api/verifyLogin', {
      form: { email, password },
    });
    return response;
  } 

  async createUser(user: User) {
    const response = await this.request.post('/api/createAccount', {
      form: { ...user },
    });
    return response;
  }

  async deleteUser(email: string, password: string) {
    const response = await this.request.delete('/api/deleteAccount', {
      form: { email, password },
    });
    return response;
  }

  async updateUser(user: User) {
    const response = await this.request.put('/api/updateAccount', {
      form: { ...user },
    });
    return response;
  }

  async getUserDetailByEmail(email: string) {
    const response = await this.request.get(`/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`);
    return response;
  }
}