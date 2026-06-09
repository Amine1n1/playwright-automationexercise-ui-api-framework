import { BasePage } from "./BasePage";
import { User } from '../types/user.types';

export class SignupPage extends BasePage {

  async goToSignupPage() {
    await this.goToUrl('/signup');
  }

  async signup(name: string, email: string) {
    await this.BasePageFillWithTestId('signup-name', name);
    await this.BasePageFillWithTestId('signup-email', email);

    await this.BasePageClickWithTestId('signup-button');
  }

  async expectSignupPageVisible() {
    await this.BasePageExpectVisible(this.page.getByRole('heading', {name: 'New User Signup!'}));
  }

  async registerUser(user: User) {

    await this.signup(user.name, user.email);

    if (user.title === 'Mr') {
      await this.BasePageCheck('#id_gender1');
    } else {
      await this.BasePageCheck('#id_gender2');
    }

    await this.BasePageFillWithTestId('name', user.name);
    await this.BasePageFillWithTestId('password', user.password);

    await this.BasePageSelectOption('#days', user.birth_date);
    await this.BasePageSelectOption('#months', user.birth_month);
    await this.BasePageSelectOption('#years', user.birth_year);

    await this.BasePageFillWithTestId('first_name', user.firstname);
    await this.BasePageFillWithTestId('last_name', user.lastname);
    await this.BasePageFillWithTestId('company', user.company);
    await this.BasePageFillWithTestId('address', user.address1);
    await this.BasePageFillWithTestId('address2', user.address2);

    await this.BasePageSelectOption('#country', user.country);
    await this.BasePageFillWithTestId('state', user.state);
    await this.BasePageFillWithTestId('city', user.city);
    await this.BasePageFillWithTestId('zipcode', user.zipcode);
    await this.BasePageFillWithTestId('mobile_number', user.mobile_number);

    await this.BasePageClickWithTestId('create-account');
  }

  async expectAccountCreationSuccessful() {
    await this.BasePageExpectVisible(this.page.getByRole('heading', {name: 'Account Created!'}));
  }

  async expectSignupFailedUserAlreadyExists() {
    await this.BasePageExpectVisible(this.page.getByText('Email Address already exist!'));
  }
}