import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  async goToLoginPage() {
    await this.goToUrl('/login');
  }

  async login(email: string, password: string) {
    await this.BasePageFillWithTestId('login-email', email);
    await this.BasePageFillWithTestId('login-password', password);
    await this.BasePageClickWithTestId('login-button'); 
  }

  async expectLoginSuccess() {
    await this.BasePageExpectVisible(this.page.getByText('Logged in as'));

    await this.BasePageExpectVisible(this.page.getByRole('link', { name: 'Logout' }));
  }

  async expectLoginFailure() {
    await this.BasePageExpectVisible(this.page.getByText('Your email or password is incorrect!'));
  }

  async logout() {
    await this.BasePageClick(this.page.getByRole('link', {name:'Logout'}));
  }
}