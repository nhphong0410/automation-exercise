import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly cartItems: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('#cart_info_table tbody tr[id^="product-"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/view_cart');
  }

  async expectProductInCart(name: string): Promise<void> {
    await expect(this.cartItems.filter({ hasText: name })).toHaveCount(1);
  }

  async expectProductQuantity(name: string, quantity: number): Promise<void> {
    const productRow = this.cartItems.filter({ hasText: name });
    await expect(productRow.locator('.cart_quantity button')).toHaveText(String(quantity));
  }
}