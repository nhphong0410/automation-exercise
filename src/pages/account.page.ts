import { expect, type Locator, type Page } from '@playwright/test';

export class AccountPage {
  readonly loggedInIndicator: Locator;
  readonly deleteAccountLink: Locator;
  readonly accountDeletedMessage: Locator;

  constructor(private readonly page: Page) {
    this.loggedInIndicator = page.getByText(/^Logged in as /);
    this.deleteAccountLink = page.getByRole('link', { name: /delete account/i });
    this.accountDeletedMessage = page.locator('[data-qa="account-deleted"]');
  }

  async expectLoggedInAs(name: string): Promise<void> {
    await expect(this.page.getByText(`Logged in as ${name}`, { exact: true })).toBeVisible();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async expectDeleted(): Promise<void> {
    await expect(this.accountDeletedMessage).toHaveText(/ACCOUNT DELETED!/i);
  }

  async expectNoAuthenticatedActions(): Promise<void> {
    await expect(this.loggedInIndicator).not.toBeVisible();
    await expect(this.deleteAccountLink).not.toBeVisible();
  }
}
