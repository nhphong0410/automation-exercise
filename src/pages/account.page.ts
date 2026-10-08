import { expect, type Locator, type Page } from '@playwright/test';

export class AccountPage {
  readonly loggedInIndicator: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly signupLoginLink: Locator;
  readonly accountDeletedMessage: Locator;

  constructor(private readonly page: Page) {
    this.loggedInIndicator = page.getByText(/^Logged in as /);
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.getByRole('link', { name: /delete account/i });
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.accountDeletedMessage = page.locator('[data-qa="account-deleted"]');
  }

  async expectLoggedInAs(name: string): Promise<void> {
    await expect(this.page.getByText(`Logged in as ${name}`, { exact: true })).toBeVisible();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async expectDeleted(): Promise<void> {
    await expect(this.accountDeletedMessage).toHaveText(/ACCOUNT DELETED!/i);
  }

  async expectNoAuthenticatedActions(): Promise<void> {
    await expect(this.loggedInIndicator).not.toBeVisible();
    await expect(this.logoutLink).not.toBeVisible();
    await expect(this.deleteAccountLink).not.toBeVisible();
  }

  async expectGuestState(): Promise<void> {
    await expect(this.signupLoginLink).toBeVisible();
    await this.expectNoAuthenticatedActions();
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login$/);
    await this.expectGuestState();
  }

}
