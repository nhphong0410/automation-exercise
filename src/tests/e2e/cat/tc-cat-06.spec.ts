import { test, expect } from '../../fixtures';

test('TC-CAT-06-01 filters products by the Polo brand', async ({
  page,
  productsPage,
  productDetailsPage,
}) => {
  await productsPage.open();
  await productsPage.expectLoaded();
  await productsPage.selectPoloBrand();

  await expect(page).toHaveURL(/\/brand_products\/Polo$/);
  await expect(productsPage.brandHeading).toBeVisible();
  await expect(productsPage.brandProductCards.first()).toBeVisible();

  const productDetailPaths = await productsPage.getBrandProductDetailPaths();
  expect(productDetailPaths.length).toBeGreaterThan(0);

  for (const productDetailPath of productDetailPaths) {
    await productDetailsPage.open(productDetailPath);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.expectBrand('Polo');
  }
});
