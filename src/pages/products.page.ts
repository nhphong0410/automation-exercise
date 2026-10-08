import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly allProductsHeading: Locator;
  readonly firstProductCard: Locator;
  readonly addToCartModal: Locator;
  readonly modalViewCartLink: Locator;

  constructor(private readonly page: Page) {
    this.allProductsHeading = page.getByRole('heading', { name: /all products/i });
    this.firstProductCard = page.locator('.product-image-wrapper').first();
    this.addToCartModal = page.locator('#cartModal');
    this.modalViewCartLink = this.addToCartModal.getByRole('link', { name: /view cart/i });
  }

  async open(): Promise<void> {
    await this.page.goto('/products');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.allProductsHeading).toBeVisible();
    await expect(this.firstProductCard).toBeVisible();
  }

  async expectLoggedInAs(name: string): Promise<void> {
    await expect(this.page.getByText(`Logged in as ${name}`, { exact: true })).toBeVisible();
  }

  async addFirstProductToCart(): Promise<string> {
    const productName = (await this.firstProductCard.locator('.productinfo p').innerText()).trim();
    await this.firstProductCard.hover();
    await this.firstProductCard.locator('.add-to-cart').first().click();
    await expect(this.addToCartModal).toBeVisible();
    await expect(this.addToCartModal.getByText('Added!', { exact: true })).toBeVisible();
    await this.modalViewCartLink.click();

    return productName;
  }
}
