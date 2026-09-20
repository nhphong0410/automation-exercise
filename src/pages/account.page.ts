import { expect, type Page } from '@playwright/test';

export class AccountPage {
  constructor(private readonly page: Page) {}

  async expectLoggedInAs(name: string): Promise<void> {
    await expect(this.page.getByText(`Logged in as ${name}`, { exact: true })).toBeVisible();
  }

  async deleteAccount(): Promise<void> {
    await this.page.getByRole('link', { name: /delete account/i }).click();
  }

  async expectDeleted(): Promise<void> {
    await expect(this.page.locator('[data-qa="account-deleted"]')).toHaveText(/ACCOUNT DELETED!/i);
  }
}
