import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  
  async goToHomePage() {
    await this.goToUrl('/');
  }

  async expectSubscriptionVisible() {
    await this.BasePageExpectVisible(this.page.getByRole('heading', {name: 'Subscription'}));
  }

  async subscribe(email: string) {
    await this.BasePageFill('#susbscribe_email', email);
    await this.BasePageClick('#subscribe');
  }

  async expectSubscribingSuccessful() {
    await this.BasePageExpectVisible(this.page.getByText('You have been successfully subscribed!'));
  }
}