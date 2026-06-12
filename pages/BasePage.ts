import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /*---------Navigation------------*/
  // Navigate to a specific URL path.
  protected async goToUrl(path: string) {
    await this.page.goto(path);
  }

  /*---------Low-level helpers (protected)------------*/
  protected async BasePageClick(selector: string | Locator) {
    await this.toLocator(selector).click();
  }

  protected async BasePageClickWithTestId(testId: string) {
    await this.page.getByTestId(testId).click();
  }

  protected async BasePageFill(selector: string | Locator, value: string) {
    await this.toLocator(selector).fill(value);
  }

  protected async BasePageSelectOption(selector: string | Locator, value: string) {
    await this.toLocator(selector).selectOption(value);
  }

  protected async BasePageCheck(selector: string | Locator) {
    await this.toLocator(selector).check();
  }

  protected async BasePageFillWithTestId(testId: string, value: string) {
    await this.page.getByTestId(testId).fill(value);
  }

  protected async BasePageExpectVisible(selector: string | Locator) {
    await expect(this.toLocator(selector)).toBeVisible();
  }

  protected async BasePageExpectHidden(selector: string | Locator) {
    await expect(this.toLocator(selector)).toBeHidden();
  }

   protected async BasePageExpectEnabled(selector: string | Locator) {
    await expect(this.toLocator(selector)).toBeEnabled();
  }

  /*---------Utility------------*/
  // This method is used to convert a string selector into a Locator.
  protected toLocator(selector: string | Locator): Locator {
    return typeof(selector) === 'string' ? this.page.locator(selector) : selector;
  }

  public Locator(selector: string | Locator): Locator {
    return this.toLocator(selector);
  }
}