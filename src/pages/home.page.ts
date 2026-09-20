import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly productsLink: Locator;

  constructor(private readonly page: Page) {
    this.productsLink = page.getByRole('link', { name: /products/i });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await expect(this.productsLink).toBeVisible();
  }

  async openProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async openLogin(): Promise<void> {
    await this.page.getByRole('link', { name: /signup \/ login/i }).click();
  }
}
