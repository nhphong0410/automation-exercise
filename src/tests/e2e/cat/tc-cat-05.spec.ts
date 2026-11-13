import { test, expect } from '../../fixtures';

test('TC-CAT-05-01 filters products by the Women category and Dress subcategory', async ({
  page,
  homePage,
  productsPage,
}) => {
  await homePage.open();
  await homePage.expectLoaded();

  await productsPage.expandWomenCategory();
  await productsPage.selectDressSubcategory();

  await expect(page).toHaveURL(/\/category_products\/1$/);
  await expect(productsPage.categoryHeading).toBeVisible();

  const productCards = productsPage.categoryProductCards;
  const productCount = await productCards.count();
  expect(productCount).toBeGreaterThan(0);

  for (let index = 0; index < productCount; index += 1) {
    await expect(productsPage.categoryProductName(index)).toContainText(/Dress/i);
  }
});
