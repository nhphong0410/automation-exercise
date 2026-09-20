import { expect, type Page } from '@playwright/test';

export class AccountCreatedPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page.locator('[data-qa="account-created"]')).toHaveText(/ACCOUNT CREATED!/i);
  }

  async continue(): Promise<void> {
    await this.page.locator('[data-qa="continue-button"]').click();
  }
}
