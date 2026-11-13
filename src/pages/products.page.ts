import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly allProductsHeading: Locator;
  readonly firstProductCard: Locator;
  readonly womenCategoryLink: Locator;
  readonly dressSubcategoryLink: Locator;
  readonly categoryHeading: Locator;
  readonly categoryProductCards: Locator;
  readonly poloBrandLink: Locator;
  readonly brandHeading: Locator;
  readonly brandProductCards: Locator;
  readonly addToCartModal: Locator;
  readonly modalViewCartLink: Locator;
  readonly modalContinueShoppingButton: Locator;
  readonly addedToCartHeading: Locator;
  readonly addedToCartMessage: Locator;

  constructor(private readonly page: Page) {
    this.allProductsHeading = page.getByRole('heading', { name: /all products/i });
    this.firstProductCard = page.locator('.product-image-wrapper').first();
    this.womenCategoryLink = page.locator('a[href="#Women"]');
    this.dressSubcategoryLink = page.locator('#Women a[href="/category_products/1"]');
    this.categoryHeading = page.getByRole('heading', { name: /WOMEN - DRESS PRODUCTS/i });
    this.categoryProductCards = page.locator('.product-image-wrapper');
    this.poloBrandLink = page.locator('.brands_products').getByRole('link', { name: /Polo/i });
    this.brandHeading = page.getByRole('heading', { name: /BRAND - POLO PRODUCTS/i });
    this.brandProductCards = page.locator('.product-image-wrapper');
    this.addToCartModal = page.locator('#cartModal');
    this.modalViewCartLink = this.addToCartModal.getByRole('link', { name: /view cart/i });
    this.modalContinueShoppingButton = this.addToCartModal.getByRole('button', {
      name: /continue shopping/i,
    });
    this.addedToCartHeading = this.addToCartModal.getByText('Added!', { exact: true });
    this.addedToCartMessage = this.addToCartModal.getByText(
      'Your product has been added to cart.',
      { exact: true },
    );
  }

  async open(): Promise<void> {
    await this.page.goto('/products');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.allProductsHeading).toBeVisible();
    await expect(this.firstProductCard).toBeVisible();
  }

  async expandWomenCategory(): Promise<void> {
    await this.womenCategoryLink.click();
    await expect(this.dressSubcategoryLink).toBeVisible();
  }

  async selectDressSubcategory(): Promise<void> {
    await this.dressSubcategoryLink.click();
  }

  async selectPoloBrand(): Promise<void> {
    await this.poloBrandLink.click();
  }

  categoryProductName(index: number): Locator {
    return this.categoryProductCards.nth(index).locator('.productinfo p').first();
  }

  async getBrandProductDetailPaths(): Promise<string[]> {
    const productCount = await this.brandProductCards.count();
    const detailPaths: string[] = [];

    for (let index = 0; index < productCount; index += 1) {
      const path = await this.brandProductCards
        .nth(index)
        .getByRole('link', { name: /view product/i })
        .getAttribute('href');
      if (!path) {
        throw new Error(`Product card ${index + 1} does not have a product details link.`);
      }

      detailPaths.push(path);
    }

    return detailPaths;
  }

  async expectLoggedInAs(name: string): Promise<void> {
    await expect(this.page.getByText(`Logged in as ${name}`, { exact: true })).toBeVisible();
  }

  productCard(name: string): Locator {
    return this.page.locator('.product-image-wrapper').filter({
      has: this.page.locator('.productinfo p', { hasText: name }),
    });
  }

  async productName(card: Locator = this.firstProductCard): Promise<string> {
    return (await card.locator('.productinfo p').innerText()).trim();
  }

  async addProductToCart(card: Locator = this.firstProductCard): Promise<void> {
    await card.hover();
    await card.locator('.add-to-cart').first().click();
    await this.expectProductAdded();
  }

  async expectProductAdded(): Promise<void> {
    await expect(this.addToCartModal).toBeVisible();
    await expect(this.addedToCartHeading).toBeVisible();
    await expect(this.addedToCartMessage).toBeVisible();
  }

  async continueShopping(): Promise<void> {
    await this.modalContinueShoppingButton.click();
    await expect(this.addToCartModal).toBeHidden();
  }

  async viewCartFromModal(): Promise<void> {
    await this.modalViewCartLink.click();
  }

  async openFirstProductDetails(): Promise<void> {
    await this.firstProductCard.getByRole('link', { name: /view product/i }).click();
  }

  async addFirstProductToCart(): Promise<string> {
    const productName = await this.productName();
    await this.addProductToCart();
    await this.viewCartFromModal();

    return productName;
  }
}
