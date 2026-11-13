import { test, expect } from '../../fixtures';
import type { ProductDetailsPage } from '../../../pages/product-details.page';
import type { ProductsPage } from '../../../pages/products.page';

const reviewData = {
  name: 'QA Reviewer',
  email: 'reviewer@qa.test',
  text: 'Excellent quality product, highly recommended!',
};

async function openFirstProductReviewForm(
  productsPage: ProductsPage,
  productDetailsPage: ProductDetailsPage,
): Promise<void> {
  await productsPage.open();
  await productsPage.expectLoaded();
  await productsPage.openFirstProductDetails();
  await productDetailsPage.expectLoaded();
  await productDetailsPage.expectReviewFormVisible();
}

test.describe('TC-CAT-07 - Submit Product Review', () => {
  test('TC-CAT-07-01 submits a valid product review', async ({
    productsPage,
    productDetailsPage,
  }) => {
    await openFirstProductReviewForm(productsPage, productDetailsPage);
    await productDetailsPage.submitReview(
      reviewData.name,
      reviewData.email,
      reviewData.text,
    );

    await expect(productDetailsPage.reviewSuccessAlert).toContainText(
      'Thank you for your review.',
    );
  });

  test('TC-CAT-07-02 blocks submission when review fields are blank', async ({
    page,
    productsPage,
    productDetailsPage,
  }) => {
    await openFirstProductReviewForm(productsPage, productDetailsPage);
    await productDetailsPage.submitReview('', '', '');

    await expect(page).toHaveURL(/\/product_details\/\d+/);
    await expect(productDetailsPage.reviewSuccessAlert).not.toBeVisible();
    expect(await productDetailsPage.isReviewFormValid()).toBe(false);
  });

  test('TC-CAT-07-03 blocks submission with a malformed review email', async ({
    page,
    productsPage,
    productDetailsPage,
  }) => {
    await openFirstProductReviewForm(productsPage, productDetailsPage);
    await productDetailsPage.submitReview(
      reviewData.name,
      'invalid-email-syntax',
      'Great product!',
    );

    await expect(page).toHaveURL(/\/product_details\/\d+/);
    await expect(productDetailsPage.reviewSuccessAlert).not.toBeVisible();
    expect(await productDetailsPage.isReviewEmailValid()).toBe(false);
  });
});
