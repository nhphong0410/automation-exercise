import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;
  readonly emptyCartProductsLink: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('#cart_info_table tbody tr[id^="product-"]');
    this.emptyCartMessage = page.getByText(/Cart is empty!/i);
    this.emptyCartProductsLink = page.locator('#empty_cart a[href="/products"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/view_cart');
  }

  async expectProductInCart(name: string): Promise<void> {
    await expect(this.productRow(name)).toHaveCount(1);
  }

  async expectProductNotInCart(name: string): Promise<void> {
    await expect(this.productRow(name)).toHaveCount(0);
  }

  async removeProduct(name: string): Promise<void> {
    const productRow = this.productRow(name);
    await expect(productRow).toHaveCount(1);
    await productRow.locator('a.cart_quantity_delete').click();
    await expect(productRow).toHaveCount(0);
  }

  async expectEmptyCart(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
    await expect(this.emptyCartMessage).toBeVisible();
    await expect(this.emptyCartProductsLink).toBeVisible();
  }

  async expectProductQuantity(name: string, quantity: number): Promise<void> {
    const productRow = this.productRow(name);
    await expect(productRow.locator('.cart_quantity button')).toHaveText(String(quantity));
  }

  async expectProductPriceDisplayed(name: string): Promise<void> {
    const productRow = this.productRow(name);
    await expect(productRow.locator('.cart_price')).toContainText(/Rs\.\s*\d+/);
  }

  async getProductUnitPrice(name: string): Promise<number> {
    return this.readPrice(this.productRow(name).locator('.cart_price'));
  }

  async getProductLineTotal(name: string): Promise<number> {
    return this.readPrice(this.productRow(name).locator('.cart_total_price'));
  }

  private productRow(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }

  private async readPrice(price: Locator): Promise<number> {
    const text = (await price.innerText()).trim();
    const amount = text.match(/\d[\d,]*(?:\.\d+)?/);

    if (!amount) {
      throw new Error(`Could not parse a price from "${text}".`);
    }

    const value = Number(amount[0].replace(/,/g, ''));
    if (!Number.isFinite(value)) {
      throw new Error(`Could not parse a price from "${text}".`);
    }

    return value;
  }
}