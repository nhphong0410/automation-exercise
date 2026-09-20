import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly firstProductCard: Locator;

  constructor(private readonly page: Page) {
    this.firstProductCard = page.locator('.product-image-wrapper').first();
  }

  async open(): Promise<void> {
    await this.page.goto('/products');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /all products/i })).toBeVisible();
    await expect(this.firstProductCard).toBeVisible();
  }
}
