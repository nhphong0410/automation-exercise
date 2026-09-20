import { expect, type Locator, type Page } from '@playwright/test';

export class AccountCreatedPage {
  readonly accountCreatedMessage: Locator;
  readonly continueButton: Locator;

  constructor(private readonly page: Page) {
    this.accountCreatedMessage = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.accountCreatedMessage).toHaveText(/ACCOUNT CREATED!/i);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }
}
