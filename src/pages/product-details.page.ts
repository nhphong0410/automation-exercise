import { expect, type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly productName: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addToCartModal: Locator;
  readonly addedToCartHeading: Locator;
  readonly addedToCartMessage: Locator;
  readonly viewCartLink: Locator;
  readonly brandInformation: Locator;
  readonly reviewHeading: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextArea: Locator;
  readonly submitReviewButton: Locator;
  readonly reviewSuccessAlert: Locator;

  constructor(private readonly page: Page) {
    this.productName = page.locator('.product-information h2');
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.addToCartModal = page.locator('#cartModal');
    this.addedToCartHeading = this.addToCartModal.getByText('Added!', { exact: true });
    this.addedToCartMessage = this.addToCartModal.getByText(
      'Your product has been added to cart.',
      { exact: true },
    );
    this.viewCartLink = this.addToCartModal.getByRole('link', { name: /view cart/i });
    this.brandInformation = page.locator('.product-information p').filter({
      hasText: /^Brand:/,
    });
    this.reviewHeading = page.getByRole('link', { name: /write your review/i });
    this.reviewNameInput = page.locator('#name');
    this.reviewEmailInput = page.locator('#email');
    this.reviewTextArea = page.locator('#review');
    this.submitReviewButton = page.locator('#button-review');
    this.reviewSuccessAlert = page
      .locator('.alert-success')
      .filter({ hasText: 'Thank you for your review.' });
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/product_details\/\d+/);
    await expect(this.productName).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  async getProductName(): Promise<string> {
    return (await this.productName.innerText()).trim();
  }

  async expectBrand(name: string): Promise<void> {
    await expect(this.brandInformation).toHaveText(new RegExp(`^Brand:\\s*${name}$`, 'i'));
  }

  async expectReviewFormVisible(): Promise<void> {
    await expect(this.reviewHeading).toBeVisible();
    await expect(this.reviewNameInput).toBeVisible();
    await expect(this.reviewEmailInput).toBeVisible();
    await expect(this.reviewTextArea).toBeVisible();
    await expect(this.submitReviewButton).toBeVisible();
  }

  async submitReview(name: string, email: string, review: string): Promise<void> {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextArea.fill(review);
    await this.submitReviewButton.click();
  }

  async isReviewFormValid(): Promise<boolean> {
    return this.reviewNameInput.evaluate((nameInput) => {
      const form = nameInput.closest('form');
      return form instanceof HTMLFormElement && form.checkValidity();
    });
  }

  async isReviewEmailValid(): Promise<boolean> {
    return this.reviewEmailInput.evaluate(
      (emailInput) =>
        emailInput instanceof HTMLInputElement && emailInput.validity.valid,
    );
  }

  async addToCart(quantity?: number): Promise<void> {
    if (quantity !== undefined) {
      await this.quantityInput.fill(String(quantity));
    }

    await this.addToCartButton.click();
    await expect(this.addToCartModal).toBeVisible();
    await expect(this.addedToCartHeading).toBeVisible();
    await expect(this.addedToCartMessage).toBeVisible();
  }

  async viewCart(): Promise<void> {
    await this.viewCartLink.click();
  }
}
